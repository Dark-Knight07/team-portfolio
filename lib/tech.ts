import { team } from "./team";

export type Tech = { name: string; note: string };
export type TechCategory = { id: string; label: string; blurb: string; techs: Tech[] };

export const techCategories: TechCategory[] = [
  {
    id: "full-stack",
    label: "Full Stack Development",
    blurb: "Production web applications, APIs and the data layer behind them.",
    techs: [
      { name: "React.js", note: "Component-based UI library for interactive interfaces." },
      { name: "Next.js", note: "React framework for server rendering, routing and fast production sites." },
      { name: "TypeScript", note: "Typed JavaScript that catches errors before they ship." },
      { name: "Node.js", note: "JavaScript runtime for backend services and tooling." },
      { name: "Tailwind CSS", note: "Utility-first CSS for consistent, responsive design." },
      { name: "FastAPI", note: "High-performance Python framework for typed APIs." },
      { name: "REST APIs", note: "Resource-oriented HTTP interfaces between systems." },
      { name: "GraphQL", note: "Query language that lets clients request exactly the data they need." },
      { name: "PostgreSQL", note: "Reliable relational database." },
      { name: "MongoDB", note: "Document database for flexible data models." },
    ],
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    blurb: "AI-assisted engineering, agent workflows and automation of repetitive operations.",
    techs: [
      { name: "Python", note: "Scripting and integration language for automation and AI." },
      { name: "PowerShell", note: "Automation for Windows and Microsoft environments." },
      { name: "Claude Code", note: "AI coding agent for software engineering workflows." },
      { name: "MCP Servers", note: "Model Context Protocol connectors that give AI tools access to your systems." },
      { name: "Multi-Agent Systems", note: "Several specialised AI agents coordinating on a task." },
      { name: "Workflow Automation", note: "Turning repeated manual processes into reliable automated flows." },
      { name: "ServiceNow", note: "IT service management platform, integrated through its APIs." },
      { name: "Ollama", note: "Run open models locally." },
      { name: "OpenRouter", note: "One API for many AI models." },
      { name: "API Integration", note: "Connecting systems so data and actions flow between them." },
    ],
  },
  {
    id: "cloud",
    label: "Cloud Engineering",
    blurb: "Cloud platforms, Microsoft 365 workloads and the services around them.",
    techs: [
      { name: "AWS", note: "Amazon Web Services cloud platform." },
      { name: "Microsoft Azure", note: "Microsoft's cloud platform." },
      { name: "EC2", note: "Virtual servers on AWS." },
      { name: "S3", note: "Object storage on AWS." },
      { name: "Lambda", note: "Serverless functions on AWS." },
      { name: "CloudFront", note: "AWS content delivery network." },
      { name: "AWS IAM", note: "Identity and permissions for AWS resources." },
      { name: "Microsoft 365", note: "Email, collaboration and productivity services." },
      { name: "Exchange Online", note: "Cloud email, mail flow and distribution groups." },
      { name: "SharePoint Online", note: "Team sites and document management." },
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    blurb: "Protecting identities, access and enterprise systems.",
    techs: [
      { name: "Zero Trust Security", note: "Never trust by default: verify every identity, device and request." },
      { name: "Least Privilege Access", note: "Give people only the access they need." },
      { name: "Vulnerability Management", note: "Finding, prioritising and fixing weaknesses." },
      { name: "Security Monitoring", note: "Watching systems and sign-ins for suspicious activity." },
      { name: "Threat Detection", note: "Spotting attacks early." },
      { name: "Security Auditing", note: "Reviewing configurations and access against policy." },
      { name: "Privileged Account Security", note: "Protecting the most powerful accounts." },
    ],
  },
  {
    id: "iam",
    label: "Identity & Access Management",
    blurb: "Who can access what, proven and governed.",
    techs: [
      { name: "Microsoft Entra ID", note: "Microsoft's cloud identity and access platform (formerly Azure AD)." },
      { name: "Conditional Access", note: "Policies that decide when and how access is allowed." },
      { name: "MFA", note: "Multi-factor authentication." },
      { name: "SSO", note: "Single sign-on across applications." },
      { name: "RBAC", note: "Role-based access control." },
      { name: "SAML 2.0", note: "Federated sign-in standard for enterprise applications." },
      { name: "OAuth 2.0", note: "Delegated authorisation standard." },
      { name: "OpenID Connect", note: "Identity layer on top of OAuth 2.0." },
      { name: "SCIM", note: "Standard for automatic user provisioning." },
      { name: "CyberArk", note: "Privileged access management platform." },
      { name: "Microsoft Entra PIM", note: "Just-in-time privileged role activation." },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    blurb: "Pipelines, containers and reliable delivery.",
    techs: [
      { name: "CI/CD", note: "Automated build, test and deploy pipelines." },
      { name: "GitHub Actions", note: "Pipelines defined alongside the code." },
      { name: "Azure DevOps", note: "Boards, repos and pipelines from Microsoft." },
      { name: "Docker", note: "Containers that run the same everywhere." },
      { name: "Kubernetes", note: "Container orchestration at scale." },
      { name: "Vercel", note: "Deployment platform for web applications." },
      { name: "Railway", note: "Platform for deploying backend services." },
      { name: "Microservices", note: "Systems built from small, independently deployable services." },
    ],
  },
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#.]/g, "");

/** Team members whose verified skill lists include this technology. */
export function membersFor(techName: string): string[] {
  const t = norm(techName);
  return team
    .filter((m) => m.skills.some((g) => g.items.some((i) => norm(i) === t || (t.length > 4 && norm(i).includes(t)))))
    .map((m) => m.name);
}
