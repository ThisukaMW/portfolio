"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./reveal";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title={
          <>
            From cart modules to <span className="text-gradient">client sites</span>: real code for real users.
          </>
        }
      />

      <div ref={ref} className="relative pl-8 md:pl-0">
        {/* Track + animated fill */}
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 md:left-1/2"
        />

        <div className="space-y-12 md:space-y-16">
          {experience.map((e, i) => (
            <div key={e.role} className="relative md:grid md:grid-cols-2 md:gap-16">
              <span className="absolute -left-8 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent-2 bg-bg md:left-1/2 md:-translate-x-1/2" />
              <Reveal className={i % 2 ? "md:col-start-2" : "md:text-right"}>
                <p className="font-mono text-sm text-accent-2">{e.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{e.role}</h3>
                <p className="mt-1 text-base text-muted md:text-lg">{e.org}</p>
              </Reveal>
              <Reveal delay={0.1} className={`mt-4 md:mt-0 ${i % 2 ? "md:col-start-1 md:row-start-1 md:text-right" : ""}`}>
                <div className="rounded-3xl border border-line bg-surface/50 p-5 text-left md:p-6">
                  <ul className="space-y-3">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-fg/85 md:text-[15px]">
                        <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
