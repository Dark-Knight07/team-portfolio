import { team } from "./team";

/* ---------- Services (8 areas, same grid rhythm as the reference) ---------- */
export type Service = { id: string; title: string; items: string[]; hue: number; span: string; tall?: boolean };

export const services: Service[] = [
  { id: "cloud-engineering", title: "Cloud Engineering", items: ["AWS Cloud Services", "Cloud Architecture & Migration"], hue: 200, span: "md:col-span-7", tall: true },
  { id: "identity-access-management", title: "Identity & Access Management", items: ["Microsoft Entra ID", "Privileged Access Management"], hue: 265, span: "md:col-span-5", tall: true },
  { id: "microsoft-365-solutions", title: "Microsoft 365 Solutions", items: ["Exchange Online", "SharePoint Online & OneDrive"], hue: 215, span: "md:col-span-4" },
  { id: "ai-automation", title: "AI & Automation", items: ["AI Development & Integrations", "Workflow Automation"], hue: 75, span: "md:col-span-4" },
  { id: "web-development", title: "Web Development", items: ["Web Application Development"], hue: 160, span: "md:col-span-4" },
  { id: "devops-infrastructure", title: "DevOps & Infrastructure", items: ["CI/CD & Automation", "IT Infrastructure"], hue: 25, span: "md:col-span-4" },
  { id: "it-consulting", title: "IT Consulting", items: ["Technology Strategy & Advisory"], hue: 330, span: "md:col-span-4" },
  { id: "technical-support", title: "Technical Support", items: ["IT Infrastructure & Technical Support"], hue: 45, span: "md:col-span-4" },
];

/* ---------- Process ---------- */
export const process = [
  { n: "01", label: "Discover", short: "Understand goals, audit the environment, define scope.", caption: "We start by learning what you actually need.", hue: 200 },
  { n: "02", label: "Plan & Design", short: "Architecture, roadmap and sign-off before we build.", caption: "Structure first. A plan and design you sign off on.", hue: 265 },
  { n: "03", label: "Develop", short: "Iterative delivery with regular demos.", caption: "Iterative sprints, with a demo along the way.", hue: 75 },
  { n: "04", label: "Deliver", short: "Launch, monitor, hand over and keep improving.", caption: "Launch, monitor, and keep improving.", hue: 25 },
];

/* ---------- Stack marquee ---------- */
export const stack = [
  "Microsoft 365", "Entra ID", "Exchange Online", "SharePoint", "OneDrive", "AWS", "Azure",
  "Next.js", "React", "TypeScript", "Python", "PowerShell", "Docker", "Kubernetes",
];

/* ---------- Portfolio (sourced from public GitHub repositories) ---------- */
export type Project = {
  slug: string; title: string; category: string; year: string; description: string;
  metricLabel: string; metric: string; role: string; stack: string; image?: string; hue?: number; featured?: boolean; href?: string;
};
export const projectFilters = ["All", "Cloud", "AI", "DevOps", "Web"];
export const projects: Project[] = [
  {
    "slug": "it-support-agents",
    "title": "IT Support Agents",
    "category": "AI",
    "year": "2026",
    "description": "An autonomous multi-agent IT support platform simulation, where AI agents triage and work support requests.",
    "metricLabel": "Status",
    "metric": "Live demo",
    "role": "Design & development, MD Owais",
    "stack": "TypeScript · Multi-agent AI",
    "href": "https://it-support-agent-indol.vercel.app",
    "featured": true
  },
  {
    "slug": "ci-cd-command-center",
    "title": "CI/CD Command Center",
    "category": "DevOps",
    "year": "2026",
    "description": "An interactive 3D showcase of a full delivery pipeline: Code, Build, Test, Security Scan, Deploy, Cloud and Monitor.",
    "metricLabel": "Status",
    "metric": "Live demo",
    "role": "Design & development, MD Owais",
    "stack": "Next.js · React Three Fiber · GSAP",
    "href": "https://ci-cd-command-center.vercel.app"
  },
  {
    "slug": "tierdrift",
    "title": "TierDrift",
    "category": "Cloud",
    "year": "2026",
    "description": "An interactive 3D lab where you watch cloud architecture evolve, from a single fragile server to a fully resilient N-tier system, live in the browser.",
    "metricLabel": "Status",
    "metric": "Live demo",
    "role": "Design & development, MD Owais",
    "stack": "TypeScript · 3D · Cloud architecture",
    "href": "https://tier-drift.vercel.app"
  },
  {
    "slug": "cloud-playground",
    "title": "Cloud Playground",
    "category": "Cloud",
    "year": "2026",
    "description": "An interactive AWS learning platform where users visually build cloud infrastructure.",
    "metricLabel": "Status",
    "metric": "Live demo",
    "role": "Design & development, MD Owais",
    "stack": "HTML · AWS concepts",
    "href": "https://cloud-playground-beta.vercel.app"
  },
  {
    "slug": "ai-job-agent",
    "title": "AI Job Outreach Agent",
    "category": "AI",
    "year": "2026",
    "description": "An autonomous AI job-outreach agent that works through a Telegram bot, Groq AI and Gmail.",
    "metricLabel": "Status",
    "metric": "Source on GitHub",
    "role": "Design & development, MD Owais",
    "stack": "Python · Telegram Bot · Groq AI · Gmail",
    "href": "https://github.com/Dark-Knight07/ai-job-agent"
  },
  {
    "slug": "infraverse",
    "title": "InfraVerse",
    "category": "Cloud",
    "year": "2026",
    "description": "An interactive universe of infrastructure, cloud and operations.",
    "metricLabel": "Status",
    "metric": "Source on GitHub",
    "role": "Design & development, MD Owais",
    "stack": "HTML · Interactive visualisation",
    "href": "https://github.com/Dark-Knight07/InfraVerse"
  },
  {
    "slug": "careerforge-ai",
    "title": "CareerForge AI",
    "category": "AI",
    "year": "2026",
    "description": "An AI-powered job automation platform that streamlines job searching, application tracking and personalised career opportunities.",
    "metricLabel": "Status",
    "metric": "In development",
    "role": "Design & development, MD Owais",
    "stack": "Python · AI automation",
    "href": "https://github.com/Dark-Knight07/Careerforge-AI"
  },
  {
    "slug": "gamehub-arcade",
    "title": "GameHub Arcade",
    "category": "Web",
    "year": "2026",
    "description": "A browser gaming platform with 14 original HTML5 games you can play instantly or download for offline play.",
    "metricLabel": "Status",
    "metric": "Live demo",
    "role": "Design & development, MD Owais",
    "stack": "Next.js · TypeScript · Tailwind CSS",
    "href": "https://gamehub-arcade-rho.vercel.app"
  }
];

/* ---------- Blog ---------- */
export type Post = { slug: string; category: string; title: string; excerpt: string; read: string; date: string; hue: number; body: string[] };

export const posts: Post[] = [
  {
    slug: "zero-trust-with-microsoft-entra-conditional-access",
    category: "Identity",
    title: "Zero Trust in practice: a Conditional Access baseline for Microsoft Entra ID",
    excerpt: "Zero Trust is a design approach, not a product. Here is a pragmatic Conditional Access baseline that raises your identity posture without locking people out.",
    read: "6 min", date: "Nov 12, 2026", hue: 265,
    body: [
      "Most Microsoft 365 tenants already pay for the tools needed to move toward Zero Trust. The gap is usually policy design: Conditional Access exists, but it is inconsistent, over-scoped or left in report-only mode forever.",
      "Start with a small set of policies that cover the biggest risks. Require multi-factor authentication for all administrators, require MFA for all users, block legacy authentication, and require compliant or hybrid-joined devices for sensitive applications.",
      "Always run new policies in report-only mode first and review the sign-in logs. Exclude two break-glass accounts that are monitored and protected with strong, phishing-resistant credentials. Document why each exclusion exists.",
      "Treat Conditional Access as code: name policies consistently, version the intended configuration, and review it on a schedule. Identity is the new perimeter, and the perimeter needs an owner.",
    ],
  },
  {
    slug: "privileged-access-management-least-privilege-in-the-cloud",
    category: "Identity Security",
    title: "Privileged access management: making least privilege real in the cloud",
    excerpt: "Standing admin rights are the easiest path for an attacker. Just-in-time elevation, approvals and access reviews close that path.",
    read: "7 min", date: "Nov 5, 2026", hue: 290,
    body: [
      "Privileged accounts are the keys to the environment. If an attacker obtains one that is permanently active, the blast radius is as wide as the role allows.",
      "The principle is simple: nobody holds powerful roles all day. With Microsoft Entra Privileged Identity Management, roles become eligible rather than active. People activate them for a limited window, with justification, MFA and, for the most sensitive roles, approval.",
      "Pair eligibility with regular access reviews so stale assignments disappear. For credentials that cannot be removed, such as service and break-glass accounts, vault them in a privileged access management platform and rotate them automatically.",
      "Measure success by the number of permanent privileged assignments, which should trend toward zero, and by how quickly a leaver loses all access.",
    ],
  },
  {
    slug: "microsoft-365-administration-checklist-for-growing-teams",
    category: "Microsoft 365",
    title: "A practical Microsoft 365 administration checklist for growing teams",
    excerpt: "Exchange Online, SharePoint, OneDrive and Teams all drift as a company grows. A short, regular checklist keeps the tenant tidy and secure.",
    read: "5 min", date: "Oct 28, 2026", hue: 215,
    body: [
      "Microsoft 365 rarely breaks all at once. It drifts: shared mailboxes with no owner, SharePoint sites with open permissions, OneDrive data from people who left a year ago.",
      "Review a few things every month. Check mail flow rules and distribution groups in Exchange Online. Look at external sharing settings and site ownership in SharePoint. Confirm that OneDrive retention for departed users matches policy.",
      "Tie the checklist to the joiner-mover-leaver process. When access is granted and removed through one consistent route, most of the drift never starts.",
      "Finally, document the tenant. A one-page record of admin roles, licensing, key policies and who to call turns a stressful incident into a routine task.",
    ],
  },
  {
    slug: "aws-iam-patterns-that-scale",
    category: "AWS",
    title: "AWS IAM patterns that scale beyond the first account",
    excerpt: "Roles over users, permission boundaries, and short-lived credentials: the IAM habits that keep a growing AWS estate manageable.",
    read: "7 min", date: "Oct 20, 2026", hue: 25,
    body: [
      "IAM is the control plane for everything in AWS, and it is also where many accounts quietly accumulate risk. Long-lived access keys, wildcard policies and shared users are the usual suspects.",
      "Prefer roles to users. Federate human access through your identity provider so people sign in with their normal account and receive short-lived credentials. Give workloads their own roles, scoped to the resources they need.",
      "Use permission boundaries and service control policies to set outer limits, then keep individual policies narrow. Tools such as IAM Access Analyzer help find unused permissions and unintended external access.",
      "When the estate grows into multiple accounts, standardize the role names and trust relationships. Consistency makes both operations and audits faster.",
    ],
  },
  {
    slug: "ai-integrations-with-mcp-for-business-workflows",
    category: "AI",
    title: "AI integrations for business workflows: where MCP and agents fit",
    excerpt: "Models become useful when they can reach your systems. We look at connectors, guardrails and the tasks worth automating first.",
    read: "6 min", date: "Oct 14, 2026", hue: 75,
    body: [
      "A chat window on its own saves minutes. A model connected to the systems where work happens can save hours. That connection is what protocols such as the Model Context Protocol (MCP) standardize.",
      "Begin with narrow, well-understood tasks: summarizing tickets, drafting responses from a knowledge base, or pulling data from several tools into one view. Keep a person in the loop for actions that change data.",
      "Guardrails matter more than prompts. Give each connector the least privilege it needs, log what the agent does, and make it easy to review or roll back. Treat an AI integration like any other service account.",
      "Pick one workflow, measure time saved, and expand from there. Small, reliable automations beat ambitious ones that nobody trusts.",
    ],
  },
  {
    slug: "python-and-powershell-automation-for-infrastructure-teams",
    category: "Automation",
    title: "Python and PowerShell automation for infrastructure teams",
    excerpt: "Disk expansions, alert handling and daily checklists: repetitive operational work is the best place to start automating.",
    read: "5 min", date: "Oct 7, 2026", hue: 160,
    body: [
      "Every infrastructure team has a list of tasks that are boring, frequent and error-prone. Expanding a virtual machine disk, validating an alert, running the same daily health checks.",
      "These are ideal candidates for automation because the steps are known. Write them as scripts first, using Python for integrations and APIs and PowerShell for Windows and Microsoft environments.",
      "Connect the scripts to your service management tool so requests and approvals trigger them, and results are written back to the ticket. That closes the loop and creates an audit trail.",
      "Keep automation small, idempotent and logged. When something fails, the script should stop safely and tell a human exactly what happened.",
    ],
  },
  {
    slug: "ci-cd-and-devops-foundations-for-small-teams",
    category: "DevOps",
    title: "CI/CD and DevOps foundations for small teams",
    excerpt: "You do not need a platform team to ship reliably. A few conventions around pipelines, environments and rollbacks go a long way.",
    read: "6 min", date: "Sep 30, 2026", hue: 200,
    body: [
      "Reliable delivery is mostly boring habits. Every change goes through a pull request, every pull request runs automated checks, and every merge to the main branch can be deployed.",
      "Start with a pipeline that lints, tests and builds. Add deployment to a preview environment per branch so changes can be reviewed in a running app, not just in a diff.",
      "Make rollbacks cheap. Containerized builds and versioned artifacts let you redeploy the previous release in minutes. Keep secrets in a managed store rather than in the repository.",
      "As the team grows, add infrastructure as code so environments are reproducible, and basic monitoring so you learn about problems before customers do.",
    ],
  },
  {
    slug: "cloud-computing-choosing-the-right-migration-path",
    category: "Cloud Computing",
    title: "Cloud computing: choosing the right migration path",
    excerpt: "Rehost, replatform or rebuild? A simple way to decide how each workload should move to the cloud.",
    read: "5 min", date: "Sep 22, 2026", hue: 230,
    body: [
      "Not every workload deserves the same treatment. Moving everything as-is is quick but often keeps the old costs and limits. Rebuilding everything is slow and risky.",
      "Sort workloads into three groups. Rehost the stable ones that simply need new hosting. Replatform those that gain from managed databases or storage. Rebuild only the systems where cloud-native design brings clear value.",
      "Plan identity first. A clean directory, sensible roles and single sign-on make every later step safer and easier.",
      "Finally, agree success measures before the move: cost, performance, recovery time. They keep the project honest after launch.",
    ],
  },
];

/* ---------- FAQ ---------- */
export const faqs = [
  { q: "What do you build and support?", a: "We are a remote engineering team covering cloud engineering, identity and access management, Microsoft 365 administration, AI and automation, web application development, DevOps and infrastructure, IT consulting and technical support." },
  { q: "Who will I be working with?", a: `You work directly with the engineers who do the work. Our team includes ${team.map((m) => m.name).join(", ")}, covering development, automation, security and cloud administration.` },
  { q: "How does an engagement start?", a: "Reach out with a short description of what you need. We schedule a discovery conversation, then follow our four steps: Discover, Plan & Design, Develop and Deliver." },
  { q: "How do you deliver projects?", a: "Work is planned up front and delivered iteratively, with regular demos so you can see progress and give feedback. Launch includes monitoring and a clear handover." },
  { q: "Can you work with our existing Microsoft 365, Entra ID or AWS environment?", a: "Yes. Most of our work happens inside existing tenants and accounts. We start with an audit, agree what to change, and document everything we touch." },
  { q: "Where is the team based?", a: "We are fully remote, so we can collaborate across time zones and work with your tools and processes." },
];

/* ---------- Team-wide expertise (high-demand skills customers search for) ---------- */
export const expertise: { group: string; items: string[] }[] = [
  { group: "Cloud & Infrastructure", items: ["AWS", "Microsoft Azure", "Cloud Architecture", "Cloud Migration", "Docker", "Kubernetes", "Infrastructure as Code", "Serverless", "Linux & Windows Server"] },
  { group: "Identity & Security", items: ["Microsoft Entra ID", "IAM", "Privileged Access Management", "Conditional Access", "MFA & SSO", "Zero Trust", "RBAC", "Identity Governance", "SAML / OAuth 2.0 / OIDC"] },
  { group: "Microsoft 365", items: ["Exchange Online", "SharePoint Online", "OneDrive", "Microsoft Teams", "Microsoft Intune", "Tenant Administration", "Mail Flow & Migration", "Google Workspace"] },
  { group: "AI & Automation", items: ["AI Integrations", "Claude & ChatGPT", "MCP Integrations", "Multi-Agent Systems", "Workflow Automation", "Python", "PowerShell", "ServiceNow Automation"] },
  { group: "Web & Software", items: ["Next.js", "React", "TypeScript", "Node.js", "REST & GraphQL APIs", "FastAPI", "PostgreSQL", "MongoDB", "Tailwind CSS"] },
  { group: "DevOps & Operations", items: ["CI/CD Pipelines", "GitHub Actions", "Azure DevOps", "Monitoring & Alerting", "Incident Management", "IT Infrastructure Support", "Endpoint Management"] },
];
