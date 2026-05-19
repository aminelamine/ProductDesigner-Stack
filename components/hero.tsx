"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HERO } from "@/lib/data";

const STAGGER = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  },
};

export function Hero() {
  const shouldReduce = useReducedMotion();

  const containerVariants = shouldReduce ? {} : STAGGER.container;
  const itemVariants = shouldReduce ? {} : STAGGER.item;
  const fadeVariants = shouldReduce ? {} : STAGGER.fade;

  return (
    <section
      id="hero"
      className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-between py-10 md:py-14"
    >
      {/* ── Metadata bar ── */}
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="show"
        className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase"
      >
        <span>AL</span>
        <span className="text-border">·</span>
        <span>Product Designer</span>
        <span className="text-border">·</span>
        <span>2026</span>
      </motion.div>

      {/* ── Main block ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:gap-16"
      >
        {/* Headline */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Je ne fais pas
            <br />
            de{" "}
            <span className="text-primary">l&apos;IA.</span>
            <br />
            Je pense
            <br />
            avec.
          </h1>
        </motion.div>

        {/* Right panel — status + positioning */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-end gap-5 md:items-end"
        >
          {/* Availability badge */}
          <div className="flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Disponible</span>
          </div>

          <div className="h-px w-24 bg-border md:w-full" />

          {/* Positioning */}
          <p className="font-mono text-xs leading-relaxed tracking-wide text-muted-foreground md:text-right">
            Design
            <br />
            × IA
            <br />× Systèmes
          </p>
        </motion.div>
      </motion.div>

      {/* ── Accent rule + CTAs ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-12 flex flex-col gap-6"
      >
        {/* Amber accent line */}
        <motion.div
          variants={fadeVariants}
          className="h-px w-20 bg-primary"
        />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-md text-base leading-relaxed text-muted-foreground"
        >
          {HERO.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#contact"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            Me contacter
          </a>
          <a
            href="https://obsolet.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full gap-1.5 sm:w-auto",
            })}
          >
            Lire Obsolet
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
