"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/map", label: "Map" },
  { href: "/milestones", label: "Activity" },
  { href: "/trials", label: "Trials" },
  { href: "/demos", label: "Demos" }
];

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand-mark" href="/">
          <span className="brand-glyph" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12h3l2-5 3 10 2-6 2 3h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="brand-text">
            <b>NextBCI</b>
            <span>Neural interface tracker</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="nav-list">
          {navItems.map((item) => (
            <Link className="nav-link" data-active={isActive(item.href)} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
