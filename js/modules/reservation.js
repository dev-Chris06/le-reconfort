// Gestion du formulaire de réservation
// Sans backend : la demande est préparée dans le logiciel de messagerie du visiteur (mailto).
// Un honeypot "entreprise" filtre les robots.

window.ReservationManager = class ReservationManager {
  constructor() {
    this.form = document.getElementById("reservation-form");
    this.statusDiv = document.getElementById("form-status");
    this.dateInput = document.getElementById("date");
    this.RECIPIENT = "contact@lereconfort.fr";

    this.init();
  }

  init() {
    if (!this.form) return;

    // Date minimale : aujourd'hui
    if (this.dateInput) {
      const today = new Date();
      // Format local (pas de toISOString qui est en UTC et peut décaler d'un jour)
      const min = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-");
      this.dateInput.setAttribute("min", min);
    }

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    this.form
      .querySelectorAll("input:not([type='hidden']), select, textarea")
      .forEach((field) => {
        field.addEventListener("blur", () => this.validateField(field));
      });
  }

  validateField(field) {
    if (field.name === "entreprise") return true; // honeypot

    const value = field.value.trim();
    let isValid = true;
    let message = "";

    switch (field.id) {
      case "telephone": {
        // Accepte les formats international (ex: +229 65 00 00 00, 06 12 34 56 78)
        const phoneRegex = /^\+?[0-9][0-9\s.()-]{6,19}$/;
        isValid = phoneRegex.test(value);
        message = "Veuillez entrer un numéro de téléphone valide";
        break;
      }
      case "email": {
        if (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailRegex.test(value);
          message = "Veuillez entrer un email valide";
        }
        break;
      }
      case "date": {
        if (value) {
          const [year, month, day] = value.split("-").map(Number);
          const selected = new Date(year, month - 1, day);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          isValid = selected >= today;
          message = "La date ne peut pas être dans le passé";
        }
        break;
      }
    }

    if (!isValid && value) {
      this.showFieldError(field, message);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    field.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");

    const error = document.createElement("span");
    error.className = "field-error";
    error.id = `${field.id}-error`;
    error.textContent = message;

    field.setAttribute("aria-describedby", error.id);
    field.insertAdjacentElement("afterend", error);
  }

  clearFieldError(field) {
    field.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");

    const error = field.parentNode.querySelector(".field-error");
    if (error) error.remove();
  }

  handleSubmit(e) {
    e.preventDefault();

    // Honeypot : champ invisible rempli uniquement par un robot → on ignore
    const honeypot = this.form.querySelector("[name='entreprise']");
    if (honeypot && honeypot.value) {
      this.showStatus("Votre demande a bien été envoyée.", "success");
      this.form.reset();
      return;
    }

    let isValid = true;
    this.form
      .querySelectorAll("input[required], select[required]")
      .forEach((field) => {
        if (!this.validateField(field) || !field.value) {
          isValid = false;
        }
      });

    if (!isValid) {
      this.showStatus("Veuillez corriger les erreurs ci-dessus", "error");
      return;
    }

    const data = new FormData(this.form);
    const subject = `Réservation - ${data.get("nom")} - ${data.get("date")}`;
    const lines = [
      `Nom : ${data.get("nom")}`,
      `Date : ${data.get("date")}`,
      `Heure : ${data.get("heure")}`,
      `Nombre de personnes : ${data.get("personnes")}`,
      `Téléphone : ${data.get("telephone")}`,
      `Email : ${data.get("email") || "non renseigné"}`,
      "",
      `Notes : ${data.get("notes") || "-"}`,
    ];

    const mailto = `mailto:${this.RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    this.showStatus(
      "Votre logiciel de messagerie va s'ouvrir : envoyez le mail pré-rempli pour confirmer votre demande. Nous vous recontacterons par téléphone.",
      "success",
    );

    window.location.href = mailto;
    this.form.reset();
  }

  showStatus(message, type) {
    this.statusDiv.textContent = message;
    this.statusDiv.className = `form-status ${type}`;
  }
}
