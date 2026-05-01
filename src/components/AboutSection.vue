<template>
  <section class="section about" id="about">
    <div class="about-grid">
      <div class="about-image-wrapper reveal-left">
        <img src="/images/site/emmanuel-portrait.jpg" alt="Emmanuel Gbra - Portrait Professionnel" />
      </div>
      <div class="about-text reveal">
        <span class="section-label">Vision & Expertise</span>
        <h2 class="section-title">Mesurer et optimiser la performance énergétique</h2>
        <p>
          Passionné par l'intersection entre l'énergie et l'intelligence artificielle, je me spécialise en <strong>Machine Learning Engineering</strong> et <strong>Data Science</strong>. Mon expertise réside dans la valorisation des données industrielles massives pour optimiser les infrastructures énergétiques.
        </p>
        <p>
          Mon approche combine une compréhension profonde des systèmes industriels avec la maîtrise des algorithmes prédictifs, du <strong>Deep Learning</strong> et du déploiement de modèles à grande échelle via des pipelines <strong>MLOps</strong>.
        </p>
        
        <div class="about-key-stats">
          <div class="stat-item">
            <span class="stat-num">2500+</span>
            <span class="stat-label">Abonnés LinkedIn</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">1er</span>
            <span class="stat-label">Prix GS2E 2025</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal, .reveal-left')
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
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.about-image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
}

.about-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.about-image-wrapper:hover img {
  transform: scale(1.05);
}

.about-text p {
  font-size: 1.2rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.about-key-stats {
  display: flex;
  gap: 4rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 950;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--gray-400);
  text-transform: uppercase;
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
