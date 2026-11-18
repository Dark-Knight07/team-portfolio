/**
 * Verified team data supplied by the company. Do not add or edit claims
 * without confirmation. `photo` is optional: when empty, an initials avatar
 * is shown. Drop an image in /public/team and set e.g. photo: "/team/kazi.jpg".
 */
export type TeamMember = {
  slug: string;
  name: string;
  designation: string;
  title: string; // short card title
  tagline: string; // specialization label
  location: string;
  intro: string;
  skills: { group: string; items: string[] }[];
  contributions: string[];
  photo?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
};

export const teamIntro =
  "We are a remote-first technology team bringing together expertise in Cloud Engineering, Full-Stack Development, Artificial Intelligence, Automation, and Cybersecurity. We focus on building scalable applications, intelligent automation solutions, secure infrastructure, and modern digital experiences.";

export const team: TeamMember[] = [
  {
    slug: "kazi-musharaff",
    photo: "/team/musharaff.jpg",
    phone: "9765490536",
    name: "Kazi Musharaff",
    designation: "Full Stack Developer | AI Engineer | Software Engineer",
    title: "Full Stack Developer",
    tagline: "Build & Develop",
    location: "Remote",
    intro:
      "A Full Stack and AI Engineer with 3+ years of enterprise engineering experience, specializing in building production-ready web applications, backend services, APIs, and AI-powered solutions. Experienced in modern JavaScript frameworks, cloud infrastructure, microservices, and AI-assisted software engineering.",
    skills: [
      { group: "Frontend", items: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Zustand"] },
      { group: "Backend", items: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs", "GraphQL", "tRPC"] },
      { group: "AI & Development", items: ["Claude Code", "Cursor", "GitHub Copilot", "Aider", "Ollama", "OpenRouter", "MCP Servers", "Multi-Agent Systems"] },
      { group: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
      { group: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "Azure DevOps", "Vercel", "Railway"] },
      { group: "Engineering", items: ["Microservices", "CI/CD", "WebSockets", "Server-Sent Events", "Software Architecture", "API Integration"] },
    ],
    contributions: [
      "Development of full-stack web applications and enterprise software.",
      "Building AI-powered developer tools and multi-agent systems.",
      "Designing backend services, REST APIs, and microservices.",
      "Implementing cloud deployments and CI/CD pipelines.",
      "Developing automation workflows and AI-integrated applications.",
    ],
  },
  {
    slug: "shaikh-sufiyan",
    photo: "/team/sufiyan.jpg",
    phone: "7875638594",
    name: "Shaikh Sufiyan",
    designation: "AI & Automation Engineer | Infrastructure Automation Engineer",
    title: "AI & Automation Engineer",
    tagline: "Automate & Integrate",
    location: "Remote",
    intro:
      "An IT Infrastructure and Automation professional with 5+ years of experience in enterprise infrastructure and network operations. Specializes in developing automation solutions using Python and PowerShell, integrating enterprise systems, and streamlining operational processes through intelligent workflows.",
    skills: [
      { group: "Programming & Scripting", items: ["Python", "PowerShell"] },
      { group: "AI & Automation", items: ["Infrastructure Automation", "Workflow Automation", "Process Automation"] },
      { group: "ITSM & Integration", items: ["ServiceNow", "REST APIs", "API Integration"] },
      { group: "Operating Systems", items: ["Linux", "Windows"] },
      { group: "Networking", items: ["Cisco Networking Fundamentals", "Network Monitoring"] },
      { group: "Infrastructure", items: ["IT Infrastructure Operations", "Incident Management", "Troubleshooting", "Operational Support"] },
      { group: "Enterprise Operations", items: ["Service Request Management", "Incident Handling", "Escalation Management"] },
    ],
    contributions: [
      "Automated virtual machine disk expansion processes using Python and ServiceNow.",
      "Developed network interface-down alert automation.",
      "Implemented network chassis-down alert handling and validation.",
      "Automated daily infrastructure checklist activities.",
      "Developed Python and PowerShell automation workflows for enterprise operations.",
    ],
  },
  {
    slug: "md-asadullah",
    photo: "/team/asadullah.jpg",
    phone: "9689852373",
    name: "MD Asadullah",
    designation: "Cybersecurity Engineer | Identity & Access Management Specialist",
    title: "Cybersecurity Engineer",
    tagline: "Secure & Protect",
    location: "Remote",
    intro:
      "A Cybersecurity Engineer focused on strengthening enterprise security, protecting digital identities, and managing secure access to organizational resources. Specializing in Identity and Access Management (IAM), Privileged Access Management (PAM), identity governance, and modern enterprise security solutions.",
    skills: [
      { group: "Identity & Access Management", items: ["IAM", "Microsoft Entra ID", "Azure Active Directory", "Active Directory"] },
      { group: "Privileged Access Management", items: ["CyberArk", "Microsoft Entra PIM", "PAM"] },
      { group: "Identity Security", items: ["Conditional Access", "MFA", "SSO"] },
      { group: "Access Management", items: ["RBAC", "User Provisioning", "Deprovisioning", "Access Reviews"] },
      { group: "Identity Governance", items: ["IGA", "Access Certification", "Joiner-Mover-Leaver"] },
      { group: "Authentication Protocols", items: ["SAML 2.0", "OAuth 2.0", "OpenID Connect", "SCIM"] },
      { group: "Security Operations", items: ["Vulnerability Management", "Security Monitoring", "Threat Detection", "Security Auditing"] },
      { group: "Enterprise Security", items: ["Zero Trust Security", "Least Privilege Access", "Identity Lifecycle Management", "Privileged Account Security"] },
    ],
    contributions: [
      "Enterprise identity and access management.",
      "Privileged account security and access governance.",
      "Implementation and management of authentication policies.",
      "Identity lifecycle and access provisioning.",
      "Enterprise security monitoring and access reviews.",
      "Strengthening organizational security through IAM best practices.",
    ],
  },
  {
    slug: "md-owais",
    photo: "/team/owais.jpg",
    phone: "7420008856",
    linkedin: "https://www.linkedin.com/in/mohammad-owais-50a203397/",
    github: "https://github.com/Dark-Knight07",
    name: "MD Owais",
    designation: "Cloud Support Engineer | Cloud & Identity Management Specialist",
    title: "Cloud Support Engineer",
    tagline: "Cloud & Identity",
    location: "Remote",
    intro:
      "A Cloud Support and IT Infrastructure professional specializing in Microsoft 365 administration, enterprise identity management, and cloud technologies. Experienced in managing enterprise environments, implementing access controls, troubleshooting cloud services, and supporting modern IT infrastructure.",
    skills: [
      { group: "Microsoft Cloud", items: ["Microsoft 365", "Microsoft Azure", "Microsoft Entra ID"] },
      { group: "Identity & Access", items: ["User Lifecycle Management", "RBAC", "MFA", "Conditional Access", "Identity Administration", "Access Management"] },
      { group: "Microsoft 365", items: ["Exchange Online", "SharePoint Online", "OneDrive", "Microsoft Teams", "Distribution Groups", "Mail Flow"] },
      { group: "AWS Cloud", items: ["AWS IAM", "EC2", "S3", "Lambda", "ECS", "CloudFront", "AWS Glue"] },
      { group: "Google Workspace", items: ["Admin Console", "User Management", "Groups", "Gmail Administration", "Security Policies"] },
      { group: "Endpoint & Devices", items: ["Microsoft Intune", "Hexnode MDM", "Device Administration"] },
      { group: "Automation & Scripting", items: ["PowerShell", "Python", "Bash", "Administrative Automation"] },
      { group: "IT Operations", items: ["Active Directory", "IT Infrastructure Support", "Incident Management", "Troubleshooting", "User Access Administration"] },
      { group: "AI & Integrations", items: ["Claude", "ChatGPT", "MCP Integrations", "API Integrations", "AI-assisted Workflows"] },
      { group: "Developer Tools", items: ["GitHub", "VS Code", "Cursor", "Cloudflare", "Vercel"] },
    ],
    contributions: [
      "Microsoft 365 and Google Workspace administration.",
      "Enterprise identity and access management.",
      "AWS cloud administration and IAM management.",
      "Exchange Online, SharePoint Online, and OneDrive administration.",
      "Enterprise AI integrations and MCP connector configuration.",
      "IT infrastructure management and automation.",
      "Endpoint management and user access administration.",
    ],
  },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
