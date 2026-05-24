import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>— est. 2025</p>
        <h1 className={styles.heading}>Noobsbot</h1>
        <div className={styles.rule} />
        <p className={styles.subheading}>Coming Soon</p>
        <nav className={styles.links}>
          <Link href="/tools" className={styles.link}>Tools</Link>
          <Link href="/land" className={styles.link}>Land Calc</Link>
          <Link href="/sandesh" className={styles.link}>Sandesh</Link>
          <Link href="/ramu" className={styles.link}>Ramu</Link>
          <Link href="/nishan" className={styles.link}>Nishan</Link>
          <Link href="/emc" className={styles.link}>EMC Lab</Link>
          <Link href="/projects" className={styles.link}>Projects</Link>
        </nav>
      </div>
    </main>
  );
}
