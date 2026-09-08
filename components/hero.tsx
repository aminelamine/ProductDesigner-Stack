"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroTrajectory } from "@/components/hero-trajectory";
import { fontDriveDisplay, fontDriveSans } from "@/lib/fonts";
import { getHeroEntryVariants } from "@/lib/hero-motion";
import { cn } from "@/lib/utils";
import { HERO } from "@/lib/data";

const PILL = "h-auto rounded-[60px] border-[1.5px] border-primary bg-transparent px-10 py-3.5 text-[16px] font-light tracking-[-0.02em] text-foreground hover:bg-transparent hover:opacity-70 transition-opacity duration-150";

export function Hero() {
  const shouldReduce = useReducedMotion();
  const { container: containerVariants, item: itemVariants } =
    getHeroEntryVariants(!!shouldReduce);

  return (
    <section
      id="hero"
      // Full-bleed breakout scoped to the hero (ADR-011) — escapes <main>'s
      // max-w-5xl/px-6 md:px-8 without editing app/(site)/layout.tsx (CA-4).
      // overflow-x-clip absorbs the 100vw/scrollbar rounding, scoped here,
      // not on body/html (CA-3).
      className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive relative left-1/2 w-screen -mx-[50vw] overflow-x-clip flex min-h-[calc(100svh-3.5rem)] flex-col justify-center gap-12 bg-background px-6 py-16 text-foreground md:px-16 md:py-20 md:gap-16 lg:px-36`}
    >
      {/* Entry sequence — exactly 3 motion.div (CA-16): container + 2 items.
          The rail inside HeroTrajectory is plain CSS, out of this budget. */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-1 flex-col justify-center gap-12 md:gap-16"
      >
        <motion.div variants={itemVariants}>
          <HeroTrajectory shouldReduce={!!shouldReduce} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`${fontDriveSans.className} flex max-w-2xl flex-col gap-8 font-light`}
        >
          <p className="text-[16px] leading-relaxed tracking-[-0.02em] text-foreground">
            {HERO.subtitle}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "outline" }), PILL)}
            >
              Me contacter
            </a>
            <a
              href="https://obsolet.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), PILL, "gap-1.5")}
            >
              Lire Obsolet
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
