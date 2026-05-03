<template>
  <section class="section articles bg-grid" id="articles">
    <div class="articles-container-unified">
      <div class="articles-top-nav">
        <div class="section-header reveal">
          <span class="section-label">Publications & Insights</span>
          <h2 class="section-title">Mes <span class="text-accent">Articles</span></h2>
          <p class="section-subtitle">Conception de RAG, modèles d'IA pour entreprises et Data Science orientée maintenance prédictive.</p>
        </div>

        <div class="carousel-controls reveal">
          <button @click="scroll('prev')" class="control-btn" aria-label="Précédent">
            <span class="arrow">‹</span>
          </button>
          <button @click="scroll('next')" class="control-btn" aria-label="Suivant">
            <span class="arrow">›</span>
          </button>
        </div>
      </div>

      <!-- Horizontal Connected Nodes (Mistral Style) -->
      <div class="horizontal-scroll-container reveal">
        <div class="horizontal-trunk"></div>
        
        <div class="nodes-horizontal" ref="scrollContainer">
          <div v-for="(article, index) in articles" 
               :key="article.id" 
               class="node-card-wrapper"
               @click="article.isPdf ? openPdf(article.url) : window.open(article.url, '_blank')">
            
            <div class="node-connection-h">
              <div class="pixel-box" :class="getColor(index)">
                <svg v-if="article.isPdf" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div class="vertical-link"></div>
            </div>

            <div class="node-content-card">
              <div class="node-meta">
                <span class="node-category">{{ article.category }}</span>
                <span class="node-date">{{ article.date }}</span>
              </div>
              <h3 class="node-title">{{ article.title }}</h3>
              <p class="node-excerpt">{{ article.excerpt }}</p>
              <div class="node-action">
                LIRE
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="12" height="12">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="articles-footer reveal">
        <div class="blog-links">
          <a href="https://medium.com/@emmanuelgbra88" target="_blank" class="blog-link-item">Medium</a>
          <a href="https://losah.substack.com/" target="_blank" class="blog-link-item">Substack</a>
        </div>
      </div>
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
  </section>
</template>

<script setup>
import { ref } from 'vue'

const scrollContainer = ref(null)
const showPdfModal = ref(false)
const currentPdfUrl = ref('')

const scroll = (direction) => {
  if (!scrollContainer.value) return
  const scrollAmount = 430
  scrollContainer.value.scrollBy({
    left: direction === 'next' ? scrollAmount : -scrollAmount,
    behavior: 'smooth'
  })
}

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
    title: 'Outils d\'analyse KPI - Épisode 3',
    excerpt: 'Travaux de recherche approfondis sur les indicateurs de performance clés pour la maintenance prédictive industrielle.',
    url: '/pdf/maintenance-predictive-kpi.pdf',
    category: 'MAINTENANCE',
    date: 'Avril 2026',
    isPdf: true
  },
  {
    id: 5,
    title: 'Outils d\'analyse KPI - Épisode 2',
    excerpt: 'Guide pratique sur les outils d\'analyse et les métriques essentielles pour le suivi de performance énergétique.',
    url: '/pdf/outils-analyse-kpi.pdf',
    category: 'MAINTENANCE',
    date: 'Avril 2026',
    isPdf: true
  },
  {
    id: 1,
    title: 'Machine Learning et Production d\'Électricité',
    excerpt: 'Optimisation des turbines à gaz et maintenance prédictive via l\'IA pour un réseau plus résilient.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-production-d%C3%A9lectricit%C3%A9-un-duo-gagnant-fd8a0cc80275',
    category: 'DATA SCIENCE',
    date: '15 Mars 2026'
  },
  {
    id: 2,
    title: 'Smart Meters & IoT en Afrique',
    excerpt: 'Comment l\'IA révolutionne les compteurs intelligents pour une gestion optimale de l\'énergie.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-compteurs-%C3%A9lectriques-intelligents-une-opportunit%C3%A9-pour-la-c%C3%B4te-divoire-1f72a4580bd0',
    category: 'IOT',
    date: '02 Février 2026'
  },
  {
    id: 6,
    title: 'Optimisation Énergétique Tertiaire',
    excerpt: 'Étude sur la réduction de la consommation des bâtiments via des algorithmes de contrôle intelligent.',
    url: '#',
    category: 'EFFICACITÉ',
    date: 'Déc 2025'
  }
]

const getColor = (index) => {
  const colors = ['yellow', 'orange', 'red', 'blue']
  return colors[index % colors.length]
}
</script>

<style scoped>
.articles {
  background-color: var(--cream);
  padding: 10rem 0;
  overflow: hidden;
}

.articles-container-unified {
  max-width: 1400px;
  margin: 0 auto;
}

.articles-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 6%;
  margin-bottom: 5rem;
}

.section-header {
  margin-bottom: 0;
}

.carousel-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.control-btn {
  width: 50px;
  height: 50px;
  background: var(--black);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: var(--accent);
}

.control-btn .arrow {
  color: var(--white);
  font-size: 1.8rem;
  font-weight: 300;
}

.text-accent {
  color: var(--accent);
}

.horizontal-scroll-container {
  position: relative;
  padding: 2rem 0;
}

.horizontal-trunk {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: 1.5px;
  background: var(--gray-200);
  z-index: 1;
}

.nodes-horizontal {
  display: flex;
  overflow-x: auto;
  gap: 3rem;
  padding: 0 6% 4rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.nodes-horizontal::-webkit-scrollbar {
  display: none;
}

.node-card-wrapper {
  flex: 0 0 400px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.node-connection-h {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 60px;
}

.pixel-box {
  width: 60px;
  height: 60px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.node-card-wrapper:hover .pixel-box {
  transform: scale(1.1) rotate(5deg);
}

.vertical-link {
  width: 1.5px;
  height: 40px;
  background: var(--gray-200);
}

.node-content-card {
  background: var(--white);
  padding: 2.5rem;
  border: 1px solid var(--gray-200);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.node-card-wrapper:hover .node-content-card {
  border-color: var(--black);
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
}

.node-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.node-category {
  font-size: 0.7rem;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: 2px;
}

.node-date {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-400);
}

.node-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.25;
  color: var(--black);
}

.node-excerpt {
  font-size: 0.95rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.node-action {
  margin-top: auto;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--black);
}

.node-card-wrapper:hover .node-action {
  color: var(--accent);
}

.articles-footer {
  margin-top: 2rem;
  padding: 0 6%;
}

.blog-links {
  display: flex;
  gap: 3rem;
}

.blog-link-item {
  font-weight: 900;
  font-size: 0.8rem;
  text-decoration: none;
  color: var(--black);
  padding-bottom: 5px;
  border-bottom: 2px solid var(--black);
  transition: all 0.3s ease;
}

.blog-link-item:hover {
  color: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 768px) {
  .node-card-wrapper {
    flex: 0 0 320px;
  }
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
  overflow: hidden;
}

.pdf-modal-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
</style>



