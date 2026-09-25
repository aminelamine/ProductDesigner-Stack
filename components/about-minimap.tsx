"use client";

import { useRef, type KeyboardEvent, type MouseEvent } from "react";
import type { FlatStep } from "@/lib/about-timeline";
import { minimapKey, stationName } from "@/lib/about-text";
import { PARCOURS } from "@/lib/data";
import s from "./about.module.css";

interface AboutMinimapProps {
  steps: readonly FlatStep[];
  onGo: (stationIndex: number) => void;
}

// The 7 postes as links. Enter brings the head onto the poste; ← → Home End move between them.
// The scene sets aria-current="step" on the poste under the head.
export function AboutMinimap({ steps, onGo }: AboutMinimapProps) {
  const postes = steps.map((f, i) => (f.step.kind === "poste" ? i : -1)).filter((i) => i >= 0);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  const click = (e: MouseEvent, si: number) => {
    e.preventDefault();
    onGo(si);
  };
  const key = (e: KeyboardEvent, j: number) => {
    const k = minimapKey(e.key, j, postes.length);
    if (k === null) return;
    e.preventDefault();
    links.current[k]?.focus({ preventScroll: true });
    onGo(postes[k]);
  };

  return (
    <nav className={s.minimap} aria-label={PARCOURS.minimapLabel} data-minimap="">
      <div className={s.mmArt} aria-hidden="true">
        <svg className={s.mmBase} data-mm-svg="" />
        <div className={s.mmDone} data-mm-done="">
          <div className={s.mmDoneIn} data-mm-done-in="">
            <svg className={s.mmLit} data-mm-svg="" />
          </div>
        </div>
        <span className={s.mmHead} data-mm-head="" />
      </div>
      <ol className={s.mmList}>
        {postes.map((si, j) => (
          <li key={si}>
            <a
              ref={(el) => {
                links.current[j] = el;
              }}
              className={s.mmSt}
              href={`#${steps[si].step.id}`}
              data-mm={si}
              onClick={(e) => click(e, si)}
              onKeyDown={(e) => key(e, j)}
            >
              <span className={s.mmDot} aria-hidden="true" />
              <span className="sr-only">{stationName(steps[si].step.org, steps[si].step.start)}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
