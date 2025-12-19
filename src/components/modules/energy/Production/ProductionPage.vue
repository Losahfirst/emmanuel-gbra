<template>
  <div class="production-page">
    <NoDataMessage v-if="!hasData" />
    
    <template v-else>
    <div class="page-header">
      <h1 class="page-title">Production Énergétique - {{ countryStore.selectedCountry.name }}</h1>
      <div class="header-actions">
        <select v-model="selectedPeriod" @change="updateData" class="period-selector">
          <option value="5">5 dernières années</option>
          <option value="10">10 dernières années</option>
          <option value="20">20 dernières années</option>
          <option value="40">Toutes les données</option>
        </select>
        <select v-model="selectedView" @change="updateData" class="view-selector">
          <option value="annual">Vue Annuelle</option>
          <option value="monthly">Vue Mensuelle</option>
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
          <h3 class="summary-label">Production Totale</h3>
          <p class="summary-value">{{ formatPower(latestProduction?.total || 0) }}</p>
          <span class="summary-change">Année {{ latestProduction?.year || 2020 }}</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #3B82F6;">
          <Droplet :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Production Hydraulique</h3>
          <p class="summary-value">{{ formatPower(latestProduction?.hydraulic || 0) }}</p>
          <span class="summary-change">{{ hydraulicPercentage }}% du total</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #F97316;">
          <Flame :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Production Thermique</h3>
          <p class="summary-value">{{ formatPower(latestProduction?.thermal || 0) }}</p>
          <span class="summary-change">{{ thermalPercentage }}% du total</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #22C55E;">
          <TrendingUp :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Taux Renouvelable</h3>
          <p class="summary-value">{{ renewableRate }}%</p>
          <span class="summary-change">Part hydraulique</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <!-- Production Annuelle -->
      <div v-if="selectedView === 'annual'" class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de la Production Brute Annuelle</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="450"
            :options="annualProductionChartOptions"
            :series="annualProductionChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Production Mensuelle -->
      <div v-if="selectedView === 'monthly'" class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de la Production Mensuelle</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="line"
            height="450"
            :options="monthlyProductionChartOptions"
            :series="monthlyProductionChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Mix Énergétique -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Répartition du Mix Énergétique</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="donut"
            height="400"
            :options="mixChartOptions"
            :series="mixChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Puissance Installée -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de la Puissance Installée</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="bar"
            height="400"
            :options="installedPowerChartOptions"
            :series="installedPowerChartSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- Power Plants by Type -->
    <div class="plants-by-type-section">
      <div class="section-header">
        <h3 class="section-title">Centrales par Type</h3>
        <select v-model="selectedPlantType" class="plant-type-selector">
          <option value="all">Tous les types</option>
          <option value="hydraulic">Hydrauliques</option>
          <option value="thermal">Thermiques</option>
          <option value="solar">Solaires</option>
          <option value="bioenergy">Bioénergie</option>
        </select>
      </div>
      <PowerPlantsList :type="selectedPlantType" />
    </div>

    <!-- Statistics Table -->
    <div class="stats-table-card">
      <h3 class="table-title">Statistiques Détaillées de Production</h3>
      <div class="table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Année</th>
              <th>Hydraulique (GWh)</th>
              <th>Thermique (GWh)</th>
              <th>Centrales Isolées (GWh)</th>
              <th>Total (GWh)</th>
              <th>Puissance Installée (MW)</th>
              <th>Taux Renouvelable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in detailedStats" :key="stat.year">
              <td><strong>{{ stat.year }}</strong></td>
              <td>{{ formatPower(stat.hydraulic) }}</td>
              <td>{{ formatPower(stat.thermal) }}</td>
              <td>{{ formatPower(stat.isolated) }}</td>
              <td><strong>{{ formatPower(stat.total) }}</strong></td>
              <td>{{ formatPower(stat.installedPower) }}</td>
              <td>
                <span class="renewable-badge" :style="{ background: stat.renewableRate > 50 ? '#D1FAE5' : '#FEE2E2', color: stat.renewableRate > 50 ? '#065F46' : '#991B1B' }">
                  {{ stat.renewableRate }}%
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
import { Zap, Droplet, Flame, TrendingUp } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'
import { useCountryStore } from '../../../../stores/countryStore.js'
import NoDataMessage from '../NoDataMessage.vue'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry.hasData)
import PowerPlantsList from '../Centrales/PowerPlantsList.vue'

const selectedPeriod = ref('10')
const selectedView = ref('annual')
const selectedPlantType = ref('all')
const productionBruteData = ref([])
const productionMonthlyData = ref([])
const installedPowerData = ref([])
const latestProduction = ref(null)
const latestInstalled = ref(null)

const renewableRate = computed(() => {
  if (!latestProduction.value || latestProduction.value.total === 0) return 0
  return Math.round((latestProduction.value.hydraulic / latestProduction.value.total) * 100)
})

const hydraulicPercentage = computed(() => {
  if (!latestProduction.value || latestProduction.value.total === 0) return 0
  return Math.round((latestProduction.value.hydraulic / latestProduction.value.total) * 100)
})

const thermalPercentage = computed(() => {
  if (!latestProduction.value || latestProduction.value.total === 0) return 0
  return Math.round((latestProduction.value.thermal / latestProduction.value.total) * 100)
})

const annualProductionChartOptions = ref({
  chart: {
    type: 'area',
    height: 450,
    toolbar: { show: true },
    zoom: { enabled: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#8B5CF6'],
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

const annualProductionChartSeries = ref([])

const monthlyProductionChartOptions = ref({
  chart: {
    type: 'line',
    height: 450,
    toolbar: { show: true },
    zoom: { enabled: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316'],
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

const monthlyProductionChartSeries = ref([])

const mixChartOptions = ref({
  chart: { type: 'donut', height: 400 },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#8B5CF6'],
  labels: ['Hydraulique', 'Thermique', 'Centrales Isolées'],
  legend: { position: 'bottom' },
  plotOptions: {
    pie: {
      donut: { size: '70%' }
    }
  },
  tooltip: { theme: 'light' }
})

const mixChartSeries = ref([0, 0, 0])

const installedPowerChartOptions = ref({
  chart: {
    type: 'bar',
    height: 400,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316'],
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, formatter: (val) => formatPower(val) }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%'
    }
  }
})

const installedPowerChartSeries = ref([])

const detailedStats = computed(() => {
  return productionBruteData.value.map(item => {
    const installed = installedPowerData.value.find(i => i.year === item.year)
    const renewableRate = item.total > 0 
      ? Math.round((item.hydraulic / item.total) * 100)
      : 0

    return {
      year: item.year,
      hydraulic: item.hydraulic,
      thermal: item.thermal,
      isolated: item.isolated,
      total: item.total,
      installedPower: installed?.total || 0,
      renewableRate
    }
  }).reverse()
})

async function updateData() {
  const years = parseInt(selectedPeriod.value)
  const endYear = 2020
  const startYear = years === 40 ? 1980 : endYear - years + 1

  const [productionBrute, installedPower, productionMonthly] = await Promise.all([
    energyApi.getProductionBrute({ startYear, endYear }),
    energyApi.getInstalledPower({ startYear, endYear }),
    selectedView.value === 'monthly' 
      ? energyApi.getProduction({ 
          startDate: new Date(startYear, 0, 1).toISOString(),
          endDate: new Date(endYear, 11, 31).toISOString()
        })
      : Promise.resolve([])
  ])

  productionBruteData.value = productionBrute
  installedPowerData.value = installedPower
  productionMonthlyData.value = productionMonthly

  if (productionBrute.length > 0) {
    latestProduction.value = productionBrute[productionBrute.length - 1]
  }

  if (installedPower.length > 0) {
    latestInstalled.value = installedPower[installedPower.length - 1]
  }

  generateCharts()
}

function generateCharts() {
  // Production annuelle
  annualProductionChartSeries.value = [
    {
      name: 'Hydraulique',
      data: productionBruteData.value.map(d => [d.year, d.hydraulic])
    },
    {
      name: 'Thermique',
      data: productionBruteData.value.map(d => [d.year, d.thermal])
    },
    {
      name: 'Centrales Isolées',
      data: productionBruteData.value.map(d => [d.year, d.isolated])
    }
  ]

  // Production mensuelle
  if (productionMonthlyData.value.length > 0) {
    monthlyProductionChartSeries.value = [
      {
        name: 'Hydraulique',
        data: productionMonthlyData.value.map(d => [new Date(d.timestamp).getTime(), d.hydraulic])
      },
      {
        name: 'Thermique',
        data: productionMonthlyData.value.map(d => [new Date(d.timestamp).getTime(), d.thermal])
      }
    ]
  }

  // Mix énergétique
  if (latestProduction.value) {
    mixChartSeries.value = [
      latestProduction.value.hydraulic,
      latestProduction.value.thermal,
      latestProduction.value.isolated
    ]
  }

  // Puissance installée
  installedPowerChartSeries.value = [
    {
      name: 'Hydraulique',
      data: installedPowerData.value.map(d => [d.year, d.hydraulic])
    },
    {
      name: 'Thermique',
      data: installedPowerData.value.map(d => [d.year, d.thermal])
    }
  ]
}

// Surveiller les changements de pays
watch(() => countryStore.selectedCountryCode, async () => {
  if (hasData.value) {
    await updateData()
  }
})

onMounted(async () => {
  if (hasData.value) {
    await updateData()
  }
})
</script>

<style scoped>
.production-page {
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

.header-actions {
  display: flex;
  gap: 1rem;
}

.period-selector,
.view-selector {
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
  margin-bottom: 1rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.chart-container {
  margin-top: 1rem;
}

.plants-by-type-section {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.plant-type-selector {
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.95rem;
  cursor: pointer;
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

.renewable-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
