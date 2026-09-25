import s from "./about.module.css";

const DIGITS = Array.from({ length: 10 }, (_, d) => d);
const STRIP = Array.from({ length: 20 }, (_, r) => r % 10);

/** A figure where every digit is a strip that rolls to its value (CSS, on `data-on`). */
export function Odometer({ text, className }: { text: string; className?: string }) {
  const digitRank = (i: number) => text.slice(0, i).replace(/\D/g, "").length;
  return (
    <span className={className}>
      {Array.from(text).map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className={s.odo}>
            <span className={s.odoSizer}>{ch}</span>
            <span className={s.odoStrip} data-d={ch} data-c={digitRank(i)}>
              {STRIP.map((d, r) => (
                <span key={r}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className={s.odoT}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/** A counter window: ten pre-rendered digits per slot, rolled by the scene. */
export function CounterSlots({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={s.slot} data-slot="">
          {DIGITS.map((d) => (
            <span key={d} className={s.dg}>
              {d}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
