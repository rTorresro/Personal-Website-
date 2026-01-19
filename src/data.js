const PARTICLES = Array.from({ length: 15 });

const CODE_SNIPPETS = [
  "&lt;div&gt;hello world&lt;/div&gt;",
  "function dev() { }",
  "const code = 'awesome';",
  "import { skills } from './brain'",
  "npm install creativity"
];

const TERMINAL_LINES = [
  "roger@dev-machine:~$ pwd",
  "/home/roger/portfolio",
  "roger@dev-machine:~$ ./start.sh",
  "Starting Roger.dev..."
];

const NAME_LETTERS = Array.from("Roger Torres");

const ABOUT_TEXT =
  "I'm Roger Torres, an 18-year-old Computer Science freshman at the University of Pittsburgh. I built this site to grow as a developer, with a focus on full-stack work that blends logic, design, and products that solve real problems. Outside of coding, I like films/TV (Mr. Robot, The Wire, The Sopranos), anime and manga (Berserk, Vinland Saga, Dragon Ball Z), gaming, lifting, and the occasional dive into philosophy. I'm excited to keep building new projects, learning more software engineering, and moving toward independence.";

const RESUME_SKILL_HIGHLIGHTS = [
  {
    icon: "fas fa-laptop-code",
    title: "Frontend Development",
    description:
      "Crafting responsive interfaces and polished UI experiences with React and modern web tooling."
  },
  {
    icon: "fas fa-server",
    title: "Backend Development",
    description:
      "Building dependable APIs and data layers that keep applications secure, fast, and scalable."
  }
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Java", "Python", "C++", "JavaScript", "HTML", "CSS"]
  },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "FastAPI", "Node.js", "Streamlit"]
  },
  {
    title: "Databases",
    items: ["PostgreSQL"]
  },
  {
    title: "Tools",
    items: ["Git"]
  }
];

const EXPERIENCE = [
  {
    title: "Tutor — Math, Coding, and Spanish",
    org: "Self-Employed",
    location: "Allentown, PA",
    dates: "2023 – 2025",
    bullets: [
      "Tutored students in Java and Python fundamentals including OOP, data structures, algorithms, and debugging.",
      "Designed custom coding exercises and mini-projects to reinforce computational thinking and programming logic.",
      "Provided instruction in algebra, calculus, and problem-solving strategies."
    ]
  }
];

const EDUCATION = [
  {
    school: "University of Pittsburgh",
    location: "Pittsburgh, PA",
    dates: "Expected May 2029",
    detail: "Bachelor of Science in Computer Science",
    bullets: [
      "Focus on software development, data structures, discrete mathematics, and applied problem solving.",
      "Active member of the Pitt Computer Science Club."
    ]
  },
  {
    school: "Parkland High School",
    location: "Allentown, PA",
    dates: "",
    detail: "GPA: 4.0",
    bullets: []
  }
];

const PROJECTS = [
  {
    title: "ProjectPilot",
    description:
      "An AI-powered chatbot that generates personalized project ideas for your resume. Built with Python, Streamlit, and OpenAI GPT, it suggests projects based on your skills, experience level, and interests.",
    link: "https://github.com/rTorresro/Project-Pilot"
  },
  {
    title: "Statmind",
    description:
      "A basketball analytics project that explores NBA data, trends, and storytelling through real-world datasets and insights.",
    link: "https://github.com/rTorresro/Statmind"
  },
  {
    title: "Spotify Analyzer",
    description:
      "A Python app that analyzes your Spotify playlists to uncover tempo patterns, energy-valence relationships, top artists, and mood classification using data visualizations.",
    link: "https://github.com/rTorresro/Spotify-Analyzer"
  },
  {
    title: "StockSight",
    description:
      "A full-stack web app for real-time stock tracking and ML-powered next-day predictions using Alpha Vantage data and linear regression. Built with Flask, scikit-learn, Pandas, and NumPy.",
    link: "https://github.com/rTorresro/StockSight"
  }
];
