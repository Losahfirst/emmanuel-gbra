<template>
  <section class="section articles" id="articles">
    <div class="section-header">
      <span class="section-label">Publications</span>
      <h2 class="section-title">Articles</h2>
      <p class="section-subtitle">Mes publications sur Medium</p>
    </div>
    
    <div class="articles-grid">
      <article class="article-card" v-for="article in articles" :key="article.id">
        <div class="article-image">
          <svg viewBox="0 0 24 24" fill="white" width="40" height="40" opacity="0.4">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        </div>
        <div class="article-content">
          <span class="article-platform">{{ article.platform }}</span>
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <a :href="article.url" target="_blank" class="article-link">
            Lire l'article →
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const articles = [
  {
    id: 1,
    title: 'Machine Learning et Production d\'Électricité : Un Duo Gagnant',
    excerpt: 'Applications du ML dans l\'optimisation de la production électrique, turbines à gaz et maintenance prédictive.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-production-d%C3%A9lectricit%C3%A9-un-duo-gagnant-fd8a0cc80275',
    platform: 'Medium'
  },
  {
    id: 2,
    title: 'Machine Learning et Compteurs Intelligents en Côte d\'Ivoire',
    excerpt: 'Intégration du ML dans les systèmes de compteurs intelligents pour améliorer la gestion énergétique.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-compteurs-%C3%A9lectriques-intelligents-une-opportunit%C3%A9-pour-la-c%C3%B4te-divoire-1f72a4580bd0',
    platform: 'Medium'
  },
  {
    id: 3,
    title: 'Les Métiers de la Data et l\'Énergie',
    excerpt: 'Comment l\'IA et les technologies de données transforment le secteur énergétique.',
    url: 'https://medium.com/@emmanuelgbra88/les-m%C3%A9tiers-de-la-data-et-l%C3%A9nergie-78e19a5631b0',
    platform: 'Medium'
  }
]
</script>
