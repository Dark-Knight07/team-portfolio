# TetraNex Technologies — Company Website

> **Four Minds. One Secure Future.**
> Development · Cloud · Automation · Cybersecurity · Deployment

Marketing website for TetraNex Technologies, a remote-first engineering team.
Built with **Next.js (App Router)**, **React**, **TypeScript** and **Tailwind CSS**.

## Quick start

```bash
git clone https://github.com/TetraNex/<repo-name>.git
cd <repo-name>
npm install
cp .env.example .env.local     # then edit values
npm run dev -- -p 3100         # http://localhost:3100
```

## Scripts

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the development server                   |
| `npm run lint`      | ESLint                                         |
| `npm run typecheck` | TypeScript type check                          |
| `npm run build`     | Production build                               |
| `npm run check`     | Lint + typecheck + build (run before every PR) |

## Project structure

```
.
├── app/                 Next.js routes, layout, global styles
│   └── blog/            Blog index and article pages
├── components/          React UI components (one file per section)
├── lib/                 Content and configuration (edit these, not components)
│   ├── site.ts          Brand name, tagline, contact details
│   ├── team.ts          Team members
│   └── content.ts       Services, projects, blog posts, FAQ
├── public/              Static assets (team photos in public/team)
├── docs/                Team documentation (start with GITHUB_WORKFLOW.md)
├── scripts/             Admin scripts (GitHub setup)
└── .github/             PR/issue templates, CODEOWNERS, Actions workflows
```

## Contributing

All work goes through Pull Requests into `develop`. Read
[`docs/GITHUB_WORKFLOW.md`](docs/GITHUB_WORKFLOW.md) and
[`CONTRIBUTING.md`](CONTRIBUTING.md) before your first change.

## License

Proprietary. See [`LICENSE`](LICENSE).

## Client experience features

- **Project inquiry, cost estimator and consultation booking** live in the "Start a project" section (`components/StartProject.tsx`). Deep links: `/#start`, `/#estimator`, `/#consultation`.
- **Forms are validated twice**: in the browser for instant feedback and again on the server in `app/api/inquiry/route.ts` (shared rules in `lib/validation.ts`). The route also has a honeypot field, a same-origin check, a request-size limit and a small rate limit.
- **Delivery is configured with server-only environment variables** (see `.env.example`): `INQUIRY_WEBHOOK_URL` (Slack, Discord, Make, Zapier) and/or `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` + `INQUIRY_FROM_EMAIL`. In local development with neither set, submissions are written to `.data/inquiries.jsonl` (git-ignored). In production with neither set the form responds with a clear "not available" message instead of silently dropping the lead.
- **Estimator numbers are placeholders.** Edit `lib/pricing.ts` (rates, effort weeks, add-ons) before relying on the output. It is always shown to visitors as an indicative range, never a quote.
- **Case studies** are generated from `lib/projects.ts` into `/work/[slug]`. Screenshots live in `public/projects/`.
- **Technology explorer** data is in `lib/tech.ts`; the "listed by" names come from the verified skill lists in `lib/team.ts`.

## Analytics

Google Analytics 4 is wired in but **off until `NEXT_PUBLIC_GA_ID` is set**. When set, a consent banner appears and GA loads only after a visitor clicks Accept (IP anonymisation on; footer "Cookie settings" reopens the choice). Tracked: page views per route, form submissions (`generate_lead`), estimator-to-inquiry, tab changes, CTA, phone and project demo/source clicks. Add `data-track="event_name"` to any element to track clicks on it. A plain-language privacy notice lives at `/privacy` (have it reviewed for your jurisdiction).
