import { formatPeriod, kindLabel, type FlatStep } from "@/lib/about-timeline";
import { PARCOURS } from "@/lib/data";
import { Odometer } from "./about-odometer";
import { Sign } from "./about-signs";
import s from "./about.module.css";

function Card({ flat, steps, index }: { flat: FlatStep; steps: readonly FlatStep[]; index: number }) {
  const { step } = flat;
  return (
    <div className={s.pcard} data-card={index}>
      <div className={s.pText}>
        <p className={`${s.pKind} ${s.caps}`}>{kindLabel(flat, steps)}</p>
        <p className={`${s.pDate} ${s.caps}`}>
          <Sign kind={step.sign} />
          <span>{formatPeriod(step).map((p) => p.text).join("")}</span>
        </p>
        {step.place && <p className={`${s.pPlace} ${s.caps}`}>{step.place}</p>}
        <p className={s.pOrg}>{step.org}</p>
        {step.role && <p className={s.pRole}>{step.role}</p>}
        {step.fact && <p className={s.pFact}>{step.fact}</p>}
      </div>
      {step.results ? (
        <div className={s.pEvent}>
          {step.results.map((r) => (
            <div key={r.num} className={s.slide} data-slide="">
              <Odometer text={r.num} className={s.big} />
              <p className={s.cap}>{r.cap}</p>
            </div>
          ))}
        </div>
      ) : step.board ? (
        <div className={`${s.pEvent} ${s.pBoard}`}>
          <p className={`${s.pBoardH} ${s.caps}`}>{PARCOURS.labels.clients}</p>
          {step.board.map((b, i) => (
            <span key={b} className={s.flap} data-i={i}>
              {b}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// The current event's card — exactly one visible at a time (the scene sets `data-on`).
export function AboutPanel({ steps }: { steps: readonly FlatStep[] }) {
  return (
    <div className={s.panel} aria-hidden="true" data-panel="">
      {steps.map((f, i) => (
        <Card key={f.step.id} flat={f} steps={steps} index={i} />
      ))}
    </div>
  );
}
