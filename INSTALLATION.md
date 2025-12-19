# Guide d'Installation - Portfolio Emmanuel Korekou

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

## Installation Rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# Le site sera accessible sur http://localhost:3000
```

## Commandes Disponibles

- `npm run dev` - Lance le serveur de développement avec hot-reload
- `npm run build` - Crée une version optimisée pour la production dans le dossier `dist`
- `npm run preview` - Prévisualise la version de production localement

## Structure du Projet

```
portofolio/
├── src/
│   ├── components/          # Composants Vue.js
│   │   ├── Header.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── TestimonialsSection.vue
│   │   ├── ContactSection.vue
│   │   └── FeatureBubble.vue
│   ├── App.vue              # Composant principal
│   ├── main.js              # Point d'entrée
│   └── style.css            # Styles globaux
├── index.html               # HTML principal
├── package.json             # Dépendances
├── vite.config.js          # Configuration Vite
└── README.md               # Documentation
```

## Personnalisation

### Modifier les Informations Personnelles

1. **HeroSection.vue** - Modifier le titre, description et statistiques
2. **AboutSection.vue** - Mettre à jour la biographie
3. **ExperienceSection.vue** - Ajouter/modifier les expériences dans le tableau `experiences`
4. **ProjectsSection.vue** - Modifier les projets dans le tableau `projects`
5. **SkillsSection.vue** - Ajuster les compétences et certifications
6. **ContactSection.vue** - Mettre à jour les informations de contact

### Modifier les Couleurs

Les couleurs principales sont définies dans `src/style.css` via les variables CSS :

```css
:root {
  --primary-purple: #8B7EC8;
  --primary-teal: #4ECDC4;
  --dark-gray: #2D3748;
  --light-gray: #718096;
}
```

## Déploiement

### Vercel

1. Installer Vercel CLI : `npm i -g vercel`
2. Dans le dossier du projet : `vercel`
3. Suivre les instructions

### Netlify

1. Build le projet : `npm run build`
2. Glisser-déposer le dossier `dist` sur Netlify
3. Ou connecter votre repository GitHub

### GitHub Pages

1. Build le projet : `npm run build`
2. Configurer GitHub Pages pour servir le dossier `dist`
3. Ou utiliser l'action GitHub Pages

## Support

Pour toute question, contactez : emmanuelgbra88@gmail.com
