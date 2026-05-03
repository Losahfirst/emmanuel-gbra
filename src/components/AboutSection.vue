<template>
  <section class="about section bg-grid-light" id="about">
    <div class="about-container">
      <div class="about-grid">
        <div class="about-text reveal">
          <h2 class="expertise-title">Déploiement d'applications IA.</h2>
          <p class="expertise-desc">
            Expert en ML Engineering & Data Science. Je conçois et déploie des systèmes d'IA sur mesure pour relever les défis industriels les plus complexes.
          </p>
          
          <div class="expertise-checklist">
            <div class="check-item">
              <span>Workflows agentiques</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div class="check-item">
              <span>Observabilité end-to-end</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div class="check-item">
              <span>Maintenance prédictive & RAG</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>
          
          <div class="about-actions">
            <a href="#experience" class="btn-black">
              Découvrir mon expertise
              <span class="arrow">›</span>
            </a>
          </div>
        </div>
        
        <div class="about-visual reveal">
          <div class="visual-wrapper">
             <img src="/images/decorations/expertise_visual.png" alt="Expertise Visual" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

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
.about {
  padding: 6rem 0; /* Reduced padding */
  overflow: hidden;
  background-color: var(--white);
}

.bg-grid-light {
  background-image: radial-gradient(var(--gray-200) 1px, transparent 1px);
  background-size: 30px 30px; /* Smaller grid */
}

.about-container {
  max-width: 1400px; /* Unified width */
  margin: 0 auto;
  padding: 0 6%;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5rem; /* Reduced gap */
}

.expertise-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem); /* Reduced size */
  font-weight: 850;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--black);
  letter-spacing: -1px;
}

.expertise-desc {
  font-size: 1.1rem; /* Reduced size */
  line-height: 1.5;
  color: var(--gray-600);
  margin-bottom: 3rem;
  max-width: 500px;
}

.expertise-checklist {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Tighter gap */
  margin-bottom: 3rem;
}

.check-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF9E6;
  padding: 0.9rem 1.4rem; /* More compact */
  border-radius: 4px;
  width: fit-content;
  min-width: 300px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #131313;
}

.check-item svg {
  width: 18px;
  height: 18px;
  color: #F45B20;
}

.btn-black {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  background-color: #131313;
  color: var(--white);
  padding: 1rem 2rem; /* More compact */
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-black:hover {
  background-color: #000;
}

.btn-black .arrow {
  color: #F45B20;
  font-size: 1.3rem;
  margin-top: -1px;
}

.about-visual {
  position: relative;
  max-width: 500px; /* Limit image size */
  margin-left: auto;
}

.visual-wrapper {
  position: relative;
  z-index: 2;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.visual-wrapper img {
  width: 100%;
  display: block;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 5rem;
  }
  .check-item { width: 100%; }
  .about-visual {
    display: none;
  }
}
</style>
