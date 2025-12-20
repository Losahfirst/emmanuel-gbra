<template>
  <div class="centrales-page">
    <div class="page-header">
      <h1 class="page-title">Centrales Électriques - {{ countryStore.selectedCountry.name }}</h1>
    </div>
    
    <!-- Afficher les centrales même si hasData est false -->
    <PowerPlantsList v-if="countryPlants.length > 0" :plants="countryPlants" />
    
    <NoDataMessage v-else-if="!hasData && countryPlants.length === 0" />
    
    <template v-if="hasData">
      <div class="header-actions" style="margin-bottom: 2rem;">
        <select v-model="selectedPeriod" @change="updateData" class="period-selector">
          <option value="5">5 dernières années</option>
          <option value="10">10 dernières années</option>
          <option value="20">Toutes les données</option>
        </select>
      </div>

      <!-- Summary Cards -->
      <div class="summary-grid">
      <div class="summary-card" style="border-left: 4px solid #3B82F6;">
        <div class="summary-icon" style="background: #3B82F6;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">AZITO</h3>
          <p class="summary-value">{{ formatPower(latestAzito?.production || 0) }}</p>
          <span class="summary-change">{{ latestAzito?.contribution || 0 }}% contribution</span>
        </div>
      </div>

      <div class="summary-card" style="border-left: 4px solid #F97316;">
        <div class="summary-icon" style="background: #F97316;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">CIPREL</h3>
          <p class="summary-value">{{ formatPower(latestCiprel?.production || 0) }}</p>
          <span class="summary-change">{{ latestCiprel?.contribution || 0 }}% contribution</span>
        </div>
      </div>

      <div class="summary-card" style="border-left: 4px solid #22C55E;">
        <div class="summary-icon" style="background: #22C55E;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">AGGREKO</h3>
          <p class="summary-value">{{ formatPower(latestAggreko?.production || 0) }}</p>
          <span class="summary-change">{{ latestAggreko?.contribution || 0 }}% contribution</span>
        </div>
      </div>

      <div class="summary-card" style="border-left: 4px solid #8B5CF6;">
        <div class="summary-icon" style="background: #8B5CF6;">
          <Activity :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">Disponibilité Moyenne</h3>
          <p class="summary-value">{{ avgAvailability }}%</p>
          <span class="summary-change">Toutes centrales</span>
        </div>
      </div>
    </div>

      <!-- Comparison Chart -->
      <div class="chart-card">
      <div class="chart-header">
        <h3 class="chart-title">Comparaison de Production par Centrale</h3>
      </div>
      <div class="chart-container">
        <apexchart
          type="area"
          height="450"
          :options="comparisonChartOptions"
          :series="comparisonChartSeries"
        ></apexchart>
        </div>
      </div>

      <!-- Availability Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Disponibilité des Centrales</h3>
        </div>
        <div class="chart-container">
        <apexchart
          type="line"
          height="400"
          :options="availabilityChartOptions"
          :series="availabilityChartSeries"
        ></apexchart>
      </div>
      </div>

      <!-- Contribution Chart -->
      <div class="chart-card">
      <div class="chart-header">
        <h3 class="chart-title">Contribution à la Production Nationale</h3>
      </div>
      <div class="chart-container">
        <apexchart
          type="bar"
          height="400"
          :options="contributionChartOptions"
          :series="contributionChartSeries"
        ></apexchart>
        </div>
      </div>

      <!-- Power Plants List -->
      <div class="plants-list-section">
        <PowerPlantsList :plants="countryPlants" />
      </div>

      <!-- Comparison Table -->
      <div class="stats-table-card">
        <h3 class="table-title">Comparaison Détaillée</h3>
        <div class="table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Centrale</th>
              <th>Production Totale (GWh)</th>
              <th>Production Moyenne (GWh)</th>
              <th>Production Max (GWh)</th>
              <th>Contribution Moyenne (%)</th>
              <th>Disponibilité Moyenne (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>AZITO</strong></td>
              <td>{{ formatPower(comparisonData.production?.azito?.total || 0) }}</td>
              <td>{{ formatPower(comparisonData.production?.azito?.average || 0) }}</td>
              <td>{{ formatPower(comparisonData.production?.azito?.max || 0) }}</td>
              <td>{{ comparisonData.production?.azito?.avgContribution?.toFixed(1) || 0 }}%</td>
              <td>{{ comparisonData.availability?.azito?.average?.toFixed(1) || 0 }}%</td>
            </tr>
            <tr>
              <td><strong>CIPREL</strong></td>
              <td>{{ formatPower(comparisonData.production?.ciprel?.total || 0) }}</td>
              <td>{{ formatPower(comparisonData.production?.ciprel?.average || 0) }}</td>
              <td>{{ formatPower(comparisonData.production?.ciprel?.max || 0) }}</td>
              <td>{{ comparisonData.production?.ciprel?.avgContribution?.toFixed(1) || 0 }}%</td>
              <td>{{ comparisonData.availability?.ciprel?.average?.toFixed(1) || 0 }}%</td>
            </tr>
            <tr>
              <td><strong>AGGREKO</strong></td>
              <td>{{ formatPower(comparisonData.production?.aggreko?.total || 0) }}</td>
              <td>{{ formatPower(comparisonData.production?.aggreko?.average || 0) }}</td>
              <td>{{ formatPower(comparisonData.production?.aggreko?.max || 0) }}</td>
              <td>{{ comparisonData.production?.aggreko?.avgContribution?.toFixed(1) || 0 }}%</td>
              <td>{{ comparisonData.availability?.aggreko?.average?.toFixed(1) || 0 }}%</td>
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
import { Zap, Activity } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'
import { useCountryStore } from '../../../../stores/countryStore.js'
import PowerPlantsList from './PowerPlantsList.vue'
import NoDataMessage from '../NoDataMessage.vue'
import { getPowerPlantsByCountry } from '../../../../data/powerPlantsData.js'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry.hasData)
const countryPlants = computed(() => {
  return getPowerPlantsByCountry(countryStore.selectedCountryCode)
})

const selectedPeriod = ref('10')
const azitoData = ref([])
const ciprelData = ref([])
const aggrekoData = ref([])
const azitoAvailability = ref([])
const ciprelAvailability = ref([])
const aggrekoAvailability = ref([])
const latestAzito = ref(null)
const latestCiprel = ref(null)
const latestAggreko = ref(null)
const comparisonData = ref({ production: {}, availability: {} })

const avgAvailability = computed(() => {
  const azitoAvg = comparisonData.value.availability?.azito?.average || 0
  const ciprelAvg = comparisonData.value.availability?.ciprel?.average || 0
  const aggrekoAvg = comparisonData.value.availability?.aggreko?.average || 0
  return ((azitoAvg + ciprelAvg + aggrekoAvg) / 3).toFixed(1)
})

const comparisonChartOptions = ref({
  chart: {
    type: 'area',
    height: 450,
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

const comparisonChartSeries = ref([])

const availabilityChartOptions = ref({
  chart: {
    type: 'line',
    height: 400,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#22C55E'],
  stroke: { width: 3, curve: 'smooth' },
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, title: { text: 'Disponibilité (%)', style: { color: '#6B7280' } } },
    min: 0,
    max: 100
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const availabilityChartSeries = ref([])

const contributionChartOptions = ref({
  chart: {
    type: 'bar',
    height: 400,
    toolbar: { show: true }
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#22C55E'],
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' }, title: { text: 'Contribution (%)', style: { color: '#6B7280' } } }
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

const contributionChartSeries = ref([])

async function updateData() {
  const years = parseInt(selectedPeriod.value)
  const endYear = 2020
  const startYear = years === 20 ? 2000 : endYear - years + 1

  const [azito, ciprel, aggreko, azitoAvail, ciprelAvail, aggrekoAvail, comparison] = await Promise.all([
    energyApi.getCentralesProduction({ centrale: 'azito', startYear, endYear }),
    energyApi.getCentralesProduction({ centrale: 'ciprel', startYear, endYear }),
    energyApi.getCentralesProduction({ centrale: 'aggreko', startYear, endYear }),
    energyApi.getCentralesAvailability({ centrale: 'azito', startYear, endYear }),
    energyApi.getCentralesAvailability({ centrale: 'ciprel', startYear, endYear }),
    energyApi.getCentralesAvailability({ centrale: 'aggreko', startYear, endYear }),
    energyApi.getCentralesComparison({ startYear, endYear })
  ])

  azitoData.value = azito
  ciprelData.value = ciprel
  aggrekoData.value = aggreko
  azitoAvailability.value = azitoAvail
  ciprelAvailability.value = ciprelAvail
  aggrekoAvailability.value = aggrekoAvail
  comparisonData.value = comparison

  if (azito.length > 0) latestAzito.value = azito[azito.length - 1]
  if (ciprel.length > 0) latestCiprel.value = ciprel[ciprel.length - 1]
  if (aggreko.length > 0) latestAggreko.value = aggreko[aggreko.length - 1]

  generateCharts()
}

function generateCharts() {
  // Comparison
  comparisonChartSeries.value = [
    {
      name: 'AZITO',
      data: azitoData.value.map(d => [d.year, d.production])
    },
    {
      name: 'CIPREL',
      data: ciprelData.value.map(d => [d.year, d.production])
    },
    {
      name: 'AGGREKO',
      data: aggrekoData.value.map(d => [d.year, d.production])
    }
  ]

  // Availability
  availabilityChartSeries.value = [
    {
      name: 'AZITO',
      data: azitoAvailability.value.map(d => [d.year, d.availability])
    },
    {
      name: 'CIPREL',
      data: ciprelAvailability.value.map(d => [d.year, d.availability])
    },
    {
      name: 'AGGREKO',
      data: aggrekoAvailability.value.map(d => [d.year, d.availability])
    }
  ]

  // Contribution
  const years = [...new Set([...azitoData.value, ...ciprelData.value, ...aggrekoData.value].map(d => d.year))].sort()
  contributionChartSeries.value = [
    {
      name: 'AZITO',
      data: years.map(year => {
        const data = azitoData.value.find(d => d.year === year)
        return data ? data.contribution : 0
      })
    },
    {
      name: 'CIPREL',
      data: years.map(year => {
        const data = ciprelData.value.find(d => d.year === year)
        return data ? data.contribution : 0
      })
    },
    {
      name: 'AGGREKO',
      data: years.map(year => {
        const data = aggrekoData.value.find(d => d.year === year)
        return data ? data.contribution : 0
      })
    }
  ]

  contributionChartOptions.value.xaxis.categories = years
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
.centrales-page {
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

.chart-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
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

.plants-list-section {
  margin-bottom: 2rem;
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
  .centrales-page {
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
  
  .stats-table-card {
    padding: 1rem;
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
  .centrales-page {
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
  
  .stats-table-card {
    padding: 0.75rem;
  }
}
</style>
