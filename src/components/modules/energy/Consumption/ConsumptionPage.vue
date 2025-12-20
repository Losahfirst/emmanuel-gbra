<template>
  <div class="consumption-page">
    <NoDataMessage v-if="!hasData" />
    
    <template v-else>
    <div class="page-header">
      <h1 class="page-title">Consommation Énergétique - {{ countryStore.selectedCountry?.name || 'Chargement...' }}</h1>
      <div class="header-actions">
        <select v-model="selectedPeriod" @change="updateData" class="period-selector">
          <option value="5">5 dernières années</option>
          <option value="10">10 dernières années</option>
          <option value="20">20 dernières années</option>
          <option value="60">Toutes les données</option>
        </select>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon" style="background: #3B82F6;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Consommation Totale</h3>
          <p class="summary-value">{{ formatPower(latestConsumption?.total || 0) }}</p>
          <span class="summary-change">Année {{ latestConsumption?.year || 2020 }}</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #F97316;">
          <TrendingUp :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Tendance</h3>
          <p class="summary-value">{{ consumptionTrend }}%</p>
          <span class="summary-change" :class="consumptionTrend >= 0 ? 'positive' : 'negative'">
            {{ consumptionTrend >= 0 ? '↑' : '↓' }} vs période précédente
          </span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #22C55E;">
          <Users :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Consommation Spécifique</h3>
          <p class="summary-value">{{ latestSpecificConsumption?.kwhPerHab || 0 }} kWh/hab</p>
          <span class="summary-change">Année {{ latestSpecificConsumption?.year || 2020 }}</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #8B5CF6;">
          <Activity :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Pic de Consommation</h3>
          <p class="summary-value">{{ formatPower(maxConsumption) }}</p>
          <span class="summary-change">Maximum historique</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <!-- Consommation Nationale -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de la Consommation Nationale</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot" style="background: #3B82F6;"></span>
              Basse Tension (BT)
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background: #F97316;"></span>
              Haute/Moyenne Tension (HT/MT)
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background: #22C55E;"></span>
              Total
            </span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="400"
            :options="consumptionChartOptions"
            :series="consumptionChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Consommation Spécifique -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Consommation Spécifique (kWh par Habitant)</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="line"
            height="400"
            :options="specificConsumptionChartOptions"
            :series="specificConsumptionChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Répartition BT vs HT/MT -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Répartition Consommation BT / HT-MT</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="donut"
            height="350"
            :options="distributionChartOptions"
            :series="distributionChartSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- Statistics Table -->
    <div class="stats-table-card">
      <h3 class="table-title">Statistiques Détaillées</h3>
      <div class="table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Année</th>
              <th>Consommation BT (GWh)</th>
              <th>Consommation HT/MT (GWh)</th>
              <th>Total (GWh)</th>
              <th>kWh/Habitant</th>
              <th>Évolution</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in detailedStats" :key="stat.year">
              <td><strong>{{ stat.year }}</strong></td>
              <td>{{ formatPower(stat.bt) }}</td>
              <td>{{ formatPower(stat.htmt) }}</td>
              <td><strong>{{ formatPower(stat.total) }}</strong></td>
              <td>{{ stat.kwhPerHab || '-' }}</td>
              <td>
                <span :class="stat.evolution >= 0 ? 'variation positive' : 'variation negative'">
                  {{ stat.evolution >= 0 ? '+' : '' }}{{ stat.evolution.toFixed(1) }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Zap, TrendingUp, Users, Activity } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'
import { useCountryStore } from '../../../../stores/countryStore.js'
import NoDataMessage from '../NoDataMessage.vue'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry?.hasData || false)

const selectedPeriod = ref('10')
const consumptionData = ref([])
const specificConsumptionData = ref([])
const latestConsumption = ref(null)
const latestSpecificConsumption = ref(null)
const consumptionTrend = ref(0)
const maxConsumption = ref(0)

const consumptionChartOptions = ref({
  chart: {
    type: 'area',
    height: 400,
    toolbar: { show: true },
    zoom: { enabled: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#22C55E'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  stroke: { width: 3, curve: 'smooth' },
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => formatPower(val) }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const consumptionChartSeries = ref([])

const specificConsumptionChartOptions = ref({
  chart: {
    type: 'line',
    height: 400,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#8B5CF6'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, title: { text: 'kWh/Habitant', style: { color: '#6B7280' } } }
  },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const specificConsumptionChartSeries = ref([])

const distributionChartOptions = ref({
  chart: { type: 'donut', height: 350 },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316'],
  labels: ['Basse Tension (BT)', 'Haute/Moyenne Tension (HT/MT)'],
  legend: { position: 'bottom' },
  plotOptions: {
    pie: {
      donut: { size: '70%' }
    }
  },
  tooltip: { theme: 'light' }
})

const distributionChartSeries = ref([0, 0])

const detailedStats = computed(() => {
  if (!consumptionData.value.length) return []
  
  return consumptionData.value.map((item, index) => {
    const prevItem = consumptionData.value[index - 1]
    const evolution = prevItem && prevItem.total > 0
      ? ((item.total - prevItem.total) / prevItem.total * 100)
      : 0
    
    const specific = specificConsumptionData.value.find(s => s.year === item.year)
    
    return {
      year: item.year,
      bt: item.bt,
      htmt: item.htmt,
      total: item.total,
      kwhPerHab: specific?.kwhPerHab,
      evolution
    }
  }).reverse()
})

async function updateData() {
  const years = parseInt(selectedPeriod.value)
  const endYear = 2020
  const startYear = years === 60 ? 1960 : endYear - years + 1

  const [consumption, specific] = await Promise.all([
    energyApi.getConsumption({ startYear, endYear }),
    energyApi.getSpecificConsumption({ startYear, endYear })
  ])

  consumptionData.value = consumption
  specificConsumptionData.value = specific

  if (consumption.length > 0) {
    latestConsumption.value = consumption[consumption.length - 1]
    maxConsumption.value = Math.max(...consumption.map(c => c.total))
    
    // Calculer la tendance
    if (consumption.length >= 2) {
      const recent = consumption.slice(-5)
      const previous = consumption.slice(-10, -5)
      const recentAvg = recent.reduce((sum, c) => sum + c.total, 0) / recent.length
      const previousAvg = previous.length > 0 
        ? previous.reduce((sum, c) => sum + c.total, 0) / previous.length 
        : recentAvg
      consumptionTrend.value = previousAvg > 0 
        ? ((recentAvg - previousAvg) / previousAvg * 100) 
        : 0
    }
  }

  if (specific.length > 0) {
    latestSpecificConsumption.value = specific[specific.length - 1]
  }

  generateCharts()
}

function generateCharts() {
  // Consommation nationale
  consumptionChartSeries.value = [
    {
      name: 'Basse Tension (BT)',
      data: consumptionData.value.map(d => [d.year, d.bt])
    },
    {
      name: 'Haute/Moyenne Tension (HT/MT)',
      data: consumptionData.value.map(d => [d.year, d.htmt])
    },
    {
      name: 'Total',
      data: consumptionData.value.map(d => [d.year, d.total])
    }
  ]

  // Consommation spécifique
  specificConsumptionChartSeries.value = [{
    name: 'kWh par Habitant',
    data: specificConsumptionData.value.map(d => [d.year, d.kwhPerHab])
  }]

  // Distribution
  if (latestConsumption.value) {
    distributionChartSeries.value = [
      latestConsumption.value.bt,
      latestConsumption.value.htmt
    ]
  }
}

onMounted(async () => {
  await updateData()
})
</script>

<style scoped>
.consumption-page {
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

.period-selector {
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

.charts-section {
  display: flex;
  flex-direction: column;
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
  border-radius: 0.75rem;
  padding: 1.25rem;
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
  .consumption-page {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .period-selector {
    width: 100%;
    max-width: 250px;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .summary-card {
    padding: 1rem;
  }
  
  .chart-card {
    padding: 1rem;
  }
  
  .chart-title {
    font-size: 1rem;
  }
  
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .stats-table {
    min-width: 600px;
  }
  
  .stats-table th,
  .stats-table td {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .consumption-page {
    padding: 0.75rem;
  }
  
  .page-title {
    font-size: 1.125rem;
  }
  
  .summary-card {
    padding: 0.75rem;
  }
  
  .summary-icon {
    width: 36px;
    height: 36px;
  }
  
  .summary-value {
    font-size: 1.25rem;
  }
  
  .chart-card {
    padding: 0.75rem;
  }
}
</style>
