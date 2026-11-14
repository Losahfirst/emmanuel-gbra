<template>
  <div class="mp-blog-page">
    <!-- Hero Header of the Maintenance Blog -->
    <section class="mp-hero">
      <div class="mp-hero-glow"></div>
      <div class="mp-container">
        <div class="breadcrumb">
          <router-link to="/">{{ t.nav.home }}</router-link>
          <span>/</span>
          <span class="active">{{ t.blogPage.title }}</span>
        </div>

        <h1 class="mp-title">
          {{ t.blogPage.title }}
        </h1>

        <p class="mp-description">
          {{ t.blogPage.subtitle }}
        </p>

        <!-- Search & Filter Controls -->
        <div class="mp-controls">
          <div class="mp-search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-ico">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              :placeholder="t.blogPage.searchPlaceholder"
              class="mp-search-input"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">✕</button>
          </div>

          <div class="filter-pills">
            <button 
              v-for="f in filters" 
              :key="f.key"
              @click="activeFilter = f.key"
              class="pill-btn"
              :class="{ active: activeFilter === f.key }"
            >
              {{ f.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content List in Bengio Framed Style -->
    <section class="mp-articles-section">
      <div class="mp-container">
        <div class="bengio-framed-box">
          <article 
            v-for="(art, idx) in filteredArticles" 
            :key="art.id"
            class="mp-article-row"
            :class="{ 'has-border-top': idx > 0 }"
            @click="handleArticleClick(art)"
          >
            <div class="article-meta-badge">
              <span class="badge-cat">{{ art.category }}</span>
              <span class="badge-date">{{ art.date }}</span>
            </div>

            <h2 class="article-headline">
              {{ getArticleTitle(art) }}
              <span class="chevron"> »</span>
            </h2>

            <p class="article-excerpt">
              {{ getArticleExcerpt(art) }}
            </p>

            <div class="article-bottom-bar">
              <div class="doc-format-pill">
                <span v-if="art.isPdf" class="pill-pdf">{{ t.blogPage.pillPdf }}</span>
                <span v-else class="pill-ext">{{ t.blogPage.pillExt }}</span>
              </div>

              <div class="arrow-square" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
            </div>
          </article>

          <!-- Empty fallback -->
          <div v-if="filteredArticles.length === 0" class="no-articles">
            <p>Aucun article de maintenance ne correspond à votre recherche "<strong>{{ searchQuery }}</strong>".</p>
            <button @click="searchQuery = ''; activeFilter = 'all'" class="reset-btn">Réinitialiser les filtres</button>
          </div>
        </div>
      </div>
    </section>

    <BengioContactSection />

    <!-- Teleport PDF Modal -->
    <Teleport to="body">
      <div v-if="showPdfModal" class="bengio-pdf-modal-backdrop" @click="closePdf">
        <div class="bengio-pdf-modal-window" @click.stop>
          <div class="pdf-modal-header">
            <div class="pdf-modal-info">
              <span class="pdf-modal-tag">Document Technique</span>
              <h4 class="pdf-modal-heading">{{ activePdfTitle }}</h4>
            </div>
            <div class="pdf-modal-actions">
              <a :href="activePdfUrl" download class="pdf-dl-link">Télécharger le PDF</a>
              <button class="pdf-close-icon" @click="closePdf">✕</button>
            </div>
          </div>
          <div class="pdf-iframe-box">
            <iframe :src="activePdfUrl" width="100%" height="100%" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BengioHeader from '../components/BengioHeader.vue'
import BengioContactSection from '../components/BengioContactSection.vue'
import BengioFooter from '../components/BengioFooter.vue'
import { useArticlesStore } from '../stores/articlesStore'
import { useLanguage } from '../stores/languageStore'

const router = useRouter()
const { maintenanceArticles, articles } = useArticlesStore()
const { t, isEn, articleTranslations } = useLanguage()

const searchQuery = ref('')
const activeFilter = ref('all')

const showPdfModal = ref(false)
const activePdfUrl = ref('')
const activePdfTitle = ref('')

const filters = computed(() => [
  { key: 'all', label: isEn.value ? 'All Episodes' : 'Tous les épisodes' },
  { key: 'pdf', label: isEn.value ? 'PDF Reports' : 'Rapports PDF' },
  { key: 'kpi', label: isEn.value ? 'KPI Series' : 'Série KPI Analysis' },
  { key: 'all_articles', label: isEn.value ? 'All Articles' : 'Tous les articles' }
])

const getArticleTitle = (art) => {
  if (!art) return ''
  if (isEn.value && articleTranslations.EN[art.id]?.title) {
    return articleTranslations.EN[art.id].title
  }
  return art.title
}

const getArticleExcerpt = (art) => {
  if (!art) return ''
  if (isEn.value && articleTranslations.EN[art.id]?.excerpt) {
    return articleTranslations.EN[art.id].excerpt
  }
  return art.excerpt
}

const filteredArticles = computed(() => {
  let list = activeFilter.value === 'all_articles' ? articles.value : maintenanceArticles.value

  if (activeFilter.value === 'pdf') {
    list = list.filter(a => a.isPdf)
  } else if (activeFilter.value === 'kpi') {
    list = list.filter(a => a.title.toLowerCase().includes('kpi'))
  }

  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list

  return list.filter(a => 
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  )
})

const handleArticleClick = (art) => {
  if (!art) return
  if (art.isPdf) {
    activePdfUrl.value = art.url
    activePdfTitle.value = art.title
    showPdfModal.value = true
    document.body.style.overflow = 'hidden'
  } else if (art.isPostView || (art.url && art.url.startsWith('/'))) {
    router.push(art.url)
  } else if (art.url) {
    window.open(art.url, '_blank', 'noopener')
  }
}

const closePdf = () => {
  showPdfModal.value = false
  activePdfUrl.value = ''
  activePdfTitle.value = ''
  document.body.style.overflow = ''
}
</script>

<style scoped>
.mp-blog-page {
  background-color: var(--bg-bengio);
  min-height: 100vh;
}

.mp-hero {
  position: relative;
  padding: 8.5rem 0 3.5rem;
  overflow: hidden;
}

.mp-hero-glow {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 70vw;
  height: 60vh;
  background: radial-gradient(
    circle at 60% 40%,
    rgba(142, 224, 206, 0.4) 0%,
    rgba(195, 243, 230, 0.15) 50%,
    transparent 75%
  );
  filter: blur(80px);
  pointer-events: none;
}

.mp-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
  position: relative;
  z-index: 2;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-primary);
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  color: #666666;
}

.breadcrumb a {
  color: var(--bengio-teal);
  text-decoration: none;
}

.breadcrumb .active {
  color: #111111;
}

.mp-title {
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 4vw, 3.8rem);
  font-weight: 500;
  line-height: 1.2;
  color: var(--bengio-teal);
  letter-spacing: -0.015em;
  margin-bottom: 1.5rem;
  max-width: 950px;
}

.mp-description {
  font-family: var(--font-primary);
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333333;
  max-width: 780px;
  margin-bottom: 2.5rem;
}

/* Controls */
.mp-controls {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 2rem;
}

.mp-search-box {
  position: relative;
  max-width: 620px;
}

.search-ico {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--bengio-teal);
}

.mp-search-input {
  width: 100%;
  padding: 0.9rem 2.8rem 0.9rem 3rem;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  border: 1px solid var(--bengio-border);
  background-color: #ffffff;
  color: #111111;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.mp-search-input:focus {
  border-color: var(--bengio-teal);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #888;
}

.filter-pills {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pill-btn {
  background-color: transparent;
  border: 1px solid var(--bengio-border);
  padding: 0.45rem 1rem;
  font-family: var(--font-primary);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #222222;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.pill-btn:hover {
  border-color: var(--bengio-teal);
  color: var(--bengio-teal);
}

.pill-btn.active {
  background-color: var(--bengio-teal);
  color: #ffffff;
  border-color: var(--bengio-teal);
}

/* Framed Articles List */
.mp-articles-section {
  padding: 2rem 0 6rem;
}

.bengio-framed-box {
  border: 1px solid var(--bengio-border);
  background-color: rgba(255, 255, 255, 0.45);
}

.mp-article-row {
  padding: 2.8rem 3.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mp-article-row:hover {
  background-color: rgba(255, 255, 255, 0.95);
}

.mp-article-row.has-border-top {
  border-top: 1px solid var(--bengio-border);
}

.article-meta-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.badge-cat {
  font-family: var(--font-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--bengio-teal);
  text-transform: uppercase;
}

.badge-date {
  font-family: var(--font-primary);
  font-size: 0.82rem;
  color: #666666;
}

.article-headline {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
  font-weight: 500;
  line-height: 1.25;
  color: var(--bengio-teal);
  letter-spacing: -0.015em;
  margin-bottom: 1.1rem;
}

.chevron {
  color: var(--bengio-border);
}

.article-excerpt {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  line-height: 1.7;
  color: #333333;
  margin-bottom: 1.8rem;
  max-width: 1050px;
}

.article-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.doc-format-pill {
  font-family: var(--font-primary);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--bengio-teal);
}

.arrow-square {
  width: 38px;
  height: 38px;
  border: 1px solid var(--bengio-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: var(--bengio-teal);
  transition: all 0.2s ease;
}

.mp-article-row:hover .arrow-square {
  background-color: var(--bengio-teal);
  color: #ffffff;
  border-color: var(--bengio-teal);
  transform: translate(2px, -2px);
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.no-articles {
  padding: 4rem 2rem;
  text-align: center;
  font-family: var(--font-primary);
  color: #555;
}

.reset-btn {
  margin-top: 1rem;
  background: var(--bengio-teal);
  color: #fff;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
  cursor: pointer;
}

/* PDF Modal */
.bengio-pdf-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17, 75, 86, 0.6);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.bengio-pdf-modal-window {
  width: 100%;
  max-width: 1000px;
  height: 88vh;
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
}

.pdf-modal-header {
  padding: 1rem 1.8rem;
  background: #f7faf9;
  border-bottom: 1px solid var(--bengio-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pdf-modal-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bengio-teal);
  text-transform: uppercase;
}

.pdf-modal-heading {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: #111111;
}

.pdf-modal-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pdf-dl-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--bengio-teal);
  text-decoration: underline;
}

.pdf-close-icon {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}

.pdf-iframe-box {
  flex: 1;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .mp-article-row {
    padding: 2rem 1.4rem;
  }
}
</style>
