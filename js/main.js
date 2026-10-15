// Point d'entrée principal
// Script classique chargé en dernier (voir index.html) : les classes sont
// définies sur window par les fichiers js/modules/*.js, chargés avant celui-ci.

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation
  new window.Navigation();

  // 2. Menu (données locales : js/data/menu.js)
  new window.MenuManager().init();

  // 3. Réservation
  new window.ReservationManager();

  // 4. Galerie
  new window.GalleryManager();

  // 5. Theme toggle
  new window.ThemeToggle();

  // Animation au scroll pour sections
  initScrollAnimations();
});

function initScrollAnimations() {
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

  document
    .querySelectorAll(".section-header, .infos-content, .reservation-content")
    .forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
}
