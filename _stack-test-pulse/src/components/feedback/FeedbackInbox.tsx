import { Inbox } from "lucide-react";
import type { FeedbackItem } from "@/lib/feedback/types";
import { FeedbackCard } from "./FeedbackCard";

interface FeedbackInboxProps {
  items: FeedbackItem[];
}

export function FeedbackInbox({ items }: FeedbackInboxProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 text-center">
        <Inbox className="size-6 text-muted-foreground" aria-hidden />
        <p className="text-base font-medium">You&apos;re all caught up</p>
        <p className="text-sm text-muted-foreground">
          No open feedback. New items will land here as they arrive.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <FeedbackCard item={item} />
        </li>
      ))}
    </ul>
  );
}
