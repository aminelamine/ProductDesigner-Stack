"use client";

import { Button } from "@/components/ui/button";

interface InboxErrorProps {
  reset: () => void;
}

export default function InboxError({ reset }: InboxErrorProps) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 py-16 text-center md:px-8">
      <h1 className="text-base font-medium">We couldn&apos;t load your inbox</h1>
      <p className="text-sm text-muted-foreground">
        Your feedback is safe — this is a display issue on our side. Try loading it again.
      </p>
      <Button variant="outline" onClick={reset}>
        Retry
      </Button>
    </main>
  );
}
