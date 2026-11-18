"use client";

import { useEffect, useRef } from "react";

/** Faint drifting dust particles over the hero frames. */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pts = Array.from({ length: 46 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.4, vx: (Math.random() - 0.5) * 0.00006, vy: -Math.random() * 0.00012 - 0.00003, a: Math.random() * 0.5 + 0.15,
    }));
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx * 16; p.y += p.vy * 16;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -0.02) p.x = 1.02; if (p.x > 1.02) p.x = -0.02;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,255,58,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
