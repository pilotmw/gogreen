"use client";

import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Recycle, Zap, Leaf, Users, ChevronDown } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  /** Short proof-oriented line rendered below the CTA buttons. */
  tagline?: string;
}

const valueIndicators = [
  { label: "Circular Economy", icon: Recycle },
  { label: "Green Energy", icon: Zap },
  { label: "Climate Action", icon: Leaf },
  { label: "Sustainable Livelihoods", icon: Users },
];

const heroImages = ["/Hero_1.png", "/Hero_2.jpg"];

const DISPLAY_DURATION = 7000;
const CROSSFADE_DURATION = 1800;
const HERO_IMAGE_OPACITY = 0.9;

const subscribePrefersReducedMotion = (onStoreChange: () => void) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getPrefersReducedMotionSnapshot = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  tagline,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    () => false
  );
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({ 0: true });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    heroImages.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.onload = () => {
        if (isMountedRef.current) {
          setImagesLoaded(prev => ({ ...prev, [index]: true }));
        }
      };
    });
  }, []);

  const advanceSlideshow = useCallback(() => {
    if (!isMountedRef.current) return;

    const next = (currentIndex + 1) % heroImages.length;

    if (prefersReducedMotion) {
      setIsTransitioning(false);
      setNextIndex(next);
      setCurrentIndex(next);
      return;
    }

    setIsTransitioning(true);
    setNextIndex(next);

    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      setCurrentIndex(next);
      setIsTransitioning(false);
    }, CROSSFADE_DURATION);
  }, [currentIndex, prefersReducedMotion]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      advanceSlideshow();
    }, DISPLAY_DURATION);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [advanceSlideshow]);

  const heroTextClass =
    "text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85),0_1px_3px_rgba(0,0,0,0.8)]";

  return (
    <section className="relative min-h-[650px] md:min-h-[750px] lg:min-h-[800px] flex items-center bg-[#f8faf8] overflow-hidden">
      {/* LAYER 1: BACKGROUND IMAGE SLIDESHOW */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
        <div
          data-hero-layer="true"
          className="absolute inset-0"
          style={{
            opacity: prefersReducedMotion ? HERO_IMAGE_OPACITY : isTransitioning ? 0 : HERO_IMAGE_OPACITY,
            transition: prefersReducedMotion
              ? "none"
              : `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
            zIndex: 0,
          }}
        >
          <img
            src={heroImages[currentIndex]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>

        {!prefersReducedMotion && (
          <div
            data-hero-layer="true"
            className="absolute inset-0"
            style={{
              opacity: isTransitioning ? HERO_IMAGE_OPACITY : 0,
              transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
              zIndex: 1,
            }}
          >
            {imagesLoaded[nextIndex] && (
              <Image
                src={heroImages[nextIndex]}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                quality={85}
              />
            )}
          </div>
        )}
      </div>

      {/* LAYER 2: HERO CONTENT */}
      <div className="relative z-10 w-full py-20 -translate-y-6 md:-translate-y-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={[
                "text-3xl sm:text-4xl lg:text-4xl font-bold leading-snug tracking-tight mb-6 lg:whitespace-nowrap",
                heroTextClass,
              ].join(" ")}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={[
                "text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-6",
                heroTextClass,
              ].join(" ")}
            >
              {subtitle}
            </motion.p>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-gray-900 leading-relaxed max-w-xl mx-auto mb-8 text-justify"
              >
                {description}
              </motion.p>
            )}

            {/* VALUE INDICATORS — single inline row of small badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {valueIndicators.map((item) => (
                <span
                  key={item.label}
                  className={[
                    "inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5",
                    "text-[0.66rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm",
                    "transition-colors duration-300 hover:bg-white/25",
                    heroTextClass,
                  ].join(" ")}
                >
                  <item.icon
                    className="h-3.5 w-3.5 text-primary-light"
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            >
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className="bg-primary text-white px-7 py-3.5 rounded-full font-semibold text-sm md:text-base hover:bg-primary-dark hover:shadow-lg transition-all duration-300 text-center"
                >
                  {primaryCTA.label}
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="border-2 border-primary bg-white/80 text-primary px-7 py-3.5 rounded-full font-semibold text-sm md:text-base hover:bg-primary/5 transition-all duration-300 text-center"
                >
                  {secondaryCTA.label}
                </Link>
              )}
            </motion.div>

            {/* Proof line */}
            {tagline && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className={[
                  "mx-auto mt-8 max-w-2xl text-sm font-medium leading-relaxed md:text-base",
                  heroTextClass,
                ].join(" ")}
              >
                {tagline}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    {/* SCROLL HINT — bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className={[
          "absolute inset-x-0 bottom-5 md:bottom-6 z-10 flex justify-center",
          heroTextClass,
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold tracking-wide uppercase">
            Scroll to see more
          </span>
          <motion.span
            aria-hidden="true"
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.6))]"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}