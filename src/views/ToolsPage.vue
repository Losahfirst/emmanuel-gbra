<template>
  <div class="tools-page">
    <section class="page-hero" :style="{ backgroundImage: `url('${heroBg}')` }">
      <div class="overlay"></div>
      <div class="hero-container">
        <div class="hero-content reveal">
          <h1 class="hero-title">
            Mes Outils & Analyseurs.
          </h1>
          <p class="hero-subtitle">
            Une collection d'outils spécialisés conçus pour l'efficacité énergétique, l'analyse de données SCADA et la durabilité industrielle.
          </p>
        </div>
      </div>
    </section>

    <section class="tools-grid-section">
      <div class="container-unified">
        <div class="tools-grid">
          <!-- Tool 1: Localisation satellite -->
          <div class="tool-card clickable-card reveal" @click="goToSatellite">
            <div class="tool-icon-wrapper">
              <MapPin class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Localisation Satellite</h3>
              <p>Outil de géolocalisation et visualisation cartographique pour l'analyse précise des actifs industriels sur le terrain.</p>
              <div class="tool-footer">
                <span class="tool-tag">Géospatial</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 2: Jeux de données efficacité énergétique -->
          <div class="tool-card clickable-card reveal" @click="goToDatasets">
            <div class="tool-icon-wrapper">
              <Database class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Données Énergétiques</h3>
              <p>Analyse approfondie et traitement de données massives pour l'optimisation énergétique industrielle.</p>
              <div class="tool-footer">
                <span class="tool-tag">Big Data</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 3: Outils de Calcul CVC -->
          <div class="tool-card clickable-card reveal" @click="goToCvc">
            <div class="tool-icon-wrapper">
              <Activity class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Calculs CVC</h3>
              <p>Outils de dimensionnement et de calcul pour les systèmes de Chauffage, Ventilation et Climatisation industriels.</p>
              <div class="tool-footer">
                <span class="tool-tag">CVC</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 4: Simulateur IoT & GTB -->
          <div class="tool-card clickable-card reveal" @click="goToIot">
            <div class="tool-icon-wrapper">
              <Cpu class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Simulateur IoT & GTB</h3>
              <p>Laboratoire virtuel : configuration de capteurs intelligents, automatisation et streaming Kafka.</p>
              <div class="tool-footer">
                <span class="tool-tag">Industrie 4.0</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { MapPin, Database, Cpu, ArrowUpRight, Activity } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const heroBg = 'https://mistral.ai/_next/static/media/mistral-frontier-26.15-1ez5hhac6r.webp'

const goToSatellite = () => router.push('/outils/satellite')
const goToCvc = () => router.push('/outils/cvc')
const goToDatasets = () => router.push('/outils/datasets')
const goToIot = () => router.push('/outils/iot')

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
.tools-page {
  background-color: var(--white);
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

.tools-grid-section {
  padding: 10rem 0;
  background-color: var(--cream);
}

.container-unified {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.tool-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  padding: 3rem;
  transition: all 0.5s cubic-bezier(0.2, 0, 0, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.clickable-card {
  cursor: pointer;
}

.tool-card:hover {
  transform: translateY(-10px);
  border-color: var(--black);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
}

.tool-icon-wrapper {
  width: 50px;
  height: 50px;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  color: var(--white);
  transition: transform 0.5s ease;
}

.tool-card:hover .tool-icon-wrapper {
  background: var(--accent);
  transform: rotate(5deg);
}

.tool-icon {
  width: 24px;
  height: 24px;
}

.tool-content h3 {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--black);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.tool-content p {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.tool-tag {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-400);
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 900;
  color: var(--black);
  cursor: pointer;
}

@media (max-width: 768px) {
  .hero-title { font-size: 3.5rem; }
  .tools-grid { grid-template-columns: 1fr; }
  .tool-card { padding: 2rem; }
}
</style>
