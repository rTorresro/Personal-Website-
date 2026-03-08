function SidePanel({ onNavigate }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        className={`side-panel-tab${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close terminal" : "Open terminal"}
      >
        {open ? "✕" : ">_"}
      </button>
      <aside className={`side-panel${open ? " open" : ""}`} aria-label="Side panel">
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
    </>
  );
}
