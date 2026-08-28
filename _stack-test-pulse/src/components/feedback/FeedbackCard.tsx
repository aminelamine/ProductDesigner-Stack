import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FeedbackItem, FeedbackStatus } from "@/lib/feedback/types";
import { maskEmail, toExcerpt } from "@/lib/feedback/queries";

interface FeedbackCardProps {
  item: FeedbackItem;
}

const STATUS_STYLE: Record<FeedbackStatus, { label: string; className: string }> = {
  new: { label: "New", className: "border-amber-300 bg-amber-50 text-amber-700" },
  triaged: { label: "Triaged", className: "border-sky-300 bg-sky-50 text-sky-700" },
  archived: { label: "Archived", className: "border-border bg-muted text-muted-foreground" },
};

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.round(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function FeedbackCard({ item }: FeedbackCardProps) {
  const status = STATUS_STYLE[item.status];
  const masked = maskEmail(item.reporterEmail);

  return (
    <Card className="transition-colors duration-150 hover:bg-accent/40">
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium capitalize text-foreground">{item.source}</span>
          {masked && <span aria-label="reporter">· {masked}</span>}
        </div>
        <Badge variant="outline" className={status.className}>
          {status.label}
        </Badge>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-3">
        <p className="text-sm leading-relaxed text-foreground">{toExcerpt(item.body)}</p>
        <time className="shrink-0 text-xs text-muted-foreground" dateTime={item.createdAt}>
          {relativeTime(item.createdAt)}
        </time>
      </CardContent>
    </Card>
  );
}
