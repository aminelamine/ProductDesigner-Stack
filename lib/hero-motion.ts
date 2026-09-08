import type { Variants } from "motion/react";

export interface HeroEntryVariants {
  container: Variants;
  item: Variants;
}

const FULL: HeroEntryVariants = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  },
};

// prefers-reduced-motion (spec P-001, CA-15): the entry sequence collapses to a
// plain opacity fade capped at 150ms — no translate, no stagger delay.
const REDUCED: HeroEntryVariants = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0 } },
  },
  item: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.15 } },
  },
};

export function getHeroEntryVariants(shouldReduce: boolean): HeroEntryVariants {
  return shouldReduce ? REDUCED : FULL;
}
