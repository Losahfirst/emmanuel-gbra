<template>
  <section class="section articles" id="articles">
    <h2 class="section-title">Articles</h2>
    <p class="section-subtitle">Publications sur Medium</p>
    
    <div class="articles-grid">
      <article class="article-card" v-for="article in articles" :key="article.id">
        <div class="article-image">
          <img src="https://logos-world.net/wp-content/uploads/2023/07/Medium-Emblem.png" alt="Medium" />
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
