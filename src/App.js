const { useEffect, useState } = React;

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setupPortfolioEffects();
  }, []);

  useEffect(() => {
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("show");
    });
    document.querySelectorAll(".reveal-text").forEach((element) => {
      element.classList.add("revealed");
    });
  }, [activeSection]);

  const sectionMap = {
    home: <Home />,
    about: <About />,
    resume: <Resume />,
    contact: <Contact />
  };

  return (
    <div>
      <div id="scroll-progress"></div>
      <BackgroundCodeEditor />
      <Particles />
      <CodeSnippets />
      <TerminalHero />
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="tabbed-layout">
        <div className="tabbed-content">{sectionMap[activeSection]}</div>
      </main>
      <Footer />
    </div>
  );
}
