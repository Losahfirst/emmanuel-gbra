<template>
  <div class="home-blog-section">
    <div class="blog-grid">
      <article
        v-for="article in articles"
        :key="article.id"
        class="blog-card"
        @click="selectArticle(article)"
      >
        <div class="blog-card-image">
          <img 
            :src="article.image" 
            :alt="article.title"
            @error="handleImageError"
            class="blog-image"
          />
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-category">{{ article.category }}</span>
            <span class="blog-date">{{ formatDate(article.date) }}</span>
          </div>
          <h3 class="blog-card-title">{{ article.title }}</h3>
          <p class="blog-card-excerpt">{{ article.excerpt }}</p>
          <div class="blog-card-footer">
            <span class="blog-read-time">{{ article.readTime }} min de lecture</span>
            <div class="blog-actions">
              <a 
                v-if="article.sourceUrl" 
                :href="article.sourceUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="blog-source-link"
                @click.stop
              >
                Source
              </a>
              <button class="blog-read-more">Lire la suite →</button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Article Detail Modal -->
    <div v-if="selectedArticle" class="modal-overlay" @click="closeArticle">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-header-content">
            <span class="modal-category">{{ selectedArticle.category }}</span>
            <h2 class="modal-title">{{ selectedArticle.title }}</h2>
            <div class="modal-meta">
              <span class="modal-date">{{ formatDate(selectedArticle.date) }}</span>
              <span class="modal-read-time">{{ selectedArticle.readTime }} min de lecture</span>
            </div>
          </div>
          <button @click="closeArticle" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <div class="article-content">
            <div v-for="(paragraph, index) in selectedArticle.content" :key="index" class="article-paragraph">
              <h4 v-if="paragraph.type === 'heading'" class="article-heading">{{ paragraph.text }}</h4>
              <p v-else class="article-text">{{ paragraph.text }}</p>
            </div>
          </div>
          <div v-if="selectedArticle.sourceUrl" class="article-source">
            <a 
              :href="selectedArticle.sourceUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="source-link"
            >
              <ExternalLink :size="16" />
              <span>Lire l'article original</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { X, ExternalLink } from 'lucide-vue-next'

const selectedArticle = ref(null)

// Articles généraux sur l'énergie en Afrique de l'Ouest
const articles = ref([
  {
    id: 1,
    title: 'Développement des énergies renouvelables en Afrique de l\'Ouest',
    excerpt: 'Les pays d\'Afrique de l\'Ouest accélèrent leurs investissements dans les énergies solaire et éolienne pour diversifier leur mix énergétique.',
    category: 'Énergies Renouvelables',
    date: new Date('2024-01-15'),
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    sourceUrl: 'https://www.ecowas.int',
    content: [
      { type: 'text', text: 'Les pays d\'Afrique de l\'Ouest multiplient les projets d\'énergies renouvelables pour répondre à la demande croissante en électricité et réduire leur dépendance aux énergies fossiles.' },
      { type: 'heading', text: 'Investissements majeurs' },
      { type: 'text', text: 'Plusieurs projets solaires et éoliens sont en cours de développement dans la région, avec un objectif commun d\'augmenter la part des énergies renouvelables dans le mix énergétique.' }
    ]
  },
  {
    id: 2,
    title: 'Interconnexions électriques : vers un marché régional intégré',
    excerpt: 'Le WAPP (West African Power Pool) continue de renforcer les interconnexions entre les pays pour créer un marché électrique régional unifié.',
    category: 'Infrastructure',
    date: new Date('2024-01-10'),
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
    sourceUrl: 'https://www.ecowapp.org',
    content: [
      { type: 'text', text: 'Les interconnexions électriques entre les pays d\'Afrique de l\'Ouest sont essentielles pour assurer la sécurité d\'approvisionnement et optimiser l\'utilisation des ressources énergétiques.' },
      { type: 'heading', text: 'Projets en cours' },
      { type: 'text', text: 'Plusieurs lignes de transmission sont en construction pour connecter davantage de pays au réseau régional.' }
    ]
  },
  {
    id: 3,
    title: 'Électrification rurale : défis et opportunités',
    excerpt: 'L\'électrification rurale progresse dans la région grâce à des solutions innovantes combinant réseaux centralisés et systèmes décentralisés.',
    category: 'Développement',
    date: new Date('2024-01-05'),
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
    sourceUrl: '#',
    content: [
      { type: 'text', text: 'L\'accès à l\'électricité en milieu rural reste un défi majeur en Afrique de l\'Ouest, mais des solutions innovantes émergent pour accélérer l\'électrification.' },
      { type: 'heading', text: 'Solutions décentralisées' },
      { type: 'text', text: 'Les mini-réseaux solaires et les systèmes individuels offrent des alternatives viables pour les zones éloignées.' }
    ]
  },
  {
    id: 4,
    title: 'Efficacité énergétique : priorité des régulateurs',
    excerpt: 'Les autorités de régulation mettent en place des programmes pour améliorer l\'efficacité énergétique et réduire les pertes sur le réseau.',
    category: 'Régulation',
    date: new Date('2023-12-28'),
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    sourceUrl: '#',
    content: [
      { type: 'text', text: 'L\'efficacité énergétique devient une priorité pour les régulateurs du secteur électrique en Afrique de l\'Ouest.' },
      { type: 'heading', text: 'Mesures incitatives' },
      { type: 'text', text: 'Des programmes d\'incitation sont mis en place pour encourager les investissements dans l\'efficacité énergétique.' }
    ]
  },
  {
    id: 5,
    title: 'Nouvelles centrales : augmentation de la capacité installée',
    excerpt: 'Plusieurs nouvelles centrales électriques entrent en service, augmentant significativement la capacité de production régionale.',
    category: 'Production',
    date: new Date('2023-12-20'),
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    sourceUrl: '#',
    content: [
      { type: 'text', text: 'La capacité de production électrique en Afrique de l\'Ouest continue de croître avec l\'entrée en service de nouvelles centrales.' },
      { type: 'heading', text: 'Mix énergétique' },
      { type: 'text', text: 'Les nouvelles installations combinent différentes sources d\'énergie pour assurer la stabilité du réseau.' }
    ]
  },
  {
    id: 6,
    title: 'Digitalisation du secteur énergétique',
    excerpt: 'Les technologies numériques transforment la gestion et le monitoring du secteur électrique en Afrique de l\'Ouest.',
    category: 'Innovation',
    date: new Date('2023-12-15'),
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    sourceUrl: '#',
    content: [
      { type: 'text', text: 'La digitalisation offre de nouvelles opportunités pour améliorer la gestion et l\'efficacité du secteur énergétique.' },
      { type: 'heading', text: 'Smart grids' },
      { type: 'text', text: 'Les réseaux intelligents permettent une meilleure gestion de la demande et de l\'offre d\'électricité.' }
    ]
  }
])

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

function handleImageError(event) {
  event.target.src = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800'
}

function selectArticle(article) {
  selectedArticle.value = article
}

function closeArticle() {
  selectedArticle.value = null
}

onMounted(() => {
  // Articles déjà chargés
})
</script>

<style scoped>
.home-blog-section {
  width: 100%;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: #FFFFFF;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.blog-card-image {
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #E5E7EB;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.blog-card:hover .blog-image {
  transform: scale(1.05);
}

.blog-card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
}

.blog-category {
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.75rem;
}

.blog-date {
  color: #6B7280;
  font-size: 0.8125rem;
}

.blog-card-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.blog-card-excerpt {
  font-size: 0.9375rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #F3F4F6;
  margin-top: auto;
}

.blog-read-time {
  color: #9CA3AF;
  font-size: 0.8125rem;
}

.blog-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.blog-source-link {
  color: #3B82F6;
  font-size: 0.8125rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.blog-source-link:hover {
  background: #EFF6FF;
}

.blog-read-more {
  background: none;
  border: none;
  color: #3B82F6;
  font-weight: 700;
  font-size: 0.9375rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.blog-read-more:hover {
  color: #2563EB;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 1.5rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header-content {
  flex: 1;
}

.modal-category {
  display: inline-block;
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
}

.modal-title {
  font-size: 2rem;
  font-weight: 900;
  color: #1A1A1A;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.modal-meta {
  display: flex;
  gap: 1.5rem;
  color: #6B7280;
  font-size: 0.875rem;
}

.modal-close {
  background: #F3F4F6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.modal-close:hover {
  background: #E5E7EB;
}

.modal-body {
  padding: 2rem;
}

.article-content {
  margin-bottom: 2rem;
}

.article-paragraph {
  margin-bottom: 1.5rem;
}

.article-heading {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 1rem 0;
}

.article-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #4B5563;
  margin: 0;
}

.article-source {
  padding-top: 2rem;
  border-top: 1px solid #E5E7EB;
}

.source-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: #2563EB;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
