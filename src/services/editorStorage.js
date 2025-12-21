/**
 * Service de stockage local pour l'Editor KANARI
 * Utilise localStorage pour persister les données éditées
 */

const STORAGE_KEYS = {
  ARTICLES: 'kanari_editor_articles',
  REGULATORS: 'kanari_editor_regulators',
  CSV_DATA: 'kanari_editor_csv_data',
  PRODUCERS: 'kanari_editor_producers',
  SETTINGS: 'kanari_editor_settings'
}

/**
 * Articles par pays
 */
export function getArticlesByCountry(countryCode) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES)
    if (!stored) return []
    const allArticles = JSON.parse(stored)
    return allArticles.filter(article => article.countryCode === countryCode) || []
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return []
  }
}

export function saveArticle(article) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES)
    const allArticles = stored ? JSON.parse(stored) : []

    const existingIndex = allArticles.findIndex(a => a.id === article.id)
    if (existingIndex >= 0) {
      allArticles[existingIndex] = article
    } else {
      // Nouvel article
      article.id = article.id || Date.now().toString()
      article.createdAt = article.createdAt || new Date().toISOString()
      article.updatedAt = new Date().toISOString()
      allArticles.push(article)
    }

    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(allArticles))
    return article
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'article:', error)
    throw error
  }
}

export function deleteArticle(articleId) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES)
    if (!stored) return false
    const allArticles = JSON.parse(stored)
    const filtered = allArticles.filter(a => a.id !== articleId)
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    return false
  }
}

export function getAllArticles() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les articles:', error)
    return []
  }
}

/**
 * Régulateurs
 */
export function getRegulator(countryCode) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REGULATORS)
    if (!stored) return null
    const regulators = JSON.parse(stored)
    return regulators.find(r => r.countryCode === countryCode) || null
  } catch (error) {
    console.error('Erreur lors de la récupération du régulateur:', error)
    return null
  }
}

export function saveRegulator(regulator) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REGULATORS)
    const regulators = stored ? JSON.parse(stored) : []

    const existingIndex = regulators.findIndex(r => r.countryCode === regulator.countryCode)
    if (existingIndex >= 0) {
      regulators[existingIndex] = {
        ...regulators[existingIndex],
        ...regulator,
        updatedAt: new Date().toISOString()
      }
    } else {
      regulators.push({
        ...regulator,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    localStorage.setItem(STORAGE_KEYS.REGULATORS, JSON.stringify(regulators))
    return regulator
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du régulateur:', error)
    throw error
  }
}

export function getAllRegulators() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REGULATORS)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Erreur lors de la récupération des régulateurs:', error)
    return []
  }
}

/**
 * Producteurs
 */
export function getProducersByCountry(countryCode) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCERS)
    if (!stored) return []
    const allProducers = JSON.parse(stored)
    return allProducers.filter(p => p.countryCode === countryCode) || []
  } catch (error) {
    console.error('Erreur lors de la récupération des producteurs:', error)
    return []
  }
}

export function saveProducer(producer) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCERS)
    const allProducers = stored ? JSON.parse(stored) : []

    const existingIndex = allProducers.findIndex(p => p.id === producer.id)
    if (existingIndex >= 0) {
      allProducers[existingIndex] = producer
    } else {
      producer.id = producer.id || Date.now().toString()
      producer.createdAt = new Date().toISOString()
      allProducers.push(producer)
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCERS, JSON.stringify(allProducers))
    return producer
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du producteur:', error)
    throw error
  }
}

export function deleteProducer(producerId) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCERS)
    if (!stored) return false
    const allProducers = JSON.parse(stored)
    const filtered = allProducers.filter(p => p.id !== producerId)
    localStorage.setItem(STORAGE_KEYS.PRODUCERS, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression du producteur:', error)
    return false
  }
}

/**
 * Données CSV (pour modification)
 */
export function getCSVData(csvFileName) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CSV_DATA)
    if (!stored) return null
    const csvData = JSON.parse(stored)
    return csvData[csvFileName] || null
  } catch (error) {
    console.error('Erreur lors de la récupération des données CSV:', error)
    return null
  }
}

export function saveCSVData(csvFileName, data) {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CSV_DATA)
    const csvData = stored ? JSON.parse(stored) : {}
    csvData[csvFileName] = {
      data,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEYS.CSV_DATA, JSON.stringify(csvData))
    return true
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données CSV:', error)
    return false
  }
}

/**
 * Export/Import des données
 */
export function exportAllData() {
  try {
    return {
      articles: getAllArticles(),
      regulators: getAllRegulators(),
      producers: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCERS) || '[]'),
      csvData: JSON.parse(localStorage.getItem(STORAGE_KEYS.CSV_DATA) || '{}'),
      exportedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    return null
  }
}

export function importAllData(data) {
  try {
    if (data.articles) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(data.articles))
    }
    if (data.regulators) {
      localStorage.setItem(STORAGE_KEYS.REGULATORS, JSON.stringify(data.regulators))
    }
    if (data.producers) {
      localStorage.setItem(STORAGE_KEYS.PRODUCERS, JSON.stringify(data.producers))
    }
    if (data.csvData) {
      localStorage.setItem(STORAGE_KEYS.CSV_DATA, JSON.stringify(data.csvData))
    }
    return true
  } catch (error) {
    console.error('Erreur lors de l\'import:', error)
    return false
  }
}

/**
 * Réinitialiser toutes les données
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error)
    return false
  }
}
