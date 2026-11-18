import type { ReactNode } from "react";

export const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const ArrowUpRight = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12L12 4M5 4h7v7" />
  </svg>
);

export function Tag({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-[9px] py-1 rounded-[6px] font-mono text-[10px] tracking-[0.04em] uppercase border ${
        accent ? "text-black bg-accent border-accent" : "text-ink-2 bg-white/5 border-line"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeader({ index, label, kicker, title, text }: { index: string; label: string; kicker: string; title: string; text?: string }) {
  return (
    <header className="reveal grid grid-cols-1 gap-[10px] mb-10 items-start md:gap-[18px] md:mb-14 md:[grid-template-columns:minmax(120px,1fr)_minmax(0,2.2fr)]">
      <div className="md:pt-1.5">
        <span className="eyebrow flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-ink-3 inline-block" />
          {index} / {label}
        </span>
      </div>
      <div style={{ maxWidth: 780 }}>
        <div className="mono text-[12px] text-ink-3 mb-3.5 tracking-[0.02em]">{kicker}</div>
        <h2 className="font-medium text-ink leading-[0.98] tracking-[-0.03em]" style={{ fontSize: "clamp(34px,4.6vw,58px)" }}>
          {title}
        </h2>
        {text && (
          <p className="mt-4 text-ink-2 leading-[1.55]" style={{ fontSize: "clamp(16px,1.4vw,19px)", maxWidth: 640 }}>
            {text}
          </p>
        )}
      </div>
    </header>
  );
}

export const btnPrimary = "inline-flex items-center gap-2 font-semibold bg-accent text-black rounded-[8px] hover:bg-[#c8f530] transition-colors";
export const btnGhost = "inline-flex items-center gap-2 border border-line-2 text-ink-2 rounded-[8px] hover:border-line-3 hover:text-ink hover:bg-bg-3 transition-colors";
