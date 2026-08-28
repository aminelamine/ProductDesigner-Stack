"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FeedbackCard } from "./FeedbackCard";
import { StatusControl } from "./StatusControl";
import { sortForInbox, updateFeedbackStatus } from "@/lib/feedback/queries";
import type { FeedbackItem, FeedbackStatus } from "@/lib/feedback/types";

interface InboxClientProps {
  initialItems: FeedbackItem[];
}

export function InboxClient({ initialItems }: InboxClientProps) {
  const [items, setItems] = useState<FeedbackItem[]>(initialItems);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function changeStatus(id: string, status: FeedbackStatus) {
    const snapshot = items;
    setPendingId(id);
    setItems(
      sortForInbox(items.map((it) => (it.id === id ? { ...it, status } : it))),
    );

    try {
      await updateFeedbackStatus(id, status);
      toast.success(`Marked as ${status}`);
    } catch {
      setItems(snapshot);
      toast.error("Couldn't save that change — it's been reverted. Try again.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="space-y-2">
          <FeedbackCard item={item} />
          <div className="flex justify-end">
            <StatusControl
              current={item.status}
              pending={pendingId === item.id}
              onChange={(status) => changeStatus(item.id, status)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
