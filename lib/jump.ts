// In-page jump: instant (the pinned About lands on its final state instead of replaying at speed),
// focus on targets that accept it (tabindex="-1" titles), hash kept in the URL.
export function jumpTo(hash: string): boolean {
  if (typeof document === "undefined" || !hash.startsWith("#")) return false;
  const target = document.getElementById(hash.slice(1));
  if (!target) return false;
  target.scrollIntoView({ behavior: "instant", block: "start" });
  if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
  history.replaceState(null, "", hash);
  return true;
}
