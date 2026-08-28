export type FeedbackStatus = "new" | "triaged" | "archived";

export type FeedbackSource = "email" | "twitter" | "canny";

export interface FeedbackItem {
  id: string;
  source: FeedbackSource;
  /** Raw body as received. Never render in full if it contains an email. */
  body: string;
  /** Reporter email, if known. Masked before display (client_vision PII constraint). */
  reporterEmail: string | null;
  status: FeedbackStatus;
  /** ISO 8601 timestamp. */
  createdAt: string;
}
