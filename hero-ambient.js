// HERO AMBIENT WORDS (copy/paste all of this)

const words = [
    "UX", "ACCESSIBILITY", "DESIGN", "RESEARCH", "SYSTEMS",
    "INTERFACES", "HUMAN", "FLOW", "STRATEGY", "EMPATHY", "AI", "BLockchain"
  ].map(e => e.toUpperCase());
  
  const container = document.getElementById("hero-bg");
  if (!container) {
    console.warn("hero-bg not found. Make sure you have <div id='hero-bg'></div> in your hero.");
  } else {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    if (!prefersReducedMotion) {
      let mouseX = 0;
      let mouseY = 0;
  
      // Create and place the words
      function spawnWords() {
        container.innerHTML = ""; // clear existing words
  
        const rect = container.getBoundingClientRect();
  
        words.forEach((word) => {
          const el = document.createElement("div");
          el.className = "ambient-word";
          el.textContent = word;
  
          // Spawn across the full container area (in px)
          const spreadX = rect.width * 0.9;   // how wide the cloud is
          const spreadY = rect.height * 0.9;  // how tall the cloud is
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const x = centerX + (Math.random() - 0.5) * spreadX;
          const y = centerY + (Math.random() - 0.5) * spreadY;
  
          const depth = 0.2 + Math.random() * 0.8; // parallax strength
          const drift = 0.2 + Math.random() * 0.8; // optional future use (kept for flexibility)
  
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
  
          el.dataset.depth = depth;
          el.dataset.drift = drift;
  
          container.appendChild(el);
        });
      }
  
      spawnWords();
  
      // Mouse origin centered
      document.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.6) * 55;
        mouseY = (e.clientY / window.innerHeight - 0.6) * 55;
      });
  
      // Animate parallax
      function animate() {
        const els = container.querySelectorAll(".ambient-word");
  
        els.forEach((el) => {
          const depth = parseFloat(el.dataset.depth) || 0.5;
  
          const x = mouseX * depth;
          const y = mouseY * depth;
  
          el.style.transform = `translate(${x}px, ${y}px)`;
        });
  
        requestAnimationFrame(animate);
      }
  
      animate();
  
      // Re-spawn on resize so distribution stays full-width
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(spawnWords, 150);
      });
    }
  }
  
  (() => {
    const toggle = document.querySelector(".nav-toggle");
    const overlay = document.querySelector(".nav-overlay");
    const body = document.body;
  
    if (!toggle || !overlay) return;
  
    const openMenu = () => {
      body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
    };
  
    const closeMenu = () => {
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };
  
    toggle.addEventListener("click", () => {
      body.classList.contains("nav-open") ? closeMenu() : openMenu();
    });
  
    overlay.addEventListener("click", closeMenu);
  
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMenu();
    });
  
    document.querySelectorAll(".mobile-nav a").forEach(link =>
      link.addEventListener("click", closeMenu)
    );
  })();
  