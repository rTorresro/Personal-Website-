const { useState } = React;

function Resume() {
  const [currentProject, setCurrentProject] = useState(0);

  const handlePrevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setCurrentProject((prev) => (prev + 1) % PROJECTS.length);
  };

  const project = PROJECTS[currentProject];

  return (
    <section id="resume">
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
          <div className="skill-groups">
            {SKILL_GROUPS.map((group) => (
              <div className="skill-group" key={group.title}>
                <h4>{group.title}</h4>
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <span className="skill-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resume-panel resume-panel-projects">
          <div className="resume-panel-header">
            <h3>Projects</h3>
            <p>Selected work with a focus on real-world impact.</p>
          </div>
          <div className="project-carousel resume-project-carousel">
            <button
              className="project-nav-button"
              onClick={handlePrevProject}
              aria-label="Previous project"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="project-card reveal-text revealed">
              <div className="project-text">
                <p className="project-title">{project.title}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-link">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-button"
                  >
                    <i className="fab fa-github"></i>
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
            <button
              className="project-nav-button"
              onClick={handleNextProject}
              aria-label="Next project"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="project-indicator">
            {currentProject + 1} / {PROJECTS.length}
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
