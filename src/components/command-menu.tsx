"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CornerDownLeft, Copy, Download, Hash, Search } from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { profile, projects } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { sections } from "./nav";

type Item = { label: string; group: string; icon: ComponentType<{ className?: string }>; run: () => void };

const go = (href: string) => {
  if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  else window.open(href, "_blank", "noreferrer");
};

// ⌘K / Ctrl+K palette for jumping around the site and grabbing contact info.
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<Item[]>(
    () => [
      ...sections.map((s) => ({ label: s.label, group: "Navigate", icon: Hash, run: () => go(`#${s.id}`) })),
      ...projects.filter((p) => p.live).map((p) => ({
        label: `Open ${p.name} live demo`,
        group: "Projects",
        icon: ArrowUpRight,
        run: () => go(p.live!),
      })),
      { label: "Copy email address", group: "Contact", icon: Copy, run: () => navigator.clipboard.writeText(profile.email) },
      { label: "Download CV", group: "Contact", icon: Download, run: () => go(profile.cv) },
      { label: "GitHub", group: "Contact", icon: GithubIcon, run: () => go(profile.github) },
      { label: "LinkedIn", group: "Contact", icon: LinkedinIcon, run: () => go(profile.linkedin) },
    ],
    [],
  );

  const filtered = items.filter((it) => it.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setActive(0);
          }
          return !o;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = show;
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command", onOpen);
    };
  }, []);

  const select = (it: Item) => {
    setOpen(false);
    it.run();
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter" && filtered[active]) {
                    select(filtered[active]);
                  }
                }}
                placeholder="Type a command or search…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results.</li>}
              {filtered.map((it, i) => {
                const header = it.group !== lastGroup ? it.group : null;
                lastGroup = it.group;
                const Icon = it.icon;
                return (
                  <li key={it.label}>
                    {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{header}</p>}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => select(it)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${
                        i === active ? "bg-white/[0.07] text-fg" : "text-fg/80"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-muted" />
                      <span className="flex-1">{it.label}</span>
                      {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-muted" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
