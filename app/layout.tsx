import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import { team } from "@/lib/team";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Closing";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const sans = Inter({ variable: "--nf-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--nf-mono", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--nf-serif", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.legalName} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["cloud engineering", "Microsoft Entra ID", "identity and access management", "Microsoft 365", "AWS", "AI automation", "DevOps", "web development", "cybersecurity"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } } : {}),
  openGraph: { title: `${site.legalName} — ${site.tagline}`, description: site.description, type: "website", siteName: site.legalName },
  twitter: { card: "summary_large_image", title: `${site.legalName} — ${site.tagline}`, description: site.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  slogan: site.tagline,
  url: site.url,
  description: site.description,
  areaServed: "Worldwide",
  knowsAbout: ["Cloud engineering", "Identity and access management", "Microsoft 365", "AI and automation", "Web development", "DevOps", "Cybersecurity"],
  employee: team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.title })),
};

export const viewport: Viewport = { themeColor: "#0a0a0a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="scroll-progress" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "<") }} />
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
