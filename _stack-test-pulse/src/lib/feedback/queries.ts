import type { FeedbackItem, FeedbackStatus } from "./types";

const STATUS_PRIORITY: Record<FeedbackStatus, number> = {
  new: 0,
  triaged: 1,
  archived: 2,
};

/**
 * Sort order (CA-2): status priority (new > triaged > archived),
 * then createdAt descending within each status group. Pure — no mutation.
 */
export function sortForInbox(items: readonly FeedbackItem[]): FeedbackItem[] {
  return [...items].sort((a, b) => {
    const byStatus = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (byStatus !== 0) return byStatus;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/** Mask an email to `m•••@domain` (CA-7). Returns null unchanged. */
export function maskEmail(email: string | null): string | null {
  if (!email) return null;
  const [local, domain] = email.split("@");
  if (!domain || local.length === 0) return "•••";
  return `${local[0]}•••@${domain}`;
}

/** Truncate an excerpt to a max length with an ellipsis (CA-1, ≤ 140). */
export function toExcerpt(body: string, max = 140): string {
  const clean = body.trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

const MOCK: FeedbackItem[] = [
  { id: "f1", source: "email", body: "Export to CSV would save me an hour a week. Any chance?", reporterEmail: "maya@acme.io", status: "new", createdAt: "2026-08-19T09:12:00Z" },
  { id: "f2", source: "twitter", body: "Love the app but the mobile layout breaks on the settings page.", reporterEmail: null, status: "new", createdAt: "2026-08-20T07:40:00Z" },
  { id: "f3", source: "canny", body: "Dark mode please 🙏", reporterEmail: "theo@studio.co", status: "triaged", createdAt: "2026-08-17T15:03:00Z" },
  { id: "f4", source: "email", body: "Billing receipt had the wrong VAT number.", reporterEmail: "kv@northwind.eu", status: "archived", createdAt: "2026-08-10T11:20:00Z" },
];

/**
 * MVP data source: a typed query returning sorted items.
 * Swappable for a real fetch later (F-010) without touching components.
 */
export async function getFeedbackInbox(): Promise<FeedbackItem[]> {
  return sortForInbox(MOCK);
}

/**
 * Mock persistence for F-002. Rejects ~1/10 to exercise the failure path.
 * Swappable for a real mutation later without touching components.
 */
export async function updateFeedbackStatus(
  id: string,
  status: FeedbackItem["status"],
): Promise<{ id: string; status: FeedbackItem["status"] }> {
  await new Promise((r) => setTimeout(r, 250));
  if (Math.random() < 0.1) throw new Error("persist_failed");
  return { id, status };
}
