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

const METRICS = [
  { label: "Projects", value: "7" },
  { label: "Core Stacks", value: "3" },
  { label: "Years Building", value: "2+" }
];

const NAME_LETTERS = Array.from("Roger Torres");

const ABOUT_TEXT =
  "I'm Roger Torres, an 18-year-old Computer Science freshman at the University of Pittsburgh. I built this site to grow as a developer, with a focus on full-stack work that blends logic, design, and products that solve real problems. Outside of coding, I like films/TV (Mr. Robot, The Wire, The Sopranos), anime and manga (Berserk, Vinland Saga, Dragon Ball Z), gaming, lifting, and the occasional dive into philosophy. I'm excited to keep building new projects, learning more software engineering, and moving toward independence.";

const PORTFOLIO_NARRATIVE =
  "I design products that feel calm, intentional, and useful. My work blends clean UI with dependable backends, and I care most about clarity, performance, and solving real problems for real people.";

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
    icon: "fas fa-code",
    items: ["Java", "Python", "C++", "JavaScript", "TypeScript", "HTML", "CSS"]
  },
  {
    title: "Frameworks",
    icon: "fas fa-layer-group",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "Spring Boot",
      "Streamlit"
    ]
  },
  {
    title: "Databases",
    icon: "fas fa-database",
    items: ["PostgreSQL"]
  },
  {
    title: "Tools",
    icon: "fas fa-toolbox",
    items: [
      "Git",
      "GitHub",
      "Firebase",
      "Vite",
      "Tailwind CSS",
      "Leaflet",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "JUnit",
      "Linux",
      "Maven"
    ]
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
    title: "Queued",
    description:
      "A personalized watchlist platform that organizes movies and shows with smart filters and viewing analytics. Built with a Node/Express backend and a React + TypeScript UI.",
    link: "https://github.com/rTorresro/Queued",
    status: "WIP",
    image: "Screenshot 2026-03-07 at 1.19.00 AM.png",
    imageAlt: "Queued dashboard preview",
    stack: ["Node.js", "Express", "React", "TypeScript", "TMDB API"],
    outcomes: [
      "Built personalized watchlists with smart filters and preferences.",
      "Designed analytics views to surface viewing trends."
    ]
  },
  {
    title: "RunIt Pittsburgh",
    description:
      "A real-time basketball court finder that helps players discover games, check in, and organize pickup runs. Built with React, Vite, Firebase, Leaflet, and Tailwind CSS.",
    link: "https://github.com/rTorresro/RunIt-Pittsburgh-",
    image: "Screenshot 2026-03-07 at 1.24.22 AM.png",
    imageAlt: "RunIt Pittsburgh map and courts preview",
    stack: ["React", "Vite", "Firebase", "Leaflet", "Tailwind CSS"],
    outcomes: [
      "Mapped courts with live check-ins and game status updates.",
      "Implemented authentication and real-time data sync for players."
    ]
  },
  {
    title: "Pulseboard",
    description:
      "A task analytics dashboard that turns daily tracking into live metrics and streak insights. Spring Boot, React, TypeScript, and PostgreSQL.",
    status: "WIP",
    stack: ["Spring Boot", "React", "TypeScript", "PostgreSQL"],
    outcomes: [
      "Modeled task data into weekly totals, streaks, and trends.",
      "Built backend services for user-scoped analytics."
    ]
  },
  {
    title: "ProjectPilot",
    description:
      "An AI-powered chatbot that generates personalized project ideas for your resume. Built with Python, Streamlit, and OpenAI GPT.",
    link: "https://github.com/rTorresro/Project-Pilot",
    stack: ["Python", "Streamlit", "OpenAI API"],
    outcomes: [
      "Generated tailored project ideas from skills and interests.",
      "Guided users with a simple, chat-style UX."
    ]
  },
  {
    title: "Statmind",
    description:
      "A basketball analytics project that explores NBA data, trends, and storytelling through real-world datasets and insights.",
    link: "https://github.com/rTorresro/Statmind",
    stack: ["Python", "Pandas", "Data Visualization"],
    outcomes: [
      "Cleaned and analyzed NBA datasets to surface trends.",
      "Built visual stories to explain player and team patterns."
    ]
  },
  {
    title: "Spotify Analyzer",
    description:
      "A Python app that analyzes your Spotify playlists to uncover tempo patterns, energy-valence relationships, top artists, and mood classification.",
    link: "https://github.com/rTorresro/Spotify-Analyzer",
    stack: ["Python", "Spotify API", "Pandas"],
    outcomes: [
      "Extracted playlist data to quantify mood and tempo trends.",
      "Summarized listening patterns with clear visual insights."
    ]
  },
  {
    title: "StockSight",
    description:
      "A full-stack web app for real-time stock tracking and ML-powered next-day predictions using Alpha Vantage data and linear regression. Built with Flask, scikit-learn, Pandas, and NumPy.",
    link: "https://github.com/rTorresro/StockSight",
    stack: ["Flask", "scikit-learn", "Pandas", "NumPy", "Alpha Vantage API"],
    outcomes: [
      "Built a live dashboard with real-time market data.",
      "Trained ML models to forecast next-day price movement."
    ]
  }
];
