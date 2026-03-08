const { useEffect } = React;

function App() {
  useEffect(() => {
    setupPortfolioEffects();
  }, []);

  const handleNavigate = (sectionId) => {
    if (window.setActiveSection) {
      window.setActiveSection(sectionId);
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    window.location.hash = sectionId;
  };

  return (
    <div>
      <div id="scroll-progress"></div>
      <BackgroundCodeEditor />
      <Particles />
      <CodeSnippets />
      <Surveillance />
      <TerminalHero />
      <Navbar />
      <SidePanel onNavigate={handleNavigate} />
      <Home />
      <About />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
