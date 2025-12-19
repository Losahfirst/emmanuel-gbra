# Guide d'ajout des logos

## Logos des Institutions

Pour ajouter les vrais logos des écoles et entreprises, modifiez le fichier `src/components/InstitutionLogo.vue` :

```javascript
const logoMap = {
  'Eranove Academy': 'https://votre-url-logo-eranove.png',
  'DataCamp': 'https://cdn.simpleicons.org/datacamp/03EF62', // Déjà configuré
  'CIPREL': 'https://votre-url-logo-ciprel.png',
  'UTT LOKO': 'https://votre-url-logo-utt.png',
  'INOVATEC': 'https://votre-url-logo-inovatec.png'
}
```

### Où trouver les logos :

1. **Eranove Academy** : Contactez l'école ou cherchez sur leur site web
2. **CIPREL** : Site web officiel ou ressources d'entreprise
3. **UTT LOKO** : Site de l'université
4. **INOVATEC** : Site web de l'entreprise

### Options pour héberger les logos :

1. **Dossier public** : Créez un dossier `public/logos/` et placez-y les images
   - Utilisez : `/logos/eranove.png`
   
2. **CDN** : Utilisez un service comme Cloudinary, Imgur, ou GitHub
   
3. **Assets** : Placez dans `src/assets/logos/` et importez dans le composant

## Logos des Technologies

Les logos des technologies utilisent le CDN Simple Icons. Si une technologie n'a pas de logo, vous pouvez :

1. Ajouter l'URL dans `src/components/TechLogo.vue` dans le `logoMap`
2. Utiliser un autre CDN de logos (devicons, etc.)
3. Créer un logo personnalisé

### Technologies supportées actuellement :

- Python, Django, Flask
- Vue.js, React.js, Node.js
- PostgreSQL, Scikit-learn, PyTorch
- Docker, Git, Firebase, Flutter
- Postman, Hugging Face
- Et plus...

Pour ajouter une nouvelle technologie, ajoutez simplement l'entrée dans le `logoMap` du composant `TechLogo.vue`.
