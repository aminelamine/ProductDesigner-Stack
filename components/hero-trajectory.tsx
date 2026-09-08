"use client";

import { useEffect, useState } from "react";
import { HeroWaypoint } from "@/components/hero-illustration";
import { fontDriveDisplay } from "@/lib/fonts";
import { getRailClassName } from "@/lib/hero-rail";
import { buildHeroTrajectory, guardTrailingPipe } from "@/lib/hero-trajectory";
import { cn } from "@/lib/utils";
import { HERO } from "@/lib/data";

export interface HeroTrajectoryProps {
  shouldReduce: boolean;
}

// Degressive marker size per index, in em (ratio 5:4:3, carried from the
// v1 signpost's "bras dégressifs" reading — Points tranchés, brief cycle 2).
const MARKER_WIDTH_CLASS = ["w-[0.5em] h-[0.5em]", "w-[0.4em] h-[0.4em]", "w-[0.3em] h-[0.3em]"];

const ROW_TYPE_SCALE =
  "text-[40px] leading-[0.95] tracking-[-0.02em] sm:text-[56px] md:text-[77px] lg:text-[120px]";

export function HeroTrajectory({ shouldReduce }: HeroTrajectoryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stops = buildHeroTrajectory(HERO.headline);

  return (
    <h1 className={cn(fontDriveDisplay.className, "flex flex-col gap-1 text-primary")}>
      {stops.map((stop, index) => {
        const { lead, guarded, nowrap } = guardTrailingPipe(stop.segment);
        return (
          <div
            key={stop.id}
            className={cn("relative flex items-baseline gap-4 md:gap-6 lg:gap-8", ROW_TYPE_SCALE)}
          >
            {index < stops.length - 1 && (
              <span
                aria-hidden="true"
                className={getRailClassName(index, shouldReduce, mounted)}
              />
            )}
            <span className="flex w-[0.55em] shrink-0 items-center justify-center">
              <HeroWaypoint className={MARKER_WIDTH_CLASS[index]} />
            </span>
            {/* CA-7: only the line ending in " |" needs its last word +
                separator glued into one nowrap unit. The line with no "|"
                (nowrap === false) is plain text and must reflow normally —
                wrapping it whole in `whitespace-nowrap` is the cycle 2
                regression that overflowed "Agentic Design" past 300px. */}
            <span className="block">
              {lead}
              {nowrap ? <span className="whitespace-nowrap">{guarded}</span> : guarded}
            </span>
          </div>
        );
      })}
    </h1>
  );
}
