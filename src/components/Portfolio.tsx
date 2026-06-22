import { Lock, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GithubMark } from "./icons";
import { portfolioPlaceholders, profile } from "@/data/profile";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="04"
            label="Portfolio"
            title="Case studies — currently in the lab"
            description="Detailed write-ups of test strategies, bug hunts, and QA process work are on the way. Until then, here's what's brewing."
          />
          <Reveal delay={0.1}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <GithubMark className="h-4 w-4" />
              View GitHub
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {portfolioPlaceholders.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-dashed border-border-strong bg-surface/20 p-6">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[11px] text-accent-2">
                    {item.tag}
                  </span>
                  <Lock className="h-4 w-4 text-ink-faint" />
                </div>
                <h3 className="mt-6 font-display text-lg sm:text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-6 mono-label text-[11px] text-ink-faint">
                  Coming soon
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
