import { Calendar, BookOpen, Zap, MessageSquare } from "lucide-react";
import { FireParticles } from "@/components/token-bbq/fire-particles";

const SESSION = {
  edition: "#001",
  date: "Jeudi 17 Avril · 12h00",
  calendarUrl: "#",
} as const;

const MENU = [
  {
    icon: BookOpen,
    label: "Le Digest IA",
    desc: "Les tendances et outils IA de la semaine, distillés et mis en perspective pour le design produit.",
  },
  {
    icon: Zap,
    label: "Les Démos",
    desc: "1 à 2 démonstrations live : outils, workflows ou prototypes IA en action.",
  },
  {
    icon: MessageSquare,
    label: "L'Échange",
    desc: "30 minutes de discussion ouverte. Vos questions, retours et idées.",
  },
] as const;

export default function TokenBBQPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0602] px-6 text-center">
        <FireParticles />

        {/* Warm glow at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1A0800]/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          <span className="font-mono text-xs tracking-[0.35em] text-[#E85D04] uppercase">
            {SESSION.edition} — {SESSION.date}
          </span>

          <h1
            className="text-[clamp(4rem,18vw,9rem)] font-black leading-none tracking-tight text-[#FFFBF5]"
            style={{ textShadow: "0 0 80px #E85D0430" }}
          >
            TOKEN
            <br />
            BBQ
          </h1>

          <p className="max-w-sm text-base text-[#A07848] md:text-lg">
            L&apos;IA digérée.{" "}
            <span className="text-[#D08848]">Chaque semaine.</span>{" "}
            En une heure.
          </p>

          <a
            href={SESSION.calendarUrl}
            aria-label={`Ajouter Token BBQ ${SESSION.edition} au calendrier — ${SESSION.date}`}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#E85D04]/30 bg-[#E85D04]/10 px-6 py-3 text-sm font-medium text-[#F48C06] transition-all hover:border-[#E85D04]/60 hover:bg-[#E85D04]/20"
          >
            <Calendar className="h-4 w-4" />
            Ajouter au calendrier
          </a>
        </div>
      </section>

      {/* ── AU MENU ──────────────────────────────────────────────────────── */}
      <section className="bg-[#080400] px-6 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-10 font-mono text-xs tracking-[0.3em] text-[#E85D04] uppercase">
            Au menu
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {MENU.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group rounded-2xl border border-[#1E0D04] bg-[#0F0702] p-6 transition-all duration-300 hover:border-[#E85D04]/30 hover:bg-[#180C04]"
              >
                <Icon className="mb-4 h-5 w-5 text-[#E85D04] transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mb-2 font-semibold text-[#FFFBF5]">{label}</h3>
                <p className="text-sm leading-relaxed text-[#B08060]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMAT ───────────────────────────────────────────────────────── */}
      <section className="bg-[#050200] px-6 py-16 md:px-8">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {(
            [
              { value: "1h", sub: "Format court" },
              { value: "×", sub: "" },
              { value: "Hebdo", sub: "Chaque jeudi" },
              { value: "×", sub: "" },
              { value: "PD", sub: "Équipe Product Design" },
            ] as const
          ).map(({ value, sub }, i) =>
            value === "×" ? (
              <span key={i} className="text-2xl font-thin text-[#1E0D04]">
                ×
              </span>
            ) : (
              <div key={i} className="text-center">
                <p className="text-4xl font-black text-[#F48C06]">{value}</p>
                <p className="mt-1 text-xs text-[#A07848]">{sub}</p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A0602] px-6 py-24 text-center md:px-8">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1A0800]/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-sm">
          <p className="mb-1 font-mono text-xs tracking-[0.3em] text-[#E85D04] uppercase">
            Prochaine session
          </p>
          <p className="mb-8 text-2xl font-bold text-[#FFFBF5]">
            {SESSION.date}
          </p>
          <a
            href={SESSION.calendarUrl}
            aria-label={`Confirmer ma présence au Token BBQ ${SESSION.edition} — ${SESSION.date}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#E85D04] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#DC2F02]"
          >
            <Calendar className="h-4 w-4" />
            Je serai là
          </a>
        </div>
      </section>
    </>
  );
}
