"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, FlaskConical, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { journey, type Track } from "@/data/profile";

const trackMeta: Record<
  Track,
  { label: string; icon: typeof Briefcase; dot: string; badge: string }
> = {
  education: {
    label: "Education",
    icon: GraduationCap,
    dot: "bg-accent-2",
    badge: "border-accent-2/40 text-accent-2 bg-accent-2/10",
  },
  training: {
    label: "Training Project",
    icon: FlaskConical,
    dot: "bg-ink-faint",
    badge: "border-border-strong text-ink-muted bg-surface-2/60",
  },
  work: {
    label: "Full-time",
    icon: Briefcase,
    dot: "bg-accent",
    badge: "border-accent/40 text-accent bg-accent/10",
  },
};

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 85%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      className="relative py-24 sm:py-32 border-t border-border bg-bg-elevated"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="02"
          label="Career Journey"
          title="From precise prescriptions to precise test plans"
          description="A pharmacist's discipline, redirected into software quality — every stop below shaped how I test today."
        />

        <div ref={containerRef} className="relative mt-20">
          {/* Static track */}
          <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-px bg-border" />
          {/* Animated progress track */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[15px] sm:left-[19px] top-0 w-px bg-gradient-to-b from-accent via-accent-2 to-accent-2"
          />

          <ul className="space-y-12">
            {journey.map((entry, i) => {
              const meta = trackMeta[entry.track];
              const Icon = meta.icon;
              return (
                <li key={`${entry.org}-${entry.period}`} className="relative pl-12 sm:pl-16">
                  <Reveal delay={Math.min(i * 0.05, 0.3)}>
                    <span
                      className={`absolute left-0 sm:left-1 top-0 flex h-8 w-8 items-center justify-center rounded-full ${meta.dot} ring-4 ring-bg-elevated`}
                    >
                      <Icon className="h-4 w-4 text-bg" />
                    </span>

                    <div
                      className={`rounded-2xl border p-6 transition-colors ${
                        entry.current
                          ? "border-accent/40 bg-accent/[0.04]"
                          : "border-border bg-surface/40 hover:border-border-strong"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`mono-label inline-flex items-center rounded-full border px-3 py-1 text-[11px] ${meta.badge}`}
                        >
                          {meta.label}
                        </span>
                        {entry.current && (
                          <span className="mono-label inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] text-accent">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            Current
                          </span>
                        )}
                        <span className="mono-label text-[11px] text-ink-faint">
                          {entry.period}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-xl sm:text-2xl text-ink">
                          {entry.org}
                        </h3>
                        {entry.location && (
                          <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                            <MapPin className="h-3 w-3" />
                            {entry.location}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm sm:text-base text-accent-2">
                        {entry.role}
                      </p>

                      {entry.description && (
                        <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                          {entry.description}
                        </p>
                      )}

                      {entry.bullets && (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {entry.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-sm text-ink-muted"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
