import { Inter, Playfair_Display } from "next/font/google";

// Scoped to the hero's `.theme-drive` theme only (ADR-009, spec P-001 CA-4).
// `--font-sans` / `--font-mono` in app/layout.tsx stay untouched — these two
// variables are never mapped into the global `@theme inline` block.
export const fontDriveDisplay = Playfair_Display({
  variable: "--font-drive-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const fontDriveSans = Inter({
  variable: "--font-drive-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});
