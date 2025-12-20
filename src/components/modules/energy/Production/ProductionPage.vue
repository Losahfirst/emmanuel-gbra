<template>
  <div class="production-page">
    <!-- Loading State -->
    <div v-if="!countryStore.selectedCountry" class="loading-state">
      <p>Chargement...</p>
    </div>
    
    <!-- No Data Message -->
    <NoDataMessage v-else-if="!hasData" />
    
    <!-- Main Content -->
    <template v-else>
    <div class="page-header">
      <h1 class="page-title">Production Énergétique - {{ countryStore.selectedCountry?.name || 'Chargement...' }}</h1>
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
          <p class="summary-value">{{ latestProduction ? formatPower(latestProduction.total || 0) : '0 MW' }}</p>
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
          <p class="summary-value">{{ latestProduction ? formatPower(latestProduction.thermal || 0) : '0 MW' }}</p>
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
      <PowerPlantsList :plants="countryPlants" :type="selectedPlantType" />
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
import { getPowerPlantsByCountry } from '../../../../data/powerPlantsData.js'
import NoDataMessage from '../NoDataMessage.vue'
import PowerPlantsList from '../Centrales/PowerPlantsList.vue'

const countryStore = useCountryStore()

// S'assurer que le store est initialisé immédiatement
if (!countryStore.selectedCountryCode) {
  countryStore.resetToDefault()
}

const hasData = computed(() => {
  try {
    const country = countryStore.selectedCountry
    if (!country) return false
    return country.hasData === true
  } catch (error) {
    console.error('Erreur dans hasData computed:', error)
    return false
  }
})

const selectedPeriod = ref('10')
const selectedView = ref('annual')
const selectedPlantType = ref('all')
const productionBruteData = ref([])
const productionMonthlyData = ref([])
const installedPowerData = ref([])
const latestProduction = ref(null)
const latestInstalled = ref(null)

// Centrales du pays sélectionné
const countryPlants = computed(() => {
  if (!countryStore.selectedCountryCode) return []
  return getPowerPlantsByCountry(countryStore.selectedCountryCode) || []
})

const renewableRate = computed(() => {
  try {
    if (!latestProduction.value || !latestProduction.value.total || latestProduction.value.total === 0) return 0
    const hydraulic = latestProduction.value.hydraulic || 0
    return Math.round((hydraulic / latestProduction.value.total) * 100)
  } catch (error) {
    console.error('Erreur dans renewableRate:', error)
    return 0
  }
})

const hydraulicPercentage = computed(() => {
  try {
    if (!latestProduction.value || !latestProduction.value.total || latestProduction.value.total === 0) return 0
    const hydraulic = latestProduction.value.hydraulic || 0
    return Math.round((hydraulic / latestProduction.value.total) * 100)
  } catch (error) {
    console.error('Erreur dans hydraulicPercentage:', error)
    return 0
  }
})

const thermalPercentage = computed(() => {
  try {
    if (!latestProduction.value || !latestProduction.value.total || latestProduction.value.total === 0) return 0
    const thermal = latestProduction.value.thermal || 0
    return Math.round((thermal / latestProduction.value.total) * 100)
  } catch (error) {
    console.error('Erreur dans thermalPercentage:', error)
    return 0
  }
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

const annualProductionChartSeries = ref([{ name: 'Hydraulique', data: [] }, { name: 'Thermique', data: [] }, { name: 'Centrales Isolées', data: [] }])

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

const installedPowerChartSeries = ref([{ name: 'Hydraulique', data: [] }, { name: 'Thermique', data: [] }])

const detailedStats = computed(() => {
  try {
    if (!productionBruteData.value || !Array.isArray(productionBruteData.value)) {
      return []
    }
    
    return productionBruteData.value.map(item => {
      try {
        const installed = installedPowerData.value?.find(i => i?.year === item?.year)
        const total = item?.total || 0
        const hydraulic = item?.hydraulic || 0
        const renewableRate = total > 0 
          ? Math.round((hydraulic / total) * 100)
          : 0

        return {
          year: item?.year || 0,
          hydraulic: hydraulic,
          thermal: item?.thermal || 0,
          isolated: item?.isolated || 0,
          total: total,
          installedPower: installed?.total || 0,
          renewableRate
        }
      } catch (error) {
        console.error('Erreur dans detailedStats map:', error)
        return {
          year: 0,
          hydraulic: 0,
          thermal: 0,
          isolated: 0,
          total: 0,
          installedPower: 0,
          renewableRate: 0
        }
      }
    }).reverse()
  } catch (error) {
    console.error('Erreur dans detailedStats computed:', error)
    return []
  }
})

async function updateData() {
  try {
    const years = parseInt(selectedPeriod.value) || 10
    const endYear = 2020
    const startYear = years === 40 ? 1980 : endYear - years + 1

    // Utiliser Promise.allSettled pour éviter qu'une erreur bloque tout
    const results = await Promise.allSettled([
      energyApi.getProductionBrute({ startYear, endYear }).catch(e => {
        console.error('Erreur getProductionBrute:', e)
        return []
      }),
      energyApi.getInstalledPower({ startYear, endYear }).catch(e => {
        console.error('Erreur getInstalledPower:', e)
        return []
      }),
      selectedView.value === 'monthly' 
        ? energyApi.getProduction({ 
            startDate: new Date(startYear, 0, 1).toISOString(),
            endDate: new Date(endYear, 11, 31).toISOString()
          }).catch(e => {
            console.error('Erreur getProduction:', e)
            return []
          })
        : Promise.resolve([])
    ])

    const productionBrute = results[0].status === 'fulfilled' ? results[0].value : []
    const installedPower = results[1].status === 'fulfilled' ? results[1].value : []
    const productionMonthly = results[2].status === 'fulfilled' ? results[2].value : []

    productionBruteData.value = productionBrute || []
    installedPowerData.value = installedPower || []
    productionMonthlyData.value = productionMonthly || []

    if (productionBrute && productionBrute.length > 0) {
      latestProduction.value = productionBrute[productionBrute.length - 1]
    }

    if (installedPower && installedPower.length > 0) {
      latestInstalled.value = installedPower[installedPower.length - 1]
    }

    // Générer les graphiques seulement si on a des données
    if (productionBruteData.value.length > 0 || installedPowerData.value.length > 0) {
      generateCharts()
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données:', error)
    // Initialiser avec des valeurs par défaut pour éviter les erreurs
    productionBruteData.value = []
    installedPowerData.value = []
    productionMonthlyData.value = []
    // Générer des graphiques vides pour éviter les erreurs
    generateCharts()
  }
}

function generateCharts() {
  try {
    // Production annuelle
    if (productionBruteData.value && Array.isArray(productionBruteData.value) && productionBruteData.value.length > 0) {
      annualProductionChartSeries.value = [
        {
          name: 'Hydraulique',
          data: productionBruteData.value.map(d => [d.year || 0, d.hydraulic || 0])
        },
        {
          name: 'Thermique',
          data: productionBruteData.value.map(d => [d.year || 0, d.thermal || 0])
        },
        {
          name: 'Centrales Isolées',
          data: productionBruteData.value.map(d => [d.year || 0, d.isolated || 0])
        }
      ]
    } else {
      annualProductionChartSeries.value = []
    }

    // Production mensuelle
    if (productionMonthlyData.value && Array.isArray(productionMonthlyData.value) && productionMonthlyData.value.length > 0) {
      monthlyProductionChartSeries.value = [
        {
          name: 'Hydraulique',
          data: productionMonthlyData.value.map(d => {
            try {
              return [new Date(d.timestamp).getTime(), d.hydraulic || 0]
            } catch {
              return [0, 0]
            }
          })
        },
        {
          name: 'Thermique',
          data: productionMonthlyData.value.map(d => {
            try {
              return [new Date(d.timestamp).getTime(), d.thermal || 0]
            } catch {
              return [0, 0]
            }
          })
        }
      ]
    } else {
      monthlyProductionChartSeries.value = []
    }

    // Mix énergétique
    if (latestProduction.value) {
      mixChartSeries.value = [
        latestProduction.value.hydraulic || 0,
        latestProduction.value.thermal || 0,
        latestProduction.value.isolated || 0
      ]
    } else {
      mixChartSeries.value = [0, 0, 0]
    }

    // Puissance installée
    if (installedPowerData.value && Array.isArray(installedPowerData.value) && installedPowerData.value.length > 0) {
      installedPowerChartSeries.value = [
        {
          name: 'Hydraulique',
          data: installedPowerData.value.map(d => [d.year || 0, d.hydraulic || 0])
        },
        {
          name: 'Thermique',
          data: installedPowerData.value.map(d => [d.year || 0, d.thermal || 0])
        }
      ]
    } else {
      installedPowerChartSeries.value = []
    }
  } catch (error) {
    console.error('Erreur lors de la génération des graphiques:', error)
    // Initialiser avec des valeurs par défaut pour éviter les erreurs
    annualProductionChartSeries.value = []
    monthlyProductionChartSeries.value = []
    mixChartSeries.value = [0, 0, 0]
    installedPowerChartSeries.value = []
  }
}

// Surveiller les changements de pays
watch(() => countryStore.selectedCountryCode, async () => {
  try {
    if (hasData.value) {
      await updateData()
    } else {
      // Réinitialiser les données si on change de pays sans données
      productionBruteData.value = []
      installedPowerData.value = []
      productionMonthlyData.value = []
      latestProduction.value = null
      latestInstalled.value = null
      generateCharts()
    }
  } catch (error) {
    console.error('Erreur dans watch countryStore:', error)
    generateCharts()
  }
})

onMounted(async () => {
  try {
    // S'assurer que le store est initialisé
    if (!countryStore.selectedCountryCode) {
      countryStore.resetToDefault()
    }
    
    // Attendre que Vue ait mis à jour les computed properties
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Toujours initialiser les graphiques d'abord pour éviter les erreurs de rendu
    generateCharts()
    
    // Ensuite charger les données si disponibles
    if (hasData.value) {
      try {
        await updateData()
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        // En cas d'erreur, les graphiques sont déjà initialisés avec des valeurs vides
      }
    }
  } catch (error) {
    console.error('Erreur fatale dans onMounted:', error)
    // En cas d'erreur fatale, s'assurer que les graphiques sont initialisés
    try {
      generateCharts()
    } catch (chartError) {
      console.error('Erreur lors de l\'initialisation des graphiques:', chartError)
    }
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

.loading-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #6B7280;
  font-size: 1rem;
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
  .production-page {
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
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
  
  .period-selector,
  .view-selector {
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
  .production-page {
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
