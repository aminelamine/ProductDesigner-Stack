import { ArrowUpRight } from "lucide-react";
import { folio, frenchSpacing, splitKey } from "@/lib/about-text";
import { ABOUT, NEW_TAB_HINT, OBSOLET_URL } from "@/lib/data";
import { AboutManifesteReveal } from "./about-manifeste-reveal";
import { Odometer } from "./about-odometer";
import s from "./about.module.css";

// The manifeste, version A: 01–04, the key sentence of each paragraph highlighted inside the text
// (never repeated), rules drawn on entry, and the text link « Lire Obsolet ».
export function AboutManifeste() {
  const last = ABOUT.paragraphs.length - 1;
  return (
    <AboutManifesteReveal className={s.manifeste}>
      <header className={s.mHead} data-m-block="">
        <span className={s.mRule} aria-hidden="true" />
        <h2 id="manifeste" className={s.mTitle} tabIndex={-1}>
          {ABOUT.title}
        </h2>
      </header>
      {ABOUT.paragraphs.map((p, i) => {
        const [before, key, after] = splitKey(p, ABOUT.keys[i]);
        return (
          <div key={p} className={s.mRow} data-m-block="">
            <span className={s.mRule} aria-hidden="true" />
            <span className={s.mNumCell} aria-hidden="true">
              <Odometer text={folio(i)} className={`${s.mNum} ${s.caps}`} />
            </span>
            <p className={s.mText} data-m-text={i}>
              {frenchSpacing(before)}
              <em className={s.mKey}>{frenchSpacing(key)}</em>
              {frenchSpacing(after)}
            </p>
            {i === last && (
              <div className={s.mCta}>
                <a className={`${s.relay} ${s.mRelay}`} href={OBSOLET_URL} target="_blank" rel="noopener noreferrer">
                  {ABOUT.ctaText}
                  <span className="sr-only"> {NEW_TAB_HINT}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </AboutManifesteReveal>
  );
}
