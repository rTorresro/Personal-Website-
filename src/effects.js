function setupPortfolioEffects() {
  document.body.classList.add("terminal-active");
  const lines = document.querySelectorAll(".terminal-line");
  const typingSpeed = 40;
  let currentLine = 0;

  initializeEffects();

  function typeLine() {
    if (currentLine >= lines.length) {
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
        setTimeout(typeLine, 600);
      }
    }, typingSpeed);
  }

  function revealContent() {
    document.body.classList.remove("terminal-active");

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

    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("show");
    }

    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("show");
        section.classList.add("parallax");
      }, index * 150);
    });

    setTimeout(() => {
      animateSkillBars();
    }, 2000);
  }

  typeLine();

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const statusDiv = document.getElementById("form-status");
      const submitButton = contactForm.querySelector(".contact-button");

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      statusDiv.textContent = "";
      statusDiv.className = "form-status";

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then((response) => {
          if (response.ok) {
            statusDiv.textContent = "Message sent successfully!";
            statusDiv.className = "form-status success";
            contactForm.reset();
          } else {
            return response.json().then((data) => {
              if (data.error) {
                throw new Error(data.error);
              } else {
                throw new Error("Something went wrong. Please try again.");
              }
            });
          }
        })
        .catch((error) => {
          statusDiv.textContent =
            error.message || "Failed to send message. Please try again.";
          statusDiv.className = "form-status error";
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Send";
        });
    });
  }

  function initializeEffects() {
    setTimeout(() => {
      setupScrollProgress();
      setupCursorTrail();
      setupParallax();
      setupNavbarActive();
      setupScrollToTop();
      setupTextReveal();
      setupSectionDividers();
      setupAnimatedName();
      setupCodeEditorBackground();
      document.body.classList.add("show-cursor-trail");
    }, 4000);
  }

  function setupScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    function updateProgress() {
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();
  }

  function setupCursorTrail() {
    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    document.body.appendChild(cursorDot);

    const trails = [];
    let trailIndex = 0;
    let mouseX = 0;
    let mouseY = 0;

    for (let i = 0; i < 8; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.opacity = "0";
      document.body.appendChild(trail);
      trails.push(trail);
    }

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX - 3 + "px";
      cursorDot.style.top = mouseY - 3 + "px";

      const trail = trails[trailIndex];
      trail.style.left = mouseX - 5 + "px";
      trail.style.top = mouseY - 5 + "px";
      trail.style.opacity = "0.5";

      setTimeout(() => {
        trail.style.opacity = "0";
      }, 300);

      trailIndex = (trailIndex + 1) % trails.length;
    });
  }

  function setupParallax() {
    const sections = document.querySelectorAll("section.parallax");
    let ticking = false;

    function updateParallax() {
      sections.forEach((section, index) => {
        if (!section.classList.contains("show")) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = sectionCenter - windowCenter;

        const speed = 0.1 + index * 0.03;
        const yPos = distanceFromCenter * speed;

        if (rect.bottom > 0 && rect.top < windowHeight) {
          section.style.transform = `translateY(${yPos}px)`;
        } else {
          section.style.transform = "translateY(0)";
        }
      });

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });

    updateParallax();
  }

  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress-bar");

    skillBars.forEach((bar) => {
      const skillLevel = bar.getAttribute("data-skill");
      if (skillLevel) {
        bar.style.width = "0%";

        setTimeout(() => {
          bar.style.width = skillLevel + "%";
        }, 100);
      }
    });
  }

  function setupNavbarActive() {
    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("section");
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const targetPosition = targetSection.offsetTop - navbarHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      });
    });

    function updateActiveNav() {
      let current = "";
      const scrollPosition = window.pageYOffset + navbarHeight + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();
  }

  function setupScrollToTop() {
    const scrollButton = document.getElementById("scroll-to-top");
    if (!scrollButton) return;

    function toggleButton() {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add("visible");
      } else {
        scrollButton.classList.remove("visible");
      }
    }

    scrollButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", toggleButton);
    toggleButton();
  }

  function setupTextReveal() {
    const revealElements = document.querySelectorAll(".reveal-text");

    function checkReveal() {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("revealed");
        }
      });
    }

    window.addEventListener("scroll", checkReveal);
    checkReveal();
  }

  function setupSectionDividers() {
    const dividers = document.querySelectorAll(".section-divider");

    function checkDividers() {
      dividers.forEach((divider) => {
        const dividerTop = divider.getBoundingClientRect().top;

        if (dividerTop < window.innerHeight - 100) {
          divider.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", checkDividers);
    checkDividers();
  }

  function setupAnimatedName() {
    const nameContainer = document.querySelector(".animated-name-container");
    if (!nameContainer) return;

    let hasAnimated = false;

    function checkAnimatedName() {
      if (hasAnimated) return;

      const containerTop = nameContainer.getBoundingClientRect().top;
      const containerVisible = 200;

      if (containerTop < window.innerHeight - containerVisible) {
        nameContainer.classList.add("animate");
        hasAnimated = true;
      }
    }

    window.addEventListener("scroll", checkAnimatedName);
    checkAnimatedName();
  }

  function setupCodeEditorBackground() {
    const codeEditor = document.querySelector(".code-editor-background");
    if (!codeEditor) return;

    let hasShown = false;

    function checkCodeEditor() {
      if (hasShown) return;

      const editorTop = codeEditor.getBoundingClientRect().top;
      const editorVisible = 300;

      if (editorTop < window.innerHeight - editorVisible) {
        codeEditor.classList.add("visible");
        hasShown = true;
      }
    }

    window.addEventListener("scroll", checkCodeEditor);
    checkCodeEditor();
  }
}
