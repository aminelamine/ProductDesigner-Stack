"use client";

import type { MouseEvent } from "react";
import { PARCOURS } from "@/lib/data";
import s from "./about.module.css";

// « Passer le parcours »: straight to the manifeste, focus on its title — an instant jump, so the
// scene lands on its final state instead of replaying at speed.
export function AboutSkip() {
  const skip = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("manifeste");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "instant", block: "start" });
    target.focus({ preventScroll: true });
    history.replaceState(null, "", "#manifeste");
  };
  return (
    <a className={s.skip} href="#manifeste" onClick={skip}>
      {PARCOURS.skip}
    </a>
  );
}
