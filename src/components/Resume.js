const DEVICONS = {
  "Java":         "devicon-java-plain colored",
  "Python":       "devicon-python-plain colored",
  "C++":          "devicon-cplusplus-plain colored",
  "JavaScript":   "devicon-javascript-plain colored",
  "TypeScript":   "devicon-typescript-plain colored",
  "HTML":         "devicon-html5-plain colored",
  "CSS":          "devicon-css3-plain colored",
  "React":        "devicon-react-original colored",
  "Next.js":      "devicon-nextjs-original",
  "Node.js":      "devicon-nodejs-plain colored",
  "FastAPI":      "devicon-fastapi-plain colored",
  "Flask":        "devicon-flask-original",
  "Spring Boot":  "devicon-spring-plain colored",
  "PostgreSQL":   "devicon-postgresql-plain colored",
  "Git":          "devicon-git-plain colored",
  "GitHub":       "devicon-github-original",
  "Firebase":     "devicon-firebase-plain colored",
  "Vite":         "devicon-vitejs-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-plain colored",
  "Pandas":       "devicon-pandas-plain colored",
  "NumPy":        "devicon-numpy-plain colored",
  "Linux":        "devicon-linux-plain colored",
  "Maven":        "devicon-maven-plain colored"
};

function Resume() {
  return (
    <section id="resume" className="section-page">
      <h2>Resume</h2>
      <div className="resume-wrapper">
        <div className="resume-panel resume-panel-skills">
          <div className="resume-panel-header">
            <h3>Skills</h3>
            <p>Focused on clean UI, scalable systems, and strong fundamentals.</p>
          </div>
          <div className="skill-highlights">
            {RESUME_SKILL_HIGHLIGHTS.map((highlight) => (
              <div className="skill-highlight-card" key={highlight.title}>
                <div className="skill-highlight-icon">
                  <i className={highlight.icon}></i>
                </div>
                <h4>{highlight.title}</h4>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
          <RadarChart />
          <div className="skill-groups">
            {SKILL_GROUPS.map((group) => (
              <div className="skill-group" key={group.title}>
                <div className="skill-group-header">
                  <div className="skill-group-icon">
                    <i className={group.icon}></i>
                  </div>
                  <h4>{group.title}</h4>
                </div>
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <span className="skill-chip" key={item}>
                      {DEVICONS[item] ? (
                        <i className={`${DEVICONS[item]} skill-chip-icon`}></i>
                      ) : null}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resume-panel resume-panel-experience">
          <div className="resume-panel-header">
            <h3>Experience</h3>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((item) => (
              <div className="timeline-item" key={item.title}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{item.title}</h4>
                    <span className="timeline-date">{item.dates}</span>
                  </div>
                  <p className="timeline-subtitle">
                    {item.org} • {item.location}
                  </p>
                  <ul>
                    {item.bullets.map((bullet, index) => (
                      <li key={`${item.title}-bullet-${index}`}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resume-panel resume-panel-education">
          <div className="resume-panel-header">
            <h3>Education</h3>
          </div>
          <div className="timeline">
            {EDUCATION.map((item) => (
              <div className="timeline-item" key={item.school}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{item.school}</h4>
                    {item.dates ? (
                      <span className="timeline-date">{item.dates}</span>
                    ) : null}
                  </div>
                  <p className="timeline-subtitle">
                    {item.detail}
                    {item.location ? ` • ${item.location}` : ""}
                  </p>
                  {item.bullets.length ? (
                    <ul>
                      {item.bullets.map((bullet, index) => (
                        <li key={`${item.school}-bullet-${index}`}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
