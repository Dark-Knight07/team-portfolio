import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0a0a0a", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", color: "#d4ff3a", fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>{site.positioning.join("  ·  ")}</div>
        <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: -4, marginTop: 28 }}>{site.name}</div>
        <div style={{ fontSize: 44, color: "#ffffffb3", marginTop: 12 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
