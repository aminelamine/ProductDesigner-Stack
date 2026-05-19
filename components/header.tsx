"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE, NAV_ITEMS } from "@/lib/data";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 md:px-8">
        {/* Logo — mono style */}
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
        >
          {SITE.name.split(" ").map((w) => w[0]).join("")}
          <span className="ml-2 text-primary">◆</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className:
                    "gap-1.5 font-mono text-xs tracking-wide uppercase text-muted-foreground hover:text-foreground",
                })}
              >
                {item.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className:
                    "font-mono text-xs tracking-wide uppercase text-muted-foreground hover:text-foreground",
                })}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
