function Home() {
  return (
    <section id="home">
      <h1>Hello, Welcome to Roger.dev</h1>
      <img id="image1" src="IMG_8057.jpg" alt="Description" />
      <div className="resume-button-container">
        <a href="rogerressumeFIXED8.pdf" download className="resume-button">
          <i className="fas fa-download"></i>
          Download Resume
        </a>
      </div>
      <div className="social-links">
        <a
          href="https://github.com/rTorresro"
          target="_blank"
          className="social-link"
          aria-label="GitHub"
          rel="noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://linkedin.com/in/rogertorresro"
          target="_blank"
          className="social-link"
          aria-label="LinkedIn"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://instagram.com/rogertorres_"
          target="_blank"
          className="social-link"
          aria-label="Instagram"
          rel="noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="mailto:rogertorressa@gmail.com"
          className="social-link"
          aria-label="Email"
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </section>
  );
}
