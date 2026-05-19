"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ExternalLink, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT, FOOTER_LINKS } from "@/lib/data";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const hidden = shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const visible = shouldReduce ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 });

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24">
      {/* Section index */}
      <motion.p
        initial={hidden}
        animate={visible}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase"
      >
        04 / Contact
      </motion.p>

      {/* Title + rule */}
      <motion.div
        initial={hidden}
        animate={visible}
        transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.08 }}
        className="flex items-center gap-4"
      >
        <h2 className="text-3xl font-bold tracking-tight">{CONTACT.title}</h2>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      <div className="mt-8 max-w-2xl space-y-6">
        <motion.p
          initial={hidden}
          animate={visible}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.14 }}
          className="text-base leading-relaxed text-muted-foreground"
        >
          {CONTACT.description}
        </motion.p>

        <motion.div
          initial={hidden}
          animate={visible}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.20 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "w-full gap-2 sm:w-auto",
            })}
          >
            <Mail className="h-4 w-4" />
            {CONTACT.ctaText}
          </a>
        </motion.div>

        <motion.p
          initial={hidden}
          animate={visible}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.26 }}
          className="font-mono text-xs text-muted-foreground"
        >
          {CONTACT.email}
        </motion.p>

        <motion.nav
          initial={hidden}
          animate={visible}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.30 }}
          className="flex items-center gap-5"
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary uppercase"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
