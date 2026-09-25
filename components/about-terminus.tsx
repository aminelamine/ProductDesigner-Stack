import { ABOUT } from "@/lib/data";
import s from "./about.module.css";

// Amendement A-1 — the terminus of the network, right of the chute (≥ 1024 px): the blue node
// circled in cream with its 40 % ring, « Aujourd'hui » under it, a 40 % dashed line out to the
// right edge, « et après → » above it. Decoration: both labels are already said, in text, by the
// kicker « Arrivée · aujourd'hui » and « L'exploration continue → ». Strokes are SVG (1.5 px
// exactly — a CSS border would be snapped to 1 px).
export function AboutTerminus() {
  return (
    <div className={s.terminus} aria-hidden="true" data-terminus="">
      <svg className={s.tmArt} focusable="false">
        <line className={s.tmLine} x1="36" y1="30" x2="100%" y2="30" />
        <circle className={s.tmRing} cx="16" cy="30" r="14" />
        <circle className={s.tmHalo} cx="16" cy="30" r="9" />
        <circle className={s.tmCore} cx="16" cy="30" r="6" />
      </svg>
      <span className={`${s.tmToday} ${s.caps}`}>{ABOUT.terminus.today}</span>
      <span className={`${s.tmNext} ${s.caps}`}>{ABOUT.terminus.next}</span>
    </div>
  );
}
