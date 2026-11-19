/**
 * Project case studies. Every statement here is drawn from the project's own
 * public README / live demo (github.com/Dark-Knight07). Nothing is a client
 * engagement: each entry is labelled as a demonstration or personal project.
 */
export type ProjectKind = "Demonstration project" | "Personal project";

export type Project = {
  slug: string;
  title: string;
  category: "Cloud" | "AI" | "DevOps" | "Web";
  kind: ProjectKind;
  year: string;
  summary: string; // card text
  overview: string;
  problem: string;
  solution: string;
  architecture: { layer: string; detail: string }[];
  technologies: string[];
  highlights: string[];
  contributions: string[];
  team: string[]; // slugs from lib/team.ts
  screenshots: { src: string; alt: string }[];
  demo?: string;
  repo: string;
  status: string; // short status shown on cards
  hue: number;
  featured?: boolean;
};

const gh = (r: string) => `https://github.com/Dark-Knight07/${r}`;

export const projectFilters = ["All", "Cloud", "AI", "DevOps", "Web"] as const;

export const projects: Project[] = [
  {
    slug: "it-support-agents",
    title: "IT Support Agent Army",
    category: "AI",
    kind: "Demonstration project",
    year: "2026",
    featured: true,
    summary: "A simulated multi-agent IT support platform: tickets are triaged by a roster of AI agents, with human approval for risky actions.",
    overview:
      "IT Support Agent Army is a browser-based simulation of an autonomous multi-agent IT support platform. Submit an incident and watch a team of agents investigate it, produce a root cause with a confidence score, and recommend a fix, with an approval gate for anything high-risk.",
    problem:
      "Multi-agent IT support is hard to explain without a working system: orchestration, structured agent output, human-in-the-loop approval, knowledge retrieval and audit trails all have to fit together. Building the full stack needs LLM keys, a database and infrastructure just to show the idea.",
    solution:
      "A deterministic simulation engine runs entirely in the browser. It classifies a ticket into one of eight incident scenarios and plays back scripted agent findings with evidence, confidence scores and a risk-classified remediation. High-risk actions always route through an approvals queue before a ticket resolves, and nothing executes automatically.",
    architecture: [
      { layer: "UI", detail: "Next.js App Router pages: dashboard, tickets, agents, knowledge base, email security, approvals, audit log." },
      { layer: "State", detail: "A single React Context store holds tickets, approvals and the audit log (no database, no persistence between reloads)." },
      { layer: "Simulation engine", detail: "lib/simulate.ts classifies tickets and scripts agent output. It is the one file to swap if a real LLM is connected later." },
      { layer: "Knowledge base", detail: "Eight searchable SOP and troubleshooting articles bundled statically, standing in for the retrieval source." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "React Context"],
    highlights: [
      "11-agent roster with roles and permission classes",
      "8 preset incident scenarios plus free-text tickets",
      "In-browser SPF / DKIM / DMARC email header verdicts",
      "Approval gate and full audit log",
    ],
    contributions: ["Designed and built by MD Owais.", "Art and design by MD Owais."],
    team: ["md-owais"],
    screenshots: [{ src: "/projects/it-support-agents.jpg", alt: "IT Support Agent Army command center dashboard" }],
    demo: "https://it-support-agent-indol.vercel.app",
    repo: gh("ITSupportAgents"),
    status: "Live demo",
    hue: 200,
  },
  {
    slug: "ci-cd-command-center",
    title: "CI/CD Command Center",
    category: "DevOps",
    kind: "Demonstration project",
    year: "2026",
    summary: "A scroll-driven 3D showcase of a delivery pipeline: Code, Build, Test, Security Scan, Deploy, Cloud and Monitor.",
    overview:
      "CI/CD Command Center presents how a delivery pipeline works as a cinematic, scroll-driven 3D experience. A glowing pipeline spine runs through seven stages, and a Run Deployment replay streams a live log.",
    problem:
      "Pipelines are usually explained with static diagrams, which hide the flow between stages. The goal was a more memorable way to show how code reaches production and where security scanning, deployment and monitoring fit.",
    solution:
      "A persistent 3D canvas whose camera is scrubbed by scroll position walks through each stage, while a DOM layer carries the same content for accessibility. Stage panels describe the tools involved, and the deployment replay animates a release end to end.",
    architecture: [
      { layer: "3D scene", detail: "React Three Fiber canvas with lighting, post-processing, a camera rig and one scene file per pipeline stage." },
      { layer: "Scroll control", detail: "GSAP ScrollTrigger drives camera progress and reveal animations." },
      { layer: "HUD and content", detail: "A DOM layer provides the HUD, stage panels and a duplicate keyboard-accessible list of every module." },
      { layer: "State", detail: "A Zustand store tracks the active stage, open panel and the deployment run." },
    ],
    technologies: ["Next.js", "TypeScript", "React Three Fiber", "GSAP", "Framer Motion", "Zustand", "Tailwind CSS"],
    highlights: [
      "Seven-stage pipeline with a Run Deployment replay",
      "Reduced-motion support and lower quality on weaker devices",
      "Keyboard-accessible duplicate of the 3D content",
    ],
    contributions: ["Designed and built by MD Owais."],
    team: ["md-owais"],
    screenshots: [{ src: "/projects/ci-cd-command-center.jpg", alt: "CI/CD Command Center 3D pipeline hero" }],
    demo: "https://ci-cd-command-center.vercel.app",
    repo: gh("CI-CD-Command-Center"),
    status: "Live demo",
    hue: 160,
  },
  {
    slug: "tierdrift",
    title: "TierDrift",
    category: "Cloud",
    kind: "Demonstration project",
    year: "2026",
    summary: "An interactive 3D lab that morphs a cloud architecture from a single server to a resilient N-tier system.",
    overview:
      "TierDrift is an interactive cloud architecture simulator. One continuous 3D scene morphs between 1-tier, 2-tier, 3-tier and N-tier designs, so the evolution of an architecture is something you watch happen.",
    problem:
      "Architecture evolution is normally taught as four separate diagrams, which hides why each step exists. Learners need to see load, scaling and failure change the shape of a system.",
    solution:
      "Users switch architectures, ramp traffic, and run a scripted explanation of each design's limit. In N-tier mode they can kill a web or app server and watch the load balancer reroute traffic, which is the resilience payoff the simulator builds toward.",
    architecture: [
      { layer: "Node registry", detail: "Every node of every architecture is always mounted in the scene graph." },
      { layer: "Layout engine", detail: "A pure function computes target position, scale, visibility and health for each node from the current state." },
      { layer: "Rendering", detail: "Node meshes ease toward their targets each frame, so changing architecture animates the same objects instead of swapping scenes." },
      { layer: "Traffic system", detail: "Instanced particles route through the active path and adapt to scaling and failures." },
    ],
    technologies: ["Next.js", "TypeScript", "React Three Fiber", "GSAP", "Framer Motion", "Zustand", "Tailwind CSS"],
    highlights: [
      "Morphing 1, 2, 3 and N-tier architectures",
      "Traffic ramp, scaling and failure simulation",
      "AWS service label toggle",
    ],
    contributions: ["Designed and built by MD Owais."],
    team: ["md-owais"],
    screenshots: [
      { src: "/projects/tierdrift-1.jpg", alt: "TierDrift 1-tier monolith view" },
      { src: "/projects/tierdrift-2.jpg", alt: "TierDrift N-tier view with load balancer, web, app, cache and queue nodes" },
    ],
    demo: "https://tier-drift.vercel.app",
    repo: gh("TierDrift"),
    status: "Live demo",
    hue: 175,
  },
  {
    slug: "cloud-playground",
    title: "Cloud Playground",
    category: "Cloud",
    kind: "Demonstration project",
    year: "2026",
    summary: "A simulated AWS learning platform: build VPCs and instances visually, with every mistake explained.",
    overview:
      "Cloud Playground lets learners design and simulate AWS architectures without an AWS account. Resources are simulated, and the platform validates the design and explains problems in plain language.",
    problem:
      "Learning AWS usually means reading long documentation or risking real cloud spend. Beginners need a safe place to build, break and understand infrastructure.",
    solution:
      "A visual canvas where AWS services are placed and connected, with live architecture validation (for example, instances must belong to a subnet and an internet gateway must attach to a VPC) and a deployment simulation. The live site presents 11 services and 24 challenges.",
    architecture: [
      { layer: "Canvas", detail: "A node-based visual builder for placing and connecting simulated AWS resources." },
      { layer: "Validation", detail: "Rule checks run as the design changes and surface plain-English explanations." },
      { layer: "Learning content", detail: "Each service carries what it does, why it is used, best practices and common mistakes." },
      { layer: "Simulation", detail: "A step-by-step deployment replay shows resources being created." },
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Flow", "Framer Motion"],
    highlights: [
      "Visual drag-and-drop architecture builder",
      "Live validation of networking and security rules",
      "No AWS account or credit card required",
    ],
    contributions: ["Built by MD Owais."],
    team: ["md-owais"],
    screenshots: [{ src: "/projects/cloud-playground.jpg", alt: "Cloud Playground landing page with simulated VPC preview" }],
    demo: "https://cloud-playground-beta.vercel.app",
    repo: gh("Cloud-Playground"),
    status: "Live demo",
    hue: 35,
  },
  {
    slug: "ai-job-outreach-agent",
    title: "AI Job Outreach Agent",
    category: "AI",
    kind: "Personal project",
    year: "2026",
    summary: "A Python automation agent, controlled from Telegram, that finds roles, drafts tailored outreach with an LLM and tracks every application.",
    overview:
      "A personal automation agent that searches live job listings, writes a personalised email for each company with Groq's Llama 3.3 70B model, sends it with a resume attached, follows up after three days and records everything in an Excel tracker. Everything is triggered by a Telegram command.",
    problem:
      "Job outreach is repetitive: searching several boards, finding contacts, writing individual emails and remembering to follow up.",
    solution:
      "A Python agent that chains job search, contact lookup, AI-written email, delivery and tracking behind a single /apply command, and never contacts the same company twice.",
    architecture: [
      { layer: "Control", detail: "A Telegram bot is the interface: send /apply and the pipeline runs." },
      { layer: "Search", detail: "RapidAPI JSearch aggregates listings from multiple job boards." },
      { layer: "Writing", detail: "Groq (Llama 3.3 70B) drafts a different email per company." },
      { layer: "Delivery and tracking", detail: "Gmail SMTP sends with the resume attached; an Excel workbook tracks applications, platforms and daily stats." },
      { layer: "Scheduling", detail: "A GitHub Actions workflow runs the agent daily." },
    ],
    technologies: ["Python", "Telegram Bot API", "Groq", "Gmail SMTP", "RapidAPI JSearch", "GitHub Actions"],
    highlights: [
      "Automatic follow-up after three days",
      "De-duplication so companies are not contacted twice",
      "Excel tracker with applications, platform summary and daily stats",
    ],
    contributions: ["Built by MD Owais as a personal automation project."],
    team: ["md-owais"],
    screenshots: [],
    repo: gh("ai-job-agent"),
    status: "Source on GitHub",
    hue: 75,
  },
  {
    slug: "careerforge-ai",
    title: "CareerForge AI",
    category: "AI",
    kind: "Personal project",
    year: "2026",
    summary: "An AI career assistant with explainable resume matching, tailored drafts and a review-first workflow.",
    overview:
      "CareerForge AI discovers jobs across several free sources, scores each against a real resume with a deterministic, explainable match score, and on request generates a tailored resume, cover letter and draft email. Nothing is applied for or sent without review.",
    problem:
      "AI job tools often fabricate experience or auto-submit applications, and depend on a single vendor.",
    solution:
      "A layered Python application behind a provider abstraction, so no single API is a hard dependency. Tailoring never invents experience, applications are tracked locally with duplicate detection, and follow-ups are suggested but never sent.",
    architecture: [
      { layer: "Providers", detail: "One class per external API: job boards, AI models and email drafting." },
      { layer: "Models", detail: "Normalised data shapes that everything else depends on." },
      { layer: "Services", detail: "Domain logic: matching, tailoring, tracking and analytics." },
      { layer: "Agents", detail: "Thin orchestration wrappers with a uniform success, error and timing envelope." },
      { layer: "Interfaces", detail: "A SQLite repository, a Streamlit dashboard, a Telegram bot and headless scripts for scheduled runs." },
    ],
    technologies: ["Python", "SQLite", "Streamlit", "Telegram Bot API", "GitHub Actions"],
    highlights: [
      "Searches Adzuna, Jooble, RemoteOK and We Work Remotely",
      "Deterministic, explainable match scoring",
      "Review-first: never applies or sends on its own",
    ],
    contributions: ["Built by MD Owais."],
    team: ["md-owais"],
    screenshots: [],
    repo: gh("Careerforge-AI"),
    status: "In development",
    hue: 90,
  },
  {
    slug: "gamehub-arcade",
    title: "GameHub Arcade",
    category: "Web",
    kind: "Personal project",
    year: "2026",
    summary: "A browser gaming platform with 14 original HTML5 games, offline editions and saved progress.",
    overview:
      "Owais GameHub is a gaming platform where people browse, discover and play games in the browser. It ships 14 original HTML5 games, a full game player and offline editions packaged as single self-contained HTML files.",
    problem:
      "Browser game sites are often cluttered, depend on third-party content, and break on touch devices.",
    solution:
      "A fast, responsive library with search, filters stored in the URL, favourites, recently played and saved progress, all running client-side. Every game is original, has touch controls and can be downloaded for offline play.",
    architecture: [
      { layer: "App", detail: "Next.js App Router with a library, search with live suggestions and a full game player." },
      { layer: "Games", detail: "14 original HTML5 and JavaScript games, each packaged into a single self-contained file of about 20 KB for offline use." },
      { layer: "Player data", detail: "Favourites, history, personal bests and progress are stored in the browser with localStorage (no backend or accounts)." },
      { layer: "Build", detail: "A script packages the games into downloadable files before every build." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5"],
    highlights: [
      "14 original playable games across 11 categories",
      "Keyboard shortcuts and touch controls",
      "Shareable filtered views via URL",
    ],
    contributions: ["Built by MD Owais."],
    team: ["md-owais"],
    screenshots: [{ src: "/projects/gamehub-arcade.jpg", alt: "Owais GameHub home page with featured games" }],
    demo: "https://gamehub-arcade-rho.vercel.app",
    repo: gh("gamehub-arcade"),
    status: "Live demo",
    hue: 280,
  },
  {
    slug: "infraverse",
    title: "InfraVerse",
    category: "Web",
    kind: "Personal project",
    year: "2026",
    summary: "A static HTML portfolio page exploring infrastructure, cloud and operations themes.",
    overview:
      "InfraVerse is a personal portfolio project built as a static HTML page that showcases web design and development work, skills, projects and contact information.",
    problem: "A simple, dependency-free way to present a personal portfolio.",
    solution: "A single static HTML and CSS page that opens directly in a browser with no build step.",
    architecture: [
      { layer: "Page", detail: "One static HTML file with its own layout and styling." },
    ],
    technologies: ["HTML", "CSS"],
    highlights: ["No build step or dependencies"],
    contributions: ["Built by MD Owais."],
    team: ["md-owais"],
    screenshots: [],
    repo: gh("InfraVerse"),
    status: "Source on GitHub",
    hue: 220,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
