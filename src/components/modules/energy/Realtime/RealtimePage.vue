<template>
  <div class="realtime-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Monitoring Temps Réel</h1>
        <p class="page-subtitle">Données énergétiques en direct</p>
      </div>
      <div class="header-actions">
        <div class="status-indicator" :class="{ active: isStreaming }">
          <div class="status-dot"></div>
          <span>{{ isStreaming ? 'En direct' : 'Pause' }}</span>
        </div>
        <button @click="toggleStreaming" class="control-btn">
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
          <p class="kpi-value">{{ formatPower(realtimeData.totalProduction) }}</p>
          <span class="kpi-change" :class="realtimeData.productionChange >= 0 ? 'positive' : 'negative'">
            {{ realtimeData.productionChange >= 0 ? '+' : '' }}{{ realtimeData.productionChange.toFixed(1) }}%
          </span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon" style="background: #F97316;">
          <Activity :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Consommation</h3>
          <p class="kpi-value">{{ formatPower(realtimeData.consumption) }}</p>
          <span class="kpi-change" :class="realtimeData.consumptionChange >= 0 ? 'positive' : 'negative'">
            {{ realtimeData.consumptionChange >= 0 ? '+' : '' }}{{ realtimeData.consumptionChange.toFixed(1) }}%
          </span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon" style="background: #22C55E;">
          <Gauge :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Fréquence Réseau</h3>
          <p class="kpi-value">{{ realtimeData.frequency.toFixed(2) }} Hz</p>
          <span class="kpi-change" :class="realtimeData.frequency >= 49.8 ? 'positive' : 'negative'">
            {{ realtimeData.frequency >= 49.8 ? 'Normal' : 'Alerte' }}
          </span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-icon" style="background: #8B5CF6;">
          <TrendingUp :size="24" />
        </div>
        <div class="kpi-content">
          <h3 class="kpi-label">Taux Renouvelable</h3>
          <p class="kpi-value">{{ realtimeData.renewableRate.toFixed(1) }}%</p>
          <span class="kpi-change positive">En hausse</span>
        </div>
      </div>
    </div>

    <!-- Real-time Charts -->
    <div class="charts-grid">
      <!-- Production Mix -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Mix Énergétique Temps Réel</h3>
          <span class="chart-time">{{ currentTime }}</span>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="350"
            :options="realtimeChartOptions"
            :series="realtimeChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Power Plants Status -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Statut des Centrales</h3>
        </div>
        <div class="plants-status">
          <div class="plant-status-item" v-for="plant in plantsStatus" :key="plant.name">
            <div class="plant-info">
              <h4 class="plant-name">{{ plant.name }}</h4>
              <p class="plant-power">{{ formatPower(plant.power) }}</p>
            </div>
            <div class="plant-indicator" :class="plant.status">
              <div class="indicator-dot"></div>
              <span>{{ plant.status === 'online' ? 'En ligne' : 'Hors ligne' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Updates -->
    <div class="updates-card">
      <h3 class="updates-title">Mises à jour récentes</h3>
      <div class="updates-list">
        <div v-for="update in recentUpdates" :key="update.id" class="update-item">
          <div class="update-time">{{ update.time }}</div>
          <div class="update-content">{{ update.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Zap, Activity, Gauge, TrendingUp } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'

const isStreaming = ref(false)
const realtimeData = ref({
  totalProduction: 0,
  consumption: 0,
  frequency: 50.0,
  renewableRate: 0,
  productionChange: 0,
  consumptionChange: 0
})

const currentTime = ref('')
const plantsStatus = ref([
  { name: 'AZITO', power: 0, status: 'online' },
  { name: 'CIPREL', power: 0, status: 'online' },
  { name: 'AGGREKO', power: 0, status: 'online' },
  { name: 'KOSSOU', power: 0, status: 'online' },
  { name: 'TAABO', power: 0, status: 'online' }
])

const recentUpdates = ref([])
let streamingInterval = null
let timeInterval = null

const realtimeChartOptions = ref({
  chart: {
    type: 'area',
    height: 350,
    toolbar: { show: false },
    animations: { enabled: true, easing: 'linear', speed: 800 }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#22C55E'],
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

const realtimeChartSeries = ref([
  {
    name: 'Hydraulique',
    data: []
  },
  {
    name: 'Thermique',
    data: []
  },
  {
    name: 'Total',
    data: []
  }
])

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('fr-FR')
}

function generateRealtimeData() {
  const baseProduction = 2500
  const baseConsumption = 2200
  
  // Simuler des variations réalistes
  const productionVariation = (Math.random() - 0.5) * 200
  const consumptionVariation = (Math.random() - 0.5) * 150
  
  const newProduction = baseProduction + productionVariation
  const newConsumption = baseConsumption + consumptionVariation
  
  const productionChange = realtimeData.value.totalProduction > 0
    ? ((newProduction - realtimeData.value.totalProduction) / realtimeData.value.totalProduction * 100)
    : 0
  
  const consumptionChange = realtimeData.value.consumption > 0
    ? ((newConsumption - realtimeData.value.consumption) / realtimeData.value.consumption * 100)
    : 0

  realtimeData.value = {
    totalProduction: newProduction,
    consumption: newConsumption,
    frequency: 49.8 + Math.random() * 0.4, // Entre 49.8 et 50.2 Hz
    renewableRate: 60 + Math.random() * 10, // Entre 60% et 70%
    productionChange,
    consumptionChange
  }

  // Mettre à jour les centrales
  plantsStatus.value.forEach(plant => {
    plant.power = Math.random() * 800 + 200 // Entre 200 et 1000 MW
    plant.status = Math.random() > 0.1 ? 'online' : 'offline'
  })

  // Ajouter un point au graphique
  const now = Date.now()
  const hydraulic = newProduction * 0.6
  const thermal = newProduction * 0.4

  realtimeChartSeries.value[0].data.push([now, hydraulic])
  realtimeChartSeries.value[1].data.push([now, thermal])
  realtimeChartSeries.value[2].data.push([now, newProduction])

  // Garder seulement les 50 derniers points
  if (realtimeChartSeries.value[0].data.length > 50) {
    realtimeChartSeries.value.forEach(series => {
      series.data.shift()
    })
  }

  // Ajouter une mise à jour
  addUpdate(`Production: ${formatPower(newProduction)} | Consommation: ${formatPower(newConsumption)}`)
}

function addUpdate(message) {
  const now = new Date()
  recentUpdates.value.unshift({
    id: Date.now(),
    time: now.toLocaleTimeString('fr-FR'),
    message
  })
  
  // Garder seulement les 10 dernières mises à jour
  if (recentUpdates.value.length > 10) {
    recentUpdates.value.pop()
  }
}

function toggleStreaming() {
  isStreaming.value = !isStreaming.value
  
  if (isStreaming.value) {
    streamingInterval = setInterval(generateRealtimeData, 2000) // Mise à jour toutes les 2 secondes
    addUpdate('Monitoring démarré')
  } else {
    if (streamingInterval) {
      clearInterval(streamingInterval)
      streamingInterval = null
    }
    addUpdate('Monitoring en pause')
  }
}

async function initializeData() {
  try {
    const kpis = await energyApi.getKPIs()
    realtimeData.value = {
      totalProduction: kpis.totalProduction || 2500,
      consumption: kpis.totalConsumption || 2200,
      frequency: 50.0,
      renewableRate: kpis.renewableRate || 60,
      productionChange: 0,
      consumptionChange: 0
    }
    
    // Initialiser les centrales avec des données réalistes
    plantsStatus.value[0].power = 800
    plantsStatus.value[1].power = 700
    plantsStatus.value[2].power = 500
    plantsStatus.value[3].power = 400
    plantsStatus.value[4].power = 300
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error)
  }
}

onMounted(async () => {
  await initializeData()
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  addUpdate('Système initialisé')
})

onUnmounted(() => {
  if (streamingInterval) {
    clearInterval(streamingInterval)
  }
  if (timeInterval) {
    clearInterval(timeInterval)
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
  margin: 0 0 0.25rem 0;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.header-actions {
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
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.control-btn {
  padding: 0.5rem 1.5rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.control-btn:hover {
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
  font-weight: 600;
}

.kpi-change.positive {
  color: #22C55E;
}

.kpi-change.negative {
  color: #EF4444;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
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
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.chart-time {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 600;
}

.chart-container {
  margin-top: 1rem;
}

.plants-status {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.plant-status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.plant-info {
  flex: 1;
}

.plant-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.plant-power {
  font-size: 1rem;
  font-weight: 700;
  color: #3B82F6;
  margin: 0;
}

.plant-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.plant-indicator.online {
  color: #22C55E;
}

.plant-indicator.offline {
  color: #EF4444;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: currentColor;
}

.updates-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.updates-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1rem;
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
}

.update-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.update-time {
  font-size: 0.75rem;
  color: #6B7280;
  font-weight: 600;
  min-width: 80px;
}

.update-content {
  font-size: 0.875rem;
  color: #1A1A1A;
  flex: 1;
}

@media (max-width: 968px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .realtime-kpis {
    grid-template-columns: 1fr;
  }
}
</style>
