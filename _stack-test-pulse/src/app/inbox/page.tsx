import { getFeedbackInbox } from "@/lib/feedback/queries";
import { FeedbackInbox } from "@/components/feedback/FeedbackInbox";

export default async function InboxPage() {
  const items = await getFeedbackInbox();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 md:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Every piece of feedback, newest untriaged first.
        </p>
      </header>
      <FeedbackInbox items={items} />
    </main>
  );
}
