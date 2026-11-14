<template>
  <div class="works-bengio-page">
    <!-- Header with Bengio's official post gradient -->
    <section class="works-hero">
      <div class="works-container">
        <div class="works-breadcrumb">
          <router-link to="/">{{ t.nav.home }}</router-link>
          <span>/</span>
          <span class="active">{{ t.works.title }}</span>
        </div>

        <h1 class="works-title">{{ t.works.title }}</h1>

        <p class="works-lead">
          {{ t.works.subtitle }}
        </p>

        <!-- Category Filter Pills -->
        <div class="works-filter-bar">
          <button 
            v-for="cat in categories" 
            :key="cat.key"
            @click="activeCat = cat.key"
            class="works-cat-btn"
            :class="{ active: activeCat === cat.key }"
          >
            {{ cat.label }} ({{ getCount(cat.key) }})
          </button>
        </div>
      </div>
    </section>

    <!-- Fine vertical connector line -->
    <div class="works-vertical-divider" aria-hidden="true"></div>

    <!-- Main Framed Grid matching Yoshua Bengio's aesthetic -->
    <section class="works-grid-section">
      <div class="works-container">
        <div class="bengio-works-framed">
          <article 
            v-for="(p, idx) in filteredProjects" 
            :key="p.id"
            class="bengio-project-row"
            :class="{ 'has-border-top': idx > 0 }"
            @click="openProjectModal(p)"
          >
            <!-- Project Media -->
            <div class="project-media-col">
              <div class="project-img-box">
                <img :src="p.images[0]" :alt="getProjectTitle(p)" loading="lazy" />
              </div>
            </div>

            <!-- Project Details -->
            <div class="project-info-col">
              <div class="project-meta-line">
                <span class="cat-tag">{{ p.categoryLabel }}</span>
                <span v-if="p.client" class="client-name">• {{ p.client }}</span>
                <span v-if="getProjectMetrics(p)" class="metric-pill">{{ getProjectMetrics(p) }}</span>
              </div>

              <h2 class="project-serif-title">
                {{ getProjectTitle(p) }}
                <span class="chevron"> »</span>
              </h2>

              <p class="project-desc">{{ getProjectShortDesc(p) }}</p>

              <div class="tags-row">
                <span v-for="tag in p.tags.slice(0, 5)" :key="tag" class="tag-pill">
                  {{ tag }}
                </span>
                <span v-if="p.tags.length > 5" class="tag-pill more">+{{ p.tags.length - 5 }}</span>
              </div>

              <div class="project-action-row">
                <span class="view-details-txt">Explorer l'architecture & l'impact →</span>
                <div class="square-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Detailed Modal View for Project Deep Dive -->
    <Teleport to="body">
      <div v-if="activeModalProject" class="project-modal-backdrop" @click="closeProjectModal">
        <div class="project-modal-box" @click.stop>
          <div class="modal-top-bar">
            <div class="modal-badge-group">
              <span class="modal-cat">{{ activeModalProject.categoryLabel }}</span>
              <span v-if="activeModalProject.client" class="modal-client">• {{ activeModalProject.client }}</span>
            </div>
            <button class="modal-close-btn" @click="closeProjectModal" :aria-label="t.works.modalClose">✕</button>
          </div>

          <div class="modal-body-scroll">
            <h2 class="modal-headline">{{ getProjectTitle(activeModalProject) }}</h2>
            <p class="modal-intro">{{ getProjectShortDesc(activeModalProject) }}</p>

            <!-- Image preview Gallery -->
            <div class="modal-gallery-area" v-if="activeModalProject.images.length > 0">
              <div class="main-slide">
                <img :src="activeModalProject.images[activeSlideIndex]" :alt="getProjectTitle(activeModalProject)" />
              </div>
              <div v-if="activeModalProject.images.length > 1" class="thumbs-list">
                <button 
                  v-for="(img, i) in activeModalProject.images" 
                  :key="i"
                  class="thumb-item"
                  :class="{ active: activeSlideIndex === i }"
                  @click="activeSlideIndex = i"
                >
                  <img :src="img" alt="" />
                  <span>{{ activeModalProject.imageLabels ? activeModalProject.imageLabels[i] : 'Vue ' + (i + 1) }}</span>
                </button>
              </div>
            </div>

            <!-- Architecture & Details -->
            <div class="modal-text-block">
              <h3 class="block-heading">{{ t.works.modalDesc }}</h3>
              <p class="block-paragraph">{{ getProjectFullDesc(activeModalProject) }}</p>
            </div>

            <!-- Impact Points -->
            <div class="modal-text-block" v-if="getProjectImpact(activeModalProject)">
              <h3 class="block-heading">{{ t.works.modalImpact }}</h3>
              <ul class="impact-bullets">
                <li v-for="imp in getProjectImpact(activeModalProject)" :key="imp">
                  <span class="bullet-dot">✓</span>
                  <span>{{ imp }}</span>
                </li>
              </ul>
            </div>

            <!-- Tags -->
            <div class="modal-text-block">
              <h3 class="block-heading">{{ t.works.modalTech }}</h3>
              <div class="modal-tags">
                <span v-for="t in activeModalProject.tags" :key="t" class="modal-tag-item">{{ t }}</span>
              </div>
            </div>

            <!-- Links -->
            <div class="modal-links-row" v-if="activeModalProject.link || activeModalProject.github">
              <a v-if="activeModalProject.link" :href="activeModalProject.link" target="_blank" rel="noopener" class="btn-visit">
                <span>{{ t.works.modalBtn }}</span>
                <span class="ext-arrow">↗</span>
              </a>
              <a v-if="activeModalProject.github" :href="activeModalProject.github" target="_blank" rel="noopener" class="btn-github">
                Code Source / Dépôt
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ALL_PROJECTS } from '../data/projectsData'
import { useLanguage } from '../stores/languageStore'

const { t, isEn, projectTranslations } = useLanguage()

const activeCat = ref('all')
const activeModalProject = ref(null)
const activeSlideIndex = ref(0)

const categories = computed(() => [
  { key: 'all', label: isEn.value ? 'All Works' : 'Tous les projets' },
  { key: 'ai', label: isEn.value ? 'AI & RAG' : 'IA & RAG' },
  { key: 'saas', label: isEn.value ? 'SaaS & Platforms' : 'SaaS & Plateformes' },
  { key: 'industry', label: isEn.value ? 'Industry & IoT' : 'Industrie & IoT' }
])

const getProjectTitle = (p) => {
  if (!p) return ''
  if (isEn.value && projectTranslations.EN[p.id]?.title) {
    return projectTranslations.EN[p.id].title
  }
  return p.title
}

const getProjectShortDesc = (p) => {
  if (!p) return ''
  if (isEn.value && projectTranslations.EN[p.id]?.shortDescription) {
    return projectTranslations.EN[p.id].shortDescription
  }
  return p.shortDescription
}

const getProjectFullDesc = (p) => {
  if (!p) return ''
  if (isEn.value && projectTranslations.EN[p.id]?.fullDescription) {
    return projectTranslations.EN[p.id].fullDescription
  }
  return p.fullDescription
}

const getProjectMetrics = (p) => {
  if (!p) return ''
  if (isEn.value && projectTranslations.EN[p.id]?.metrics) {
    return projectTranslations.EN[p.id].metrics
  }
  return p.metrics
}

const getProjectImpact = (p) => {
  if (!p) return []
  if (isEn.value && projectTranslations.EN[p.id]?.impact) {
    return projectTranslations.EN[p.id].impact
  }
  return p.impact
}

const filteredProjects = computed(() => {
  if (activeCat.value === 'all') return ALL_PROJECTS
  return ALL_PROJECTS.filter(p => p.category === activeCat.value)
})

const getCount = (k) => {
  if (k === 'all') return ALL_PROJECTS.length
  return ALL_PROJECTS.filter(p => p.category === k).length
}

const openProjectModal = (p) => {
  activeModalProject.value = p
  activeSlideIndex.value = 0
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  activeModalProject.value = null
  activeSlideIndex.value = 0
  document.body.style.overflow = ''
}
</script>

<style scoped>
.works-bengio-page {
  background-color: #e6e7e2;
  min-height: 100vh;
  padding-bottom: 6rem;
}

/* Works Hero using Bengio's post gradient background */
.works-hero {
  position: relative;
  padding: 8.5rem 0 3rem;
  background-image: url(/images/decorations/bengio-post-gradient.png);
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 800px auto;
}

.works-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.works-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-primary);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 1.5rem;
}

.works-breadcrumb a {
  color: #003c37;
  text-decoration: none;
}

.works-breadcrumb .active {
  color: #111;
}

/* Title in FlechaBronzeaM (80px) */
.works-title {
  font-family: "FlechaBronzeaM", 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 5.2vw, 5.2rem);
  font-weight: 400;
  line-height: 1.05;
  color: #003c37;
  letter-spacing: -0.025em;
  margin-bottom: 1.4rem;
}

.works-lead {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  line-height: 1.7;
  color: #222;
  max-width: 820px;
  margin-bottom: 2.5rem;
}

/* Filter pills */
.works-filter-bar {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.works-cat-btn {
  background: transparent;
  border: 1px solid var(--bengio-border);
  padding: 0.45rem 1.1rem;
  font-family: var(--font-primary);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #222;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.works-cat-btn:hover {
  border-color: #003c37;
  color: #003c37;
}

.works-cat-btn.active {
  background-color: #003c37;
  color: #ffffff;
  border-color: #003c37;
}

/* Vertical divider line */
.works-vertical-divider {
  width: 1.5px;
  height: 48px;
  background-color: #70afbe;
  margin: 2.5rem auto 3.5rem;
  opacity: 0.8;
}

/* Framed Box matching Yoshua Bengio's design */
.bengio-works-framed {
  border: 1px solid var(--bengio-border);
  background-color: rgba(255, 255, 255, 0.45);
}

.bengio-project-row {
  display: grid;
  grid-template-columns: 420px 1fr;
  padding: 3rem;
  gap: 3rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.bengio-project-row:hover {
  background-color: rgba(255, 255, 255, 0.95);
}

.bengio-project-row.has-border-top {
  border-top: 1px solid var(--bengio-border);
}

.project-media-col {
  display: flex;
  align-items: center;
}

.project-img-box {
  width: 100%;
  height: 240px;
  background: #dbe7e7;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid rgba(126, 163, 163, 0.3);
}

.project-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.bengio-project-row:hover .project-img-box img {
  transform: scale(1.03);
}

.project-info-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-meta-line {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
}

.cat-tag {
  font-family: var(--font-primary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #003c37;
  text-transform: uppercase;
}

.client-name {
  font-size: 0.82rem;
  color: #555;
}

.metric-pill {
  background: rgba(112, 175, 190, 0.2);
  color: #003c37;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 3px;
}

.project-serif-title {
  font-family: "FlechaBronzeaM", 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.85rem, 2.4vw, 2.3rem);
  font-weight: 400;
  line-height: 1.2;
  color: #003c37;
  letter-spacing: -0.015em;
  margin-bottom: 0.9rem;
}

.chevron {
  color: var(--bengio-border);
}

.project-desc {
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.65;
  color: #333;
  margin-bottom: 1.4rem;
}

.tags-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 1.4rem;
}

.tag-pill {
  background: #f0ece3;
  color: #444;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

.tag-pill.more {
  background: transparent;
  color: #777;
}

.project-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(126, 163, 163, 0.25);
}

.view-details-txt {
  font-family: var(--font-primary);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #003c37;
  text-transform: uppercase;
}

.square-arrow {
  width: 36px;
  height: 36px;
  border: 1px solid var(--bengio-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #003c37;
  transition: all 0.2s ease;
}

.bengio-project-row:hover .square-arrow {
  background-color: #003c37;
  color: #ffffff;
  border-color: #003c37;
  transform: translate(2px, -2px);
}

.arrow-svg {
  width: 16px;
  height: 16px;
}

/* Modal Deep Dive */
.project-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 40, 45, 0.65);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.project-modal-box {
  width: 100%;
  max-width: 950px;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.modal-top-bar {
  padding: 1.2rem 2rem;
  background: #f7f9f8;
  border-bottom: 1px solid var(--bengio-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-cat {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #003c37;
  text-transform: uppercase;
}

.modal-client {
  font-size: 0.82rem;
  color: #555;
  margin-left: 0.4rem;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #333;
}

.modal-body-scroll {
  padding: 2.2rem 2.5rem;
  overflow-y: auto;
}

.modal-headline {
  font-family: "FlechaBronzeaM", 'Cormorant Garamond', Georgia, serif;
  font-size: 2.4rem;
  color: #003c37;
  line-height: 1.15;
  margin-bottom: 0.8rem;
}

.modal-intro {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1.8rem;
}

.modal-gallery-area {
  margin-bottom: 2rem;
}

.main-slide img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  background: #111;
  border-radius: 4px;
}

.thumbs-list {
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
}

.thumb-item {
  border: 2px solid transparent;
  background: #f3f3f0;
  padding: 0.2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.thumb-item.active {
  border-color: #003c37;
}

.thumb-item img {
  width: 90px;
  height: 55px;
  object-fit: cover;
}

.thumb-item span {
  font-size: 0.7rem;
  color: #555;
}

.modal-text-block {
  margin-bottom: 1.6rem;
}

.block-heading {
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #003c37;
  margin-bottom: 0.6rem;
}

.block-paragraph {
  font-size: 0.98rem;
  line-height: 1.7;
  color: #333;
}

.impact-bullets {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.impact-bullets li {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: #222;
}

.bullet-dot {
  color: #003c37;
  font-weight: 800;
}

.modal-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.modal-tag-item {
  background: #f1ede6;
  color: #003c37;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: 3px;
}

.modal-links-row {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.btn-visit {
  background: #003c37;
  color: #fff;
  padding: 0.75rem 1.6rem;
  text-decoration: none;
  font-weight: 700;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-github {
  border: 1px solid #003c37;
  color: #003c37;
  padding: 0.75rem 1.4rem;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .bengio-project-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
