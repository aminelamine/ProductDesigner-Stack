"use client";

import { flattenSteps, type FlatStep, type Scale } from "@/lib/about-timeline";
import { miniEls, type MiniEls } from "./about-scene-minimap";

// DOM handles of the About scene. Looked up by data attributes inside the About section only:
// the scene never reads nor writes anything of the hero (P-002 CA-22 / P-003 CA-31).
export interface SceneEls {
  root: HTMLElement;
  runway: HTMLElement;
  stage: HTMLElement;
  lane: HTMLElement;
  track: HTMLElement;
  done: HTMLElement;
  arts: HTMLElement[];
  stations: HTMLElement[];
  pings: (HTMLElement | null)[];
  years: HTMLElement[];
  headRing: HTMLElement | null;
  counter: HTMLElement | null;
  mini: MiniEls;
}

export interface SceneGeo extends Scale {
  compact: boolean;
  headX: number;
  yMain: number;
  hdr: number;
  nowM: number;
  P: number[];
  X: number[];
  len: number;
  native: boolean;
  /** Minimap head x at each stop of P, and the minimap width. */
  mmX: number[];
  mmW: number;
}

export interface SceneState {
  lastXh: number;
  cur: number;
  relayed: boolean;
  arrived: boolean;
  reached: boolean[];
  anims: Animation[];
}

export interface Scene {
  els: SceneEls;
  steps: FlatStep[];
  state: SceneState;
  geo: SceneGeo | null;
}

function all(root: ParentNode, sel: string): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(sel));
}

export function createScene(runway: HTMLElement): Scene | null {
  const root = runway.closest<HTMLElement>("section");
  const stage = runway.querySelector<HTMLElement>("[data-stage]");
  const lane = runway.querySelector<HTMLElement>("[data-lane]");
  const track = runway.querySelector<HTMLElement>("[data-track]");
  const done = runway.querySelector<HTMLElement>("[data-track-done]");
  if (!root || !stage || !lane || !track || !done) return null;
  const stations = all(track, "[data-station]").sort((a, b) => Number(a.dataset.station) - Number(b.dataset.station));
  const steps = flattenSteps();
  return {
    els: {
      root,
      runway,
      stage,
      lane,
      track,
      done,
      arts: all(runway, "[data-art]"),
      stations,
      pings: stations.map((st) => st.querySelector<HTMLElement>("[data-ping]")),
      years: all(track, "[data-year]"),
      headRing: runway.querySelector<HTMLElement>("[data-head-ring]"),
      counter: runway.querySelector<HTMLElement>("[data-counter]"),
      mini: miniEls(runway),
    },
    steps,
    state: { lastXh: -1e9, cur: -2, relayed: false, arrived: false, reached: steps.map(() => false), anims: [] },
    geo: null,
  };
}

export function setFlag(el: HTMLElement, name: string, on: boolean): void {
  if (on) el.setAttribute(`data-${name}`, "");
  else el.removeAttribute(`data-${name}`);
}

export function pulse(el: HTMLElement | null): void {
  el?.animate(
    [
      { transform: "scale(0.35)", opacity: 0.9 },
      { transform: "scale(1.7)", opacity: 0 },
    ],
    { duration: 720, easing: "cubic-bezier(0.2, 0.7, 0, 1)" },
  );
}

export function cancelAnims(scene: Scene): void {
  scene.state.anims.forEach((a) => a.cancel());
  scene.state.anims = [];
}

/** Back to the socle: every inline geometry removed, every state flag cleared. */
export function teardown(scene: Scene): void {
  const { els, state } = scene;
  cancelAnims(scene);
  scene.geo = null;
  els.root.dataset.mode = "stacked";
  ["compact", "short", "tight", "relayed"].forEach((f) => setFlag(els.root, f, false));
  setFlag(els.stage, "arrived", false);
  els.runway.style.height = "";
  [els.track, els.done].forEach((t) => {
    t.style.transform = "";
    t.style.width = "";
  });
  [els.mini.head, els.mini.done, els.mini.doneIn].forEach((el) => el && (el.style.transform = ""));
  els.mini.links.forEach((a) => {
    a.removeAttribute("aria-current");
    setFlag(a, "reached", false);
  });
  els.stations.forEach((st) => {
    st.style.left = "";
    st.style.top = "";
    delete st.dataset.state;
  });
  state.lastXh = -1e9;
  state.cur = -2;
  state.relayed = false;
  state.arrived = false;
  state.reached = state.reached.map(() => false);
}
