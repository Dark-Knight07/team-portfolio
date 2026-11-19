import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { analyticsEnabled } from "@/lib/analytics";

export const metadata: Metadata = { title: "Privacy notice", description: `How ${site.legalName} handles information collected through this website.` };

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mb-3 mt-10 text-[20px] font-medium tracking-[-0.015em]">{children}</h2>;
const P = ({ children }: { children: React.ReactNode }) => <p className="mb-3 text-[15px] leading-[1.7] text-ink-2">{children}</p>;

export default function Privacy() {
  return (
    <section className="pb-[var(--pad-section)] pt-14">
      <div className="container max-w-[760px]">
        <Link href="/" className="mono text-[11px] uppercase tracking-[0.06em] text-ink-3 hover:text-ink">
          ← Home
        </Link>
        <h1 className="mb-4 mt-6 text-[clamp(32px,4.4vw,52px)] font-medium leading-[1] tracking-[-0.035em]">Privacy notice</h1>
        <P>This notice explains what {site.legalName} collects through this website and why. It is a plain-language summary, not legal advice.</P>

        <H>Information you send us</H>
        <P>
          When you use the project inquiry, cost estimator or consultation forms, we receive what you type, such as your name, email, optional phone number and project details. We use it only to reply to your request. Please do not include passwords, API keys or other secrets. We will never ask for them in a form.
        </P>

        <H>Analytics</H>
        {analyticsEnabled ? (
          <P>
            With your permission, we use Google Analytics 4 to count visits and see which pages and features are used. It sets cookies in your browser only if you click Accept, and IP anonymisation is enabled. If you decline, no analytics script is loaded. You can change your choice at any time using &ldquo;Cookie settings&rdquo; in the footer.
          </P>
        ) : (
          <P>This site does not currently use analytics cookies.</P>
        )}

        <H>Contact</H>
        <P>
          Questions about this notice? Reach us through the{" "}
          <Link href="/#start" className="text-ink underline underline-offset-2 hover:text-accent">
            contact section
          </Link>
          {site.email ? <> or at {site.email}</> : null}.
        </P>
      </div>
    </section>
  );
}
