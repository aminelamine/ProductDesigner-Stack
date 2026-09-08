export interface HeroIllustrationProps {
  className?: string;
}

/**
 * Flat two-tone silhouette of a multi-stop signpost — the hero's trajectory
 * marker (spec P-001, CA-12/CA-13). Purely decorative: the surrounding
 * headline and subtitle already carry the section's meaning.
 */
export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      aria-hidden="true"
      className={className}
    />
  );
}
