import { toolEras } from "@/lib/about-timeline";
import { toolsRange } from "@/lib/about-text";
import { PARCOURS } from "@/lib/data";
import s from "./about.module.css";

// Second lane under the line: the tools of each era, spread across it by the scene.
export function AboutToolsBand() {
  return (
    <>
      <span className={s.tband} data-tband="" />
      {toolEras().map(({ era, from }) => (
        <span key={era.from} data-era={from}>
          <span className={s.ttick} />
          <span className={`${s.tera} ${s.caps}`} data-tera="">
            <span className={s.teraWord}>{PARCOURS.labels.tools} </span>
            {toolsRange(era)}
          </span>
          {era.tools.map((t) => (
            <span key={t} className={`${s.tool} ${s.caps}`} data-tool="">
              {t}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
