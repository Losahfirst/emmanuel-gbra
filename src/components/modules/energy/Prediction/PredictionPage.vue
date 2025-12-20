<template>
  <div class="prediction-page">
    <div class="page-header">
      <h1 class="page-title">Prédiction des Données Énergétiques</h1>
      <p class="page-subtitle">Projections et prévisions pour {{ countryStore.selectedCountry?.name || 'le pays sélectionné' }}</p>
    </div>

    <div v-if="!countryStore.selectedCountry" class="loading-state">
      <p>Chargement des données...</p>
    </div>

    <NoDataMessage v-else-if="!hasData" />

    <div v-else class="prediction-content">
      <!-- Tabs Navigation -->
      <div class="tabs-container">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
        >
          <component :is="tab.icon" :size="20" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Production Prediction -->
        <div v-if="activeTab === 'production'" class="prediction-section">
          <div class="prediction-header">
            <h2 class="section-title">Prédiction de la Production</h2>
            <div class="prediction-controls">
              <select v-model="predictionPeriod" class="period-select">
                <option value="1">1 an</option>
                <option value="3">3 ans</option>
                <option value="5">5 ans</option>
                <option value="10">10 ans</option>
              </select>
            </div>
          </div>
          
          <div class="prediction-grid">
            <div class="prediction-card">
              <h3 class="card-title">Production Totale</h3>
              <div class="prediction-chart">
                <apexchart
                  type="line"
                  height="300"
                  :options="productionChartOptions"
                  :series="productionChartSeries"
                ></apexchart>
              </div>
            </div>

            <div class="prediction-card">
              <h3 class="card-title">Mix Énergétique Prévu</h3>
              <div class="prediction-chart">
                <apexchart
                  type="area"
                  height="300"
                  :options="mixChartOptions"
                  :series="mixChartSeries"
                ></apexchart>
              </div>
            </div>
          </div>

          <div class="prediction-stats">
            <div class="stat-box">
              <span class="stat-label">Production prévue ({{ predictionPeriod }} an)</span>
              <span class="stat-value">{{ formatPower(predictedProduction) }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Taux de croissance</span>
              <span class="stat-value">{{ growthRate }}%</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Part renouvelable prévue</span>
              <span class="stat-value">{{ renewableShare }}%</span>
            </div>
          </div>
        </div>

        <!-- Consumption Prediction -->
        <div v-if="activeTab === 'consumption'" class="prediction-section">
          <div class="prediction-header">
            <h2 class="section-title">Prédiction de la Consommation</h2>
            <div class="prediction-controls">
              <select v-model="predictionPeriod" class="period-select">
                <option value="1">1 an</option>
                <option value="3">3 ans</option>
                <option value="5">5 ans</option>
                <option value="10">10 ans</option>
              </select>
            </div>
          </div>

          <div class="prediction-grid">
            <div class="prediction-card">
              <h3 class="card-title">Consommation Nationale</h3>
              <div class="prediction-chart">
                <apexchart
                  type="line"
                  height="300"
                  :options="consumptionChartOptions"
                  :series="consumptionChartSeries"
                ></apexchart>
              </div>
            </div>

            <div class="prediction-card">
              <h3 class="card-title">Courbe de Charge Prévue</h3>
              <div class="prediction-chart">
                <apexchart
                  type="area"
                  height="300"
                  :options="loadCurveChartOptions"
                  :series="loadCurveChartSeries"
                ></apexchart>
              </div>
            </div>
          </div>

          <div class="prediction-stats">
            <div class="stat-box">
              <span class="stat-label">Consommation prévue ({{ predictionPeriod }} an)</span>
              <span class="stat-value">{{ formatPower(predictedConsumption) }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Taux de croissance</span>
              <span class="stat-value">{{ consumptionGrowth }}%</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Pointe prévue</span>
              <span class="stat-value">{{ formatPower(predictedPeak) }}</span>
            </div>
          </div>
        </div>

        <!-- Infrastructure Prediction -->
        <div v-if="activeTab === 'infrastructure'" class="prediction-section">
          <div class="prediction-header">
            <h2 class="section-title">Prédiction de l'Infrastructure</h2>
            <div class="prediction-controls">
              <select v-model="predictionPeriod" class="period-select">
                <option value="1">1 an</option>
                <option value="3">3 ans</option>
                <option value="5">5 ans</option>
                <option value="10">10 ans</option>
              </select>
            </div>
          </div>

          <div class="prediction-grid">
            <div class="prediction-card">
              <h3 class="card-title">Évolution du Réseau</h3>
              <div class="prediction-chart">
                <apexchart
                  type="line"
                  height="300"
                  :options="networkChartOptions"
                  :series="networkChartSeries"
                ></apexchart>
              </div>
            </div>

            <div class="prediction-card">
              <h3 class="card-title">Croissance des Abonnés</h3>
              <div class="prediction-chart">
                <apexchart
                  type="bar"
                  height="300"
                  :options="subscribersChartOptions"
                  :series="subscribersChartSeries"
                ></apexchart>
              </div>
            </div>
          </div>

          <div class="prediction-stats">
            <div class="stat-box">
              <span class="stat-label">Réseau prévu ({{ predictionPeriod }} an)</span>
              <span class="stat-value">{{ formatLength(predictedNetwork) }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Abonnés prévus</span>
              <span class="stat-value">{{ formatNumber(predictedSubscribers) }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Taux d'électrification prévu</span>
              <span class="stat-value">{{ electrificationRate }}%</span>
            </div>
          </div>
        </div>

        <!-- Demand Forecast -->
        <div v-if="activeTab === 'demand'" class="prediction-section">
          <div class="prediction-header">
            <h2 class="section-title">Prévision de la Demande</h2>
            <div class="prediction-controls">
              <select v-model="predictionPeriod" class="period-select">
                <option value="1">1 an</option>
                <option value="3">3 ans</option>
                <option value="5">5 ans</option>
                <option value="10">10 ans</option>
              </select>
            </div>
          </div>

          <div class="prediction-grid">
            <div class="prediction-card full-width">
              <h3 class="card-title">Équilibre Offre/Demande</h3>
              <div class="prediction-chart">
                <apexchart
                  type="line"
                  height="350"
                  :options="balanceChartOptions"
                  :series="balanceChartSeries"
                ></apexchart>
              </div>
            </div>
          </div>

          <div class="prediction-stats">
            <div class="stat-box">
              <span class="stat-label">Capacité installée prévue</span>
              <span class="stat-value">{{ formatPower(predictedCapacity) }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Demande prévue</span>
              <span class="stat-value">{{ formatPower(predictedDemand) }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Marge de sécurité</span>
              <span class="stat-value">{{ securityMargin }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCountryStore } from '../../../../stores/countryStore.js'
import { energyApi } from '../../../../api/energyApi.js'
import { formatPower, formatLength, formatNumber } from '../../../../utils/formatters.js'
import { Zap, TrendingUp, Network, BarChart3 } from 'lucide-vue-next'
import NoDataMessage from '../NoDataMessage.vue'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry?.hasData || false)

const activeTab = ref('production')
const predictionPeriod = ref('5')

const tabs = [
  { id: 'production', label: 'Production', icon: Zap },
  { id: 'consumption', label: 'Consommation', icon: TrendingUp },
  { id: 'infrastructure', label: 'Infrastructure', icon: Network },
  { id: 'demand', label: 'Demande', icon: BarChart3 }
]

// Data
const historicalProduction = ref([])
const historicalConsumption = ref([])
const historicalNetwork = ref([])
const historicalSubscribers = ref([])

// Predictions
const predictedProduction = ref(0)
const predictedConsumption = ref(0)
const predictedNetwork = ref(0)
const predictedSubscribers = ref(0)
const growthRate = ref(0)
const consumptionGrowth = ref(0)
const renewableShare = ref(0)
const predictedPeak = ref(0)
const electrificationRate = ref(0)
const predictedCapacity = ref(0)
const predictedDemand = ref(0)
const securityMargin = ref(0)

// Chart Options
const productionChartOptions = ref({
  chart: { type: 'line', height: 300, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#3B82F6'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: false },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' },
  annotations: {
    xaxis: [{
      x: new Date().getFullYear(),
      borderColor: '#EF4444',
      label: { text: 'Aujourd\'hui', style: { color: '#EF4444' } }
    }]
  }
})

const productionChartSeries = ref([{
  name: 'Production Historique',
  data: []
}, {
  name: 'Production Prévue',
  data: []
}])

const mixChartOptions = ref({
  chart: { type: 'area', height: 300, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#FACC15', '#22C55E'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  stroke: { width: 2, curve: 'smooth' },
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const mixChartSeries = ref([])

const consumptionChartOptions = ref({
  chart: { type: 'line', height: 300, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#F97316'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: false },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const consumptionChartSeries = ref([{
  name: 'Consommation Historique',
  data: []
}, {
  name: 'Consommation Prévue',
  data: []
}])

const loadCurveChartOptions = ref({
  chart: { type: 'area', height: 300, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#8B5CF6'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  stroke: { width: 2, curve: 'smooth' },
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: false },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const loadCurveChartSeries = ref([{
  name: 'Courbe de Charge',
  data: []
}])

const networkChartOptions = ref({
  chart: { type: 'line', height: 300, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#22C55E'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: false },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const networkChartSeries = ref([{
  name: 'Longueur Réseau',
  data: []
}])

const subscribersChartOptions = ref({
  chart: { type: 'bar', height: 300, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#8B5CF6'],
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: false },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const subscribersChartSeries = ref([{
  name: 'Nombre d\'Abonnés',
  data: []
}])

const balanceChartOptions = ref({
  chart: { type: 'line', height: 350, toolbar: { show: true } },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: { type: 'category', labels: { style: { colors: '#6B7280' } } },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const balanceChartSeries = ref([{
  name: 'Offre (Production)',
  data: []
}, {
  name: 'Demande (Consommation)',
  data: []
}])

// Simple linear regression for prediction
function predictLinear(data, years) {
  if (data.length < 2) return []
  
  const n = data.length
  const x = data.map((_, i) => i)
  const y = data.map(d => d.value || d.total || d)
  
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n
  
  const predictions = []
  for (let i = 0; i < years; i++) {
    const futureX = n + i
    const predictedY = slope * futureX + intercept
    predictions.push(Math.max(0, predictedY))
  }
  
  return predictions
}

async function loadHistoricalData() {
  try {
    const endYear = 2020
    const startYear = endYear - 10
    
    const [production, consumption, network, subscribers] = await Promise.all([
      energyApi.getProductionBrute({ startYear, endYear }),
      energyApi.getConsumption({ startYear, endYear }),
      energyApi.getNetworkLength({ startYear, endYear }),
      energyApi.getSubscribers({ startYear, endYear })
    ])
    
    historicalProduction.value = production || []
    historicalConsumption.value = consumption || []
    historicalNetwork.value = network || []
    historicalSubscribers.value = subscribers || []
    
    generatePredictions()
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
}

function generatePredictions() {
  const years = parseInt(predictionPeriod.value)
  const currentYear = new Date().getFullYear()
  
  // Production predictions
  if (historicalProduction.value.length > 0) {
    const productionValues = historicalProduction.value.map(p => p.total || 0)
    const predictions = predictLinear(productionValues, years)
    
    const historicalData = historicalProduction.value.map((p, i) => [
      (p.year || (currentYear - historicalProduction.value.length + i)).toString(),
      p.total || 0
    ])
    
    const predictedData = predictions.map((val, i) => [
      (currentYear + i + 1).toString(),
      val
    ])
    
    productionChartSeries.value = [
      { name: 'Production Historique', data: historicalData },
      { name: 'Production Prévue', data: predictedData, strokeDashArray: 5 }
    ]
    
    predictedProduction.value = predictions[predictions.length - 1] || 0
    growthRate.value = productionValues.length > 0 
      ? ((predictions[0] - productionValues[productionValues.length - 1]) / productionValues[productionValues.length - 1] * 100).toFixed(1)
      : 0
  }
  
  // Consumption predictions
  if (historicalConsumption.value.length > 0) {
    const consumptionValues = historicalConsumption.value.map(c => c.total || 0)
    const predictions = predictLinear(consumptionValues, years)
    
    const historicalData = historicalConsumption.value.map((c, i) => [
      (c.year || (currentYear - historicalConsumption.value.length + i)).toString(),
      c.total || 0
    ])
    
    const predictedData = predictions.map((val, i) => [
      (currentYear + i + 1).toString(),
      val
    ])
    
    consumptionChartSeries.value = [
      { name: 'Consommation Historique', data: historicalData },
      { name: 'Consommation Prévue', data: predictedData, strokeDashArray: 5 }
    ]
    
    predictedConsumption.value = predictions[predictions.length - 1] || 0
    consumptionGrowth.value = consumptionValues.length > 0
      ? ((predictions[0] - consumptionValues[consumptionValues.length - 1]) / consumptionValues[consumptionValues.length - 1] * 100).toFixed(1)
      : 0
    predictedPeak.value = predictions[predictions.length - 1] * 1.2 || 0
  }
  
  // Network predictions
  if (historicalNetwork.value.length > 0) {
    const networkValues = historicalNetwork.value.map(n => n.total || 0)
    const predictions = predictLinear(networkValues, years)
    
    const allData = [...historicalNetwork.value.map((n, i) => [
      (n.year || (currentYear - historicalNetwork.value.length + i)).toString(),
      n.total || 0
    ]), ...predictions.map((val, i) => [
      (currentYear + i + 1).toString(),
      val
    ])]
    
    networkChartSeries.value = [{
      name: 'Longueur Réseau',
      data: allData
    }]
    
    predictedNetwork.value = predictions[predictions.length - 1] || 0
  }
  
  // Subscribers predictions
  if (historicalSubscribers.value.length > 0) {
    const subscriberValues = historicalSubscribers.value.map(s => s.total || 0)
    const predictions = predictLinear(subscriberValues, years)
    
    const allData = [...historicalSubscribers.value.map((s, i) => [
      (s.year || (currentYear - historicalSubscribers.value.length + i)).toString(),
      s.total || 0
    ]), ...predictions.map((val, i) => [
      (currentYear + i + 1).toString(),
      val
    ])]
    
    subscribersChartSeries.value = [{
      name: 'Nombre d\'Abonnés',
      data: allData
    }]
    
    predictedSubscribers.value = Math.round(predictions[predictions.length - 1] || 0)
    electrificationRate.value = ((predictedSubscribers.value / 30000000) * 100).toFixed(1)
  }
  
  // Balance predictions
  if (historicalProduction.value.length > 0 && historicalConsumption.value.length > 0) {
    const productionData = [...historicalProduction.value.map((p, i) => [
      (p.year || (currentYear - historicalProduction.value.length + i)).toString(),
      p.total || 0
    ]), ...predictLinear(historicalProduction.value.map(p => p.total || 0), years).map((val, i) => [
      (currentYear + i + 1).toString(),
      val
    ])]
    
    const consumptionData = [...historicalConsumption.value.map((c, i) => [
      (c.year || (currentYear - historicalConsumption.value.length + i)).toString(),
      c.total || 0
    ]), ...predictLinear(historicalConsumption.value.map(c => c.total || 0), years).map((val, i) => [
      (currentYear + i + 1).toString(),
      val
    ])]
    
    balanceChartSeries.value = [
      { name: 'Offre (Production)', data: productionData },
      { name: 'Demande (Consommation)', data: consumptionData }
    ]
    
    predictedCapacity.value = productionData[productionData.length - 1]?.[1] || 0
    predictedDemand.value = consumptionData[consumptionData.length - 1]?.[1] || 0
    securityMargin.value = predictedCapacity.value > 0
      ? (((predictedCapacity.value - predictedDemand.value) / predictedCapacity.value) * 100).toFixed(1)
      : 0
  }
  
  // Mix énergétique (simulation)
  if (historicalProduction.value.length > 0) {
    const latest = historicalProduction.value[historicalProduction.value.length - 1]
    const hydraulicShare = latest.hydraulic / latest.total * 100
    renewableShare.value = hydraulicShare.toFixed(1)
    
    const years = parseInt(predictionPeriod.value)
    const mixData = []
    for (let i = 0; i < years; i++) {
      const year = currentYear + i + 1
      mixData.push([
        year.toString(),
        latest.hydraulic * (1 + 0.03 * i),
        latest.thermal * (1 + 0.01 * i),
        (latest.solar || 0) * (1 + 0.15 * i),
        (latest.bioenergy || 0) * (1 + 0.1 * i)
      ])
    }
    
    mixChartSeries.value = [
      { name: 'Hydraulique', data: mixData.map(d => [d[0], d[1]]) },
      { name: 'Thermique', data: mixData.map(d => [d[0], d[2]]) },
      { name: 'Solaire', data: mixData.map(d => [d[0], d[3]]) },
      { name: 'Bioénergie', data: mixData.map(d => [d[0], d[4]]) }
    ]
  }
}

watch(predictionPeriod, () => {
  generatePredictions()
})

watch(() => countryStore.selectedCountryCode, () => {
  if (hasData.value) {
    loadHistoricalData()
  }
})

onMounted(async () => {
  if (hasData.value) {
    await loadHistoricalData()
  }
})
</script>

<style scoped>
.prediction-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #FAFAFA;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1rem;
  color: #6B7280;
  margin: 0;
}

.loading-state {
  padding: 3rem;
  text-align: center;
  color: #6B7280;
}

.prediction-content {
  background: #FFFFFF;
  border-radius: 1rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tabs-container {
  display: flex;
  border-bottom: 2px solid #E5E7EB;
  background: #F9FAFB;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #6B7280;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  color: #3B82F6;
  background: #F3F4F6;
}

.tab-button.active {
  color: #3B82F6;
  border-bottom-color: #3B82F6;
  background: #FFFFFF;
}

.tab-content {
  padding: 2rem;
}

.prediction-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.prediction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0;
}

.prediction-controls {
  display: flex;
  gap: 1rem;
}

.period-select {
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.875rem;
  cursor: pointer;
}

.prediction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

.prediction-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.prediction-card.full-width {
  grid-column: 1 / -1;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 1rem 0;
}

.prediction-chart {
  margin-top: 1rem;
}

.prediction-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-box {
  background: linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%);
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .prediction-page {
    padding: 1rem;
  }

  .prediction-grid {
    grid-template-columns: 1fr;
  }

  .tabs-container {
    overflow-x: auto;
  }

  .tab-button {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
  }

  .tab-content {
    padding: 1.5rem;
  }

  .prediction-stats {
    grid-template-columns: 1fr;
  }
}
</style>
