<template>
  <div class="articles-page">
    <section class="page-hero" :style="{ backgroundImage: `url('${heroBg}')` }">
      <div class="overlay"></div>
      <div class="hero-container">
        <div class="hero-content reveal">
          <h1 class="hero-title">
            Expertise & Éditorial.
          </h1>
          <p class="hero-subtitle">
            Pensées, Études & Perspectives sur la Data Science et la Maintenance Prédictive de pointe.
          </p>
        </div>
      </div>
    </section>
    
    <ArticlesSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ArticlesSection from '../components/ArticlesSection.vue'

const heroBg = 'https://mistral.ai/_next/static/media/mistral-frontier-26.15-1ez5hhac6r.webp'

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in')
      }
    })
  }, { threshold: 0.1 })
  
  reveals.forEach(r => observer.observe(r))
})
</script>

<style scoped>
.articles-page {
  background-color: var(--cream);
}

.page-hero {
  position: relative;
  min-height: 70vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  padding-top: 80px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.6));
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 850;
  color: var(--white);
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 2rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 650px;
  line-height: 1.5;
  font-weight: 400;
}

@media (max-width: 768px) {
  .page-hero { min-height: 60vh; }
  .hero-title { font-size: 3.5rem; }
}
</style>


