/**
 * Formatting Utilities
 * Fonctions pour formater les données pour l'affichage
 */

/**
 * Formate une date selon la granularité
 */
export function formatDate(date, granularity) {
  const d = new Date(date)

  switch (granularity) {
    case '15min':
      return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    case 'hour':
      return d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit' })
    case 'day':
      return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
    case 'month':
      return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
    default:
      return d.toLocaleString('fr-FR')
  }
}

/**
 * Formate une valeur en MW
 */
export function formatPower(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} GW`
  }
  return `${Math.round(value)} MW`
}

/**
 * Formate une fréquence en Hz
 */
export function formatFrequency(value) {
  return `${value.toFixed(2)} Hz`
}

/**
 * Formate un taux de carbone
 */
export function formatCarbonRate(value) {
  return `${Math.round(value)} gCO₂/kWh`
}

/**
 * Formate une date range pour l'affichage
 */
export function formatDateRange(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const startStr = startDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
  const endStr = endDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

  return `${startStr} - ${endStr}`
}

/**
 * Obtient le nom d'une source d'énergie
 */
export function getEnergySourceName(category) {
  const names = {
    hydraulic: 'Hydraulique',
    thermal: 'Thermique (Gaz)',
    solar: 'Solaire',
    bioenergy: 'Bioénergie',
    consumption: 'Consommation'
  }
  return names[category] || category
}

/**
 * Obtient l'icône d'une source d'énergie
 */
export function getEnergySourceIcon(category) {
  const icons = {
    hydraulic: '💧',
    thermal: '🔥',
    solar: '☀️',
    bioenergy: '🌱',
    consumption: '⚡'
  }
  return icons[category] || '⚡'
}

/**
 * Obtient la couleur d'une source d'énergie
 */
export function getEnergySourceColor(category) {
  const colors = {
    hydraulic: '#3B82F6', // Bleu
    thermal: '#F97316',   // Orange
    solar: '#FACC15',     // Jaune
    bioenergy: '#22C55E',  // Vert
    consumption: '#1F2937' // Gris foncé
  }
  return colors[category] || '#6B7280'
}

/**
 * Formate une longueur en km
 */
export function formatLength(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k km`
  }
  return `${Math.round(value)} km`
}

/**
 * Formate un nombre avec séparateurs
 */
export function formatNumber(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toLocaleString('fr-FR')
}
