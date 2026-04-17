import { useEffect, useState } from "react";
import GlobeHero from "../components/GlobeHero.jsx";
import { METRICS } from "../data.js";
import "./Home.css";

const PHRASES = [
  "full-stack developer",
  "cs student",
  "problem solver",
  "builder",
];

function CyclingLabel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 200);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <span className="home-tag" style={{ opacity: visible ? 1 : 0 }}>
      {PHRASES[idx]}
    </span>
  );
}

export default function Home() {
  return (
    <section className="page-section page-home">
      <div className="home-main">
        <div className="home-text">
          <CyclingLabel />
          <h1 className="home-name">
            <span>roger</span>
            <span>torres</span>
          </h1>
          <p className="home-bio">
            Computer Science student at the University of Pittsburgh. I build
            full-stack applications with a focus on clean UI and dependable
            systems.
          </p>
          <div className="home-buttons">
            <a
              className="home-btn home-btn-primary"
              href="/roger-torres-resume.pdf"
              download
            >
              download resume
            </a>
            <button
              type="button"
              className="home-btn home-btn-secondary"
              onClick={() => window.setActiveSection?.("projects")}
            >
              view projects
            </button>
          </div>
          <div className="home-socials">
            <a
              className="home-social"
              href="https://github.com/rTorresro"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github" aria-hidden="true" />
            </a>
            <a
              className="home-social"
              href="https://linkedin.com/in/rogertorresro"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true" />
            </a>
            <a
              className="home-social"
              href="mailto:rogertorressa@gmail.com"
              aria-label="Email"
            >
              <i className="fas fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="home-globe">
          <GlobeHero />
        </div>
      </div>
      <div className="home-metrics">
        {METRICS.map((m) => (
          <div key={m.label} className="home-metric">
            <span className="home-metric-value">{m.value}</span>
            <span className="home-metric-label">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
