function About() {
  return (
    <section id="about" className="section-page">
      <h2>About Me</h2>
      <div className="about-content-wrapper">
        <div className="animated-name-container">
          <div className="animated-name" data-name="Roger Torres">
            {NAME_LETTERS.map((letter, index) => (
              <span
                className={`name-letter${letter === " " ? " space" : ""}`}
                key={`letter-${index}`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            <p id="about-paragraph" className="reveal-text">
              {ABOUT_TEXT}
            </p>
          </div>
          <div className="about-stats">
            {ABOUT_STATS.map((stat) => (
              <div className="about-stat-card" key={stat.label}>
                <span className="about-stat-icon">
                  <i className={stat.icon}></i>
                </span>
                <div className="about-stat-text">
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-narrative reveal-text">
          <p>{PORTFOLIO_NARRATIVE}</p>
        </div>
      </div>
    </section>
  );
}
