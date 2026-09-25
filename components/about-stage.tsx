import type { ReactNode } from "react";
import s from "./about.module.css";

interface AboutStageProps {
  list: ReactNode;
  chute: ReactNode;
}

// Runway → sticky stage → lane → viewport → track. In the socle these wrappers are plain flow:
// the list and the chute read top to bottom.
export function AboutStage({ list, chute }: AboutStageProps) {
  return (
    <div className={s.runway} data-runway="">
      <div className={s.stage} data-stage="">
        <div className={s.lane} data-lane="">
          <div className={s.viewport}>
            <div className={s.track} data-track="">
              {list}
            </div>
          </div>
          {chute}
        </div>
      </div>
    </div>
  );
}
