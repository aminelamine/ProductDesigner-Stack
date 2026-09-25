"use client";

import { useSyncExternalStore } from "react";
import { yearsOfExploration } from "@/lib/about-timeline";

const noop = () => () => undefined;

/** « ans d'exploration »: the build-time value, corrected on the client clock after hydration. */
export function AboutYears({ initial }: { initial: number }) {
  const years = useSyncExternalStore(noop, () => yearsOfExploration(new Date()), () => initial);
  return <>{years}</>;
}
