/**
 * Mock Data Generator for KANARI Energy
 * Génère des données réalistes pour la simulation du mix énergétique de la Côte d'Ivoire
 */

/**
 * Génère un timestamp ISO 8601
 */
function generateTimestamp(date) {
  return date.toISOString()
}

/**
 * Génère des données pour une source d'énergie spécifique
 */
function generateEnergyData(startDate, endDate, category, baseValue, variation) {
  const data = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    // Variation journalière (pic de consommation 18h-22h)
    const hour = currentDate.getHours()
    let hourMultiplier = 1

    if (hour >= 18 && hour <= 22) {
      hourMultiplier = 1.3 // Pic de consommation
    } else if (hour >= 0 && hour <= 6) {
      hourMultiplier = 0.7 // Consommation réduite la nuit
    }

    // Variation aléatoire
    const randomVariation = 1 + (Math.random() - 0.5) * variation

    // Variation saisonnière (légère)
    const month = currentDate.getMonth()
    const seasonalMultiplier = 1 + Math.sin((month / 12) * 2 * Math.PI) * 0.1

    const value = baseValue * hourMultiplier * randomVariation * seasonalMultiplier

    data.push({
      timestamp: generateTimestamp(new Date(currentDate)),
      value: Math.max(0, Math.round(value * 10) / 10),
      category,
      unit: 'MW'
    })

    // Incrémenter de 15 minutes
    currentDate.setMinutes(currentDate.getMinutes() + 15)
  }

  return data
}

/**
 * Génère le mix énergétique complet
 */
export function generateEnergyMixData(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Mix énergétique typique de la CI
  // ~60% hydraulique, ~35% thermique, ~3% solaire, ~2% bioénergie
  const totalCapacity = 2500 // MW

  const hydraulic = generateEnergyData(start, end, 'hydraulic', totalCapacity * 0.6, 0.15)
  const thermal = generateEnergyData(start, end, 'thermal', totalCapacity * 0.35, 0.2)
  const solar = generateEnergyData(start, end, 'solar', totalCapacity * 0.03, 0.4)
  const bioenergy = generateEnergyData(start, end, 'bioenergy', totalCapacity * 0.02, 0.1)

  // Consommation (légèrement supérieure à la production pour réalisme)
  const consumption = generateEnergyData(start, end, 'consumption', totalCapacity * 1.05, 0.25)

  return {
    hydraulic,
    thermal,
    solar,
    bioenergy,
    consumption
  }
}

/**
 * Génère les KPIs
 */
export function generateKPIs(energyData) {
  const totalProduction = energyData.hydraulic.reduce((sum, d) => sum + d.value, 0) +
    energyData.thermal.reduce((sum, d) => sum + d.value, 0) +
    energyData.solar.reduce((sum, d) => sum + d.value, 0) +
    energyData.bioenergy.reduce((sum, d) => sum + d.value, 0)

  const totalConsumption = energyData.consumption.reduce((sum, d) => sum + d.value, 0)
  const thermalRatio = energyData.thermal.reduce((sum, d) => sum + d.value, 0) / totalProduction

  // Fréquence (50Hz normal, peut varier avec la charge)
  const frequency = 50.0 - (totalConsumption / totalProduction - 1) * 0.5

  // Taux de carbone (gCO2/kWh) - basé sur le ratio thermique
  const carbonRate = thermalRatio * 450 + (1 - thermalRatio) * 50

  return {
    frequency: Math.max(49.5, Math.min(50.5, frequency)),
    totalPower: Math.round(totalProduction / energyData.hydraulic.length),
    carbonRate: Math.round(carbonRate)
  }
}

/**
 * Génère des alertes basées sur les données
 */
export function generateAlerts(kpis, energyData) {
  const alerts = []
  const thermalRatio = energyData.thermal.reduce((sum, d) => sum + d.value, 0) /
    (energyData.hydraulic.reduce((sum, d) => sum + d.value, 0) +
      energyData.thermal.reduce((sum, d) => sum + d.value, 0) +
      energyData.solar.reduce((sum, d) => sum + d.value, 0) +
      energyData.bioenergy.reduce((sum, d) => sum + d.value, 0))

  if (thermalRatio > 0.6) {
    alerts.push({
      type: 'warning',
      title: 'Consommation thermique élevée',
      message: `Le mix énergétique utilise ${Math.round(thermalRatio * 100)}% de sources thermiques. Réduisez votre consommation pendant les heures de pointe.`,
      icon: 'alert-triangle'
    })
  }

  if (kpis.frequency < 49.8) {
    alerts.push({
      type: 'error',
      title: 'Stress réseau détecté',
      message: `La fréquence du réseau est à ${kpis.frequency.toFixed(2)} Hz. Le réseau est sous tension.`,
      icon: 'zap'
    })
  }

  if (thermalRatio < 0.4 && kpis.frequency > 50.1) {
    alerts.push({
      type: 'success',
      title: 'Mix énergétique optimal',
      message: 'Le réseau utilise principalement des sources renouvelables. Excellent !',
      icon: 'check-circle'
    })
  }

  return alerts
}

/**
 * Génère des conseils éco-responsables
 */
export function generateAdvice(kpis, energyData) {
  const advice = []
  const hour = new Date().getHours()

  if (hour >= 18 && hour <= 22) {
    advice.push({
      type: 'info',
      title: 'Heure de pointe',
      message: 'Nous sommes en période de forte consommation. Évitez d\'utiliser des appareils énergivores.',
      icon: 'clock'
    })
  }

  const thermalRatio = energyData.thermal.reduce((sum, d) => sum + d.value, 0) /
    (energyData.hydraulic.reduce((sum, d) => sum + d.value, 0) +
      energyData.thermal.reduce((sum, d) => sum + d.value, 0) +
      energyData.solar.reduce((sum, d) => sum + d.value, 0) +
      energyData.bioenergy.reduce((sum, d) => sum + d.value, 0))

  if (thermalRatio > 0.5) {
    advice.push({
      type: 'tip',
      title: 'Conseil écologique',
      message: 'Déplacez vos activités énergivores en dehors des heures de pointe pour réduire l\'empreinte carbone.',
      icon: 'leaf'
    })
  }

  return advice
}
