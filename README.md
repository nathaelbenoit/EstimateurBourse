# MesCalculateurs

**MesCalculateurs** est une application web gratuite regroupant une collection d'outils de calcul pratiques pour le quotidien. Tous les calculs sont effectués localement dans le navigateur — aucune donnée n'est envoyée ou stockée sur un serveur.

> [mescalculs sur GitHub Pages](https://nathaelbenoit.github.io/mescalculs/)

---

## Fonctionnalites

| Outil | Description |
|-------|-------------|
| **Vitesse / Allure** | Convertisseur km/h ↔ min/km ↔ min/mile avec estimation des temps de course (5K, 10K, semi, marathon) |
| **Salaire Net ↔ Brut** | Calcul du salaire net ou brut selon le statut (non-cadre, cadre, fonction publique) avec les taux de cotisations francais |
| **Simulateur DCA** | Simulation d'investissement programmé (Dollar Cost Averaging) avec graphique interactif et niveaux de volatilité |
| **Interets Composes** | Calculateur de croissance d'un capital avec contributions mensuelles, taux d'intéret et fréquence de capitalisation |
| **Convertisseur de Devises** | Conversion entre 10 devises majeures (EUR, USD, GBP, CHF, JPY, CAD, AUD, CNY, INR, BRL) |
| **Calculateur IMC** | Calcul de l'Indice de Masse Corporelle avec classification OMS et indicateur visuel |
| **Calculateur TVA** | Calcul HT ↔ TTC avec les 4 taux de TVA francais (20%, 10%, 5.5%, 2.1%) + taux personnalisé |

---

## Principes

- **Gratuit et sans pub** — Interface epuree, aucune publicité
- **Respect de la vie privee** — 100% client-side, aucune donnee collectee
- **Calculs instantanes** — Resultats en temps reel a chaque saisie
- **Responsive** — Adapte mobile, tablette et desktop

---

## Technologies

- **HTML5 / CSS3 / JavaScript** (vanilla, aucun framework)
- **Chart.js** pour les graphiques interactifs (DCA, interets composes)
- **CSS Custom Properties** pour le theming
- Aucune dependance npm, aucun build tool

---

## Structure du projet

```
mescalculs/
├── index.html                 # Page d'accueil avec grille des outils
├── styles.css                 # Feuille de style partagee
├── vitesse-allure.html        # Convertisseur vitesse/allure
├── salaire.html               # Calculateur salaire net/brut
├── dca.html                   # Simulateur DCA
├── interets-composes.html     # Calculateur interets composes
├── devises.html               # Convertisseur de devises
├── imc.html                   # Calculateur IMC
└── tva.html                   # Calculateur TVA
```

---

## Lancer le projet

Le projet etant 100% statique, il suffit d'ouvrir `index.html` dans un navigateur ou d'utiliser un serveur local :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (npx)
npx serve .

# Avec l'extension VS Code Live Server
# Clic droit sur index.html → "Open with Live Server"
```

---

## Charte graphique

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--primary` | `#4F633D` | Couleur principale (vert) |
| `--secondary` | `#8BA194` | Couleur secondaire (sauge) |
| `--background` | `#FFF7E2` | Fond de page (creme) |
| `--text` | `#2d3a24` | Texte principal |
| `--accent` | `#D4A24E` | Accent (dore) |

---

## Contribution

Les contributions sont les bienvenues. Pour proposer un nouvel outil ou corriger un bug :

1. Fork le depot
2. Creer une branche (`git checkout -b feature/mon-outil`)
3. Commit les changements (`git commit -m "Ajout de mon outil"`)
4. Push la branche (`git push origin feature/mon-outil`)
5. Ouvrir une Pull Request

---

## Licence

© 2026 MesCalculateurs — Tous droits reserves.

---

*Fait avec passion pour simplifier les calculs du quotidien.*
