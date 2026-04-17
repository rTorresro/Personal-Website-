import { ABOUT_TEXT, ABOUT_STATS } from "../data.js";
import "./About.css";

export default function About() {
  return (
    <section className="page-section page-about">
      <h2 className="about-heading">about</h2>
      <p className="about-bio">{ABOUT_TEXT}</p>
      <div className="about-stats">
        {ABOUT_STATS.map((s) => (
          <div key={s.label} className="about-card">
            <i className={`${s.icon} about-card-icon`} aria-hidden="true" />
            <span className="about-card-value">{s.value}</span>
            <span className="about-card-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
