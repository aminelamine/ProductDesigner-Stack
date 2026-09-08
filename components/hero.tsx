"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroIllustration } from "@/components/hero-illustration";
import { fontDriveDisplay, fontDriveSans } from "@/lib/fonts";
import { getHeroEntryVariants } from "@/lib/hero-motion";
import { HERO } from "@/lib/data";

export function Hero() {
  const shouldReduce = useReducedMotion();
  const { container: containerVariants, item: itemVariants } =
    getHeroEntryVariants(!!shouldReduce);

  return (
    <section
      id="hero"
      className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive`}
    >
      {/* Entry sequence — exactly 3 motion.div (CA-14): container + 2 items */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <h1 className={fontDriveDisplay.className}>{HERO.headline}</h1>
        </motion.div>

        <motion.div variants={itemVariants} className={fontDriveSans.className}>
          <HeroIllustration />
          <p>{HERO.subtitle}</p>
          <div>
            <a
              href="#contact"
              className={buttonVariants({ variant: "outline" })}
            >
              Me contacter
            </a>
            <a
              href="https://obsolet.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
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
