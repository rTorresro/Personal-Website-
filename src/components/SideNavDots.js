const { useState, useEffect } = React;

function SideNavDots() {
  const sections = ["home", "about", "resume", "projects", "contact"];
  const labels = {
    home: "Home",
    about: "About",
    resume: "Resume",
    projects: "Projects",
    contact: "Contact"
  };

  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.body.dataset.activeSection || "home";
      setActive(current);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-active-section"]
    });

    setActive(document.body.dataset.activeSection || "home");
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="side-nav-dots" aria-label="Section navigation">
      {sections.map((section) => (
        <button
          key={section}
          className={`side-nav-dot${active === section ? " active" : ""}`}
          onClick={() => window.setActiveSection && window.setActiveSection(section)}
          aria-label={`Navigate to ${labels[section]}`}
          data-label={labels[section]}
        />
      ))}
    </nav>
  );
}
