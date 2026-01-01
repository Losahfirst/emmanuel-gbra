<template>
  <div class="apps-page">
    <div class="page-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-icon">
            <div class="icon-gradient"></div>
          </div>
          <h1 class="page-title">MY APPS</h1>
          <p class="page-subtitle">Interactive applications and modern games</p>
        </div>
      </div>
    </div>
    
    <div class="page-content">
      <div class="container">
        <div class="apps-grid">
          <div class="app-card" @click="openApp('games')">
            <div class="app-header">
              <div class="app-icon">
                <div class="icon-gradient games"></div>
              </div>
              <div class="app-info">
                <h3 class="app-title">Gaming Hub</h3>
                <p class="app-category">Video Games</p>
              </div>
            </div>
            <p class="app-description">
              Collection of modern JavaScript games with HD graphics and smooth gameplay. Premium gaming experience in your browser.
            </p>
            <div class="app-features">
              <span class="feature-tag">HD Games</span>
              <span class="feature-tag">Multiplayer</span>
              <span class="feature-tag">60 FPS</span>
            </div>
            <div class="app-stats">
              <div class="stat">
                <span class="stat-number">15+</span>
                <span class="stat-label">Games</span>
              </div>
              <div class="stat">
                <span class="stat-number">4.8</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </div>
          
          <div class="app-card" @click="openApp('quiz')">
            <div class="app-header">
              <div class="app-icon">
                <div class="icon-gradient quiz"></div>
              </div>
              <div class="app-info">
                <h3 class="app-title">Tech Challenge</h3>
                <p class="app-category">Technical Quiz</p>
              </div>
            </div>
            <p class="app-description">
              Test your skills with technical challenges inspired by the biggest tech companies. Show your expertise!
            </p>
            <div class="app-features">
              <span class="feature-tag">Expert Level</span>
              <span class="feature-tag">Real-time</span>
              <span class="feature-tag">Leaderboard</span>
            </div>
            <div class="app-stats">
              <div class="stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">Questions</span>
              </div>
              <div class="stat">
                <span class="stat-number">12K</span>
                <span class="stat-label">Players</span>
              </div>
            </div>
          </div>
          
          <div class="app-card" @click="openApp('roadmap')">
            <div class="app-header">
              <div class="app-icon">
                <div class="icon-gradient roadmap"></div>
              </div>
              <div class="app-info">
                <h3 class="app-title">Career Builder</h3>
                <p class="app-category">Development</p>
              </div>
            </div>
            <p class="app-description">
              Build your personalized tech career path with AI-powered recommendations and industry-ready roadmaps tailored to your goals.
            </p>
            <div class="app-features">
              <span class="feature-tag">AI Powered</span>
              <span class="feature-tag">Personalized</span>
              <span class="feature-tag">Industry Ready</span>
            </div>
            <div class="app-stats">
              <div class="stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">Roadmaps</span>
              </div>
              <div class="stat">
                <span class="stat-number">95%</span>
                <span class="stat-label">Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal for applications -->
    <div v-if="activeApp" class="app-modal" @click.self="closeApp">
      <div class="app-modal-content">
        <button class="modal-close" @click="closeApp">×</button>
        <GamesModule v-if="activeApp === 'games'" />
        <TechQuizModule v-if="activeApp === 'quiz'" />
        <RoadmapModule v-if="activeApp === 'roadmap'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GamesModule from '../components/modules/GamesModule.vue'
import TechQuizModule from '../components/modules/TechQuizModule.vue'
import RoadmapModule from '../components/modules/RoadmapModule.vue'

const activeApp = ref(null)

const openApp = (app) => {
  activeApp.value = app
  document.body.style.overflow = 'hidden'
}

const closeApp = () => {
  activeApp.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.apps-page {
  min-height: 100vh;
  background: transparent;
  padding-top: 100px;
}

.page-hero {
  background: var(--bg-soft);
  border-bottom: var(--border-thin) solid var(--border-color);
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
  width: 120px;
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-gradient {
  width: 100%;
  height: 100%;
  background: var(--accent-primary);
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
}

.page-title {
  font-size: 4rem;
  font-weight: 800;
  color: var(--text);
  font-family: var(--font-sans);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  max-width: 600px;
}

.page-content {
  padding: 2rem 0 4rem;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.app-card {
  background: var(--card-bg);
  border: var(--border-thin) solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(var(--glass-blur));
}

.app-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.app-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-lg);
}

.app-card:hover::before {
  transform: scaleX(1);
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.app-icon {
  width: 60px;
  height: 60px;
  position: relative;
}

.app-icon .icon-gradient {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.app-icon .icon-gradient.games {
  background: var(--accent-primary);
}

.app-icon .icon-gradient.quiz {
  background: var(--accent-secondary);
}

.app-icon .icon-gradient.roadmap {
  background: var(--accent-primary);
}

.app-info {
  flex: 1;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.25rem;
  font-family: var(--font-sans);
}

.app-category {
  font-size: 0.875rem;
  color: var(--accent-secondary);
  font-weight: 500;
}

.app-description {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.app-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.feature-tag {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  background: var(--accent-gray-light);
  color: var(--text);
  border: var(--border-thin) solid var(--border-color);
  border-radius: 0.375rem;
  font-weight: 500;
  font-family: var(--font-sans);
}

.app-stats {
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  border-top: var(--border-thin) solid var(--border-color);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-secondary);
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(244, 247, 255, 0.82);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.app-modal-content {
  background: var(--primary-white);
  border: var(--border-thin) solid var(--border-color);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: var(--border-thin) solid var(--border-color);
  background: var(--accent-secondary);
  color: var(--primary-white);
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
  background: var(--accent-primary);
  transform: scale(1.1);
}

@media (max-width: 968px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .apps-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .app-card {
    padding: 1.5rem;
  }
  
  .app-modal-content {
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
  
  .app-card {
    padding: 1rem;
  }
  
  .app-title {
    font-size: 1.25rem;
  }
  
  .app-stats {
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
  
  .app-modal-content {
    padding: 1rem;
    border-radius: 0.5rem;
  }
}
</style>
