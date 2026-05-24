import ProfilePage from "../components/ProfilePage";

export const metadata = { title: "Ramu — Noobsbot" };

const profile = {
  name: "Ramu",
  role: "Co-founder & Full-stack Developer",
  tagline: "I turn ideas into interfaces and interfaces into products.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  about: [
    `I'm a full-stack developer based in <span style="color:#e2e8f0;font-weight:500">Kathmandu, Nepal</span>, obsessed with building things people actually enjoy using. I co-founded <a href="/" style="color:#e2e8f0;font-weight:500;text-decoration:none">Noobsbot</a> with Sandesh and Nishan, where I handle the product layer — from the React frontend to the APIs that power it.`,
    `I care deeply about the details: smooth interactions, fast load times, and interfaces that feel obvious the first time you use them. I've shipped products for clients across e-commerce, fintech, and SaaS, and I bring that same standard to everything we build at Noobsbot.`,
    `Outside of work I'm learning Rust, contributing to open source, and trying to keep up with the JavaScript ecosystem — a full-time job in itself.`,
  ],
  experience: [
    {
      period: "2024 — Present",
      title: "Co-founder & Full-stack Developer",
      company: "Noobsbot",
      companyUrl: "/",
      description: "Building the product and user-facing side of Noobsbot. Owns the frontend architecture, designs the API contracts, and works closely with Sandesh on the infrastructure layer to ship features fast without breaking things.",
      skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
      period: "2022 — 2024",
      title: "Frontend Engineer",
      company: "Leapfrog Technology",
      companyUrl: null,
      description: "Built and maintained large-scale React applications for US-based clients. Led the migration of a legacy jQuery codebase to a modern React + TypeScript stack, reducing bundle size by 40% and improving Core Web Vitals scores significantly.",
      skills: ["React", "TypeScript", "GraphQL", "Tailwind CSS", "Jest"],
    },
    {
      period: "2021 — 2022",
      title: "Junior Developer",
      company: "Freelance",
      companyUrl: null,
      description: "Took on web projects ranging from landing pages to full e-commerce builds. Learned to scope projects accurately, communicate with non-technical clients, and ship on time with minimal fuss.",
      skills: ["React", "Node.js", "MongoDB", "Express", "CSS"],
    },
  ],
  projects: [
    {
      title: "Noobsbot Dashboard",
      description: "The internal control panel for managing deployments, monitoring server health, and viewing logs across the Noobsbot infrastructure. Built with Next.js and a WebSocket-powered live log stream.",
      skills: ["Next.js", "TypeScript", "WebSockets", "Tailwind CSS"],
      url: "/",
    },
    {
      title: "Bazaar",
      description: "A lightweight e-commerce starter kit for small Nepali businesses — product listings, cart, checkout, and a simple admin panel. Used by 12 shops within three months of launch.",
      skills: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      url: null,
    },
    {
      title: "useForm",
      description: "A zero-dependency React hook library for form state management. Handles validation, async submission, field-level errors, and dirty state tracking in under 3kb gzipped.",
      skills: ["TypeScript", "React", "Vitest", "Rollup"],
      url: null,
    },
  ],
};

export default function RamuPage() {
  return <ProfilePage profile={profile} />;
}
