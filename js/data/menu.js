// Menu du restaurant — données statiques éditables directement ici.
// Chaque plat : categorie, nom, description, prix (nombre), devise,
// disponible (true/false), allergenes (chaîne séparée par des virgules), epice (0 à 3).

window.MENU_ITEMS = [
  // ── Entrées ──────────────────────────────────────────────
  {
    categorie: "Entrées",
    nom: "Accra de haricot",
    description:
      "Beignets de haricot noir, croustillants à souhait, servis avec une sauce tomate pimentée maison.",
    prix: 5,
    devise: "€",
    disponible: true,
    allergenes: "Gluten",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "Entrées",
    nom: "Kuli-kuli croustillant",
    description:
      "Bâtonnets de pâte de cacahuète grillés au sésame, le casse-croûte de rue béninois par excellence.",
    prix: 4.5,
    devise: "€",
    disponible: true,
    allergenes: "Arachides, Sésame",
    epice: 0,
    photo_url: "",
  },
  {
    categorie: "Entrées",
    nom: "Aloco épicé",
    description:
      "Bananes plantain bien mûres frites until dorées, relevées d'une pointe de piment et de citron vert.",
    prix: 5.5,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "Entrées",
    nom: "Beignets de crevette",
    description:
      "Croustillants de crevettes entières et oignons, sauce gingembre fraîche au citron.",
    prix: 6.5,
    devise: "€",
    disponible: true,
    allergenes: "Crustacés, Gluten",
    epice: 1,
    photo_url: "",
  },

  // ── Plats traditionnels ──────────────────────────────────
  {
    categorie: "Plats traditionnels",
    nom: "Poulet bicyclette",
    description:
      "Poulet fermier mariné aux épices puis braisé au feu de bois, servi avec attiéké et sauce piment.",
    prix: 14.5,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 2,
    photo_url: "",
  },
  {
    categorie: "Plats traditionnels",
    nom: "Sauce arachide bœuf",
    description:
      "Ragoût onctueux de cacahuète et bœuf mijoté, accompagné de riz blanc ou de patate douce.",
    prix: 13.5,
    devise: "€",
    disponible: true,
    allergenes: "Arachides",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "Plats traditionnels",
    nom: "Gboma dessi",
    description:
      "Épinards fondants à l'huile de palme, crevettes séchées et poisson frit — la recette des grandes occasions.",
    prix: 12.5,
    devise: "€",
    disponible: true,
    allergenes: "Poisson, Crustacés",
    epice: 2,
    photo_url: "",
  },
  {
    categorie: "Plats traditionnels",
    nom: "Riz djollof",
    description:
      "Riz mijoté à la tomate et aux légumes de saison, poulet braisé effiloché, croquant d'oignons.",
    prix: 12,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "Plats traditionnels",
    nom: "Poisson braisé du golfe",
    description:
      "Bar entier du golfe de Guinée, farci aux herbes, sauce claire pimentée et attiéké frais.",
    prix: 16,
    devise: "€",
    disponible: true,
    allergenes: "Poisson",
    epice: 2,
    photo_url: "",
  },
  {
    categorie: "Plats traditionnels",
    nom: "Igname pilée sauce graine",
    description:
      "Fufu d'igname soyeux et sauce graine onctueuse au poisson frit, un classique du Sud-Bénin.",
    prix: 12.5,
    devise: "€",
    disponible: true,
    allergenes: "Poisson",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "Plats traditionnels",
    nom: "Sakpate poulet",
    description:
      "Sauce gombo fondante mijotée au poulet, tomates et poivrons, servie avec riz ou igname.",
    prix: 11.5,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 1,
    photo_url: "",
  },

  // ── La carte moderne ─────────────────────────────────────
  {
    categorie: "La carte moderne",
    nom: "Burger braisé",
    description:
      "Steak de bœuf grillé, chutney mangue-piment, salade croquante et alloco dans un pain brioché maison.",
    prix: 15,
    devise: "€",
    disponible: true,
    allergenes: "Gluten, Œuf",
    epice: 2,
    photo_url: "",
  },
  {
    categorie: "La carte moderne",
    nom: "Bowl djollof",
    description:
      "Riz djollof, poulet grillé effiloché, avocat, œuf mollet et graines croquantes — le déjeuner complet.",
    prix: 14,
    devise: "€",
    disponible: true,
    allergenes: "Œuf",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "La carte moderne",
    nom: "Brochettes laquées miel-piment",
    description:
      "Brochettes de bœuf laquées au miel de palme, nappées d'une sauce arachide onctueuse.",
    prix: 13.5,
    devise: "€",
    disponible: true,
    allergenes: "Arachides",
    epice: 2,
    photo_url: "",
  },
  {
    categorie: "La carte moderne",
    nom: "Salade tropicale",
    description:
      "Mangue, crevettes sautées, roquette et avocat, vinaigrette fraîche au gingembre.",
    prix: 12.5,
    devise: "€",
    disponible: true,
    allergenes: "Crustacés",
    epice: 0,
    photo_url: "",
  },

  // ── Desserts ─────────────────────────────────────────────
  {
    categorie: "Desserts",
    nom: "Dégué",
    description:
      "Crémeux de mil et lait caillé parfumé à la muscade, servi bien frais.",
    prix: 5,
    devise: "€",
    disponible: true,
    allergenes: "Lait, Gluten",
    epice: 0,
    photo_url: "",
  },
  {
    categorie: "Desserts",
    nom: "Beignets de banane plantain",
    description:
      "Beignets moelleux nappés de miel de palme, une douceur du soir béninoise.",
    prix: 5.5,
    devise: "€",
    disponible: true,
    allergenes: "Gluten",
    epice: 0,
    photo_url: "",
  },
  {
    categorie: "Desserts",
    nom: "Salade de fruits tropicaux",
    description:
      "Mangue, ananas et fruit de la passion de saison, sans sucre ajouté.",
    prix: 5,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 0,
    photo_url: "",
  },

  // ── Boissons ─────────────────────────────────────────────
  {
    categorie: "Boissons",
    nom: "Bissap maison",
    description: "Infusion d'hibiscus fraîche, menthe et pointe de gingembre.",
    prix: 4,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 0,
    photo_url: "",
  },
  {
    categorie: "Boissons",
    nom: "Gingembre frais pressé",
    description: "Jus de gingembre pressé à la commande, corsé et revigorant.",
    prix: 4,
    devise: "€",
    disponible: true,
    allergenes: "",
    epice: 1,
    photo_url: "",
  },
  {
    categorie: "Boissons",
    nom: "Jus de bouye",
    description:
      "Boisson onctueuse à base de fruits du baobab, lait et vanille.",
    prix: 4.5,
    devise: "€",
    disponible: true,
    allergenes: "Lait",
    epice: 0,
    photo_url: "",
  },
  {
    categorie: "Boissons",
    nom: "Tchoukoutou",
    description:
      "Bière de mil artisanale, légère et acidulée, brassée en petits lots.",
    prix: 4,
    devise: "€",
    disponible: true,
    allergenes: "Gluten",
    epice: 0,
    photo_url: "",
  },
];
