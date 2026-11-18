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
