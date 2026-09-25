import { chuteFigures } from "@/lib/about-timeline";
import { noWidow, sentences } from "@/lib/about-text";
import { ABOUT } from "@/lib/data";
import { AboutYears } from "./about-years";
import s from "./about.module.css";

// The chute: « Arrivée · aujourd'hui », the title sentence (ink, then blue), three figures derived
// from PARCOURS, and the open end of the line.
export function AboutChute() {
  const [first, second] = sentences(ABOUT.chute);
  const f = chuteFigures(new Date());
  return (
    <div className={s.chuteWrap} data-chute="">
      <p className={`${s.chuteKicker} ${s.caps}`} aria-hidden="true">
        <span className={s.ckDot} />
        {ABOUT.chuteKicker}
      </p>
      <p className={s.chute}>
        <span className={s.s1}>{noWidow(first)}</span> <span className={s.s2}>{noWidow(second)}</span>
      </p>
      <div className={s.chuteMeta}>
        <dl className={s.cmStats}>
          <div>
            <dt className={s.caps}>{ABOUT.chuteStats.years}</dt>
            <dd>
              <AboutYears initial={f.years} />
            </dd>
          </div>
          <div>
            <dt className={s.caps}>{ABOUT.chuteStats.clients}</dt>
            <dd>{f.clients}</dd>
          </div>
          <div>
            <dt className={s.caps}>{ABOUT.chuteStats.startups}</dt>
            <dd>{f.startups}</dd>
          </div>
        </dl>
        <p className={`${s.cmOpen} ${s.caps}`}>{ABOUT.chuteOpen}</p>
      </div>
    </div>
  );
}
