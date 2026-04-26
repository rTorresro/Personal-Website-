import { useState, useEffect, useRef } from "react";
import resumePdf from "../assets/rogerresumeFIXED17.pdf?url";
import "./CommandPalette.css";

export default function CommandPalette() {
  const COMMANDS = [
    { id: "home",      icon: "fas fa-home",      label: "Go to Home",      group: "Navigate", action: () => window.setActiveSection?.("home") },
    { id: "about",     icon: "fas fa-user",      label: "Go to About",     group: "Navigate", action: () => window.setActiveSection?.("about") },
    { id: "resume",    icon: "fas fa-file-alt",  label: "Go to Resume",    group: "Navigate", action: () => window.setActiveSection?.("resume") },
    { id: "projects",  icon: "fas fa-folder",    label: "Go to Projects",  group: "Navigate", action: () => window.setActiveSection?.("projects") },
    { id: "contact",   icon: "fas fa-envelope",  label: "Go to Contact",   group: "Navigate", action: () => window.setActiveSection?.("contact") },
    { id: "theme",     icon: "fas fa-circle-half-stroke", label: "Toggle Theme", group: "Actions", action: () => window.toggleTheme?.() },
    { id: "resume-dl", icon: "fas fa-download",  label: "Download Resume", group: "Actions", action: () => { const a = document.createElement("a"); a.href = resumePdf; a.download = "Roger-Torres-Resume.pdf"; a.click(); } },
    { id: "github",    icon: "fab fa-github",    label: "Open GitHub",     group: "Links",   action: () => window.open("https://github.com/rTorresro", "_blank") },
    { id: "linkedin",  icon: "fab fa-linkedin",  label: "Open LinkedIn",   group: "Links",   action: () => window.open("https://linkedin.com/in/rogertorresro", "_blank") },
    { id: "email",     icon: "fas fa-at",        label: "Send Email",      group: "Links",   action: () => window.open("mailto:rogertorressa@gmail.com") }
  ];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    window.openCommandPalette = () => {
      setOpen(true);
      setQuery("");
      setSelected(0);
    };

    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const run = (cmd) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (filtered[selected]) run(filtered[selected]);
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-row">
          <i className="fas fa-search cmd-search-icon"></i>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
          <span className="cmd-esc-badge">ESC</span>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results for "{query}"</div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                className={`cmd-item${i === selected ? " cmd-item-active" : ""}`}
                onClick={() => run(cmd)}
                onMouseEnter={() => setSelected(i)}
              >
                <span className="cmd-item-icon-wrap">
                  <i className={cmd.icon}></i>
                </span>
                <span className="cmd-item-label">{cmd.label}</span>
                <span className="cmd-item-group">{cmd.group}</span>
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>Ctrl K</kbd> toggle</span>
        </div>
      </div>
    </div>
  );
}
