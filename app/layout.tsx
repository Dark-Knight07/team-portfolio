import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Closing";
import "./globals.css";

const sans = Inter({ variable: "--nf-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--nf-mono", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--nf-serif", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.legalName} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: `${site.legalName} — ${site.tagline}`, description: site.description, type: "website", siteName: site.legalName },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0a0a0a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
