<template>
  <div class="team-connect-page">
    <div class="page-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-icon">
            <IconWrapper name="users" size="xl" />
          </div>
          <h1 class="page-title">TEAM CONNECT</h1>
          <p class="page-subtitle">Outils interactifs pour se détendre, apprendre et se connecter</p>
        </div>
      </div>
    </div>
    
    <div class="page-content">
      <div class="container">
        <div class="modules-grid">
          <div class="module-card" @click="openModule('games')">
            <div class="module-icon">
              <IconWrapper name="sparkles" size="xl" />
            </div>
            <h3 class="module-title">Jeux Vidéo & Geeks Connection</h3>
            <p class="module-description">
              Collection de jeux JavaScript relaxants et amusants. Téléchargez le code source et jouez même hors ligne !
            </p>
            <div class="module-features">
              <span class="feature-tag">
                <IconWrapper name="sparkles" size="sm" />
                <span>Jeux JS</span>
              </span>
              <span class="feature-tag">
                <IconWrapper name="code" size="sm" />
                <span>Code Source</span>
              </span>
              <span class="feature-tag">
                <IconWrapper name="mobile" size="sm" />
                <span>Hors Ligne</span>
              </span>
            </div>
          </div>
          <div class="module-card" @click="openModule('quiz')">
            <div class="module-icon">
              <IconWrapper name="academic" size="xl" />
            </div>
            <h3 class="module-title">Quiz Technique</h3>
            <p class="module-description">
              Testez vos connaissances avec des questions d'entretien tech inspirées d'Amazon, Google et Facebook !
            </p>
            <div class="module-features">
              <span class="feature-tag">
                <IconWrapper name="academic" size="sm" />
                <span>Entretiens</span>
              </span>
              <span class="feature-tag">
                <IconWrapper name="cpu" size="sm" />
                <span>Algorithmes</span>
              </span>
              <span class="feature-tag">
                <IconWrapper name="code" size="sm" />
                <span>Tech Stack</span>
              </span>
            </div>
          </div>
          <div class="module-card" @click="openModule('roadmap')">
            <div class="module-icon">
              <IconWrapper name="chart" size="xl" />
            </div>
            <h3 class="module-title">Générateur de Roadmap</h3>
            <p class="module-description">
              Créez votre roadmap personnalisée pour votre carrière tech. Répondez aux questions et obtenez votre parcours !
            </p>
            <div class="module-features">
              <span class="feature-tag">
                <IconWrapper name="chart" size="sm" />
                <span>Personnalisé</span>
              </span>
              <span class="feature-tag">
                <IconWrapper name="document" size="sm" />
                <span>Roadmap</span>
              </span>
              <span class="feature-tag">
                <IconWrapper name="lightbulb" size="sm" />
                <span>Conseils</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal pour les modules -->
    <div v-if="activeModule" class="module-modal" @click.self="closeModule">
      <div class="module-modal-content">
        <button class="modal-close" @click="closeModule">×</button>
        <GamesModule v-if="activeModule === 'games'" />
        <TechQuizModule v-if="activeModule === 'quiz'" />
        <RoadmapModule v-if="activeModule === 'roadmap'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconWrapper from '../components/icons/IconWrapper.vue'
import GamesModule from '../components/modules/GamesModule.vue'
import TechQuizModule from '../components/modules/TechQuizModule.vue'
import RoadmapModule from '../components/modules/RoadmapModule.vue'

const activeModule = ref(null)

const openModule = (module) => {
  activeModule.value = module
  document.body.style.overflow = 'hidden'
}

const closeModule = () => {
  activeModule.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.team-connect-page {
  min-height: 100vh;
  background: var(--bg-light);
  padding-top: 100px;
}

.page-hero {
  background: var(--white);
  border-bottom: var(--border-thick) solid var(--border-color);
  padding: 4rem 0;
  margin-bottom: 4rem;
}

.hero-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hero-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-thick) solid var(--border-color);
  color: white;
  box-shadow: var(--shadow-game);
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.03em;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--light-gray);
  max-width: 600px;
}

.page-content {
  padding: 2rem 0 4rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.module-card {
  background: var(--white);
  padding: 3rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
  cursor: pointer;
}

.module-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-yellow);
}

.module-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  border: var(--border-thick) solid var(--border-color);
  color: white;
}

.module-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

.module-description {
  font-size: 1.125rem;
  color: var(--light-gray);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.module-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.feature-tag {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: var(--white);
  color: var(--dark-gray);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-tag :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.module-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.module-modal-content {
  background: var(--white);
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.module-modal-content:has(.game-container) {
  padding: 1rem;
  max-height: 95vh;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: var(--border-thick) solid var(--border-color);
  background: var(--accent-orange);
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.modal-close:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.15);
}

@media (max-width: 968px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .module-card {
    padding: 2rem;
  }
  
  .module-modal-content {
    padding: 1.5rem;
    max-height: 95vh;
  }
}

@media (max-width: 480px) {
  .page-hero {
    padding: 3rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .module-card {
    padding: 1.5rem;
  }
  
  .module-title {
    font-size: 1.5rem;
  }
  
  .module-modal-content {
    padding: 1rem;
    border-radius: 1rem;
  }
}
</style>
