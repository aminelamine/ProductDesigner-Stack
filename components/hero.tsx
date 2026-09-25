import { fontDriveDisplay, fontDriveSans } from "@/lib/fonts";
import { HERO } from "@/lib/data";
import { HeroNetwork } from "./hero-network";
import { HeroTitle } from "./hero-title";
import s from "./hero.module.css";

// Hero — le plan du réseau (P-003). The text is server-rendered and placed by CSS alone; the
// network is a client layer on top. Full-bleed breakout scoped to the section (ADR-011).
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive ${s.hero} relative left-1/2 -mx-[50vw] w-screen overflow-x-clip`}
    >
      <HeroNetwork />
      <div className={s.heroIn}>
        <HeroTitle />
        <div className={s.heroSub} data-hero-sub="">
          <p>{HERO.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
