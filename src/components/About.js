function About() {
  return (
    <section id="about">
      <div className="about-content-wrapper">
        <h2>About Me</h2>
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
        <p id="about-paragraph" className="reveal-text">
          {ABOUT_TEXT}
        </p>
      </div>
    </section>
  );
}
