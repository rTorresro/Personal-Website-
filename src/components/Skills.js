function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div id="skills-container">
        <div className="skill-row">
          {SKILLS.slice(0, 3).map((skill) => (
            <div className="skill-box" key={skill.label}>
              <i className={skill.icon}></i>
              <p>{skill.label}</p>
              <div className="skill-progress">
                <div
                  className="skill-progress-bar"
                  data-skill={skill.level}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="skill-row">
          {SKILLS.slice(3).map((skill) => (
            <div className="skill-box" key={skill.label}>
              <i className={skill.icon}></i>
              <p>{skill.label}</p>
              <div className="skill-progress">
                <div
                  className="skill-progress-bar"
                  data-skill={skill.level}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
