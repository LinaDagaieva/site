import { Mail, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GithubMark, LinkedinMark } from "./icons";
import { profile } from "@/data/profile";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: LinkedinMark,
    label: "LinkedIn",
    value: "lina-dagaieva-54b1a5219",
    href: profile.linkedin,
  },
  {
    icon: GithubMark,
    label: "GitHub",
    value: "LinaDagaieva",
    href: profile.github,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 border-t border-border bg-bg-elevated overflow-hidden"
    >
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="05"
          label="Contact"
          align="center"
          title="Let's talk quality."
          description="Open to QA roles, collaborations, or just a good conversation about test strategy. Reach out — I reply fast."
        />

        <Reveal delay={0.15} className="mt-14 grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-accent">
                  <link.icon className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <div className="mono-label text-[11px] text-ink-faint">
                    {link.label}
                  </div>
                  <div className="text-sm text-ink truncate max-w-[10rem] sm:max-w-[12rem]">
                    {link.value}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </Reveal>
      </div>

      <div className="relative mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} {profile.name}. Built with precision.</span>
          <span className="mono-label">QA Engineer · {profile.location}</span>
        </div>
      </div>
    </section>
  );
}
