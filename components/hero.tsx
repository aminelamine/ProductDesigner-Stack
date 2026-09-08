"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroIllustration } from "@/components/hero-illustration";
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
      className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive flex min-h-[calc(100svh-3.5rem)] flex-col justify-center gap-16 bg-background px-6 py-16 text-foreground md:px-16 md:py-20 lg:px-36`}
    >
      {/* Entry sequence — exactly 3 motion.div (CA-14): container + 2 items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-1 flex-col gap-16 lg:flex-row lg:items-center lg:gap-24"
      >
        <motion.div variants={itemVariants} className="flex-1">
          <h1
            className={`${fontDriveDisplay.className} text-[40px] leading-[0.95] tracking-[-0.02em] text-primary sm:text-[56px] md:text-[77px] lg:text-[120px]`}
          >
            {HERO.headline}
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`${fontDriveSans.className} flex w-full max-w-xs flex-col gap-8 font-light lg:w-72 lg:shrink-0`}
        >
          <HeroIllustration className="h-40 w-32" />

          <p className="text-[16px] leading-relaxed tracking-[-0.02em] text-foreground">
            {HERO.subtitle}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
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
