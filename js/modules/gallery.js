// Lightbox accessible pour la galerie (le lazy-loading est géré nativement par loading="lazy")

window.GalleryManager = class GalleryManager {
  constructor() {
    this.items = document.querySelectorAll(".gallery-item");
    this.modal = null;
    this.lastFocused = null;
    this.init();
  }

  init() {
    this.items.forEach((item) => {
      // Rendre chaque vignette activable au clavier
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute(
        "aria-label",
        `Agrandir la photo : ${item.querySelector("figcaption")?.textContent || ""}`,
      );

      item.addEventListener("click", () => this.openLightbox(item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openLightbox(item);
        }
      });
    });
  }

  openLightbox(item) {
    const img = item.querySelector("img");
    const src = img.getAttribute("src");
    const caption = item.querySelector("figcaption")?.textContent || "";

    if (!this.modal) {
      this.modal = document.createElement("div");
      this.modal.className = "lightbox-modal";
      this.modal.setAttribute("role", "dialog");
      this.modal.setAttribute("aria-modal", "true");
      this.modal.setAttribute("aria-label", "Photo en grand");
      this.modal.innerHTML = `
                <div class="lightbox-overlay"></div>
                <button class="lightbox-close" aria-label="Fermer">×</button>
                <div class="lightbox-content">
                    <img src="" alt="">
                    <p class="lightbox-caption"></p>
                </div>
            `;
      document.body.appendChild(this.modal);

      this.modal
        .querySelector(".lightbox-close")
        .addEventListener("click", () => this.closeLightbox());
      this.modal
        .querySelector(".lightbox-overlay")
        .addEventListener("click", () => this.closeLightbox());
      document.addEventListener("keydown", (e) => this.handleKeydown(e));
    }

    // Injecter contenu
    const modalImg = this.modal.querySelector("img");
    modalImg.src = src;
    modalImg.alt = caption;
    this.modal.querySelector(".lightbox-caption").textContent = caption;

    // Afficher + garder une trace de l'élément à restituer
    this.lastFocused = document.activeElement;
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    this.modal.querySelector(".lightbox-close").focus();

    requestAnimationFrame(() => {
      this.modal.classList.add("active");
    });
  }

  handleKeydown(e) {
    if (this.modal.style.display !== "flex") return;

    if (e.key === "Escape") {
      this.closeLightbox();
      return;
    }

    // Piège au clavier : on ne peut tabuler qu'à l'intérieur de la lightbox
    if (e.key === "Tab") {
      const focusables = this.modal.querySelectorAll("button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  closeLightbox() {
    if (!this.modal || this.modal.style.display !== "flex") return;
    this.modal.classList.remove("active");
    setTimeout(() => {
      this.modal.style.display = "none";
      document.body.style.overflow = "";
      if (this.lastFocused) this.lastFocused.focus();
    }, 300);
  }
}
