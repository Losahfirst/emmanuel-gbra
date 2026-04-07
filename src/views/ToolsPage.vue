<template>
  <div class="tools-page">
    <header class="tools-header">
      <div class="container">
        <span class="section-label">MA BIBLIOTHÈQUE</span>
        <h1 class="section-title">MES OUTILS <span class="accent">& ANALYSEURS</span></h1>
        <p class="section-subtitle">
          Une collection d'outils spécialisés conçus pour l'efficacité énergétique, 
          l'analyse de données SCADA et la durabilité environnementale.
        </p>
      </div>
    </header>

    <section class="tools-grid-section">
      <div class="container">
        <div class="tools-grid">
          <!-- Tool 1: Localisation satellite -->
          <div class="tool-card clickable-card" @click="goToSatellite">
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
          <div class="tool-card clickable-card" @click="goToDatasets">
            <div class="tool-icon-wrapper">
              <Database class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Jeux de Données Efficacité Énergétique</h3>
              <p>Analyse approfondie et traitement de données massives pour l'optimisation énergétique industrielle.</p>
              <div class="tool-footer">
                <span class="tool-tag">Big Data</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 3: Outils de Calcul CVC -->
          <div class="tool-card clickable-card" @click="goToCvc">
            <div class="tool-icon-wrapper">
              <Activity class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Outils de Calcul CVC</h3>
              <p>Outils de dimensionnement et de calcul pour les systèmes de Chauffage, Ventilation et Climatisation en milieu industriel.</p>
              <div class="tool-footer">
                <span class="tool-tag">CVC</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 4: Simulateur IoT & GTB -->
          <div class="tool-card clickable-card" @click="goToIot">
            <div class="tool-icon-wrapper">
              <Cpu class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Simulateur IoT & GTB</h3>
              <p>Laboratoire virtuel : configuration de capteurs intelligents, automatisation, programmation, MQTT et streaming Kafka.</p>
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
import { MapPin, Database, Cpu, ArrowUpRight, Activity } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSatellite = () => {
  router.push('/outils/satellite')
}

const goToCvc = () => {
  router.push('/outils/cvc')
}

const goToDatasets = () => {
  router.push('/outils/datasets')
}

const goToIot = () => {
  router.push('/outils/iot')
}
</script>

<style scoped>
.tools-page {
  padding-top: 120px;
  min-height: 100vh;
  background: var(--white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 4%;
}

.tools-header {
  padding: 4rem 0;
  text-align: left;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
  display: block;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 950;
  letter-spacing: -2px;
  line-height: 1.05;
  color: var(--black);
  margin-bottom: 2rem;
}

.accent {
  color: var(--accent);
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  max-width: 700px;
  line-height: 1.6;
}

.tools-grid-section {
  padding-bottom: 8rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.tool-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 24px;
  padding: 2.5rem;
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  background: var(--white);
}

.tool-icon-wrapper {
  width: 60px;
  height: 60px;
  background: var(--black);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: var(--white);
  transition: transform 0.5s ease;
}

.tool-card:hover .tool-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: var(--accent);
}

.tool-icon {
  width: 28px;
  height: 28px;
}

.tool-content h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.tool-content p {
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  flex-grow: 1;
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.tool-tag {
  font-size: 0.7rem;
  font-weight: 700;
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
  font-weight: 700;
  color: var(--black);
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
}

.tool-btn:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
