function TerminalHero() {
  return (
    <div id="terminal-hero">
      <div id="terminal-header">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
      </div>
      <div id="terminal-body">
        {TERMINAL_LINES.map((line, index) => (
          <p className="terminal-line" data-text={line} key={`line-${index}`}>
            {""}
          </p>
        ))}
      </div>
    </div>
  );
}
