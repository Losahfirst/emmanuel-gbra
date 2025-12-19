<template>
  <div class="analytics-page">
    <div class="analytics-header">
      <h1 class="page-title">Analytics</h1>
      <div class="header-actions">
        <select v-model="selectedMetric" @change="updateAnalytics" class="metric-selector">
          <option value="production">Production</option>
          <option value="consumption">Consommation</option>
          <option value="efficiency">Efficacité</option>
          <option value="carbon">Empreinte Carbone</option>
        </select>
        <select v-model="selectedTimeframe" @change="updateAnalytics" class="timeframe-selector">
          <option value="5">5 dernières années</option>
          <option value="10">10 dernières années</option>
          <option value="20">20 dernières années</option>
          <option value="40">Toutes les données</option>
        </select>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon" style="background: #3B82F6;">
          <TrendingUp :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Tendance Production</h3>
          <p class="summary-value">{{ productionTrend }}%</p>
          <span class="summary-change" :class="productionTrend >= 0 ? 'positive' : 'negative'">
            {{ productionTrend >= 0 ? '↑' : '↓' }} {{ Math.abs(productionTrend) }}% vs période précédente
          </span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #F97316;">
          <Activity :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Pic de Consommation</h3>
          <p class="summary-value">{{ peakConsumption }} MW</p>
          <span class="summary-change">
            {{ peakConsumptionDate }}
          </span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #22C55E;">
          <Leaf :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Taux Renouvelable</h3>
          <p class="summary-value">{{ renewableRate }}%</p>
          <span class="summary-change positive">
            ↑ Objectif: 50% d'ici 2030
          </span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #FACC15;">
          <BarChart3 :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Efficacité Moyenne</h3>
          <p class="summary-value">{{ averageEfficiency }}%</p>
          <span class="summary-change">
            Performance réseau
          </span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-grid">
      <!-- Production Trend Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de la Production</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot" style="background: #3B82F6;"></span>
              Hydraulique
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background: #F97316;"></span>
              Thermique
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background: #FACC15;"></span>
              Solaire
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background: #22C55E;"></span>
              Bioénergie
            </span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart
            type="line"
            height="300"
            :options="productionChartOptions"
            :series="productionChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Consumption Pattern Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Profil de Consommation</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="300"
            :options="consumptionChartOptions"
            :series="consumptionChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Energy Mix Distribution -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Répartition du Mix Énergétique</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="donut"
            height="300"
            :options="mixChartOptions"
            :series="mixChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Carbon Footprint -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Empreinte Carbone</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="bar"
            height="300"
            :options="carbonChartOptions"
            :series="carbonChartSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- Detailed Statistics Table -->
    <div class="stats-table-card">
      <h3 class="table-title">Statistiques Détaillées</h3>
      <div class="table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Production Moyenne (MW)</th>
              <th>Production Max (MW)</th>
              <th>Production Min (MW)</th>
              <th>Part du Mix (%)</th>
              <th>Variation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in detailedStats" :key="stat.source">
              <td>
                <div class="source-cell">
                  <span class="source-dot" :style="{ background: stat.color }"></span>
                  {{ stat.name }}
                </div>
              </td>
              <td>{{ formatPower(stat.average) }}</td>
              <td>{{ formatPower(stat.max) }}</td>
              <td>{{ formatPower(stat.min) }}</td>
              <td>{{ stat.percentage }}%</td>
              <td>
                <span :class="stat.variation >= 0 ? 'variation positive' : 'variation negative'">
                  {{ stat.variation >= 0 ? '+' : '' }}{{ stat.variation.toFixed(1) }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCountryStore } from '../../../../stores/countryStore.js'
import NoDataMessage from '../NoDataMessage.vue'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry.hasData)
import { useEnergyStore } from '../../../../stores/energyStore.js'
import { TrendingUp, Activity, Leaf, BarChart3 } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { getAnalyticsData } from '../../../../services/realDataService.js'

const store = useEnergyStore()
const selectedMetric = ref('production')
const selectedTimeframe = ref('10')

const productionTrend = ref(5.2)
const peakConsumption = ref(0)
const peakConsumptionDate = ref('')
const renewableRate = ref(0)
const averageEfficiency = ref(0)

const productionChartOptions = ref({
  chart: {
    type: 'line',
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#FACC15', '#22C55E'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: {
    type: 'datetime',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => formatPower(val) }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' }
})

const productionChartSeries = ref([])

const consumptionChartOptions = ref({
  chart: {
    type: 'area',
    height: 300,
    toolbar: { show: false }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  xaxis: {
    type: 'datetime',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => formatPower(val) }
  },
  grid: { borderColor: '#E5E7EB' }
})

const consumptionChartSeries = ref([])

const mixChartOptions = ref({
  chart: { type: 'donut', height: 300 },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#FACC15', '#22C55E'],
  labels: ['Hydraulique', 'Thermique', 'Solaire', 'Bioénergie'],
  legend: { position: 'bottom' },
  plotOptions: {
    pie: {
      donut: { size: '70%' }
    }
  }
})

const mixChartSeries = ref([0, 0, 0, 0])

const carbonChartOptions = ref({
  chart: { type: 'bar', height: 300, toolbar: { show: false } },
  theme: { mode: 'light' },
  colors: ['#22C55E', '#F97316'],
  xaxis: {
    categories: ['Hydraulique', 'Thermique', 'Solaire', 'Bioénergie'],
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => `${val} gCO₂/kWh` }
  },
  grid: { borderColor: '#E5E7EB' }
})

const carbonChartSeries = ref([])

const detailedStats = ref([])

function updateAnalytics() {
  calculateAnalytics()
  generateChartData()
}

function calculateAnalytics() {
  const data = store.filteredEnergyData
  
  // Calculate production trend
  if (data.hydraulic && data.hydraulic.length > 0) {
    const recent = data.hydraulic.slice(-30)
    const previous = data.hydraulic.slice(-60, -30)
    const recentAvg = recent.reduce((sum, d) => sum + d.value, 0) / recent.length
    const previousAvg = previous.length > 0 ? previous.reduce((sum, d) => sum + d.value, 0) / previous.length : recentAvg
    productionTrend.value = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg * 100) : 0
  }

  // Calculate peak consumption
  if (data.consumption && data.consumption.length > 0) {
    const maxConsumption = Math.max(...data.consumption.map(d => d.value))
    peakConsumption.value = maxConsumption
    const peakData = data.consumption.find(d => d.value === maxConsumption)
    if (peakData) {
      peakConsumptionDate.value = new Date(peakData.timestamp).toLocaleDateString('fr-FR')
    }
  }

  // Calculate renewable rate
  const totalProduction = store.totalProduction
  const renewable = (data.hydraulic || []).reduce((sum, d) => sum + d.value, 0) +
                    (data.solar || []).reduce((sum, d) => sum + d.value, 0) +
                    (data.bioenergy || []).reduce((sum, d) => sum + d.value, 0)
  renewableRate.value = totalProduction > 0 ? (renewable / totalProduction * 100) : 0

  // Calculate average efficiency
  averageEfficiency.value = store.kpis.frequency > 49.8 ? 95 : 85
}

function generateChartData() {
  const data = store.filteredEnergyData
  const years = parseInt(selectedTimeframe.value)
  const endDate = new Date(2020, 11, 31) // Dernière année disponible
  const startDate = years === 40 
    ? new Date(1980, 0, 1) // Toutes les données depuis 1980
    : new Date(endDate.getFullYear() - years + 1, 0, 1)

  // Production trend chart
  const filteredData = {
    hydraulic: (data.hydraulic || []).filter(d => new Date(d.timestamp) >= startDate),
    thermal: (data.thermal || []).filter(d => new Date(d.timestamp) >= startDate),
    solar: (data.solar || []).filter(d => new Date(d.timestamp) >= startDate),
    bioenergy: (data.bioenergy || []).filter(d => new Date(d.timestamp) >= startDate)
  }

  productionChartSeries.value = [
    {
      name: 'Hydraulique',
      data: filteredData.hydraulic.map(d => [new Date(d.timestamp).getTime(), d.value])
    },
    {
      name: 'Thermique',
      data: filteredData.thermal.map(d => [new Date(d.timestamp).getTime(), d.value])
    },
    {
      name: 'Solaire',
      data: filteredData.solar.map(d => [new Date(d.timestamp).getTime(), d.value])
    },
    {
      name: 'Bioénergie',
      data: filteredData.bioenergy.map(d => [new Date(d.timestamp).getTime(), d.value])
    }
  ]

  // Consumption chart
  const consumptionData = (data.consumption || []).filter(d => new Date(d.timestamp) >= startDate)
  consumptionChartSeries.value = [{
    name: 'Consommation',
    data: consumptionData.map(d => [new Date(d.timestamp).getTime(), d.value])
  }]

  // Mix distribution
  const totalHydraulic = filteredData.hydraulic.reduce((sum, d) => sum + d.value, 0)
  const totalThermal = filteredData.thermal.reduce((sum, d) => sum + d.value, 0)
  const totalSolar = filteredData.solar.reduce((sum, d) => sum + d.value, 0)
  const totalBioenergy = filteredData.bioenergy.reduce((sum, d) => sum + d.value, 0)
  const total = totalHydraulic + totalThermal + totalSolar + totalBioenergy

  mixChartSeries.value = total > 0 ? [
    (totalHydraulic / total * 100),
    (totalThermal / total * 100),
    (totalSolar / total * 100),
    (totalBioenergy / total * 100)
  ] : [0, 0, 0, 0]

  // Carbon footprint
  carbonChartSeries.value = [{
    name: 'Empreinte Carbone',
    data: [
      store.kpis.carbonRate * 0.1, // Hydraulique
      store.kpis.carbonRate * 0.8, // Thermique
      store.kpis.carbonRate * 0.05, // Solaire
      store.kpis.carbonRate * 0.05 // Bioénergie
    ]
  }]

  // Detailed stats
  detailedStats.value = [
    {
      source: 'hydraulic',
      name: 'Hydraulique',
      color: '#3B82F6',
      average: totalHydraulic / (filteredData.hydraulic.length || 1),
      max: Math.max(...filteredData.hydraulic.map(d => d.value), 0),
      min: Math.min(...filteredData.hydraulic.map(d => d.value), 0),
      percentage: total > 0 ? (totalHydraulic / total * 100) : 0,
      variation: productionTrend.value
    },
    {
      source: 'thermal',
      name: 'Thermique',
      color: '#F97316',
      average: totalThermal / (filteredData.thermal.length || 1),
      max: Math.max(...filteredData.thermal.map(d => d.value), 0),
      min: Math.min(...filteredData.thermal.map(d => d.value), 0),
      percentage: total > 0 ? (totalThermal / total * 100) : 0,
      variation: -2.1
    },
    {
      source: 'solar',
      name: 'Solaire',
      color: '#FACC15',
      average: totalSolar / (filteredData.solar.length || 1),
      max: Math.max(...filteredData.solar.map(d => d.value), 0),
      min: Math.min(...filteredData.solar.map(d => d.value), 0),
      percentage: total > 0 ? (totalSolar / total * 100) : 0,
      variation: 8.5
    },
    {
      source: 'bioenergy',
      name: 'Bioénergie',
      color: '#22C55E',
      average: totalBioenergy / (filteredData.bioenergy.length || 1),
      max: Math.max(...filteredData.bioenergy.map(d => d.value), 0),
      min: Math.min(...filteredData.bioenergy.map(d => d.value), 0),
      percentage: total > 0 ? (totalBioenergy / total * 100) : 0,
      variation: 12.3
    }
  ]
}

onMounted(async () => {
  if (hasData.value) {
    // Charger les données si elles ne sont pas déjà chargées
    if (!store.energyData || Object.keys(store.energyData).length === 0 || store.energyData.hydraulic.length === 0) {
      await store.initialize()
    }
    calculateAnalytics()
    generateChartData()
  }
})

// Surveiller les changements de pays
watch(() => countryStore.selectedCountryCode, async () => {
  if (hasData.value) {
    await store.initialize()
    await updateAnalytics()
  }
})
</script>

<style scoped>
.analytics-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #FAFAFA;
}

.analytics-header {
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

.header-actions {
  display: flex;
  gap: 1rem;
}

.metric-selector,
.timeframe-selector {
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.95rem;
  cursor: pointer;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  gap: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  width: 44px;
  height: 44px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.summary-content {
  flex: 1;
}

.summary-label {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.summary-change {
  font-size: 0.75rem;
  color: #6B7280;
}

.summary-change.positive {
  color: #22C55E;
}

.summary-change.negative {
  color: #EF4444;
}

.charts-grid {
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

.stats-table-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1rem;
}

.table-container {
  overflow-x: auto;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
}

.stats-table th {
  text-align: left;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6B7280;
  border-bottom: 2px solid #E5E7EB;
}

.stats-table td {
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #1A1A1A;
  border-bottom: 1px solid #F3F4F6;
}

.source-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.source-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.variation {
  font-weight: 600;
}

.variation.positive {
  color: #22C55E;
}

.variation.negative {
  color: #EF4444;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
