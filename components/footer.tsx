import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE, FOOTER_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between md:px-8">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          &copy; 2026 {SITE.name}
        </p>
        <nav className="flex items-center gap-4">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4">
              {i > 0 && <Separator orientation="vertical" className="h-3" />}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary uppercase"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
