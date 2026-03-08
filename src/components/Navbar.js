function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About Me</a>
        </li>
        <li>
          <a href="#resume">Resume</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <button
            type="button"
            className="theme-toggle"
            data-theme-toggle
            aria-label="Toggle theme"
            onClick={() => window.toggleTheme && window.toggleTheme()}
          >
            FSOCIETY
          </button>
        </li>
      </ul>
    </nav>
  );
}
