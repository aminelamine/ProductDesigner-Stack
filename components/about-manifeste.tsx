import { frenchSpacing } from "@/lib/about-text";
import { ABOUT } from "@/lib/data";
import s from "./about.module.css";

// The manifeste, version A — immobile text.
export function AboutManifeste() {
  return (
    <div className={s.manifeste}>
      <header className={s.mHead}>
        <h2 id="manifeste" className={s.mTitle} tabIndex={-1}>
          {ABOUT.title}
        </h2>
      </header>
      {ABOUT.paragraphs.map((p) => (
        <div key={p} className={s.mRow}>
          <p className={s.mText}>{frenchSpacing(p)}</p>
        </div>
      ))}
    </div>
  );
}
