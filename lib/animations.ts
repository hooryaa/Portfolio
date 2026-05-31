import type { Variants } from 'framer-motion'

// ── Easing ──────────────────────────────────────────────────────────────────
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT    = [0.4, 0, 0.2, 1] as const
export const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1] as const

// ── Durations ──────────────────────────────────────────────────────────────
export const DUR_FAST     = 0.4
export const DUR_STANDARD = 0.8
export const DUR_SLOW     = 1.4
export const DUR_CRAWL    = 2.2

// ── Framer Motion Variants ──────────────────────────────────────────────────

/** Fade + slide up */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR_SLOW,
      delay: i * 0.12,
      ease: EASE_CINEMATIC,
    },
  }),
}

/** Blur-in reveal */
export const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: DUR_CRAWL,
      delay: i * 0.15,
      ease: EASE_CINEMATIC,
    },
  }),
}

/** Container stagger */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/** Stagger item */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_STANDARD, ease: EASE_CINEMATIC },
  },
}

/** Scale in */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR_SLOW, ease: EASE_CINEMATIC },
  },
}

/** Slide from left */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DUR_SLOW,
      delay: i * 0.1,
      ease: EASE_CINEMATIC,
    },
  }),
}

/** Slide from right */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DUR_SLOW,
      delay: i * 0.1,
      ease: EASE_CINEMATIC,
    },
  }),
}

/** Glitch reveal */
export const glitchRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    skewX: -5,
    filter: 'blur(8px) brightness(2)',
  },
  visible: {
    opacity: 1,
    skewX: 0,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: DUR_SLOW,
      ease: EASE_OUT_EXPO,
    },
  },
}
