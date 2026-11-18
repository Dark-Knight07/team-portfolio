"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, nav, contactHref } from "@/lib/site";
import { LogoMark } from "./Logo";
import { ArrowRight, btnPrimary } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled || open ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-[68px]">
        <Link className="flex items-center gap-2.5" href="/#top" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="font-semibold text-[15px] tracking-[-0.01em]">{site.name}</span>
          <span className="mono text-[10px] text-ink-3 tracking-[0.06em] px-1.5 py-0.5 border border-line rounded-[4px] ml-1.5 hidden sm:inline">{site.tag}</span>
        </Link>
        <div className="hidden md:flex items-center gap-0.5">
          {nav.map((n) => (
            <a key={n.href} className="px-3 py-2 rounded-[8px] text-[13px] tracking-[-0.005em] transition-colors duration-150 text-ink-2 hover:text-ink" href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2.5">
          <span className="mono text-[11px] text-ink-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" style={{ boxShadow: "0 0 0 3px rgba(126,231,135,0.18)" }} />
            Taking new work
          </span>
          <a className={`${btnPrimary} h-10 px-4 text-[13px]`} href={contactHref}>
            Start a project <ArrowRight />
          </a>
        </div>
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`w-5 h-px bg-ink block transition-all duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`w-5 h-px bg-ink block transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-px bg-ink block transition-all duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-bg/95 backdrop-blur-xl">
          <div className="container flex flex-col py-4 gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-[15px] text-ink-2 hover:text-ink border-b border-line last:border-0">
                {n.label}
              </a>
            ))}
            <a className={`${btnPrimary} h-11 px-4 text-[14px] justify-center mt-3`} href={contactHref} onClick={() => setOpen(false)}>
              Start a project <ArrowRight />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
