"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { profile, stats, taglines } from "@/data/profile";

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % taglines.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full bg-accent-2/25 blur-[100px] animate-float" />
      <div className="absolute inset-0 bg-noise opacity-50" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mono-label inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs text-ink-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to new QA opportunities · {profile.location}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-display text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[0.95]"
        >
          <span className="block text-ink">Lina</span>
          <span className="block text-gradient">Dagaieva</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex items-center gap-3"
        >
          <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
          <div className="h-6 overflow-hidden relative w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute text-base sm:text-lg text-ink-muted whitespace-nowrap"
              >
                {taglines[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed"
        >
          QA Engineer turning ambiguous requirements into airtight test
          coverage. Former pharmacist, current bug hunter — same obsession
          with precision, now pointed at software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#journey"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            See my journey
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Contact me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 max-w-2xl divide-x divide-border border-y border-border"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 sm:px-6 py-5 first:pl-0">
              <div className="font-display text-3xl sm:text-4xl text-ink">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-ink-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
