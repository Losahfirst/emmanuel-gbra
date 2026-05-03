<template>
  <section class="hero" id="home" :style="{ backgroundImage: `url('${heroBg}')` }">
    <div class="overlay"></div>
    <div class="hero-container">
      <div class="hero-content reveal">
        <h1 class="hero-title">
          L'IA de pointe.<br>Entre vos mains.
        </h1>
        <p class="hero-subtitle">
          Conception de solutions d'analyse de données et maintenance prédictive de pointe pour relever les défis les plus complexes.
        </p>
        <div class="hero-actions">
          <a href="#contact" class="mistral-link">
            Nous contacter
            <span class="arrow">›</span>
          </a>
          <router-link to="/articles" class="mistral-link">
            Articles
            <span class="arrow">›</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

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
.hero {
  position: relative;
  min-height: 100vh;
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
  text-align: left;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5.5rem); /* Reduced size */
  font-weight: 850;
  color: var(--white);
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 2.5rem; /* Reduced margin */
}

.hero-subtitle {
  font-size: 1.25rem; /* Reduced size */
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4rem; /* Reduced margin */
  max-width: 650px;
  line-height: 1.5;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 3.5rem;
}

.mistral-link {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--white);
  text-decoration: none;
  position: relative;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: opacity 0.3s ease;
}

.mistral-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--white);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.mistral-link:hover {
  opacity: 0.8;
}

.mistral-link:hover::after {
  opacity: 1;
}

.arrow {
  font-size: 1.5rem;
  margin-top: -2px;
  transition: transform 0.3s ease;
}

.mistral-link:hover .arrow {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .hero-title { font-size: 3.5rem; }
  .hero-actions { flex-direction: column; gap: 2rem; }
  .hero-subtitle { font-size: 1.2rem; }
}
</style>




