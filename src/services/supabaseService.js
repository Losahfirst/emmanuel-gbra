// Service Supabase pour gérer les données
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wpseupypaffxkhxwnzfx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwc2V1cHlwYWZmeGtoeHduemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyNjYyODksImV4cCI6MjA4MTg0MjI4OX0.Qkk_iPokdNU1wZfygwP-aqjS-DmyXZFsMXy_5vZ54zA'

// Créer le client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Articles Operations
export async function getArticlesByCountry(countryCode) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('country_code', countryCode)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return []
  }
}

export async function getAllArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les articles:', error)
    return []
  }
}

export async function saveArticle(article) {
  try {
    // Préparer les données pour Supabase
    const articleData = {
      country_code: article.countryCode,
      title: article.title,
      excerpt: article.excerpt || '',
      category: article.category || '',
      date: article.date || new Date().toISOString(),
      image: article.image || '',
      source_url: article.sourceUrl || '',
      read_time: article.readTime || '5',
      content: typeof article.content === 'string' ? article.content : JSON.stringify(article.content || [])
    }

    // Vérifier si c'est une mise à jour (id existant) ou une insertion (nouveau)
    if (article.id && typeof article.id === 'number') {
      // Mise à jour - seulement si l'ID est un nombre (généré par Supabase)
      const { data, error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', article.id)
        .select()

      if (error) throw error

      // Déclencher un événement pour rafraîchir l'affichage
      window.dispatchEvent(new CustomEvent('articles-updated'))
      return data?.[0]
    } else {
      // Insertion
      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()

      if (error) throw error

      // Déclencher un événement pour rafraîchir l'affichage
      window.dispatchEvent(new CustomEvent('articles-updated'))
      return data?.[0]
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'article:', error)
    throw error
  }
}

export async function deleteArticle(articleId) {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId)

    if (error) throw error

    // Déclencher un événement pour rafraîchir l'affichage
    window.dispatchEvent(new CustomEvent('articles-updated'))
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    throw error
  }
}

// Flash Info Operations
export async function getFlashInfoByCountry(countryCode) {
  try {
    const { data, error } = await supabase
      .from('flash_info')
      .select('*')
      .eq('country_code', countryCode)
      .eq('is_active', true)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des flash info:', error)
    return []
  }
}

export async function getAllFlashInfo() {
  try {
    const { data, error } = await supabase
      .from('flash_info')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les flash info:', error)
    return []
  }
}

export async function saveFlashInfo(flashInfo) {
  try {
    const flashInfoData = {
      country_code: flashInfo.countryCode,
      date: flashInfo.date || new Date().toISOString(),
      text: flashInfo.text || '',
      is_active: flashInfo.isActive !== false
    }

    if (flashInfo.id) {
      // Mise à jour
      const { data, error } = await supabase
        .from('flash_info')
        .update(flashInfoData)
        .eq('id', flashInfo.id)
        .select()

      if (error) throw error
      window.dispatchEvent(new CustomEvent('flash-info-updated'))
      return data?.[0]
    } else {
      // Insertion
      const { data, error } = await supabase
        .from('flash_info')
        .insert(flashInfoData)
        .select()

      if (error) throw error
      window.dispatchEvent(new CustomEvent('flash-info-updated'))
      return data?.[0]
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la flash info:', error)
    throw error
  }
}

export async function deleteFlashInfo(id) {
  try {
    const { error } = await supabase
      .from('flash_info')
      .delete()
      .eq('id', id)

    if (error) throw error
    window.dispatchEvent(new CustomEvent('flash-info-updated'))
  } catch (error) {
    console.error('Erreur lors de la suppression de la flash info:', error)
    throw error
  }
}

// Régulateurs Operations
export async function getAllRegulators() {
  try {
    const { data, error } = await supabase
      .from('regulators')
      .select('*')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des régulateurs:', error)
    return []
  }
}

export async function getRegulator(countryCode) {
  try {
    const { data, error } = await supabase
      .from('regulators')
      .select('*')
      .eq('country_code', countryCode)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Aucun résultat trouvé
        return null
      }
      throw error
    }
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération du régulateur:', error)
    return null
  }
}

export async function saveRegulator(regulator) {
  try {
    const regulatorData = {
      country_code: regulator.countryCode,
      name: regulator.name || '',
      description: regulator.description || '',
      logo: regulator.logo || '',
      website: regulator.website || ''
    }

    // Vérifier si le régulateur existe déjà
    const existing = await getRegulator(regulator.countryCode)

    if (existing) {
      // Mise à jour
      const { data, error } = await supabase
        .from('regulators')
        .update(regulatorData)
        .eq('country_code', regulator.countryCode)
        .select()

      if (error) throw error
      window.dispatchEvent(new CustomEvent('regulators-updated'))
      return data?.[0]
    } else {
      // Insertion
      const { data, error } = await supabase
        .from('regulators')
        .insert(regulatorData)
        .select()

      if (error) throw error
      window.dispatchEvent(new CustomEvent('regulators-updated'))
      return data?.[0]
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du régulateur:', error)
    throw error
  }
}

export async function deleteRegulator(countryCode) {
  try {
    const { error } = await supabase
      .from('regulators')
      .delete()
      .eq('country_code', countryCode)

    if (error) throw error
    window.dispatchEvent(new CustomEvent('regulators-updated'))
  } catch (error) {
    console.error('Erreur lors de la suppression du régulateur:', error)
    throw error
  }
}

// Producteurs Operations
export async function getProducersByCountry(countryCode) {
  try {
    const { data, error } = await supabase
      .from('producers')
      .select('*')
      .eq('country_code', countryCode)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des producteurs:', error)
    return []
  }
}

export async function getAllProducers() {
  try {
    const { data, error } = await supabase
      .from('producers')
      .select('*')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les producteurs:', error)
    return []
  }
}

export async function saveProducer(producer) {
  try {
    const producerData = {
      country_code: producer.countryCode,
      name: producer.name || '',
      type: producer.type || '',
      capacity: producer.capacity || ''
    }

    if (producer.id) {
      // Mise à jour
      const { data, error } = await supabase
        .from('producers')
        .update(producerData)
        .eq('id', producer.id)
        .select()

      if (error) throw error
      window.dispatchEvent(new CustomEvent('producers-updated'))
      return data?.[0]
    } else {
      // Insertion
      const { data, error } = await supabase
        .from('producers')
        .insert(producerData)
        .select()

      if (error) throw error
      window.dispatchEvent(new CustomEvent('producers-updated'))
      return data?.[0]
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du producteur:', error)
    throw error
  }
}

export async function deleteProducer(producerId) {
  try {
    const { error } = await supabase
      .from('producers')
      .delete()
      .eq('id', producerId)

    if (error) throw error
    window.dispatchEvent(new CustomEvent('producers-updated'))
  } catch (error) {
    console.error('Erreur lors de la suppression du producteur:', error)
    throw error
  }
}
