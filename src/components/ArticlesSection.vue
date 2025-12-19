<template>
  <section class="articles-section section" id="articles">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">MES ARTICLES</h2>
        <p class="section-subtitle">Publications sur le Machine Learning appliqué à l'énergie et aux systèmes intelligents</p>
      </div>
      <div class="articles-grid">
        <article class="article-card" v-for="(article, index) in articles" :key="index">
          <div class="article-header">
            <div class="article-icon">
  <img 
    src="https://media.itsnicethat.com/original_images/COLLINS_MEDIUM_00.gif" 
    alt="Illustration Innovation" 
    style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"
  />
</div>
            <div class="article-meta">
              <span class="article-platform">Medium</span>
              <span class="article-date">{{ article.date }}</span>
            </div>
          </div>
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-tags">
            <span v-for="(tag, i) in article.tags" :key="i" class="article-tag">{{ tag }}</span>
          </div>
          <a :href="article.url" target="_blank" rel="noopener noreferrer" class="article-link">
            <IconWrapper name="globe" size="sm" />
            <span>Lire l'article</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import IconWrapper from './icons/IconWrapper.vue'

const articles = ref([
  {
    title: 'Machine Learning et Production d\'Électricité : Un Duo Gagnant',
    excerpt: 'Exploration de l\'application du Machine Learning dans l\'optimisation de la production d\'électricité, avec un focus sur les turbines à gaz et la maintenance prédictive pour améliorer l\'efficacité énergétique.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-production-d%C3%A9lectricit%C3%A9-un-duo-gagnant-fd8a0cc80275',
    date: '2025',
    tags: ['Machine Learning', 'Énergie', 'Production', 'Optimisation']
  },
  {
    title: 'Machine Learning et Compteurs Électriques Intelligents : Une Opportunité pour la Côte d\'Ivoire',
    excerpt: 'Analyse de l\'intégration du Machine Learning dans les systèmes de compteurs intelligents en Côte d\'Ivoire, explorant les opportunités d\'amélioration de la gestion énergétique et de l\'efficacité du réseau électrique.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-compteurs-%C3%A9lectriques-intelligents-une-opportunit%C3%A9-pour-la-c%C3%B4te-divoire-1f72a4580bd0',
    date: '2025',
    tags: ['Machine Learning', 'IoT', 'Smart Grid', 'Côte d\'Ivoire']
  }
])

onMounted(() => {
  // Potentiel scraping ou fetch des métadonnées depuis les URLs
  // Pour l'instant, on utilise les données statiques
})
</script>

<style scoped>
.articles-section {
  background: var(--bg-light);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.03em;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--light-gray);
  font-weight: 500;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.article-card {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-yellow);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.article-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-thick) solid var(--border-color);
  color: white;
}

.article-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.article-platform {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--accent-orange);
  font-family: 'Space Grotesk', sans-serif;
  padding: 0.25rem 0.75rem;
  background: var(--bg-light);
  border-radius: 0.5rem;
  border: 2px solid var(--border-color);
}

.article-date {
  font-size: 0.875rem;
  color: var(--light-gray);
  font-weight: 600;
}

.article-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0;
}

.article-excerpt {
  font-size: 1rem;
  color: var(--light-gray);
  line-height: 1.7;
  flex: 1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.article-tag {
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  background: var(--bg-light);
  color: var(--dark-gray);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
}

.article-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--accent-orange);
  color: var(--white);
  border: var(--border-thick) solid var(--border-color);
  border-radius: 1rem;
  text-decoration: none;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-game);
  width: fit-content;
}

.article-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.15);
  background: var(--primary-purple);
}

.article-link :deep(svg) {
  width: 1.125rem;
  height: 1.125rem;
}

@media (max-width: 968px) {
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .article-card {
    padding: 2rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .article-card {
    padding: 1.5rem;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
  
  .article-icon {
    width: 50px;
    height: 50px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
