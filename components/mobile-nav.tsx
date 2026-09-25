"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { fontDriveSans } from "@/lib/fonts";
import { HEADER_UI, NAV_ITEMS } from "@/lib/data";
import { NavLink } from "@/components/nav-link";
import { jumpTo } from "@/lib/jump";
import s from "./mobile-nav.module.css";

const PANEL_ID = "menu-principal";

// Under 768 px: the Shadcn Sheet (focus trap, Escape, focus back to the trigger), on the cream
// socle. The portal leaves the header's `.theme-drive` tree, so the panel carries it again.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pending = useRef<string | null>(null);

  // The menu only exists under 768 px: widening the window closes it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  // In-page links close the menu first, then go to their target once the scroll lock is released.
  const follow = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href") ?? "";
    if (href.startsWith("#")) {
      e.preventDefault();
      pending.current = href;
    }
    setOpen(false);
  };
  const settle = (isOpen: boolean) => {
    const href = pending.current;
    pending.current = null;
    if (!isOpen && href) jumpTo(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} onOpenChangeComplete={settle}>
      <SheetTrigger className={s.trigger} aria-label={HEADER_UI.menuOpen} aria-expanded={open} aria-controls={PANEL_ID}>
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        id={PANEL_ID}
        side="right"
        showCloseButton={false}
        className={`${fontDriveSans.variable} theme-drive ${s.panel}`}
      >
        <SheetTitle className="sr-only">{HEADER_UI.menuTitle}</SheetTitle>
        <SheetClose className={s.close} aria-label={HEADER_UI.menuClose}>
          <X aria-hidden="true" />
        </SheetClose>
        <nav aria-label={HEADER_UI.navLabel} className={s.list}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} className={s.link} onClick={follow} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
