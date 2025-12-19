/**
 * Service pour charger les données des centrales électriques
 */

// Fonction pour parser un CSV simple
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length === 0) return []

  const separator = csvText.includes(';') ? ';' : ','
  const headers = lines[0]
    .split(separator)
    .map(h => h.trim().replace(/^"|"$/g, ''))

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

function parseNumber(value) {
  if (!value || value === '') return 0
  return parseFloat(value.replace(',', '.')) || 0
}

/**
 * Charge les données de production AZITO
 */
export async function loadAzitoProduction() {
  try {
    const response = await fetch('/data/centrales/Production AZITO ENERGIE.csv')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.ANNEE || row.Année) || 0,
      production: parseNumber(row['Production GWh'] || row['Production (GWh)']),
      contribution: parseNumber(row['Contribution à la production nationale (%)'])
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données AZITO:', error)
    return []
  }
}

/**
 * Charge les données de production CIPREL
 */
export async function loadCiprelProduction() {
  try {
    const response = await fetch('/data/centrales/Production CIPREL.csv')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      production: parseNumber(row['Production (GWh)']),
      contribution: parseNumber(row['Contribution à la production nationale (%)'])
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données CIPREL:', error)
    return []
  }
}

/**
 * Charge les données de production AGGREKO
 */
export async function loadAggrekoProduction() {
  try {
    const response = await fetch('/data/centrales/Production AGGREKO.csv')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      production: parseNumber(row['Production GWh']),
      contribution: parseNumber(row['Contribution à la production nationale (%)'])
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données AGGREKO:', error)
    return []
  }
}

/**
 * Charge les données de disponibilité AZITO
 */
export async function loadAzitoAvailability() {
  try {
    const response = await fetch('/data/centrales/DispoAzito.csv')
    const text = await response.text()
    const data = parseCSV(text)

    if (data.length === 0) return []

    // La structure est particulière : première ligne = années, deuxième ligne = valeurs
    const years = Object.keys(data[0]).filter(key => key !== 'ANNEE' && !isNaN(parseInt(key)))
    const availabilityRow = data.find(row => row.ANNEE && row.ANNEE.includes('Disponibilité'))

    if (!availabilityRow) return []

    return years.map(year => ({
      year: parseInt(year),
      availability: parseNumber(availabilityRow[year] || '0')
    })).filter(item => item.year > 0 && item.availability > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement de la disponibilité AZITO:', error)
    return []
  }
}

/**
 * Charge les données de disponibilité CIPREL
 */
export async function loadCiprelAvailability() {
  try {
    const response = await fetch('/data/centrales/disponibciprel.csv')
    const text = await response.text()
    const data = parseCSV(text)

    if (data.length === 0) return []

    const years = Object.keys(data[0]).filter(key => key !== 'ANNEE' && !isNaN(parseInt(key)))
    const availabilityRow = data.find(row => row.ANNEE && row.ANNEE.includes('Disponibilité'))

    if (!availabilityRow) return []

    return years.map(year => ({
      year: parseInt(year),
      availability: parseNumber(availabilityRow[year] || '0')
    })).filter(item => item.year > 0 && item.availability > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement de la disponibilité CIPREL:', error)
    return []
  }
}

/**
 * Charge les données d'énergie brute par centrale CIE
 */
export async function loadCIECentralesProduction() {
  try {
    const response = await fetch('/data/centrales/Energie brute produite par la CIE (MWh).csv')
    const text = await response.text()
    const data = parseCSV(text)

    const centrales = ['AYAME 1', 'AYAME 2', 'KOSSOU', 'TAABO', 'BUYO', 'FAYE', 'Vridi 1', 'Vridi vapeur *']

    return data.map(row => {
      const year = parseInt(row.ANNEE) || 0
      const result = { year }

      centrales.forEach(centrale => {
        result[centrale] = parseNumber(row[centrale] || '0')
      })

      result.total = centrales.reduce((sum, c) => sum + result[c], 0)
      result.contribution = parseNumber(row['Contribution à la production nationale(%)'] || '0')

      return result
    }).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données centrales CIE:', error)
    return []
  }
}

/**
 * Charge les données de vente d'énergie
 */
export async function loadEnergySales() {
  try {
    const response = await fetch('/data/centrales/Vente dEnergie Electrique (GWh).csv')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.Année) || 0,
      bta: parseNumber(row.BTA),
      hta: parseNumber(row.HTA),
      total: parseNumber(row.TOTAL),
      export: parseNumber(row.Export)
    })).filter(item => item.year > 0).sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement des données de vente:', error)
    return []
  }
}

/**
 * Charge toutes les données des centrales
 */
export async function loadAllCentralesData() {
  const [
    azitoProd,
    ciprelProd,
    aggrekoProd,
    azitoAvail,
    ciprelAvail,
    cieCentrales,
    sales
  ] = await Promise.all([
    loadAzitoProduction(),
    loadCiprelProduction(),
    loadAggrekoProduction(),
    loadAzitoAvailability(),
    loadCiprelAvailability(),
    loadCIECentralesProduction(),
    loadEnergySales()
  ])

  return {
    azitoProduction: azitoProd,
    ciprelProduction: ciprelProd,
    aggrekoProduction: aggrekoProd,
    azitoAvailability: azitoAvail,
    ciprelAvailability: ciprelAvail,
    cieCentrales: cieCentrales,
    sales: sales
  }
}
