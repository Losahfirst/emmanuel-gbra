/**
 * Data Service
 * Service pour récupérer et normaliser les données énergétiques
 */

import { generateEnergyMixData, generateKPIs, generateAlerts, generateAdvice } from '../data/mockData.js'
import { downsampleData } from '../utils/downsampling.js'

/**
 * Format standardisé d'un point de donnée
 * @typedef {Object} DataPoint
 * @property {string} timestamp - ISO 8601 timestamp
 * @property {number} value - Valeur en MW
 * @property {string} category - hydraulic | thermal | solar | bioenergy | consumption
 * @property {string} unit - MW
 */

/**
 * Normalise un point de donnée brut
 */
export function normalizeDataPoint(rawData) {
  return {
    timestamp: rawData.timestamp || new Date().toISOString(),
    value: parseFloat(rawData.value) || 0,
    category: rawData.category || 'consumption',
    unit: rawData.unit || 'MW'
  }
}

/**
 * Agrège les données par granularité
 */
export function aggregateByGranularity(data, granularity) {
  if (!data || data.length === 0) return []

  const intervalMinutes = {
    '15min': 15,
    'hour': 60,
    'day': 60 * 24,
    'month': 60 * 24 * 30
  }[granularity] || 60

  const grouped = {}

  data.forEach(point => {
    const date = new Date(point.timestamp)
    const intervalStart = new Date(date)

    if (granularity === 'month') {
      intervalStart.setDate(1)
      intervalStart.setHours(0, 0, 0, 0)
    } else if (granularity === 'day') {
      intervalStart.setHours(0, 0, 0, 0)
    } else if (granularity === 'hour') {
      intervalStart.setMinutes(0, 0, 0)
    } else {
      intervalStart.setMinutes(Math.floor(date.getMinutes() / intervalMinutes) * intervalMinutes, 0, 0)
    }

    const key = intervalStart.toISOString()

    if (!grouped[key]) {
      grouped[key] = {
        timestamp: key,
        values: [],
        category: point.category,
        unit: point.unit
      }
    }

    grouped[key].values.push(point.value)
  })

  return Object.values(grouped).map(group => ({
    timestamp: group.timestamp,
    value: group.values.reduce((a, b) => a + b, 0) / group.values.length,
    category: group.category,
    unit: group.unit
  })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
}

/**
 * Récupère les données énergétiques pour une plage de dates
 */
export async function fetchEnergyData(startDate, endDate, granularity = 'hour') {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 300))

  // Générer les données mock
  const rawData = generateEnergyMixData(startDate, endDate)

  // Normaliser et agréger les données
  const processedData = {
    hydraulic: aggregateByGranularity(rawData.hydraulic, granularity),
    thermal: aggregateByGranularity(rawData.thermal, granularity),
    solar: aggregateByGranularity(rawData.solar, granularity),
    bioenergy: aggregateByGranularity(rawData.bioenergy, granularity),
    consumption: aggregateByGranularity(rawData.consumption, granularity)
  }

  // Downsampling si nécessaire
  const maxPoints = 2000
  Object.keys(processedData).forEach(key => {
    if (processedData[key].length > maxPoints) {
      processedData[key] = downsampleData(processedData[key], granularity, maxPoints)
    }
  })

  return processedData
}

/**
 * Récupère la dernière lecture (temps réel)
 */
export async function getLatestReading() {
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  const data = await fetchEnergyData(oneHourAgo, now, '15min')

  // Retourner les dernières valeurs
  return {
    hydraulic: data.hydraulic[data.hydraulic.length - 1]?.value || 0,
    thermal: data.thermal[data.thermal.length - 1]?.value || 0,
    solar: data.solar[data.solar.length - 1]?.value || 0,
    bioenergy: data.bioenergy[data.bioenergy.length - 1]?.value || 0,
    consumption: data.consumption[data.consumption.length - 1]?.value || 0,
    timestamp: now.toISOString()
  }
}

/**
 * Récupère les KPIs pour une plage de dates
 */
export async function fetchKPIs(startDate, endDate) {
  const data = await fetchEnergyData(startDate, endDate, 'hour')

  // Reconstruire la structure pour generateKPIs
  const energyData = {
    hydraulic: data.hydraulic,
    thermal: data.thermal,
    solar: data.solar,
    bioenergy: data.bioenergy,
    consumption: data.consumption
  }

  return generateKPIs(energyData)
}

/**
 * Récupère les alertes et conseils
 */
export async function fetchAlertsAndAdvice(startDate, endDate) {
  const data = await fetchEnergyData(startDate, endDate, 'hour')
  const kpis = await fetchKPIs(startDate, endDate)

  // Reconstruire la structure
  const energyData = {
    hydraulic: data.hydraulic,
    thermal: data.thermal,
    solar: data.solar,
    bioenergy: data.bioenergy,
    consumption: data.consumption
  }

  const alerts = generateAlerts(kpis, energyData)
  const advice = generateAdvice(kpis, energyData)

  return { alerts, advice }
}
