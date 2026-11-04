"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { GithubIcon } from "./icons";
import { SectionHeading, trackSpotlight } from "./reveal";

function MetricPanel({ p }: { p: Project }) {
  return (
    <div
      className="relative order-first flex min-h-[180px] flex-col justify-between gap-6 overflow-hidden rounded-[1.6rem] p-5 lg:order-none lg:min-h-[260px] lg:gap-0 lg:p-7"
      style={{
        background: `radial-gradient(120% 120% at 100% 0%, ${p.color}55, transparent 55%), linear-gradient(160deg, ${p.color}22, #0b0b12 70%)`,
      }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(${p.color} 1px, transparent 1px), linear-gradient(90deg, ${p.color} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at 70% 30%, #000, transparent 75%)",
        }}
      />
      {/* Orbiting node */}
      <div className="absolute right-5 top-5 h-16 w-16 rounded-full border lg:right-8 lg:top-8 lg:h-28 lg:w-28" style={{ borderColor: `${p.color}55` }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <span
            className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{ background: p.color, boxShadow: `0 0 20px ${p.color}` }}
          />
        </motion.div>
        <div className="absolute inset-3.5 rounded-full border border-dashed lg:inset-6" style={{ borderColor: `${p.color}44` }} />
      </div>

      <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-white/60">{p.name}</span>
      <div className="relative">
        <p className="font-display text-5xl font-semibold tracking-tight md:text-7xl" style={{ color: p.color }}>
          {p.metric.value}
        </p>
        <p className="mt-1.5 text-sm text-white/80 md:mt-2 md:text-base">{p.metric.label}</p>
      </div>
    </div>
  );
}

function ProjectCard({
  p,
  i,
  total,
  progress,
}: {
  p: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLElement>(null);
  const baseTop = 96 + i * 22;
  const [top, setTop] = useState(baseTop);
  const [expanded, setExpanded] = useState(false);

  // A card taller than the space under the stack pins higher, so its bottom
  // (with the demo/source links) is on screen before the next card covers it.
  useEffect(() => {
    const el = ref.current!;
    const update = () => setTop(Math.min(baseTop, window.innerHeight - el.offsetHeight - 24));
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [baseTop]);

  const smooth = useSpring(progress, { stiffness: 140, damping: 30, mass: 0.4 });
  const scale = useTransform(smooth, [i / total, 1], [1, 1 - (total - i) * 0.035]);
  const shade = useTransform(smooth, [i / total, (i + 1) / total], [0, 0.45]);
  const isLast = i === total - 1;

  return (
    <div className={`mb-8 md:sticky ${isLast ? "md:mb-0" : "md:mb-[35vh]"}`} style={{ top }}>
      <motion.article
        ref={ref}
        style={{ scale }}
        onPointerMove={trackSpotlight}
        className="spotlight group relative origin-top rounded-[2rem] border border-line bg-surface p-3 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] will-change-transform md:p-4"
      >
        <div className="grid grid-cols-1 gap-2 md:gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="flex flex-col p-3 md:p-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              {p.badge && (
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium md:px-3 md:text-xs"
                  style={{ borderColor: `${p.color}66`, color: p.color, background: `${p.color}14` }}
                >
                  {p.badge}
                </span>
              )}
            </div>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:mt-4 md:text-5xl">{p.name}</h3>
            <p className="mt-1 text-base text-muted md:mt-2 md:text-lg">{p.title}</p>

            <ul className="mt-4 space-y-3 md:mt-6">
              {p.points.map((pt, j) => (
                <li
                  key={pt}
                  className={`gap-3 text-sm leading-relaxed text-fg/85 md:flex md:text-[15px] ${j >= 2 && !expanded ? "hidden" : "flex"}`}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full md:mt-2.5" style={{ background: p.color }} />
                  {pt}
                </li>
              ))}
            </ul>
            {/* Phones show the first two points; desktop always shows them all */}
            {p.points.length > 2 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-3 self-start py-1 text-sm font-medium md:hidden"
                style={{ color: p.color }}
              >
                {expanded ? "Show less" : `Show ${p.points.length - 2} more`}
              </button>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted md:px-3 md:text-xs">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105"
                  style={{ background: p.color }}
                >
                  Live demo <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-white/30"
              >
                <GithubIcon className="h-4 w-4" /> Source
              </a>
            </div>
          </div>

          <MetricPanel p={p} />
        </div>
        {/* Darkens the card as the next one slides over it (cheaper than a CSS filter) */}
        {!isLast && (
          <motion.div
            aria-hidden
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] bg-black"
          />
        )}
      </motion.article>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        index="02"
        eyebrow="Selected work"
        title={
          <>
            Production-minded projects, <span className="text-gradient">built under hackathon pressure</span> and shipped live.
          </>
        }
      >
        Each one has its source public, most are live, and every one was built around a hard constraint: route optimisation,
        fairness in ML decisions, models that drift, retrieval quality, cryptographic trust, or working with no signal at all.
      </SectionHeading>

      <div ref={ref} className="relative">
        {projects.map((p, i) => (
          <Fragment key={p.slug}>
            {/* In-flow anchor: sticky cards report shifting positions, so links target this instead */}
            <div id={p.slug} aria-hidden />
            <ProjectCard p={p} i={i} total={projects.length} progress={scrollYProgress} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
