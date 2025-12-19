/**
 * API REST pour exposer les données énergétiques de la Côte d'Ivoire
 * Simule une API REST en utilisant les données CSV chargées
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
} from '../services/csvDataService.js'
import {
  loadAllPowerPlantsData,
  loadAggrekoData,
  loadAzitoData,
  loadCiprelData,
  loadAzitoAvailability,
  loadCiprelAvailability,
  loadAggrekoAvailability,
  loadCIEDetailedProduction,
  loadEnergySales
} from '../services/powerPlantsService.js'
import {
  allPowerPlants,
  getPowerPlantsByType,
  getPowerPlantById,
  getStatisticsByType
} from '../data/powerPlantsData.js'

// Cache des données
let dataCache = null
let powerPlantsCache = null

/**
 * Initialise et charge toutes les données
 */
async function initializeData() {
  if (!dataCache) {
    dataCache = {
      production: await loadProductionData(),
      consumption: await loadConsumptionData(),
      specificConsumption: await loadSpecificConsumptionData(),
      productionBrute: await loadProductionBruteData(),
      installedPower: await loadInstalledPowerData(),
      peakPower: await loadPeakPowerData(),
      ruralElectrification: await loadRuralElectrificationData(),
      networkLength: await loadNetworkLengthData(),
      subscribers: await loadSubscribersData()
    }
  }
  return dataCache
}

/**
 * Initialise et charge les données des centrales
 */
async function initializePowerPlantsData() {
  if (!powerPlantsCache) {
    powerPlantsCache = await loadAllPowerPlantsData()
  }
  return powerPlantsCache
}

/**
 * API Endpoints
 */
export const energyApi = {
  /**
   * GET /api/production
   * Récupère les données de production mensuelle
   * Query params: startDate, endDate, source (hydraulic|thermal|all)
   */
  async getProduction(params = {}) {
    await initializeData()
    let data = dataCache.production

    // Filtrer par dates
    if (params.startDate) {
      const start = new Date(params.startDate)
      data = data.filter(d => d.date >= start)
    }
    if (params.endDate) {
      const end = new Date(params.endDate)
      data = data.filter(d => d.date <= end)
    }

    // Filtrer par source
    if (params.source === 'hydraulic') {
      return data.map(d => ({ date: d.date, value: d.hydraulic, unit: 'MWh' }))
    } else if (params.source === 'thermal') {
      return data.map(d => ({ date: d.date, value: d.thermal, unit: 'MWh' }))
    }

    return data
  },

  /**
   * GET /api/consumption
   * Récupère les données de consommation nationale
   * Query params: startYear, endYear, type (bt|htmt|all)
   */
  async getConsumption(params = {}) {
    await initializeData()
    let data = dataCache.consumption

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    if (params.type === 'bt') {
      return data.map(d => ({ year: d.year, value: d.bt, unit: 'GWh' }))
    } else if (params.type === 'htmt') {
      return data.map(d => ({ year: d.year, value: d.htmt, unit: 'GWh' }))
    }

    return data
  },

  /**
   * GET /api/production-brute
   * Récupère les données de production brute annuelle
   * Query params: startYear, endYear, source (hydraulic|thermal|isolated|all)
   */
  async getProductionBrute(params = {}) {
    await initializeData()
    let data = dataCache.productionBrute

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    if (params.source === 'hydraulic') {
      return data.map(d => ({ year: d.year, value: d.hydraulic, unit: 'GWh' }))
    } else if (params.source === 'thermal') {
      return data.map(d => ({ year: d.year, value: d.thermal, unit: 'GWh' }))
    } else if (params.source === 'isolated') {
      return data.map(d => ({ year: d.year, value: d.isolated, unit: 'GWh' }))
    }

    return data
  },

  /**
   * GET /api/installed-power
   * Récupère les données de puissance installée
   */
  async getInstalledPower(params = {}) {
    await initializeData()
    let data = dataCache.installedPower

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    return data
  },

  /**
   * GET /api/peak-power
   * Récupère les données de pointe maximale
   */
  async getPeakPower(params = {}) {
    await initializeData()
    let data = dataCache.peakPower

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    return data
  },

  /**
   * GET /api/rural-electrification
   * Récupère les données d'électrification rurale
   */
  async getRuralElectrification(params = {}) {
    await initializeData()
    let data = dataCache.ruralElectrification

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    return data
  },

  /**
   * GET /api/network-length
   * Récupère les données de longueur de réseau
   * Query params: startYear, endYear, type (bt|mt|ht|all)
   */
  async getNetworkLength(params = {}) {
    await initializeData()
    let data = dataCache.networkLength

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    if (params.type === 'bt') {
      return data.map(d => ({ year: d.year, value: d.bt, unit: 'km' }))
    } else if (params.type === 'mt') {
      return data.map(d => ({ year: d.year, value: d.mt, unit: 'km' }))
    } else if (params.type === 'ht') {
      return data.map(d => ({ year: d.year, value: d.ht, unit: 'km' }))
    }

    return data
  },

  /**
   * GET /api/specific-consumption
   * Récupère les données de consommation spécifique (kWh par habitant)
   */
  async getSpecificConsumption(params = {}) {
    await initializeData()
    let data = dataCache.specificConsumption

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    return data
  },

  /**
   * GET /api/subscribers
   * Récupère les données d'abonnés
   * Query params: startYear, endYear, type (bt|htmt|all)
   */
  async getSubscribers(params = {}) {
    await initializeData()
    let data = dataCache.subscribers

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    if (params.type === 'bt') {
      return data.map(d => ({ year: d.year, value: d.bt, unit: 'abonnés' }))
    } else if (params.type === 'htmt') {
      return data.map(d => ({ year: d.year, value: d.htmt, unit: 'abonnés' }))
    }

    return data
  },

  /**
   * GET /api/kpis
   * Récupère les KPIs calculés
   */
  async getKPIs() {
    await initializeData()

    const latestProd = dataCache.productionBrute[dataCache.productionBrute.length - 1]
    const latestInstalled = dataCache.installedPower[dataCache.installedPower.length - 1]
    const latestPeak = dataCache.peakPower[dataCache.peakPower.length - 1]
    const latestCons = dataCache.consumption[dataCache.consumption.length - 1]
    const latestSubs = dataCache.subscribers[dataCache.subscribers.length - 1]
    const latestRural = dataCache.ruralElectrification[dataCache.ruralElectrification.length - 1]
    const latestNetwork = dataCache.networkLength[dataCache.networkLength.length - 1]

    // Calculer le taux renouvelable
    const renewableRate = latestProd && latestProd.total > 0
      ? (latestProd.hydraulic / latestProd.total * 100)
      : 0

    // Calculer le taux de croissance
    const prevYearProd = dataCache.productionBrute[dataCache.productionBrute.length - 2]
    const growthRate = prevYearProd && prevYearProd.total > 0
      ? ((latestProd.total - prevYearProd.total) / prevYearProd.total * 100)
      : 0

    return {
      totalProduction: latestProd?.total || 0,
      totalConsumption: latestCons?.total || 0,
      installedPower: latestInstalled?.total || 0,
      peakPower: latestPeak?.peak || 0,
      renewableRate: Math.round(renewableRate * 10) / 10,
      growthRate: Math.round(growthRate * 10) / 10,
      subscribers: latestSubs?.total || 0,
      ruralElectrification: latestRural?.rate || 0,
      networkLength: latestNetwork?.length || 0,
      year: latestProd?.year || new Date().getFullYear()
    }
  },

  /**
   * GET /api/statistics
   * Récupère des statistiques agrégées
   */
  async getStatistics(params = {}) {
    await initializeData()

    const startYear = params.startYear ? parseInt(params.startYear) : 1980
    const endYear = params.endYear ? parseInt(params.endYear) : 2020

    const filteredProd = dataCache.productionBrute.filter(d => d.year >= startYear && d.year <= endYear)
    const filteredCons = dataCache.consumption.filter(d => d.year >= startYear && d.year <= endYear)
    const filteredPeak = dataCache.peakPower.filter(d => d.year >= startYear && d.year <= endYear)

    return {
      period: { startYear, endYear },
      production: {
        total: filteredProd.reduce((sum, d) => sum + d.total, 0),
        average: filteredProd.length > 0 ? filteredProd.reduce((sum, d) => sum + d.total, 0) / filteredProd.length : 0,
        max: Math.max(...filteredProd.map(d => d.total)),
        min: Math.min(...filteredProd.map(d => d.total)),
        hydraulic: filteredProd.reduce((sum, d) => sum + d.hydraulic, 0),
        thermal: filteredProd.reduce((sum, d) => sum + d.thermal, 0)
      },
      consumption: {
        total: filteredCons.reduce((sum, d) => sum + d.total, 0),
        average: filteredCons.length > 0 ? filteredCons.reduce((sum, d) => sum + d.total, 0) / filteredCons.length : 0,
        max: Math.max(...filteredCons.map(d => d.total)),
        min: Math.min(...filteredCons.map(d => d.total))
      },
      peakPower: {
        max: Math.max(...filteredPeak.map(d => d.peak)),
        average: filteredPeak.length > 0 ? filteredPeak.reduce((sum, d) => sum + d.peak, 0) / filteredPeak.length : 0
      }
    }
  },

  /**
   * GET /api/centrales/production
   * Récupère les données de production par centrale
   * Query params: startYear, endYear, centrale (azito|ciprel|aggreko|all)
   */
  async getCentralesProduction(params = {}) {
    await initializePowerPlantsData()

    const startYear = params.startYear ? parseInt(params.startYear) : 2000
    const endYear = params.endYear ? parseInt(params.endYear) : 2020

    let result = {
      azito: powerPlantsCache.azito.filter(d => d.year >= startYear && d.year <= endYear),
      ciprel: powerPlantsCache.ciprel.filter(d => d.year >= startYear && d.year <= endYear),
      aggreko: powerPlantsCache.aggreko.filter(d => d.year >= startYear && d.year <= endYear)
    }

    if (params.centrale === 'azito') {
      return result.azito
    } else if (params.centrale === 'ciprel') {
      return result.ciprel
    } else if (params.centrale === 'aggreko') {
      return result.aggreko
    }

    return result
  },

  /**
   * GET /api/centrales/availability
   * Récupère les données de disponibilité des centrales
   * Query params: startYear, endYear, centrale (azito|ciprel|aggreko|all)
   */
  async getCentralesAvailability(params = {}) {
    await initializePowerPlantsData()

    const startYear = params.startYear ? parseInt(params.startYear) : 2000
    const endYear = params.endYear ? parseInt(params.endYear) : 2020

    let result = {
      azito: powerPlantsCache.availability.azito.filter(d => d.year >= startYear && d.year <= endYear),
      ciprel: powerPlantsCache.availability.ciprel.filter(d => d.year >= startYear && d.year <= endYear),
      aggreko: powerPlantsCache.availability.aggreko.filter(d => d.year >= startYear && d.year <= endYear)
    }

    if (params.centrale === 'azito') {
      return result.azito
    } else if (params.centrale === 'ciprel') {
      return result.ciprel
    } else if (params.centrale === 'aggreko') {
      return result.aggreko
    }

    return result
  },

  /**
   * GET /api/centrales/cie
   * Récupère les données de production des centrales CIE
   * Query params: startYear, endYear, centrale (nom de la centrale ou 'all')
   */
  async getCIECentrales(params = {}) {
    await initializePowerPlantsData()

    let data = powerPlantsCache.cieDetailed

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    if (params.centrale && params.centrale !== 'all') {
      return data.map(d => ({
        year: d.year,
        production: d.plants[params.centrale] || 0,
        unit: 'MWh'
      }))
    }

    return data
  },

  /**
   * GET /api/sales
   * Récupère les données de vente d'énergie
   * Query params: startYear, endYear, type (bta|hta|total|export|all)
   */
  async getEnergySales(params = {}) {
    await initializePowerPlantsData()
    let data = powerPlantsCache.sales

    if (params.startYear) {
      data = data.filter(d => d.year >= parseInt(params.startYear))
    }
    if (params.endYear) {
      data = data.filter(d => d.year <= parseInt(params.endYear))
    }

    if (params.type === 'bta') {
      return data.map(d => ({ year: d.year, value: d.bta, unit: 'GWh' }))
    } else if (params.type === 'hta') {
      return data.map(d => ({ year: d.year, value: d.hta, unit: 'GWh' }))
    } else if (params.type === 'export') {
      return data.map(d => ({ year: d.year, value: d.export, unit: 'GWh' }))
    } else if (params.type === 'total') {
      return data.map(d => ({ year: d.year, value: d.total, unit: 'GWh' }))
    }

    return data
  },

  /**
   * GET /api/centrales/comparison
   * Compare les performances des centrales
   */
  async getCentralesComparison(params = {}) {
    await initializePowerPlantsData()

    const startYear = params.startYear ? parseInt(params.startYear) : 2010
    const endYear = params.endYear ? parseInt(params.endYear) : 2020

    const azito = powerPlantsCache.azito.filter(d => d.year >= startYear && d.year <= endYear)
    const ciprel = powerPlantsCache.ciprel.filter(d => d.year >= startYear && d.year <= endYear)
    const aggreko = powerPlantsCache.aggreko.filter(d => d.year >= startYear && d.year <= endYear)
    const azitoAvail = powerPlantsCache.availability.azito.filter(d => d.year >= startYear && d.year <= endYear)
    const ciprelAvail = powerPlantsCache.availability.ciprel.filter(d => d.year >= startYear && d.year <= endYear)
    const aggrekoAvail = powerPlantsCache.availability.aggreko.filter(d => d.year >= startYear && d.year <= endYear)

    return {
      period: { startYear, endYear },
      production: {
        azito: {
          total: azito.reduce((sum, d) => sum + d.production, 0),
          average: azito.length > 0 ? azito.reduce((sum, d) => sum + d.production, 0) / azito.length : 0,
          max: Math.max(...azito.map(d => d.production)),
          avgContribution: azito.length > 0 ? azito.reduce((sum, d) => sum + d.contribution, 0) / azito.length : 0
        },
        ciprel: {
          total: ciprel.reduce((sum, d) => sum + d.production, 0),
          average: ciprel.length > 0 ? ciprel.reduce((sum, d) => sum + d.production, 0) / ciprel.length : 0,
          max: Math.max(...ciprel.map(d => d.production)),
          avgContribution: ciprel.length > 0 ? ciprel.reduce((sum, d) => sum + d.contribution, 0) / ciprel.length : 0
        },
        aggreko: {
          total: aggreko.reduce((sum, d) => sum + d.production, 0),
          average: aggreko.length > 0 ? aggreko.reduce((sum, d) => sum + d.production, 0) / aggreko.length : 0,
          max: Math.max(...aggreko.map(d => d.production)),
          avgContribution: aggreko.length > 0 ? aggreko.reduce((sum, d) => sum + d.contribution, 0) / aggreko.length : 0
        }
      },
      availability: {
        azito: {
          average: azitoAvail.length > 0 ? azitoAvail.reduce((sum, d) => sum + d.availability, 0) / azitoAvail.length : 0,
          min: Math.min(...azitoAvail.map(d => d.availability)),
          max: Math.max(...azitoAvail.map(d => d.availability))
        },
        ciprel: {
          average: ciprelAvail.length > 0 ? ciprelAvail.reduce((sum, d) => sum + d.availability, 0) / ciprelAvail.length : 0,
          min: Math.min(...ciprelAvail.map(d => d.availability)),
          max: Math.max(...ciprelAvail.map(d => d.availability))
        },
        aggreko: {
          average: aggrekoAvail.length > 0 ? aggrekoAvail.reduce((sum, d) => sum + d.availability, 0) / aggrekoAvail.length : 0,
          min: Math.min(...aggrekoAvail.map(d => d.availability)),
          max: Math.max(...aggrekoAvail.map(d => d.availability))
        }
      }
    }
  },

  /**
   * GET /api/power-plants-list
   * Récupère la liste complète de toutes les centrales
   * Query params: type (hydraulic|thermal|solar|bioenergy|all)
   */
  async getPowerPlantsList(params = {}) {
    const type = params.type || 'all'

    if (type === 'all') {
      return getAllPowerPlants()
    }

    return {
      [type]: getPowerPlantsByType(type)
    }
  },

  /**
   * GET /api/power-plant-info/:id
   * Récupère les informations détaillées d'une centrale
   */
  async getPowerPlantInfo(id) {
    return getPowerPlantById(id)
  },

  /**
   * GET /api/power-plants-stats
   * Récupère les statistiques des centrales par type
   */
  async getPowerPlantsStats() {
    return getStatisticsByType()
  },

  /**
   * GET /api/power-plants/list
   * Récupère la liste complète de toutes les centrales
   * Query params: type (hydraulic|thermal|solar|biomass|all), status (operational|planned|all)
   */
  async getAllPowerPlantsList(params = {}) {
    const { allPowerPlants, getPowerPlantsByType } = await import('../data/powerPlantsData.js')

    let plants = allPowerPlants

    if (params.type && params.type !== 'all') {
      plants = getPowerPlantsByType(params.type)
    }

    if (params.status && params.status !== 'all') {
      plants = plants.filter(plant => plant.status === params.status)
    }

    return plants
  }

}
