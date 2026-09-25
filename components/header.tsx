import { fontDriveSans } from "@/lib/fonts";
import { HEADER_CTA, HEADER_UI, NAV_ITEMS, SITE } from "@/lib/data";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import s from "./header.module.css";

// Cream header, real navigation (decisions/003): the name, the text links (≥ 768 px), a single
// « Me contacter » pill; under 768 px a menu. Scoped `.theme-drive`, `:root` untouched.
export function Header() {
  return (
    <header className={`${fontDriveSans.variable} theme-drive ${s.header} sticky top-0 z-50`}>
      <div className={s.inner}>
        <a className={s.brand} href="#hero">
          {SITE.name}
        </a>
        <nav className={s.nav} aria-label={HEADER_UI.navLabel}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} className={s.link} />
          ))}
        </nav>
        <a className={s.pill} href={HEADER_CTA.href}>
          {HEADER_CTA.label}
        </a>
        <MobileNav />
      </div>
    </header>
  );
}
