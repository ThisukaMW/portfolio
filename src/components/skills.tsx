"use client";

import { motion } from "motion/react";
import { skills } from "@/data/portfolio";
import { Reveal, SectionHeading, trackSpotlight } from "./reveal";

// Bento layout: column spans per group, in the same order as `skills`
const spans = [
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
];
const accents = ["#8b7bff", "#3ee0cf", "#c6f36b", "#f5b942", "#38bdf8", "#fb7185", "#ff8a3d", "#a78bfa"];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        index="04"
        eyebrow="Toolbox"
        title={
          <>
            One toolbox from <span className="text-gradient">pixels to models</span>.
          </>
        }
      >
        Frontend, backend, data and AI: I can take a feature from the database schema to the UI, and plug in ML where it earns its place.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.06} className={spans[i]}>
            <div
              onPointerMove={trackSpotlight}
              className="spotlight group h-full overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 md:p-7"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold md:text-2xl">{g.group}</h3>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accents[i], boxShadow: `0 0 16px ${accents[i]}` }} />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
                {g.items.map((s, j) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + j * 0.04 }}
                    whileHover={{ y: -3, borderColor: accents[i] }}
                    className="cursor-default rounded-xl border border-line bg-bg/60 px-3 py-1.5 text-[13px] md:px-3.5 md:py-2 md:text-sm"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
