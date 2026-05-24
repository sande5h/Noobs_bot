'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import s from './emc.module.css';

const CATEGORIES = [
  {
    icon: '📡',
    title: 'Spectrum Analyzer',
    desc: 'Core emissions measurement tool',
    videos: [
      { id: 'WnKK11UEvVE', title: 'How to Use a Spectrum Analyzer — Controls, Techniques & Tips', label: 'Spectrum Analyzer', channel: 'Electronics Weekly', level: 'beginner' },
      { id: 'Mc0cvUE4DtE', title: 'Practical Beginner Guide to Spectrum Analyzers for Engineers', label: 'Spectrum Analyzer', channel: 'EMC Training', level: 'beginner' },
      { id: 'JPw94nOWZsM', title: 'Radiated & Conducted Emissions Testing — ABCs of EMC (E02)', label: 'Spectrum Analyzer', channel: 'Keysight Labs', level: 'intermediate' },
      { id: 'Au2g0BPZ6cQ', title: "Engineer's Guide to Pre-Compliance Radiated Emission Test", label: 'Spectrum Analyzer', channel: 'Rohde & Schwarz', level: 'intermediate' },
    ],
  },
  {
    icon: '🔬',
    title: 'Near-Field Probes',
    desc: 'Locating emission hot spots on PCBs',
    videos: [
      { id: 'oWERNOmtdbk', title: 'Understanding Near Field Probes — Principles & EMI Pre-Compliance', label: 'Near-Field Probe', channel: 'Rohde & Schwarz', level: 'beginner' },
      { id: 'C9qw_NwJWK4', title: 'Near Field Probe Demo — Troubleshoot EMI Problems on PCB', label: 'Near-Field Probe', channel: 'Keysight Technologies', level: 'beginner' },
      { id: '1cmSDUnZAZw', title: 'RIGOL NFP-3 Near-Field Probe Set — EMI Source Identification', label: 'Near-Field Probe', channel: 'RIGOL Technologies', level: 'beginner' },
      { id: 'Z1PQONzKAw8', title: 'EMC Interference Suppression w/ Near Field Probes & Spectrum Analyzer Software', label: 'Near-Field Probe', channel: 'Tekbox', level: 'intermediate' },
      { id: 'Ome_yDsWY7k', title: 'GW Instek EMC Pretest — Near Field Probes EMI Debugging Series', label: 'Near-Field Probe', channel: 'GW Instek', level: 'intermediate' },
    ],
  },
  {
    icon: '⚡',
    title: 'LISN — Line Impedance Stabilization Network',
    desc: 'Conducted emissions measurement on power lines',
    videos: [
      { id: 'lWAEo2hJowY', title: 'LISNs Explained in Simple Terms — What & Why for EMC Testing', label: 'LISN', channel: 'Biricha Digital', level: 'beginner' },
      { id: 'QPJzp66Yvzs', title: 'Understanding LISNs — Design, Function & Conducted EMC Testing', label: 'LISN', channel: 'Rohde & Schwarz', level: 'beginner' },
      { id: '28oDdL9RnWM', title: 'EMC Conducted Emissions — How to Connect & Set Up a LISN', label: 'LISN', channel: 'Biricha Digital (Dr. Ali Shirsavar)', level: 'intermediate' },
      { id: 'u9BCGcoXOSg', title: 'Debugging Conducted Emissions with Spectrum Analyser & LISN (AC & DC PCBs)', label: 'LISN', channel: 'Keysight Technologies', level: 'intermediate' },
      { id: 'C0MPwGGJY8Q', title: 'Conducted EMI Testing with GSP-9330 Spectrum Analyzer & LISN', label: 'LISN', channel: 'GW Instek', level: 'intermediate' },
    ],
  },
  {
    icon: '📻',
    title: 'Biconical & Log-Periodic Antennas',
    desc: 'Radiated emissions capture setup',
    videos: [
      { id: 'SYlaWSJObqc', title: 'Introduction to EMC Part 2/4 — Radiated Emissions Test Setup', label: 'Radiated Emissions', channel: 'Biricha Digital', level: 'beginner' },
      { id: '6chaZ8P7iGA', title: 'Radiated Emission with BiLog Antenna (Biconical + Log-Periodic)', label: 'Radiated Emissions', channel: 'EMC Lab', level: 'intermediate' },
      { id: 'qRb2p6nWLc4', title: 'EMC Testing Part 1/3 — Antenna Qualification & Antenna Factor', label: 'Radiated Emissions', channel: 'Nuts & Volts', level: 'advanced' },
      { id: 'ZXWncFoHAqw', title: 'EMC #54 — CISPR 11, CISPR 32, CISPR 25 Radiated Emission Compliance Explained', label: 'Radiated Emissions', channel: 'EMC Expert', level: 'advanced' },
    ],
  },
  {
    icon: '🛡️',
    title: 'Immunity Testing — ESD, Surge & EFT',
    desc: 'ESD Gun · Surge Generator · EFT/Burst Generator',
    videos: [
      { id: 'xf7_Fo7lqnY', title: 'EMC #49 — IEC 61000-4-2 ESD Testing Explained: Setup & Immunity', label: 'ESD Gun', channel: 'EMC Expert', level: 'beginner' },
      { id: 'OQjIPOE3fC0', title: 'IEC 61000-4-2 ESD Testing — How to Actually See the Discharge', label: 'ESD Gun', channel: 'David Pommerenke', level: 'intermediate' },
      { id: 'jERWyX8jxrA', title: 'IEC 61000-4-2 DIY Setup Guide — ESD Table, Coupling Plane, Ground Strap', label: 'ESD Gun', channel: 'EMC Testing', level: 'intermediate' },
      { id: '23-ZgyIUh5I', title: 'Surge Test — IEC 61000-4-5 Lightning & Switching Surge Explained', label: 'Surge Generator', channel: 'EMC Training Channel', level: 'beginner' },
      { id: '87cOhNFv6kc', title: 'Surge4-5 Combination Wave Generator — IEC/EN 61000-4-5 Pre-compliance', label: 'Surge Generator', channel: 'The EMC Shop', level: 'intermediate' },
      { id: 'yC9erSHh5jM', title: 'EMC #71 — Transient Immunity IEC/EN 61000-4-4 EFT/Burst Test Explained', label: 'EFT/Burst', channel: 'EMC Expert', level: 'beginner' },
      { id: 'YC8WseQQRtU', title: 'EFT4-4 Electrical Fast Transient Generator — Test Sequence Setup & Menu', label: 'EFT/Burst', channel: 'The EMC Shop', level: 'intermediate' },
    ],
  },
];

const LEVEL_CLASS = { beginner: s.levelBeginner, intermediate: s.levelIntermediate, advanced: s.levelAdvanced };

export default function EmcClient() {
  const [activeVideo, setActiveVideo] = useState(null);

  const close = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    if (!activeVideo) return;
    function onKey(e) { if (e.key === 'Escape') close(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeVideo, close]);

  const totalVideos = CATEGORIES.reduce((n, c) => n + c.videos.length, 0);

  return (
    <>
      <div className={s.page}>
        <header className={s.header}>
          <Link href="/" className={s.backLink}>← Home</Link>
          <p className={s.eyebrow}>// PCB Engineering Resource Library</p>
          <h1 className={s.heading}>EMC Lab <span className={s.accent}>Video</span> Guides</h1>
          <p className={s.sub}>Curated YouTube tutorials for every piece of equipment in a sophisticated EMC pre-compliance test lab.</p>
          <div className={s.statsBar}>
            <span className={s.stat}><span className={s.dot} style={{background:'var(--teal-text)'}} />{totalVideos} Videos</span>
            <span className={s.stat}><span className={s.dot} style={{background:'var(--accent)'}} />{CATEGORIES.length} Categories</span>
            <span className={s.stat}><span className={s.dot} style={{background:'var(--muted)'}} />All Free on YouTube</span>
          </div>
        </header>

        {CATEGORIES.map((cat) => (
          <section key={cat.title} className={s.category}>
            <div className={s.catHeader}>
              <span className={s.catIcon}>{cat.icon}</span>
              <div>
                <div className={s.catTitle}>{cat.title}</div>
                <div className={s.catDesc}>{cat.desc}</div>
              </div>
              <span className={s.catCount}>{cat.videos.length} videos</span>
            </div>
            <div className={s.grid}>
              {cat.videos.map((v) => (
                <button key={v.id} className={s.card} onClick={() => setActiveVideo(v)}>
                  <div className={s.thumb}>
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                      alt={v.title}
                      loading="lazy"
                    />
                    <div className={s.playOverlay}>
                      <div className={s.playCircle}>
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="white"><path d="M2 1l11 7-11 7V1z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className={s.info}>
                    <div className={s.label}>{v.label}</div>
                    <div className={s.title}>{v.title}</div>
                    <div className={s.meta}>
                      <span className={`${s.badge} ${LEVEL_CLASS[v.level]}`}>{v.level}</span>
                      <span className={s.channel}>· {v.channel}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}

        <div className={s.footerNote}>
          <strong>Recommended learning order:</strong> Spectrum Analyzer → Near-Field Probes → LISN (conducted) → Antennas (radiated) → Immunity tools (ESD → Surge → EFT). Click any card to watch inline.
        </div>
      </div>

      {activeVideo && (
        <div className={s.modalBackdrop} onClick={close}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <p className={s.modalTitle}>{activeVideo.title}</p>
              <button className={s.closeBtn} onClick={close} aria-label="Close">✕</button>
            </div>
            <div className={s.player}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&vq=hd1080`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
