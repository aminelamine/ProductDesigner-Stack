import { PARCOURS } from "@/lib/data";
import { Sign } from "./about-signs";
import { AboutSkip } from "./about-skip";
import s from "./about.module.css";

// The threshold: « 02 / Parcours », the title, the legend of the four signs, the skip link.
export function AboutSeuil() {
  return (
    <header className={s.seuil} data-seuil="">
      <AboutSkip />
      <h2 id="parcours" className={s.index} tabIndex={-1}>
        <span className={s.num} aria-hidden="true">
          {PARCOURS.index.num}
        </span>
        {PARCOURS.index.label}
      </h2>
      <p className={s.seuilTitle}>{PARCOURS.seuilTitle}</p>
      <ul className={`${s.legend} ${s.caps}`} aria-label={PARCOURS.legendLabel}>
        {PARCOURS.legend.map((l) => (
          <li key={l.sign}>
            <Sign kind={l.sign} />
            {l.label}
          </li>
        ))}
      </ul>
    </header>
  );
}
