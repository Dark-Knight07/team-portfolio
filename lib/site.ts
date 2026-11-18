/**
 * Single source of truth for brand + contact details.
 * Everything here is intentionally configurable — fill in the empty fields
 * and the site updates everywhere (nav, hero, footer, CTA, SEO).
 */
export const site = {
  name: "TetraNex",
  legalName: "TetraNex Technologies",
  tagline: "Four Minds. One Secure Future.",
  positioning: ["Development", "Cloud", "Automation", "Cybersecurity", "Deployment"],
  tag: "TECHNOLOGIES", // small badge next to the logo in the nav
  established: "", // e.g. "2024" — leave empty to hide
  url: "https://example.com", // TODO: production URL (used for metadata)
  description:
    "TetraNex Technologies: four minds, one secure future. A remote-first team delivering development, cloud, automation, cybersecurity and deployment.",
  email: "", // TODO: contact email — when empty, contact buttons jump to the contact section
  phone: "",
  location: "Remote",
  workingModel: "Fully remote",
  socials: [] as { label: string; href: string }[], // e.g. { label: "LinkedIn", href: "https://…" }
};

export const contactHref = site.email ? `mailto:${site.email}` : "/#contact";

export const nav = [
  { label: "Work", href: "/#portfolio" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Blog", href: "/#blog" },
  { label: "FAQ", href: "/#faq" },
];
