// Service pour gérer les données via Supabase
// Les données sont stockées et récupérées depuis Supabase

import * as supabaseService from './supabaseService.js'

// Fonction helper pour transformer les données Supabase en format attendu
function transformArticleFromSupabase(article) {
  return {
    id: article.id,
    countryCode: article.country_code,
    title: article.title,
    excerpt: article.excerpt || '',
    category: article.category || '',
    date: article.date,
    image: article.image || '',
    sourceUrl: article.source_url || '',
    readTime: article.read_time || '5',
    content: typeof article.content === 'string' ? JSON.parse(article.content || '[]') : (article.content || [])
  }
}

function transformFlashInfoFromSupabase(flashInfo) {
  return {
    id: flashInfo.id,
    countryCode: flashInfo.country_code,
    date: flashInfo.date,
    text: flashInfo.text || '',
    isActive: flashInfo.is_active !== false
  }
}

function transformRegulatorFromSupabase(regulator) {
  return {
    countryCode: regulator.country_code,
    name: regulator.name || '',
    description: regulator.description || '',
    logo: regulator.logo || '',
    website: regulator.website || ''
  }
}

function transformProducerFromSupabase(producer) {
  return {
    id: producer.id,
    countryCode: producer.country_code,
    name: producer.name || '',
    type: producer.type || '',
    capacity: producer.capacity || ''
  }
}

// Articles Operations
export async function getArticlesByCountry(countryCode) {
  try {
    const articles = await supabaseService.getArticlesByCountry(countryCode)
    return articles.map(transformArticleFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return []
  }
}

export async function getAllArticles() {
  try {
    const articles = await supabaseService.getAllArticles()
    return articles.map(transformArticleFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les articles:', error)
    return []
  }
}

export async function saveArticle(article) {
  try {
    await supabaseService.saveArticle(article)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'article:', error)
    throw error
  }
}

export async function deleteArticle(articleId) {
  try {
    await supabaseService.deleteArticle(articleId)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    throw error
  }
}

// Flash Info Operations
export async function getFlashInfoByCountry(countryCode) {
  try {
    const flashInfo = await supabaseService.getFlashInfoByCountry(countryCode)
    return flashInfo.map(transformFlashInfoFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération des flash info:', error)
    return []
  }
}

export async function getAllFlashInfo() {
  try {
    const flashInfo = await supabaseService.getAllFlashInfo()
    return flashInfo.map(transformFlashInfoFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les flash info:', error)
    return []
  }
}

export async function saveFlashInfo(flashInfo) {
  try {
    await supabaseService.saveFlashInfo(flashInfo)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la flash info:', error)
    throw error
  }
}

export async function deleteFlashInfo(id) {
  try {
    await supabaseService.deleteFlashInfo(id)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la suppression de la flash info:', error)
    throw error
  }
}

// Régulateurs Operations
export async function getAllRegulators() {
  try {
    const regulators = await supabaseService.getAllRegulators()
    return regulators.map(transformRegulatorFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération des régulateurs:', error)
    return []
  }
}

export async function getRegulator(countryCode) {
  try {
    const regulator = await supabaseService.getRegulator(countryCode)
    return regulator ? transformRegulatorFromSupabase(regulator) : null
  } catch (error) {
    console.error('Erreur lors de la récupération du régulateur:', error)
    return null
  }
}

export async function saveRegulator(regulator) {
  try {
    await supabaseService.saveRegulator(regulator)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du régulateur:', error)
    throw error
  }
}

export async function deleteRegulator(countryCode) {
  try {
    await supabaseService.deleteRegulator(countryCode)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la suppression du régulateur:', error)
    throw error
  }
}

// Producteurs Operations
export async function getProducersByCountry(countryCode) {
  try {
    const producers = await supabaseService.getProducersByCountry(countryCode)
    return producers.map(transformProducerFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération des producteurs:', error)
    return []
  }
}

export async function getAllProducers() {
  try {
    const producers = await supabaseService.getAllProducers()
    return producers.map(transformProducerFromSupabase)
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les producteurs:', error)
    return []
  }
}

export async function saveProducer(producer) {
  try {
    await supabaseService.saveProducer(producer)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du producteur:', error)
    throw error
  }
}

export async function deleteProducer(producerId) {
  try {
    await supabaseService.deleteProducer(producerId)
    // L'événement est déjà déclenché dans supabaseService
  } catch (error) {
    console.error('Erreur lors de la suppression du producteur:', error)
    throw error
  }
}

// Fonction pour réinitialiser le cache (plus nécessaire avec Supabase, mais gardée pour compatibilité)
export function clearCache() {
  // Pas de cache local avec Supabase
}

// Fonction pour exporter toutes les données (depuis Supabase)
export async function exportAllData() {
  try {
    const [articles, flashInfo, regulators, producers] = await Promise.all([
      getAllArticles(),
      getAllFlashInfo(),
      getAllRegulators(),
      getAllProducers()
    ])

    return {
      articles,
      flashInfo,
      regulators,
      producers
    }
  } catch (error) {
    console.error('Erreur lors de l\'export des données:', error)
    return {
      articles: [],
      flashInfo: [],
      regulators: [],
      producers: []
    }
  }
}

// Fonction pour importer des données (vers Supabase)
export async function importAllData(data) {
  try {
    if (data.articles && Array.isArray(data.articles)) {
      for (const article of data.articles) {
        await saveArticle(article)
      }
    }
    if (data.flashInfo && Array.isArray(data.flashInfo)) {
      for (const flashInfo of data.flashInfo) {
        await saveFlashInfo(flashInfo)
      }
    }
    if (data.regulators && Array.isArray(data.regulators)) {
      for (const regulator of data.regulators) {
        await saveRegulator(regulator)
      }
    }
    if (data.producers && Array.isArray(data.producers)) {
      for (const producer of data.producers) {
        await saveProducer(producer)
      }
    }

    // Déclencher les événements de mise à jour
    window.dispatchEvent(new CustomEvent('articles-updated'))
    window.dispatchEvent(new CustomEvent('flash-info-updated'))
    window.dispatchEvent(new CustomEvent('regulators-updated'))
    window.dispatchEvent(new CustomEvent('producers-updated'))
  } catch (error) {
    console.error('Erreur lors de l\'import des données:', error)
    throw error
  }
}
