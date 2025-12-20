<template>
  <div class="energy-dashboard">
    <!-- No Data Message -->
    <NoDataMessage v-if="!hasData" />
    
    <template v-else>
    <!-- Dashboard Title Section -->
    <div class="dashboard-title-section">
      <h1 class="dashboard-title">Dashboard - {{ countryStore.selectedCountry.name }}</h1>
      <div class="dashboard-actions">
        <div v-if="store.lastUpdate" class="last-update">
          <Clock :size="16" />
          <span>Dernière mise à jour: {{ formatTime(store.lastUpdate) }}</span>
        </div>
        <div v-if="store.isLoading" class="loading-indicator">
          <Loader2 :size="16" class="spinning" />
          <span>Chargement...</span>
        </div>
      </div>
    </div>
    
    <!-- User Progress Card -->
    <div class="user-progress-card">
      <div class="progress-content">
        <h2 class="progress-greeting">Bienvenue sur KANARI Energy</h2>
        <p class="progress-summary">Plateforme de monitoring énergétique de {{ countryStore.selectedCountry.name }}. Données historiques depuis 1980 jusqu'en 2020.</p>
        <div class="progress-circle-container">
          <div class="progress-circle">
            <span class="progress-value">{{ kpisData?.renewableRate || 0 }}%</span>
            <span class="progress-label">Taux Renouvelable</span>
            <span class="progress-status">{{ kpisData?.year || 2020 }}</span>
          </div>
        </div>
        <router-link to="/kanari-energy/api" class="view-schedule-btn">Documentation API</router-link>
      </div>
    </div>
    
    <!-- Time Period Selector & KPI Cards -->
    <div class="kpi-section-wrapper">
      <div class="period-selector-wrapper">
        <select class="period-selector" v-model="selectedPeriod" @change="handlePeriodChange">
          <option value="1">1 Année</option>
          <option value="5">5 Années</option>
          <option value="10">10 Années</option>
          <option value="20">20 Années</option>
        </select>
      </div>
      <div class="kpi-section">
        <KPICard
          label="Puissance Installée"
          :value="kpisData?.installedPower || store.kpis.totalPower"
          unit="MW"
          :icon="Zap"
          icon-bg-color="#3B82F6"
        />
        <KPICard
          label="Pointe Maximale"
          :value="kpisData?.peakPower || 0"
          unit="MW"
          :icon="Gauge"
          icon-bg-color="#F97316"
        />
        <KPICard
          label="Taux Renouvelable"
          :value="kpisData?.renewableRate || 0"
          unit="%"
          :icon="Leaf"
          icon-bg-color="#22C55E"
        />
      </div>
    </div>
    
    <!-- Main Content Grid -->
    <div class="dashboard-grid">
      <!-- Left Column -->
      <div class="main-content">
        <!-- Chart Section -->
        <div class="chart-section">
          <EnergyMixChart />
        </div>
        
        <!-- Energy Summary -->
        <div class="energy-summary-card">
          <div class="summary-header">
            <h3 class="summary-title">Résumé Énergétique</h3>
            <span class="summary-subtitle">Année {{ kpisData?.year || 2020 }}</span>
          </div>
          <div class="summary-stats">
            <div class="summary-stat-item">
              <span class="stat-label">Production</span>
              <span class="stat-value">{{ formatPower(kpisData?.totalProduction || 0) }}</span>
            </div>
            <div class="summary-stat-item">
              <span class="stat-label">Consommation</span>
              <span class="stat-value">{{ formatPower(kpisData?.totalConsumption || 0) }}</span>
            </div>
            <div class="summary-stat-item">
              <span class="stat-label">Abonnés</span>
              <span class="stat-value">{{ formatNumber(kpisData?.subscribers || 0) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="sidebar">
        <!-- Quick Stats -->
        <div class="quick-stats-panel">
          <h3 class="panel-title">Statistiques Rapides</h3>
          <div class="quick-stats">
            <div class="stat-item">
              <span class="stat-label">Production Max</span>
              <span class="stat-value">{{ formatPower(maxProduction) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Consommation Moy.</span>
              <span class="stat-value">{{ formatPower(avgConsumption) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Taux Renouvelable</span>
              <span class="stat-value">{{ renewablePercentage }}%</span>
            </div>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="filters-panel">
          <h3 class="panel-title">Filtres</h3>
          <DateRangePicker />
          <GranularitySelector />
          <EnergySourceToggles />
        </div>
        
        <!-- Alerts & Advice -->
        <AlertsAdvice
          :alerts="store.alerts"
          :advice="store.advice"
        />
        
        <!-- Export -->
        <ExportButtons />
      </div>
    </div>

    <!-- Blog Section -->
    <BlogSection />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useEnergyStore } from '../../../../stores/energyStore.js'
import { useCountryStore } from '../../../../stores/countryStore.js'
import { Clock, Loader2, Gauge, Zap, Leaf } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'
import KPICard from './KPICard.vue'
import AlertsAdvice from './AlertsAdvice.vue'
import EnergyMixChart from '../Charts/EnergyMixChart.vue'
import DateRangePicker from '../Filters/DateRangePicker.vue'
import GranularitySelector from '../Filters/GranularitySelector.vue'
import EnergySourceToggles from '../Filters/EnergySourceToggles.vue'
import ExportButtons from '../Export/ExportButtons.vue'
import BlogSection from './BlogSection.vue'
import NoDataMessage from '../NoDataMessage.vue'

const store = useEnergyStore()
const countryStore = useCountryStore()
const selectedPeriod = ref('5')
const kpisData = ref(null)

const hasData = computed(() => countryStore.selectedCountry.hasData)

let updateInterval = null

function formatTime(date) {
  return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function handlePeriodChange() {
  const years = parseInt(selectedPeriod.value)
  const end = new Date(2020, 11, 31) // Dernière année disponible
  const start = new Date(end.getFullYear() - years + 1, 0, 1)
  store.setDateRange(start, end)
  store.loadEnergyData()
  store.loadKPIs()
  store.loadAlertsAndAdvice()
}

function formatNumber(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toLocaleString('fr-FR')
}

const maxProduction = computed(() => {
  if (!kpisData.value) return 0
  return kpisData.value.totalProduction || 0
})

const avgConsumption = computed(() => {
  if (!kpisData.value) return 0
  return kpisData.value.totalConsumption || 0
})

const renewablePercentage = computed(() => {
  if (!kpisData.value) return 0
  return kpisData.value.renewableRate || 0
})

async function loadData() {
  if (!hasData.value) {
    kpisData.value = null
    return
  }
  
  await store.initialize()
  
  // Charger les KPIs depuis l'API
  try {
    kpisData.value = await energyApi.getKPIs()
  } catch (error) {
    console.error('Erreur lors du chargement des KPIs:', error)
  }
}

// Surveiller les changements de pays
watch(() => countryStore.selectedCountryCode, async () => {
  await loadData()
  store.loadEnergyData()
  store.loadKPIs()
  store.loadAlertsAndAdvice()
})

onMounted(async () => {
  await loadData()
  
  // Mise à jour temps réel toutes les 30 secondes
  updateInterval = setInterval(() => {
    if (hasData.value) {
      store.updateLatestReading()
      store.loadKPIs()
      store.loadAlertsAndAdvice()
    }
  }, 30000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.energy-dashboard {
  width: 100%;
  min-height: calc(100vh - 80px);
  background: #FAFAFA;
  color: #1A1A1A;
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  font-family: 'Space Grotesk', sans-serif;
  margin: 0;
}

.dashboard-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-progress-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 350px;
}

.progress-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-greeting {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.progress-summary {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}

.progress-circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6 0%, #22C55E 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.progress-value {
  font-size: 1.5rem;
  font-weight: 800;
}

.progress-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.progress-status {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.view-schedule-btn {
  padding: 0.625rem 1.5rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  text-decoration: none;
  display: inline-block;
}

.view-schedule-btn:hover {
  background: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.last-update,
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666666;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.kpi-section-wrapper {
  margin-bottom: 1.5rem;
}

.period-selector-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.period-selector {
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-selector:hover {
  border-color: #3B82F6;
}

.period-selector:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.kpi-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.energy-summary-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-header {
  margin-bottom: 1rem;
}

.summary-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 0.25rem;
}

.summary-subtitle {
  font-size: 0.875rem;
  color: #6B7280;
}

.summary-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.summary-stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
}

.participant-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.participant-count {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #22C55E;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  border: 2px solid #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quick-stats-panel {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.quick-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
}

.chart-section {
  min-height: 500px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filters-panel {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.panel-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    order: -1;
  }
  
  .user-progress-card {
    display: none;
  }
}

@media (max-width: 768px) {
  .energy-dashboard {
    padding: 1rem;
  }
  
  .dashboard-title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .dashboard-actions {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .kpi-section {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .user-progress-card {
    display: none;
  }
  
  .period-selector-wrapper {
    justify-content: flex-start;
  }
  
  .period-selector {
    width: 100%;
    max-width: 200px;
  }
  
  .chart-section {
    min-height: 300px;
  }
  
  .summary-stats {
    gap: 0.75rem;
  }
  
  .summary-stat-item {
    padding: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .stat-value {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .energy-dashboard {
    padding: 0.75rem;
  }
  
  .dashboard-title {
    font-size: 1.25rem;
  }
  
  .kpi-section {
    gap: 0.5rem;
  }
  
  .chart-section {
    min-height: 250px;
  }
  
  .energy-summary-card,
  .quick-stats-panel,
  .filters-panel {
    padding: 1rem;
  }
  
  .panel-title {
    font-size: 1rem;
  }
}
</style>
