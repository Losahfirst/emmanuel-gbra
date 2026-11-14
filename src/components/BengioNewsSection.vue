<template>
  <section class="bengio-news-section" id="nouvelles">
    <div class="bengio-news-container">
      <!-- Section Header with Title & Arrow Controls -->
      <div class="bengio-section-header">
        <h2 class="bengio-section-title">{{ t.news.title }}</h2>
        
        <div class="bengio-carousel-controls" v-if="newsArticles.length > 1">
          <button 
            @click="prevNews" 
            class="carousel-nav-btn" 
            aria-label="Previous / Précédent"
            :disabled="currentIndex === 0"
          >
            ←
          </button>
          <button 
            @click="nextNews" 
            class="carousel-nav-btn" 
            aria-label="Next / Suivant"
            :disabled="currentIndex >= newsArticles.length - 1"
          >
            →
          </button>
        </div>
      </div>

      <!-- Main News Card in Pure Yoshua Bengio Style -->
      <div 
        v-if="currentArticle" 
        class="bengio-news-card"
        @click="openArticle(currentArticle)"
      >
        <!-- Card Left: Image -->
        <div class="news-media-wrap">
          <img 
            :src="currentArticle.image || defaultArticleImg" 
            :alt="articleTitle" 
            class="news-media-img"
            @error="onMediaError"
          />
        </div>

        <!-- Card Right: Title, Summary, External Link Arrow -->
        <div class="news-content-wrap">
          <div class="news-content-body">
            <h3 class="news-title">
              {{ articleTitle }}
            </h3>

            <p class="news-excerpt">
              {{ articleExcerpt }}
            </p>
          </div>

          <!-- Bottom Action with Diagonal Arrow in square box -->
          <div class="news-footer-action">
            <span class="news-read-hint">
              {{ currentArticle.isPdf ? t.news.readPdf : t.news.readArticle }}
            </span>
            <div class="square-arrow-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="diagonal-arrow">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Dots for Quick Navigation -->
      <div class="bengio-news-dots" v-if="newsArticles.length > 1">
        <button
          v-for="(art, idx) in newsArticles"
          :key="art.id"
          class="dot-indicator"
          :class="{ active: idx === currentIndex }"
          @click="currentIndex = idx"
          :aria-label="'Aller à la nouvelle ' + (idx + 1)"
        ></button>
      </div>
    </div>

    <!-- Teleport PDF Modal if selected article is a PDF -->
    <Teleport to="body">
      <div v-if="showPdfModal" class="bengio-pdf-modal-backdrop" @click="closePdf">
        <div class="bengio-pdf-modal-window" @click.stop>
          <div class="pdf-modal-header">
            <div class="pdf-modal-info">
              <span class="pdf-modal-tag">Document Technique</span>
              <h4 class="pdf-modal-heading">{{ activePdfTitle }}</h4>
            </div>
            <div class="pdf-modal-actions">
              <a :href="activePdfUrl" download class="pdf-dl-link">
                Télécharger
              </a>
              <button class="pdf-close-icon" @click="closePdf" aria-label="Fermer">✕</button>
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
const { newsArticles } = useArticlesStore()
const { t, isEn, articleTranslations } = useLanguage()

const currentIndex = ref(0)
const defaultArticleImg = '/images/articles/maintenance-predictive-cover.png'

const showPdfModal = ref(false)
const activePdfUrl = ref('')
const activePdfTitle = ref('')

const currentArticle = computed(() => {
  if (!newsArticles.value || newsArticles.value.length === 0) return null
  return newsArticles.value[currentIndex.value] || newsArticles.value[0]
})

const articleTitle = computed(() => {
  if (!currentArticle.value) return ''
  if (isEn.value && articleTranslations.EN[currentArticle.value.id]?.title) {
    return articleTranslations.EN[currentArticle.value.id].title
  }
  return currentArticle.value.title
})

const articleExcerpt = computed(() => {
  if (!currentArticle.value) return ''
  if (isEn.value && articleTranslations.EN[currentArticle.value.id]?.excerpt) {
    return articleTranslations.EN[currentArticle.value.id].excerpt
  }
  return currentArticle.value.excerpt
})

const prevNews = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextNews = () => {
  if (currentIndex.value < newsArticles.value.length - 1) {
    currentIndex.value++
  }
}

const onMediaError = (e) => {
  e.target.src = '/images/articles/kpi-analysis-cover.png'
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
.bengio-news-section {
  background-color: var(--bg-bengio);
  padding: 5rem 0;
  position: relative;
}

.bengio-news-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

/* Header: NOUVELLES in uppercase bold + arrow buttons */
.bengio-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.bengio-section-title {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #111111;
  text-transform: uppercase;
}

.bengio-carousel-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.carousel-nav-btn {
  width: 38px;
  height: 38px;
  background-color: #ffffff;
  border: 1px solid var(--bengio-border-light);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-family: monospace;
  color: #111111;
  cursor: pointer;
  transition: all 0.2s ease;
}

.carousel-nav-btn:hover:not(:disabled) {
  background-color: var(--bengio-teal);
  color: #ffffff;
  border-color: var(--bengio-teal);
}

.carousel-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* The Bengio News Card */
.bengio-news-card {
  background-color: #ffffff;
  border: 1px solid rgba(126, 163, 163, 0.35);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  display: grid;
  grid-template-columns: 480px 1fr;
  min-height: 360px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.bengio-news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(17, 75, 86, 0.08);
}

/* Media Box */
.news-media-wrap {
  position: relative;
  overflow: hidden;
  background-color: #e3edea;
}

.news-media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.4s ease;
}

.bengio-news-card:hover .news-media-img {
  transform: scale(1.02);
}

/* Content Box */
.news-content-wrap {
  padding: 3rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-content-body {
  margin-bottom: 2rem;
}

.news-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
  font-weight: 500;
  line-height: 1.25;
  color: var(--bengio-teal);
  letter-spacing: -0.015em;
  margin-bottom: 1.4rem;
}

.news-excerpt {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  line-height: 1.7;
  color: #333333;
  font-weight: 400;
}

/* Footer Action */
.news-footer-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
}

.news-read-hint {
  font-family: var(--font-primary);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--bengio-teal);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Square box with diagonal arrow (Bengio's signature bottom-right element) */
.square-arrow-btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(126, 163, 163, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: var(--bengio-teal);
  transition: all 0.2s ease;
}

.bengio-news-card:hover .square-arrow-btn {
  background-color: var(--bengio-teal);
  color: #ffffff;
  border-color: var(--bengio-teal);
  transform: translate(2px, -2px);
}

.diagonal-arrow {
  width: 18px;
  height: 18px;
}

/* Dots */
.bengio-news-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.8rem;
}

.dot-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--bengio-border);
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.dot-indicator.active {
  background-color: var(--bengio-teal);
  width: 28px;
  border-radius: 10px;
}

/* Modal PDF */
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
  letter-spacing: 0.08em;
}

.pdf-modal-heading {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: #111111;
  margin-top: 0.2rem;
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
  color: #444;
}

.pdf-iframe-box {
  flex: 1;
  width: 100%;
  height: 100%;
}

@media (max-width: 1024px) {
  .bengio-news-card {
    grid-template-columns: 380px 1fr;
  }
  .news-content-wrap {
    padding: 2.2rem;
  }
}

@media (max-width: 820px) {
  .bengio-news-card {
    grid-template-columns: 1fr;
  }
  .news-media-wrap {
    height: 240px;
  }
  .news-content-wrap {
    padding: 1.8rem 1.5rem;
  }
}
</style>
