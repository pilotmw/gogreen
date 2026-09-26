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

# ---------------------------------------------------------------------------
# PREFLIGHT - refuse to run against an unreachable target.
#
# Without this, a connection failure makes `fetch` return an EMPTY body, and
# every `absent` assertion then passes vacuously. A network error would be
# reported as a clean bill of health, which is the worst possible failure
# mode for a smoke test. Caught in practice: the first local run of this
# script reported 19 passes against a server WSL could not reach.
# ---------------------------------------------------------------------------
if ! curl -sS --max-time 30 -o /dev/null -A "verify-fixes/1.0" "$BASE/?$CB"; then
  printf 'FATAL: cannot reach %s - aborting rather than reporting false passes.\n' "$BASE" >&2
  printf 'If BASE is a local server and you are in WSL, use the Windows host IP\n' >&2
  printf '(ip route show default | awk "{print \\$3}") instead of 127.0.0.1.\n' >&2
  exit 2
fi

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

printf '\n%s[0.4] Pre-operational framing (client brief)%s\n' "$YLW" "$RST"
# Every string below was a fabricated or operational claim, verified
# against the rendered HTML. The `absent` assertions are the ones that
# matter: they fail if any of the old copy is ever reintroduced.
PROJ=$(fetch /projects)
HOWIT=$(fetch /how-it-works)

absent "homepage has no '1,200+'-style figure"  "$INDEX" '1,200+'
absent "homepage has no '3,500+'-style figure"  "$INDEX" '3,500+'
absent "no '>Ongoing<' project status"          "$PROJ"  '>Ongoing<'
absent "no '>Completed<' project status"        "$PROJ"  '>Completed<'
absent "no invented 'Lilongwe, 2025' case study" "$INDEX" 'Lilongwe, 2025'
absent "no 'waste is recovered rather than'"    "$INDEX" 'waste is recovered rather than'
absent "no 'every project we deliver'"          "$INDEX" 'every project we deliver'
absent "meta description no longer 'develops'"  "$INDEX" 'Limited develops circular economy'
absent "OG description no longer 'Transforming'" "$INDEX" 'content="Transforming waste'
absent "communities not stated as partners yet" "$ABOUT" 'Communities are delivery partners'
absent "no 'we work with directly' on About"    "$ABOUT" 'we work with directly'

exists "founding-phase stage statement"         "$ABOUT" 'founding phase'
exists "first pilot framed as intent"           "$INDEX" 'Our First Pilot Site'
exists "roadmap heading on /projects"           "$PROJ"  'Our Roadmap'
exists "impact goals heading on /impact"        "$IMPACT" 'Our Impact Goals'
exists "partner strip admits no partners yet"   "$INDEX" 'no partners in place yet'
exists "targets-not-results note on /impact"    "$IMPACT" 'not results'
absent "financing section claims no badge"      "$HOWIT" 'Financing secured'
# Added after the first negative control: the PartnerLogos reframe had been
# made but nothing asserted the old claim was gone, so a revert would have
# passed the suite. The mutant run is what surfaced this.
absent "old partner-network claim is gone"      "$INDEX" 'We work with government institutions, development partners, funders and private-sector clients.'
# The strip used to render "In partnership with" directly above "We have no
# partners in place yet", contradicting its own disclaimer.
absent "no 'In partnership with' label"         "$INDEX" 'In partnership with'
absent "no 'are delivery partners' claim"       "$ABOUT" 'Communities are delivery partners'
# The status badges are card text, not the filter tab ids, so anchor on the
# element boundary: 'project-status-tab-Ongoing' must not satisfy this.
absent "no project card badge says Ongoing"     "$PROJ"  '>Ongoing<'
absent "no project card badge says Completed"   "$PROJ"  '>Completed<'

# Client-supplied 2026-09-26: registration COY-4A4SKYK, incorporation 2026.
# These assert the real values are PUBLISHED, and that no literal
# placeholder token survives. Note the escaping: `count` runs `grep -o`, so
# an unquoted "[year]" is a character class that would match any y/e/a/r and
# pass for the wrong reason.
exists "registration number published"           "$ABOUT" 'COY-4A4SKYK'
exists "incorporation year in legal strip"       "$ABOUT" '>2026</dd>'
absent "no literal [year] token"                 "$ABOUT" '\[year\]'
# Client decision 2026-09-26: the timeline no longer prints "PLACEHOLDER" or
# "20XX" at visitors. Milestone 01 shows the real year; 02 and 03 say
# "Timing to be confirmed", the same wording <RoadmapPhases /> uses. These
# `check` forms count the exact year cell, so they also pin the counts - a
# plain `exists` would not notice a milestone going missing.
#
# Scoped to the OLD milestone strings rather than the bare word "PLACEHOLDER":
# the team-photo block further down the page still labels itself
# "Placeholder image" and is a separate, still-open decision. Asserting the
# bare word here would fail for that block and would tempt someone to delete
# a check rather than raise the real question.
absent "no old milestone PLACEHOLDER copy"       "$ABOUT" 'PLACEHOLDER [-—] confirm'
absent "no 20XX year token"                      "$ABOUT" '20XX'
check "exactly 1 milestone dated 2026"           "$(count "$ABOUT" 'text-primary">2026</p>')" "1"
check "exactly 2 milestones say to be confirmed" "$(count "$ABOUT" 'text-primary">Timing to be confirmed</p>')" "2"
# The provenance line under the legal strip was removed at the client's request.
absent "no 'supplied by the company' note"       "$ABOUT" 'supplied by the company'
# The footer previously said "solutions that transform waste…", an
# operational claim the first audit missed.
absent "footer makes no 'that transform' claim"  "$INDEX" 'that transform'

# The brief's hard constraint: reframing the tense must not cost the site
# its technical substance. These live on /solutions and /projects, not the
# homepage - the first pass of these assertions wrongly pointed at $INDEX
# and failed, so the location is stated explicitly here.
SOLUTIONS=$(fetch /solutions)
exists "technical depth: anaerobic digestion"   "$SOLUTIONS" 'naerobic digestion'
exists "technical depth: bio-slurry"            "$SOLUTIONS" 'io-slurry'
exists "technical depth: black soldier fly"     "$SOLUTIONS" 'lack soldier fly'
exists "technical depth: cylinder exchange"     "$SOLUTIONS" 'ylinder exchange'
exists "technical depth: materials recovery"    "$INDEX" 'aterials recovery'

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
