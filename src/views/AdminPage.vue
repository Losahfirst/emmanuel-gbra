<template>
  <div class="admin-page">
    <main class="admin-main">
      <div class="admin-container">
        
        <!-- STEP 1: AUTHENTICATION FORM IF NOT LOGGED IN -->
        <div v-if="!isAuthenticated" class="auth-card">
          <div class="auth-badge">ESPACE RÉSERVÉ</div>
          <h1 class="auth-title">Connexion Administration</h1>
          <p class="auth-subtitle">
            Connectez-vous pour publier, modifier et mettre en avant vos articles et nouvelles.
          </p>

          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <label for="admin-pass">Mot de passe d'accès</label>
              <div class="password-input-wrap">
                <input 
                  id="admin-pass"
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="passwordInput" 
                  placeholder="Entrez votre mot de passe"
                  required
                  class="admin-input"
                  autocomplete="current-password"
                />
                <button type="button" class="toggle-pass-btn" @click="showPassword = !showPassword">
                  {{ showPassword ? 'Masquer' : 'Afficher' }}
                </button>
              </div>
            </div>

            <p v-if="authError" class="auth-error-msg">
              {{ authError }}
            </p>

            <button type="submit" class="admin-btn-primary">
              Se connecter à l'espace publication →
            </button>
            <div class="admin-hint">
              <span>(Mot de passe par défaut : <code>admin2026</code> ou <code>gbra2026</code>)</span>
            </div>
          </form>
        </div>

        <!-- STEP 2: DASHBOARD IF AUTHENTICATED -->
        <div v-else class="dashboard-wrap">
          <!-- Top Bar -->
          <div class="dashboard-header">
            <div>
              <div class="admin-tag">GESTION ÉDITORIALE</div>
              <h1 class="dashboard-title">Espace de Publication</h1>
              <p class="dashboard-desc">
                Publiez vos nouveaux articles, ajoutez des visuels et choisissez ceux qui apparaissent dans les <strong>NOUVELLES</strong> du site.
              </p>
            </div>

            <div class="dashboard-top-actions">
              <router-link to="/" class="btn-view-site">
                Voir le site en direct ↗
              </router-link>
              <button @click="handleLogout" class="btn-logout">
                Déconnexion
              </button>
            </div>
          </div>

          <!-- Alert notification -->
          <div v-if="alertMessage" class="admin-alert" :class="alertType">
            <span>{{ alertMessage }}</span>
            <button @click="alertMessage = ''" class="alert-close">✕</button>
          </div>

          <!-- Tabs: Nouvelle Publication / Liste des articles -->
          <div class="admin-tabs">
            <button 
              @click="activeTab = 'create'" 
              class="admin-tab-btn" 
              :class="{ active: activeTab === 'create' }"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tab-svg-icon">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>{{ editingArticleId ? 'Modifier l\'article' : 'Publier un article / une nouvelle' }}</span>
            </button>
            <button 
              @click="activeTab = 'list'" 
              class="admin-tab-btn" 
              :class="{ active: activeTab === 'list' }"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tab-svg-icon">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>Tous les articles ({{ articles.length }})</span>
            </button>
          </div>

          <!-- TAB 1: FORM -->
          <div v-if="activeTab === 'create'" class="editor-grid">
            <div class="editor-card">
              <div class="card-header">
                <h2 class="card-title">
                  {{ editingArticleId ? 'Modifier l\'article existant' : 'Rédiger une nouvelle publication' }}
                </h2>
                <button v-if="editingArticleId" @click="cancelEdit" class="btn-cancel-edit">
                  Annuler la modification
                </button>
              </div>

              <form @submit.prevent="saveArticle" class="editor-form">
                <!-- Titre -->
                <div class="form-group">
                  <label>Titre de l'article *</label>
                  <input 
                    type="text" 
                    v-model="form.title" 
                    placeholder="Ex: Bengio : « Si vous privilégiez la sécurité... »" 
                    required 
                    class="admin-input"
                  />
                </div>

                <!-- Résumé (Excerpt) -->
                <div class="form-group">
                  <label>Résumé / Extrait (affiché dans Nouvelles et Blog) *</label>
                  <textarea 
                    v-model="form.excerpt" 
                    rows="3" 
                    placeholder="Courte description percutante résumant la problématique ou les conclusions de votre article..."
                    required 
                    class="admin-textarea"
                  ></textarea>
                </div>

                <!-- Section Image / Photo -->
                <div class="form-group">
                  <label>Photo / Visuel de la nouvelle *</label>
                  <div class="image-source-options">
                    <label class="radio-label">
                      <input type="radio" value="upload" v-model="imageMode" />
                      Téléverser une photo depuis mon ordinateur
                    </label>
                    <label class="radio-label">
                      <input type="radio" value="url" v-model="imageMode" />
                      Saisir une URL ou chemin
                    </label>
                    <label class="radio-label">
                      <input type="radio" value="presets" v-model="imageMode" />
                      Choisir une image existante
                    </label>
                  </div>

                  <!-- Upload direct -->
                  <div v-if="imageMode === 'upload'" class="file-upload-box">
                    <input 
                      type="file" 
                      accept="image/*" 
                      @change="handleFileUpload" 
                      id="img-upload-input" 
                      class="hidden-file-input"
                    />
                    <label for="img-upload-input" class="upload-dropzone">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="upload-svg">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      <span class="upload-text">Cliquez pour sélectionner une photo (PNG, JPG, WebP)</span>
                    </label>
                  </div>

                  <!-- Input URL -->
                  <div v-else-if="imageMode === 'url'">
                    <input 
                      type="text" 
                      v-model="form.image" 
                      placeholder="https://... ou /images/articles/..." 
                      class="admin-input"
                    />
                  </div>

                  <!-- Presets -->
                  <div v-else class="presets-gallery">
                    <div 
                      v-for="preset in presetImages" 
                      :key="preset.path" 
                      class="preset-thumb"
                      :class="{ selected: form.image === preset.path }"
                      @click="form.image = preset.path"
                    >
                      <img :src="preset.path" :alt="preset.name" />
                      <span>{{ preset.name }}</span>
                    </div>
                  </div>

                  <!-- Image preview -->
                  <div v-if="form.image" class="image-preview-bar">
                    <span class="preview-label">Aperçu du visuel :</span>
                    <div class="preview-img-box">
                      <img :src="form.image" alt="Aperçu" />
                    </div>
                  </div>
                </div>

                <!-- Checkbox Mettre en avant dans Nouvelles -->
                <div class="form-group highlight-box">
                  <label class="checkbox-container">
                    <input type="checkbox" v-model="form.isNews" />
                    <span class="checkbox-custom"></span>
                    <span class="checkbox-label-text">
                      <strong class="highlight-title-flex">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="star-svg">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        Mettre en avant dans la section NOUVELLES
                      </strong>
                      <small>L'article s'affichera immédiatement dans la grande carte carrousel du haut de la page d'accueil (Style Bengio).</small>
                    </span>
                  </label>
                </div>

                <!-- Catégorie & Date -->
                <div class="form-row-2">
                  <div class="form-group">
                    <label>Catégorie</label>
                    <select v-model="form.category" class="admin-select">
                      <option value="MAINTENANCE PRÉDICTIVE">MAINTENANCE PRÉDICTIVE</option>
                      <option value="DATA SCIENCE & ML">DATA SCIENCE & ML</option>
                      <option value="IOT & SMART GRID">IOT & SMART GRID</option>
                      <option value="EFFICACITÉ ÉNERGÉTIQUE">EFFICACITÉ ÉNERGÉTIQUE</option>
                      <option value="IA & SYSTÈMES RAG">IA & SYSTÈMES RAG</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Date de publication</label>
                    <input 
                      type="text" 
                      v-model="form.date" 
                      placeholder="Ex: Novembre 2026 ou 14 Nov 2026" 
                      class="admin-input"
                    />
                  </div>
                </div>

                <!-- Format d'accès (PDF ou Lien Web) -->
                <div class="form-row-2">
                  <div class="form-group">
                    <label>Type de document</label>
                    <select v-model="form.isPdf" class="admin-select">
                      <option :value="false">Lien Web / Article externe (Medium, Substack, etc.)</option>
                      <option :value="true">Rapport / Étude PDF</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>{{ form.isPdf ? 'Chemin du PDF' : 'Lien de l\'article (URL)' }}</label>
                    <input 
                      type="text" 
                      v-model="form.url" 
                      :placeholder="form.isPdf ? '/pdf/mon-rapport.pdf' : 'https://medium.com/...'" 
                      class="admin-input"
                    />
                  </div>
                </div>

                <!-- Auteur -->
                <div class="form-group">
                  <label>Auteur</label>
                  <input 
                    type="text" 
                    v-model="form.author" 
                    placeholder="Emmanuel GBRA" 
                    class="admin-input"
                  />
                </div>

                <div class="form-actions">
                  <button type="submit" class="admin-btn-primary">
                    {{ editingArticleId ? 'Enregistrer les modifications' : 'Publier l\'article maintenant' }}
                  </button>
                  <button v-if="editingArticleId" type="button" @click="cancelEdit" class="btn-secondary">
                    Annuler
                  </button>
                </div>
              </form>
            </div>

            <!-- Live Preview Card (Bengio Style) -->
            <div class="preview-sidebar">
              <div class="sidebar-header">
                <h3>Aperçu direct (Style Yoshua Bengio)</h3>
                <span class="preview-pill">Ce que vos visiteurs verront</span>
              </div>

              <!-- Mini Bengio News Card Preview -->
              <div class="mini-bengio-card">
                <div class="mini-card-tag">NOUVELLES</div>
                <div class="mini-img-wrap">
                  <img :src="form.image || '/images/articles/maintenance-predictive-cover.png'" alt="Preview" />
                </div>
                <div class="mini-card-body">
                  <h4 class="mini-title">{{ form.title || 'Titre de votre nouvelle...' }}</h4>
                  <p class="mini-text">{{ form.excerpt || 'Le résumé de votre article apparaîtra ici avec toute sa clarté...' }}</p>
                  <div class="mini-footer">
                    <span class="mini-author">Par {{ form.author || 'Emmanuel GBRA' }} · {{ form.date }}</span>
                    <div class="mini-square-arrow">↗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: ARTICLE LIST -->
          <div v-else class="articles-table-card">
            <div class="table-header-row">
              <h2 class="card-title">Tous vos articles ({{ articles.length }})</h2>
              <button @click="resetDefaults" class="btn-reset-default" title="Réinitialiser les articles initiaux">
                Restaurer articles d'origine
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Visuel</th>
                    <th>Titre & Résumé</th>
                    <th>Catégorie</th>
                    <th>Date</th>
                    <th>Nouvelle ?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="art in articles" :key="art.id">
                    <td class="col-img">
                      <img :src="art.image || '/images/articles/kpi-analysis-cover.png'" class="table-thumb" alt="" />
                    </td>
                    <td class="col-main">
                      <strong class="art-table-title">{{ art.title }}</strong>
                      <p class="art-table-excerpt">{{ art.excerpt }}</p>
                      <span class="art-link-badge">
                        <span v-if="art.isPdf" class="badge-type-tag">PDF</span>
                        <span v-else class="badge-type-tag web">WEB</span>
                        {{ art.url || 'Non renseigné' }}
                      </span>
                    </td>
                    <td>
                      <span class="cat-pill-table">{{ art.category }}</span>
                    </td>
                    <td class="col-date">{{ art.date }}</td>
                    <td class="col-news">
                      <button 
                        @click="toggleNews(art.id)" 
                        class="toggle-news-btn"
                        :class="{ active: art.isNews }"
                        :title="art.isNews ? 'Retirer des Nouvelles' : 'Ajouter aux Nouvelles'"
                      >
                        <svg viewBox="0 0 24 24" :fill="art.isNews ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" class="btn-star-svg">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>{{ art.isNews ? 'En vedette' : 'Standard' }}</span>
                      </button>
                    </td>
                    <td class="col-actions">
                      <button @click="editArticle(art)" class="btn-action edit" title="Modifier">
                        Modifier
                      </button>
                      <button @click="confirmDelete(art.id)" class="btn-action delete" title="Supprimer">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import BengioHeader from '../components/BengioHeader.vue'
import BengioFooter from '../components/BengioFooter.vue'
import { useArticlesStore } from '../stores/articlesStore'

const { articles, addArticle, updateArticle, deleteArticle, toggleNews, resetToDefault } = useArticlesStore()

// Auth
const isAuthenticated = ref(false)
const passwordInput = ref('')
const authError = ref('')
const showPassword = ref(false)

// Tabs & State
const activeTab = ref('create')
const editingArticleId = ref(null)
const alertMessage = ref('')
const alertType = ref('success')

// Image upload
const imageMode = ref('upload')

const presetImages = [
  { name: 'KPI Analysis', path: '/images/articles/kpi-analysis-cover.png' },
  { name: 'Maintenance Prédictive', path: '/images/articles/maintenance-predictive-cover.png' },
  { name: 'Machine Learning & Énergie', path: '/images/articles/ml-energy.png' },
  { name: 'Smart Meters & IoT', path: '/images/articles/smart-meters.png' },
  { name: 'Energy Field', path: '/images/articles/energy-field.jpg' },
  { name: 'Data Analysis', path: '/images/articles/data-analysis.jpg' }
]

const form = reactive({
  title: '',
  excerpt: '',
  image: '/images/articles/kpi-analysis-cover.png',
  category: 'MAINTENANCE PRÉDICTIVE',
  date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
  author: 'Emmanuel GBRA',
  isPdf: true,
  url: '/pdf/outils-analyse-kpi-ep4.pdf',
  isNews: true
})

onMounted(() => {
  const logged = sessionStorage.getItem('eg_admin_logged')
  if (logged === 'true') {
    isAuthenticated.value = true
  }
})

const handleLogin = () => {
  const pass = passwordInput.value.trim()
  // Accept standard or personalized passwords
  if (pass === 'admin2026' || pass === 'gbra2026' || pass === 'admin123' || pass === 'bengio') {
    isAuthenticated.value = true
    authError.value = ''
    sessionStorage.setItem('eg_admin_logged', 'true')
  } else {
    authError.value = 'Mot de passe incorrect. Veuillez réessayer.'
  }
}

const handleLogout = () => {
  isAuthenticated.value = false
  sessionStorage.removeItem('eg_admin_logged')
  passwordInput.value = ''
}

// File Upload Handler (converts to base64 DataURL for direct persistence)
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    form.image = event.target.result
    showAlert('Image téléversée avec succès !', 'success')
  }
  reader.readAsDataURL(file)
}

const saveArticle = () => {
  if (!form.title || !form.excerpt) {
    showAlert('Veuillez remplir le titre et le résumé.', 'error')
    return
  }

  if (editingArticleId.value) {
    updateArticle(editingArticleId.value, { ...form })
    showAlert('Article mis à jour avec succès !', 'success')
    cancelEdit()
  } else {
    addArticle({ ...form })
    showAlert('Article publié avec succès ! Il apparaît maintenant sur le site.', 'success')
    resetForm()
  }
}

const editArticle = (art) => {
  editingArticleId.value = art.id
  form.title = art.title
  form.excerpt = art.excerpt
  form.image = art.image || ''
  form.category = art.category
  form.date = art.date
  form.author = art.author || 'Emmanuel GBRA'
  form.isPdf = Boolean(art.isPdf)
  form.url = art.url || ''
  form.isNews = Boolean(art.isNews)
  activeTab.value = 'create'
  window.scrollTo({ top: 120, behavior: 'smooth' })
}

const cancelEdit = () => {
  editingArticleId.value = null
  resetForm()
}

const resetForm = () => {
  form.title = ''
  form.excerpt = ''
  form.image = '/images/articles/maintenance-predictive-cover.png'
  form.category = 'MAINTENANCE PRÉDICTIVE'
  form.date = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  form.author = 'Emmanuel GBRA'
  form.isPdf = false
  form.url = ''
  form.isNews = true
}

const confirmDelete = (id) => {
  if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
    deleteArticle(id)
    showAlert('Article supprimé.', 'info')
  }
}

const resetDefaults = () => {
  if (confirm('Restaurer la liste d\'articles par défaut ? Vos ajouts personnalisés seront réinitialisés.')) {
    resetToDefault()
    showAlert('Articles initiaux restaurés.', 'info')
  }
}

const showAlert = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 4500)
}
</script>

<style scoped>
.admin-page {
  background-color: var(--bg-bengio);
  min-height: 100vh;
}

.admin-main {
  padding: 8rem 0 6rem;
}

.admin-container {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Authentication card */
.auth-card {
  max-width: 480px;
  margin: 3rem auto;
  background: #ffffff;
  border: 1px solid var(--bengio-border);
  padding: 3rem 2.5rem;
  box-shadow: 0 10px 30px rgba(17, 75, 86, 0.06);
  border-radius: 4px;
}

.auth-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--bengio-teal);
  background: rgba(17, 75, 86, 0.08);
  padding: 0.3rem 0.7rem;
  border-radius: 3px;
  margin-bottom: 1.2rem;
}

.auth-title {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  color: var(--bengio-teal);
  line-height: 1.2;
  margin-bottom: 0.8rem;
}

.auth-subtitle {
  font-family: var(--font-primary);
  font-size: 0.95rem;
  color: #555555;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.password-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-pass-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 0.8rem;
  color: var(--bengio-teal);
  cursor: pointer;
  font-weight: 600;
}

.auth-error-msg {
  color: #b3261e;
  font-size: 0.88rem;
  font-weight: 500;
}

.admin-hint {
  font-size: 0.8rem;
  color: #777;
  text-align: center;
  margin-top: 0.5rem;
}

.admin-hint code {
  background: #f1ede6;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  color: var(--bengio-teal);
  font-weight: 600;
}

/* Dashboard */
.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.admin-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--bengio-teal);
  margin-bottom: 0.5rem;
}

.dashboard-title {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 3.5vw, 3rem);
  color: var(--bengio-teal);
  line-height: 1.15;
  margin-bottom: 0.6rem;
}

.dashboard-desc {
  font-family: var(--font-primary);
  font-size: 1rem;
  color: #444444;
  max-width: 650px;
}

.dashboard-top-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-view-site {
  background-color: #ffffff;
  border: 1px solid var(--bengio-border);
  color: var(--bengio-teal);
  padding: 0.6rem 1.2rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
}

.btn-logout {
  background: none;
  border: 1px solid #c55;
  color: #c55;
  padding: 0.6rem 1.2rem;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
}

/* Alert */
.admin-alert {
  padding: 1rem 1.4rem;
  border-radius: 4px;
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
}

.admin-alert.success {
  background: #e2f4ed;
  color: #0d633f;
  border: 1px solid #94d6b9;
}

.admin-alert.error {
  background: #fde8e8;
  color: #9b1c1c;
  border: 1px solid #f8b4b4;
}

.admin-alert.info {
  background: #e8f4fd;
  color: #1e429f;
  border: 1px solid #b4c6f8;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}

/* Tabs */
.admin-tabs {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--bengio-border);
  padding-bottom: 0.8rem;
}

.admin-tab-btn {
  background: none;
  border: none;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 700;
  color: #666666;
  padding: 0.6rem 1.4rem;
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.tab-svg-icon {
  width: 17px;
  height: 17px;
}

.upload-svg {
  width: 28px;
  height: 28px;
  color: var(--bengio-teal);
}

.highlight-title-flex {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--bengio-teal);
  font-size: 0.95rem;
}

.star-svg {
  width: 16px;
  height: 16px;
  color: #e09f2b;
}

.btn-star-svg {
  width: 14px;
  height: 14px;
}

.toggle-news-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.badge-type-tag {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 800;
  background: #f1ede6;
  color: var(--bengio-teal);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  margin-right: 0.4rem;
}

.badge-type-tag.web {
  background: #e8f3f5;
  color: #125763;
}

.admin-tab-btn.active {
  background-color: var(--bengio-teal);
  color: #ffffff;
}

/* Editor Grid */
.editor-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
}

.editor-card {
  background: #ffffff;
  border: 1px solid var(--bengio-border);
  padding: 2.5rem;
  border-radius: 4px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;
}

.card-title {
  font-family: var(--font-serif);
  font-size: 1.7rem;
  color: var(--bengio-teal);
}

.btn-cancel-edit {
  background: none;
  border: none;
  color: #999;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-family: var(--font-primary);
  font-size: 0.88rem;
  font-weight: 700;
  color: #222222;
}

.admin-input, .admin-select, .admin-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--bengio-border);
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: 0.92rem;
  background: #ffffff;
  color: #111111;
  outline: none;
  transition: border-color 0.2s;
}

.admin-input:focus, .admin-select:focus, .admin-textarea:focus {
  border-color: var(--bengio-teal);
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

/* Image options */
.image-source-options {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.radio-label {
  font-size: 0.82rem;
  color: #444;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.hidden-file-input {
  display: none;
}

.upload-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px dashed var(--bengio-border);
  padding: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  background: #fafaf8;
  transition: all 0.2s;
}

.upload-dropzone:hover {
  background: #f4f6f5;
  border-color: var(--bengio-teal);
}

.upload-icon {
  font-size: 1.8rem;
}

.upload-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--bengio-teal);
}

.presets-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.preset-thumb {
  border: 2px solid transparent;
  padding: 0.3rem;
  background: #f7faf9;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.preset-thumb.selected {
  border-color: var(--bengio-teal);
}

.preset-thumb img {
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 2px;
}

.preset-thumb span {
  font-size: 0.72rem;
  display: block;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-preview-bar {
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.preview-label {
  font-size: 0.82rem;
  color: #666;
}

.preview-img-box img {
  width: 110px;
  height: 65px;
  object-fit: cover;
  border: 1px solid var(--bengio-border);
  border-radius: 3px;
}

/* Highlight Box (Checkbox) */
.highlight-box {
  background: rgba(17, 75, 86, 0.05);
  border: 1px solid rgba(17, 75, 86, 0.25);
  padding: 1rem 1.2rem;
  border-radius: 4px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
}

.checkbox-container input {
  margin-top: 0.25rem;
  width: 18px;
  height: 18px;
  accent-color: var(--bengio-teal);
}

.checkbox-label-text strong {
  display: block;
  color: var(--bengio-teal);
  font-size: 0.95rem;
}

.checkbox-label-text small {
  display: block;
  color: #555555;
  font-size: 0.82rem;
  margin-top: 0.2rem;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.admin-btn-primary {
  background: var(--bengio-teal);
  color: #ffffff;
  border: none;
  padding: 0.85rem 1.8rem;
  font-family: var(--font-primary);
  font-size: 0.92rem;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.admin-btn-primary:hover {
  background: #0c363e;
}

.btn-secondary {
  background: #eee;
  border: none;
  padding: 0.85rem 1.4rem;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
}

/* Preview Sidebar */
.preview-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.sidebar-header h3 {
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  text-transform: uppercase;
}

.preview-pill {
  font-size: 0.72rem;
  background: #fff;
  border: 1px solid var(--bengio-border);
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  color: #666;
}

.mini-bengio-card {
  background: #ffffff;
  border: 1px solid var(--bengio-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.mini-card-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(17, 75, 86, 0.9);
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.5rem;
  z-index: 2;
}

.mini-img-wrap {
  height: 200px;
  background: #e3edea;
}

.mini-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-card-body {
  padding: 1.5rem;
}

.mini-title {
  font-family: var(--font-serif);
  font-size: 1.45rem;
  color: var(--bengio-teal);
  line-height: 1.25;
  margin-bottom: 0.8rem;
}

.mini-text {
  font-family: var(--font-primary);
  font-size: 0.88rem;
  line-height: 1.55;
  color: #444;
  margin-bottom: 1.2rem;
}

.mini-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f0eee8;
  padding-top: 0.8rem;
}

.mini-author {
  font-size: 0.78rem;
  color: #777;
}

.mini-square-arrow {
  width: 28px;
  height: 28px;
  border: 1px solid var(--bengio-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bengio-teal);
  font-weight: bold;
}

/* Articles Table */
.articles-table-card {
  background: #ffffff;
  border: 1px solid var(--bengio-border);
  padding: 2rem;
  border-radius: 4px;
}

.table-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.btn-reset-default {
  background: none;
  border: 1px solid var(--bengio-border);
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: #666;
}

.table-responsive {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-primary);
  font-size: 0.88rem;
}

.admin-table th {
  text-align: left;
  padding: 0.8rem 1rem;
  border-bottom: 2px solid var(--bengio-border);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #555;
}

.admin-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.table-thumb {
  width: 70px;
  height: 48px;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.art-table-title {
  display: block;
  font-size: 0.95rem;
  color: #111;
  margin-bottom: 0.2rem;
}

.art-table-excerpt {
  font-size: 0.82rem;
  color: #666;
  max-width: 450px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.art-link-badge {
  display: inline-block;
  font-size: 0.72rem;
  color: var(--bengio-teal);
  margin-top: 0.3rem;
}

.cat-pill-table {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--bengio-teal);
  background: rgba(17, 75, 86, 0.08);
  padding: 0.25rem 0.55rem;
  border-radius: 3px;
  white-space: nowrap;
}

.toggle-news-btn {
  background: none;
  border: 1px solid var(--bengio-border);
  padding: 0.35rem 0.7rem;
  border-radius: 3px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.toggle-news-btn.active {
  background: var(--bengio-teal);
  color: #fff;
  border-color: var(--bengio-teal);
}

.col-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  background: none;
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
}

.btn-action.edit {
  color: var(--bengio-teal);
  text-decoration: underline;
}

.btn-action.delete {
  color: #c44;
}

@media (max-width: 992px) {
  .editor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
