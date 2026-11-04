"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications, education, marquee, profile, stats } from "@/data/portfolio";
import { Counter, Reveal, SectionHeading, trackSpotlight } from "./reveal";

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="mask-fade-x relative overflow-hidden border-y border-line bg-surface/40 py-6">
      <div className="flex w-max animate-marquee gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium text-muted md:text-3xl">
            {t}
            <span className="text-accent-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const terminalLines = [
  { k: "name", v: `"${profile.name}"` },
  { k: "role", v: `"${profile.role} · ${profile.focus}"` },
  { k: "based_in", v: `"${profile.location}"` },
  { k: "studying", v: `"B.Sc (Hons) IT @ University of Moratuwa"` },
  { k: "stack", v: `["TypeScript", "React", "Next.js", "Node.js", "Python"]` },
  { k: "loves", v: `["system design", "ML in prod", "basketball 🏀"]` },
  { k: "status", v: `"open_to_internships"` },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= terminalLines.length) clearInterval(id);
        return n + 1;
      });
    }, 180);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-[#0a0a10] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">~/thisuka — whoami.ts</span>
      </div>
      <pre className="whitespace-pre-wrap break-words p-5 font-mono text-xs leading-6 md:p-6 md:text-sm md:leading-7">
        <span className="text-muted">$ </span>
        <span className="text-accent-3">npx</span> whoami
        {"\n"}
        <span className="text-accent">const</span> <span className="text-accent-2">me</span> = {"{"}
        {terminalLines.slice(0, shown).map((l) => (
          <motion.span key={l.k} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="block pl-[2ch]">
            <span className="text-fg">{l.k}</span>: <span className="text-[#f5b942]">{l.v}</span>,
          </motion.span>
        ))}
        {shown > terminalLines.length && <span className="block">{"}"};</span>}
        <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent-2" />
      </pre>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            I care about the parts that break: <span className="text-gradient">offline sync, bad inputs, flaky APIs</span>, and the users who
            hit them.
          </>
        }
      >
        {profile.summary}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal>
          <Terminal />
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                onPointerMove={trackSpotlight}
                className="spotlight flex h-full flex-col justify-between rounded-3xl border border-line bg-surface/60 p-4 md:p-6"
              >
                <p className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
                  <Counter value={s.value} decimals={s.decimals} />
                  <span className="text-accent-2">{s.suffix}</span>
                </p>
                <div className="mt-4 md:mt-6">
                  <p className="text-sm font-medium md:text-base">{s.label}</p>
                  <p className="mt-1 text-xs text-muted md:text-sm">{s.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-line bg-surface/40 p-5 md:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">{e.period}</p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug md:mt-3 md:text-xl">{e.title}</p>
              <p className="mt-1 text-sm text-muted">{e.org}</p>
              {e.detail && <p className="mt-4 text-sm text-fg/80">{e.detail}</p>}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.credentialId} delay={i * 0.08}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-surface/40 p-5 transition-colors hover:border-white/20"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-3/10 text-accent-3">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{c.title}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {c.issuer} · Issued {c.issued}
                </p>
                <p className="mt-1 hidden truncate font-mono text-[11px] text-muted/70 sm:block">ID {c.credentialId}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-sm text-muted transition-colors group-hover:text-fg">
                <span className="hidden sm:inline">Verify</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
