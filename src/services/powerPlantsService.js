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

// Fonction pour convertir une valeur numérique avec virgule
function parseNumber(value) {
  if (!value || value === '') return 0
  return parseFloat(value.replace(',', '.')) || 0
}

/**
 * Charge les données de production AGGREKO
 */
export async function loadAggrekoData() {
  try {
    const response = await fetch('/data/Production AGGREKO.csv')
    if (!response.ok) throw new Error('Fichier AGGREKO non trouvé')
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
 * Charge les données de production AZITO
 */
export async function loadAzitoData() {
  try {
    const response = await fetch('/data/Production AZITO ENERGIE.csv')
    if (!response.ok) throw new Error('Fichier AZITO non trouvé')
    const text = await response.text()
    const data = parseCSV(text)

    return data.map(row => ({
      year: parseInt(row.ANNEE) || 0,
      production: parseNumber(row['Production GWh']),
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
export async function loadCiprelData() {
  try {
    const response = await fetch('/data/Production CIPREL.csv')
    if (!response.ok) throw new Error('Fichier CIPREL non trouvé')
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
 * Charge les données de disponibilité AZITO
 */
export async function loadAzitoAvailability() {
  try {
    const response = await fetch('/data/DispoAzito.csv')
    if (!response.ok) throw new Error('Fichier disponibilité AZITO non trouvé')
    const text = await response.text()
    const data = parseCSV(text)

    const availability = []
    if (data.length > 0) {
      const header = Object.keys(data[0])
      const yearRow = data.find(row => row.ANNEE === 'ANNEE')
      const valueRow = data.find(row => row.ANNEE === 'Disponibilité globale (%)')

      if (yearRow && valueRow) {
        header.forEach((year, index) => {
          if (index > 0 && yearRow[year] && valueRow[year]) {
            const yearValue = parseInt(yearRow[year])
            const availValue = parseNumber(valueRow[year])
            if (yearValue > 0 && availValue > 0) {
              availability.push({
                year: yearValue,
                availability: availValue
              })
            }
          }
        })
      }
    }

    return availability.sort((a, b) => a.year - b.year)
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
    const response = await fetch('/data/disponibciprel.csv')
    if (!response.ok) throw new Error('Fichier disponibilité CIPREL non trouvé')
    const text = await response.text()
    const data = parseCSV(text)

    const availability = []
    if (data.length > 0) {
      const header = Object.keys(data[0])
      const yearRow = data.find(row => row.ANNEE === 'ANNEE')
      const valueRow = data.find(row => row.ANNEE === 'Disponibilité globale (%)')

      if (yearRow && valueRow) {
        header.forEach((year, index) => {
          if (index > 0 && yearRow[year] && valueRow[year]) {
            const yearValue = parseInt(yearRow[year])
            const availValue = parseNumber(valueRow[year])
            if (yearValue > 0 && availValue > 0) {
              availability.push({
                year: yearValue,
                availability: availValue
              })
            }
          }
        })
      }
    }

    return availability.sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement de la disponibilité CIPREL:', error)
    return []
  }
}

/**
 * Charge les données de disponibilité AGGREKO
 */
export async function loadAggrekoAvailability() {
  try {
    const response = await fetch('/data/New wpDataTable.csv')
    if (!response.ok) throw new Error('Fichier disponibilité AGGREKO non trouvé')
    const text = await response.text()
    const data = parseCSV(text)

    const availability = []
    if (data.length > 0) {
      const header = Object.keys(data[0])
      const yearRow = data.find(row => row.Année === 'Année')
      const valueRow = data.find(row => row.Année === 'Disponibilité globale (%)')

      if (yearRow && valueRow) {
        header.forEach((year, index) => {
          if (index > 0 && yearRow[year] && valueRow[year]) {
            const yearValue = parseInt(yearRow[year])
            const availValue = parseNumber(valueRow[year])
            if (yearValue > 0 && availValue > 0) {
              availability.push({
                year: yearValue,
                availability: availValue
              })
            }
          }
        })
      }
    }

    return availability.sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement de la disponibilité AGGREKO:', error)
    return []
  }
}

/**
 * Charge les données de production détaillée CIE par centrale
 */
export async function loadCIEDetailedProduction() {
  try {
    const response = await fetch('/data/Energie brute produite par la CIE (MWh).csv')
    if (!response.ok) throw new Error('Fichier production détaillée CIE non trouvé')
    const text = await response.text()
    const data = parseCSV(text)

    const plants = ['AYAME 1', 'AYAME 2', 'KOSSOU', 'TAABO', 'BUYO', 'FAYE', 'Vridi 1', 'Vridi vapeur *']
    const result = []

    data.forEach(row => {
      const year = parseInt(row.ANNEE) || 0
      if (year > 0) {
        const plantData = {
          year,
          plants: {}
        }

        plants.forEach(plant => {
          plantData.plants[plant] = parseNumber(row[plant] || '0')
        })

        plantData.total = parseNumber(row.TOTAL || '0')
        plantData.contribution = parseNumber(row['Contribution à la production nationale(%)'] || '0')

        result.push(plantData)
      }
    })

    return result.sort((a, b) => a.year - b.year)
  } catch (error) {
    console.error('Erreur lors du chargement de la production détaillée CIE:', error)
    return []
  }
}

/**
 * Charge les données de vente d'énergie
 */
export async function loadEnergySales() {
  try {
    const response = await fetch('/data/Vente dEnergie Electrique (GWh).csv')
    if (!response.ok) throw new Error('Fichier ventes non trouvé')
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
    console.error('Erreur lors du chargement des ventes:', error)
    return []
  }
}

/**
 * Charge toutes les données des centrales
 */
export async function loadAllPowerPlantsData() {
  const [
    aggreko,
    azito,
    ciprel,
    azitoAvail,
    ciprelAvail,
    aggrekoAvail,
    cieDetailed,
    sales
  ] = await Promise.all([
    loadAggrekoData(),
    loadAzitoData(),
    loadCiprelData(),
    loadAzitoAvailability(),
    loadCiprelAvailability(),
    loadAggrekoAvailability(),
    loadCIEDetailedProduction(),
    loadEnergySales()
  ])

  return {
    aggreko,
    azito,
    ciprel,
    availability: {
      azito: azitoAvail,
      ciprel: ciprelAvail,
      aggreko: aggrekoAvail
    },
    cieDetailed,
    sales
  }
}
