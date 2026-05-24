"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./profile.module.css";

const NAV = [
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
];

export default function ProfilePage({ profile }) {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observers = [];
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className={s.page}>
      <div className={s.layout}>
        {/* ── Sidebar ── */}
        <header className={s.sidebar}>
          <div>
            <Link href="/" className={s.backLink}>← noobsbot</Link>
            <h1 className={s.name}>{profile.name}</h1>
            <h2 className={s.role}>{profile.role}</h2>
            <p className={s.tagline}>{profile.tagline}</p>

            <nav className={s.nav} aria-label="Page sections">
              <ul>
                {NAV.map(({ id, label }) => (
                  <li key={id}>
                    <a href={`#${id}`} className={`${s.navLink} ${activeSection === id ? s.navLinkActive : ""}`}>
                      <span className={s.navLine} />
                      <span className={s.navLabel}>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={s.social}>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={s.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={s.socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
          </div>
        </header>

        {/* ── Content ── */}
        <main className={s.content}>

          <section id="about" className={s.section}>
            <h3 className={s.sectionHeading}>About</h3>
            <div className={s.prose}>
              {profile.about.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </section>

          <section id="experience" className={s.section}>
            <h3 className={s.sectionHeading}>Experience</h3>
            <ul className={s.cardList}>
              {profile.experience.map((job) => (
                <li key={job.title} className={s.card}>
                  <div className={s.cardBg} />
                  <div className={s.cardDate}>{job.period}</div>
                  <div className={s.cardBody}>
                    <h4 className={s.cardTitle}>
                      {job.companyUrl ? (
                        <Link href={job.companyUrl} className={s.cardTitleLink}>
                          {job.title} · <span className={s.cardCompany}>{job.company}</span>
                          <ArrowIcon />
                        </Link>
                      ) : (
                        <>{job.title} · <span className={s.cardCompany}>{job.company}</span></>
                      )}
                    </h4>
                    <p className={s.cardDesc}>{job.description}</p>
                    <ul className={s.chips}>
                      {job.skills.map((sk) => <li key={sk} className={s.chip}>{sk}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="projects" className={s.section}>
            <h3 className={s.sectionHeading}>Projects</h3>
            <ul className={s.cardList}>
              {profile.projects.map((proj) => (
                <li key={proj.title} className={s.card}>
                  <div className={s.cardBg} />
                  <div className={s.cardBody} style={{ gridColumn: "1 / -1" }}>
                    <h4 className={s.cardTitle}>
                      {proj.url ? (
                        <Link href={proj.url} className={s.cardTitleLink}>
                          {proj.title}<ArrowIcon />
                        </Link>
                      ) : proj.title}
                    </h4>
                    <p className={s.cardDesc}>{proj.description}</p>
                    <ul className={s.chips}>
                      {proj.skills.map((sk) => <li key={sk} className={s.chip}>{sk}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <footer className={s.footer}>
            Built with <span className={s.accentText}>Next.js</span>. Hosted on{" "}
            <span className={s.accentText}>Noobsbot</span>.
          </footer>

        </main>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg className={s.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd"/>
    </svg>
  );
}
