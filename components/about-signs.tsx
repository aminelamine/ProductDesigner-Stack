import type { StepSign } from "@/lib/data";
import s from "./about.module.css";

// The four signs of the line: a node (ink) and a bar (blue, 40 % at rest, lit when reached).
export function Sign({ kind, className }: { kind: StepSign; className?: string }) {
  return (
    <svg className={className ? `${s.sign} ${className}` : s.sign} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {kind === "depart" && (
        <>
          <rect className={s.node} x="0.5" y="6" width="1.5" height="12" />
          <circle className={s.node} cx="7" cy="12" r="3" />
          <rect className={s.bar} x="12" y="9.5" width="12" height="5" />
        </>
      )}
      {kind === "itin" && (
        <>
          <circle className={s.node} cx="4" cy="12" r="3" />
          <rect className={s.bar} x="9" y="9.5" width="15" height="5" />
        </>
      )}
      {kind === "mission" && (
        <>
          <circle className={s.hollow} cx="4" cy="12" r="2.6" />
          <rect className={s.bar} x="9" y="10.5" width="15" height="3" />
        </>
      )}
      {kind === "relais" && (
        <>
          <circle className={s.node} cx="4" cy="12" r="3" />
          <g className={s.bar}>
            <rect x="9" y="9.5" width="8" height="5" />
            <polygon points="16,4.5 24,12 16,19.5" />
          </g>
        </>
      )}
    </svg>
  );
}
