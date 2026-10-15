// Gestion de la navigation mobile et scroll

window.Navigation = class Navigation {
  constructor() {
    this.header = document.getElementById("header");
    this.toggle = document.getElementById("menu-toggle");
    this.nav = document.getElementById("main-nav");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.lastScroll = 0;

    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.toggle && this.nav) {
      this.toggle.addEventListener("click", () => this.toggleMenu());

      // Fermer menu au clic sur un lien
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => this.closeMenu());
      });

      // Fermer au clic extérieur
      document.addEventListener("click", (e) => {
        if (
          this.nav.classList.contains("active") &&
          !this.nav.contains(e.target) &&
          !this.toggle.contains(e.target)
        ) {
          this.closeMenu();
        }
      });

      // Fermer avec Échap et rendre focus au bouton
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.nav.classList.contains("active")) {
          this.closeMenu();
          this.toggle.focus();
        }
      });

      // Réinitialiser à l'ouverture d'un grand écran (sinon le scroll reste bloqué)
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && this.nav.classList.contains("active")) {
          this.closeMenu();
        }
      });
    }

    // Scroll behavior
    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });

    // Smooth scroll pour ancres
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  toggleMenu() {
    const isOpen = this.nav.classList.contains("active");
    if (isOpen) {
      this.closeMenu();
    } else {
      this.toggle.setAttribute("aria-expanded", "true");
      this.toggle.setAttribute("aria-label", "Fermer le menu");
      this.nav.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeMenu() {
    if (!this.nav.classList.contains("active")) return;
    this.toggle.setAttribute("aria-expanded", "false");
    this.toggle.setAttribute("aria-label", "Ouvrir le menu");
    this.nav.classList.remove("active");
    document.body.style.overflow = "";
  }

  handleScroll() {
    const currentScroll = window.scrollY;

    // Header style au scroll
    if (currentScroll > 50) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }

    // Cacher/montrer header sur mobile en scrollant
    if (window.innerWidth <= 768) {
      if (currentScroll > this.lastScroll && currentScroll > 100) {
        this.header.classList.add("nav-hidden");
      } else {
        this.header.classList.remove("nav-hidden");
      }
    } else {
      this.header.classList.remove("nav-hidden");
    }

    this.lastScroll = currentScroll;
  }
}
