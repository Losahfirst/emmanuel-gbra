<template>
  <section class="hero" id="home">
    <div class="hero-background">
      <img src="/images/site/emmanuel-presentation.jpg" alt="Emmanuel Gbra" class="bg-image" />
      <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-container">
      <div class="hero-content-wrapper">
        <div class="hero-content reveal">
          <h1 class="hero-title">
            Emmanuel <br />
            Gbra
          </h1>
          <p class="hero-subtitle">
            Spécialiste <strong>Data Science & Machine Learning Engineering</strong> appliqué au secteur de l'Énergie et de l'Industrie
          </p>
          <div class="hero-actions">
            <a href="#about" class="hero-btn">Discover More</a>
            <router-link to="/articles" class="hero-btn-outline">Read Articles</router-link>
          </div>
        </div>
        <div class="hero-mascot-wrapper reveal">
          <img src="/images/decorations/profile-overlay.png" alt="Data Science Mascot" class="hero-mascot" />
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
.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #000;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  filter: grayscale(1) contrast(1.1) brightness(0.7);
  transition: transform 10s ease-out;
}

.hero:hover .bg-image {
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 4%;
}

.hero-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.hero-content {
  max-width: 700px;
  flex: 1;
}

.hero-mascot-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.hero-mascot {
  width: 100%;
  max-width: 600px; /* Enlarge the image */
  height: auto;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5));
  animation: float-hero 6s ease-in-out infinite;
}

@keyframes float-hero {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(2deg); }
}

.hero-pretitle {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 2rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  font-weight: 900;
  color: var(--white);
  line-height: 0.95;
  letter-spacing: -3px;
  margin-bottom: 2.5rem;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-bottom: 4rem;
  max-width: 600px;
  line-height: 1.4;
}

.hero-actions {
  display: flex;
  gap: 2rem;
}

.hero-btn {
  padding: 1.2rem 2.5rem;
  background: var(--white);
  color: var(--black);
  text-decoration: none;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  background: var(--accent);
  color: var(--white);
  transform: translateY(-5px);
}

.hero-btn-outline {
  padding: 1.2rem 2.5rem;
  border: 1.5px solid var(--white);
  color: var(--white);
  text-decoration: none;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.hero-btn-outline:hover {
  background: var(--white);
  color: var(--black);
  transform: translateY(-5px);
}

@media (max-width: 1024px) {
  .hero-content-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  .hero-content {
    max-width: 100%;
  }
  .hero-mascot-wrapper {
    justify-content: center;
    order: -1; /* Mascot on top on mobile */
  }
  .hero-mascot {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .hero-title { font-size: 3.5rem; letter-spacing: -1px; }
  .hero-actions { flex-direction: column; gap: 1rem; }
  .hero-btn, .hero-btn-outline { width: 100%; text-align: center; }
  .hero-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4));
  }
}
</style>
