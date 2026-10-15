// Gestion du toggle dark/light mode
// Le thème est appliqué via l'attribut data-theme sur <html> (voir css/variables.css).
// La préférence est enregistrée dans localStorage ; sans choix explicite,
// la préférence système est suivie. Un script inline dans index.html applique
// déjà le thème avant le premier rendu, ce module assure la cohérence de
// l'icône et la gestion du clic.

window.ThemeToggle = class ThemeToggle {
  constructor() {
    this.toggle = document.getElementById("theme-toggle");
    this.icon = this.toggle?.querySelector(".theme-icon");
    if (this.toggle) {
      this.init();
    }
  }

  init() {
    // 1. Icône cohérente avec le thème déjà appliqué au chargement
    this.updateIcon(this.getTheme());

    // 2. Clic sur le toggle
    this.toggle.addEventListener("click", () => this.toggleTheme());

    // 3. Suivre la préférence système tant qu'aucun choix explicite n'a été fait
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (!this.getSavedTheme()) {
          this.setTheme(event.matches ? "dark" : "light");
        }
      });
  }

  getTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  }

  getSavedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null; // Stockage indisponible
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.updateIcon(theme);
  }

  toggleTheme() {
    const theme = this.getTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* Stockage indisponible : le thème s'applique malgré tout */
    }
    this.setTheme(theme);
  }

  updateIcon(theme) {
    if (this.icon) {
      this.icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }
};
