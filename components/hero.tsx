import { fontDriveDisplay, fontDriveSans } from "@/lib/fonts";
import { HERO } from "@/lib/data";
import { HeroNetwork } from "./hero-network";
import { HeroPause } from "./hero-pause";
import { HeroTitle } from "./hero-title";
import s from "./hero.module.css";

const BLEED = "relative left-1/2 -mx-[50vw] w-screen";

// Hero — le plan du réseau (P-003). The text is server-rendered and placed by CSS alone; the
// network is a client layer on top. Full-bleed breakout scoped to the section (ADR-011).
export function Hero() {
  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-title"
        className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive ${s.hero} ${BLEED} overflow-x-clip`}
      >
        <HeroNetwork />
        <div className={s.heroIn}>
          <HeroTitle />
          <div className={s.heroSub} data-hero-sub="">
            <p>{HERO.subtitle}</p>
            <HeroPause />
          </div>
        </div>
        <a className={`${s.renvoi} ${s.caps}`} href={HERO.renvoi.href} data-renvoi="">
          <span>
            <span className={s.num}>{HERO.renvoi.num}</span>
            {HERO.renvoi.label}
          </span>
          <span className={s.arr} aria-hidden="true">
            →
          </span>
        </a>
      </section>
      {/* Cream room for the junction's bend below the hero — sized by the hero, never the About. */}
      <div className={`${s.tail} ${BLEED}`} data-hero-tail="" aria-hidden="true" />
    </>
  );
}
