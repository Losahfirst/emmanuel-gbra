<template>
  <section class="hero-section" id="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
  <h1 class="hero-headline fade-in-up">
    L'IA au Service de l'Avenir Énergétique
  </h1>
  <p class="hero-description fade-in-up">
    Je suis un <strong>étudiant passionné</strong> qui explore les frontières de l'intelligence artificielle pour rendre l'énergie plus efficace. Spécialisé en maintenance prédictive et visualisation de données énergétiques, je conçois des algorithmes et des plateformes (comme <strong>KANARI Energy</strong>) capables d'anticiper les besoins et de monitorer en temps réel les infrastructures énergétiques de demain.
  </p>
  <div class="hero-stats fade-in-up">
    <div class="stat-item">
      <div class="stat-number">IoT</div>
      <div class="stat-label">Expertise</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">15+</div>
      <div class="stat-label">Projets IA</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">Top</div>
      <div class="stat-label">Performance</div>
    </div>
  </div>
</div>
        <div class="hero-visual">
          <div class="profile-image-container">
            <div class="profile-image-placeholder">
              <img src="/profile-photo.png" alt="KOREKOU EMMANUEL GBRA" class="profile-image" />
              <div class="orange-overlay"></div>
            </div>
            <div class="feature-bubbles">
              <FeatureBubble 
                icon-name="bolt" 
                text="Optimisation Énergétique" 
                :delay="0"
                :top="15"
                :left="-10"
              />
              <FeatureBubble 
                icon-name="cpu" 
                text="Machine Learning" 
                :delay="0.2"
                :top="50"
                :left="-15"
              />
              <FeatureBubble 
                icon-name="chart" 
                text="Analyse Prédictive" 
                :delay="0.4"
                :top="80"
                :left="-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureBubble from './FeatureBubble.vue'

const scrollTo = (section) => {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-section {
  padding: 8rem 0 5rem;
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: var(--bg-light);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  max-width: 600px;
}

.hero-headline {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--dark-gray);
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  font-family: 'Space Grotesk', sans-serif;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--light-gray);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-orange);
  line-height: 1;
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--light-gray);
  font-weight: 500;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image-container {
  position: relative;
  width: 400px;
  height: 500px;
}

.profile-image-placeholder {
  width: 350px;
  height: 450px;
  background: var(--white);
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-game);
  border: var(--border-thick) solid var(--border-color);
  position: relative;
  overflow: hidden;
  padding: 0.5rem;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
  display: block;
  filter: 
    sepia(35%) 
    saturate(120%) 
    hue-rotate(3deg) 
    contrast(110%) 
    brightness(1.02);
  position: relative;
  z-index: 0;
}

.orange-overlay {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(255, 210, 63, 0.12) 50%, rgba(255, 107, 53, 0.18) 100%);
  border-radius: 1.5rem;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: multiply;
  opacity: 0.75;
}


.feature-bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

@media (max-width: 968px) {
  .hero-section {
    padding: 6rem 0 3rem;
    min-height: auto;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .hero-headline {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .profile-image-container {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-buttons .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 5rem 0 2rem;
  }
  
  .hero-headline {
    font-size: 1.75rem;
    line-height: 1.2;
  }
  
  .hero-description {
    font-size: 0.95rem;
  }
  
  .profile-image-placeholder {
    width: 280px;
    height: 360px;
  }
  
  .profile-image-container {
    max-width: 280px;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  
  .feature-bubbles {
    display: none;
  }
}
</style>
