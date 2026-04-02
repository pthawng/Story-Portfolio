import type { Variants } from "framer-motion";

// ── Scene transition variants ────────────────────────────────────────────────

export const fadeScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: "blur(8px)",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Stagger container ────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Node animation ────────────────────────────────────────────────────────────

export const nodeVariants: Variants = {
  idle: { scale: 1, boxShadow: "0 0 0px 0px rgba(139,92,246,0)" },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 24px 4px rgba(139,92,246,0.4)",
    transition: { duration: 0.2 },
  },
  active: {
    scale: 1.05,
    boxShadow: "0 0 32px 8px rgba(139,92,246,0.6)",
    transition: { duration: 0.15 },
  },
};

// ── Text glimmer ─────────────────────────────────────────────────────────────

export const glimmerVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
