"use client";

import { useState } from "react";
import { HERO } from "@/lib/data";
import s from "./hero.module.css";

// WCAG 2.2.2: the idle train can be stopped. The scene listens to this button's clicks; this
// component only swaps its label. Hidden without JS and in reduced motion (nothing to pause).
export function HeroPause() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      className={`${s.pause} ${s.caps}`}
      data-pause=""
      data-paused={paused ? "" : undefined}
      onClick={() => setPaused((v) => !v)}
    >
      <span className={s.pzIco} aria-hidden="true" />
      <span className={s.pzT}>{paused ? HERO.play : HERO.pause}</span>
      <span className="sr-only"> {HERO.pauseHint}</span>
    </button>
  );
}
