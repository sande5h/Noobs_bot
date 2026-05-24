import Image from 'next/image';
import Link from 'next/link';
import s from './project.module.css';

export const metadata = {
  title: 'Claude Usage Monitor — Projects · Noobsbot',
  description: 'A physical ESP32-C3 device that shows real-time Claude AI usage on an OLED display. Built by Sandesh, Ramu, and Nishan.',
};

const TEAM = [
  {
    name: 'Sandesh',
    role: 'Embedded Software',
    color: 'teal',
    contributions: [
      'Rust firmware for ESP32-C3',
      'SSD1306 OLED driver over I²C',
      'Piezo buzzer PWM control',
      'Python proxy server (PC side)',
      'Dual-limit usage polling logic',
      'Hardware bring-up & end-to-end testing',
    ],
    href: '/sandesh',
  },
  {
    name: 'Ramu',
    role: 'Hardware Architecture',
    color: 'gold',
    contributions: [
      'System-level hardware design',
      'Component selection (ESP32-C3, SSD1306, TP4056)',
      'Power path: LiPo → AMS1117-3.3V',
      'EasyEDA schematic authoring',
      'I²C & GPIO pinout planning',
    ],
    href: '/ramu',
  },
  {
    name: 'Nishan',
    role: 'PCB & Validation',
    color: 'muted',
    contributions: [
      'Physical component wiring & assembly',
      'PCB connection validation',
      'Hardware fault finding & fixes',
      'Enclosure fit & screw-mount check',
      'Final device sign-off',
    ],
    href: '/nishan',
  },
];

const STACK = [
  'ESP32-C3', 'Rust', 'Python', 'SSD1306 OLED',
  'I²C', 'LEDC PWM', 'TP4056', 'AMS1117-3.3V',
  'LiPo Battery', 'HTTP / LAN', 'EasyEDA',
];

const FEATURES = [
  { icon: '📊', title: 'Real-time Usage', desc: 'Polls Claude API every 20 seconds and updates the display live.' },
  { icon: '⏱️', title: 'Dual-limit Tracking', desc: 'Shows both 5-hour rolling usage and 7-day weekly percentage simultaneously.' },
  { icon: '🔊', title: 'Audio Alerts', desc: 'Piezo buzzer beeps for every 10% usage increment so you never miss a spike.' },
  { icon: '🔋', title: 'Battery Powered', desc: 'LiPo cell with TP4056 charging and AMS1117 regulation — fully portable.' },
  { icon: '📡', title: 'Offline Resilient', desc: 'Caches last known data and shows a "stale" indicator if the API is unreachable.' },
  { icon: '📦', title: 'Encased', desc: 'Ships in a clean white 3D-printed enclosure with corner screws and a friction-fit display cutout.' },
];

export default function ProjectsPage() {
  return (
    <div className={s.page}>

      <header className={s.header}>
        <Link href="/projects" className={s.backLink}>← Projects</Link>
        <p className={s.eyebrow}>// Team Project · 2026</p>
        <h1 className={s.heading}>Claude Usage <span className={s.accent}>Monitor</span></h1>
        <p className={s.sub}>
          A physical ESP32-C3 device that streams real-time Claude AI usage to an OLED display over your local network.
          Built end-to-end by a team of three — firmware, hardware, and validation.
        </p>
        <div className={s.actions}>
          <a
            href="https://github.com/sande5h/cluade_usage_desktop"
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnPrimary}`}
          >
            GitHub ↗
          </a>
          <a href="/projects/schematic.pdf" download className={`${s.btn} ${s.btnSecondary}`}>
            Schematic PDF ↓
          </a>
        </div>
      </header>

      {/* Device photo */}
      <div className={s.photoWrap}>
        <Image
          src="/projects/device.png"
          alt="Claude Usage Monitor device showing DAILY 29% and WEEKLY 5% on OLED"
          width={800}
          height={540}
          className={s.photo}
          priority
        />
        <p className={s.photoCaption}>The finished device — OLED showing daily &amp; weekly Claude usage with progress bars</p>
      </div>

      {/* Features */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Features</h2>
        <div className={s.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={s.featureCard}>
              <span className={s.featureIcon}>{f.icon}</span>
              <div>
                <div className={s.featureTitle}>{f.title}</div>
                <div className={s.featureDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Tech Stack</h2>
        <div className={s.tagList}>
          {STACK.map((t) => (
            <span key={t} className={s.tag}>{t}</span>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Team</h2>
        <div className={s.teamGrid}>
          {TEAM.map((m) => (
            <div key={m.name} className={`${s.memberCard} ${s[`member_${m.color}`]}`}>
              <div className={s.memberTop}>
                <Link href={m.href} className={s.memberName}>{m.name} ↗</Link>
                <span className={s.memberRole}>{m.role}</span>
              </div>
              <ul className={s.contributions}>
                {m.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Schematic */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Schematic</h2>
        <p className={s.schematicNote}>
          Designed in EasyEDA. Components: ESP32-C3 · SSD1306 OLED (I²C) · Passive Buzzer · TP4056 charger · AMS1117-3.3V LDO.
        </p>
        <div className={s.schematicWrap}>
          <Image
            src="/projects/schematic-1.png"
            alt="Hardware schematic — ESP32-C3, SSD1306 OLED, Buzzer, TP4056, AMS1117"
            width={1240}
            height={924}
            className={s.schematicImg}
          />
          <a href="/projects/schematic.pdf" download className={`${s.btn} ${s.btnSecondary} ${s.schematicDl}`}>
            Download Schematic PDF ↓
          </a>
        </div>
      </section>

    </div>
  );
}
