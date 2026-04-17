import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Resume from "./pages/Resume.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import "./App.css";

const SECTIONS = ["home", "about", "resume", "projects", "contact"];

const PAGES = {
  home: Home,
  about: About,
  resume: Resume,
  projects: Projects,
  contact: Contact,
};

const FADE_MS = 200;

function readHash() {
  const h = window.location.hash.replace(/^#/, "");
  return SECTIONS.includes(h) ? h : "home";
}

export default function App() {
  const [section, setSection]     = useState(() => readHash());
  const [displayed, setDisplayed] = useState(section);
  const [visible, setVisible]     = useState(true);

  useEffect(() => {
    const onHashChange = () => setSection(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (window.location.hash.replace(/^#/, "") !== section) {
      window.location.hash = section;
    }
  }, [section]);

  useEffect(() => {
    window.setActiveSection = setSection;
    return () => { delete window.setActiveSection; };
  }, []);

  useEffect(() => {
    if (section === displayed) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayed(section);
      setVisible(true);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [section, displayed]);

  const Page = PAGES[displayed];

  return (
    <>
      <Navbar active={section} onNavigate={setSection} />
      <main className="page" style={{ opacity: visible ? 1 : 0 }}>
        <Page />
      </main>
      <CommandPalette />
    </>
  );
}
