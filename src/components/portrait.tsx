"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { profile } from "@/data/portfolio";

const chips = [
  { label: "🏆 CodeArena'26 Champion", className: "-left-6 top-10 md:-left-16", delay: 1.1 },
  { label: "⚡ React · Node · Python", className: "-right-4 top-1/2 md:-right-14", delay: 1.25 },
  { label: "📍 Moratuwa, LK", className: "-left-2 bottom-8 md:-left-10", delay: 1.4 },
];

export function Portrait() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.55), transparent 55%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative mx-auto w-[260px] sm:w-[320px] lg:w-[380px]" style={{ perspective: 1000 }}>
      {/* Glow */}
      <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-accent/40 via-accent-2/20 to-accent-3/30 blur-3xl" />

      <motion.div
        data-cursor
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5]"
      >
        {/* Animated gradient frame */}
        <div className="conic-border absolute -inset-[2px] rounded-[2.2rem]" />
        <div className="absolute inset-0 overflow-hidden rounded-[2.1rem] bg-surface">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.35 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                preload
                sizes="(min-width: 1024px) 380px, 320px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          {/* Duotone wash + glare that follows the cursor */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-accent/10 mix-blend-multiply" />
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
            style={{ background: glare }}
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            <span>Thisuka.W</span>
            <span>©2026</span>
          </div>
        </div>

        {/* Spinning circular badge */}
        <div className="absolute -right-8 -top-8 h-28 w-28 md:-right-12 md:-top-12 md:h-32 md:w-32" style={{ transform: "translateZ(60px)" }}>
          <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
            <defs>
              <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-fg font-mono text-[9.5px] uppercase tracking-[0.3em]">
              <textPath href="#circle">Full-stack · Backend · Systems ·</textPath>
            </text>
          </svg>
          <div className="absolute inset-0 m-auto grid h-11 w-11 place-items-center rounded-full bg-accent-3 text-lg text-bg">
            ✦
          </div>
        </div>

        {chips.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: c.delay, type: "spring", stiffness: 200, damping: 18 }}
            className={`absolute ${c.className}`}
            style={{ transform: "translateZ(80px)" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="whitespace-nowrap rounded-full border border-white/10 bg-surface-2/80 px-3.5 py-2 text-xs font-medium shadow-2xl shadow-black/50 backdrop-blur-xl"
            >
              {c.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
