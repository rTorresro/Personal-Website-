function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#home">~/home</a>
        </li>
        <li>
          <a href="#about">~/about</a>
        </li>
        <li>
          <a href="#resume">~/resume</a>
        </li>
        <li>
          <a href="#projects">~/projects</a>
        </li>
        <li>
          <a href="#contact">~/contact</a>
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
