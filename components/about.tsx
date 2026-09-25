import { fontDriveDisplay, fontDriveSans } from "@/lib/fonts";
import { ABOUT } from "@/lib/data";
import { AboutChute } from "./about-chute";
import { AboutManifeste } from "./about-manifeste";
import { AboutSeuil } from "./about-seuil";
import { AboutStage } from "./about-stage";
import { AboutTimeline } from "./about-timeline";
import s from "./about.module.css";

// About — le trajet parcouru (P-002). Server-rendered socle: seuil, chronological list, chute,
// manifeste, blue cut. Full-bleed breakout scoped to the section (ADR-011) — overflow-x: clip,
// never hidden, so the sticky stage keeps the page as its scroll container. Cream socle through
// the scoped `.theme-drive` (decisions/002), `:root` untouched.
export function About() {
  return (
    <section
      id="about"
      aria-label={ABOUT.label}
      className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive ${s.about} relative left-1/2 -mx-[50vw] w-screen overflow-x-clip`}
    >
      <div className={s.journey}>
        <AboutSeuil />
        <AboutStage list={<AboutTimeline />} chute={<AboutChute />} />
      </div>
      <AboutManifeste />
      <hr className={s.cut} />
    </section>
  );
}
