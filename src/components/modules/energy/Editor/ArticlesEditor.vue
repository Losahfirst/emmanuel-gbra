<template>
  <div class="articles-editor">
    <div class="editor-section-header">
      <div>
        <h2 class="section-title">Gestion des Actualités</h2>
        <p class="section-subtitle">Ajoutez et modifiez les actualités énergétiques par pays</p>
      </div>
      <button @click="showArticleForm = true; editingArticle = null" class="btn-primary">
        <Plus :size="18" />
        <span>Nouvelle actualité</span>
      </button>
    </div>

    <!-- Country Filter -->
    <div class="filter-section">
      <label class="filter-label">Filtrer par pays:</label>
      <select v-model="selectedCountryFilter" class="country-select">
        <option value="">Tous les pays</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <!-- Articles List -->
    <div class="articles-list">
      <div
        v-for="article in filteredArticles"
        :key="article.id"
        class="article-item"
      >
        <div class="article-preview">
          <div class="article-image-preview">
            <img v-if="article.image" :src="article.image" :alt="article.title" />
            <div v-else class="no-image">Pas d'image</div>
          </div>
          <div class="article-info">
            <div class="article-header">
              <h3 class="article-title">{{ article.title }}</h3>
              <div class="article-badge">{{ getCountryName(article.countryCode) }}</div>
            </div>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <span class="meta-item">{{ article.category }}</span>
              <span class="meta-item">{{ formatDate(article.date) }}</span>
              <span class="meta-item" v-if="article.sourceUrl">
                <a :href="article.sourceUrl" target="_blank" class="source-link">Source</a>
              </span>
            </div>
          </div>
        </div>
        <div class="article-actions">
          <button @click="editArticle(article)" class="btn-edit">
            <Edit :size="18" />
            <span>Modifier</span>
          </button>
          <button @click="handleDeleteArticle(article.id)" class="btn-delete">
            <Trash2 :size="18" />
            <span>Supprimer</span>
          </button>
        </div>
      </div>

      <div v-if="filteredArticles.length === 0" class="empty-state">
        <FileText :size="48" />
        <p>Aucune actualité trouvée</p>
        <button @click="showArticleForm = true; editingArticle = null" class="btn-primary">
          Créer la première actualité
        </button>
      </div>
    </div>

    <!-- Article Form Modal -->
    <div v-if="showArticleForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h2>{{ editingArticle ? 'Modifier l\'actualité' : 'Nouvelle actualité' }}</h2>
          <button @click="closeForm" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <ArticleForm
            :article="editingArticle"
            @save="handleSaveArticle"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>

    <!-- Save Status Modal -->
    <div v-if="saveStatus.show" class="modal-overlay save-status-overlay">
      <div class="save-status-modal" @click.stop>
        <div v-if="saveStatus.loading" class="save-status-content">
          <div class="spinner"></div>
          <h3>Sauvegarde en cours...</h3>
          <p>Veuillez patienter</p>
        </div>
        <div v-else-if="saveStatus.success" class="save-status-content success">
          <CheckCircle :size="64" class="status-icon success-icon" />
          <h3>Sauvegarde réussie !</h3>
          <p>L'actualité a été enregistrée dans Supabase</p>
          <div v-if="saveStatus.savedArticle" class="saved-article-preview">
            <h4>{{ saveStatus.savedArticle.title }}</h4>
            <p class="saved-excerpt">{{ saveStatus.savedArticle.excerpt }}</p>
            <span class="saved-badge">{{ getCountryName(saveStatus.savedArticle.countryCode) }}</span>
          </div>
          <button @click="closeSaveStatus" class="btn-primary">OK</button>
        </div>
        <div v-else class="save-status-content error">
          <AlertCircle :size="64" class="status-icon error-icon" />
          <h3>Erreur de sauvegarde</h3>
          <p>{{ saveStatus.errorMessage }}</p>
          <button @click="closeSaveStatus" class="btn-primary">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, FileText, X, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { getAllArticles, saveArticle, deleteArticle } from '../../../../services/jsonDataService.js'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'
import ArticleForm from './ArticleForm.vue'

const articles = ref([])
const selectedCountryFilter = ref('')
const showArticleForm = ref(false)
const editingArticle = ref(null)

// Save status modal state
const saveStatus = ref({
  show: false,
  loading: false,
  success: false,
  errorMessage: '',
  savedArticle: null
})

const countries = westAfricaCountries

const filteredArticles = computed(() => {
  let filtered = articles.value
  if (selectedCountryFilter.value) {
    filtered = filtered.filter(a => a.countryCode === selectedCountryFilter.value)
  }
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
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
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

function editArticle(article) {
  editingArticle.value = { ...article }
  showArticleForm.value = true
}

async function handleSaveArticle(articleData) {
  // Close the form modal and show save status
  closeForm()
  saveStatus.value = {
    show: true,
    loading: true,
    success: false,
    errorMessage: '',
    savedArticle: null
  }

  try {
    const articleToSave = {
      id: articleData.id,
      countryCode: articleData.countryCode,
      title: articleData.title,
      excerpt: articleData.excerpt || '',
      category: articleData.category || '',
      date: articleData.date || '',
      image: articleData.image || '',
      sourceUrl: articleData.sourceUrl || '',
      readTime: articleData.readTime || '',
      content: articleData.content || []
    }
    
    await saveArticle(articleToSave)
    await loadArticles()
    
    // Show success status
    saveStatus.value = {
      show: true,
      loading: false,
      success: true,
      errorMessage: '',
      savedArticle: articleToSave
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    
    // Show error status
    saveStatus.value = {
      show: true,
      loading: false,
      success: false,
      errorMessage: error.message || 'Erreur inconnue lors de la sauvegarde',
      savedArticle: null
    }
  }
}

function closeSaveStatus() {
  saveStatus.value = {
    show: false,
    loading: false,
    success: false,
    errorMessage: '',
    savedArticle: null
  }
}

async function handleDeleteArticle(articleId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité?')) {
    try {
      await deleteArticle(articleId)
      await loadArticles()
      alert('Article supprimé ! Le fichier articles.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }
}

function closeForm() {
  showArticleForm.value = false
  editingArticle.value = null
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.articles-editor {
  width: 100%;
}

.editor-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.section-subtitle {
  color: #6B7280;
  font-size: 0.9375rem;
  margin: 0;
}

.filter-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}

.country-select {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  background: white;
  cursor: pointer;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-item {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  transition: all 0.2s ease;
}

.article-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.article-preview {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.article-image-preview {
  width: 120px;
  height: 120px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #E5E7EB;
  flex-shrink: 0;
}

.article-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 0.875rem;
}

.article-info {
  flex: 1;
}

.article-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.article-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
  flex: 1;
}

.article-badge {
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.article-excerpt {
  color: #6B7280;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.article-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.8125rem;
  color: #9CA3AF;
}

.source-link {
  color: #3B82F6;
  text-decoration: none;
  font-weight: 600;
}

.source-link:hover {
  text-decoration: underline;
}

.article-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-edit {
  background: #3B82F6;
  color: white;
}

.btn-edit:hover {
  background: #2563EB;
}

.btn-delete {
  background: #EF4444;
  color: white;
}

.btn-delete:hover {
  background: #DC2626;
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
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-content.large {
  max-width: 900px;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.modal-close {
  background: #F3F4F6;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #E5E7EB;
}

.modal-body {
  padding: 1.5rem;
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

@media (max-width: 768px) {
  .article-item {
    flex-direction: column;
  }
  
  .article-preview {
    flex-direction: column;
  }
  
  .article-image-preview {
    width: 100%;
    height: 200px;
  }
  
  .article-actions {
    flex-direction: row;
  }
}

/* Save Status Modal Styles */
.save-status-overlay {
  z-index: 2000;
}

.save-status-modal {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.save-status-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.save-status-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #1A1A1A;
}

.save-status-content p {
  color: #6B7280;
  margin: 0;
}

.status-icon {
  margin-bottom: 0.5rem;
}

.success-icon {
  color: #22C55E;
}

.error-icon {
  color: #EF4444;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #E5E7EB;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.saved-article-preview {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1rem;
  width: 100%;
  text-align: left;
  margin-top: 0.5rem;
}

.saved-article-preview h4 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #1A1A1A;
}

.saved-excerpt {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.saved-badge {
  display: inline-block;
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.save-status-content .btn-primary {
  margin-top: 1rem;
  min-width: 120px;
  justify-content: center;
}
</style>
