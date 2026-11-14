<template>
  <div class="bengio-post-page">
    <!-- Ambient Bengio Glows on both sides matching Yoshua Bengio's layout -->
    <div class="ambient-glow-left" aria-hidden="true"></div>
    <div class="ambient-glow-right" aria-hidden="true"></div>

    <main class="post-main-container">
      <!-- Breadcrumb navigation -->
      <nav class="post-breadcrumb" aria-label="Fil d'Ariane">
        <router-link to="/">{{ t.nav.home }}</router-link>
        <span class="sep">/</span>
        <router-link to="/blog-maintenance-predictive">{{ t.nav.blog }}</router-link>
        <span class="sep">/</span>
        <span class="current">{{ articleTitle }}</span>
      </nav>

      <!-- Post Article Container (centered column like Bengio's site) -->
      <article class="post-article-box" v-if="article">
        <!-- Top Banner Media matching Yoshua Bengio's top cover format -->
        <div class="post-banner-wrapper">
          <img 
            :src="article.image" 
            :alt="articleTitle" 
            class="post-banner-img"
          />
        </div>

        <!-- Official Caption underneath banner -->
        <div class="post-caption-row">
          <span class="caption-text">{{ articleCaption }}</span>
        </div>

        <!-- Post Header: Category, Date, Author -->
        <div class="post-header-meta">
          <span class="post-cat-badge">{{ article.category }}</span>
          <span class="meta-dot">•</span>
          <time class="post-date">{{ article.date }}</time>
          <span class="meta-dot">•</span>
          <span class="post-author">{{ article.author || 'Emmanuel GBRA' }}</span>
        </div>

        <!-- Large Grand Serif Headline in Bengio FlechaBronzeaM font -->
        <h1 class="post-grand-title">
          {{ articleTitle }}
        </h1>

        <!-- Post Body formatted in Bengio's signature academic layout -->
        <div class="post-body-content">
          <!-- Opening Lead Paragraph in Italic Serif Tone -->
          <p class="post-lead-paragraph">
            {{ leadParagraph }}
          </p>

          <!-- Subsequent Body Paragraphs -->
          <p 
            v-for="(para, idx) in bodyParagraphs" 
            :key="idx" 
            class="post-body-paragraph"
          >
            {{ para }}
          </p>

          <!-- Resources & External Reference Links in Academic Bengio Style -->
          <div v-if="article.resources && article.resources.length" class="post-resources-block">
            <h3 class="resources-heading">
              {{ isEn ? 'To go further & explore the technology:' : 'Pour aller plus loin et tester la technologie :' }}
            </h3>
            <ul class="resources-list">
              <li v-for="(res, rIdx) in article.resources" :key="rIdx" class="resource-item">
                <a :href="res.url" target="_blank" rel="noopener noreferrer" class="resource-link">
                  <span class="resource-bullet">•</span>
                  <span class="resource-label">{{ res.label }} :</span>
                  <span class="resource-url">{{ res.url }}</span>
                  <span class="ext-arrow">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Thematic Tags / Hashtags -->
          <div v-if="article.tags && article.tags.length" class="post-tags-row">
            <span v-for="tag in article.tags" :key="tag" class="post-tag-badge">
              {{ tag }}
            </span>
          </div>

          <!-- Action / Read Full Specs Link in Bengio Blue-Green -->
          <div class="post-action-box">
            <a 
              href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="post-action-link"
            >
              <span>{{ isEn ? 'Discuss this project on LinkedIn' : 'Échanger sur cette architecture sur LinkedIn' }}</span>
              <span class="ext-arrow">↗</span>
            </a>
          </div>
        </div>

        <!-- Bottom Navigation: Article Précédent / Suivant matching Yoshua Bengio -->
        <div class="post-bottom-nav">
          <router-link 
            v-if="prevArticle" 
            :to="prevArticle.url" 
            class="bottom-nav-link prev"
          >
            <span class="nav-direction">← {{ isEn ? 'Previous Article' : 'Article précédent' }}</span>
            <span class="nav-article-name">{{ prevArticleTitle }}</span>
          </router-link>

          <router-link 
            v-else
            to="/blog-maintenance-predictive" 
            class="bottom-nav-link prev"
          >
            <span class="nav-direction">← {{ isEn ? 'Back to Blog' : 'Retour au blog' }}</span>
            <span class="nav-article-name">{{ isEn ? 'Predictive Maintenance & R&D' : 'Maintenance Prédictive & R&D' }}</span>
          </router-link>
        </div>
      </article>

      <!-- Fallback if not found -->
      <div v-else class="post-not-found">
        <h2>{{ isEn ? 'Article not found' : 'Article introuvable' }}</h2>
        <router-link to="/blog-maintenance-predictive" class="back-link">
          ← {{ isEn ? 'Back to Blog' : 'Retour au Blog' }}
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useArticlesStore } from '../stores/articlesStore'
import { useLanguage } from '../stores/languageStore'

const route = useRoute()
const { articles } = useArticlesStore()
const { t, isEn, articleTranslations } = useLanguage()

// Find article by id from route params or fallback to latest article
const articleId = computed(() => {
  return parseInt(route.params.id, 10) || 7
})

const article = computed(() => {
  return articles.value.find(a => a.id === articleId.value) || articles.value[0]
})

// Previous article for the bottom link
const prevArticle = computed(() => {
  if (!article.value) return null
  const idx = articles.value.findIndex(a => a.id === article.value.id)
  if (idx !== -1 && idx + 1 < articles.value.length) {
    return articles.value[idx + 1]
  }
  return null
})

const prevArticleTitle = computed(() => {
  if (!prevArticle.value) return ''
  if (isEn.value && articleTranslations.EN[prevArticle.value.id]?.title) {
    return articleTranslations.EN[prevArticle.value.id].title
  }
  return prevArticle.value.title
})

// Bilingual translations for the current article
const articleTitle = computed(() => {
  if (!article.value) return ''
  if (isEn.value && articleTranslations.EN[article.value.id]?.title) {
    return articleTranslations.EN[article.value.id].title
  }
  return article.value.title
})

const articleCaption = computed(() => {
  if (!article.value) return ''
  if (isEn.value && articleTranslations.EN[article.value.id]?.caption) {
    return articleTranslations.EN[article.value.id].caption
  }
  return article.value.caption || '© Emmanuel GBRA'
})

const leadParagraph = computed(() => {
  if (!article.value) return ''
  if (isEn.value && articleTranslations.EN[article.value.id]?.paragraphs) {
    return articleTranslations.EN[article.value.id].paragraphs[0]
  }
  if (article.value.fullContent && article.value.fullContent.length > 0) {
    return article.value.fullContent[0]
  }
  return article.value.excerpt
})

const bodyParagraphs = computed(() => {
  if (!article.value) return []
  if (isEn.value && articleTranslations.EN[article.value.id]?.paragraphs) {
    return articleTranslations.EN[article.value.id].paragraphs.slice(1)
  }
  if (article.value.fullContent && article.value.fullContent.length > 1) {
    return article.value.fullContent.slice(1)
  }
  return []
})
</script>

<style scoped>
.bengio-post-page {
  background-color: #e6e7e2;
  min-height: 100vh;
  position: relative;
  padding-top: 130px;
  padding-bottom: 7rem;
  overflow-x: hidden;
}

/* Ambient glow accents inspired by Yoshua Bengio's layout */
.ambient-glow-left {
  position: absolute;
  top: 15%;
  left: -200px;
  width: 550px;
  height: 650px;
  background: radial-gradient(circle, rgba(142, 224, 206, 0.45) 0%, rgba(230, 231, 226, 0) 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.ambient-glow-right {
  position: absolute;
  top: 35%;
  right: -200px;
  width: 600px;
  height: 700px;
  background: radial-gradient(circle, rgba(112, 175, 190, 0.4) 0%, rgba(230, 231, 226, 0) 70%);
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}

.post-main-container {
  position: relative;
  z-index: 2;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Breadcrumb */
.post-breadcrumb {
  font-family: var(--font-primary);
  font-size: 0.92rem;
  color: #666666;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-breadcrumb a {
  color: var(--bengio-teal);
  text-decoration: none;
  transition: opacity 0.2s;
}

.post-breadcrumb a:hover {
  text-decoration: underline;
}

.post-breadcrumb .sep {
  opacity: 0.5;
}

.post-breadcrumb .current {
  color: #111111;
  font-weight: 500;
}

/* Post Box */
.post-article-box {
  width: 100%;
}

/* Top Banner Image */
.post-banner-wrapper {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 32px rgba(0, 60, 55, 0.08);
  border: 1px solid rgba(112, 175, 190, 0.35);
  background-color: #ffffff;
}

.post-banner-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Caption row */
.post-caption-row {
  margin-top: 0.65rem;
  margin-bottom: 2.2rem;
}

.caption-text {
  font-family: var(--font-primary);
  font-size: 0.85rem;
  color: #555555;
  font-style: normal;
  letter-spacing: -0.01em;
}

/* Meta line */
.post-header-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-primary);
  font-size: 0.88rem;
  color: #555555;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
}

.post-cat-badge {
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--bengio-teal);
  text-transform: uppercase;
}

.meta-dot {
  opacity: 0.4;
}

/* Grand title */
.post-grand-title {
  font-family: "FlechaBronzeaM", var(--font-serif);
  font-size: clamp(2.4rem, 4.2vw, 3.8rem);
  line-height: 1.1;
  color: #003c37;
  font-weight: 400;
  letter-spacing: -0.025em;
  margin: 0 0 2.5rem 0;
}

/* Body Content */
.post-body-content {
  width: 100%;
}

.post-lead-paragraph {
  font-family: var(--font-primary);
  font-size: clamp(1.15rem, 1.45vw, 1.28rem);
  line-height: 1.88;
  color: #111111;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 2rem;
  padding-left: 1.2rem;
  border-left: 2px solid var(--bengio-teal);
}

.post-body-paragraph {
  font-family: var(--font-primary);
  font-size: clamp(1.05rem, 1.3vw, 1.18rem);
  line-height: 1.85;
  color: #111111;
  font-weight: 400;
  margin-bottom: 2rem;
  letter-spacing: -0.005em;
}

/* Resources Block */
.post-resources-block {
  margin-top: 2.8rem;
  margin-bottom: 2.2rem;
  padding: 1.8rem 2rem;
  background-color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(112, 175, 190, 0.35);
  border-radius: 4px;
}

.resources-heading {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  font-weight: 700;
  color: #003c37;
  margin: 0 0 1.2rem 0;
}

.resources-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.resource-item {
  display: flex;
}

.resource-link {
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.45rem;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  color: #111111;
  text-decoration: none;
  transition: color 0.2s;
}

.resource-link:hover {
  color: var(--bengio-teal);
}

.resource-link:hover .resource-url {
  text-decoration: underline;
}

.resource-bullet {
  color: var(--bengio-teal);
  font-weight: 700;
}

.resource-label {
  font-weight: 600;
  color: #111111;
}

.resource-url {
  color: var(--bengio-teal);
  word-break: break-all;
}

/* Tags Row */
.post-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

.post-tag-badge {
  font-family: var(--font-primary);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--bengio-teal);
  background-color: rgba(0, 60, 55, 0.06);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(112, 175, 190, 0.25);
  letter-spacing: -0.01em;
}

/* Action Link */
.post-action-box {
  margin-top: 2.8rem;
  margin-bottom: 4.5rem;
}

.post-action-link {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  color: var(--bengio-teal);
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.2s;
}

.post-action-link:hover {
  opacity: 0.8;
}

.ext-arrow {
  font-size: 1.1rem;
  line-height: 1;
}

/* Bottom Nav */
.post-bottom-nav {
  border-top: 1px solid rgba(126, 163, 163, 0.4);
  padding-top: 2.8rem;
  display: flex;
  justify-content: flex-start;
}

.bottom-nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-decoration: none;
  transition: transform 0.2s;
  max-width: 500px;
}

.bottom-nav-link:hover {
  transform: translateX(-3px);
}

.nav-direction {
  font-family: var(--font-primary);
  font-size: 0.95rem;
  color: var(--bengio-teal);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-article-name {
  font-family: var(--font-primary);
  font-size: 1.1rem;
  color: #111111;
  font-weight: 700;
  line-height: 1.4;
}

/* Fallback */
.post-not-found {
  text-align: center;
  padding: 4rem 0;
}

.back-link {
  color: var(--bengio-teal);
  font-weight: 600;
}

@media (max-width: 768px) {
  .bengio-post-page {
    padding-top: 105px;
  }
  .post-lead-paragraph {
    padding-left: 0.8rem;
  }
}
</style>
