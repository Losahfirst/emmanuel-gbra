<template>
  <div class="energy-mix-chart" ref="chartContainer">
    <div class="chart-header">
      <h3 class="chart-title">Mix Énergétique</h3>
      <div class="chart-legend">
        <div
          v-for="source in visibleSources"
          :key="source.category"
          class="legend-item"
          @click="toggleSource(source.category)"
        >
          <div
            class="legend-color"
            :style="{ backgroundColor: source.color }"
          ></div>
          <span class="legend-label">{{ source.name }}</span>
          <Eye v-if="isSourceVisible(source.category)" :size="14" />
          <EyeOff v-else :size="14" />
        </div>
      </div>
    </div>
    <div v-if="store.isLoading" class="chart-loading">
      <Loader2 :size="32" class="spinning" />
      <p>Chargement des données...</p>
    </div>
    <apexchart
      v-else
      ref="chart"
      type="area"
      height="500"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useEnergyStore } from '../../../../stores/energyStore.js'
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next'

const store = useEnergyStore()
const chart = ref(null)
const chartContainer = ref(null)

const visibleSources = computed(() => {
  const sources = [
    { category: 'hydraulic', name: 'Hydraulique', color: '#3B82F6' },
    { category: 'thermal', name: 'Thermique (Gaz)', color: '#F97316' },
    { category: 'solar', name: 'Solaire', color: '#FACC15' },
    { category: 'bioenergy', name: 'Bioénergie', color: '#22C55E' }
  ]
  return sources
})

function isSourceVisible(category) {
  return store.filters.sources.includes(category)
}

function toggleSource(category) {
  store.toggleSource(category)
}

const chartSeries = computed(() => {
  const series = []
  
  // Ajouter les sources d'énergie visibles
  visibleSources.value.forEach(source => {
    if (isSourceVisible(source.category)) {
      const data = store.filteredEnergyData[source.category] || []
      series.push({
        name: source.name,
        data: data.map(point => [new Date(point.timestamp).getTime(), point.value]),
        color: source.color
      })
    }
  })
  
  // Ajouter la consommation en overlay (ligne pointillée)
  const consumptionData = store.energyData.consumption || []
  if (consumptionData.length > 0) {
    series.push({
      name: 'Consommation ⚡',
      data: consumptionData.map(point => [new Date(point.timestamp).getTime(), point.value]),
      type: 'line',
      color: '#6B7280',
      strokeWidth: 3,
      fill: {
        type: 'solid',
        opacity: 0
      }
    })
  }
  
  return series
})

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    stacked: true,
    height: 500,
    background: '#FFFFFF',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true
    }
  },
  theme: {
    mode: 'light'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    dashArray: [0, 0, 0, 0, 5] // Dernière série (consommation) en pointillé
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.2,
      stops: [0, 100]
    }
  },
  colors: visibleSources.value.map(s => s.color).concat(['#6B7280']),
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#666666'
      },
      format: 'dd/MM HH:mm'
    },
    axisBorder: {
      color: '#E5E5E5'
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#666666'
      },
      formatter: (value) => `${Math.round(value)} MW`
    }
  },
  tooltip: {
    theme: 'light',
    x: {
      format: 'dd/MM/yyyy HH:mm'
    }
  },
  legend: {
    show: false
  },
  grid: {
    borderColor: '#E5E5E5',
    strokeDashArray: 4
  }
}))

watch(() => store.energyData, () => {
  if (chart.value) {
    chart.value.updateSeries(chartSeries.value)
  }
}, { deep: true })

watch(() => store.filters.sources, () => {
  if (chart.value) {
    chart.value.updateSeries(chartSeries.value)
  }
})
</script>

<style scoped>
.energy-mix-chart {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  font-family: 'Space Grotesk', sans-serif;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #F5F5F5;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.legend-item:hover {
  background: #EEEEEE;
  border-color: #3B82F6;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-label {
  font-size: 0.875rem;
  color: #1A1A1A;
  font-weight: 500;
}

.chart-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: #666666;
  gap: 1rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .chart-legend {
    width: 100%;
  }
}
</style>
