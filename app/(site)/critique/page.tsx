'use client'

import { FeedbackCard, FeedbackCardProps } from '@/components/critique/FeedbackCard'

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const FIXTURES: Omit<FeedbackCardProps, 'index'>[] = [
  {
    id: 'fb-001',
    title: "Contrast ratio insuffisant sur l'etat disabled",
    description: "Le texte du bouton disabled passe a 2.1:1 contre le fond — en dessous du seuil WCAG AA de 4.5:1. A corriger avant la mise en prod.",
    component: 'Button / Disabled',
    severity: 'critical',
    status: 'new',
    author: { name: 'Selin Aydin' },
    createdAt: new Date('2026-04-14T09:12:00'),
  },
  {
    id: 'fb-002',
    title: 'Icone trop grande dans le contexte dense',
    description: "L'icone ChevronDown dans le select fait 20px alors que les autres elements de la ligne sont a 16px. Cree une dissonance optique.",
    component: 'Select / Trigger',
    severity: 'major',
    status: 'in_review',
    author: {
      name: 'Kevin Moreau',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=KM&backgroundColor=2A2B2E&textColor=6B6E7A',
    },
    createdAt: new Date('2026-04-13T14:45:00'),
  },
  {
    id: 'fb-003',
    title: 'Espacement footer inconsistant',
    description: 'Le padding-bottom du footer varie entre 24px et 32px selon les pages. Uniformiser a py-8 Tailwind.',
    component: 'Footer / Layout',
    severity: 'minor',
    status: 'implemented',
    author: { name: 'Selin Aydin' },
    createdAt: new Date('2026-04-12T11:30:00'),
  },
  {
    id: 'fb-004',
    title: "Animation d'entree absente sur mobile",
    description: 'La sequence stagger hero ne se declenche pas sur iOS Safari 17. Probablement un conflit avec prefers-reduced-motion mal parse.',
    component: 'Hero / Animation',
    severity: 'major',
    status: 'closed',
    author: {
      name: 'Kevin Moreau',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=KM&backgroundColor=2A2B2E&textColor=6B6E7A',
    },
    createdAt: new Date('2026-04-11T16:20:00'),
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CritiquePage() {
  const newCount      = FIXTURES.filter(f => f.status === 'new').length
  const inReviewCount = FIXTURES.filter(f => f.status === 'in_review').length

  return (
    /*
     * -mx-6 md:-mx-8 annule le padding horizontal du layout parent (max-w-5xl px-6 md:px-8)
     * pour obtenir un fond pleine largeur. Le padding est re-appliqué à l'intérieur.
     */
    <div
      className="-mx-6 md:-mx-8 bg-[#0E0F11] px-6 md:px-8 py-12 min-h-[calc(100vh-3.5rem)]"
      style={{ fontFamily: 'var(--font-plex-sans, var(--font-geist-sans))' }}
    >
      {/* ── Header ── */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex items-baseline gap-3">
          <h1
            className="text-xs font-medium tracking-widest text-[#6B6E7A] uppercase"
            style={{ fontFamily: 'var(--font-plex-mono, var(--font-geist-mono))' }}
          >
            CRITIQUE
          </h1>
          <span
            className="text-xs text-[#3D3F47]"
            style={{ fontFamily: 'var(--font-plex-mono, var(--font-geist-mono))' }}
          >
            / design-review-tracker
          </span>
        </div>
        <p
          className="text-[#3D3F47] text-xs mt-2"
          style={{ fontFamily: 'var(--font-plex-mono, var(--font-geist-mono))' }}
        >
          {FIXTURES.length} feedbacks &middot; {newCount} new &middot; {inReviewCount} in review
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="max-w-xl mx-auto flex flex-col gap-3">
        {FIXTURES.map((props, i) => (
          <FeedbackCard
            key={props.id}
            {...props}
            index={i}
            onStatusChange={(id, next) => {
              console.log(`[critique] ${id} -> ${next}`)
            }}
          />
        ))}
      </div>
    </div>
  )
}
