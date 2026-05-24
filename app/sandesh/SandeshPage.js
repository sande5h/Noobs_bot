import ProfilePage from "../components/ProfilePage";

const profile = {
  name: "Sandesh",
  role: "Co-founder & Infrastructure Lead",
  tagline: "I build the systems that keep everything running.",
  github: "https://github.com/sande5h",
  linkedin: "https://linkedin.com",
  about: [
    `I'm an infrastructure engineer based in <span style="color:#e2e8f0;font-weight:500">Kathmandu, Nepal</span>, focused on building reliable systems from the ground up. I co-founded <a href="/" style="color:#e2e8f0;font-weight:500;text-decoration:none;border-bottom:1px solid transparent">Noobsbot</a> with my friends Ramu and Nishan, where I own everything below the application layer — servers, networks, pipelines, and the on-call rotation.`,
    `I like working at the seam between hardware and software: understanding what the kernel is actually doing, writing the automation that eliminates toil, and building systems that recover gracefully when things go wrong. My tool of choice is usually a terminal, a good config file, and patience.`,
    `When I'm not staring at logs I'm adding drives to my home lab, reading RFCs I'll never implement, or convincing my co-founders that yes, we do need monitoring.`,
  ],
  experience: [
    {
      period: "2024 — Present",
      title: "Co-founder & Infrastructure Lead",
      company: "Noobsbot",
      companyUrl: "/",
      description: "Built and maintain the entire server infrastructure behind Noobsbot — from bare-metal provisioning and OS configuration to reverse proxies, CI/CD pipelines, and automated deployments. Designed the network topology and keeps the lights on.",
      skills: ["Linux", "Docker", "Nginx", "Node.js", "Python", "Bash"],
    },
    {
      period: "2022 — 2024",
      title: "Backend Developer",
      company: "Freelance",
      companyUrl: null,
      description: "Designed and shipped REST APIs and backend services for several small businesses. Focused on clean data modelling, reliable deploys, and minimal operational overhead for clients who just want things to work.",
      skills: ["Node.js", "PostgreSQL", "Express", "Redis", "Docker"],
    },
    {
      period: "2021 — 2022",
      title: "IT Intern",
      company: "TechAxis Nepal",
      companyUrl: null,
      description: "Assisted with network configuration, server administration, and internal tooling. First serious exposure to production Linux environments and the discipline of not breaking things on a Friday.",
      skills: ["Linux", "Networking", "Python", "VMware"],
    },
  ],
  projects: [
    {
      title: "Noobsbot Platform",
      description: "The hosting infrastructure behind noobsbot.com. A self-managed stack running on bare-metal servers with automated provisioning, rolling deployments, and a private container registry.",
      skills: ["Linux", "Docker", "Nginx", "Node.js"],
      url: "/",
    },
    {
      title: "Home Lab v2",
      description: "A personal cluster of repurposed servers for running self-hosted services — Gitea, Nextcloud, monitoring, and experiments. Proxmox for virtualisation, Tailscale for remote access.",
      skills: ["Proxmox", "Tailscale", "Docker", "Networking"],
      url: null,
    },
    {
      title: "deploy-cli",
      description: "A small Python CLI that SSH-es into a remote server, pulls the latest image, runs migrations, and swaps the container — zero-downtime for tiny projects that don't need Kubernetes.",
      skills: ["Python", "SSH", "Bash", "Docker"],
      url: null,
    },
  ],
};

export default function SandeshPage() {
  return <ProfilePage profile={profile} />;
}
