"use client";

import { useEffect, useRef } from "react";

const GAP = 28;
const RADIUS = 140;

// Dot grid that bends away from the cursor and lights up near it.
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: { x: number; y: number; ox: number; oy: number }[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const draw = () => {
      // Skip work once the hero is scrolled out of view
      if (window.scrollY > h) {
        raf = requestAnimationFrame(draw);
        return;
      }
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.ox - mouse.x;
        const dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - dist / RADIUS);
        const tx = d.ox + (dx / (dist || 1)) * force * 26;
        const ty = d.oy + (dy / (dist || 1)) * force * 26 + Math.sin(t + d.ox * 0.01) * 1.5;
        d.x += (tx - d.x) * 0.12;
        d.y += (ty - d.y) * 0.12;

        // Fade out toward the bottom so the grid melts into the page
        const fade = 1 - d.oy / h;
        if (force > 0) {
          const hue = 250 - force * 80;
          ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${0.25 + force * 0.75})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.2 + force * 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.09 * fade + 0.02})`;
          ctx.fillRect(d.x - 0.75, d.y - 0.75, 1.5, 1.5);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
