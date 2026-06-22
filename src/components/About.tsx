import { MapPin, GraduationCap, Sparkles, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const facts = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Kyiv, Ukraine",
  },
  {
    icon: GraduationCap,
    label: "Started as",
    value: "Pharmacist (MSc)",
  },
  {
    icon: Sparkles,
    label: "Now",
    value: "QA Engineer, 5+ yrs",
  },
  {
    icon: Target,
    label: "Focus",
    value: "Manual + Exploratory QA",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              label="About"
              title="Precision wasn't optional. So I kept it."
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-lg sm:text-xl text-ink leading-relaxed">
                I&apos;m a QA Engineer based in Kyiv, with almost five years spent
                turning vague requirements into airtight test coverage. My
                path here wasn&apos;t the usual one — I started in pharmaceutical
                sciences, where exact protocol and zero tolerance for error
                weren&apos;t a philosophy, they were the job.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                I brought that discipline into software testing, and it shows
                in how I work: structured, detail-obsessed, and a little
                allergic to letting bugs slip past me. At{" "}
                <span className="text-ink">GroupBWT</span>, I own the QA
                lifecycle end to end — refining requirements, building test
                plans, running manual and exploratory testing, and writing
                defect reports that get fixed, not reopened.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                I&apos;m fluent in Scrum teams, comfortable in JIRA and TestRail,
                and steadily expanding into automation — because the next
                chapter of this journey is making the precision scale.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-accent/50"
                  >
                    <fact.icon className="h-5 w-5 text-accent" />
                    <div className="mt-3 mono-label text-[11px] text-ink-faint">
                      {fact.label}
                    </div>
                    <div className="mt-1 text-sm sm:text-base text-ink font-medium">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
