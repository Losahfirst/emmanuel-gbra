<template>
  <section class="section articles" id="articles">
    <div class="section-header reveal">
      <span class="section-label">Publications & Insights</span>
      <h2 class="section-title">Mes Articles</h2>
      <p class="section-subtitle">Analyses et perspectives sur la data science appliquée au secteur de l'énergie et de l'IoT.</p>
    </div>

    <!-- Filtres (Inspiration Kanari) -->
    <div class="articles-filters reveal">
      <button v-for="filter in filters" :key="filter" 
              :class="['filter-btn', { active: activeFilter === filter }]"
              @click="activeFilter = filter">
        {{ filter }}
      </button>
    </div>
    
    <div class="articles-grid">
      <article v-for="(article, index) in filteredArticles" 
               :key="article.id" 
               class="article-card reveal"
               :style="{ transitionDelay: (index * 100) + 'ms' }"
               @click="article.isPdf ? openPdf(article.url) : null">
        <div class="article-image-wrapper">
          <img :src="article.image" :alt="article.title" class="article-image" />
          <span class="article-category">{{ article.category }}</span>
          <div v-if="article.isPdf" class="pdf-badge">PDF</div>
        </div>
        
        <div class="article-body">
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <span class="article-read-time">{{ article.readTime }}</span>
          </div>
          <h3 class="article-card-title">{{ article.title }}</h3>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <a :href="article.url" 
             :target="article.isPdf ? '_self' : '_blank'" 
             class="article-read-more"
             @click.prevent="article.isPdf ? openPdf(article.url) : window.open(article.url, '_blank')">
            {{ article.isPdf ? 'Lire le document' : 'Lire l\'article' }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </article>
    </div>

    <!-- PDF Viewer Modal -->
    <Teleport to="body">
      <div v-if="showPdfModal" class="pdf-modal-overlay" @click="closePdf">
        <div class="pdf-modal-content" @click.stop>
          <button class="pdf-modal-close" @click="closePdf">✕</button>
          <iframe :src="currentPdfUrl" width="100%" height="100%" frameborder="0"></iframe>
        </div>
      </div>
    </Teleport>

    <div class="articles-footer reveal">
      <p>Envie d'en savoir plus ? Retrouvez toutes mes publications sur mes blogs.</p>
      <div class="blog-links">
        <a href="https://medium.com/@emmanuelgbra88" target="_blank" class="blog-link-item">
          <img src="https://logos-world.net/wp-content/uploads/2023/07/Medium-Emblem.png" alt="Medium Blog" class="blog-logo" />
          <span>Medium</span>
        </a>
        <a href="https://losah.substack.com/" target="_blank" class="blog-link-item">
          <img src="https://substackcdn.com/image/fetch/$s_!dIv-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F478c3813-a178-4032-9ccb-e8fd74912ffc_2832x1332.png" alt="Substack Blog" class="blog-logo substack-logo" />
          <span>Substack</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('Tout')
const filters = ['Tout', 'Maintenance Prédictive', 'Data Science', 'Énergie', 'IoT']

const showPdfModal = ref(false)
const currentPdfUrl = ref('')

const openPdf = (url) => {
  currentPdfUrl.value = url
  showPdfModal.value = true
  document.body.style.overflow = 'hidden'
}

const closePdf = () => {
  showPdfModal.value = false
  currentPdfUrl.value = ''
  document.body.style.overflow = ''
}

const articles = [
  {
    id: 4,
    title: 'Maintenance Prédictive KPI - Thèse Doctorat',
    excerpt: 'Travaux de recherche approfondis sur les indicateurs de performance clés pour la maintenance prédictive industrielle.',
    url: '/pdf/maintenance-predictive-kpi.pdf',
    category: 'Maintenance Prédictive',
    date: 'Avril 2026',
    readTime: 'Thèse',
    image: '/images/articles/maintenanvr.jpg',
    isPdf: true
  },
  {
    id: 5,
    title: 'Outils d\'analyse KPI - Épisode 2',
    excerpt: 'Guide pratique sur les outils d\'analyse et les métriques essentielles pour le suivi de performance énergétique.',
    url: '/pdf/outils-analyse-kpi.pdf',
    category: 'Maintenance Prédictive',
    date: 'Mars 2026',
    readTime: 'Document',
    image: '/images/articles/maintenanvr.jpg',
    isPdf: true
  },
  {
    id: 1,
    title: 'Machine Learning et Production d\'Électricité',
    excerpt: 'Optimisation des turbines à gaz et maintenance prédictive via l\'IA pour un réseau plus résilient.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-production-d%C3%A9lectricit%C3%A9-un-duo-gagnant-fd8a0cc80275',
    category: 'Data Science',
    date: '15 Mars 2024',
    readTime: '6 min',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*C9DGz4YZP66PUIm006TvAA@2x.jpeg'
  },
  {
    id: 2,
    title: 'Smart Meters & IoT en Afrique',
    excerpt: 'Comment l\'IA révolutionne les compteurs intelligents pour une gestion optimale de l\'énergie.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-compteurs-%C3%A9lectriques-intelligents-une-opportunit%C3%A9-pour-la-c%C3%B4te-divoire-1f72a4580bd0',
    category: 'IoT',
    date: '02 Février 2024',
    readTime: '5 min',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*RXRuiNk_SKnnZHBaSHiZ2w.jpeg'
  },
  {
    id: 3,
    title: 'Les Métiers de la Data Énergie',
    excerpt: 'Analyse de la transformation digitale des métiers du secteur énergétique ivoirien.',
    url: 'https://medium.com/@emmanuelgbra88/les-m%C3%A9tiers-de-la-data-et-l%C3%A9nergie-78e19a5631b0',
    category: 'Innovation',
    date: '20 Janvier 2024',
    readTime: '4 min',
    image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*lif3rzaN8t0_9J_n.jpg'
  }
]

const filteredArticles = computed(() => {
  if (activeFilter.value === 'Tout') return articles
  return articles.filter(a => a.category === activeFilter.value)
})
</script>

<style scoped>
.articles {
  background-color: var(--white);
  padding: 8rem 4%;
}

.articles-filters {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border-radius: 100px;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  color: var(--gray-600);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  border-color: var(--black);
  color: var(--black);
}

.filter-btn.active {
  background: var(--black);
  color: var(--white);
  border-color: var(--black);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.article-card {
  background: var(--white);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: var(--transition-slow);
}

.article-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%);
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.5s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
  filter: grayscale(0%);
}

.article-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--black);
  color: var(--white);
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.article-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--gray-500);
  margin-bottom: 0.75rem;
}

.article-card-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
  color: var(--black);
  margin-bottom: 1rem;
  transition: color var(--transition);
}

.article-card:hover .article-card-title {
  color: var(--accent);
}

.article-excerpt {
  font-size: 0.95rem;
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-read-more {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.article-read-more svg {
  width: 18px;
  height: 18px;
  transition: transform var(--transition);
}

.article-card:hover .article-read-more svg {
  transform: translateX(5px);
}

.articles-footer {
  margin-top: 6rem;
  text-align: center;
  padding-top: 3rem;
  border-top: 1px solid var(--gray-100);
}

.articles-footer p {
  color: var(--gray-500);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.blog-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.blog-link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.blog-link-item:hover {
  transform: translateY(-8px);
}

.blog-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: filter 0.3s ease;
  filter: grayscale(100%) opacity(0.7);
}

.blog-link-item:hover .blog-logo {
  filter: grayscale(0%) opacity(1);
}

.substack-logo {
  height: 50px; /* Slight adjustment for substack logo ratio */
}

.blog-link-item span {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray-400);
  transition: color 0.3s ease;
}

.blog-link-item:hover span {
  color: var(--black);
}

.pdf-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent);
  color: var(--white);
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 800;
  border-radius: 2px;
}

/* PDF Modal Styles */
.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.pdf-modal-content {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.pdf-modal-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.pdf-modal-close:hover {
  background: var(--accent);
  color: white;
  transform: rotate(90deg);
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  .pdf-modal-overlay {
    padding: 0;
  }
  .pdf-modal-content {
    height: 100vh;
    border-radius: 0;
  }
}
</style>

