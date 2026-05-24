import ProfilePage from "../components/ProfilePage";

export const metadata = { title: "Nishan — Noobsbot" };

const profile = {
  name: "Nishan",
  role: "Co-founder & Hardware Engineer",
  tagline: "I build the hardware that the software runs on.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  about: [
    `I'm a hardware engineer and embedded systems developer based in <span style="color:#e2e8f0;font-weight:500">Kathmandu, Nepal</span>. I co-founded <a href="/" style="color:#e2e8f0;font-weight:500;text-decoration:none">Noobsbot</a> with Sandesh and Ramu, and I'm the one who makes sure the physical layer doesn't catch fire — designing custom PCBs, wiring up servers, and building the electronics behind our projects.`,
    `I've been taking things apart since I was eight and putting them back together since I was nine. That curiosity drove me into electrical engineering, embedded C, and eventually the intersection of hardware and software that makes modern systems tick. I believe the best software engineers understand the hardware beneath them.`,
    `When I'm not soldering I'm reading datasheets, contributing to the KiCad plugin ecosystem, or finding new ways to cram more drives into a 2U chassis.`,
  ],
  experience: [
    {
      period: "2024 — Present",
      title: "Co-founder & Hardware Engineer",
      company: "Noobsbot",
      companyUrl: "/",
      description: "Responsible for all physical hardware at Noobsbot — server procurement, rack design, custom UPS integration, and the sensor boards that feed our monitoring stack. Also wrote the firmware for our custom out-of-band management device.",
      skills: ["PCB Design", "Embedded C", "KiCad", "Raspberry Pi", "Python"],
    },
    {
      period: "2022 — 2024",
      title: "Embedded Systems Engineer",
      company: "Pashupati Electronics",
      companyUrl: null,
      description: "Designed and shipped embedded firmware for industrial IoT devices deployed in manufacturing plants across Nepal. Reduced power consumption by 35% through careful peripheral management and sleep-state optimisation.",
      skills: ["C/C++", "FreeRTOS", "STM32", "MQTT", "PCB Design"],
    },
    {
      period: "2020 — 2022",
      title: "Hardware Intern",
      company: "Robotics Association of Nepal",
      companyUrl: null,
      description: "Assisted in designing and building competition robots. Learned PCB layout, motor control, and the hard lessons of debugging hardware under time pressure at 2 AM before a competition.",
      skills: ["Arduino", "CAD", "Motor Control", "Python", "Soldering"],
    },
  ],
  projects: [
    {
      title: "OOB Management Board",
      description: "A custom out-of-band management board for Noobsbot's servers — allows remote power cycling, BIOS access, and hardware monitoring without relying on the main OS. Built around an RP2040 with a secure web interface.",
      skills: ["RP2040", "Embedded C", "KiCad", "Python", "MicroPython"],
      url: "/",
    },
    {
      title: "AirSense",
      description: "An open-source air quality monitor with a custom PCB, local data logging, and a small e-ink display. Measures PM2.5, CO2, temperature, and humidity. Deployed in 6 schools around Kathmandu.",
      skills: ["KiCad", "C++", "ESP32", "MQTT", "InfluxDB"],
      url: null,
    },
    {
      title: "PowerWatch",
      description: "A Raspberry Pi-based power monitoring tool that tracks load shedding schedules and sends alerts. Built because load shedding kept killing our servers at the worst possible moment.",
      skills: ["Python", "Raspberry Pi", "SQLite", "Telegram API"],
      url: null,
    },
  ],
};

export default function NishanPage() {
  return <ProfilePage profile={profile} />;
}
