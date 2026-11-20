import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms for using the ${site.legalName} website.`,
  alternates: { canonical: "/terms" },
};

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mb-3 mt-10 text-[20px] font-medium tracking-[-0.015em]">{children}</h2>;
const P = ({ children }: { children: React.ReactNode }) => <p className="mb-3 text-[15px] leading-[1.7] text-ink-2">{children}</p>;

export default function Terms() {
  return (
    <section className="pb-[var(--pad-section)] pt-14">
      <div className="container max-w-[760px]">
        <Link href="/" className="mono text-[11px] uppercase tracking-[0.06em] text-ink-3 hover:text-ink">
          ← Home
        </Link>
        <h1 className="mb-4 mt-6 text-[clamp(32px,4.4vw,52px)] font-medium leading-[1] tracking-[-0.035em]">Terms of use</h1>
        <P>These terms cover your use of this website, operated by {site.legalName}. They are a plain-language summary, not legal advice, and should be reviewed by a qualified lawyer before you rely on them.</P>

        <H>Using the site</H>
        <P>You may browse this site and send us enquiries for lawful purposes. Please do not misuse the forms, attempt to disrupt the site, or send content that is unlawful or contains secrets such as passwords or API keys.</P>

        <H>Estimates are not quotes</H>
        <P>The cost estimator gives an indicative range only. It is not an offer or a quote. Any engagement is agreed separately in writing after we understand your requirements.</P>

        <H>Project descriptions</H>
        <P>Case studies and articles are provided for general information. Projects marked as demonstration or personal projects are not client engagements.</P>

        <H>Intellectual property</H>
        <P>The site&apos;s content, design and code belong to {site.legalName} unless stated otherwise. Third-party names and trademarks belong to their owners.</P>

        <H>Liability</H>
        <P>The site is provided as is. To the extent the law allows, we are not liable for losses that arise from using it or relying on its content.</P>

        <H>Privacy and contact</H>
        <P>
          How we handle your information is described in the{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-accent">
            privacy notice
          </Link>
          . Questions about these terms? Reach us through the{" "}
          <Link href="/#start" className="text-ink underline underline-offset-2 hover:text-accent">
            contact section
          </Link>
          {site.email ? <> or at {site.email}</> : null}.
        </P>
      </div>
    </section>
  );
}
