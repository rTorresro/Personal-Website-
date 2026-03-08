function SidePanel({ onNavigate }) {
  return (
    <aside className="side-panel" aria-label="Side panel">
      <div className="side-panel-video">
        <video
          src="original-364376f27c8ab6872574f4c27c9ff254.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
      <TerminalCTA onNavigate={onNavigate} className="terminal-cta-docked" />
    </aside>
  );
}
