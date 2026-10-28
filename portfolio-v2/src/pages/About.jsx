import { ABOUT_PARTS } from "../data.js";
import Reveal from "../components/Reveal.jsx";
import profilePhoto from "../assets/newprofile.jpeg";
import "./About.css";

export default function About() {
  return (
    <section className="page-section page-about">
      <h2 className="about-heading">about</h2>

      <Reveal as="img"
        className="about-photo"
        src={profilePhoto}
        alt="Roger Torres"
        loading="lazy"
      />

      <div className="about-parts">
        {ABOUT_PARTS.map((part, i) => (
          <Reveal
            key={part.label}
            className="about-part"
            delay={i * 100}
          >
            <span className="about-part-label">{part.label}</span>
            <p className="about-part-text">{part.text}</p>
            {i < ABOUT_PARTS.length - 1 && (
              <div className="about-part-divider" aria-hidden="true" />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
