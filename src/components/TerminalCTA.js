const { useMemo, useState } = React;

function TerminalCTA({ onNavigate }) {
  const [lines, setLines] = useState([
    "Welcome to the fsociety terminal. Type 'help' to begin."
  ]);
  const [input, setInput] = useState("");

  const navCommands = {
    home: "home",
    aboutme: "about",
    resume: "resume",
    projects: "projects",
    contact: "contact"
  };

  const commands = useMemo(
    () => ({
      help: [
        "Available commands:",
        "- whoami",
        "- ls",
        "- ls projects",
        "- cat about.txt",
        "- contact",
        "- aboutme",
        "- resume",
        "- projects",
        "- home",
        "- clear"
      ],
      whoami: ["roger@fsociety: Full-stack developer + CS student."],
      ls: ["projects  about.txt  contact"],
      "ls projects": PROJECTS.map((project) => `- ${project.title}`),
      "cat about.txt": [ABOUT_TEXT],
      contact: [
        "Email: rogertorressa@gmail.com",
        "GitHub: github.com/rTorresro",
        "LinkedIn: linkedin.com/in/rogertorresro"
      ]
    }),
    []
  );

  const appendLines = (newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;

    appendLines([`roger@fsociety:~$ ${command}`]);

    if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (navCommands[command]) {
      appendLines([`Navigating to ${navCommands[command]}...`]);
      if (onNavigate) {
        onNavigate(navCommands[command]);
      }
      setInput("");
      return;
    }

    const response = commands[command] || [
      `Command not found: ${command}`,
      "Type 'help' to see available commands."
    ];
    appendLines(response);
    setInput("");
  };

  return (
    <div className="terminal-cta" aria-label="Interactive terminal">
      <div className="terminal-cta-header">
        <span className="terminal-cta-dot red"></span>
        <span className="terminal-cta-dot yellow"></span>
        <span className="terminal-cta-dot green"></span>
        <span className="terminal-cta-title">fsociety-terminal</span>
      </div>
      <div className="terminal-cta-body">
        {lines.map((line, index) => (
          <p className="terminal-cta-line" key={`terminal-line-${index}`}>
            {line}
          </p>
        ))}
        <form className="terminal-cta-form" onSubmit={handleSubmit}>
          <span className="terminal-cta-prompt">roger@fsociety:~$</span>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="terminal-cta-input"
            placeholder="type a command..."
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
