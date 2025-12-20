<template>
  <div class="country-dashboard">
    <!-- Hero Section - Présentation de KANARI Energy -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">KANARI Energy</h1>
        <p class="hero-subtitle">Plateforme de Monitoring Énergétique en Temps Réel</p>
        <p class="hero-description">
          KANARI Energy est une plateforme web moderne dédiée à la visualisation et au monitoring 
          en temps réel de la production et de la consommation électrique en Afrique de l'Ouest. 
          Notre mission est de fournir des données précises, des analyses approfondies et des 
          visualisations interactives pour faciliter la compréhension et la gestion du secteur énergétique.
        </p>
        <div class="hero-features">
          <div class="feature-badge">
            <Zap :size="20" />
            <span>Données en Temps Réel</span>
          </div>
          <div class="feature-badge">
            <TrendingUp :size="20" />
            <span>Analyses Avancées</span>
          </div>
          <div class="feature-badge">
            <Network :size="20" />
            <span>Multi-Pays</span>
          </div>
          <div class="feature-badge">
            <Code :size="20" />
            <span>API REST</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fonctionnalités Principales -->
    <div class="features-section">
      <h2 class="section-title">Fonctionnalités Principales</h2>
      <div class="features-grid">
        <router-link v-if="hasData" to="/kanari-energy/production" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #3B82F6, #2563EB);">
            <Zap :size="32" />
          </div>
          <h3 class="feature-title">Production Énergétique</h3>
          <p class="feature-description">
            Visualisez la production d'énergie par source (hydraulique, thermique, solaire, etc.) 
            avec des graphiques interactifs et des analyses détaillées.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>

        <router-link v-if="hasData" to="/kanari-energy/consumption" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #F97316, #EA580C);">
            <TrendingUp :size="32" />
          </div>
          <h3 class="feature-title">Consommation</h3>
          <p class="feature-description">
            Analysez les tendances de consommation nationale et spéciale avec des courbes de charge 
            et des prévisions.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>

        <router-link v-if="hasData" to="/kanari-energy/infrastructure" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
            <Network :size="32" />
          </div>
          <h3 class="feature-title">Infrastructure</h3>
          <p class="feature-description">
            Découvrez les données sur le réseau électrique, les abonnés, l'électrification rurale 
            et les infrastructures.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>

        <router-link to="/kanari-energy/centrales" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #10B981, #059669);">
            <Building2 :size="32" />
          </div>
          <h3 class="feature-title">Centrales Électriques</h3>
          <p class="feature-description">
            Explorez la liste complète des centrales de production avec leurs caractéristiques, 
            capacités et statuts opérationnels.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>

        <router-link to="/kanari-energy/api" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #EF4444, #DC2626);">
            <Code :size="32" />
          </div>
          <h3 class="feature-title">API REST</h3>
          <p class="feature-description">
            Accédez à toutes les données via notre API REST complète pour intégrer KANARI Energy 
            dans vos applications.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>

        <router-link to="/kanari-energy/mapping" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #10B981, #059669);">
            <MapPin :size="32" />
          </div>
          <h3 class="feature-title">Cartographie</h3>
          <p class="feature-description">
            Visualisez sur une carte interactive les centrales, le réseau électrique et les zones 
            de forte consommation par pays.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>

        <router-link to="/kanari-energy/prediction" class="feature-card">
          <div class="feature-icon" style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
            <TrendingUp :size="32" />
          </div>
          <h3 class="feature-title">Prédiction</h3>
          <p class="feature-description">
            Accédez aux prévisions et projections énergétiques avec des modèles de prédiction 
            pour la production, consommation et infrastructure.
          </p>
          <span class="feature-link">Explorer →</span>
        </router-link>
      </div>
    </div>

    <!-- Section Pays Sélectionné -->
    <div v-if="countryStore.selectedCountry" class="country-section">
      <div class="country-header">
        <h2 class="section-title">Données - {{ countryStore.selectedCountry.name }}</h2>
        <p class="country-subtitle">Vue d'ensemble du secteur énergétique</p>
      </div>

      <!-- Regulator Section -->
    <div class="info-card" v-if="energyData && energyData.regulator">
      <div class="card-header">
        <div class="regulator-logo-container">
          <img 
            v-if="energyData.regulator.logo && !logoError[countryStore.selectedCountryCode]" 
            :src="energyData.regulator.logo" 
            :alt="energyData.regulator.name"
            class="regulator-logo"
            @error="handleLogoError"
          />
          <div v-else class="card-icon" style="background: #3B82F6;">
            <Shield :size="24" />
          </div>
        </div>
        <div>
          <h2 class="card-title">Régulateur</h2>
          <p class="card-subtitle">Organisme de régulation du secteur</p>
        </div>
      </div>
      <div class="card-content">
        <h3 class="regulator-name">{{ energyData.regulator.name }}</h3>
        <p class="regulator-description">{{ energyData.regulator.description }}</p>
        <a v-if="energyData.regulator.website && energyData.regulator.website !== '#'" 
           :href="energyData.regulator.website" 
           target="_blank" 
           class="regulator-link">
          <ExternalLink :size="16" />
          <span>Site web</span>
        </a>
      </div>
    </div>

    <!-- Producers Section -->
    <div class="info-card" v-if="energyData?.producers && energyData.producers.length > 0">
      <div class="card-header">
        <div class="card-icon" style="background: #22C55E;">
          <Factory :size="24" />
        </div>
        <div>
          <h2 class="card-title">Producteurs d'Énergie</h2>
          <p class="card-subtitle">{{ energyData.producers.length }} producteur(s)</p>
        </div>
      </div>
      <div class="producers-list">
        <div v-for="(producer, index) in energyData.producers" :key="index" class="producer-item">
          <div class="producer-info">
            <h4 class="producer-name">{{ producer.name }}</h4>
            <div class="producer-details">
              <span class="producer-type">{{ producer.type }}</span>
              <span class="producer-capacity">{{ producer.capacity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transport & Distribution Grid -->
    <div class="services-grid">
      <!-- Transport Service -->
      <div class="info-card" v-if="energyData?.transport">
        <div class="card-header">
          <div class="card-icon" style="background: #F97316;">
            <Zap :size="24" />
          </div>
          <div>
            <h2 class="card-title">Transport</h2>
            <p class="card-subtitle">Réseau de transport</p>
          </div>
        </div>
        <div class="card-content">
          <h3 class="service-name">{{ energyData.transport.name }}</h3>
          <p class="service-description">{{ energyData.transport.description }}</p>
          <div class="service-stats">
            <div class="stat-item">
              <span class="stat-label">Longueur réseau:</span>
              <span class="stat-value">{{ energyData.transport.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Distribution Service -->
      <div class="info-card" v-if="energyData?.distribution">
        <div class="card-header">
          <div class="card-icon" style="background: #8B5CF6;">
            <Users :size="24" />
          </div>
          <div>
            <h2 class="card-title">Distribution</h2>
            <p class="card-subtitle">Service de distribution</p>
          </div>
        </div>
        <div class="card-content">
          <h3 class="service-name">{{ energyData.distribution.name }}</h3>
          <p class="service-description">{{ energyData.distribution.description }}</p>
          <div class="service-stats">
            <div class="stat-item">
              <span class="stat-label">Abonnés:</span>
              <span class="stat-value">{{ energyData.distribution.subscribers }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Power Plants Summary -->
    <div class="info-card">
      <div class="card-header">
        <div class="card-icon" style="background: #10B981;">
          <Building2 :size="24" />
        </div>
        <div>
          <h2 class="card-title">Centrales Électriques</h2>
          <p class="card-subtitle">{{ countryPlants.length }} centrale(s) - Capacité totale: {{ totalCapacity }} MW</p>
        </div>
      </div>
      <div class="plants-summary">
        <div class="plants-stats">
          <div class="stat-box">
            <span class="stat-label">Total</span>
            <span class="stat-value">{{ countryPlants.length }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">En service</span>
            <span class="stat-value">{{ operationalPlants }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Capacité totale</span>
            <span class="stat-value">{{ totalCapacity }} MW</span>
          </div>
        </div>
        <div class="plants-preview" v-if="countryPlants && countryPlants.length > 0">
          <div v-for="plant in countryPlants.slice(0, 5)" :key="plant.id" class="plant-preview-item">
            <div class="plant-preview-icon" :class="plant.type">
              <component :is="getTypeIcon(plant.type)" :size="16" />
            </div>
            <div class="plant-preview-info">
              <span class="plant-preview-name">{{ plant.name }}</span>
              <span class="plant-preview-capacity">{{ plant.capacity }} MW</span>
            </div>
          </div>
        </div>
        <div v-else class="plants-preview">
          <p style="color: #6B7280; text-align: center; padding: 1rem;">Aucune centrale disponible</p>
        </div>
        <router-link to="/kanari-energy/centrales" class="view-all-link">
          <span>Voir toutes les centrales</span>
          <ArrowRight :size="16" />
        </router-link>
      </div>
    </div>

      <!-- News Section -->
      <div class="info-card">
        <div class="card-header">
          <div class="card-icon" style="background: #EF4444;">
            <Newspaper :size="24" />
          </div>
          <div>
            <h2 class="card-title">Actualités Énergétiques</h2>
            <p class="card-subtitle">Dernières nouvelles du secteur</p>
          </div>
        </div>
        <BlogSection />
      </div>
    </div>

    <!-- Section À Propos -->
    <div class="about-section">
      <h2 class="section-title">À Propos de KANARI Energy</h2>
      <div class="about-content">
        <div class="about-text">
          <p>
            KANARI Energy a été conçu pour répondre au besoin croissant de transparence et d'analyse 
            dans le secteur énergétique ouest-africain. La plateforme permet aux décideurs, chercheurs, 
            et citoyens d'accéder facilement aux données énergétiques et de comprendre les enjeux 
            du secteur.
          </p>
          <p>
            Notre objectif est de devenir la référence en matière de visualisation et d'analyse 
            des données énergétiques en Afrique de l'Ouest, en offrant des outils modernes, 
            performants et accessibles à tous.
          </p>
        </div>
        <div class="about-stats">
          <div class="about-stat">
            <div class="stat-number">15+</div>
            <div class="stat-label">Pays couverts</div>
          </div>
          <div class="about-stat">
            <div class="stat-number">100+</div>
            <div class="stat-label">Centrales référencées</div>
          </div>
          <div class="about-stat">
            <div class="stat-number">Temps Réel</div>
            <div class="stat-label">Monitoring continu</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCountryStore } from '../../../../stores/countryStore.js'
import { getCountryEnergyData } from '../../../../data/countryEnergyData.js'
import { getPowerPlantsByCountry } from '../../../../data/powerPlantsData.js'
import { 
  Zap, TrendingUp, Network, Building2, Code, Shield, Factory, 
  Users, ArrowRight, Newspaper, ExternalLink, MapPin,
  Droplet, Flame, Sun, Leaf, Wind, Atom
} from 'lucide-vue-next'
import BlogSection from './BlogSection.vue'

const countryStore = useCountryStore()
const logoError = ref({})

// S'assurer que le store est initialisé
onMounted(() => {
  if (!countryStore.selectedCountryCode) {
    countryStore.resetToDefault()
  }
})

const hasData = computed(() => {
  return countryStore.selectedCountry?.hasData || false
})

const energyData = computed(() => {
  if (!countryStore.selectedCountryCode) return null
  return getCountryEnergyData(countryStore.selectedCountryCode)
})

const countryPlants = computed(() => {
  if (!countryStore.selectedCountryCode) return []
  const plants = getPowerPlantsByCountry(countryStore.selectedCountryCode)
  return plants || []
})

const totalCapacity = computed(() => {
  if (!countryPlants.value || countryPlants.value.length === 0) return 0
  return countryPlants.value.reduce((sum, plant) => sum + (plant.capacity || 0), 0)
})

const operationalPlants = computed(() => {
  if (!countryPlants.value || countryPlants.value.length === 0) return 0
  return countryPlants.value.filter(plant => plant.status === 'operational').length
})

function handleLogoError(event) {
  const countryCode = countryStore.selectedCountryCode
  logoError.value[countryCode] = true
  event.target.style.display = 'none'
}

function getTypeIcon(type) {
  const icons = {
    hydraulic: Droplet,
    thermal: Flame,
    solar: Sun,
    biomass: Leaf,
    wind: Wind,
    nuclear: Atom
  }
  return icons[type] || Building2
}
</script>

<style scoped>
.country-dashboard {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  background: linear-gradient(to bottom, #F8FAFC 0%, #FAFAFA 100%);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1A1A1A 0%, #3B82F6 100%);
  color: white;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
  border-radius: 0 0 2rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  opacity: 0.95;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.8;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Features Section */
.features-section {
  padding: 0 2rem 3rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 1rem;
  padding: 2rem;
  text-decoration: none;
  color: #1A1A1A;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #3B82F6;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-size: 1.375rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
}

.feature-description {
  font-size: 0.9375rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.feature-link {
  color: #3B82F6;
  font-weight: 700;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: gap 0.3s ease;
}

.feature-card:hover .feature-link {
  gap: 0.75rem;
}

/* Country Section */
.country-section {
  padding: 0 2rem 3rem;
  margin-bottom: 3rem;
}

.country-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #E5E7EB;
}

.country-subtitle {
  font-size: 1.125rem;
  color: #6B7280;
  margin: 0.5rem 0 0 0;
  font-weight: 500;
}

.loading-message {
  padding: 2rem;
  text-align: center;
  color: #6B7280;
  font-size: 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 900;
  color: #1A1A1A;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  border-radius: 2px;
}

.info-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #3B82F6, #8B5CF6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.info-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.info-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.regulator-logo-container {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.info-card:hover .regulator-logo-container {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.regulator-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
}

.card-title {
  font-size: 1.375rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.01em;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.card-content {
  margin-top: 1rem;
}

.regulator-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 0.5rem 0;
}

.regulator-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.regulator-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.regulator-link:hover {
  text-decoration: underline;
}

.producers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.producer-item {
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
  border-left: 3px solid #22C55E;
}

.producer-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.producer-details {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.producer-type {
  padding: 0.25rem 0.75rem;
  background: #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
}

.producer-capacity {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.service-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 0.5rem 0;
}

.service-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.service-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.plants-summary {
  margin-top: 1rem;
}

.plants-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%);
  border-radius: 0.75rem;
  text-align: center;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-color: #3B82F6;
}

.stat-box .stat-label {
  display: block;
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
}

.stat-box .stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
}

.plants-preview {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.plant-preview-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.plant-preview-icon {
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.plant-preview-icon.hydraulic { background: #3B82F6; }
.plant-preview-icon.thermal { background: #F97316; }
.plant-preview-icon.solar { background: #FACC15; }
.plant-preview-icon.biomass { background: #22C55E; }
.plant-preview-icon.wind { background: #06B6D4; }
.plant-preview-icon.nuclear { background: #8B5CF6; }

.plant-preview-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plant-preview-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
}

.plant-preview-capacity {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.view-all-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  color: #3B82F6;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #EFF6FF 0%, #F3F4F6 100%);
  border: 2px solid transparent;
}

.view-all-link:hover {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  border-color: #3B82F6;
}

/* About Section */
.about-section {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
  border-radius: 2rem 2rem 0 0;
  margin-top: 3rem;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4B5563;
}

.about-text p {
  margin: 0 0 1.5rem 0;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-stat {
  text-align: center;
  padding: 1.5rem;
  background: #FFFFFF;
  border-radius: 1rem;
  border: 2px solid #E5E7EB;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .features-section,
  .country-section,
  .about-section {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-stats {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .about-stat {
    flex: 1;
    min-width: 150px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .plants-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-features {
    flex-direction: column;
    align-items: stretch;
  }

  .feature-badge {
    justify-content: center;
  }

  .plants-stats {
    grid-template-columns: 1fr;
  }

  .about-stats {
    flex-direction: column;
  }
}
</style>
