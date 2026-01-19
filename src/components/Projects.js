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
              <p className="project-title">{project.title}</p>
              <p className="project-description">{project.description}</p>
              <p className="project-link">
                <a href={project.link} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </p>
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
