import Link from 'next/link';
import Image from 'next/image';
import s from './projects.module.css';

export const metadata = {
  title: 'Projects · Noobsbot',
  description: 'Hardware and software projects built by the Noobsbot team.',
};

const PROJECTS = [
  {
    slug: 'claude-usage-monitor',
    title: 'Claude Usage Monitor',
    desc: 'An ESP32-C3 device that streams real-time Claude AI usage to an OLED display over your local network. Battery powered, buzzer alerts, fully encased.',
    image: '/projects/device.png',
    tags: ['ESP32-C3', 'Rust', 'Python', 'Hardware'],
    team: ['Sandesh', 'Ramu', 'Nishan'],
    year: '2026',
  },
];

export default function ProjectsPage() {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link href="/" className={s.backLink}>← Home</Link>
        <p className={s.eyebrow}>// Built by the team</p>
        <h1 className={s.heading}>Projects</h1>
        <p className={s.sub}>Hardware, firmware, and software projects we've built together.</p>
      </header>

      <div className={s.grid}>
        {PROJECTS.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className={s.card}>
            <div className={s.cardThumb}>
              <Image
                src={p.image}
                alt={p.title}
                width={600}
                height={400}
                className={s.cardImg}
              />
            </div>
            <div className={s.cardBody}>
              <div className={s.cardMeta}>
                <span className={s.cardYear}>{p.year}</span>
                <span className={s.cardTeam}>{p.team.join(' · ')}</span>
              </div>
              <h2 className={s.cardTitle}>{p.title}</h2>
              <p className={s.cardDesc}>{p.desc}</p>
              <div className={s.cardTags}>
                {p.tags.map((t) => <span key={t} className={s.tag}>{t}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
