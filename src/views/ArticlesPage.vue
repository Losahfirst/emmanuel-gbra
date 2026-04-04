<template>
  <div class="articles-page">
    <div class="page-hero">
      <div class="hero-content reveal">
        <span class="label">Éditorial</span>
        <h1>Mes Articles & <span>Perspectives</span></h1>
        <p>Expertise en analyse de données appliquées à l'énergie, à l'industrie et aux technologies IoT.</p>
      </div>
    </div>
    
    <ArticlesSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ArticlesSection from '../components/ArticlesSection.vue'

onMounted(() => {
  // Intersection Observer for scroll reveal (re-using the logic in style.css for .reveal)
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
  padding-top: 80px;
}

.page-hero {
  position: relative;
  background: url('/images/site/emmanuel-presentation.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed; /* Parallax effect */
  padding: 10rem 4%;
  color: var(--white);
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5,5,5,0.7), rgba(5,5,5,0.9));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.label {
  font-size: 0.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gray-400);
  margin-bottom: 1.5rem;
  display: block;
}

.hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -3px;
  margin-bottom: 2rem;
}

.hero-content h1 span {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--white);
}

.hero-content p {
  font-size: 1.2rem;
  color: var(--gray-300);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Animations are defined in style.css under .reveal classes */
</style>
