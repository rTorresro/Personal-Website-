document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("terminal-active");
  
  const lines = document.querySelectorAll(".terminal-line");
  const typingSpeed = 40; // milliseconds per character
  let currentLine = 0;

  function typeLine() {
    if (currentLine >= lines.length) {
      // Terminal animation finished - reveal content
      setTimeout(revealContent, 500);
      return;
    }

    const element = lines[currentLine];
    const text = element.getAttribute("data-text");
    let index = 0;

    const intervalId = setInterval(function () {
      element.textContent += text.charAt(index);
      index++;

      if (index === text.length) {
        clearInterval(intervalId);
        currentLine++;
        setTimeout(typeLine, 600); // pause before next line
      }
    }, typingSpeed);
  }

  function revealContent() {
    // Remove terminal-active class to restore body padding
    document.body.classList.remove("terminal-active");
    
    // Hide terminal after a brief moment
    setTimeout(() => {
      const terminal = document.getElementById("terminal-hero");
      if (terminal) {
        terminal.style.opacity = "0";
        terminal.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => {
          terminal.style.display = "none";
        }, 500);
      }
    }, 300);

    // Show navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("show");
    }

    // Show all sections with slight delay between each
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("show");
      }, index * 150); // 150ms delay between each section
    });
  }

  typeLine();
});


