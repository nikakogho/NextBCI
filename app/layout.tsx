import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "NextBCI — Neural interface tracker",
  description:
    "A launch-tracker view of brain-computer interface progress: milestones, trials, demos, and a live world map of the programs pushing the field."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="site-frame">
          <NavBar />
          <main>{children}</main>
          <footer className="footer">
            <div className="footer-inner">
              <span>NextBCI · evidence-first neural interface tracker</span>
              <span>Static build · every claim links to a primary source</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
