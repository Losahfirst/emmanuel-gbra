<template>
  <div class="centrales-page">
    <div class="page-header">
      <h1 class="page-title">Comparaison des Centrales</h1>
      <div class="header-actions">
        <select v-model="selectedPeriod" @change="updateData" class="period-selector">
          <option value="5">5 dernières années</option>
          <option value="10">10 dernières années</option>
          <option value="20">Toutes les données</option>
        </select>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card azito">
        <div class="summary-icon" style="background: #3B82F6;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">AZITO ENERGIE</h3>
          <p class="summary-value">{{ formatPower(comparisonData?.production?.azito?.average || 0) }}</p>
          <span class="summary-change">Moyenne annuelle</span>
          <div class="summary-stats">
            <span>Disponibilité: {{ azitoAvailabilityAvg }}%</span>
            <span>Contribution: {{ azitoContribution }}%</span>
          </div>
        </div>
      </div>

      <div class="summary-card ciprel">
        <div class="summary-icon" style="background: #F97316;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">CIPREL</h3>
          <p class="summary-value">{{ formatPower(comparisonData?.production?.ciprel?.average || 0) }}</p>
          <span class="summary-change">Moyenne annuelle</span>
          <div class="summary-stats">
            <span>Disponibilité: {{ ciprelAvailabilityAvg }}%</span>
            <span>Contribution: {{ ciprelContribution }}%</span>
          </div>
        </div>
      </div>

      <div class="summary-card aggreko">
        <div class="summary-icon" style="background: #22C55E;">
          <Zap :size="24" />
        </div>
        <div class="summary-content">
          <h3 class="summary-label">AGGREKO</h3>
          <p class="summary-value">{{ formatPower(comparisonData?.production?.aggreko?.average || 0) }}</p>
          <span class="summary-change">Moyenne annuelle</span>
          <div class="summary-stats">
            <span>Contribution: {{ aggrekoContribution }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Charts -->
    <div class="charts-section">
      <!-- Production Comparison -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Comparaison de Production (GWh)</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="line"
            height="400"
            :options="productionComparisonOptions"
            :series="productionComparisonSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Contribution Comparison -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Contribution à la Production Nationale (%)</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="area"
            height="400"
            :options="contributionOptions"
            :series="contributionSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Availability Comparison -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Disponibilité des Centrales (%)</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="bar"
            height="400"
            :options="availabilityOptions"
            :series="availabilitySeries"
          ></apexchart>
        </div>
      </div>

      <!-- Performance Radar -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Performance Comparative</h3>
        </div>
        <div class="chart-container">
          <apexchart
            type="radar"
            height="400"
            :options="radarOptions"
            :series="radarSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- Detailed Comparison Table -->
    <div class="comparison-table-card">
      <h3 class="table-title">Tableau Comparatif Détaillé</h3>
      <div class="table-container">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Année</th>
              <th>AZITO (GWh)</th>
              <th>AZITO Cont. (%)</th>
              <th>AZITO Disp. (%)</th>
              <th>CIPREL (GWh)</th>
              <th>CIPREL Cont. (%)</th>
              <th>CIPREL Disp. (%)</th>
              <th>AGGREKO (GWh)</th>
              <th>AGGREKO Cont. (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in detailedComparison" :key="row.year">
              <td><strong>{{ row.year }}</strong></td>
              <td>{{ formatPower(row.azitoProd) }}</td>
              <td>{{ row.azitoCont.toFixed(1) }}%</td>
              <td>{{ row.azitoAvail ? row.azitoAvail.toFixed(1) + '%' : '-' }}</td>
              <td>{{ formatPower(row.ciprelProd) }}</td>
              <td>{{ row.ciprelCont.toFixed(1) }}%</td>
              <td>{{ row.ciprelAvail ? row.ciprelAvail.toFixed(1) + '%' : '-' }}</td>
              <td>{{ formatPower(row.aggrekoProd) }}</td>
              <td>{{ row.aggrekoCont.toFixed(1) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Zap } from 'lucide-vue-next'
import { formatPower } from '../../../../utils/formatters.js'
import { energyApi } from '../../../../api/energyApi.js'

const selectedPeriod = ref('10')
const comparisonData = ref(null)
const azitoProduction = ref([])
const ciprelProduction = ref([])
const aggrekoProduction = ref([])
const azitoAvailabilityData = ref([])
const ciprelAvailabilityData = ref([])

const azitoAvailabilityAvg = computed(() => {
  if (azitoAvailabilityData.value.length === 0) return 0
  const sum = azitoAvailabilityData.value.reduce((acc, d) => acc + d.availability, 0)
  return Math.round((sum / azitoAvailabilityData.value.length) * 10) / 10
})

const ciprelAvailabilityAvg = computed(() => {
  if (ciprelAvailabilityData.value.length === 0) return 0
  const sum = ciprelAvailabilityData.value.reduce((acc, d) => acc + d.availability, 0)
  return Math.round((sum / ciprelAvailabilityData.value.length) * 10) / 10
})

const azitoContribution = computed(() => {
  if (azitoProduction.value.length === 0) return 0
  const sum = azitoProduction.value.reduce((acc, d) => acc + d.contribution, 0)
  return Math.round((sum / azitoProduction.value.length) * 10) / 10
})

const ciprelContribution = computed(() => {
  if (ciprelProduction.value.length === 0) return 0
  const sum = ciprelProduction.value.reduce((acc, d) => acc + d.contribution, 0)
  return Math.round((sum / ciprelProduction.value.length) * 10) / 10
})

const aggrekoContribution = computed(() => {
  if (aggrekoProduction.value.length === 0) return 0
  const sum = aggrekoProduction.value.reduce((acc, d) => acc + d.contribution, 0)
  return Math.round((sum / aggrekoProduction.value.length) * 10) / 10
})

const detailedComparison = computed(() => {
  const years = new Set()
  azitoProduction.value.forEach(d => years.add(d.year))
  ciprelProduction.value.forEach(d => years.add(d.year))
  aggrekoProduction.value.forEach(d => years.add(d.year))

  return Array.from(years).sort((a, b) => b - a).map(year => {
    const azito = azitoProduction.value.find(d => d.year === year)
    const ciprel = ciprelProduction.value.find(d => d.year === year)
    const aggreko = aggrekoProduction.value.find(d => d.year === year)
      const azitoAvail = azitoAvailabilityData.value.find(d => d.year === year)
      const ciprelAvail = ciprelAvailabilityData.value.find(d => d.year === year)

    return {
      year,
      azitoProd: azito?.production || 0,
      azitoCont: azito?.contribution || 0,
      azitoAvail: azitoAvail?.availability,
      ciprelProd: ciprel?.production || 0,
      ciprelCont: ciprel?.contribution || 0,
      ciprelAvail: ciprelAvail?.availability,
      aggrekoProd: aggreko?.production || 0,
      aggrekoCont: aggreko?.contribution || 0
    }
  })
})

const productionComparisonOptions = ref({
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
    labels: { style: { colors: '#6B7280' }, title: { text: 'GWh', style: { color: '#6B7280' } } }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const productionComparisonSeries = ref([])

const contributionOptions = ref({
  chart: {
    type: 'area',
    height: 400,
    toolbar: { show: true }
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
    labels: { style: { colors: '#6B7280' }, title: { text: '%', style: { color: '#6B7280' } } }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' }
})

const contributionSeries = ref([])

const availabilityOptions = ref({
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
    labels: { style: { colors: '#6B7280' }, title: { text: '%', style: { color: '#6B7280' } }, max: 100 }
  },
  legend: { show: true, position: 'top' },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      dataLabels: { position: 'top' }
    }
  }
})

const availabilitySeries = ref([])

const radarOptions = ref({
  chart: {
    type: 'radar',
    height: 400
  },
  theme: { mode: 'light' },
  colors: ['#3B82F6', '#F97316', '#22C55E'],
  xaxis: {
    categories: ['Production Moyenne', 'Contribution', 'Disponibilité', 'Performance']
  },
  yaxis: {
    show: false
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: '#E5E7EB',
        fill: {
          colors: ['#F9FAFB', '#FFFFFF']
        }
      }
    }
  }
})

const radarSeries = ref([])

async function updateData() {
  const years = parseInt(selectedPeriod.value)
  const endYear = 2020
  const startYear = years === 20 ? 2000 : endYear - years + 1

  const [production, availability, comparison] = await Promise.all([
    energyApi.getCentralesProduction({ startYear, endYear }),
    energyApi.getCentralesAvailability({ startYear, endYear }),
    energyApi.getCentralesComparison({ startYear, endYear })
  ])

  azitoProduction.value = production.azito || []
  ciprelProduction.value = production.ciprel || []
  aggrekoProduction.value = production.aggreko || []
  azitoAvailability.value = availability.azito || []
  ciprelAvailability.value = availability.ciprel || []
  comparisonData.value = comparison

  generateCharts()
}

function generateCharts() {
  // Production comparison
  productionComparisonSeries.value = [
    {
      name: 'AZITO',
      data: azitoProduction.value.map(d => [d.year, d.production])
    },
    {
      name: 'CIPREL',
      data: ciprelProduction.value.map(d => [d.year, d.production])
    },
    {
      name: 'AGGREKO',
      data: aggrekoProduction.value.map(d => [d.year, d.production])
    }
  ]

  // Contribution
  contributionSeries.value = [
    {
      name: 'AZITO',
      data: azitoProduction.value.map(d => [d.year, d.contribution])
    },
    {
      name: 'CIPREL',
      data: ciprelProduction.value.map(d => [d.year, d.contribution])
    },
    {
      name: 'AGGREKO',
      data: aggrekoProduction.value.map(d => [d.year, d.contribution])
    }
  ]

  // Availability
  availabilitySeries.value = [
    {
      name: 'AZITO',
      data: azitoAvailabilityData.value.map(d => [d.year, d.availability])
    },
    {
      name: 'CIPREL',
      data: ciprelAvailabilityData.value.map(d => [d.year, d.availability])
    }
  ]

  // Radar chart
  if (comparisonData.value) {
    const azitoProd = comparisonData.value.production.azito.average / 3500 * 100
    const ciprelProd = comparisonData.value.production.ciprel.average / 3500 * 100
    const aggrekoProd = comparisonData.value.production.aggreko.average / 3500 * 100

    radarSeries.value = [
      {
        name: 'AZITO',
        data: [
          Math.min(azitoProd, 100),
          comparisonData.value.production.azito.avgContribution,
          comparisonData.value.availability.azito.average,
          (comparisonData.value.production.azito.avgContribution + comparisonData.value.availability.azito.average) / 2
        ]
      },
      {
        name: 'CIPREL',
        data: [
          Math.min(ciprelProd, 100),
          comparisonData.value.production.ciprel.avgContribution,
          comparisonData.value.availability.ciprel.average,
          (comparisonData.value.production.ciprel.avgContribution + comparisonData.value.availability.ciprel.average) / 2
        ]
      },
      {
        name: 'AGGREKO',
        data: [
          Math.min(aggrekoProd, 100),
          comparisonData.value.production.aggreko.avgContribution,
          0,
          comparisonData.value.production.aggreko.avgContribution
        ]
      }
    ]
  }
}

onMounted(async () => {
  await updateData()
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.summary-card.azito {
  border-left: 4px solid #3B82F6;
}

.summary-card.ciprel {
  border-left: 4px solid #F97316;
}

.summary-card.aggreko {
  border-left: 4px solid #22C55E;
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
  font-weight: 600;
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
  display: block;
  margin-bottom: 0.5rem;
}

.summary-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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

.comparison-table-card {
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

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.comparison-table th {
  text-align: left;
  padding: 0.75rem;
  font-weight: 600;
  color: #6B7280;
  border-bottom: 2px solid #E5E7EB;
  background: #F9FAFB;
}

.comparison-table td {
  padding: 0.75rem;
  color: #1A1A1A;
  border-bottom: 1px solid #F3F4F6;
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
