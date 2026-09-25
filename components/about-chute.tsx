import { noWidow, sentences } from "@/lib/about-text";
import { ABOUT } from "@/lib/data";
import s from "./about.module.css";

// The chute: the title sentence, ink then blue.
export function AboutChute() {
  const [first, second] = sentences(ABOUT.chute);
  return (
    <div className={s.chuteWrap} data-chute="">
      <p className={s.chute}>
        <span className={s.s1}>{noWidow(first)}</span> <span className={s.s2}>{noWidow(second)}</span>
      </p>
    </div>
  );
}
