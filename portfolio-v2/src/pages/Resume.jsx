import { SKILL_GROUPS, EXPERIENCE, EDUCATION } from "../data.js";
import Reveal from "../components/Reveal.jsx";
import "./Resume.css";

const DEVICONS = {
  "Java":         "devicon-java-plain",
  "Python":       "devicon-python-plain",
  "C++":          "devicon-cplusplus-plain",
  "JavaScript":   "devicon-javascript-plain",
  "TypeScript":   "devicon-typescript-plain",
  "HTML":         "devicon-html5-plain",
  "CSS":          "devicon-css3-plain",
  "React":        "devicon-react-original",
  "Next.js":      "devicon-nextjs-plain",
  "Node.js":      "devicon-nodejs-plain",
  "FastAPI":      "devicon-fastapi-plain",
  "Flask":        "devicon-flask-original",
  "Spring Boot":  "devicon-spring-plain",
  "Streamlit":    "devicon-streamlit-plain",
  "PostgreSQL":   "devicon-postgresql-plain",
  "Git":          "devicon-git-plain",
  "GitHub":       "devicon-github-original",
  "Firebase":     "devicon-firebase-plain",
  "Vite":         "devicon-vitejs-plain",
  "Tailwind CSS": "devicon-tailwindcss-original",
  "Pandas":       "devicon-pandas-plain",
  "NumPy":        "devicon-numpy-plain",
  "JUnit":        "devicon-junit-plain",
  "Linux":        "devicon-linux-plain",
  "Maven":        "devicon-maven-plain",
  "scikit-learn": "devicon-scikitlearn-plain",
};

function TimelineItem({ title, meta, bullets, delay = 0 }) {
  return (
    <Reveal className="timeline-item" delay={delay}>
      <div className="timeline-dot" />
      <div className="timeline-content">
        <h4 className="timeline-title">{title}</h4>
        <span className="timeline-meta">{meta}</span>
        {bullets.length > 0 && (
          <ul className="timeline-bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export default function Resume() {
  return (
    <section className="page-section page-resume">
      <h2 className="resume-heading">resume</h2>

      <div className="resume-section">
        <h3 className="resume-section-title">Skills</h3>
        <div className="skill-groups">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} className="skill-group" delay={i * 100}>
              <h4 className="skill-group-title">
                <i className={g.icon} aria-hidden="true" />
                {g.title}
              </h4>
              <div className="skill-chips">
                {g.items.map((item) => (
                  <span key={item} className="skill-chip">
                    {DEVICONS[item] && (
                      <i className={DEVICONS[item]} aria-hidden="true" />
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <h3 className="resume-section-title">Experience</h3>
        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <TimelineItem
              key={i}
              title={exp.title}
              meta={[exp.org, exp.location, exp.dates]
                .filter(Boolean)
                .join(" · ")}
              bullets={exp.bullets}
              delay={i * 100}
            />
          ))}
        </div>
      </div>

      <div className="resume-section">
        <h3 className="resume-section-title">Education</h3>
        <div className="timeline">
          {EDUCATION.map((edu, i) => (
            <TimelineItem
              key={i}
              title={edu.school}
              meta={[edu.detail, edu.location, edu.dates]
                .filter(Boolean)
                .join(" · ")}
              bullets={edu.bullets}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
