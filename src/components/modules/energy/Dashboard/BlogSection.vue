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
        <div class="blog-card-image" :style="{ background: article.color }">
          <component :is="article.icon" :size="32" />
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
            <button class="blog-read-more">Lire la suite →</button>
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
  
  // Créer une nouvelle copie des articles pour forcer la réactivité
  const updatedArticles = articles.value.map(article => ({ ...article }))
  
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
      title: 'Sénégal : Nouveau parc solaire de 60 MW à Kolda',
      excerpt: 'Le Sénégal renforce sa capacité solaire avec un nouveau projet de 60 MWc qui portera la puissance installée totale à 1 500 MW.',
      category: 'Énergies Renouvelables',
      date: new Date('2024-12-15'),
      readTime: 5,
      color: '#FACC15',
      icon: Zap,
      content: [
        { type: 'text', text: 'Le gouvernement sénégalais a annoncé le lancement d\'un nouveau parc solaire de 60 MWc à Kolda. Ce projet s\'inscrit dans la stratégie nationale d\'augmentation de la part des énergies renouvelables dans le mix énergétique.' },
        { type: 'heading', text: 'Capacité énergétique' },
        { type: 'text', text: 'Avec ce nouveau projet, la puissance installée totale au Sénégal devrait atteindre 1 500 MW d\'ici 2025, incluant des sources solaires, hydroélectriques, éoliennes et thermiques.' },
        { type: 'heading', text: 'Partenariats' },
        { type: 'text', text: 'Le projet bénéficie du soutien de la Senelec et de partenaires internationaux. La construction devrait débuter en 2025.' }
      ]
    },
    {
      id: 2,
      title: 'Centrale de Sendou : Modernisation en cours',
      excerpt: 'La centrale thermique de Sendou fait l\'objet d\'une modernisation pour améliorer son efficacité et réduire ses émissions.',
      category: 'Infrastructure',
      date: new Date('2024-12-10'),
      readTime: 4,
      color: '#3B82F6',
      icon: Building2,
      content: [
        { type: 'text', text: 'La centrale thermique de Sendou, d\'une capacité de 125 MW, fait l\'objet d\'un programme de modernisation pour améliorer son efficacité énergétique et réduire son empreinte carbone.' },
        { type: 'heading', text: 'Objectifs' },
        { type: 'text', text: 'Ce programme vise à réduire les émissions de CO₂ de 20% et à améliorer le taux de disponibilité de la centrale à plus de 90%.' }
      ]
    },
    {
      id: 3,
      title: 'Centrale solaire de Mékhé : Succès opérationnel',
      excerpt: 'La centrale solaire de Mékhé, d\'une capacité de 30 MWc, continue de contribuer efficacement au réseau électrique sénégalais.',
      category: 'Énergies Renouvelables',
      date: new Date('2024-12-05'),
      readTime: 4,
      color: '#FACC15',
      icon: Zap,
      content: [
        { type: 'text', text: 'Depuis son inauguration en 2016, la centrale solaire de Mékhé a démontré sa fiabilité et sa contribution au mix énergétique sénégalais.' },
        { type: 'heading', text: 'Performance' },
        { type: 'text', text: 'La centrale produit annuellement environ 50 GWh d\'électricité propre, contribuant à réduire les émissions de gaz à effet de serre.' }
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
    title: 'Nouveau projet solaire de 50 MW dans le nord de la Côte d\'Ivoire',
    excerpt: 'Le gouvernement ivoirien annonce le lancement d\'un nouveau parc solaire qui devrait augmenter la capacité de production d\'énergies renouvelables de 15%.',
    category: 'Énergies Renouvelables',
    date: new Date('2024-12-15'),
    readTime: 5,
    color: '#FACC15',
    icon: Zap,
    content: [
      { type: 'text', text: 'Le gouvernement ivoirien a annoncé aujourd\'hui le lancement d\'un ambitieux projet de parc solaire dans la région du nord du pays. Ce projet, d\'une capacité de 50 mégawatts, représente une étape importante dans la transition énergétique de la Côte d\'Ivoire.' },
      { type: 'heading', text: 'Impact sur le mix énergétique' },
      { type: 'text', text: 'Avec ce nouveau parc, la part des énergies renouvelables dans le mix énergétique ivoirien devrait passer de 25% à près de 30% d\'ici 2025. Cette augmentation contribuera à réduire la dépendance aux énergies fossiles et à diminuer l\'empreinte carbone du pays.' },
      { type: 'heading', text: 'Investissements et partenariats' },
      { type: 'text', text: 'Le projet bénéficie d\'un financement de 45 millions d\'euros, avec le soutien de partenaires internationaux et de la Banque Africaine de Développement. La construction devrait commencer au premier trimestre 2025 et s\'achever d\'ici 18 mois.' }
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
    title: 'Baisse de 8% de la consommation énergétique grâce aux mesures d\'efficacité',
    excerpt: 'Les programmes d\'efficacité énergétique lancés en 2023 ont permis d\'économiser l\'équivalent de 200 MW, soit la consommation de 150 000 foyers.',
    category: 'Efficacité Énergétique',
    date: new Date('2024-12-05'),
    readTime: 6,
    color: '#22C55E',
    icon: Leaf,
    content: [
      { type: 'text', text: 'Les résultats des programmes d\'efficacité énergétique mis en place par le gouvernement ivoirien sont impressionnants. En un an, la consommation énergétique a diminué de 8% grâce à diverses initiatives.' },
      { type: 'heading', text: 'Mesures mises en place' },
      { type: 'text', text: 'Parmi les mesures phares : remplacement de 500 000 ampoules à incandescence par des LED, installation de systèmes de climatisation à haute efficacité dans les bâtiments publics, et sensibilisation des entreprises aux bonnes pratiques énergétiques.' },
      { type: 'heading', text: 'Impact économique' },
      { type: 'text', text: 'Ces économies représentent une réduction de 45 millions d\'euros sur la facture énergétique nationale. L\'argent économisé sera réinvesti dans de nouveaux projets d\'infrastructure énergétique.' }
    ]
  },
  {
    id: 4,
    title: 'Côte d\'Ivoire : objectif 50% d\'énergies renouvelables d\'ici 2030',
    excerpt: 'Le pays renforce son engagement en faveur de la transition énergétique avec un nouveau plan ambitieux pour atteindre 50% d\'énergies renouvelables.',
    category: 'Politique Énergétique',
    date: new Date('2024-11-28'),
    readTime: 7,
    color: '#F97316',
    icon: TrendingUp,
    content: [
      { type: 'text', text: 'Le gouvernement ivoirien a présenté son nouveau plan de transition énergétique, visant à porter la part des énergies renouvelables à 50% d\'ici 2030. Actuellement, cette part s\'élève à environ 25%.' },
      { type: 'heading', text: 'Stratégie de développement' },
      { type: 'text', text: 'Pour atteindre cet objectif, le pays prévoit d\'investir 2,5 milliards d\'euros dans les énergies renouvelables. Les projets incluent des parcs solaires, éoliens, et l\'expansion des capacités hydroélectriques existantes.' },
      { type: 'heading', text: 'Partenariats internationaux' },
      { type: 'text', text: 'La Côte d\'Ivoire compte sur le soutien de partenaires internationaux et d\'organisations comme la Banque Mondiale et l\'Union Européenne pour financer cette transition. Des appels d\'offres seront lancés dès 2025 pour les premiers projets.' }
    ]
  },
  {
    id: 5,
    title: 'Nouvelle centrale hydroélectrique de 200 MW en construction',
    excerpt: 'Le chantier de la nouvelle centrale hydroélectrique sur le fleuve Sassandra avance bien et devrait être opérationnelle en 2026.',
    category: 'Infrastructure',
    date: new Date('2024-11-20'),
    readTime: 5,
    color: '#3B82F6',
    icon: Zap,
    content: [
      { type: 'text', text: 'La construction de la nouvelle centrale hydroélectrique de 200 MW sur le fleuve Sassandra progresse selon le calendrier prévu. Les travaux de génie civil sont à 60% d\'avancement.' },
      { type: 'heading', text: 'Capacité et impact' },
      { type: 'text', text: 'Une fois opérationnelle, cette centrale fournira de l\'électricité à plus de 1,5 million d\'Ivoiriens. Elle contribuera également à stabiliser le réseau électrique national et à réduire les coupures d\'électricité.' },
      { type: 'heading', text: 'Respect de l\'environnement' },
      { type: 'text', text: 'Le projet intègre des mesures environnementales strictes pour minimiser l\'impact sur l\'écosystème local. Des programmes de reforestation et de protection de la biodiversité sont en cours.' }
    ]
  },
  {
    id: 6,
    title: 'Exportation d\'électricité : la Côte d\'Ivoire renforce sa position régionale',
    excerpt: 'Le pays confirme son rôle de hub énergétique en Afrique de l\'Ouest avec une augmentation de 20% de ses exportations d\'électricité.',
    category: 'Commerce Énergétique',
    date: new Date('2024-11-15'),
    readTime: 4,
    color: '#8B5CF6',
    icon: TrendingUp,
    content: [
      { type: 'text', text: 'La Côte d\'Ivoire continue de renforcer sa position de leader dans l\'exportation d\'électricité en Afrique de l\'Ouest. Les exportations ont augmenté de 20% cette année.' },
      { type: 'heading', text: 'Pays destinataires' },
      { type: 'text', text: 'Le pays exporte actuellement vers le Ghana, le Burkina Faso, le Mali, le Bénin et le Togo. Ces exportations représentent une source importante de revenus et renforcent l\'intégration régionale.' },
      { type: 'heading', text: 'Perspectives d\'avenir' },
      { type: 'text', text: 'Avec les nouveaux projets en cours, la capacité d\'exportation devrait encore augmenter de 30% d\'ici 2027. Des discussions sont en cours avec d\'autres pays de la sous-région pour étendre le réseau d\'interconnexion.' }
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
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #3B82F6;
}

.blog-card-image {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.blog-card-content {
  padding: 1.25rem;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
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
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-read-time {
  font-size: 0.75rem;
  color: #9CA3AF;
}

.blog-read-more {
  background: none;
  border: none;
  color: #3B82F6;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.blog-read-more:hover {
  color: #2563EB;
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
