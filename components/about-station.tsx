import { formatPeriod, kindLabel, type FlatStep } from "@/lib/about-timeline";
import { PARCOURS } from "@/lib/data";
import { Sign } from "./about-signs";
import s from "./about.module.css";

interface AboutStationProps {
  flat: FlatStep;
  index: number;
  steps: readonly FlatStep[];
}

// One step of the list. In the socle it is a card in flow; pinned, the same <li> becomes a
// stop on the track (the scene positions it). Its text is the only readable copy.
export function AboutStation({ flat, index, steps }: AboutStationProps) {
  const { step } = flat;
  return (
    <li className={s.station} id={step.id} data-kind={step.kind} data-station={index}>
      <span className={s.stop} aria-hidden="true" />
      {step.kind !== "mission" && step.start && (
        <span className={s.stYear} aria-hidden="true">
          {step.start.slice(0, 4)}
        </span>
      )}
      <span className={s.ping} aria-hidden="true" />
      <div className={s.stLabel}>
        <p className={`${s.stKind} ${s.caps}`}>{kindLabel(flat, steps)}</p>
        <p className={`${s.stDate} ${s.caps}`}>
          <Sign kind={step.sign} />
          <span>
            {formatPeriod(step).map((p, i) =>
              p.dateTime ? (
                <time key={i} dateTime={p.dateTime}>
                  {p.text}
                </time>
              ) : (
                <span key={i}>{p.text}</span>
              ),
            )}
          </span>
        </p>
        {step.place && <p className={`${s.stPlace} ${s.caps}`}>{step.place}</p>}
        <h4 className={s.stOrg}>{step.org}</h4>
        {step.role && <p className={s.stRole}>{step.role}</p>}
        {step.fact && <p className={s.stFact}>{step.fact}</p>}
        {step.results && (
          <ul className={s.stResults}>
            {step.results.map((r) => (
              <li key={r.num}>
                <span className={s.resNum}>{r.num}</span> <span>{r.cap}</span>
              </li>
            ))}
          </ul>
        )}
        {step.board && (
          <>
            <p className={`${s.stBoardH} ${s.caps}`}>{PARCOURS.labels.clients}</p>
            <ul className={s.stBoard}>
              {step.board.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </li>
  );
}
