function Particles() {
  return (
    <div id="particles-container">
      {PARTICLES.map((_, index) => (
        <span className="particle" key={`particle-${index}`}></span>
      ))}
    </div>
  );
}
