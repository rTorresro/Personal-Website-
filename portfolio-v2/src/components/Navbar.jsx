import { useState } from "react";

const LINKS = [
  { id: "home",     label: "~/home" },
  { id: "about",    label: "~/about" },
  { id: "resume",   label: "~/resume" },
  { id: "projects", label: "~/projects" },
  { id: "contact",  label: "~/contact" },
];

export default function Navbar({ active, onNavigate }) {
  const [open, setOpen] = useState(false);

  const navigate = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">roger torres</span>
      <button
        type="button"
        className="navbar-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger${open ? " hamburger-open" : ""}`} />
      </button>
      <ul className={`navbar-links${open ? " navbar-links-open" : ""}`}>
        {LINKS.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              className={`nav-link${active === l.id ? " nav-link-active" : ""}`}
              onClick={() => navigate(l.id)}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
