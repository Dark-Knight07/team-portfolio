import { site } from "@/lib/site";

/** Text/monogram mark — replace with an <img> of the real logo when available. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center border border-line-2 font-semibold text-accent"
      style={{ width: size, height: size, borderRadius: size > 32 ? 10 : 8, fontSize: size * 0.42 }}
    >
      {site.name.slice(0, 1)}
    </span>
  );
}
