<template>
  <div class="articles-history-page">
    <KanariHeader />
    <div class="history-container">
      <div class="history-header">
        <div>
          <h1 class="page-title">Historique des Actualités</h1>
          <p class="page-subtitle">Consultez toutes les actualités énergétiques par pays</p>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="filter-group">
          <label class="filter-label">Pays</label>
          <select v-model="filters.country" class="filter-input">
            <option value="">Tous les pays</option>
            <option v-for="country in countries" :key="country.code" :value="country.code">
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Catégorie</label>
          <select v-model="filters.category" class="filter-input">
            <option value="">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Date de début</label>
          <input v-model="filters.startDate" type="date" class="filter-input" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Date de fin</label>
          <input v-model="filters.endDate" type="date" class="filter-input" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Recherche</label>
          <input 
            v-model="filters.search" 
            type="text" 
            placeholder="Rechercher dans les titres..."
            class="filter-input"
          />
        </div>

        <button @click="resetFilters" class="btn-reset">
          <RotateCcw :size="18" />
          <span>Réinitialiser</span>
        </button>
      </div>

      <!-- Results Count -->
      <div class="results-info">
        <span class="results-count">{{ filteredArticles.length }} actualité(s) trouvée(s)</span>
      </div>

      <!-- Articles Grid -->
      <div class="articles-grid">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-card"
          @click="selectArticle(article)"
        >
          <div class="article-image-wrapper">
            <img 
              :src="article.image" 
              :alt="article.title"
              @error="handleImageError"
              class="article-image"
            />
            <div class="article-badge">{{ getCountryName(article.countryCode) }}</div>
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span class="article-category">{{ article.category }}</span>
              <span class="article-date">{{ formatDate(article.date) }}</span>
            </div>
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-footer">
              <span class="article-read-time">{{ article.readTime }} min de lecture</span>
              <a 
                v-if="article.sourceUrl" 
                :href="article.sourceUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="article-source"
                @click.stop
              >
                <ExternalLink :size="14" />
                <span>Source</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredArticles.length === 0" class="empty-state">
        <FileText :size="48" />
        <p>Aucune actualité trouvée</p>
        <button @click="resetFilters" class="btn-primary">
          Réinitialiser les filtres
        </button>
      </div>
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

    <KanariFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCountryStore } from '../stores/countryStore.js'
import { getAllArticles } from '../services/jsonDataService.js'
import { westAfricaCountries } from '../data/westAfricaCountries.js'
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import { FileText, ExternalLink, X, RotateCcw } from 'lucide-vue-next'

const countryStore = useCountryStore()
const articles = ref([])
const selectedArticle = ref(null)

const filters = ref({
  country: '',
  category: '',
  startDate: '',
  endDate: '',
  search: ''
})

const countries = westAfricaCountries

// Extraire toutes les catégories uniques
const categories = computed(() => {
  const cats = new Set()
  articles.value.forEach(article => {
    if (article.category) {
      cats.add(article.category)
    }
  })
  return Array.from(cats).sort()
})

// Articles filtrés
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filtre par pays
  if (filters.value.country) {
    filtered = filtered.filter(a => a.countryCode === filters.value.country)
  }

  // Filtre par catégorie
  if (filters.value.category) {
    filtered = filtered.filter(a => a.category === filters.value.category)
  }

  // Filtre par date
  if (filters.value.startDate) {
    filtered = filtered.filter(a => {
      const articleDate = new Date(a.date)
      const startDate = new Date(filters.value.startDate)
      return articleDate >= startDate
    })
  }

  if (filters.value.endDate) {
    filtered = filtered.filter(a => {
      const articleDate = new Date(a.date)
      const endDate = new Date(filters.value.endDate)
      endDate.setHours(23, 59, 59, 999) // Inclure toute la journée
      return articleDate <= endDate
    })
  }

  // Filtre par recherche
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchLower) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(searchLower))
    )
  }

  // Trier par date (plus récentes en premier)
  return filtered.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })
})

async function loadArticles() {
  try {
    const allArticles = await getAllArticles()
    articles.value = allArticles.map(a => ({
      ...a,
      content: Array.isArray(a.content) ? a.content : (typeof a.content === 'string' ? JSON.parse(a.content || '[]') : [])
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error)
    articles.value = []
  }
}

function getCountryName(code) {
  const country = countries.find(c => c.code === code)
  return country ? country.name : code
}

function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}

function resetFilters() {
  filters.value = {
    country: '',
    category: '',
    startDate: '',
    endDate: '',
    search: ''
  }
}

function selectArticle(article) {
  selectedArticle.value = article
}

function closeArticle() {
  selectedArticle.value = null
}

function handleImageError(event) {
  event.target.src = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=400&fit=crop'
}

onMounted(() => {
  loadArticles()
  
  // Écouter les mises à jour
  const handleArticlesUpdate = async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    await loadArticles()
  }
  window.addEventListener('articles-updated', handleArticlesUpdate)
})
</script>

<style scoped>
.articles-history-page {
  min-height: 100vh;
  background: #FFFFFF;
}

.history-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: calc(80px + 2rem);
}

.history-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1rem;
  color: #6B7280;
  margin: 0;
}

.filters-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.filter-input {
  padding: 0.625rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 0.9375rem;
  background: white;
  transition: all 0.2s ease;
}

.filter-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-reset {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
}

.btn-reset:hover {
  background: #E5E7EB;
}

.results-info {
  margin-bottom: 1.5rem;
}

.results-count {
  font-size: 0.9375rem;
  color: #6B7280;
  font-weight: 500;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.article-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #3B82F6;
}

.article-image-wrapper {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
  background: #E5E7EB;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
}

.article-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.article-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.article-category {
  background: #F3F4F6;
  color: #6B7280;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 600;
}

.article-date {
  color: #9CA3AF;
}

.article-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-excerpt {
  font-size: 0.9375rem;
  color: #4B5563;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  flex: 1;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.article-read-time {
  font-size: 0.8125rem;
  color: #6B7280;
  font-weight: 500;
}

.article-source {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #6B7280;
  font-size: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.article-source:hover {
  color: #3B82F6;
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6B7280;
}

.empty-state svg {
  color: #9CA3AF;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.125rem;
  margin: 0 0 1.5rem 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #2563EB;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 1rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  background: #FFFFFF;
  z-index: 10;
}

.modal-header-content {
  flex: 1;
}

.modal-category {
  display: inline-block;
  background: #F3F4F6;
  color: #6B7280;
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.modal-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6B7280;
}

.modal-close {
  background: #F3F4F6;
  border: none;
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.modal-close:hover {
  background: #E5E7EB;
  color: #1A1A1A;
}

.modal-body {
  padding: 2rem;
}

.article-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.article-text {
  font-size: 1rem;
  color: #374151;
  line-height: 1.8;
}

.article-source {
  margin-top: 2rem;
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
  text-decoration: underline;
}

@media (max-width: 768px) {
  .history-container {
    padding: 1rem;
    padding-top: calc(60px + 1rem);
  }

  .filters-section {
    grid-template-columns: 1fr;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
