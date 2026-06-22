import { Award, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skillGroups, certifications } from "@/data/profile";

const marqueeItems = skillGroups.flatMap((g) => g.skills);

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="03"
          label="Skills"
          title="The toolkit behind the testing"
        />
      </div>

      <div className="relative mt-16 border-y border-border bg-surface/30 py-4">
        <div className="flex w-max animate-marquee gap-8">
          {[...marqueeItems, ...marqueeItems].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="mono-label flex items-center gap-2 text-sm text-ink-faint shrink-0"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
              {skill}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 mt-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40">
                <h3 className="mono-label text-xs text-accent">{group.label}</h3>
                <ul className="mt-5 space-y-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm sm:text-base text-ink"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-8">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border-strong bg-gradient-to-r from-accent/10 to-transparent p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="mono-label text-[11px] text-ink-faint">Certification</div>
              <div className="mt-0.5 font-display text-lg text-ink">
                {certifications[0].name}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
