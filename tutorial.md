# How This Website Works: A Beginner's Tutorial

This document walks through everything that was built for your personal site — the resume/portfolio pages **and** the "Digital Twin" AI chat — assuming you've never written frontend code before. By the end you should be able to open any file in `src/` and roughly understand what it's doing and why.

It's organized in four parts:

1. **The technology** — what each tool is, in plain English
2. **High-level walkthrough** — how the pieces fit together, and what happens when someone loads the page or sends a chat message
3. **Detailed code review** — file by file, with real code samples and line-by-line explanations
4. **Self-review** — five honest suggestions for how this code could be improved

---

## Part 1 — The Technology, Explained

### The big picture: what is "frontend coding"?

A website is really just files (HTML, CSS, JavaScript) that a browser downloads and turns into the page you see. **HTML** is the content/structure, **CSS** is the visual styling, and **JavaScript** is what makes things interactive (clicking, typing, animating). Writing all three by hand for a big site gets messy fast — so this project uses tools that make each of those three jobs easier.

### React — the foundation

[React](https://react.dev) is a JavaScript library for building UI out of small, reusable pieces called **components**. Instead of one giant HTML file, you write functions that return markup, and you nest them inside each other like Lego bricks. For example, the whole homepage is just:

```tsx
<Nav />
<Hero />
<About />
<Journey />
<Skills />
<DigitalTwin />
<Portfolio />
<Contact />
```

Each of those (`Hero`, `About`, etc.) is its own file with its own self-contained markup and logic. That syntax — HTML-looking tags inside a JavaScript/TypeScript file — is called **JSX**. It's not real HTML; it's a shorthand that gets converted into regular JavaScript function calls under the hood. That's why JSX uses `className` instead of `class` — `class` is a reserved word in JavaScript, so React had to use a different name.

### Next.js — the framework around React

React on its own doesn't know how to turn URLs into pages, optimize images, or talk to a database. [Next.js](https://nextjs.org) is a framework built on top of React that adds all of that. The specific flavor we used is the **App Router**, where **folders inside `src/app/` literally become URLs**. We only have one page (the homepage), so there's just one folder (`src/app/`) with a `page.tsx` in it — but `src/app/api/chat/` is a second "route": instead of a page, it's a backend endpoint (more on that below).

A key Next.js concept you'll see everywhere in this codebase: **Server Components vs. Client Components**.

- By default, every component in the App Router is a **Server Component** — it runs only on the server, renders to plain HTML, and never ships its own JavaScript to the browser. Fast, but it can't use things like `onClick` or "remember" state.
- Any component that needs interactivity — state, click handlers, animations, scroll listeners — has to opt in by putting `"use client"` as the very first line of the file. That's why almost every file in `src/components/` starts with `"use client"`: they all need to *do* something in the browser, not just display static text.

### TypeScript — JavaScript with safety rails

[TypeScript](https://www.typescriptlang.org) is JavaScript with an added **type system**. You can say "this function takes a string and returns a number," and your editor (and the build process) will flag it immediately if you ever pass the wrong kind of value — before you even run the code. Throughout this project you'll see things like:

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
```

This says: "a `ChatMessage` is an object with a `role` that's *only* allowed to be the text `"user"` or `"assistant"` (nothing else), and a `content` that must be a string." If you ever typed `role: "bot"` by mistake, TypeScript would refuse to compile.

### Tailwind CSS — styling without separate CSS files

Traditionally you'd write CSS like this in a separate file:

```css
.hero-title { font-size: 3rem; font-weight: 600; color: white; }
```

...and then reference `class="hero-title"` in your HTML. [Tailwind CSS](https://tailwindcss.com) flips this around: it gives you small, pre-made utility classes you compose directly where you use them:

```tsx
<h1 className="text-5xl font-semibold text-white">
```

`text-5xl` = a specific large font size, `font-semibold` = a specific font weight, `text-white` = white text. No separate file to keep in sync, and a consistent design system out of the box. We're using **Tailwind v4**, which lets you define your *own* custom design tokens (colors, fonts, animations) directly inside a CSS file using an `@theme` block — that's what [globals.css](src/app/globals.css) does (covered in Part 3).

### Framer Motion — animation

[Framer Motion](https://www.framer.com/motion/) is a React library for animation. Instead of writing imperative "now move this 20px and fade it in over 0.4 seconds" code by hand, you describe animations declaratively:

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

This says "start invisible, animate to fully visible" — Framer Motion figures out the rest, including smoothly interrupting/reversing if state changes mid-animation.

### API routes, environment variables, and streaming — how the AI chat works safely

The Digital Twin chat needed a way to talk to an AI model without ever exposing your private API key to anyone visiting the site. Three concepts make that possible:

- **API routes**: a Next.js route can be a page *or* a plain backend endpoint that returns data instead of HTML. Ours lives at `src/app/api/chat/route.ts` and is reachable at `/api/chat`. This code runs **only on the server** — it's never sent to the browser.
- **Environment variables** (`.env`): your `OPENROUTER_API_KEY` lives in a file that's never sent to the browser and is excluded from version control (`.gitignore`). Only server-side code (like our API route) can read it via `process.env.OPENROUTER_API_KEY`.
- **Streaming (Server-Sent Events)**: normally an HTTP response arrives all at once, after the server has fully finished. Streaming sends the response in small pieces *as they're generated* — that's why the chat's reply appears to "type itself" word by word instead of popping in all at once after a long pause. OpenRouter (and OpenAI, which it's compatible with) streams responses as a sequence of text lines like `data: {"choices":[{"delta":{"content":"Hello"}}]}` — our frontend reads these one at a time and appends each piece of text as it arrives.

### OpenRouter — one API, many AI models

[OpenRouter](https://openrouter.ai) is a service that sits in front of many different AI providers and exposes them all through one consistent API. We're using it with the model `openai/gpt-oss-120b:free` — a free-tier open-weight model — so the Digital Twin doesn't require a paid OpenAI account.

### Quick reference table

| Technology | What it is | Why we used it here |
|---|---|---|
| Next.js 16 (App Router) | React framework: routing, server rendering, backend routes | One project, one `npm run dev`, for both the pages and the chat backend |
| React 19 | UI-as-components library | Everything else is built on top of it |
| TypeScript | JavaScript + types | Catches mistakes before you open the browser |
| Tailwind CSS v4 | Utility-first styling | Fast styling + a small custom design system in CSS |
| Framer Motion | Animation library | Scroll reveals, the timeline progress bar, the typing-dots indicator |
| lucide-react | Icon library | Every small icon (mail, send, github outline, etc.) |
| OpenRouter | Multi-model AI API gateway | One key, one format, access to a free model for the chat |

---

## Part 2 — High-Level Walkthrough

### The folder structure

```
Site/
├─ src/
│  ├─ app/                     Next.js "App Router" — folders here become routes
│  │  ├─ layout.tsx             Wraps every page: loads fonts, sets up <html>/<body>
│  │  ├─ page.tsx                The homepage itself — just composes the sections below
│  │  ├─ globals.css             Design tokens (colors/fonts) + global styles
│  │  ├─ icon.svg                 Favicon (the "LD" monogram in the browser tab)
│  │  └─ api/
│  │     └─ chat/route.ts        Backend endpoint for the Digital Twin chat
│  ├─ components/                One file per visual section, plus shared helpers
│  │  ├─ Nav.tsx                  Sticky top navigation bar
│  │  ├─ Hero.tsx                 Big intro section with name + rotating tagline
│  │  ├─ About.tsx                "Precision wasn't optional" narrative section
│  │  ├─ Journey.tsx              Career timeline with the scroll-driven progress line
│  │  ├─ Skills.tsx               Skill groups + scrolling ticker
│  │  ├─ DigitalTwin.tsx          The AI chat widget
│  │  ├─ Portfolio.tsx            "Coming soon" case-study placeholders
│  │  ├─ Contact.tsx              Contact links + footer
│  │  ├─ Reveal.tsx                Shared "fade up when scrolled into view" wrapper
│  │  ├─ SectionHeading.tsx        Shared "01 — About" style heading block
│  │  └─ icons.tsx                 Hand-drawn GitHub/LinkedIn logo SVGs
│  └─ data/
│     └─ profile.ts               ALL editable content lives here (see below)
├─ public/                       Static files served as-is (currently unused)
├─ .env                          Your secret OPENROUTER_API_KEY (not committed to git)
├─ package.json                   Dependency list + npm scripts (dev/build/start/lint)
└─ tailwind/tsconfig/eslint config files
```

### The single most important file: `profile.ts`

Every piece of personal content — your name, bio, career timeline, skills, certifications, contact links — lives in [src/data/profile.ts](src/data/profile.ts) as plain JavaScript objects and arrays, **not** scattered across component files. Components import from it; nobody hardcodes "GroupBWT" or "TestRail" inline. This matters for two reasons:

1. You can update your résumé content by editing one file, without touching any component.
2. The Digital Twin's AI knowledge is generated *from this exact same file* (see `buildContext()` in the API route) — so the chatbot and the visible page can never drift out of sync.

### What happens when someone loads the homepage

1. A browser requests `http://localhost:3000`.
2. Next.js runs `layout.tsx` and `page.tsx` **on the server**, rendering every section component down to plain HTML.
3. That HTML — plus a relatively small bundle of JavaScript for just the *interactive* parts (anything marked `"use client"`) — is sent to the browser.
4. The browser paints the HTML immediately, so the page feels fast even before any JavaScript has finished downloading.
5. Once the JavaScript arrives, React "hydrates" the page — this is the moment `useState`, `useEffect`, click handlers, and Framer Motion animations all become live.
6. As the user scrolls, two independent systems react to it:
   - `Nav.tsx` uses a browser API called `IntersectionObserver` to detect which section is currently in view, and highlights the matching nav link.
   - `Reveal.tsx` (used by almost every section) uses Framer Motion's `whileInView` to fade/slide content in the first time it scrolls into view.

### What happens when someone sends a chat message

This is the more interesting flow, so it's worth tracing end-to-end:

1. The user types a question (or clicks a suggestion chip) in `DigitalTwin.tsx`.
2. The component immediately adds the user's message to its local `messages` state, plus an *empty* placeholder for the assistant's reply, and sets `loading = true` (this is what makes the typing-dots indicator appear).
3. It calls `fetch("/api/chat", { method: "POST", body: JSON.stringify({ messages }) })`. Note this hits **our own server**, never OpenRouter directly — the browser never sees the API key.
4. On the server, `route.ts`:
   - Checks a simple rate limit (max 20 requests/minute).
   - Reads `OPENROUTER_API_KEY` from the environment.
   - Builds a "system prompt" — instructions plus all your career facts pulled live from `profile.ts`.
   - Forwards everything to OpenRouter's API with `stream: true`.
5. OpenRouter starts streaming the answer back the moment the model begins generating it — it doesn't wait for the full answer to finish.
6. Our route handler doesn't wait either: it pipes OpenRouter's response stream straight through to the browser, chunk by chunk, as it arrives.
7. Back in the browser, `DigitalTwin.tsx` reads the stream piece by piece, decodes the text format (Server-Sent Events), pulls out just the new text, and appends it onto the last message in state. This is exactly what makes the reply appear to type itself in real time.
8. When the stream ends, `loading` flips back to `false` and the input box re-enables.

---

## Part 3 — Detailed Code Review

This section goes through the actual files, with real excerpts, explaining the interesting parts.

### `src/data/profile.ts` — the single source of truth

```ts
export const profile = {
  name: "Lina Dagaieva",
  role: "QA Engineer",
  location: "Kyiv, Ukraine",
  email: "lina.dagaieva@gmail.com",
  github: "https://github.com/LinaDagaieva",
  linkedin: "https://www.linkedin.com/in/lina-dagaieva-54b1a5219/",
};

export type Track = "education" | "training" | "work";

export interface JourneyEntry {
  track: Track;
  org: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  bullets?: string[];
  description?: string;
}

export const journey: JourneyEntry[] = [
  {
    track: "work",
    org: "GroupBWT",
    role: "QA Engineer",
    period: "Aug 2021 — Present",
    current: true,
    description: "Five years and counting of owning quality end-to-end…",
  },
  // ...more entries
];
```

A few TypeScript ideas worth calling out:

- `type Track = "education" | "training" | "work"` is a **union type** — `track` is allowed to be *exactly one of those three strings*, nothing else. This is how `Journey.tsx` can safely look up styling per track without worrying about typos.
- The `?` after `location?`, `current?`, `bullets?`, `description?` means those fields are **optional** — some journey entries have a `description`, others have `bullets` instead, and that's fine.
- `journey: JourneyEntry[]` means "an array where every item must match the `JourneyEntry` shape." If you added an entry with a typo'd field name, TypeScript would catch it immediately.

### `src/app/globals.css` — the design system

Tailwind v4 lets you define custom design tokens directly in CSS:

```css
:root {
  --color-bg: #07080a;
  --color-accent: #c6ff4d;
  --color-accent-2: #7c6cff;
}

@theme inline {
  --color-bg: var(--color-bg);
  --color-accent: var(--color-accent);
  --color-accent-2: var(--color-accent-2);
  --font-display: var(--font-space-grotesk), "Space Grotesk", sans-serif;
}
```

Defining `--color-accent` inside `@theme` is what makes Tailwind generate matching utility classes automatically — `bg-accent`, `text-accent`, `border-accent` all become available everywhere in the project, all pointing at that one hex value. Change it once here, and the lime-green accent updates site-wide.

The file also defines a few custom utilities with `@utility`, which is Tailwind v4's way of adding your own reusable classes alongside the built-in ones:

```css
@utility glass {
  background: rgba(17, 20, 26, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

This is what gives the navbar its frosted-glass look — `className="glass"` anywhere in the project applies this exact blur effect.

### `src/app/layout.tsx` — the page shell

```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
```

`next/font/google` downloads and self-hosts Google Fonts at build time (instead of the browser fetching them from Google at runtime), which is both faster and more private. `children` is a special React prop — whatever page is currently being rendered (in our case, always `page.tsx`) gets inserted exactly where `{children}` appears.

### `src/app/page.tsx` — composing the page

```tsx
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <DigitalTwin />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
```

This file deliberately contains almost no logic — its only job is to decide *which sections exist and in what order*. The `<>...</>` is a **Fragment**: a way to group two elements (`Nav` and `main`) without adding an extra, meaningless `<div>` wrapper to the HTML.

### `src/components/Reveal.tsx` and `SectionHeading.tsx` — small, reusable building blocks

```tsx
"use client";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

This is the animation behind *every* fade-in on the site. `initial` is the starting state (invisible, shifted down 24px), `whileInView` is the end state (fully visible, in place) — Framer Motion automatically detects, via the browser's `IntersectionObserver`, the moment this element scrolls into the viewport and animates between the two. `viewport={{ once: true }}` means it only plays once, not every time you scroll past it.

Wrapping this once and reusing it everywhere (`<Reveal delay={0.1}>...</Reveal>`) means every section animates consistently without copy-pasting animation code seven times.

`SectionHeading.tsx` is the same idea applied to the "01 — About" / title / description block that appears at the top of every section — one component, reused with different text props, instead of duplicating that markup.

### `src/components/Nav.tsx` — state, effects, and scroll-spy

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
```

This introduces React's two most important hooks:

- **`useState`** gives a component memory. `const [scrolled, setScrolled] = useState(false)` creates a variable `scrolled` (starting as `false`) and a function `setScrolled` to update it. Calling `setScrolled(true)` tells React "re-render this component, `scrolled` is now `true`."
- **`useEffect`** runs side effects — code that reaches *outside* React, like listening for browser events. The function passed in runs once after the component first appears (because the second argument is an empty array `[]`, meaning "no dependencies, run only once"). The function it *returns* (`return () => window.removeEventListener(...)`) is cleanup code that runs if the component is ever removed from the page — without it, you'd leak an event listener every time this component mounted.

The active nav-link highlighting uses a second `useEffect` with the browser's `IntersectionObserver` API — it watches all six section elements (`#about`, `#journey`, etc.) and fires a callback whenever one scrolls into the middle of the screen, updating `active` to that section's id.

The sliding highlight pill behind the active link uses a neat Framer Motion trick:

```tsx
{active === link.id && (
  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-surface-2" />
)}
```

`layoutId="nav-pill"` tells Framer Motion "this element, wherever it shows up next, is the *same* element as the last one with this id" — so when `active` changes and the pill jumps to a different link, Framer Motion automatically animates it smoothly sliding over, instead of teleporting.

The mobile menu (hamburger icon) follows the same `useState` pattern (`open`/`setOpen`) plus `AnimatePresence`, which lets Framer Motion play an *exit* animation when something is removed from the page (normally React just deletes things instantly).

> **A bug we caught here:** the first version of the mobile dropdown menu used a translucent `glass` background, and the Hero text behind it bled through, making the menu hard to read. The fix was switching to a near-opaque background (`bg-bg/98 backdrop-blur-xl`) — caught by actually opening the mobile menu in a screenshot test, not by reading the code.

### `src/components/Hero.tsx` — rotating text with `AnimatePresence`

```tsx
const [index, setIndex] = useState(0);

useEffect(() => {
  const id = setInterval(() => setIndex((i) => (i + 1) % taglines.length), 3200);
  return () => clearInterval(id);
}, []);

<AnimatePresence mode="wait">
  <motion.p
    key={index}
    initial={{ y: 24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -24, opacity: 0 }}
  >
    {taglines[index]}
  </motion.p>
</AnimatePresence>
```

`setInterval` ticks every 3.2 seconds, cycling `index` through the `taglines` array (`% taglines.length` wraps it back to 0 after the last one — the **modulo** operator). The important detail is the `key={index}` prop: React uses `key` to decide whether something is the *same* element being updated, or a *brand-new* element. By changing the `key` every time the tagline changes, we force React to treat each new tagline as a new element — which is what lets `AnimatePresence` play the old one sliding out and the new one sliding in, rather than the text just snapping to new content.

### `src/components/Journey.tsx` — a scroll-linked progress bar

This is the most visually complex piece of pure CSS/animation logic on the site — the glowing line down the timeline that fills in as you scroll:

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start 15%", "end 85%"],
});
const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

<motion.div style={{ height: lineHeight }} className="absolute ... bg-gradient-to-b from-accent ..." />
```

- **`useRef`** gives you a direct handle on a real DOM element (here, the `<div>` wrapping the whole timeline) without that element being part of React's normal re-render cycle.
- **`useScroll`** continuously reports a number between 0 and 1 representing how far the user has scrolled through that element (`offset` tunes exactly when it should start/finish counting).
- **`useTransform`** maps that 0–1 number onto a different range — here, `"0%"` to `"100%"` — so the colored line's `height` is *directly wired* to scroll position. No manual `scroll` event listener, no manual math; Framer Motion handles it efficiently.

The track type badges (Education / Training Project / Full-time) are driven by a small lookup table keyed by the `Track` union type defined in `profile.ts`:

```ts
const trackMeta: Record<Track, { label: string; icon: typeof Briefcase; dot: string; badge: string }> = {
  education: { label: "Education", icon: GraduationCap, dot: "bg-accent-2", badge: "..." },
  training: { label: "Training Project", icon: FlaskConical, dot: "bg-ink-faint", badge: "..." },
  work: { label: "Full-time", icon: Briefcase, dot: "bg-accent", badge: "..." },
};
```

`Record<Track, ...>` is a TypeScript utility type meaning "an object that must have exactly one entry for every possible value of `Track`." If a fourth track type were ever added to `profile.ts` without updating this table, TypeScript would fail to compile until you fixed it — a nice safety net tying the data model to the UI.

### `src/components/DigitalTwin.tsx` — the chat widget

The component's state is four simple variables:

```tsx
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

`useState<ChatMessage[]>([])` is a **generic** — it tells TypeScript exactly what type of thing this state holds (an array of `ChatMessage` objects), even though it starts out empty.

The interesting part is reading the streamed response manually:

```tsx
const reader = res.body.getReader();
const decoder = new TextDecoder();
let buffer = "";
let assistantText = "";

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split("\n");
  buffer = lines.pop() ?? "";

  for (const line of lines) {
    if (!line.trim().startsWith("data:")) continue;
    const payload = line.trim().slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    const json = JSON.parse(payload);
    const delta = json.choices?.[0]?.delta?.content;
    if (delta) {
      assistantText += delta;
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: assistantText };
        return copy;
      });
    }
  }
}
```

Walking through this for a beginner:

- `res.body.getReader()` gives you a `reader` you can pull raw bytes from, a little at a time, instead of waiting for the whole response.
- `TextDecoder` turns those raw bytes into text. The `{ stream: true }` option tells it "more bytes are coming, don't assume this chunk ends on a clean character boundary."
- Network chunks don't reliably line up with one event per chunk — a single chunk might contain half a line, or three full lines. The `buffer` variable holds onto any leftover partial line until the next chunk completes it (`buffer = lines.pop() ?? ""` keeps the last, possibly-incomplete line for next time, while `lines` now only contains *complete* lines).
- Each complete line that starts with `data:` is one Server-Sent Event. We `JSON.parse` it and pull out `choices[0].delta.content` — the small new piece of text in this chunk — using `?.`, the **optional chaining** operator, which safely returns `undefined` instead of crashing if any part of that path doesn't exist (the model also sends some chunks with no `content`, e.g. internal "reasoning" chunks, which this naturally skips).
- `setMessages((m) => { ...; return copy; })` — passing a *function* to a state setter (instead of a plain value) is the safe way to update state based on its previous value, guaranteeing you're always building on the latest version even if multiple updates happen in quick succession (which they do here — once per streamed chunk).

### `src/app/api/chat/route.ts` — the server-side proxy

This file never runs in the browser — only on the server — which is exactly why it's safe to put the real API key here:

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  return Response.json({ error: "Server is missing OPENROUTER_API_KEY." }, { status: 500 });
}
```

The rate limiter is deliberately simple:

```ts
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
let requestTimestamps: number[] = [];

function isRateLimited() {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (requestTimestamps.length >= RATE_LIMIT) return true;
  requestTimestamps.push(now);
  return false;
}
```

Every time a request comes in, this throws away any timestamps older than 60 seconds, then checks whether 20 or more requests are still "recent." If so, it rejects the request with an HTTP 429 ("Too Many Requests"). This protects the free OpenRouter quota from being drained by accidental loops or abuse. (See improvement #4 below for this approach's real limitation.)

The system prompt is built fresh on every request, directly from `profile.ts`:

```ts
function buildContext() {
  const journeyText = journey.map((entry) => {
    const lines = [`- ${entry.org} — ${entry.role} (${entry.period})`];
    if (entry.description) lines.push(`  ${entry.description}`);
    if (entry.bullets) lines.push(...entry.bullets.map((b) => `  • ${b}`));
    return lines.join("\n");
  }).join("\n");
  // ...skills, certifications, stats assembled the same way
}
```

This is template-literal string-building: `${...}` substitutes a JavaScript expression directly into a string. `entry.bullets.map((b) => \`  • ${b}\`)` turns an array of strings into an array of bullet-pointed lines, and `...` (the **spread operator**) unpacks that array directly into `lines.push(...)` as individual arguments rather than pushing one nested array.

Finally, the actual call to OpenRouter, and piping the streamed response straight back to the browser:

```ts
const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "HTTP-Referer": origin,
    "X-Title": "Lina Dagaieva - Digital Twin",
  },
  body: JSON.stringify({
    model: MODEL,
    stream: true,
    messages: [{ role: "system", content: buildSystemPrompt() }, ...trimmed],
  }),
});

return new Response(upstream.body, {
  headers: { "Content-Type": "text/event-stream; charset=utf-8" },
});
```

`upstream.body` is itself a stream — we don't read it and re-send it ourselves; we just hand it directly to `new Response(...)` as the body of *our* response, so bytes flow straight from OpenRouter to the browser through our server with minimal delay.

> **A real bug we hit and fixed here:** the very first version had `"X-Title": "Lina Dagaieva — Digital Twin"` with an em dash (—). HTTP header values are only allowed to contain plain ASCII/Latin-1 characters, and Node's `fetch` throws a `TypeError` the moment it encounters that character while building the request — so *every single chat request silently failed* with a generic "Could not reach OpenRouter" error. The fix was switching to a plain hyphen (`-`). This is a good example of why testing the actual running feature (not just reading the code) matters — this bug was invisible until we made a real request and read the server's error log.

---

## Part 4 — Self-Review: 5 Ways This Code Could Be Improved

Being honest about what's *not* ideal here, even though everything works correctly today:

1. **The repeated "pulsing status dot" markup should be one component.** The little animated dot (a ping animation behind a solid dot) appears nearly identically in `Hero.tsx` ("Open to new QA opportunities"), `Journey.tsx` (the "Current" badge), and `DigitalTwin.tsx` (the "AI · trained on real career data" status). Right now it's copy-pasted three times. Extracting a small `<PulseDot />` component would mean a future style tweak only needs to happen once.

2. **`DigitalTwin.tsx` mixes UI and networking logic.** The component currently handles rendering *and* the raw `fetch`/stream-reading/SSE-parsing logic in one function. Moving that networking logic into a custom hook (e.g. `useChatStream()`) would make the component just describe what to render, and would make the trickiest, most bug-prone part of this feature (the SSE parsing loop) independently testable without needing to render any UI at all.

3. **There are zero automated tests.** Everything was verified manually — by running the dev server, scripting a real browser with Playwright, and reading server logs — and then those verification scripts were deleted once the feature worked. That's fine for a one-time build, but it means there's nothing to catch a regression if `profile.ts` or the API route changes later. At minimum, a unit test for the SSE-parsing logic (feed it sample chunks, assert the right text comes out) and one for the rate limiter would catch the most likely future breakages cheaply.

4. **The rate limiter won't survive real deployment.** `requestTimestamps` is a plain array living in server memory. It resets to empty every time the dev server restarts, and if this were ever deployed somewhere with multiple server instances (which is common on serverless platforms), each instance would have its *own* counter — so the real limit could be 20 × (number of instances), not 20. Fine for local personal use; would need a shared store like Redis/Upstash before wider production deployment.

5. **Accessibility hasn't had a dedicated pass.** Specifically: the chat message list isn't wrapped in an `aria-live` region, so a screen reader won't announce new AI replies as they stream in; and the rotating hero tagline and the skills marquee never check the `prefers-reduced-motion` media setting, so users who've asked their OS to reduce motion still get the full animation. Neither is hard to fix, but neither has been addressed yet.
