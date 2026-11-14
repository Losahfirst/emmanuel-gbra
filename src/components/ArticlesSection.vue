<template>
  <section class="section articles" id="articles">
    <div class="articles-container">
      <div class="section-header reveal">
        <div class="badge-pill">
          <span class="pulse-dot"></span>
          <span>Publications & Recherche Appliquée</span>
        </div>
        <h2 class="section-title">
          Articles & <span class="text-gradient">Insights Techniques</span>
        </h2>
        <p class="section-subtitle">
          Études approfondies, retours d'expérience sur les systèmes RAG, le Machine Learning industriel et l'intelligence artificielle appliquée à l'énergie.
        </p>

        <!-- Search & Filter Controls -->
        <div class="articles-controls-bar">
          <div class="search-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-ico">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Rechercher un article (ex: RAG, KPI, ML, IoT)..."
              class="articles-search"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">✕</button>
          </div>

          <div class="category-filter-pills">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="selectedCategory = cat"
              :class="['cat-btn', { active: selectedCategory === cat }]"
            >
              {{ cat === 'All' ? 'Tous les articles' : cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="articles-grid">
        <div 
          v-for="(article, idx) in filteredArticles" 
          :key="article.id"
          class="article-card reveal"
          :style="{ transitionDelay: (idx * 80) + 'ms' }"
          @click="handleClick(article)"
        >
          <div class="article-top-row">
            <span class="article-cat-pill" :class="getCatClass(article.category)">{{ article.category }}</span>
            <span class="article-date">{{ article.date }}</span>
          </div>

          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-excerpt">{{ article.excerpt }}</p>

          <div class="article-footer-row">
            <div class="article-badge-type">
              <span v-if="article.isPdf" class="type-indicator pdf">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="type-icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Rapport PDF (Lecture Directe)</span>
              </span>
              <span v-else class="type-indicator medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="type-icon">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <span>Article Medium</span>
              </span>
            </div>

            <div class="read-action">
              <span>{{ article.isPdf ? 'Consulter le PDF' : 'Lire l\'article' }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="action-arrow">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- No results fallback -->
      <div v-if="filteredArticles.length === 0" class="no-articles-found">
        <p>Aucun article ne correspond à votre recherche "<strong>{{ searchQuery }}</strong>".</p>
        <button @click="resetFilters" class="btn-reset">Réinitialiser les filtres</button>
      </div>

      <!-- External Publications Channels -->
      <div class="publications-channels reveal">
        <div class="channels-header">
          <span class="channels-title">Retrouvez également mes écrits sur mes canaux éditoriaux :</span>
        </div>
        <div class="channels-links">
          <a href="https://medium.com/@emmanuelgbra88" target="_blank" rel="noopener" class="channel-card medium">
            <span class="channel-name">Medium Publication</span>
            <span class="channel-desc">Data Science & Intelligence Artificielle</span>
            <span class="channel-action">Consulter ›</span>
          </a>
          <a href="https://losah.substack.com/" target="_blank" rel="noopener" class="channel-card substack">
            <span class="channel-name">Substack Newsletter</span>
            <span class="channel-desc">Analyses d'infrastructures & énergie en Afrique</span>
            <span class="channel-action">S'abonner ›</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Interactive PDF Viewer Modal -->
    <Teleport to="body">
      <div v-if="showPdfModal" class="pdf-modal-backdrop" @click="closePdf">
        <div class="pdf-modal-window" @click.stop>
          <div class="pdf-modal-bar">
            <div class="pdf-meta">
              <span class="pdf-label">Document PDF</span>
              <span class="pdf-title-text">{{ currentPdfTitle }}</span>
            </div>
            <div class="pdf-bar-actions">
              <a :href="currentPdfUrl" download class="pdf-download-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="dl-icon">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span>Télécharger</span>
              </a>
              <button class="pdf-close-btn" @click="closePdf" aria-label="Fermer">✕</button>
            </div>
          </div>
          <div class="pdf-frame-wrapper">
            <iframe :src="currentPdfUrl" width="100%" height="100%" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('All')
const showPdfModal = ref(false)
const currentPdfUrl = ref('')
const currentPdfTitle = ref('')

const categories = ['All', 'MAINTENANCE PRÉDICTIVE', 'DATA SCIENCE & ML', 'IOT & SMART GRID', 'EFFICACITÉ ÉNERGÉTIQUE']

const articles = [
  {
    id: 1,
    title: 'Outils d\'analyse KPI - Épisode 4 : Pilotage Industriel Avancé',
    excerpt: 'Nouvelles méthodologies et métriques avancées pour le pilotage de la performance industrielle et la surveillance proactive d\'équipements.',
    url: '/pdf/outils-analyse-kpi-ep4.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: 'Mai 2026',
    isPdf: true
  },
  {
    id: 2,
    title: 'Outils d\'analyse KPI - Épisode 3 : Algorithmes & Indicateurs Clés',
    excerpt: 'Travaux de recherche approfondis sur les indicateurs clés de maintenance prédictive, modélisation mathématique et corrélation de capteurs.',
    url: '/pdf/outils-analyse-kpi.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: 'Avril 2026',
    isPdf: true
  },
  {
    id: 3,
    title: 'Outils d\'analyse KPI - Épisode 2 : Suivi de Performance Énergétique',
    excerpt: 'Guide pratique sur les outils d\'analyse et métriques essentielles pour le diagnostic thermique et le suivi énergétique.',
    url: '/pdf/maintenance-predictive-kpi.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: 'Avril 2026',
    isPdf: true
  },
  {
    id: 4,
    title: 'Machine Learning et Production d\'Électricité : Un Duo Gagnant',
    excerpt: 'Comment l\'IA optimise le fonctionnement des turbines à gaz, prédit les pannes et stabilise le réseau électrique ivoirien.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-production-d%C3%A9lectricit%C3%A9-un-duo-gagnant-fd8a0cc80275',
    category: 'DATA SCIENCE & ML',
    date: '15 Mars 2026',
    isPdf: false
  },
  {
    id: 5,
    title: 'Smart Meters & IoT : Révolution des Compteurs Intelligents en Afrique',
    excerpt: 'Exploitation des données de compteurs intelligents par des algorithmes ML pour optimiser la distribution et réduire les pertes.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-compteurs-%C3%A9lectriques-intelligents-une-opportunit%C3%A9-pour-la-c%C3%B4te-divoire-1f72a4580bd0',
    category: 'IOT & SMART GRID',
    date: '02 Février 2026',
    isPdf: false
  },
  {
    id: 6,
    title: 'Optimisation Énergétique Tertiaire par Algorithmes Intelligents',
    excerpt: 'Étude sur la réduction de l\'empreinte carbone des bâtiments tertiaires et industriels par le pilotage intelligent des flux thermiques.',
    url: '/pdf/maintenance-predictive-kpi.pdf',
    category: 'EFFICACITÉ ÉNERGÉTIQUE',
    date: 'Décembre 2025',
    isPdf: true
  }
]

const filteredArticles = computed(() => {
  return articles.filter(article => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = !q || article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q) || article.category.toLowerCase().includes(q)
    const matchesCat = selectedCategory.value === 'All' || article.category === selectedCategory.value
    return matchesSearch && matchesCat
  })
})

const getCatClass = (cat) => {
  if (cat.includes('MAINTENANCE')) return 'cat-orange'
  if (cat.includes('DATA')) return 'cat-blue'
  if (cat.includes('IOT')) return 'cat-emerald'
  return 'cat-purple'
}

const handleClick = (article) => {
  if (article.isPdf) {
    currentPdfUrl.value = article.url
    currentPdfTitle.value = article.title
    showPdfModal.value = true
    document.body.style.overflow = 'hidden'
  } else {
    window.open(article.url, '_blank', 'noopener')
  }
}

const closePdf = () => {
  showPdfModal.value = false
  currentPdfUrl.value = ''
  currentPdfTitle.value = ''
  document.body.style.overflow = ''
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in')
      }
    })
  }, { threshold: 0.1 })
  
  reveals.forEach(r => observer.observe(r))
})
</script>

<style scoped>
.articles {
  background: var(--cream);
  padding: 8rem 0;
  position: relative;
}

.articles-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(244, 91, 32, 0.08);
  border: 1px solid rgba(244, 91, 32, 0.25);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.2rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(244, 91, 32, 0.7);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 91, 32, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(244, 91, 32, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 91, 32, 0); }
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent) 0%, #E31B23 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Controls Bar */
.articles-controls-bar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.search-input-wrap {
  position: relative;
  max-width: 600px;
}

.search-ico {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--gray-400);
}

.articles-search {
  width: 100%;
  padding: 0.9rem 2.8rem 0.9rem 3.2rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--black);
  outline: none;
  transition: all 0.3s ease;
}

.articles-search:focus {
  border-color: var(--black);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--gray-400);
  cursor: pointer;
  font-size: 1rem;
}

.category-filter-pills {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.cat-btn {
  padding: 0.55rem 1.2rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 750;
  color: var(--gray-600);
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
}

.cat-btn:hover {
  border-color: var(--black);
  color: var(--black);
}

.cat-btn.active {
  background: var(--black);
  border-color: var(--black);
  color: var(--white);
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3.5rem;
}

.article-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
}

.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover {
  transform: translateY(-6px);
  border-color: var(--black);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.06);
}

.article-card:hover::before {
  opacity: 1;
}

.article-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.article-cat-pill {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.3rem 0.7rem;
  border-radius: 3px;
}

.cat-orange { background: #FFF0E6; color: #F45B20; }
.cat-blue { background: #EBF2FF; color: #0047FF; }
.cat-emerald { background: #E6FBF2; color: #00A86B; }
.cat-purple { background: #F3E8FF; color: #7928CA; }

.article-date {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--gray-400);
}

.article-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 850;
  color: var(--black);
  line-height: 1.35;
  margin-bottom: 1rem;
}

.article-excerpt {
  font-size: 0.92rem;
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-100);
}

.article-badge-type {
  display: flex;
  align-items: center;
}

.type-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.type-indicator.pdf {
  color: #E31B23;
}

.type-indicator.medium {
  color: #00AB6C;
}

.type-icon {
  width: 14px;
  height: 14px;
}

.read-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-weight: 850;
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;
}

.article-card:hover .read-action {
  color: var(--accent);
}

.action-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.article-card:hover .action-arrow {
  transform: translateX(4px);
}

/* Fallback */
.no-articles-found {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--white);
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  margin-top: 2rem;
}

.btn-reset {
  margin-top: 1rem;
  background: var(--black);
  color: var(--white);
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
}

/* Channels */
.publications-channels {
  margin-top: 5rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 3rem;
}

.channels-header {
  margin-bottom: 2rem;
}

.channels-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--black);
}

.channels-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.channel-card {
  padding: 2rem;
  border-radius: 6px;
  background: var(--cream);
  border: 1px solid var(--gray-200);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.channel-card:hover {
  transform: translateY(-4px);
  border-color: var(--black);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
}

.channel-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 850;
  color: var(--black);
}

.channel-desc {
  font-size: 0.88rem;
  color: var(--gray-600);
}

.channel-action {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
}

/* PDF Modal */
.pdf-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.pdf-modal-window {
  background: var(--white);
  width: 100%;
  max-width: 1200px;
  height: 92vh;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
}

.pdf-modal-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  background: var(--black);
  color: var(--white);
}

.pdf-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 70%;
}

.pdf-label {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.pdf-title-text {
  font-size: 0.95rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pdf-bar-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.pdf-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.pdf-download-btn:hover {
  background: var(--accent);
}

.dl-icon {
  width: 14px;
  height: 14px;
}

.pdf-close-btn {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.pdf-close-btn:hover {
  background: #E31B23;
}

.pdf-frame-wrapper {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  .channels-links {
    grid-template-columns: 1fr;
  }
  .pdf-modal-backdrop {
    padding: 0;
  }
  .pdf-modal-window {
    height: 100vh;
    border-radius: 0;
  }
}
</style>
