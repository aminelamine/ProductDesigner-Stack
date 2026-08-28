import { Skeleton } from "@/components/ui/skeleton";

export default function InboxLoading() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10 md:px-8">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </main>
  );
}
