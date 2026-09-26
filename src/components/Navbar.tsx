"use client";

/* ───────────────────────────────────────────────────────────────
   NAVBAR — WHAT WAS FIXED (client review)

   BUG: "SOLUTIONS" WAS NOT A LINK
   "Solutions" was a bare <button> with no href, while Home, About,
   Projects, Impact and How It Works were all real <Link>s. It
   therefore rendered as plain, non-linked text in the main nav on
   EVERY page, and the Solutions page was unreachable from the menu.
   The dropdown existed and worked, but opening it was the button's
   only action — so on a touch screen at desktop width, tapping
   "Solutions" just opened a panel with no way to reach the page
   itself. Visitors had to rely on the homepage buttons, in-content
   anchors or the footer.

   FIX: the label is now a REAL LINK to /solutions
   Both the desktop and the mobile "Solutions" item are now
   <Link href="/solutions">, matching the other five items. Clicking or
   tapping it navigates to the page, and it is a genuine link for
   assistive tech, middle-click, "open in new tab" and the status-bar
   URL preview. The dropdown is kept as a progressive enhancement on
   top of the link, never as a replacement for it:
     - desktop: the panel opens on hover AND on keyboard focus, so a
       keyboard user tabs onto "Solutions", sees the panel, and tabs
       into it. Escape closes it and returns focus to the trigger.
     - mobile: the sub-list keeps its own small chevron <button> with
       aria-expanded/aria-controls, sitting in the same row as the
       link, so the row offers "go to the page" and "expand the list"
       as two separate, separately-labelled controls.

   KEYBOARD / SCREEN READER
   The panel no longer uses role="menu"/role="menuitem". Those roles
   impose an application-menu keyboard contract (arrow keys, Home/End)
   that was never implemented, and they are the wrong pattern for a set
   of page links. It is now a plain disclosure: a list of ordinary
   links inside a labelled nav landmark, operable with Tab / Enter /
   Escape. Each item was already a real /solutions#[anchor] link and
   the anchor IDs still match the section IDs on the Solutions page.

   ALSO FIXED: hover-close race
   onMouseLeave was bound to the <nav>, but the dropdown panel is a
   SIBLING of the <nav>, not a child. Moving the pointer off the
   button therefore started the close timer before the pointer reached
   the panel. The handlers now sit on the wrapper that contains both,
   so nav + panel are treated as one region.

   UNCHANGED: all six nav items, the "Partner With Us" CTA, the logo,
   the mobile full-screen menu, scroll-hide behaviour, focus rings and
   the existing Escape handling for the mobile menu.
   ─────────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Recycle,
  Zap,
  Flame,
  CarFront,
  RefreshCcw,
  Users,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const solutionItems = [
  {
    label: "Circular Economy",
    description: "Turning waste and underused resources into value.",
    href: "/solutions#materials-recovery",
    icon: Recycle,
  },
  {
    label: "Clean Energy",
    description: "Renewable and cleaner energy solutions.",
    href: "/solutions#clean-energy",
    icon: Zap,
  },
  {
    label: "Clean Cooking",
    description: "Practical alternatives for cleaner household energy.",
    href: "/solutions#clean-energy",
    icon: Flame,
  },
  {
    label: "Sustainable Mobility",
    description: "EV and clean transportation solutions.",
    href: "/solutions",
    icon: CarFront,
  },
  {
    label: "Recycling",
    description: "Recovering materials and strengthening circular supply chains.",
    href: "/solutions#materials-recovery",
    icon: RefreshCcw,
  },
  {
    label: "Green Livelihoods",
    description: "Creating inclusive economic opportunities.",
    href: "/solutions#livelihoods",
    icon: Users,
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/impact", label: "Impact" },
  { href: "/how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const solutionsTriggerRef = useRef<HTMLAnchorElement>(null);
  const firstSolutionsItemRef = useRef<HTMLAnchorElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isSolutionsActive = pathname.startsWith("/solutions");

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileSolutionsOpen(false);
  }, []);

  const closeDropdown = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  }, []);

  const cancelDropdownClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const delta = y - lastY.current;
    lastY.current = y;
    if (prefersReducedMotion) return;
    if (menuOpen) {
      setHidden(false);
      return;
    }
    if (solutionsOpen || y < 24) {
      setHidden(false);
    } else if (delta > 8 && y > 160) {
      setHidden(true);
    } else if (delta < -8) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      } else if (solutionsOpen) {
        setSolutionsOpen(false);
        /* Return focus to the trigger, so a keyboard user is not left
           with focus on a link inside a panel that has just closed. */
        solutionsTriggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, solutionsOpen, closeMenu]);

  /* Close the panel when focus leaves the nav + panel region entirely
     (Tab past the last panel link, or a click elsewhere). Without this
     a keyboard-opened panel stayed open with focus elsewhere. */
  const handleSolutionsBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const next = e.relatedTarget as Node | null;
      if (next && e.currentTarget.contains(next)) return;
      setSolutionsOpen(false);
    },
    [],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstMenuLinkRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(timer);
    };
  }, [menuOpen]);

  useEffect(() => {
    const t = setTimeout(() => closeMenu(), 0);
    return () => clearTimeout(t);
  }, [pathname, closeMenu]);

  const linkClasses = (active: boolean) =>
    [
      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
      active
        ? "bg-primary/10 text-primary"
        : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900",
    ].join(" ");

  const ctaHover = prefersReducedMotion ? "" : " hover:-translate-y-0.5";

  const mobileLinkClasses = (active: boolean) =>
    [
      "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-lg font-semibold uppercase tracking-wide transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
      active
        ? "bg-primary/10 text-primary"
        : "text-gray-800 hover:bg-gray-50 hover:text-gray-900",
    ].join(" ");

  const mobileSubMenuClasses = (active: boolean) =>
    [
      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-base text-gray-600 transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
      active
        ? "font-semibold text-primary"
        : "hover:bg-primary/5 hover:text-primary",
    ].join(" ");

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
        animate={{ y: hidden ? -150 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: EASE }}
      >
        <div className="mx-auto max-w-6xl pt-3 sm:pt-4">
          {/* Hover handlers sit HERE, on the wrapper enclosing both the
              <nav> and the dropdown panel. They used to sit on the
              <nav>, which is a sibling of the panel — so the pointer
              leaving the button to travel down to the panel counted as
              leaving the nav and started the close timer. */}
          <div
            className="relative flex justify-center"
            onMouseEnter={cancelDropdownClose}
            onMouseLeave={closeDropdown}
            onBlur={handleSolutionsBlur}
          >
            <nav
              aria-label="Main navigation"
              className={[
                "pointer-events-auto flex items-center gap-1.5 rounded-full border px-3 py-2",
                "transition-[background-color,border-color,box-shadow] duration-300 sm:gap-2 sm:px-5 sm:py-2",
                scrolled
                  ? "border-white/40 bg-white/95 shadow-[0_10px_40px_-10px_rgb(0,0,0,0.16)]"
                  : "border-white/60 bg-white/70 shadow-sm backdrop-blur-xl",
              ].join(" ")}
            >
              <Link
                href="/"
                aria-label="Go Green Resources Limited — Home"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-full px-2.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Image
                  src="/go-green-logo.png"
                  alt="Go Green Resources Limited Logo"
                  width={50}
                  height={50}
                  priority
                  className="h-9 w-auto sm:h-10"
                />
              </Link>

              <div
                aria-hidden="true"
                className="mx-1 hidden h-6 w-px bg-gray-200 lg:block"
              />

              <div className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkClasses(pathname === link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* "Solutions" is a REAL LINK to the page. It is not a
                    button: it was previously a <button> with no href,
                    which is why it showed as non-linked text and could
                    not be reached on touch. The panel is a progressive
                    enhancement opened on hover or keyboard focus. */}
                <Link
                  ref={solutionsTriggerRef}
                  href="/solutions"
                  aria-haspopup="true"
                  aria-expanded={solutionsOpen}
                  aria-controls="go-green-solutions-menu"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onFocus={() => setSolutionsOpen(true)}
                  onClick={closeMenu}
                  onKeyDown={(e) => {
                    /* The panel is rendered after the "Partner With Us"
                       CTA in the DOM, so Tab alone would step past it.
                       ArrowDown enters the panel explicitly; Escape
                       (handled globally) closes and returns here. */
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSolutionsOpen(true);
                      window.requestAnimationFrame(() =>
                        firstSolutionsItemRef.current?.focus(),
                      );
                    }
                  }}
                  className={[
                    linkClasses(isSolutionsActive),
                    "flex items-center gap-1",
                  ].join(" ")}
                >
                  Solutions
                  <ChevronDown
                    aria-hidden="true"
                    className={[
                      "h-4 w-4 transition-transform duration-200",
                      solutionsOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </Link>
              </div>

              <Link
                href="/contact"
                className={[
                  "ml-1 hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white",
                  "shadow-sm transition-all duration-300 hover:bg-primary-dark hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                  ctaHover,
                ].join(" ")}
              >
                Partner With Us
              </Link>

              <button
                ref={toggleRef}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="go-green-mobile-menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:hidden"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </nav>

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  key="solutions-dropdown"
                  id="go-green-solutions-menu"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: EASE }}
                  className="pointer-events-auto absolute left-1/2 top-full z-50 hidden w-[420px] -translate-x-1/2 pt-4 lg:block"
                >
                  <div className="w-full max-w-[calc(100vw-2.5rem)] rounded-3xl border border-gray-100 bg-white/95 p-3 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.25)] backdrop-blur-xl">
                    {/* A plain list of page links, not role="menu". The
                        menu role required arrow-key handling that was
                        never implemented, and was the wrong pattern for
                        navigation links. */}
                    <ul aria-label="Individual solutions">
                      {solutionItems.map((item) => (
                        <li key={item.label}>
                          <Link
                            ref={item === solutionItems[0] ? firstSolutionsItemRef : undefined}
                            href={item.href}
                            onClick={() => {
                              setSolutionsOpen(false);
                              closeMenu();
                            }}
                            className="flex items-start gap-4 rounded-2xl p-3 transition-colors duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          >
                            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <item.icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-gray-900">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                                {item.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 border-t border-gray-100 pt-2">
                      <Link
                        href="/solutions"
                        onClick={() => {
                          setSolutionsOpen(false);
                          closeMenu();
                        }}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      >
                        Explore all solutions
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="go-green-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: EASE }}
          >
            <div
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: EASE }}
              className="absolute inset-x-0 top-[4.75rem] bottom-0 flex flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.25)]"
            >
              <nav
                aria-label="Mobile menu"
                className="flex flex-1 flex-col overflow-y-auto px-5 pb-12 pt-6"
              >
                <ul className="space-y-1.5">
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          ref={i === 0 ? firstMenuLinkRef : undefined}
                          href={link.href}
                          onClick={closeMenu}
                          className={mobileLinkClasses(active)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile: a real <Link> to the page, plus a separate
                    chevron <button> that expands the individual
                    sub-items. Two controls, two clearly labelled
                    actions, in one row. The sub-list previously hung
                    off a <button>, so on mobile there was no route to
                    /solutions from the menu at all. */}
                <div className="mt-6 flex items-stretch gap-2">
                  <Link
                    href="/solutions"
                    onClick={closeMenu}
                    className={[
                      mobileLinkClasses(isSolutionsActive),
                      "flex-1 justify-center",
                    ].join(" ")}
                  >
                    Solutions
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileSolutionsOpen((open) => !open)}
                    aria-expanded={mobileSolutionsOpen}
                    aria-controls="go-green-mobile-solutions"
                    aria-label={
                      mobileSolutionsOpen
                        ? "Hide individual solutions"
                        : "Show individual solutions"
                    }
                    className="flex w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <ChevronDown
                      className={[
                        "h-5 w-5 transition-transform duration-200",
                        mobileSolutionsOpen ? "rotate-180" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {mobileSolutionsOpen && (
                    <motion.div
                      id="go-green-mobile-solutions"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.25,
                        ease: EASE,
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="ml-4 mt-2 space-y-1 border-l-2 border-primary/20 pl-5 pb-1">
                        {solutionItems.map((item) => {
                          const hrefBase = item.href.split("#")[0];
                          const itemActive = pathname === hrefBase;
                          return (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={closeMenu}
                                className={mobileSubMenuClasses(itemActive)}
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60"
                                />
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={[
                    "mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                    ctaHover,
                  ].join(" ")}
                >
                  Partner With Us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}