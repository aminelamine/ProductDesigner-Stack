"use client";

import { currentIndex } from "@/lib/about-timeline";
import { interp, progressFromRect } from "@/lib/scroll-engine";
import { pulse, setFlag, type Scene } from "./about-scene";

export interface FrameInfo {
  xh: number;
  cur: number;
  jump: boolean;
  forward: boolean;
}

/**
 * One frame, read from the current geometry — no accumulated state drives the picture.
 * Progress runs from the moment the runway reaches the header (the relay) to its release.
 */
export function updateScene(scene: Scene): FrameInfo | null {
  const { els, state, geo } = scene;
  if (!geo) return null;
  const top = els.runway.getBoundingClientRect().top;
  const p = progressFromRect(top, window.innerHeight, window.innerHeight - geo.hdr, geo.len);
  const xh = interp(geo.P, geo.X, p);
  if (!geo.native) {
    const tr = `translate3d(${(geo.headX - xh).toFixed(2)}px,0,0)`;
    els.track.style.transform = tr;
    els.done.style.transform = tr;
  }

  const jump = Math.abs(xh - state.lastXh) > (geo.compact ? 400 : 900);
  const forward = xh > state.lastXh + 0.5 && !jump;
  state.lastXh = xh;

  // The relay: the ink head appears only once the stage pins (P-002 T8).
  const relayed = geo.hdr - top >= -0.5;
  if (relayed !== state.relayed) {
    state.relayed = relayed;
    setFlag(els.root, "relayed", relayed);
    if (relayed && forward) pulse(els.headRing);
  }

  geo.x.forEach((x, i) => {
    const reached = xh >= x - 0.5;
    const st = els.stations[i];
    const next = reached ? (xh < geo.xe[i] ? "active" : "past") : undefined;
    if (st.dataset.state !== next) {
      if (next) st.dataset.state = next;
      else delete st.dataset.state;
    }
    if (reached !== state.reached[i]) {
      state.reached[i] = reached;
      if (reached && forward) pulse(els.pings[i]);
    }
  });

  const arrived = xh >= geo.xNow - 6;
  if (arrived !== state.arrived) {
    state.arrived = arrived;
    setFlag(els.stage, "arrived", arrived);
  }
  return { xh, cur: relayed ? currentIndex(geo.x, xh) : -1, jump, forward };
}
