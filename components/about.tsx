"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { ABOUT } from "@/lib/data";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  // When reduced motion: start visible, no movement
  const at = shouldReduce ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 });
  const hidden = shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };

  return (
    <section id="about" ref={ref} className="py-16 md:py-24">
      {/* Section index */}
      <motion.p
        initial={hidden}
        animate={at}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase"
      >
        02 / Manifeste
      </motion.p>

      {/* Title + accent rule */}
      <motion.div
        initial={hidden}
        animate={at}
        transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.08 }}
        className="flex items-center gap-4"
      >
        <h2 className="text-3xl font-bold tracking-tight">{ABOUT.title}</h2>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* Paragraphs */}
      <div className="mt-8 max-w-2xl space-y-5">
        {ABOUT.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={hidden}
            animate={at}
            transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.12 + i * 0.07 }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </motion.p>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: shouldReduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.12 + ABOUT.paragraphs.length * 0.07 }}
        >
          <a
            href="https://obsolet.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-primary transition-opacity hover:opacity-70"
          >
            {ABOUT.ctaText}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
