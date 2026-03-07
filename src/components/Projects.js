const { useState } = React;

function Projects() {
  const [currentProject, setCurrentProject] = useState(0);

  const handlePrevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setCurrentProject((prev) => (prev + 1) % PROJECTS.length);
  };

  const project = PROJECTS[currentProject];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div id="projects-container">
        <div className="project-carousel">
          <button
            className="project-nav-button"
            onClick={handlePrevProject}
            aria-label="Previous project"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="project-card reveal-text revealed">
            <div className="project-text">
              <p className="project-title">
                {project.title}
                {project.status ? (
                  <span className="project-status-badge">{project.status}</span>
                ) : null}
              </p>
              {project.image ? (
                <div className="project-media">
                  <img
                    src={project.image}
                    alt={project.imageAlt || `${project.title} preview`}
                  />
                </div>
              ) : null}
              <p className="project-description">{project.description}</p>
              {project.stack?.length ? (
                <div className="project-stacks">
                  {project.stack.map((item) => (
                    <span className="project-stack" key={`${project.title}-${item}`}>
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
              {project.outcomes?.length ? (
                <ul className="project-outcomes">
                  {project.outcomes.map((outcome, index) => (
                    <li key={`${project.title}-outcome-${index}`}>{outcome}</li>
                  ))}
                </ul>
              ) : null}
              {project.link ? (
                <p className="project-link">
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                </p>
              ) : (
                <p className="project-link">Repo coming soon</p>
              )}
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
    </section>
  );
}
