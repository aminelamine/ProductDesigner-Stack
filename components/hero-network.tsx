"use client";

import { useRef } from "react";
import { useHeroNetwork } from "@/hooks/use-hero-network";
import s from "./hero.module.css";

const LINES = [0, 1, 2];
const GROUPS = [s.g1, s.g2, s.g3];

// The plan: one decorative SVG (aria-hidden, focusable=false), drawn from lib/hero-network.ts,
// recomputed on resize and when the fonts land. It overflows downward — that is the junction.
export function HeroNetwork() {
  const svg = useRef<SVGSVGElement>(null);
  useHeroNetwork(svg);
  return (
    <svg ref={svg} className={s.net} aria-hidden="true" focusable="false">
      {LINES.map((i) => (
        <g key={i} className={`${s.grp} ${GROUPS[i]}`}>
          <path className={s.ln} pathLength={1} d="M0 0" data-line={i} />
          <rect className={s.mkBar} data-bar={i} />
        </g>
      ))}
      <g>
        {LINES.map((i) => (
          <circle key={i} className={s.mkInk} data-ink={i} r="0" />
        ))}
      </g>
      <g className={`${s.grp} ${s.gx}`}>
        <path className={s.exitBase} pathLength={1} d="M0 0" data-exit="" />
        {LINES.map((k) => (
          <path key={k} className={s.fseg} d="M0 0" data-fseg={k} />
        ))}
      </g>
      <g className={s.loopg}>
        <circle className={s.loop} r="3" data-loop="" />
      </g>
      <circle className={s.ring} r="14" data-ring="" />
      <circle className={`${s.nd} ${s.ndHalo}`} r="9" data-halo="" />
      <circle className={`${s.nd} ${s.ndCore}`} r="6" data-core="" />
      <circle className={s.train} r="4" data-train="" />
    </svg>
  );
}
