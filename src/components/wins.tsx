"use client";

import { ArrowUpRight, Award, Medal, Trophy } from "lucide-react";
import { achievements, beyond } from "@/data/portfolio";
import { Reveal, SectionHeading, trackSpotlight } from "./reveal";

const kindIcon = { win: Trophy, final: Medal, award: Award };

export function Wins() {
  // Best Pillar Member already appears under Experience; keep this grid to hackathons (fills 2×2 beside the feature)
  const [champion, ...rest] = achievements.filter((a) => a.kind !== "award");

  return (
    <section id="wins" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        index="05"
        eyebrow="Recognition"
        title={
          <>
            I do my best work <span className="text-gradient">when the clock is running</span>.
          </>
        }
      >
        One championship and four finals across hackathons run by KDU, Dialog Axiata, Ascentic, UCSC, CSSL and APIIT.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Featured win */}
        <Reveal className="lg:row-span-2">
          <div className="relative h-full overflow-hidden rounded-3xl p-[1.5px]">
            <div className="conic-border absolute inset-[-50%]" />
            <div className="relative flex h-full flex-col justify-between rounded-[calc(1.5rem-1.5px)] bg-surface p-8">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#f5b942]/20 blur-3xl" />
              <Trophy className="relative h-12 w-12 text-[#f5b942]" strokeWidth={1.5} />
              <div className="relative mt-16">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#f5b942]">Champions · 2026</p>
                <p className="mt-3 font-display text-4xl font-semibold leading-tight">{champion.title}</p>
                <p className="mt-2 text-muted">{champion.org}</p>
                <p className="mt-6 text-sm leading-relaxed text-fg/80">
                  Won with <a href="#resolvex" className="underline decoration-[#f5b942] underline-offset-4">ResolveX</a>, an ML and
                  Gemini Vision platform that decides fairly who is at fault when a delivery goes wrong.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {rest.map((a, i) => {
          const Icon = kindIcon[a.kind];
          return (
            <Reveal key={a.title} delay={(i % 2) * 0.08}>
              <div
                onPointerMove={trackSpotlight}
                className="spotlight flex h-full items-start gap-4 rounded-3xl border border-line bg-surface/60 p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/5 text-accent-2">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">{a.title}</p>
                  <p className="mt-1 text-sm text-muted">{a.org}</p>
                  {a.project && (
                    <a
                      href={`#${a.project}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-2 hover:underline"
                    >
                      See the project <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Beyond code */}
      <Reveal className="mt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#ff7a1a]/15 via-surface to-surface p-8 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 select-none text-[16rem] leading-none opacity-[0.07]">🏀</div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff9a4a]">Beyond the keyboard</p>
          <h3 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            National university champion on the basketball court.
          </h3>
          <p className="mt-4 max-w-2xl text-muted">
            Team sport is where I learned to communicate under pressure, play my role and hold others accountable. I bring the same
            habits to every engineering team I join.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              { heading: "Titles", items: beyond.titles },
              { heading: "Leadership", items: beyond.roles },
            ].map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-sm font-medium text-fg/60">{col.heading}</p>
                <ul className="space-y-3">
                  {col.items.map((t) => (
                    <li key={t.title} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                      <span className="font-medium">{t.title}</span>
                      <span className="text-right text-sm text-muted">{t.sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
