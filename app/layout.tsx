import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextBCI",
  description: "Evidence-first tracker for serious brain-computer interface progress."
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Programs" },
  { href: "/milestones", label: "Milestones" },
  { href: "/trials", label: "Trials" },
  { href: "/demos", label: "Demos" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="site-frame">
          <header className="topbar">
            <div className="topbar-inner">
              <Link className="brand-mark" href="/">
                <span>Next BCI</span>
                <span>Evidence tracker</span>
              </Link>
              <nav aria-label="Primary navigation" className="nav-list">
                {navItems.map((item) => (
                  <Link className="nav-link" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <div className="footer-inner">
              Static-first MVP. No auth, analytics, scraping, ads, paywalls, or external services.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
