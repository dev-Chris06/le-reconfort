// Rendu du menu à partir des données locales (js/data/menu.js)
// Usage: new MenuManager().init()
// Script classique (compatible file://) : la classe est exposée sur window.

window.MenuManager = class MenuManager {
  constructor(items = window.MENU_ITEMS, options = {}) {
    this.items = Array.isArray(items) ? items : [];
    this.container = document.getElementById(
      options.containerId || "menu-container",
    );
    this.currencyFormatter = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  }

  init() {
    if (!this.container) {
      console.error("Container menu introuvable");
      return;
    }

    const availableItems = this.items.filter((item) => item.disponible !== false);
    this.render(availableItems);
  }

  groupByCategory(data) {
    return data.reduce((acc, item) => {
      const cat = item.categorie || item.category || "Autres";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});
  }

  render(data) {
    if (!data || data.length === 0) {
      this.container.innerHTML =
        '<p class="empty-state">Menu momentanément indisponible</p>';
      return;
    }

    const grouped = this.groupByCategory(data);

    let html = "";
    for (const [category, items] of Object.entries(grouped)) {
      html += `
                <section class="menu-category" data-category="${this.escapeHtml(category)}">
                    <h3 class="category-title">${this.escapeHtml(category)}</h3>
                    <div class="menu-grid">
                        ${items.map((item) => this.renderItem(item)).join("")}
                    </div>
                </section>
            `;
    }

    this.container.innerHTML = html;
    this.animateItems();
  }

  formatPrice(value, devise = "€") {
    const price = Number(value);
    if (!Number.isFinite(price)) return "";
    return devise === "€" ? this.currencyFormatter.format(price) : `${price} ${devise}`;
  }

  renderItem(item) {
    const spicyIcons = "🔥".repeat(
      Math.min(Math.max(parseInt(item.epice, 10) || 0, 0), 3),
    );
    const allergens = item.allergenes || item.allergies || "";
    const allergenTags = allergens
      ? allergens
          .split(",")
          .map(
            (a) => `<span class="allergen">${this.escapeHtml(a.trim())}</span>`,
          )
          .join("")
      : "";

    const imageHtml =
      item.photo_url || item.image
        ? `<div class="menu-item-image" style="background-image: url('${this.escapeHtml(item.photo_url || item.image)}')" role="img" aria-label="${this.escapeHtml(item.nom)}"></div>`
        : `<div class="menu-item-image"><div class="no-image" aria-hidden="true">🍽️</div></div>`;

    return `
            <article class="menu-item" data-id="${this.escapeHtml(item.nom)}">
                ${imageHtml}
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h4 class="menu-item-name">${this.escapeHtml(item.nom)}${spicyIcons ? ` <span class="spicy" aria-label="Niveau de piquant">${spicyIcons}</span>` : ""}</h4>
                        <span class="price">${this.formatPrice(item.prix, item.devise)}</span>
                    </div>
                    <p class="description">${this.escapeHtml(item.description || "")}</p>
                    ${allergenTags ? `<div class="allergens">${allergenTags}</div>` : ""}
                </div>
            </article>
        `;
  }

  animateItems() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".menu-item").forEach((item, index) => {
      item.classList.add("reveal");
      item.style.transitionDelay = `${Math.min(index * 50, 400)}ms`;
      observer.observe(item);
    });
  }

  // Échappement HTML, y compris les guillemets (utilisé dans des attributs)
  escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
}
