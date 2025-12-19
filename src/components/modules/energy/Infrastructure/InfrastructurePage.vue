<template>
  <div class="infrastructure-page">
    <div class="page-header">
      <h1 class="page-title">Infrastructure Électrique</h1>
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
          <Network :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Longueur Réseau</h3>
          <p class="summary-value">{{ formatLength(latestNetwork?.total || 0) }}</p>
          <span class="summary-change">Année {{ latestNetwork?.year || 2020 }}</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #F97316;">
          <Users :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Nombre d'Abonnés</h3>
          <p class="summary-value">{{ formatNumber(latestSubscribers?.total || 0) }}</p>
          <span class="summary-change">Année {{ latestSubscribers?.year || 2020 }}</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #22C55E;">
          <Home :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Électrification Rurale</h3>
          <p class="summary-value">{{ latestRural?.rate || 0 }} localités</p>
          <span class="summary-change">Année {{ latestRural?.year || 2020 }}</span>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon" style="background: #8B5CF6;">
          <TrendingUp :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Taux de Croissance</h3>
          <p class="summary-value">{{ growthRate }}%</p>
          <span class="summary-change">Abonnés (5 dernières années)</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-grid">
      <!-- Longueur Réseau -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de la Longueur du Réseau (km)</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="350"
            :options="networkChartOptions"
            :series="networkChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Abonnés -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution du Nombre d'Abonnés</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="line"
            height="350"
            :options="subscribersChartOptions"
            :series="subscribersChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Électrification Rurale -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Évolution de l'Électrification Rurale</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="bar"
            height="350"
            :options="ruralChartOptions"
            :series="ruralChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Répartition Réseau -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Répartition du Réseau par Tension</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="donut"
            height="350"
            :options="networkDistributionOptions"
            :series="networkDistributionSeries"
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
              <th>Réseau BT (km)</th>
              <th>Réseau MT (km)</th>
              <th>Réseau HT (km)</th>
              <th>Total Réseau (km)</th>
              <th>Abonnés BT</th>
              <th>Abonnés HT/MT</th>
              <th>Total Abonnés</th>
              <th>Loc. Électrifiées</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in detailedStats" :key="stat.year">
              <td><strong>{{ stat.year }}</strong></td>
              <td>{{ formatLength(stat.networkBt) }}</td>
              <td>{{ formatLength(stat.networkMt) }}</td>
              <td>{{ formatLength(stat.networkHt) }}</td>
              <td><strong>{{ formatLength(stat.networkTotal) }}</strong></td>
              <td>{{ formatNumber(stat.subscribersBt) }}</td>
              <td>{{ formatNumber(stat.subscribersHtmt) }}</td>
              <td><strong>{{ formatNumber(stat.subscribersTotal) }}</strong></td>
              <td>{{ stat.ruralElectrification || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Network, Users, Home, TrendingUp } from 'lucide-vue-next'
import { energyApi } from '../../../../api/energyApi.js'
import { useCountryStore } from '../../../../stores/countryStore.js'
import NoDataMessage from '../NoDataMessage.vue'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry.hasData)

const selectedPeriod = ref('10')
const networkData = ref([])
const subscribersData = ref([])
const ruralData = ref([])
const latestNetwork = ref(null)
const latestSubscribers = ref(null)
const latestRural = ref(null)
const growthRate = ref(0)

const networkChartOptions = ref({
  chart: {
    type: 'area',
    height: 350,
    toolbar: { show: true }
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
    labels: { style: { colors: '#6B7280' }, title: { text: 'km', style: { color: '#6B7280' } } }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const networkChartSeries = ref([])

const subscribersChartOptions = ref({
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#F97316', '#3B82F6', '#22C55E'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, title: { text: 'Abonnés', style: { color: '#6B7280' } } }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const subscribersChartSeries = ref([])

const ruralChartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#22C55E'],
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, title: { text: 'Localités', style: { color: '#6B7280' } } }
  },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const ruralChartSeries = ref([])

const networkDistributionOptions = ref({
  chart: { type: 'donut', height: 350 },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#8B5CF6'],
  labels: ['Basse Tension (BT)', 'Moyenne Tension (MT)', 'Haute Tension (HT)'],
  legend: { position: 'bottom' },
  plotOptions: {
    pie: {
      donut: { size: '70%' }
    }
  },
  tooltip: { theme: 'light' }
})

const networkDistributionSeries = ref([0, 0, 0])

const detailedStats = computed(() => {
  const stats = []
  const maxYear = Math.max(
    ...networkData.value.map(n => n.year),
    ...subscribersData.value.map(s => s.year),
    ...ruralData.value.map(r => r.year)
  )
  const minYear = Math.min(
    ...networkData.value.map(n => n.year),
    ...subscribersData.value.map(s => s.year),
    ...ruralData.value.map(r => r.year)
  )

  for (let year = minYear; year <= maxYear; year++) {
    const network = networkData.value.find(n => n.year === year)
    const subscribers = subscribersData.value.find(s => s.year === year)
    const rural = ruralData.value.find(r => r.year === year)

    if (network || subscribers || rural) {
      stats.push({
        year,
        networkBt: network?.bt || 0,
        networkMt: network?.mt || 0,
        networkHt: network?.ht || 0,
        networkTotal: network?.total || 0,
        subscribersBt: subscribers?.bt || 0,
        subscribersHtmt: subscribers?.htmt || 0,
        subscribersTotal: subscribers?.total || 0,
        ruralElectrification: rural?.rate || null
      })
    }
  }

  return stats.reverse()
})

function formatLength(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k km`
  }
  return `${Math.round(value)} km`
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

async function updateData() {
  const years = parseInt(selectedPeriod.value)
  const endYear = 2020
  const startYear = years === 60 ? 1960 : endYear - years + 1

  const [network, subscribers, rural] = await Promise.all([
    energyApi.getNetworkLength({ startYear, endYear }),
    energyApi.getSubscribers({ startYear, endYear }),
    energyApi.getRuralElectrification({ startYear, endYear })
  ])

  networkData.value = network
  subscribersData.value = subscribers
  ruralData.value = rural

  if (network.length > 0) {
    latestNetwork.value = network[network.length - 1]
  }

  if (subscribers.length > 0) {
    latestSubscribers.value = subscribers[subscribers.length - 1]
    
    // Calculer le taux de croissance
    if (subscribers.length >= 5) {
      const recent = subscribers[subscribers.length - 1]
      const previous = subscribers[subscribers.length - 5]
      growthRate.value = previous.total > 0
        ? ((recent.total - previous.total) / previous.total * 100)
        : 0
    }
  }

  if (rural.length > 0) {
    latestRural.value = rural[rural.length - 1]
  }

  generateCharts()
}

function generateCharts() {
  // Réseau
  networkChartSeries.value = [
    {
      name: 'BT',
      data: networkData.value.map(d => [d.year, d.bt])
    },
    {
      name: 'MT',
      data: networkData.value.map(d => [d.year, d.mt])
    },
    {
      name: 'HT',
      data: networkData.value.map(d => [d.year, d.ht])
    }
  ]

  // Abonnés
  subscribersChartSeries.value = [
    {
      name: 'BT',
      data: subscribersData.value.map(d => [d.year, d.bt])
    },
    {
      name: 'HT/MT',
      data: subscribersData.value.map(d => [d.year, d.htmt])
    },
    {
      name: 'Total',
      data: subscribersData.value.map(d => [d.year, d.total])
    }
  ]

  // Électrification rurale
  ruralChartSeries.value = [{
    name: 'Localités Électrifiées',
    data: ruralData.value.map(d => [d.year, d.rate])
  }]

  // Distribution réseau
  if (latestNetwork.value) {
    networkDistributionSeries.value = [
      latestNetwork.value.bt,
      latestNetwork.value.mt,
      latestNetwork.value.ht
    ]
  }
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
.infrastructure-page {
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

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
