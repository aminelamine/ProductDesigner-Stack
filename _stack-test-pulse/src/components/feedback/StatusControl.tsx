"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FeedbackStatus } from "@/lib/feedback/types";

interface StatusControlProps {
  current: FeedbackStatus;
  pending: boolean;
  onChange: (status: FeedbackStatus) => void;
}

const OPTIONS: { value: FeedbackStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "triaged", label: "Triaged" },
  { value: "archived", label: "Archived" },
];

export function StatusControl({ current, pending, onChange }: StatusControlProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          className="transition-colors duration-150"
        >
          {pending ? "Saving…" : "Change status"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.filter((o) => o.value !== current).map((o) => (
          <DropdownMenuItem key={o.value} onSelect={() => onChange(o.value)}>
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
