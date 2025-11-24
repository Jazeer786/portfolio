document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");
  const yearEl = document.getElementById("year");
  const contactForm = document.querySelector(".contact-form");
  const formHint = contactForm?.querySelector(".form-hint");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const renderIcons = () => {
    if (window.feather) {
      window.feather.replace();
    }
  };

  const setYear = () => {
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  };

  const setTheme = (theme, persist = true) => {
    body.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeToggle.innerHTML = `<i data-feather="${theme === "dark" ? "sun" : "moon"}"></i>`;
    }
    if (persist) {
      localStorage.setItem("preferred-theme", theme);
    }
    renderIcons();
  };

  const initTheme = () => {
    const stored = localStorage.getItem("preferred-theme");
    const initial = stored || (prefersDark.matches ? "dark" : "light");
    setTheme(initial, Boolean(stored));

    themeToggle?.addEventListener("click", () => {
      const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });

    if (prefersDark.addEventListener) {
      prefersDark.addEventListener("change", (event) => {
        if (!localStorage.getItem("preferred-theme")) {
          setTheme(event.matches ? "dark" : "light", false);
        }
      });
    }
  };

  const closeNav = () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  const initNavigation = () => {
    navToggle?.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        if (body.classList.contains("nav-open")) {
          closeNav();
        }
      }),
    );

    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape" && body.classList.contains("nav-open")) {
        closeNav();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeNav();
      }
    });
  };

  const initAnimations = () => {
    const animateTargets = document.querySelectorAll("[data-animate]");

    if (!animateTargets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animateTargets.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    animateTargets.forEach((el) => observer.observe(el));
  };

  const initForm = () => {
    if (!contactForm) return;
    const formStatus = document.getElementById("form-status");
    const defaultHint = formHint?.textContent || "";
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const showFormStatus = (message, state) => {
      if (!formStatus) return;
      formStatus.textContent = message;
      formStatus.dataset.state = state;
    };

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        formData.append("_captcha", "false");

        const response = await fetch("https://formspree.io/f/xanzqdkv", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showFormStatus("Message sent successfully! I'll get back to you soon.", "success");
          contactForm.reset();
          if (formHint) {
            formHint.textContent = defaultHint;
            formHint.classList.remove("error");
          }
        } else {
          showFormStatus("Sorry, there was an error sending your message. Please try again or email me directly.", "error");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        showFormStatus("Network error. Please check your connection and try again.", "error");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  };

  setYear();
  initTheme();
  initNavigation();
  initAnimations();
  initForm();
  renderIcons();
});

