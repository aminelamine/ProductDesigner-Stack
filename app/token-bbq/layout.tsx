import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token BBQ",
  description: "L'IA digérée. Chaque semaine. En une heure.",
};

export default function TokenBBQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
