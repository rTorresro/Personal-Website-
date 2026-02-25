function Navbar({ activeSection, onSectionChange }) {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav className="navbar">
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={`nav-tab${activeSection === section.id ? " active" : ""}`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
