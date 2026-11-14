<template>
  <section class="bengio-blog-section" id="blog-recent">
    <div class="bengio-blog-container">
      <!-- Section Title in Uppercase Bold -->
      <div class="bengio-blog-header">
        <h2 class="bengio-section-title">{{ t.blog.title }}</h2>
        
        <router-link to="/blog-maintenance-predictive" class="view-all-link">
          {{ t.blog.viewAll }}
        </router-link>
      </div>

      <!-- Main Bordered Box in pure Yoshua Bengio aesthetic -->
      <div class="bengio-framed-box">
        <article 
          v-for="(article, idx) in recentArticles" 
          :key="article.id"
          class="bengio-article-item"
          :class="{ 'has-border-top': idx > 0 }"
          @click="openArticle(article)"
        >
          <!-- Article Title in Grand Serif Teal -->
          <h3 class="article-serif-title">
            <span class="title-text">{{ getArticleTitle(article) }}</span>
            <span class="chevron-sign"> »</span>
          </h3>

          <!-- Excerpt -->
          <p class="article-summary">
            {{ getArticleExcerpt(article) }}
          </p>

          <!-- Metadata & Diagonal Arrow Row -->
          <div class="article-meta-row">
            <div class="meta-info">
              <span class="meta-label">{{ t.blog.published }}</span>
              <strong class="meta-val">{{ article.date }}</strong>
              <span class="meta-sep"></span>
              <span class="meta-label">{{ t.blog.by }}</span>
              <strong class="meta-val">{{ article.author || 'Emmanuel GBRA' }}</strong>
              <span v-if="article.category" class="category-tag">
                {{ article.category }}
              </span>
            </div>

            <!-- Diagonal Arrow in square border -->
            <div class="meta-arrow-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-svg">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Teleport PDF Modal if needed -->
    <Teleport to="body">
      <div v-if="showPdfModal" class="bengio-pdf-modal-backdrop" @click="closePdf">
        <div class="bengio-pdf-modal-window" @click.stop>
          <div class="pdf-modal-header">
            <div class="pdf-modal-info">
              <span class="pdf-modal-tag">Document Technique</span>
              <h4 class="pdf-modal-heading">{{ activePdfTitle }}</h4>
            </div>
            <div class="pdf-modal-actions">
              <a :href="activePdfUrl" download class="pdf-dl-link">Télécharger</a>
              <button class="pdf-close-icon" @click="closePdf">✕</button>
            </div>
          </div>
          <div class="pdf-iframe-box">
            <iframe :src="activePdfUrl" width="100%" height="100%" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '../stores/articlesStore'
import { useLanguage } from '../stores/languageStore'

const router = useRouter()
const { articles } = useArticlesStore()
const { t, isEn, articleTranslations } = useLanguage()

const showPdfModal = ref(false)
const activePdfUrl = ref('')
const activePdfTitle = ref('')

const recentArticles = computed(() => {
  return articles.value.slice(0, 4)
})

const getArticleTitle = (article) => {
  if (isEn.value && articleTranslations.EN[article.id]?.title) {
    return articleTranslations.EN[article.id].title
  }
  return article.title
}

const getArticleExcerpt = (article) => {
  if (isEn.value && articleTranslations.EN[article.id]?.excerpt) {
    return articleTranslations.EN[article.id].excerpt
  }
  return article.excerpt
}

const openArticle = (article) => {
  if (!article) return
  if (article.isPdf) {
    activePdfUrl.value = article.url
    activePdfTitle.value = article.title
    showPdfModal.value = true
    document.body.style.overflow = 'hidden'
  } else if (article.isPostView || (article.url && article.url.startsWith('/'))) {
    router.push(article.url)
  } else if (article.url) {
    window.open(article.url, '_blank', 'noopener')
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
.bengio-blog-section {
  background-color: var(--bg-bengio);
  padding: 3rem 0 6rem;
}

.bengio-blog-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.bengio-blog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.bengio-section-title {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #111111;
  text-transform: uppercase;
}

.view-all-link {
  font-family: var(--font-primary);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--bengio-teal);
  text-decoration: none;
  transition: opacity 0.2s;
}

.view-all-link:hover {
  text-decoration: underline;
}

/* Framed Box: Exact Bengio Style with 1px border teal/sage */
.bengio-framed-box {
  border: 1px solid var(--bengio-border);
  background-color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.2s ease;
}

.bengio-article-item {
  padding: 2.8rem 3.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.bengio-article-item:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.bengio-article-item.has-border-top {
  border-top: 1px solid var(--bengio-border);
}

/* Serif Title in Deep Teal */
.article-serif-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 2.7vw, 2.45rem);
  font-weight: 500;
  line-height: 1.25;
  color: var(--bengio-teal);
  letter-spacing: -0.015em;
  margin-bottom: 1.2rem;
  transition: color 0.2s;
}

.bengio-article-item:hover .article-serif-title {
  color: #0c3942;
}

.chevron-sign {
  font-weight: 400;
  color: var(--bengio-border);
  transition: color 0.2s;
}

.bengio-article-item:hover .chevron-sign {
  color: var(--bengio-teal);
}

/* Excerpt */
.article-summary {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  line-height: 1.7;
  color: #2b2b2b;
  margin-bottom: 2rem;
  max-width: 1080px;
}

/* Metadata & Arrow Row */
.article-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-primary);
  font-size: 0.88rem;
  color: #222222;
  flex-wrap: wrap;
}

.meta-label {
  color: #555555;
}

.meta-val {
  font-weight: 700;
  color: #111111;
}

.meta-sep {
  display: inline-block;
  width: 1rem;
}

.category-tag {
  background: rgba(17, 75, 86, 0.08);
  color: var(--bengio-teal);
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border-radius: 3px;
  margin-left: 0.5rem;
}

/* Bengio's Square arrow button */
.meta-arrow-box {
  width: 36px;
  height: 36px;
  border: 1px solid var(--bengio-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: var(--bengio-teal);
  transition: all 0.2s ease;
}

.bengio-article-item:hover .meta-arrow-box {
  background-color: var(--bengio-teal);
  color: #ffffff;
  border-color: var(--bengio-teal);
  transform: translate(2px, -2px);
}

.arrow-svg {
  width: 16px;
  height: 16px;
}

/* PDF Modal styles */
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
  .bengio-article-item {
    padding: 2rem 1.4rem;
  }
}
</style>
