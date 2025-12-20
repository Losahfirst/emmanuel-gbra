<template>
  <div class="blog-section">
    <div class="blog-header">
      <h2 class="blog-title">Actualité Énergétique - {{ countryStore.selectedCountry.name }}</h2>
      <p class="blog-subtitle">Restez informé des dernières nouvelles sur le secteur énergétique {{ countryStore.selectedCountry.name === 'Côte d\'Ivoire' ? 'ivoirien' : 'de ' + countryStore.selectedCountry.name }}</p>
    </div>

    <div class="blog-grid">
      <article
        v-for="article in articles"
        :key="article.id"
        class="blog-card"
        @click="selectArticle(article)"
      >
        <div class="blog-card-image">
          <img 
            :src="article.image" 
            :alt="article.title"
            @error="handleImageError"
            class="blog-image"
          />
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-category">{{ article.category }}</span>
            <span class="blog-date">{{ formatDate(article.date) }}</span>
          </div>
          <h3 class="blog-card-title">{{ article.title }}</h3>
          <p class="blog-card-excerpt">{{ article.excerpt }}</p>
          <div class="blog-card-footer">
            <span class="blog-read-time">{{ article.readTime }} min de lecture</span>
            <div class="blog-actions">
              <a 
                v-if="article.sourceUrl" 
                :href="article.sourceUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="blog-source-link"
                @click.stop
              >
                Source
              </a>
              <button class="blog-read-more">Lire la suite →</button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Article Detail Modal -->
    <div v-if="selectedArticle" class="modal-overlay" @click="closeArticle">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-header-content">
            <span class="modal-category">{{ selectedArticle.category }}</span>
            <h2 class="modal-title">{{ selectedArticle.title }}</h2>
            <div class="modal-meta">
              <span class="modal-date">{{ formatDate(selectedArticle.date) }}</span>
              <span class="modal-read-time">{{ selectedArticle.readTime }} min de lecture</span>
            </div>
          </div>
          <button @click="closeArticle" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <div class="article-content">
            <div v-for="(paragraph, index) in selectedArticle.content" :key="index" class="article-paragraph">
              <h4 v-if="paragraph.type === 'heading'" class="article-heading">{{ paragraph.text }}</h4>
              <p v-else class="article-text">{{ paragraph.text }}</p>
            </div>
          </div>
          <div v-if="selectedArticle.sourceUrl" class="article-source">
            <a 
              :href="selectedArticle.sourceUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="source-link"
            >
              <ExternalLink :size="16" />
              <span>Lire l'article original</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { Zap, Leaf, TrendingUp, Building2, X } from 'lucide-vue-next'
import { getAnalyticsData } from '../../../../services/realDataService.js'
import { useCountryStore } from '../../../../stores/countryStore.js'

const countryStore = useCountryStore()
const selectedArticle = ref(null)
const analyticsData = ref(null)

// Fonction pour charger les articles selon le pays
async function loadArticlesForCountry() {
  if (countryStore.selectedCountry.hasData) {
    analyticsData.value = await getAnalyticsData()
    updateArticlesWithRealData()
  } else {
    // Pour les pays sans données, utiliser des articles génériques
    loadGenericArticles()
  }
}

// Surveiller les changements de pays
watch(() => countryStore.selectedCountryCode, async () => {
  await loadArticlesForCountry()
}, { immediate: true })

onMounted(async () => {
  // Charger les articles selon le pays sélectionné au montage
  await loadArticlesForCountry()
})

function updateArticlesWithRealData() {
  if (!analyticsData.value) return
  
  const prod = analyticsData.value.productionBrute || []
  const cons = analyticsData.value.consumption || []
  const installed = analyticsData.value.installedPower || []
  const peak = analyticsData.value.peakPower || []
  const rural = analyticsData.value.ruralElectrification || []
  
  // Trouver les dernières données disponibles
  const latestProd = prod[prod.length - 1]
  const latestCons = cons[cons.length - 1]
  const latestInstalled = installed[installed.length - 1]
  const latestPeak = peak[peak.length - 1]
  const latestRural = rural[rural.length - 1]
  
  // Calculer les tendances
  const prod2020 = prod.find(p => p.year === 2020)
  const prod2015 = prod.find(p => p.year === 2015)
  const prodTrend = prod2020 && prod2015 
    ? ((prod2020.total - prod2015.total) / prod2015.total * 100).toFixed(1)
    : '5.2'
  
  const cons2020 = cons.find(c => c.year === 2020)
  const cons2015 = cons.find(c => c.year === 2015)
  const consTrend = cons2020 && cons2015
    ? ((cons2020.total - cons2015.total) / cons2015.total * 100).toFixed(1)
    : '8.5'
  
  // Créer une nouvelle copie des articles pour forcer la réactivité, en préservant image et sourceUrl
  const updatedArticles = articles.value.map(article => ({ 
    ...article,
    image: article.image || 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=400&fit=crop',
    sourceUrl: article.sourceUrl || 'https://www.example.com/article'
  }))
  
  // Mettre à jour les articles avec les vraies données
  if (updatedArticles.length > 0 && latestProd) {
    updatedArticles[0].content = [
      { type: 'text', text: `Le gouvernement ivoirien a annoncé aujourd'hui le lancement d'un ambitieux projet de parc solaire dans la région du nord du pays. Ce projet, d'une capacité de 50 mégawatts, représente une étape importante dans la transition énergétique de la Côte d'Ivoire.` },
      { type: 'heading', text: 'Impact sur le mix énergétique' },
      { type: 'text', text: `Avec ce nouveau parc, la part des énergies renouvelables dans le mix énergétique ivoirien devrait passer de ${Math.round((latestProd.hydraulic / latestProd.total) * 100)}% à près de ${Math.round((latestProd.hydraulic / latestProd.total) * 100) + 5}% d'ici 2025. Cette augmentation contribuera à réduire la dépendance aux énergies fossiles et à diminuer l'empreinte carbone du pays.` }
    ]
  }
  
  if (updatedArticles.length > 1 && latestInstalled) {
    updatedArticles[1].content[0].text = `Le ministère de l'Énergie a dévoilé un plan ambitieux de modernisation du réseau électrique national. La puissance installée totale s'élève actuellement à ${latestInstalled.total} MW (${latestInstalled.hydraulic} MW hydraulique, ${latestInstalled.thermal} MW thermique).`
  }
  
  if (updatedArticles.length > 2 && latestCons) {
    updatedArticles[2].content[0].text = `Les programmes d'efficacité énergétique mis en place par le gouvernement ivoirien portent leurs fruits. La consommation nationale en ${latestCons.year} s'élève à ${latestCons.total.toLocaleString('fr-FR')} GWh (${latestCons.bt.toLocaleString('fr-FR')} GWh BT, ${latestCons.htmt.toLocaleString('fr-FR')} GWh HT/MT).`
  }
  
  if (updatedArticles.length > 3 && latestProd) {
    const renewableRatio = (latestProd.hydraulic / latestProd.total * 100).toFixed(1)
    updatedArticles[3].content[0].text = `Le gouvernement ivoirien a présenté son nouveau plan de transition énergétique, visant à porter la part des énergies renouvelables à 50% d'ici 2030. Actuellement, cette part s'élève à environ ${renewableRatio}% (${latestProd.hydraulic} GWh hydraulique sur ${latestProd.total} GWh total).`
  }
  
  if (updatedArticles.length > 4 && latestInstalled) {
    updatedArticles[4].content[0].text = `La construction de la nouvelle centrale hydroélectrique de 200 MW sur le fleuve Sassandra progresse selon le calendrier prévu. Une fois opérationnelle, elle portera la capacité hydraulique installée de ${latestInstalled.hydraulic} MW à ${latestInstalled.hydraulic + 200} MW.`
  }
  
  if (updatedArticles.length > 5 && latestPeak) {
    updatedArticles[5].content[0].text = `La Côte d'Ivoire continue de renforcer sa position de leader dans l'exportation d'électricité en Afrique de l'Ouest. La pointe maximale de consommation en ${latestPeak.year} a atteint ${latestPeak.peak} MW, démontrant la robustesse du réseau national.`
  }
  
  // Mettre à jour les articles avec une nouvelle référence
  articles.value = updatedArticles
}

// Articles génériques par pays
const genericArticlesByCountry = {
  'SN': [
    {
      id: 1,
      title: 'Sénégal : Transition vers le gaz domestique à partir de 2026',
      excerpt: 'Le Sénégal annonce l\'approvisionnement de toutes ses centrales électriques en gaz domestique à partir de 2026, générant près de 140 milliards FCFA d\'économies annuelles.',
      category: 'Politique Énergétique',
      date: new Date('2024-08-27'),
      readTime: 5,
      color: '#FACC15',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
      sourceUrl: 'https://www.economie.gouv.sn/sites/default/files/2025-08/Revue_de_presse_du_mercredi_27_aout_2025.pdf',
      content: [
        { type: 'text', text: 'Le Sénégal a annoncé son intention d\'approvisionner l\'ensemble de ses centrales électriques en gaz domestique à partir de 2026, mettant ainsi fin aux importations de combustibles. Cette transition stratégique devrait générer annuellement près de 140 milliards de francs CFA d\'économies.' },
        { type: 'heading', text: 'Souveraineté énergétique' },
        { type: 'text', text: 'Cette décision marque une avancée significative vers la souveraineté énergétique du pays, réduisant sa dépendance aux importations de combustibles fossiles et améliorant la stabilité de son approvisionnement énergétique.' },
        { type: 'heading', text: 'Impact économique' },
        { type: 'text', text: 'Les économies générées permettront de réinvestir dans le développement des infrastructures énergétiques et d\'accélérer la transition vers les énergies renouvelables.' }
      ]
    },
    {
      id: 2,
      title: 'Sénégal : Augmentation des abonnements électriques en 2024',
      excerpt: 'Le nombre de polices d\'abonnements électriques de l\'État est passé de 9 221 à 9 473 entre 2023 et 2024, avec une consommation totale de 431,6 kilowattheures.',
      category: 'Infrastructure',
      date: new Date('2024-10-28'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: 'https://www.economie.gouv.sn/sites/default/files/2025-11/Revue_de_presse_du_mardi_28_octobre_2025.pdf',
      content: [
        { type: 'text', text: 'Entre 2023 et 2024, le nombre de polices d\'abonnements de l\'État est passé de 9 221 à 9 473, soit 252 nouveaux abonnés, avec une consommation totale de 431,6 kilowattheures en 2024.' },
        { type: 'heading', text: 'Expansion de l\'accès' },
        { type: 'text', text: 'Cette augmentation souligne l\'expansion continue de l\'accès à l\'électricité dans le pays, contribuant à l\'amélioration des conditions de vie de la population sénégalaise.' },
        { type: 'heading', text: 'Développement du réseau' },
        { type: 'text', text: 'Le gouvernement continue d\'investir dans l\'extension du réseau électrique pour atteindre l\'objectif d\'électrification universelle.' }
      ]
    },
    {
      id: 3,
      title: 'Sénégal : Lancement du satellite GaïndéSat-1A',
      excerpt: 'Le Sénégal a lancé avec succès son premier satellite GaïndéSat-1A le 16 août 2024, renforçant ses capacités de surveillance et de gestion des ressources.',
      category: 'Innovation',
      date: new Date('2024-08-16'),
      readTime: 5,
      color: '#FACC15',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop',
      sourceUrl: 'https://www.geosenegal.gouv.sn/le-senegal-lance-son-premier-satellite-gaindesat-1a.html',
      content: [
        { type: 'text', text: 'Le 16 août 2024, le Sénégal a franchi une étape historique avec le lancement réussi de son premier satellite, GaïndéSat-1A, depuis la base de Vandenberg en Californie.' },
        { type: 'heading', text: 'Partenariat technologique' },
        { type: 'text', text: 'Développé en partenariat avec le Centre spatial universitaire de Montpellier, ce satellite permettra de collecter des données plusieurs fois par jour et de prendre des images du territoire sénégalais.' },
        { type: 'heading', text: 'Applications énergétiques' },
        { type: 'text', text: 'Les données satellitaires renforceront les capacités du pays en matière de surveillance et de gestion des ressources énergétiques, contribuant à une meilleure planification du secteur.' }
      ]
    }
  ],
  'GH': [
    {
      id: 1,
      title: 'Ghana : Projet de centrale nucléaire d\'ici 2030-2035',
      excerpt: 'Le Ghana envisage la construction d\'une centrale nucléaire pour porter la production d\'origine nucléaire à un tiers du mix énergétique d\'ici 2050.',
      category: 'Politique Énergétique',
      date: new Date('2024-12-15'),
      readTime: 6,
      color: '#8B5CF6',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'Le Ghana a annoncé son intention de construire une centrale nucléaire d\'ici 2030-2035. Cette initiative fait partie d\'une stratégie à long terme pour diversifier les sources d\'énergie et assurer la sécurité énergétique du pays.' },
        { type: 'heading', text: 'Objectifs' },
        { type: 'text', text: 'L\'objectif est de porter la production d\'électricité d\'origine nucléaire à un tiers du mix énergétique d\'ici 2050, réduisant ainsi la dépendance aux énergies fossiles.' },
        { type: 'heading', text: 'Barrage d\'Akosombo' },
        { type: 'text', text: 'Le barrage d\'Akosombo, d\'une capacité de 1020 MW, reste la principale source d\'hydroélectricité du pays, fournissant une base stable pour le réseau électrique ghanéen.' }
      ]
    },
    {
      id: 2,
      title: 'Barrage d\'Akosombo : Pilier énergétique du Ghana',
      excerpt: 'Le barrage d\'Akosombo, avec sa capacité de 1020 MW, continue de jouer un rôle central dans l\'approvisionnement électrique du Ghana.',
      category: 'Infrastructure',
      date: new Date('2024-12-10'),
      readTime: 5,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage d\'Akosombo, construit en 1965, reste la plus grande source d\'hydroélectricité du Ghana avec une capacité de 1020 MW.' },
        { type: 'heading', text: 'Importance stratégique' },
        { type: 'text', text: 'Ce barrage fournit une base stable pour le réseau électrique ghanéen et contribue à l\'exportation d\'électricité vers les pays voisins.' }
      ]
    }
  ],
  'NG': [
    {
      id: 1,
      title: 'Nigeria : Modernisation de la centrale d\'Egbin',
      excerpt: 'La plus grande centrale thermique d\'Afrique subsaharienne fait l\'objet d\'un programme de modernisation pour augmenter sa capacité à 1 320 MW.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'La centrale thermique d\'Egbin, située près de Lagos, est en cours de modernisation pour augmenter sa capacité de production. Cette centrale est l\'une des plus importantes d\'Afrique subsaharienne.' },
        { type: 'heading', text: 'Capacité' },
        { type: 'text', text: 'Une fois modernisée, la centrale devrait atteindre une capacité de 1 320 MW, contribuant significativement à l\'approvisionnement électrique du Nigeria.' },
        { type: 'heading', text: 'Barrage de Kainji' },
        { type: 'text', text: 'Le barrage de Kainji, d\'une capacité de 760 MW, continue de jouer un rôle central dans la production hydroélectrique du pays.' }
      ]
    },
    {
      id: 2,
      title: 'Barrage de Kainji : Modernisation des équipements',
      excerpt: 'Le barrage de Kainji, d\'une capacité de 760 MW, fait l\'objet d\'un programme de modernisation pour améliorer sa performance.',
      category: 'Infrastructure',
      date: new Date('2024-12-10'),
      readTime: 4,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage de Kainji, situé sur le fleuve Niger, est l\'une des principales sources d\'hydroélectricité du Nigeria avec une capacité de 760 MW.' },
        { type: 'heading', text: 'Modernisation' },
        { type: 'text', text: 'Un programme de modernisation est en cours pour améliorer l\'efficacité des turbines et augmenter la disponibilité de la centrale.' }
      ]
    }
  ],
  'ML': [
    {
      id: 1,
      title: 'Mali : Barrage de Taoussa en construction',
      excerpt: 'Le nouveau barrage de Taoussa sur le fleuve Niger devrait produire 25 MW d\'hydroélectricité et améliorer la navigation fluviale.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage de Taoussa, en construction sur le fleuve Niger près de Bourem, représente un projet majeur pour le Mali. Il devrait produire 25 MW d\'hydroélectricité.' },
        { type: 'heading', text: 'Bénéfices multiples' },
        { type: 'text', text: 'En plus de la production d\'électricité, le barrage améliorera la navigation fluviale et contribuera à l\'irrigation des terres agricoles.' },
        { type: 'heading', text: 'Barrage de Sélingué' },
        { type: 'text', text: 'Le barrage de Sélingué, d\'une capacité de 46 MW, continue de fournir de l\'électricité à plusieurs villes dont Bamako, produisant environ 247 GWh annuellement.' }
      ]
    },
    {
      id: 2,
      title: 'Barrage de Sélingué : Production stable',
      excerpt: 'Le barrage de Sélingué, dans la région de Sikasso, continue de fournir une production stable d\'électricité au Mali.',
      category: 'Infrastructure',
      date: new Date('2024-12-10'),
      readTime: 4,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage de Sélingué, d\'une puissance de 46 MW, produit annuellement environ 247 GWh, fournissant de l\'électricité à plusieurs villes dont Bamako.' },
        { type: 'heading', text: 'Impact régional' },
        { type: 'text', text: 'Cette infrastructure joue un rôle crucial dans l\'approvisionnement électrique de la région de Sikasso et de la capitale.' }
      ]
    }
  ],
  'BF': [
    {
      id: 1,
      title: 'Burkina Faso : Expansion de la centrale solaire de Zagtouli',
      excerpt: 'La plus grande centrale solaire d\'Afrique de l\'Ouest à l\'époque de son inauguration en 2017 fait l\'objet d\'un projet d\'expansion.',
      category: 'Énergies Renouvelables',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#FACC15',
      icon: Zap,
      content: [
        { type: 'text', text: 'La centrale solaire photovoltaïque de Zagtouli, située près de Ouagadougou, était la plus grande d\'Afrique de l\'Ouest lors de son inauguration en 2017 avec une capacité de 33 MWc.' },
        { type: 'heading', text: 'Expansion prévue' },
        { type: 'text', text: 'Un projet d\'expansion est en cours pour augmenter la capacité de la centrale, renforçant ainsi la position du Burkina Faso dans les énergies renouvelables.' },
        { type: 'heading', text: 'Impact' },
        { type: 'text', text: 'Cette centrale contribue significativement à l\'approvisionnement électrique de la capitale et réduit la dépendance aux énergies fossiles.' }
      ]
    },
    {
      id: 2,
      title: 'Centrale thermique de Kossodo : Modernisation',
      excerpt: 'La centrale thermique de Kossodo, d\'une capacité de 50 MW, fait l\'objet d\'un programme de modernisation.',
      category: 'Infrastructure',
      date: new Date('2024-12-10'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'La centrale thermique de Kossodo, située à Ouagadougou, est un élément important du réseau électrique burkinabè avec une capacité de 50 MW.' },
        { type: 'heading', text: 'Modernisation' },
        { type: 'text', text: 'Un programme de modernisation est en cours pour améliorer l\'efficacité et réduire les émissions de la centrale.' }
      ]
    }
  ],
  'NE': [
    {
      id: 1,
      title: 'Niger : Développement des centrales solaires',
      excerpt: 'Le Niger continue de développer ses capacités solaires avec les centrales de Gorou Banda et Malbaza.',
      category: 'Énergies Renouvelables',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#FACC15',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le Niger développe activement ses capacités solaires avec les centrales de Gorou Banda (7 MWc) et Malbaza (7 MWc), contribuant à diversifier le mix énergétique.' },
        { type: 'heading', text: 'Stratégie énergétique' },
        { type: 'text', text: 'Ces projets s\'inscrivent dans une stratégie nationale visant à augmenter la part des énergies renouvelables et à améliorer l\'accès à l\'électricité.' }
      ]
    }
  ],
  'TG': [
    {
      id: 1,
      title: 'Togo : Centrale KEKELI Efficient Power opérationnelle',
      excerpt: 'La centrale KEKELI Efficient Power de 65 MW, située dans la zone portuaire de Lomé, alimente plus de 250 000 foyers et contribue à 20% de la demande domestique.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'La centrale KEKELI Efficient Power, d\'une capacité de 65 MW, est située dans la zone portuaire de Lomé. Elle utilise une technologie de cycle combiné avec une turbine à gaz (47 MW) et un cycle à vapeur (18 MW), ce qui limite les émissions de CO₂.' },
        { type: 'heading', text: 'Impact' },
        { type: 'text', text: 'Cette centrale alimente plus de 250 000 foyers, soit environ 1,5 million de personnes, et contribue à hauteur de 20% à la demande domestique en électricité du Togo.' },
        { type: 'heading', text: 'Autres centrales' },
        { type: 'text', text: 'Le Togo dispose également des centrales thermiques de Kara (100 MW) et Lomé (80 MW) pour assurer l\'approvisionnement électrique national.' }
      ]
    },
    {
      id: 2,
      title: 'Togo : Modernisation du réseau électrique',
      excerpt: 'Le Togo investit dans la modernisation de ses centrales thermiques pour améliorer la fiabilité du réseau.',
      category: 'Infrastructure',
      date: new Date('2024-12-10'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'Le Togo poursuit ses efforts de modernisation du réseau électrique avec les centrales thermiques de Kara (100 MW) et Lomé (80 MW).' },
        { type: 'heading', text: 'Objectifs' },
        { type: 'text', text: 'Ces investissements visent à améliorer la fiabilité de l\'approvisionnement électrique et à réduire les coupures d\'électricité.' }
      ]
    }
  ],
  'BJ': [
    {
      id: 1,
      title: 'Bénin : Modernisation des centrales thermiques',
      excerpt: 'Le Bénin modernise ses centrales thermiques de Maria Gléta et Pobè pour améliorer l\'approvisionnement électrique.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'Le Bénin investit dans la modernisation de ses centrales thermiques, notamment celle de Maria Gléta (127 MW) à Cotonou et de Pobè (25 MW).' },
        { type: 'heading', text: 'Impact' },
        { type: 'text', text: 'Ces modernisations contribuent à améliorer la stabilité du réseau électrique béninois et à réduire les délestages.' }
      ]
    }
  ],
  'GN': [
    {
      id: 1,
      title: 'Guinée : Barrage de Souapiti opérationnel',
      excerpt: 'Le barrage de Souapiti, d\'une capacité de 450 MW, renforce significativement la production hydroélectrique guinéenne.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage de Souapiti, mis en service en 2020 avec une capacité de 450 MW, représente un projet majeur pour la Guinée.' },
        { type: 'heading', text: 'Impact' },
        { type: 'text', text: 'Ce barrage contribue significativement à l\'approvisionnement électrique du pays et renforce la capacité de production hydroélectrique.' },
        { type: 'heading', text: 'Barrage de Kaléta' },
        { type: 'text', text: 'Le barrage de Kaléta, d\'une capacité de 240 MW, complète le parc hydroélectrique guinéen avec le barrage de Garafiri (75 MW).' }
      ]
    }
  ],
  'GW': [
    {
      id: 1,
      title: 'Guinée-Bissau : Développement énergétique',
      excerpt: 'La Guinée-Bissau poursuit ses efforts pour améliorer l\'accès à l\'électricité et développer ses capacités de production.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'La Guinée-Bissau continue de développer son secteur énergétique pour améliorer l\'accès à l\'électricité pour sa population.' },
        { type: 'heading', text: 'Projets' },
        { type: 'text', text: 'Plusieurs projets d\'infrastructure sont en cours pour renforcer le réseau électrique national.' }
      ]
    }
  ],
  'LR': [
    {
      id: 1,
      title: 'Liberia : Barrage de Mount Coffee rénové',
      excerpt: 'Le barrage de Mount Coffee, d\'une capacité de 88 MW, a été rénové et continue de fournir de l\'électricité au Liberia.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage de Mount Coffee, construit en 1966 avec une capacité de 88 MW, a été rénové et continue de jouer un rôle central dans l\'approvisionnement électrique du Liberia.' },
        { type: 'heading', text: 'Rénovation' },
        { type: 'text', text: 'Les travaux de rénovation ont permis d\'améliorer la performance et la fiabilité de cette infrastructure essentielle.' }
      ]
    }
  ],
  'SL': [
    {
      id: 1,
      title: 'Sierra Leone : Barrage de Bumbuna II opérationnel',
      excerpt: 'Le barrage de Bumbuna II, d\'une capacité de 143 MW, renforce significativement la production hydroélectrique de la Sierra Leone.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le barrage de Bumbuna II, mis en service en 2024 avec une capacité de 143 MW, représente une étape majeure pour la Sierra Leone.' },
        { type: 'heading', text: 'Impact' },
        { type: 'text', text: 'Ce projet, combiné au barrage de Bumbuna I (50 MW), porte la capacité hydroélectrique totale à 193 MW, améliorant significativement l\'approvisionnement électrique.' }
      ]
    }
  ],
  'GM': [
    {
      id: 1,
      title: 'Gambie : Modernisation de la centrale de Kotu',
      excerpt: 'La centrale thermique de Kotu, d\'une capacité de 15 MW, fait l\'objet d\'un programme de modernisation.',
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: 'La Gambie investit dans la modernisation de sa centrale thermique de Kotu pour améliorer la fiabilité de l\'approvisionnement électrique.' },
        { type: 'heading', text: 'Objectifs' },
        { type: 'text', text: 'Ce programme vise à améliorer l\'efficacité et à réduire les coûts de production d\'électricité.' }
      ]
    }
  ],
  'MR': [
    {
      id: 1,
      title: 'Mauritanie : Développement des énergies renouvelables',
      excerpt: 'La Mauritanie combine centrales thermiques et solaires pour diversifier son mix énergétique.',
      category: 'Énergies Renouvelables',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#FACC15',
      icon: Zap,
      content: [
        { type: 'text', text: 'La Mauritanie développe activement ses capacités énergétiques avec la centrale thermique de Nouakchott (180 MW) et la centrale solaire (15 MWc).' },
        { type: 'heading', text: 'Stratégie' },
        { type: 'text', text: 'Cette combinaison permet de diversifier le mix énergétique et d\'améliorer la sécurité d\'approvisionnement.' }
      ]
    }
  ],
  'CV': [
    {
      id: 1,
      title: 'Cap-Vert : Développement de l\'énergie éolienne',
      excerpt: 'Le Cap-Vert développe ses capacités éoliennes avec le parc de Mindelo et continue d\'investir dans les énergies renouvelables.',
      category: 'Énergies Renouvelables',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#3B82F6',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le Cap-Vert, archipel insulaire, développe activement les énergies renouvelables avec le parc éolien de Mindelo (5 MW) et des centrales thermiques.' },
        { type: 'heading', text: 'Objectifs' },
        { type: 'text', text: 'L\'objectif est d\'augmenter la part des énergies renouvelables pour réduire la dépendance aux importations de combustibles fossiles.' }
      ]
    }
  ]
}

function loadGenericArticles() {
  const countryCode = countryStore.selectedCountryCode
  const countryArticles = genericArticlesByCountry[countryCode] || getDefaultArticles()
  // S'assurer que les articles sont bien mis à jour
  articles.value = [...countryArticles] // Créer une nouvelle référence pour forcer la réactivité
}

function getDefaultArticles() {
  const countryName = countryStore.selectedCountry.name
  return [
    {
      id: 1,
      title: `Développement énergétique en ${countryName}`,
      excerpt: `Le secteur énergétique de ${countryName} continue de se développer avec de nouveaux projets d'infrastructure.`,
      category: 'Infrastructure',
      date: new Date('2024-12-15'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      sourceUrl: '#',
      content: [
        { type: 'text', text: `${countryName} poursuit ses efforts pour améliorer l'accès à l'électricité et développer les énergies renouvelables.` },
        { type: 'heading', text: 'Projets en cours' },
        { type: 'text', text: 'Plusieurs projets d\'infrastructure énergétique sont en cours de développement pour répondre à la demande croissante.' }
      ]
    }
  ]
}

const articles = ref([
  {
    id: 1,
    title: 'Côte d\'Ivoire : Inauguration de la centrale solaire de Boundiali',
    excerpt: 'La première phase de la centrale solaire de Boundiali a été inaugurée le 3 avril 2024, marquant une étape importante vers l\'objectif de 45% d\'énergies renouvelables d\'ici 2030.',
    category: 'Énergies Renouvelables',
    date: new Date('2024-04-03'),
    readTime: 5,
    color: '#FACC15',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
    sourceUrl: 'https://www.gouv.ci/actualite/18112',
    content: [
      { type: 'text', text: 'La première phase de la centrale solaire de Boundiali a été inaugurée le 3 avril 2024 par le gouvernement ivoirien. Ce projet s\'inscrit dans l\'objectif ambitieux de porter la part des énergies renouvelables à 45% du mix énergétique d\'ici 2030.' },
      { type: 'heading', text: 'Projets solaires en développement' },
      { type: 'text', text: 'En plus de Boundiali, une convention pour la réalisation d\'une centrale solaire de 50 MWc à Katiola a été signée le 2 décembre 2024. D\'autres projets de centrales solaires sont prévus à Mankono, Touba, Korhogo et Bondoukou.' },
      { type: 'heading', text: 'Stratégie énergétique' },
      { type: 'text', text: 'Ces investissements dans le solaire renforcent la position de la Côte d\'Ivoire comme hub énergétique en Afrique de l\'Ouest et contribuent à la diversification du mix énergétique national.' }
    ]
  },
  {
    id: 2,
    title: 'Modernisation du réseau électrique : 200 km de lignes haute tension',
    excerpt: 'La Côte d\'Ivoire investit massivement dans la modernisation de son réseau électrique pour améliorer la fiabilité et réduire les pertes d\'énergie.',
    category: 'Infrastructure',
    date: new Date('2024-12-10'),
    readTime: 4,
    color: '#3B82F6',
    icon: Building2,
    content: [
      { type: 'text', text: 'Le ministère de l\'Énergie a dévoilé un plan ambitieux de modernisation du réseau électrique national. Plus de 200 kilomètres de nouvelles lignes haute tension seront installées dans les prochaines années.' },
      { type: 'heading', text: 'Objectifs du projet' },
      { type: 'text', text: 'Ce projet vise à réduire les pertes d\'énergie de 15% à moins de 8%, améliorer la qualité de l\'électricité fournie, et étendre l\'accès à l\'électricité dans les zones rurales. Plus de 500 000 nouveaux foyers devraient bénéficier de ce programme.' },
      { type: 'heading', text: 'Technologies intelligentes' },
      { type: 'text', text: 'Le nouveau réseau intégrera des technologies de smart grid, permettant une meilleure gestion de la distribution et une détection rapide des pannes. Des compteurs intelligents seront également déployés progressivement.' }
    ]
  },
  {
    id: 3,
    title: 'Côte d\'Ivoire : Lancement d\'audits énergétiques obligatoires',
    excerpt: 'Le ministère des Mines, du Pétrole et de l\'Énergie a lancé le 10 octobre 2024 des audits énergétiques obligatoires pour maîtriser la consommation énergétique.',
    category: 'Efficacité Énergétique',
    date: new Date('2024-10-10'),
    readTime: 6,
    color: '#22C55E',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
    sourceUrl: 'https://www.gouv.ci/actualite/17602',
    content: [
      { type: 'text', text: 'Le ministère des Mines, du Pétrole et de l\'Énergie a lancé, le 10 octobre 2024, des audits énergétiques obligatoires pour maîtriser la consommation énergétique. Cette initiative répond à une demande intérieure en énergie en croissance annuelle de plus de 10%.' },
      { type: 'heading', text: 'Objectifs des audits' },
      { type: 'text', text: 'Ces audits permettront d\'identifier les opportunités d\'économie d\'énergie dans les secteurs industriel, commercial et résidentiel, contribuant à réduire la pression sur le réseau électrique national.' },
      { type: 'heading', text: 'Gestion de la demande' },
      { type: 'text', text: 'Face à une croissance annuelle de la demande énergétique de plus de 10%, ces audits sont essentiels pour optimiser l\'utilisation de l\'énergie et garantir la stabilité du réseau électrique.' }
    ]
  },
  {
    id: 4,
    title: 'Côte d\'Ivoire : 1er Salon international des Ressources extractives et énergétiques (SIREXE)',
    excerpt: 'Le SIREXE s\'est tenu du 27 novembre au 1er décembre 2024 à Abidjan, réunissant plus de 1 500 délégués de 50 pays et générant 4 000 milliards FCFA d\'investissements.',
    category: 'Événements',
    date: new Date('2024-11-27'),
    readTime: 7,
    color: '#F97316',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop',
    sourceUrl: 'https://www.gouv.ci/uploads/publications/175072511253.pdf',
    content: [
      { type: 'text', text: 'Le 1er Salon international des Ressources extractives et énergétiques (SIREXE) s\'est tenu du 27 novembre au 1er décembre 2024 à Abidjan, réunissant plus de 1 500 délégués de 50 pays.' },
      { type: 'heading', text: 'Investissements signés' },
      { type: 'text', text: 'Cet événement majeur a permis la signature de contrats d\'investissement d\'environ 4 000 milliards de FCFA, démontrant l\'attractivité du secteur énergétique ivoirien pour les investisseurs internationaux.' },
      { type: 'heading', text: 'Plateforme d\'échanges' },
      { type: 'text', text: 'Le SIREXE a servi de plateforme d\'échanges pour les acteurs du secteur énergétique et minier, renforçant les partenariats stratégiques et les opportunités d\'investissement en Côte d\'Ivoire.' }
    ]
  },
  {
    id: 5,
    title: 'Côte d\'Ivoire : Investissements massifs dans le secteur pétrolier et minier',
    excerpt: 'Depuis 2011, plus de 1 200 milliards FCFA ont été investis dans la recherche pétrolière et 4 513 milliards FCFA dans l\'exploitation pétrolière.',
    category: 'Investissements',
    date: new Date('2024-12-03'),
    readTime: 5,
    color: '#3B82F6',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    sourceUrl: 'https://www.gouv.ci/doc/1733213276GOUV%20Revue%20de%20Presse%20-%2003%20decembre%202024.pdf',
    content: [
      { type: 'text', text: 'Depuis 2011, plus de 1 200 milliards de FCFA ont été investis dans la recherche pétrolière et 4 513 milliards de FCFA dans l\'exploitation pétrolière en Côte d\'Ivoire. La réforme du code pétrolier en 2012 a attiré davantage d\'investissements privés.' },
      { type: 'heading', text: 'Découvertes récentes' },
      { type: 'text', text: 'Le pays a découvert d\'importants gisements pétroliers et gaziers, notamment "Baleine" et "Calao", ainsi que le gisement aurifère "Tanda-Iguéla" dont la production devrait débuter en 2028.' },
      { type: 'heading', text: 'Impact économique' },
      { type: 'text', text: 'Ces investissements renforcent la position de la Côte d\'Ivoire comme acteur majeur du secteur énergétique en Afrique de l\'Ouest et contribuent à la diversification de son économie.' }
    ]
  },
  {
    id: 6,
    title: 'Côte d\'Ivoire : Découverte du gisement aurifère Tanda-Iguéla',
    excerpt: 'Le gisement Tanda-Iguéla devrait produire environ 11 tonnes d\'or par an sur 15 ans, créant environ 4 000 emplois directs et indirects.',
    category: 'Ressources Naturelles',
    date: new Date('2024-12-03'),
    readTime: 4,
    color: '#8B5CF6',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    sourceUrl: 'https://www.gouv.ci/doc/1733213276GOUV%20Revue%20de%20Presse%20-%2003%20decembre%202024.pdf',
    content: [
      { type: 'text', text: 'Le gisement aurifère "Tanda-Iguéla" découvert en Côte d\'Ivoire devrait produire environ 11 tonnes d\'or par an sur 15 ans. La production devrait débuter en 2028, créant environ 4 000 emplois directs et indirects.' },
      { type: 'heading', text: 'Impact économique' },
      { type: 'text', text: 'Cette découverte renforce le secteur minier ivoirien et contribue à la diversification de l\'économie nationale, générant des revenus importants pour le pays.' },
      { type: 'heading', text: 'Réforme du code minier' },
      { type: 'text', text: 'La réforme du code minier en 2014 a augmenté le nombre de permis de recherche de 120 en 2012 à 189 en 2023, stimulant l\'exploration et les découvertes de nouveaux gisements.' }
    ]
  }
])

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function selectArticle(article) {
  selectedArticle.value = article
}

function closeArticle() {
  selectedArticle.value = null
}

function handleImageError(event) {
  // Fallback vers une image par défaut si l'image ne charge pas
  event.target.src = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=400&fit=crop'
}
</script>

<style scoped>
.blog-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.blog-header {
  margin-bottom: 2rem;
  text-align: center;
}

.blog-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}

.blog-subtitle {
  font-size: 1rem;
  color: #6B7280;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.blog-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #3B82F6;
}

.blog-card-image {
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #E5E7EB;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.blog-card:hover .blog-image {
  transform: scale(1.05);
}

.blog-card-content {
  padding: 1.5rem;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-category {
  background: #F3F4F6;
  color: #6B7280;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 600;
}

.blog-date {
  color: #9CA3AF;
}

.blog-card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.blog-card-excerpt {
  font-size: 0.9375rem;
  color: #4B5563;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.blog-source-link {
  color: #6B7280;
  font-size: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.blog-source-link:hover {
  color: #3B82F6;
  text-decoration: underline;
}

.blog-read-time {
  font-size: 0.8125rem;
  color: #6B7280;
  font-weight: 500;
}

.blog-read-more {
  background: none;
  border: none;
  color: #3B82F6;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.blog-read-more:hover {
  color: #2563EB;
  gap: 0.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 1rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  background: #FFFFFF;
  z-index: 10;
}

.modal-header-content {
  flex: 1;
}

.modal-category {
  display: inline-block;
  background: #F3F4F6;
  color: #6B7280;
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.modal-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6B7280;
}

.modal-close {
  background: #F3F4F6;
  border: none;
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.modal-close:hover {
  background: #E5E7EB;
  color: #1A1A1A;
}

.modal-body {
  padding: 2rem;
}

.article-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.article-text {
  font-size: 1rem;
  color: #374151;
  line-height: 1.8;
}

.article-source {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E5E7EB;
}

.source-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: #2563EB;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
