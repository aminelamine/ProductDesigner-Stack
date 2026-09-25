import { PARCOURS } from "@/lib/data";
import { CounterSlots } from "./about-odometer";
import s from "./about.module.css";

// Year under the head and years of experience — computed on the client clock only.
export function AboutCounter() {
  return (
    <div className={s.counter} aria-hidden="true" data-counter="">
      <div className={s.cYear} data-odo="year">
        <CounterSlots count={4} />
      </div>
      <div className={`${s.cExp} ${s.caps}`}>
        <span className={s.digits} data-odo="exp">
          <CounterSlots count={2} />
        </span>
        <span>{PARCOURS.labels.experience}</span>
      </div>
    </div>
  );
}
