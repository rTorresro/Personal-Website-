document.addEventListener("DOMContentLoaded", function () {
  const lines = document.querySelectorAll(".terminal-line");
  const typingSpeed = 40; // milliseconds per character
  let currentLine = 0;

  function typeLine() {
    if (currentLine >= lines.length) {
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

  typeLine();
});


