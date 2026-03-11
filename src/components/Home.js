const { useState, useEffect } = React;

const HERO_PHRASES = [
  "full-stack developer",
  "cs student",
  "problem solver",
  "builder"
];

function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
        setFading(false);
      }, 380);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (sectionId) => {
    if (window.setActiveSection) {
      window.setActiveSection(sectionId);
    } else {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      window.location.hash = sectionId;
    }
  };

  return (
    <section id="home" className="section-page">
      <GlobeHero />
      <div className="home-content">
        <h1 className="hero-title">
          <span className="hero-name" data-text="roger torres">roger torres</span>
          <span className={`hero-role${fading ? " hero-role-fade" : ""}`}>
            {HERO_PHRASES[phraseIndex]}
          </span>
        </h1>
        <div className="resume-button-container">
          <a href="rogerressumeFIXED10.pdf" download className="resume-button">
            <i className="fas fa-download"></i>
            Download Resume
          </a>
        </div>
        <div className="metrics-strip">
          {METRICS.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="status-badge">
          <span className="status-dot"></span>
          <span className="status-text">Currently building: <strong>{CURRENTLY_BUILDING.name}</strong></span>
        </div>
        <div className="social-links">
          <a href="https://github.com/rTorresro" target="_blank" className="social-link" aria-label="GitHub" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/rogertorresro" target="_blank" className="social-link" aria-label="LinkedIn" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://instagram.com/rogertorres__" target="_blank" className="social-link" aria-label="Instagram" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="mailto:rogertorressa@gmail.com" className="social-link" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <TerminalCTA onNavigate={handleNavigate} className="terminal-cta-inline" />
      </div>
    </section>
  );
}
