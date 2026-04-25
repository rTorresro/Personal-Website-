import { useRef, useCallback, useEffect, useState } from "react";
import { PROJECTS } from "../data.js";
import "./Projects.css";

function ProjectCard({ project, delay = 0 }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "";
  }, []);

  return (
    <article
      ref={cardRef}
      className={`project-card reveal${visible ? " reveal-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {project.image && (
        <img
          className="project-img"
          src={`/${project.image}`}
          alt={project.imageAlt || project.title}
          loading="lazy"
        />
      )}

      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          {project.status && (
            <span className="project-badge">{project.status}</span>
          )}
        </div>

        <p className="project-desc">{project.description}</p>

        <div className="project-stack">
          {project.stack.map((s) => (
            <span key={s} className="project-stack-chip">{s}</span>
          ))}
        </div>

        {project.outcomes && project.outcomes.length > 0 && (
          <ul className="project-outcomes">
            {project.outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        )}

        {project.link && (
          <a
            className="project-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true" />
            View on GitHub
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="page-section page-projects">
      <h2 className="projects-heading">projects</h2>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
