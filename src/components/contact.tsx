"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { Magnetic } from "./hero";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const links = [
    { label: "GitHub", sub: "@ThisukaMW", href: profile.github, icon: GithubIcon },
    { label: "LinkedIn", sub: "thisuka-warsavithana", href: profile.linkedin, icon: LinkedinIcon },
    { label: "Email", sub: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-10 pt-16 md:px-8 md:pt-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="text-accent-2">06</span>
            <span className="h-px w-10 bg-line" />
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
            Let&apos;s build
            <br />
            <span className="text-gradient">something real.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-base text-muted md:mt-8 md:text-lg">
            I&apos;m looking for a full-stack software engineering internship and I&apos;m open to freelance work. If you have a hard problem
            and a team that ships, I&apos;d like to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-fg px-8 py-5 text-lg font-medium text-bg"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative">Say hello</span>
                <ArrowUpRight className="relative h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <button
              onClick={copy}
              className="relative inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-5 font-mono text-sm backdrop-blur transition-colors hover:border-white/25"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4 text-accent-3" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied to clipboard" : profile.email}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-5 text-sm font-medium backdrop-blur transition-colors hover:border-white/25"
            >
              <Download className="h-4 w-4" /> CV
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:mt-20 gap-4 md:grid-cols-3">
          {links.map(({ label, sub, href, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between rounded-3xl border border-line bg-surface/60 p-6 transition-colors hover:border-white/20"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 transition-colors group-hover:bg-fg group-hover:text-bg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-sm text-muted">{sub}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
              </a>
            </Reveal>
          ))}
        </div>

        <footer className="mt-14 flex flex-col items-center justify-between gap-4 text-center md:mt-28 md:text-left border-t border-line pt-8 text-sm text-muted md:flex-row">
          <p>© 2026 {profile.name}. Designed &amp; built in Moratuwa 🇱🇰</p>
          <p className="hidden font-mono text-xs md:block">
            Next.js · Tailwind · Motion · press <kbd className="rounded border border-line px-1.5 py-0.5">Ctrl K</kbd>
          </p>
        </footer>
      </div>
    </section>
  );
}
