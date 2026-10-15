# 🌿 Le Réconfort — Site du restaurant

Site vitrine du restaurant **Le Réconfort**, cuisine béninoise authentique (Paris 11e).
HTML / CSS / JavaScript vanilla, sans framework ni étape de build : le site fonctionne tel quel.

## Structure du projet

```
.
├── index.html              Page unique (one-page)
├── assets/
│   ├── favicon.svg
│   └── img/                Photos auto-hébergées (hero + galerie)
├── css/
│   ├── reset.css           Reset minimal + base accessibilité
│   ├── variables.css       Design tokens (couleurs, typographie, espacements)
│   ├── components.css      Composants (header, hero, menu, galerie, form, footer, lightbox)
│   └── responsive.css      Media queries mobile/tablette + prefers-reduced-motion + print
└── js/
    ├── main.js             Point d'entrée
    ├── data/
    │   └── menu.js         ★ Le menu (données statiques éditables)
    └── modules/
        ├── navigation.js   Menu mobile, header au scroll, ancres fluides
        ├── menuManager.js  Rendu du menu groupé par catégorie
        ├── gallery.js      Lightbox accessible (clavier, focus trap)
        └── reservation.js  Validation du formulaire + ouverture du mail pré-rempli
```

## Modifier le menu

Tout le menu est dans **`js/data/menu.js`** : ouvrez le fichier, éditez les lignes,
enregistrez. Aucun service externe, aucune clé API.

Chaque plat :

```js
{
  categorie: "Plats traditionnels",  // groupe d'affichage
  nom: "Poulet bicyclette",
  description: "Poulet fermier mariné aux épices…",
  prix: 14.5,                        // nombre uniquement
  devise: "€",
  disponible: true,                  // false → le plat n'apparaît pas
  allergenes: "",                    // séparés par des virgules : "Arachides, Gluten"
  epice: 2,                          // 0 à 3 (🔥)
  photo_url: "",                     // optionnel : URL d'image du plat
}
```

## Réservation

Le formulaire ne passe par **aucun serveur tiers** : à la validation, il ouvre le
logiciel de messagerie du visiteur avec la demande pré-remplie, envoyée à
`contact@lereconfort.fr` (adresse à changer dans `js/modules/reservation.js`,
constante `RECIPIENT`).

Un champ invisible (honeypot) filtre les robots.

## Lancer le site en local

Les scripts sont chargés en classique (`<script defer>`), pas en modules ES :
le site fonctionne donc **en ouvrant `index.html` directement** (double-clic),
sans serveur.

Un serveur local reste utile pour éviter les éventuelles restrictions du
navigateur :

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Déploiement

Site statique : compatible GitHub Pages, Netlify, Vercel ou Cloudflare Pages
sans aucune configuration.

## TODO avant mise en ligne réelle

- [ ] Remplacer l'adresse, le téléphone et l'email fictifs (index.html + reservation.js)
- [ ] Remplacer les photos `assets/img/` par les vraies photos du restaurant
- [ ] Renseigner les vrais liens réseaux sociaux (le footer n'en affiche plus)
- [ ] Mettre à jour les horaires et le JSON-LD si besoin
