"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type PointerEvent } from "react";
import { profile, rotatingWords } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ParticleField } from "./particle-field";
import { Portrait } from "./portrait";

const desktopQuery = "(min-width: 1024px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(desktopQuery);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}

function SplitName({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={rotatingWords[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient whitespace-nowrap font-semibold"
        >
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const isDesktop = useIsDesktop();

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32">
      {/* Background layers */}
      <ParticleField />
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-2/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div
        // On phones the hero is taller than the screen, so fading it would hide the photo
        style={isDesktop ? { y, opacity } : undefined}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:gap-16 md:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      >
        <div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 text-xs backdrop-blur md:mb-8 md:text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-3 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-3" />
            </span>
            {profile.status}
          </motion.a>

          <h1 className="font-display text-[13.5vw] md:text-[clamp(2.6rem,7vw,5.75rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
            <SplitName text={profile.firstName} delay={0.4} />
            <br />
            <span className="text-muted/60">
              <SplitName text={profile.lastName} delay={0.65} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 max-w-xl"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:text-sm sm:tracking-[0.2em]">
              {profile.role} <span className="text-accent-2">/</span> {profile.focus}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-fg/90 md:mt-5 md:text-2xl">
              I build <RotatingWord />
              <br className="hidden sm:block" /> that keep working when things go wrong.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-4 font-medium text-bg"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative">See my work</span>
                <ArrowDown className="relative h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-4 font-medium backdrop-blur transition-colors hover:border-white/25"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Magnetic>
            <div className="ml-1 flex gap-2">
              {[
                { href: profile.github, icon: GithubIcon, label: "GitHub" },
                { href: profile.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-14 w-14 place-items-center rounded-full border border-line bg-surface/50 backdrop-blur transition-colors hover:border-white/25 hover:text-accent-2"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        <Portrait />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-fg"
          />
        </span>
      </motion.div>
    </section>
  );
}
