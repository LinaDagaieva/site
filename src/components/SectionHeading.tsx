import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 mono-label text-xs text-accent ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-ink-faint">{index}</span>
        <span className="h-px w-8 bg-accent/60" />
        <span>{label}</span>
      </div>
      <h2
        className={`mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-xl text-ink-muted text-base sm:text-lg leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
