import Link from "next/link";
import { btnGhost, btnPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-[clamp(96px,18vh,220px)]">
      <div className="container max-w-[760px] text-center">
        <p className="mono mb-6 text-[12px] uppercase tracking-[0.06em] text-accent">Error 404</p>
        <h1 className="mb-5 text-[clamp(40px,6vw,80px)] font-medium leading-[0.98] tracking-[-0.04em]">That page isn&apos;t here.</h1>
        <p className="mx-auto mb-10 max-w-[480px] text-[17px] leading-[1.55] text-ink-2">The link may be old or mistyped. Head back to the homepage, or look through our work.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={`${btnPrimary} h-12 px-6 text-[15px]`}>
            Back to home
          </Link>
          <Link href="/#portfolio" className={`${btnGhost} h-12 px-6 text-[15px]`}>
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
