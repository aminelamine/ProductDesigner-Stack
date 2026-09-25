import { flattenSteps, markYears } from "@/lib/about-timeline";
import { PARCOURS } from "@/lib/data";
import s from "./about.module.css";

// Visual layers of the pinned track — aria-hidden, the readable copy is the <ol>.
// Geometry (path, lefts) is written by the scene after measuring.
export function AboutArt() {
  return (
    <div className={s.art} aria-hidden="true" data-art="">
      <svg className={s.artLines} data-art-svg="">
        <path className={s.ln} d="M0 0" />
        <polygon className={s.ar} points="0,0" />
      </svg>
      {PARCOURS.temps.map((tp, t) => (
        <p key={tp.id} className={s.phrase} data-phrase={t}>
          {tp.title}
        </p>
      ))}
    </div>
  );
}

export function AboutMarks() {
  return (
    <div className={s.marks} aria-hidden="true" data-marks="">
      {markYears(flattenSteps()).map((y) => (
        <span key={y} data-year={y}>
          <span className={s.tick} />
          <span className={s.yr}>{y}</span>
        </span>
      ))}
    </div>
  );
}
