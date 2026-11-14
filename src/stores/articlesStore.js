import { ref, computed } from 'vue'

const STORAGE_KEY = 'emmanuel_gbra_articles_v4'

const INITIAL_ARTICLES = [
  {
    id: 7,
    title: 'Transmettre des données, du Bluetooth vers des satellites : c’est désormais possible !',
    excerpt: 'C’est ce qu’a développé Hubble Network, une startup américaine qui travaille sur une nouvelle façon de connecter les objets du quotidien : utiliser la même technologie Bluetooth que nos smartphones pour envoyer des informations directement vers des satellites, sans carte SIM, sans réseau cellulaire et sans modem satellite.',
    url: '/article/7',
    category: 'CONNECTIVITÉ SATELLITE & IOT',
    date: '14 Novembre 2026',
    author: 'Emmanuel GBRA',
    isPdf: false,
    isPostView: true,
    isNews: true,
    image: '/images/articles/iot-esp32-satellite-architecture.jpg',
    caption: '© Emmanuel GBRA · Architecture IoT ESP32-C6, Télémétrie Bluetooth & Liaison Satellite Hubble Cloud',
    fullContent: [
      "C’est ce qu’a développé Hubble Network, une startup américaine qui travaille sur une nouvelle façon de connecter les objets du quotidien.",
      "Le principe est assez surprenant : utiliser la même technologie Bluetooth que celle de nos smartphones et objets connectés pour envoyer des informations directement vers des satellites.",
      "Concrètement, un capteur équipé d'une puce Bluetooth compatible peut envoyer un petit message vers un satellite Hubble, sans carte SIM, sans réseau téléphonique et sans modem satellite. Pour y parvenir, Hubble a adapté le fonctionnement du Bluetooth afin que le signal puisse être reçu et interprété par ses satellites. Les informations transmises sont courtes, jusqu'à 13 octets, soit seulement quelques caractères ou données numériques.",
      "Prenons un exemple : un forage situé dans une zone rurale sans couverture téléphonique. Un petit boîtier équipé d'un capteur peut mesurer le niveau d'eau et surveiller le fonctionnement de la pompe. Il transmet régulièrement ces informations par Bluetooth. Un satellite Hubble qui passe au-dessus du site peut alors recevoir le message et le transmettre vers une plateforme accessible à distance.",
      "L'exploitant peut ainsi surveiller son installation sans devoir se rendre systématiquement sur place.",
      "Cette technologie ouvre des possibilités intéressantes pour l'agriculture, la gestion de l'eau, le suivi des équipements industriels ou la surveillance environnementale.",
      "Et si d'autres opérateurs satellitaires et fabricants de composants électroniques adoptaient cette approche ? Les systèmes embarqués pourraient demain combiner plusieurs moyens de communication : Bluetooth pour les échanges locaux, réseau mobile lorsque disponible et satellite dans les zones isolées.",
      "On pourrait ainsi connecter beaucoup plus d'équipements, avec des solutions moins complexes et potentiellement moins coûteuses.",
      "Une évolution à suivre de très près pour l'avenir de l'IoT et des systèmes embarqués !"
    ],
    resources: [
      { label: 'Documentation officielle Hubble Network', url: 'https://hubble.com/docs' },
      { label: 'Présentation de la technologie Hubble', url: 'https://hubble.com/' },
      { label: 'SDK et exemples de code', url: 'https://github.com/Hubble-Network' },
      { label: 'Ressources de développement ESP32-C6', url: 'https://www.espressif.com/en/products/socs/esp32-c6' }
    ],
    tags: ['#IoT', '#Bluetooth', '#ESP32', '#SystèmesEmbarqués', '#ConnectivitéSatellite', '#Innovation']
  },
  {
    id: 1,
    title: 'Outils d\'analyse KPI - Épisode 4 : Pilotage Industriel Avancé',
    excerpt: 'Nouvelles méthodologies et métriques avancées pour le pilotage de la performance industrielle et la surveillance proactive d\'équipements à haute criticité.',
    url: '/pdf/outils-analyse-kpi-ep4.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: '05 Mai 2026',
    author: 'Emmanuel GBRA',
    isPdf: true,
    isNews: true,
    image: '/images/articles/cover-outils-analyse-kpi-ep4.png'
  },
  {
    id: 2,
    title: 'Outils d\'analyse KPI - Épisode 3 : Algorithmes & Indicateurs Clés',
    excerpt: 'Travaux de recherche approfondis sur les indicateurs clés de maintenance prédictive, modélisation mathématique et corrélation temps réel de capteurs thermiques.',
    url: '/pdf/outils-analyse-kpi.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: '28 Avril 2026',
    author: 'Emmanuel GBRA',
    isPdf: true,
    isNews: true,
    image: '/images/articles/cover-outils-analyse-kpi.png'
  },
  {
    id: 3,
    title: 'Outils d\'analyse KPI - Épisode 2 : Suivi de Performance Énergétique',
    excerpt: 'Guide pratique et cadre méthodologique sur les outils d\'analyse et métriques essentielles pour le diagnostic thermique et le suivi énergétique des installations.',
    url: '/pdf/maintenance-predictive-kpi.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: '21 Avril 2026',
    author: 'Emmanuel GBRA',
    isPdf: true,
    isNews: true,
    image: '/images/articles/cover-maintenance-predictive-kpi.png'
  },
  {
    id: 4,
    title: 'L\'Ère de l\'IA en Industrie : Cas Concrets de Fabricants (Épisode 14)',
    excerpt: 'Études de cas réels et retours d\'expérience sur l\'impact de l\'IA dans l\'industrie manufacturière, l\'automatisation prédictive et la fiabilisation des processus de fabrication.',
    url: '/pdf/maintenance-predictive-ep14.pdf',
    category: 'MAINTENANCE PRÉDICTIVE',
    date: '17 Septembre 2026',
    author: 'Emmanuel GBRA',
    isPdf: true,
    isNews: true,
    image: '/images/articles/cover-maintenance-predictive-ep14.png'
  },
  {
    id: 5,
    title: 'Machine Learning et Production d\'Électricité : Un Duo Gagnant',
    excerpt: 'Comment l\'IA optimise le fonctionnement des turbines à gaz, prédit les anomalies thermomécaniques et stabilise la production du réseau électrique en Afrique de l\'Ouest.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-production-d%C3%A9lectricit%C3%A9-un-duo-gagnant-fd8a0cc80275',
    category: 'DATA SCIENCE & ML',
    date: '15 Mars 2026',
    author: 'Emmanuel GBRA',
    isPdf: false,
    isNews: false,
    image: '/images/articles/cover-outils-analyse-kpi-ep4.png'
  },
  {
    id: 6,
    title: 'Smart Meters & IoT : Révolution des Compteurs Intelligents en Afrique',
    excerpt: 'Exploitation des données massives issues de compteurs communicants par des modèles de prédiction de charge pour minimiser les pertes non techniques et moderniser le réseau.',
    url: 'https://medium.com/@emmanuelgbra88/machine-learning-et-compteurs-%C3%A9lectriques-intelligents-une-opportunit%C3%A9-pour-la-c%C3%B4te-divoire-1f72a4580bd0',
    category: 'IOT & SMART GRID',
    date: '02 Février 2026',
    author: 'Emmanuel GBRA',
    isPdf: false,
    isNews: false,
    image: '/images/articles/cover-outils-analyse-kpi.png'
  }
]

function loadInitialArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Erreur de lecture localStorage articles, utilisation des données initiales:', err)
  }
  return INITIAL_ARTICLES
}

const articlesList = ref(loadInitialArticles())

function saveArticles() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articlesList.value))
  } catch (err) {
    console.error('Erreur lors de la sauvegarde des articles:', err)
  }
}

export function useArticlesStore() {
  const articles = computed(() => articlesList.value)
  
  // Articles tagués comme "Nouvelles" (ou les plus récents si aucun taggé)
  const newsArticles = computed(() => {
    const news = articlesList.value.filter(a => a.isNews)
    return news.length > 0 ? news : articlesList.value.slice(0, 3)
  })

  // Articles spécifiques à la Maintenance Prédictive
  const maintenanceArticles = computed(() => {
    return articlesList.value.filter(a => 
      a.category === 'MAINTENANCE PRÉDICTIVE' ||
      a.title.toLowerCase().includes('kpi') ||
      a.title.toLowerCase().includes('maintenance')
    )
  })

  function addArticle(newArt) {
    const id = Date.now()
    const article = {
      id,
      title: newArt.title || 'Nouvel article',
      excerpt: newArt.excerpt || '',
      url: newArt.url || '',
      category: newArt.category || 'MAINTENANCE PRÉDICTIVE',
      date: newArt.date || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      author: newArt.author || 'Emmanuel GBRA',
      isPdf: Boolean(newArt.isPdf),
      isNews: newArt.isNews !== undefined ? Boolean(newArt.isNews) : true,
      image: newArt.image || '/images/articles/maintenance-predictive-cover.png',
      content: newArt.content || ''
    }
    articlesList.value.unshift(article)
    saveArticles()
    return article
  }

  function updateArticle(id, updatedFields) {
    const idx = articlesList.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      articlesList.value[idx] = { ...articlesList.value[idx], ...updatedFields }
      saveArticles()
      return true
    }
    return false
  }

  function deleteArticle(id) {
    articlesList.value = articlesList.value.filter(a => a.id !== id)
    saveArticles()
  }

  function toggleNews(id) {
    const art = articlesList.value.find(a => a.id === id)
    if (art) {
      art.isNews = !art.isNews
      saveArticles()
    }
  }

  function resetToDefault() {
    articlesList.value = JSON.parse(JSON.stringify(INITIAL_ARTICLES))
    saveArticles()
  }

  return {
    articles,
    newsArticles,
    maintenanceArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    toggleNews,
    resetToDefault
  }
}
