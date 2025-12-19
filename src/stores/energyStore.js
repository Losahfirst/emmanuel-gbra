/**
 * Energy Store (Pinia)
 * Store pour gérer l'état de l'application KANARI Energy
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchEnergyData, fetchKPIs, fetchAlertsAndAdvice, getLatestReading } from '../services/realDataService.js'

export const useEnergyStore = defineStore('energy', () => {
  // State
  const energyData = ref({
    hydraulic: [],
    thermal: [],
    solar: [],
    bioenergy: [],
    consumption: []
  })

  const kpis = ref({
    frequency: 50.0,
    totalPower: 0,
    carbonRate: 0
  })

  const filters = ref({
    dateRange: {
      start: new Date(2015, 0, 1), // 2015 par défaut (données disponibles)
      end: new Date(2020, 11, 31) // 2020 (dernière année disponible)
    },
    sources: ['hydraulic', 'thermal'],
    granularity: 'month' // Les données sont mensuelles
  })

  const comparisonPeriod = ref(null)
  const isLoading = ref(false)
  const alerts = ref([])
  const advice = ref([])
  const lastUpdate = ref(null)

  // Getters
  const filteredEnergyData = computed(() => {
    const filtered = {}
    filters.value.sources.forEach(source => {
      if (energyData.value[source]) {
        filtered[source] = energyData.value[source]
      }
    })
    if (filters.value.sources.includes('consumption') || filters.value.sources.length === 0) {
      filtered.consumption = energyData.value.consumption
    }
    return filtered
  })

  const totalProduction = computed(() => {
    return energyData.value.hydraulic.reduce((sum, d) => sum + d.value, 0) +
      energyData.value.thermal.reduce((sum, d) => sum + d.value, 0) +
      energyData.value.solar.reduce((sum, d) => sum + d.value, 0) +
      energyData.value.bioenergy.reduce((sum, d) => sum + d.value, 0)
  })

  const thermalRatio = computed(() => {
    const thermal = energyData.value.thermal.reduce((sum, d) => sum + d.value, 0)
    return totalProduction.value > 0 ? thermal / totalProduction.value : 0
  })

  // Actions
  async function loadEnergyData() {
    isLoading.value = true
    try {
      const data = await fetchEnergyData(
        filters.value.dateRange.start,
        filters.value.dateRange.end,
        filters.value.granularity
      )
      energyData.value = data
      lastUpdate.value = new Date()
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function loadKPIs() {
    try {
      const kpisData = await fetchKPIs(
        filters.value.dateRange.start,
        filters.value.dateRange.end
      )
      kpis.value = kpisData
    } catch (error) {
      console.error('Erreur lors du chargement des KPIs:', error)
      throw error
    }
  }

  async function loadAlertsAndAdvice() {
    try {
      const { alerts: alertsData, advice: adviceData } = await fetchAlertsAndAdvice(
        filters.value.dateRange.start,
        filters.value.dateRange.end
      )
      alerts.value = alertsData
      advice.value = adviceData
    } catch (error) {
      console.error('Erreur lors du chargement des alertes:', error)
      throw error
    }
  }

  async function updateLatestReading() {
    try {
      const latest = await getLatestReading()
      // Mettre à jour les dernières valeurs
      if (energyData.value.hydraulic.length > 0) {
        energyData.value.hydraulic[energyData.value.hydraulic.length - 1].value = latest.hydraulic
      }
      if (energyData.value.thermal.length > 0) {
        energyData.value.thermal[energyData.value.thermal.length - 1].value = latest.thermal
      }
      if (energyData.value.solar.length > 0) {
        energyData.value.solar[energyData.value.solar.length - 1].value = latest.solar
      }
      if (energyData.value.bioenergy.length > 0) {
        energyData.value.bioenergy[energyData.value.bioenergy.length - 1].value = latest.bioenergy
      }
      if (energyData.value.consumption.length > 0) {
        energyData.value.consumption[energyData.value.consumption.length - 1].value = latest.consumption
      }
      lastUpdate.value = new Date()
    } catch (error) {
      console.error('Erreur lors de la mise à jour temps réel:', error)
    }
  }

  function setDateRange(start, end) {
    filters.value.dateRange.start = new Date(start)
    filters.value.dateRange.end = new Date(end)
  }

  function setGranularity(granularity) {
    filters.value.granularity = granularity
  }

  function toggleSource(source) {
    const index = filters.value.sources.indexOf(source)
    if (index > -1) {
      filters.value.sources.splice(index, 1)
    } else {
      filters.value.sources.push(source)
    }
  }

  function setComparisonPeriod(period) {
    comparisonPeriod.value = period
  }

  // Initialisation
  async function initialize() {
    await loadEnergyData()
    await loadKPIs()
    await loadAlertsAndAdvice()
  }

  return {
    // State
    energyData,
    kpis,
    filters,
    comparisonPeriod,
    isLoading,
    alerts,
    advice,
    lastUpdate,
    // Getters
    filteredEnergyData,
    totalProduction,
    thermalRatio,
    // Actions
    loadEnergyData,
    loadKPIs,
    loadAlertsAndAdvice,
    updateLatestReading,
    setDateRange,
    setGranularity,
    toggleSource,
    setComparisonPeriod,
    initialize
  }
})
