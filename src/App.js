const { useEffect } = React;

function App() {
  useEffect(() => {
    setupPortfolioEffects();
  }, []);

  const handleNavigate = (sectionId) => {
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
      <TerminalHero />
      <Navbar />
      <Home />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Resume />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
