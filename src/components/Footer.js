function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Roger Torres</h3>
          <p>
            Full-stack CS student focused on clean UI, reliable systems, and
            real-world impact.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="footer-social-links">
            <a
              href="https://github.com/rTorresro"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/rogertorresro"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://instagram.com/rogertorres__"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:rogertorressa@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Roger Torres. All rights reserved.
      </div>
    </footer>
  );
}
