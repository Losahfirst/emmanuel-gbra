# Fichiers de données KANARI Energy

Ce dossier contient les fichiers JSON qui stockent les données de l'application KANARI Energy.

## Fichiers disponibles

- **articles.json** : Liste de toutes les actualités énergétiques par pays
- **flash-info.json** : Informations flash qui défilent sur le dashboard
- **regulators.json** : Informations sur les régulateurs par pays
- **producers.json** : Liste des producteurs d'énergie par pays

## Comment utiliser

1. **Ajouter/Modifier des données** : Utilisez l'éditeur KANARI (accessible via le bouton "Éditeur" sur le dashboard)
2. **Sauvegarder** : Lorsque vous sauvegardez, les données sont automatiquement enregistrées dans localStorage et disponibles immédiatement sur le dashboard et la page d'historique
3. **Persistance** : Les données sont sauvegardées dans localStorage du navigateur. Un fichier JSON est également téléchargé pour backup
4. **Chargement** : Les données sont chargées automatiquement depuis localStorage (en priorité) ou depuis les fichiers JSON dans `public/data/` si localStorage est vide

## Format des données

### articles.json
```json
[
  {
    "id": 1,
    "countryCode": "CI",
    "title": "Titre de l'article",
    "excerpt": "Résumé",
    "category": "Catégorie",
    "date": "2024-12-15",
    "image": "URL de l'image",
    "sourceUrl": "URL de la source",
    "readTime": "5",
    "content": [
      { "type": "text", "text": "Paragraphe..." },
      { "type": "heading", "text": "Titre de section" }
    ]
  }
]
```

### flash-info.json
```json
[
  {
    "id": 1,
    "countryCode": "CI",
    "date": "2024-12-15",
    "text": "Texte de la flash info",
    "isActive": true
  }
]
```

### regulators.json
```json
[
  {
    "countryCode": "CI",
    "name": "Nom du régulateur",
    "description": "Description",
    "logo": "URL du logo",
    "website": "URL du site web"
  }
]
```

### producers.json
```json
[
  {
    "id": 1,
    "countryCode": "CI",
    "name": "Nom du producteur",
    "type": "Type",
    "capacity": "Capacité"
  }
]
```

