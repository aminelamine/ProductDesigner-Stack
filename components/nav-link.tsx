import { ExternalLink } from "lucide-react";
import type { MouseEventHandler } from "react";
import { NEW_TAB_HINT, type NavItem } from "@/lib/data";

interface NavLinkProps {
  item: NavItem;
  className: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// A navigation link. External ones open a new tab and say so (↗ + « (nouvel onglet) »).
export function NavLink({ item, className, onClick }: NavLinkProps) {
  if (!item.external) {
    return (
      <a className={className} href={item.href} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <a className={className} href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {item.label}
      <span className="sr-only"> {NEW_TAB_HINT}</span>
      <ExternalLink aria-hidden="true" />
    </a>
  );
}
