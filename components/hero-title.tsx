import { Fragment } from "react";
import { ROLE_SEPARATOR, rolesOf } from "@/lib/hero-network";
import { HERO } from "@/lib/data";
import s from "./hero.module.css";

const ROWS = [s.r1, s.r2, s.r3];

// The <h1>: real text, 3 rows, the « | » kept but visually hidden, so its textContent is exactly
// HERO.headline. No whitespace between tags. Each role is focusable (it isolates its line).
export function HeroTitle() {
  return (
    <h1 id="hero-title" className={s.roles}>
      {rolesOf(HERO.headline).map((role, i) => {
        const words = role.split(" ");
        return (
          <Fragment key={role}>
            {i > 0 && <span className="sr-only">{ROLE_SEPARATOR}</span>}
            <span className={`${s.row} ${ROWS[i]}`} data-row={i}>
              <span className={s.role} tabIndex={0} data-role={i}>
                <span className={s.nm} data-nm={i}>
                  {words.map((w, k) => (
                    <Fragment key={k}>
                      {k > 0 && " "}
                      <span className={s.w} data-word="">
                        {w}
                        {k === words.length - 1 && <span className={s.bl} data-bl={i} aria-hidden="true" />}
                      </span>
                    </Fragment>
                  ))}
                </span>
              </span>
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}
