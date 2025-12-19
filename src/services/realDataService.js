/**
 * Real Data Service
 * Service pour récupérer et normaliser les données énergétiques réelles de la Côte d'Ivoire
 */

import {
  loadProductionData,
  loadConsumptionData,
  loadSpecificConsumptionData,
  loadProductionBruteData,
  loadInstalledPowerData,
  loadPeakPowerData,
  loadRuralElectrificationData,
  loadNetworkLengthData,
  loadSubscribersData
} from './csvDataService.js'
import { aggregateByGranularity } from './dataService.js'

// Cache pour les données chargées
let productionCache = null
let consumptionCache = null
let specificConsumptionCache = null
let productionBruteCache = null
let installedPowerCache = null
let peakPowerCache = null
let ruralElectrificationCache = null
let networkLengthCache = null
let subscribersCache = null

/**
 * Charge toutes les données une fois au démarrage
 */
export async function initializeRealData() {
  if (!productionCache) {
    [
      productionCache,
      consumptionCache,
      specificConsumptionCache,
      productionBruteCache,
      installedPowerCache,
      peakPowerCache,
      ruralElectrificationCache,
      networkLengthCache,
      subscribersCache
    ] = await Promise.all([
      loadProductionData(),
      loadConsumptionData(),
      loadSpecificConsumptionData(),
      loadProductionBruteData(),
      loadInstalledPowerData(),
      loadPeakPowerData(),
      loadRuralElectrificationData(),
      loadNetworkLengthData(),
      loadSubscribersData()
    ])
  }
}

/**
 * Récupère les données énergétiques pour une plage de dates
 * @param {string} countryCode - Code du pays (ex: 'CI', 'SN', etc.)
 */
export async function fetchEnergyData(startDate, endDate, granularity = 'month', countryCode = 'CI') {
  // Les données réelles sont mensuelles, donc on force la granularité à 'month'
  granularity = 'month'

  // Pour l'instant, seules les données de la Côte d'Ivoire sont disponibles
  if (countryCode !== 'CI') {
    return {
      hydraulic: [],
      thermal: [],
      solar: [],
      bioenergy: [],
      consumption: []
    }
  }

  await initializeRealData()

  if (!productionCache || productionCache.length === 0) {
    return {
      hydraulic: [],
      thermal: [],
      solar: [],
      bioenergy: [],
      consumption: []
    }
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  // Filtrer les données de production mensuelle dans la plage
  const filteredProduction = productionCache.filter(item => {
    if (!item.date) return false
    return item.date >= start && item.date <= end
  })

  // Convertir en format standardisé
  const hydraulic = filteredProduction.map(item => ({
    timestamp: item.timestamp,
    value: item.hydraulic,
    category: 'hydraulic',
    unit: 'MWh'
  }))

  const thermal = filteredProduction.map(item => ({
    timestamp: item.timestamp,
    value: item.thermal,
    category: 'thermal',
    unit: 'MWh'
  }))

  // Pour la consommation, utiliser les données annuelles et interpoler
  const consumption = []
  if (consumptionCache && consumptionCache.length > 0) {
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()

    for (let year = startYear; year <= endYear; year++) {
      const yearData = consumptionCache.find(c => c.year === year)
      if (yearData) {
        // Répartir la consommation annuelle sur 12 mois
        const monthlyConsumption = yearData.total / 12
        for (let month = 0; month < 12; month++) {
          const date = new Date(year, month, 1)
          if (date >= start && date <= end) {
            consumption.push({
              timestamp: date.toISOString(),
              value: monthlyConsumption,
              category: 'consumption',
              unit: 'MWh'
            })
          }
        }
      }
    }
  }

  // Solar et bioenergy ne sont pas dans les données historiques, on les laisse vides
  // ou on peut utiliser des estimations basées sur les données récentes
  const solar = []
  const bioenergy = []

  return {
    hydraulic: aggregateByGranularity(hydraulic, granularity),
    thermal: aggregateByGranularity(thermal, granularity),
    solar,
    bioenergy,
    consumption: aggregateByGranularity(consumption, granularity)
  }
}

/**
 * Récupère les KPIs basés sur les données réelles
 */
export async function fetchKPIs(startDate, endDate) {
  await initializeRealData()

  const end = new Date(endDate)
  const year = end.getFullYear()

  // Récupérer les données de l'année la plus récente disponible
  const latestProduction = productionBruteCache?.find(p => p.year === year) ||
    productionBruteCache?.[productionBruteCache.length - 1]

  const latestInstalled = installedPowerCache?.find(p => p.year === year) ||
    installedPowerCache?.[installedPowerCache.length - 1]

  const latestPeak = peakPowerCache?.find(p => p.year === year) ||
    peakPowerCache?.[peakPowerCache.length - 1]

  // Calculer la fréquence (on estime à 50Hz, valeur standard)
  const frequency = 50.0

  // Puissance totale installée
  const totalPower = latestInstalled ? (latestInstalled.hydraulic + latestInstalled.thermal) : 0

  // Taux de carbone estimé (gCO2/kWh)
  // En général, l'hydraulique émet ~10-20 gCO2/kWh, le thermique ~400-600 gCO2/kWh
  let carbonRate = 0
  if (latestProduction && latestProduction.total > 0) {
    const hydraulicRatio = latestProduction.hydraulic / latestProduction.total
    const thermalRatio = latestProduction.thermal / latestProduction.total
    carbonRate = (hydraulicRatio * 15) + (thermalRatio * 500) // Estimation
  }

  return {
    frequency,
    totalPower,
    carbonRate: Math.round(carbonRate)
  }
}

/**
 * Récupère la dernière lecture disponible
 */
export function getLatestReading() {
  if (!productionCache || productionCache.length === 0) {
    return {
      hydraulic: 0,
      thermal: 0,
      solar: 0,
      bioenergy: 0,
      consumption: 0
    }
  }

  const latest = productionCache[productionCache.length - 1]
  const latestConsumption = consumptionCache?.[consumptionCache.length - 1]

  return {
    hydraulic: latest.hydraulic || 0,
    thermal: latest.thermal || 0,
    solar: 0,
    bioenergy: 0,
    consumption: latestConsumption ? (latestConsumption.total / 12) : 0
  }
}

/**
 * Récupère les alertes et conseils basés sur les données réelles
 */
export async function fetchAlertsAndAdvice(startDate, endDate) {
  await initializeRealData()

  const alerts = []
  const advice = []

  // Analyser les données récentes
  const end = new Date(endDate)
  const year = end.getFullYear()

  const latestProduction = productionBruteCache?.find(p => p.year === year) ||
    productionBruteCache?.[productionBruteCache.length - 1]

  if (latestProduction) {
    const thermalRatio = latestProduction.total > 0
      ? latestProduction.thermal / latestProduction.total
      : 0

    // Alerte si le ratio thermique est élevé
    if (thermalRatio > 0.6) {
      alerts.push({
        type: 'warning',
        title: 'Dépendance élevée aux énergies fossiles',
        message: `Le mix énergétique contient ${Math.round(thermalRatio * 100)}% d'énergie thermique. Pensez à développer les énergies renouvelables.`,
        timestamp: new Date().toISOString()
      })

      advice.push({
        type: 'info',
        title: 'Réduire la consommation',
        message: 'En période de forte dépendance thermique, réduire la consommation aux heures de pointe permet de diminuer les émissions de CO2.',
        timestamp: new Date().toISOString()
      })
    }

    // Conseil si le ratio renouvelable est bon
    const renewableRatio = latestProduction.total > 0
      ? latestProduction.hydraulic / latestProduction.total
      : 0

    if (renewableRatio > 0.5) {
      advice.push({
        type: 'success',
        title: 'Mix énergétique vert',
        message: `Excellent ! ${Math.round(renewableRatio * 100)}% de votre énergie provient de sources renouvelables.`,
        timestamp: new Date().toISOString()
      })
    }
  }

  return { alerts, advice }
}

/**
 * Récupère les données pour les analyses
 */
export async function getAnalyticsData() {
  await initializeRealData()
  return {
    productionBrute: productionBruteCache || [],
    consumption: consumptionCache || [],
    specificConsumption: specificConsumptionCache || [],
    installedPower: installedPowerCache || [],
    peakPower: peakPowerCache || [],
    ruralElectrification: ruralElectrificationCache || [],
    networkLength: networkLengthCache || [],
    subscribers: subscribersCache || []
  }
}
