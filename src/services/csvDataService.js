/**
 * Service pour charger et parser les fichiers CSV de données réelles de la Côte d'Ivoire
 */

// Fonction pour parser un CSV simple
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length === 0) return []

  // Détecter le séparateur (virgule ou point-virgule)
  const separator = csvText.includes(';') ? ';' : ','

  // Parser la première ligne comme en-têtes
  const headers = lines[0]
    .split(separator)
    .map(h => h.trim().replace(/^"|"$/g, ''))

  // Parser les données
  const data = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(separator).map(v => v.trim().replace(/^"|"$/g, ''))
    if (values.length === headers.length && values.some(v => v)) {
      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index]
      })
      data.push(row)
    }
  }

  return data
}

// Fonction pour convertir une valeur numérique avec virgule
function parseNumber(value) {
  if (!value || value === '') return 0
  return parseFloat(value.replace(',', '.')) || 0
}

// Fonction pour parser une date au format DD/MM/YYYY
function parseDate(dateStr) {
  if (!dateStr) return null
  const parts = dateStr.split('/')
  if (parts.length === 3) {
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
  }
  return null
}

/**
 * Charge les données de production mensuelle
 */
export async function loadProductionData() {
  try {
    let response = await fetch('/data/Production_CIE_en_MWH.csv')
    if (!response.ok) {
      response = await fetch('/data/Production_CIE_en_MWH_1.csv')
      if (!response.ok) {
        throw new Error('Fichier non trouvé')
      }
    }
    const text = await response.text()
    const data = parseCSV(text)
    return data.map(row => ({
      date: parseDate(row.mois),
      timestamp: parseDate(row.mois)?.toISOString() || row.mois,
      thermal: parseNumber(row.prodTherm),
      hydraulic: parseNumber(row.prodHydro),
      total: parseNumber(row.prodTotal),
      id: parseInt(row.idproduction) || 0
    })).filter(item => item.date)
  } catch (error) {
    console.error('Erreur lors du chargement des données de production:', error)
    return []
  }
}

/**
 * Charge les données de consommation nationale annuelle
 */
export async function loadConsumptionData() {
  try {
    const response = await fetch('/data/Consommation_Nationale.csv')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      bt: parseNumber(row.BT),
      htmt: parseNumber(row['HT/MT']),
      total: parseNumber(row.BT) + parseNumber(row['HT/MT'])
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de consommation:', error)
    return []
  }
}

/**
 * Charge les données de consommation spécifique (kWh par habitant)
 */
export async function loadSpecificConsumptionData() {
  try {
    const response = await fetch('/data/Consommation_spécifique_Nationale_kWh_par_Hab.csv')
    if (!response.ok) {
      throw new Error('Fichier consommation spécifique non trouvé')
    }
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.ANNEE) || 0,
      kwhPerHab: parseNumber(row.BT)
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de consommation spécifique:', error)
    return []
  }
}

/**
 * Charge les données de production brute annuelle
 */
export async function loadProductionBruteData() {
  try {
    const response = await fetch('/data/Production_brute_Nationale_GWh.csv')
    if (!response.ok) {
      throw new Error('Fichier Production brute non trouvé')
    }
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      hydraulic: parseNumber(row.Hydraulique),
      thermal: parseNumber(row.Thermique),
      isolated: parseNumber(row['Centrales Isolées'] || '0'),
      total: parseNumber(row.Hydraulique) + parseNumber(row.Thermique) + parseNumber(row['Centrales Isolées'] || '0')
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de production brute:', error)
    return []
  }
}

/**
 * Charge les données de puissance installée
 */
export async function loadInstalledPowerData() {
  try {
    let response = await fetch('/data/Puissance_installée_MW.csv')
    if (!response.ok) {
      response = await fetch('/data/Puissance_installee_MW.csv')
    }
    if (!response.ok) {
      throw new Error('Fichier puissance installée non trouvé')
    }
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      hydraulic: parseNumber(row.Hydraulique),
      thermal: parseNumber(row.Thermique),
      total: parseNumber(row.Hydraulique) + parseNumber(row.Thermique)
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de puissance installée:', error)
    return []
  }
}

/**
 * Charge les données de pointe maximale
 */
export async function loadPeakPowerData() {
  try {
    let response = await fetch('/data/Pointe_maxi_Nationale_MW.csv')
    if (!response.ok) {
      response = await fetch('/data/Pointe_maxi_Nationale_MW_1.csv')
    }
    if (!response.ok) {
      throw new Error('Fichier pointe maximale non trouvé')
    }
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      peak: parseNumber(row.MW)
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de pointe:', error)
    return []
  }
}

/**
 * Charge les données d'électrification rurale
 */
export async function loadRuralElectrificationData() {
  try {
    const response = await fetch('/data/EletrificationRurale.csv')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => {
      const year = parseInt(row.Année || Object.values(row)[0]) || 0
      const rate = parseNumber(row['NB Loc Elec'] || Object.values(row)[1] || '0')
      return { year, rate }
    }).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données d\'électrification rurale:', error)
    return []
  }
}

/**
 * Charge les données de longueur de réseau
 */
export async function loadNetworkLengthData() {
  try {
    let response = await fetch('/data/Longueur_Réseau_National_km.csv')
    if (!response.ok) {
      response = await fetch('/data/Longueur_Reseau_National_km.csv')
    }
    if (!response.ok) {
      throw new Error('Fichier longueur réseau non trouvé')
    }
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.ANNEE || Object.values(row)[0]) || 0,
      bt: parseNumber(row.BT || Object.values(row)[1] || '0'),
      mt: parseNumber(row.MT || Object.values(row)[2] || '0'),
      ht: parseNumber(row.HT || Object.values(row)[3] || '0'),
      total: parseNumber(row.BT || Object.values(row)[1] || '0') +
        parseNumber(row.MT || Object.values(row)[2] || '0') +
        parseNumber(row.HT || Object.values(row)[3] || '0')
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de longueur de réseau:', error)
    return []
  }
}

/**
 * Charge les données d'abonnés
 */
export async function loadSubscribersData() {
  try {
    let response = await fetch('/data/Nombre_d\'abonnés_BTMTHT.csv')
    if (!response.ok) {
      response = await fetch('/data/Nombre_dabonnes_BTMTHT.csv')
    }
    if (!response.ok) {
      response = await fetch('/data/Nombre_d\'abonnes_BTMTHT.csv')
    }
    if (!response.ok) {
      throw new Error('Fichier abonnés non trouvé')
    }
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      bt: parseNumber(row.BT),
      htmt: parseNumber(row['HT/MT']),
      total: parseNumber(row.BT) + parseNumber(row['HT/MT'])
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données d\'abonnés:', error)
    return []
  }
}

/**
 * Charge toutes les données
 */
export async function loadAllData() {
  const [
    productionMonthly,
    consumption,
    specificConsumption,
    productionBrute,
    installedPower,
    peakPower,
    ruralElectrification,
    networkLength,
    subscribers
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

  return {
    productionMonthly,
    consumption,
    specificConsumption,
    productionBrute,
    installedPower,
    peakPower,
    ruralElectrification,
    networkLength,
    subscribers
  }
}
