import { flattenSteps, isStep } from "@/lib/about-timeline";
import { asideParts } from "@/lib/about-text";
import { PARCOURS } from "@/lib/data";
import { AboutStation } from "./about-station";
import s from "./about.module.css";

// The chronological <ol>: 3 temps (<h3>), 17 steps, tools eras and milestones — the socle.
export function AboutTimeline() {
  const steps = flattenSteps();
  return (
    <ol className={s.tempsList} aria-labelledby="parcours" data-temps-list="">
      {PARCOURS.temps.map((tp) => (
        <li key={tp.id} className={s.temps}>
          <h3 className={s.tempsTitle}>{tp.title}</h3>
          <ol className={s.stations}>
            {tp.items.map((item, k) => {
              if (isStep(item)) {
                const i = steps.findIndex((f) => f.step.id === item.id);
                return <AboutStation key={item.id} flat={steps[i]} index={i} steps={steps} />;
              }
              return (
                <li key={`${tp.id}-${k}`} className={s.aside} data-aside={item.kind}>
                  <p className={s.caps}>
                    {asideParts(item).map((p, j) =>
                      p.dateTime ? (
                        <time key={j} dateTime={p.dateTime}>
                          {p.text}
                        </time>
                      ) : (
                        <span key={j}>{p.text}</span>
                      ),
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}
