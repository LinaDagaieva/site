# Lina Dagaieva — Personal Site

Personal portfolio/resume site for Lina Dagaieva, QA Engineer. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/data/profile.ts` — all editable content: bio, career timeline, skills, contact links. Update this file to change copy without touching components. The Digital Twin chatbot's knowledge is generated from this same file.
- `src/components/` — one component per section (Hero, About, Journey, Skills, Digital Twin, Portfolio, Contact) plus shared `Reveal`/`SectionHeading` helpers.
- `src/app/` — root layout, global styles, and the page composition.
- `src/app/api/chat/route.ts` — server-side proxy to OpenRouter for the "Digital Twin" chat widget. Requires `OPENROUTER_API_KEY` in `.env` (never exposed to the client). Uses `openai/gpt-oss-120b:free` and streams responses.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
