<template>
  <section class="modules-section section" id="modules">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">TEAM CONNECT</h2>
        <p class="section-subtitle">Outils interactifs pour se détendre, apprendre et se connecter</p>
      </div>
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
        <div class="module-card" @click="openKanariPage">
          <div class="module-icon">
            <IconWrapper name="bolt" size="xl" />
          </div>
          <h3 class="module-title">KANARI Energy</h3>
          <p class="module-description">
            Plateforme de monitoring en temps réel de la production et consommation électrique de la Côte d'Ivoire.
          </p>
          <div class="module-features">
            <span class="feature-tag">
              <IconWrapper name="bolt" size="sm" />
              <span>Temps Réel</span>
            </span>
            <span class="feature-tag">
              <IconWrapper name="chart" size="sm" />
              <span>Visualisation</span>
            </span>
            <span class="feature-tag">
              <IconWrapper name="lightbulb" size="sm" />
              <span>Éco-Responsable</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal pour les modules -->
    <div v-if="activeModule" class="module-modal" :class="{ 'modal-energy': activeModule === 'energy' }" @click.self="closeModule">
      <div class="module-modal-content" :class="{ 'modal-energy-content': activeModule === 'energy' }">
        <button class="modal-close" @click="closeModule">×</button>
        <GamesModule v-if="activeModule === 'games'" />
        <RoadmapModule v-if="activeModule === 'roadmap'" />
        <EnergyModule v-if="activeModule === 'energy'" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.modal-energy .module-modal-content {
  background: #0F172A;
  border-color: rgba(255, 255, 255, 0.2);
}

.modal-energy .modal-close {
  background: rgba(239, 68, 68, 0.8);
  color: white;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import IconWrapper from './icons/IconWrapper.vue'
import GamesModule from './modules/GamesModule.vue'
import RoadmapModule from './modules/RoadmapModule.vue'
import EnergyModule from './modules/EnergyModule.vue'

const router = useRouter()
const activeModule = ref(null)

const openModule = (module) => {
  activeModule.value = module
  document.body.style.overflow = 'hidden'
}

const closeModule = () => {
  activeModule.value = null
  document.body.style.overflow = ''
}

const openKanariPage = () => {
  // Fermer la modal si elle est ouverte
  closeModule()
  // Rediriger vers la page d'accueil KANARI (pas le dashboard)
  console.log('Navigation vers /kanari-energy (page d\'accueil)')
  router.push('/kanari-energy').catch(err => {
    console.error('Erreur de navigation:', err)
  })
}

const handleOpenModuleEvent = (event) => {
  const moduleName = event.detail
  if (moduleName === 'energy') {
    openKanariPage()
  }
}

onMounted(() => {
  window.addEventListener('open-module', handleOpenModuleEvent)
})

onUnmounted(() => {
  window.removeEventListener('open-module', handleOpenModuleEvent)
})
</script>

<style scoped>
.modules-section {
  background: var(--bg-light);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  padding: 4rem 0;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.module-card {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
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
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  color: white;
}

.module-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

.module-description {
  font-size: 1rem;
  color: var(--light-gray);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.module-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  font-size: 0.85rem;
  padding: 0.375rem 0.875rem;
  background: var(--white);
  color: var(--dark-gray);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.feature-tag :deep(svg) {
  width: 0.875rem;
  height: 0.875rem;
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
}

.modal-energy-content {
  background: #0F172A !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

.modal-energy-content :deep(.energy-module) {
  padding: 0;
}

.modal-energy-content :deep(.energy-dashboard) {
  padding: 1rem;
  min-height: auto;
}

.modal-energy .modal-close {
  background: rgba(239, 68, 68, 0.8) !important;
  color: white !important;
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
  .modules-section {
    margin: 1rem;
    padding: 3rem 0;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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
  .modules-section {
    margin: 0.5rem;
    padding: 2rem 0;
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
