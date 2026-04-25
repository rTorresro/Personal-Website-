export const PARTICLES = Array.from({ length: 15 });

export const CODE_SNIPPETS = [
  "&lt;div&gt;hello world&lt;/div&gt;",
  "function dev() { }",
  "const code = 'awesome';",
  "import { skills } from './brain'",
  "npm install creativity"
];

export const TERMINAL_LINES = [
  "roger@dev-machine:~$ pwd",
  "/home/roger/portfolio",
  "roger@dev-machine:~$ ./start.sh",
  "Starting Roger.dev..."
];

export const METRICS = [
  { label: "Projects", value: "7" },
  { label: "Core Stacks", value: "3" },
  { label: "Years Building", value: "2+" }
];

export const NAME_LETTERS = Array.from("Roger Torres");

export const ABOUT_STATS = [
  { icon: "fas fa-map-marker-alt", value: "Pittsburgh, PA",            label: "Location"    },
  { icon: "fas fa-graduation-cap", value: "Univ. of Pittsburgh",       label: "University"  },
  { icon: "fas fa-laptop-code",    value: "CS Freshman",               label: "Major & Year"},
  { icon: "fas fa-folder-open",    value: "7 Projects",                label: "Built"       },
  { icon: "fas fa-code",           value: "2+ Years",                  label: "Coding"      },
  { icon: "fas fa-user",           value: "18",                        label: "Age"         }
];

export const ABOUT_PARTS = [
  {
    label: "building",
    text:
      "I'm a CS student at Pitt (December 2028). I build full-stack software focused on clean UI and real-world utility. I was selected as an incoming TA for sophomore year, freelanced for a local business building their web presence, and competed in and won a university coding competition."
  },
  {
    label: "outside of code",
    text:
      "I'm into films and TV (Mr. Robot, The Wire, The Sopranos), anime and manga (Berserk, Vinland Saga, Dragon Ball Z), gaming, basketball, lifting, learning piano, cycling around Pittsburgh, music (Frank Ocean, Elliott Smith, Yung Lean), and philosophy. I'm also fluent in Spanish."
  },
  {
    label: "goal",
    text:
      "I want to build software that solves real problems for real people, and I'm looking for opportunities to do that professionally."
  }
];

export const PORTFOLIO_NARRATIVE =
  "I design products that feel calm, intentional, and useful. My work blends clean UI with dependable backends, and I care most about clarity, performance, and solving real problems for real people.";

export const RESUME_SKILL_HIGHLIGHTS = [
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

export const SKILL_GROUPS = [
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

export const EXPERIENCE = [
  {
    title: "Undergraduate Teaching Assistant",
    org: "University of Pittsburgh",
    location: "Pittsburgh, PA",
    dates: "August 2026 – Present",
    bullets: [
      "Selected as an incoming TA for undergraduate CS instruction as a sophomore, supporting students through office hours, grading, and course material."
    ]
  },
  {
    title: "Freelance Web Developer",
    org: "Morning Day Care",
    location: "Allentown, PA",
    dates: "April 2026 – June 2026",
    bullets: [
      "Digitized enrollment for a local daycare by building a React + Tailwind CSS site with an online registration system, replacing a paper sign-up process.",
      "Gathered requirements directly from the business owner and iterated on design, delivering a responsive, mobile-friendly site on a 3-week timeline."
    ]
  }
];

export const EDUCATION = [
  {
    school: "University of Pittsburgh",
    location: "Pittsburgh, PA",
    dates: "Expected December 2028",
    detail: "Bachelor of Science in Computer Science",
    bullets: [
      "Relevant coursework: Data Structures & Algorithms, Computer Organization & Assembly Language, Mathematical Foundations of Machine Learning, Discrete Mathematics, Linear Algebra.",
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

export const CURRENTLY_BUILDING = {
  name: "Queued",
  detail: "Personalized watchlist platform"
};

export const RADAR_SKILLS = [
  { label: "Frontend", value: 88 },
  { label: "Backend", value: 78 },
  { label: "Data / ML", value: 68 },
  { label: "CS Core", value: 84 },
  { label: "DevTools", value: 74 },
  { label: "Databases", value: 64 }
];

export const PROJECTS = [
  {
    title: "KeyGuide",
    description:
      "A browser-based piano learning app with a 3-octave virtual keyboard, multiple practice modes, and a searchable song library with difficulty ratings. Built with Tone.js for audio synthesis and Web MIDI API support for real keyboard input.",
    stack: ["React", "TypeScript", "Tone.js", "Vite", "Tailwind CSS", "Python"]
  },
  {
    title: "Queued",
    description:
      "A personalized watchlist platform that organizes movies and shows with smart filters and viewing analytics. Built with a Node/Express backend and a React + TypeScript UI.",
    link: "https://github.com/rTorresro/Queued",
    status: "WIP",
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
