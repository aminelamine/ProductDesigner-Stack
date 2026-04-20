"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
  color: string;
}

const EMBER_COLORS = [
  "#E85D04",
  "#F48C06",
  "#FFBA08",
  "#FAA307",
  "#DC2F02",
] as const;

const KEYFRAMES = `
@keyframes ember-rise {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
  }
  35% {
    opacity: 0.85;
  }
  75% {
    transform: translateY(-65vh) translateX(var(--ember-drift)) scale(0.35);
    opacity: 0.2;
  }
  100% {
    transform: translateY(-92vh) translateX(calc(var(--ember-drift) * 1.4)) scale(0.05);
    opacity: 0;
  }
}
`;

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: Math.random() * 20,
    size: Math.random() * 3.5 + 1.5,
    duration: Math.random() * 4 + 3,
    delay: -(Math.random() * 8),
    driftX: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.5 + 0.4,
    color:
      EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)] ??
      "#E85D04",
  }));
}

interface FireParticlesProps {
  count?: number;
}

export function FireParticles({ count = 45 }: FireParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(buildParticles(count));
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            style={
              {
                position: "absolute",
                bottom: `${p.bottom}%`,
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size * 2.2}px`,
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}99`,
                opacity: p.opacity,
                "--ember-drift": `${p.driftX}px`,
                animation: `ember-rise ${p.duration}s ${p.delay}s infinite ease-out`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
