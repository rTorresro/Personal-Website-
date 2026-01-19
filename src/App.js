const { useEffect } = React;

function App() {
  useEffect(() => {
    setupPortfolioEffects();
  }, []);

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
      <ScrollToTop />
    </div>
  );
}
