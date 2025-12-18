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

  // Handle contact form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const statusDiv = document.getElementById("form-status");
      const submitButton = contactForm.querySelector(".contact-button");
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      statusDiv.textContent = "";
      statusDiv.className = "form-status";
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Submit to Formspree
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          statusDiv.textContent = "Message sent successfully!";
          statusDiv.className = "form-status success";
          contactForm.reset();
        } else {
          return response.json().then(data => {
            if (data.error) {
              throw new Error(data.error);
            } else {
              throw new Error("Something went wrong. Please try again.");
            }
          });
        }
      })
      .catch(error => {
        statusDiv.textContent = error.message || "Failed to send message. Please try again.";
        statusDiv.className = "form-status error";
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Send";
      });
    });
  }
});


