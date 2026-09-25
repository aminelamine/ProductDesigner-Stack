"use client";

import { useRef, type ReactNode } from "react";
import { useAboutScene } from "@/hooks/use-about-scene";
import { flattenSteps } from "@/lib/about-timeline";
import { AboutArt, AboutMarks } from "./about-art";
import { AboutCounter } from "./about-counter";
import { AboutMinimap } from "./about-minimap";
import { AboutPanel } from "./about-panel";
import s from "./about.module.css";

interface AboutStageProps {
  list: ReactNode;
  chute: ReactNode;
}

// Runway → sticky stage → lane → viewport → track. Without JS, in reduced motion or on a window
// lower than 500 px, these wrappers are plain flow (the socle). Otherwise the scene pins the
// stage and slides the track under a fixed reading head. The server-rendered list and chute are
// passed through untouched; the visual layers added here are aria-hidden.
export function AboutStage({ list, chute }: AboutStageProps) {
  const runway = useRef<HTMLDivElement>(null);
  const goTo = useAboutScene(runway);
  const steps = flattenSteps();
  return (
    <div ref={runway} className={s.runway} data-runway="">
      <div className={s.stage} data-stage="">
        <div className={s.lane} data-lane="">
          <div className={s.viewport}>
            <div className={s.track} data-track="">
              <AboutArt />
              <AboutMarks />
              {list}
            </div>
            <div className={s.done} aria-hidden="true">
              <div className={`${s.track} ${s.trackDone}`} data-track-done="">
                <AboutArt />
              </div>
            </div>
          </div>
          <AboutCounter />
          <div className={s.head} aria-hidden="true">
            <span className={s.headFilet} />
            <span className={s.headRing} data-head-ring="" />
            <span className={s.headNode} />
          </div>
          <AboutPanel steps={steps} />
          {chute}
        </div>
        <AboutMinimap steps={steps} onGo={goTo} />
      </div>
    </div>
  );
}
