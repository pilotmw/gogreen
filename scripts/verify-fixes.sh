#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# verify-fixes.sh — post-deploy smoke test for the Go Green Resources site.
#
# Asserts that every bug fixed in the project briefs is actually present in
# the DEPLOYED output, not just in the local build. Exits non-zero if any
# check fails, so it can be wired into CI or run by hand before declaring a
# fix "done".
#
# Usage:
#   scripts/verify-fixes.sh                        # checks production
#   scripts/verify-fixes.sh http://localhost:3000  # checks a local server
#   BASE=https://<deploy-id>--gogreenm.netlify.app scripts/verify-fixes.sh
#
# Run it against a Netlify deploy permalink to rule out CDN caching on the
# primary domain.
# ---------------------------------------------------------------------------
set -uo pipefail

BASE="${BASE:-https://gogreenm.netlify.app}"
BASE="${BASE%/}"
# Cache-bust every request so a stale CDN edge cannot produce a false pass.
CB="cb=$(date +%s)-$$"

PASS=0
FAIL=0

RED=$'\033[31m'; GRN=$'\033[32m'; YLW=$'\033[33m'; DIM=$'\033[2m'; RST=$'\033[0m'
[ -t 1 ] || { RED=""; GRN=""; YLW=""; DIM=""; RST=""; }

fetch() {  # fetch <path> -> body on stdout
  curl -sS --max-time 45 -A "verify-fixes/1.0" "$BASE$1?$CB"
}

count() { # count <haystack> <needle> -> integer
  printf '%s' "$1" | grep -o -- "$2" 2>/dev/null | wc -l | tr -d ' '
}

check() {  # check <label> <actual> <expected>
  if [ "$2" = "$3" ]; then
    PASS=$((PASS+1))
    printf '  %sPASS%s  %-58s %s\n' "$GRN" "$RST" "$1" "$DIM(actual=$2)${RST}"
  else
    FAIL=$((FAIL+1))
    # Build the detail outside the format string: '$2' inside single quotes
    # would reach printf literally instead of interpolating.
    detail="(actual=$2 expected=$3)"
    printf '  %sFAIL%s  %-58s %s%s%s\n' "$RED" "$RST" "$1" "$RED" "$detail" "$RST"
  fi
}

exists() { # exists <label> <haystack> <needle>
  n=$(count "$2" "$3")
  if [ "$n" -gt 0 ]; then
    PASS=$((PASS+1)); printf '  %sPASS%s  %-58s %s\n' "$GRN" "$RST" "$1" "$DIM(found $n×)${RST}"
  else
    FAIL=$((FAIL+1)); printf '  %sFAIL%s  %-58s %s(not found: %s)%s\n' "$RED" "$RST" "$1" "$RED" "$3" "$RST"
  fi
}

absent() { # absent <label> <haystack> <needle>
  n=$(count "$2" "$3")
  if [ "$n" -eq 0 ]; then
    PASS=$((PASS+1)); printf '  %sPASS%s  %-58s %s\n' "$GRN" "$RST" "$1" "$DIM(absent)${RST}"
  else
    FAIL=$((FAIL+1)); printf '  %sFAIL%s  %-58s %s(present %s×: %s)%s\n' "$RED" "$RST" "$1" "$RED" "$n" "$3" "$RST"
  fi
}

printf '\n%sGo Green — deployed-fix verification%s\n' "$YLW" "$RST"
printf '%starget: %s%s\n\n' "$DIM" "$BASE" "$RST"

printf '%s[0.1] Circular model — 5 steps, identical names on all three pages%s\n' "$YLW" "$RST"
for p in / /about /how-it-works; do
  body=$(fetch "$p")
  steps=0
  for s in Recover Convert Distribute "Create Value" Reinvest; do
    [ "$(count "$body" "$s")" -gt 0 ] && steps=$((steps+1))
  done
  check "$p shows 5 model steps" "$steps" "5"
done
ABOUT=$(fetch /about)
exists "About has the 'Create Value' step" "$ABOUT" "Create Value"

printf '\n%s[0.2 / 1] Homepage duplication removed%s\n' "$YLW" "$RST"
INDEX=$(fetch /)
check "'What We Deliver' header appears once"        "$(count "$INDEX" 'What We Deliver')" "1"
absent "old 2nd intro 'Practical Solutions for a...'" "$INDEX" "Practical Solutions for a Circular Future"
absent "old 2nd intro 'From Focus Areas to...'"       "$INDEX" "From Focus Areas to Practical Solutions"
absent "'Our Work in Action' section removed"         "$INDEX" "Our Work in Action"
check "7 solution cards in the deliverable grid"      "$(count "$INDEX" '<li class="h-full"')" "7"
exists "cards link out to the Solutions page"         "$INDEX" 'href="/solutions'

printf '\n%s[0.4] Solutions nav is a real link on every page%s\n' "$YLW" "$RST"
for p in / /about /how-it-works /solutions /projects /impact /contact; do
  body=$(fetch "$p")
  n=$(printf '%s' "$body" | grep -o '<a[^>]*href="/solutions"[^>]*>[[:space:]]*Solutions[[:space:]]*</a>' 2>/dev/null | wc -l | tr -d ' ')
  check "$p has <a href=\"/solutions\">Solutions</a>" "$n" "1"
done

printf '\n%s[0.6] Contact form — honeypot hidden, not exposed%s\n' "$YLW" "$RST"
CONTACT=$(fetch /contact)
check  "/contact has exactly one <h1>"          "$(count "$CONTACT" '<h1')" "1"
absent "no visible 'Website' label"              "$CONTACT" '>Website<'
exists "emails labelled 'General enquiries'"     "$CONTACT" "General enquiries"
exists "emails labelled 'Chief Executive Officer'" "$CONTACT" "Chief Executive Officer"
exists "'Media / Press' subject option"          "$CONTACT" "Media / Press"
exists "general enquiries address is info@"       "$CONTACT" "info@gogreenmw.com"
absent "old admin@ address is gone"              "$CONTACT" "admin@gogreenmw.com"

# The honeypot is client-rendered, so it only exists in the JS bundle.
CHUNK=""
for j in $(printf '%s' "$CONTACT" | grep -o '/_next/static/chunks/[^"]*\.js' | sort -u); do
  body=$(curl -sS --max-time 45 -A "verify-fixes/1.0" "$BASE$j?$CB")
  if printf '%s' "$body" | grep -q 'website_url_confirm'; then CHUNK="$body"; break; fi
done
if [ -z "$CHUNK" ]; then
  FAIL=$((FAIL+1)); printf '  %sFAIL%s  %-58s %s(honeypot field not found in any JS chunk)%s\n' "$RED" "$RST" "honeypot present in client bundle" "$RED" "$RST"
else
  exists "honeypot 'website_url_confirm' in bundle" "$CHUNK" "website_url_confirm"
  exists "honeypot hidden via display:none"         "$CHUNK" 'display:"none"'
  exists "honeypot hidden via aria-hidden"          "$CHUNK" "aria-hidden"
  exists "honeypot removed from tab order"          "$CHUNK" "tabIndex"
  exists "success banner is role=status"            "$CHUNK" 'role:"status"'
fi

printf '\n%s[0.3] Impact page de-duplicated from homepage%s\n' "$YLW" "$RST"
IMPACT=$(fetch /impact)
check "/impact shows 6 placeholder metrics"  "$(count "$IMPACT" 'Placeholder metric')" "6"
check "homepage shows none"                  "$(count "$INDEX"  'Placeholder metric')" "0"
absent "old untrimmed impact copy is gone"   "$IMPACT" "unreliable traditional sources"

printf '\n%s[global] Structure%s\n' "$YLW" "$RST"
for p in / /about /how-it-works /solutions /projects /impact /contact /404; do
  body=$(fetch "$p")
  n=$(count "$body" '<h1')
  check "$p has exactly one <h1>" "$n" "1"
done

printf '\n%s────────────────────────────────────────%s\n' "$DIM" "$RST"
printf '  %spassed: %d%s   %sfailed: %d%s\n' "$GRN" "$PASS" "$RST" "$([ "$FAIL" -gt 0 ] && printf '%s' "$RED" || printf '%s' "$DIM")" "$FAIL" "$RST"
printf '\n'

[ "$FAIL" -eq 0 ] || exit 1
