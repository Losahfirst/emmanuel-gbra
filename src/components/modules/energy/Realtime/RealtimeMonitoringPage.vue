<template>
  <div class="realtime-page">
    <div class="page-header">
      <h1 class="page-title">Monitoring Temps Réel</h1>
      <div class="header-status">
        <div class="status-indicator" :class="{ active: isStreaming }">
          <div class="status-dot"></div>
          <span>{{ isStreaming ? 'En direct' : 'Pause' }}</span>
        </div>
        <button @click="toggleStreaming" class="stream-btn">
          {{ isStreaming ? 'Pause' : 'Démarrer' }}
        </button>
      </div>
    </div>

    <!-- Real-time KPIs -->
    <div class="realtime-kpis">
      <div class="kpi-card">
        <div class="kpi-icon" style="background: #3B82F6;">
          <Zap :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Production Totale</h3>
          <p class="kpi-value">{{ formatPower(currentData.totalProduction) }}</p>
          <span class="kpi-change" :class="currentData.productionTrend >= 0 ? 'positive' : 'negative'">
            {{ currentData.productionTrend >= 0 ? '↑' : '↓' }} {{ Math.abs(currentData.productionTrend).toFixed(1) }}%
          </span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon" style="background: #F97316;">
          <Activity :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Consommation</h3>
          <p class="kpi-value">{{ formatPower(currentData.totalConsumption) }}</p>
          <span class="kpi-change" :class="currentData.consumptionTrend >= 0 ? 'positive' : 'negative'">
            {{ currentData.consumptionTrend >= 0 ? '↑' : '↓' }} {{ Math.abs(currentData.consumptionTrend).toFixed(1) }}%
          </span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon" style="background: #22C55E;">
          <TrendingUp :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Taux Renouvelable</h3>
          <p class="kpi-value">{{ currentData.renewableRate }}%</p>
          <span class="kpi-change positive">Stable</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon" style="background: #8B5CF6;">
          <Gauge :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Pointe Maximale</h3>
          <p class="kpi-value">{{ formatPower(currentData.peakPower) }}</p>
          <span class="kpi-change">Aujourd'hui</span>
        </div>
      </div>
    </div>

    <!-- Real-time Charts -->
    <div class="realtime-charts">
      <!-- Production Mix Live -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Mix Énergétique en Temps Réel</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot" style="background: #3B82F6;"></span>
              Hydraulique
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background: #F97316;"></span>
              Thermique
            </span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="350"
            :options="realtimeMixOptions"
            :series="realtimeMixSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Centrales Performance -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Performance des Centrales</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="bar"
            height="350"
            :options="centralesPerformanceOptions"
            :series="centralesPerformanceSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- Centrales Status Grid -->
    <div class="centrales-grid">
      <h2 class="section-title">Statut des Centrales</h2>
      <div class="centrales-cards">
        <div v-for="centrale in centralesStatus" :key="centrale.name" class="centrale-card">
          <div class="centrale-header">
            <h3 class="centrale-name">{{ centrale.name }}</h3>
            <div class="status-badge" :class="centrale.status">
              <div class="status-dot-small"></div>
              {{ centrale.statusText }}
            </div>
          </div>
          <div class="centrale-stats">
            <div class="stat-row">
              <span class="stat-label">Production</span>
              <span class="stat-value">{{ formatPower(centrale.production) }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Disponibilité</span>
              <span class="stat-value">{{ centrale.availability }}%</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Contribution</span>
              <span class="stat-value">{{ centrale.contribution }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts Section -->
    <div class="alerts-section">
      <h2 class="section-title">Alertes en Temps Réel</h2>
      <div class="alerts-list">
        <div v-for="alert in realtimeAlerts" :key="alert.id" class="alert-item" :class="alert.level">
          <div class="alert-icon">
            <AlertCircle v-if="alert.level === 'warning'" :size="20" />
            <AlertTriangle v-else-if="alert.level === 'error'" :size="20" />
            <Info v-else :size="20" />
          </div>
          <div class="alert-content">
            <h4 class="alert-title">{{ alert.title }}</h4>
            <p class="alert-message">{{ alert.message }}</p>
            <span class="alert-time">{{ alert.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Zap, Activity, TrendingUp, Gauge, AlertCircle, AlertTriangle, Info } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'

const isStreaming = ref(false)
const currentData = ref({
  totalProduction: 0,
  totalConsumption: 0,
  renewableRate: 0,
  peakPower: 0,
  productionTrend: 0,
  consumptionTrend: 0
})

const realtimeData = ref([])
const centralesStatus = ref([])
const realtimeAlerts = ref([])
let streamingInterval = null

const realtimeMixOptions = ref({
  chart: {
    type: 'area',
    height: 350,
    toolbar: { show: true },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  stroke: { width: 3, curve: 'smooth' },
  xaxis: {
    type: 'datetime',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => formatPower(val) }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const realtimeMixSeries = ref([
  {
    name: 'Hydraulique',
    data: []
  },
  {
    name: 'Thermique',
    data: []
  }
])

const centralesPerformanceOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#22C55E'],
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => formatPower(val) }
  },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const centralesPerformanceSeries = ref([{
  name: 'Production',
  data: []
}])

async function loadInitialData() {
  try {
    const kpis = await energyApi.getKPIs()
    const centrales = await energyApi.getCentralesProduction({ startYear: 2020, endYear: 2020 })
    
    currentData.value = {
      totalProduction: kpis.totalProduction || 0,
      totalConsumption: kpis.totalConsumption || 0,
      renewableRate: kpis.renewableRate || 0,
      peakPower: kpis.peakPower || 0,
      productionTrend: 0,
      consumptionTrend: 0
    }

    // Initialiser le statut des centrales
    centralesStatus.value = [
      {
        name: 'AZITO',
        production: centrales.azito?.[0]?.production * 1000 || 0,
        availability: 93,
        contribution: centrales.azito?.[0]?.contribution || 0,
        status: 'active',
        statusText: 'Opérationnelle'
      },
      {
        name: 'CIPREL',
        production: centrales.ciprel?.[0]?.production * 1000 || 0,
        availability: 89,
        contribution: centrales.ciprel?.[0]?.contribution || 0,
        status: 'active',
        statusText: 'Opérationnelle'
      },
      {
        name: 'AGGREKO',
        production: centrales.aggreko?.[0]?.production * 1000 || 0,
        availability: 95,
        contribution: centrales.aggreko?.[0]?.contribution || 0,
        status: 'active',
        statusText: 'Opérationnelle'
      }
    ]

    updatePerformanceChart()
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
}

function updatePerformanceChart() {
  centralesPerformanceSeries.value = [{
    name: 'Production',
    data: centralesStatus.value.map(c => c.production)
  }]
}

function simulateRealtimeData() {
  const now = new Date()
  const timestamp = now.getTime()
  
  // Simuler des variations de production
  const baseHydraulic = currentData.value.totalProduction * 0.6
  const baseThermal = currentData.value.totalProduction * 0.4
  
  const hydraulic = baseHydraulic + (Math.random() - 0.5) * baseHydraulic * 0.1
  const thermal = baseThermal + (Math.random() - 0.5) * baseThermal * 0.1

  realtimeData.value.push({
    timestamp,
    hydraulic,
    thermal
  })

  // Garder seulement les 50 derniers points
  if (realtimeData.value.length > 50) {
    realtimeData.value.shift()
  }

  // Mettre à jour les séries
  realtimeMixSeries.value = [
    {
      name: 'Hydraulique',
      data: realtimeData.value.map(d => [d.timestamp, d.hydraulic])
    },
    {
      name: 'Thermique',
      data: realtimeData.value.map(d => [d.timestamp, d.thermal])
    }
  ]

  // Mettre à jour les KPIs avec de petites variations
  currentData.value.totalProduction = hydraulic + thermal
  currentData.value.productionTrend = (Math.random() - 0.5) * 2
  currentData.value.consumptionTrend = (Math.random() - 0.5) * 2

  // Générer des alertes occasionnellement
  if (Math.random() > 0.95) {
    generateAlert()
  }
}

function generateAlert() {
  const alerts = [
    {
      id: Date.now(),
      level: 'info',
      title: 'Mise à jour des données',
      message: 'Les données de production ont été mises à jour',
      time: new Date().toLocaleTimeString('fr-FR')
    },
    {
      id: Date.now() + 1,
      level: 'warning',
      title: 'Variation de production',
      message: 'Variation significative détectée dans la production thermique',
      time: new Date().toLocaleTimeString('fr-FR')
    }
  ]

  const alert = alerts[Math.floor(Math.random() * alerts.length)]
  realtimeAlerts.value.unshift(alert)
  
  // Garder seulement les 10 dernières alertes
  if (realtimeAlerts.value.length > 10) {
    realtimeAlerts.value.pop()
  }
}

function toggleStreaming() {
  isStreaming.value = !isStreaming.value
  
  if (isStreaming.value) {
    streamingInterval = setInterval(simulateRealtimeData, 2000)
  } else {
    if (streamingInterval) {
      clearInterval(streamingInterval)
      streamingInterval = null
    }
  }
}

onMounted(async () => {
  await loadInitialData()
})

onUnmounted(() => {
  if (streamingInterval) {
    clearInterval(streamingInterval)
  }
})
</script>

<style scoped>
.realtime-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #FAFAFA;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0;
}

.header-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #F3F4F6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #6B7280;
}

.status-indicator.active {
  background: #D1FAE5;
  color: #065F46;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9CA3AF;
}

.status-indicator.active .status-dot {
  background: #22C55E;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.stream-btn {
  padding: 0.5rem 1.5rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.stream-btn:hover {
  background: #2563EB;
}

.realtime-kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  gap: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.kpi-icon {
  width: 44px;
  height: 44px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.kpi-content {
  flex: 1;
}

.kpi-label {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.kpi-change {
  font-size: 0.75rem;
  color: #6B7280;
}

.kpi-change.positive {
  color: #22C55E;
}

.kpi-change.negative {
  color: #EF4444;
}

.realtime-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6B7280;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.chart-container {
  margin-top: 1rem;
}

.centrales-grid {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1.5rem;
}

.centrales-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.centrale-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.centrale-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.centrale-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.active {
  background: #D1FAE5;
  color: #065F46;
}

.status-dot-small {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.centrale-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #F3F4F6;
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
}

.alerts-section {
  margin-bottom: 2rem;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.alert-item.info {
  border-left: 4px solid #3B82F6;
}

.alert-item.warning {
  border-left: 4px solid #F97316;
}

.alert-item.error {
  border-left: 4px solid #EF4444;
}

.alert-icon {
  flex-shrink: 0;
  color: #6B7280;
}

.alert-item.info .alert-icon {
  color: #3B82F6;
}

.alert-item.warning .alert-icon {
  color: #F97316;
}

.alert-item.error .alert-icon {
  color: #EF4444;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.alert-message {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0 0 0.5rem 0;
}

.alert-time {
  font-size: 0.75rem;
  color: #9CA3AF;
}

@media (max-width: 768px) {
  .realtime-kpis,
  .realtime-charts,
  .centrales-cards {
    grid-template-columns: 1fr;
  }
}
</style>
