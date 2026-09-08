export interface HeroIllustrationProps {
  className?: string;
}

/**
 * Flat two-tone silhouette of a multi-stop signpost — the hero's trajectory
 * marker (spec P-001, CA-12/CA-13): each blue arm reads as a stop on the
 * designer -> agentic path, not as a project thumbnail or a literal car.
 * Exactly two fills: Voltage Blue at reduced opacity for the arms, solid
 * black for the pole/cap/shadow. No gradient, no texture, no third color.
 * Purely decorative — the headline and subtitle already carry the meaning.
 */
export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" className={className}>
      <ellipse cx="100" cy="222" rx="54" ry="9" fill="#000000" />
      <rect x="94" y="40" width="12" height="182" fill="#000000" />
      <circle cx="100" cy="34" r="10" fill="#000000" />
      <rect
        x="100"
        y="58"
        width="86"
        height="22"
        rx="11"
        fill="#006eff"
        fillOpacity="0.4"
      />
      <rect
        x="100"
        y="92"
        width="60"
        height="22"
        rx="11"
        fill="#006eff"
        fillOpacity="0.4"
      />
      <rect
        x="100"
        y="126"
        width="72"
        height="22"
        rx="11"
        fill="#006eff"
        fillOpacity="0.4"
      />
    </svg>
  );
}
