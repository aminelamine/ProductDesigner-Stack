import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroIllustration } from "@/components/hero-illustration";
import { fontDriveDisplay, fontDriveSans } from "@/lib/fonts";
import { HERO } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="hero"
      className={`${fontDriveDisplay.variable} ${fontDriveSans.variable} theme-drive`}
    >
      <div>
        <h1 className={fontDriveDisplay.className}>{HERO.headline}</h1>
      </div>

      <div className={fontDriveSans.className}>
        <HeroIllustration />
        <p>{HERO.subtitle}</p>
        <div>
          <a
            href="#contact"
            className={buttonVariants({ variant: "outline" })}
          >
            Me contacter
          </a>
          <a
            href="https://obsolet.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Lire Obsolet
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
