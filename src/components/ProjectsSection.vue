<template>
  <section class="section projects" id="projets">
    <div id="projects"></div>
    <div class="projects-container">
      <div class="section-header reveal">
        <div class="badge-pill">
          <span class="pulse-dot"></span>
          <span>Réalisations & Systèmes Déployés</span>
        </div>
        <h2 class="section-title">
          Projets & <span class="text-gradient">Innovations IA</span>
        </h2>
        <p class="section-subtitle">
          Applications intelligentes, agents RAG, plateformes SaaS et systèmes de supervision industrielle conçus pour générer de la valeur réelle.
        </p>

        <!-- Category Filters -->
        <div class="filter-tabs">
          <button 
            v-for="filter in filters" 
            :key="filter.key"
            @click="activeFilter = filter.key"
            :class="['tab-btn', { active: activeFilter === filter.key }]"
          >
            {{ filter.label }}
            <span class="tab-count">{{ getCount(filter.key) }}</span>
          </button>
        </div>
      </div>

      <!-- Bento Grid -->
      <div class="projects-bento-grid">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          class="project-card reveal"
          :class="[project.layoutClass, { 'featured-card': project.featured }]"
          :style="{ transitionDelay: (index * 80) + 'ms' }"
          @click="openModal(project)"
        >
          <div class="project-img-container">
            <img :src="project.images[0]" :alt="project.title" loading="lazy" />
            <div class="project-gradient-overlay"></div>
            
            <div class="card-badges">
              <span class="category-badge">{{ project.categoryLabel }}</span>
              <span v-if="project.metrics" class="metric-badge">{{ project.metrics }}</span>
            </div>

            <div class="card-hover-action">
              <span>Voir le projet</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="arrow-svg">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          <div class="project-content-bottom">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-short-desc">{{ project.shortDescription }}</p>
            <div class="project-tech-pills">
              <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="tech-pill">{{ tag }}</span>
              <span v-if="project.tags.length > 4" class="tech-pill more">+{{ project.tags.length - 4 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Detail Modal with Multi-Screenshot Switcher -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="selectedProject" @click="closeModal">
        <div class="modal-card" @click.stop>
          <button class="modal-close-btn" @click="closeModal" aria-label="Fermer">✕</button>
          
          <div class="modal-inner-grid">
            <!-- Left Side: Visuals & Screenshot Switcher -->
            <div class="modal-visual-column">
              <div class="main-preview-box">
                <img :src="selectedProject.images[activeImageIndex]" :alt="selectedProject.title" />
              </div>
              
              <!-- Thumbnails Switcher if multiple images -->
              <div v-if="selectedProject.images.length > 1" class="thumbnail-switcher">
                <button 
                  v-for="(img, imgIdx) in selectedProject.images" 
                  :key="imgIdx"
                  @click="activeImageIndex = imgIdx"
                  :class="['thumb-btn', { active: activeImageIndex === imgIdx }]"
                >
                  <img :src="img" :alt="'Aperçu ' + (imgIdx + 1)" />
                  <span class="thumb-label">{{ selectedProject.imageLabels ? selectedProject.imageLabels[imgIdx] : 'Vue ' + (imgIdx + 1) }}</span>
                </button>
              </div>
            </div>

            <!-- Right Side: Details, Impact & Architecture -->
            <div class="modal-details-column">
              <div class="modal-meta-top">
                <span class="modal-cat-tag">{{ selectedProject.categoryLabel }}</span>
                <span v-if="selectedProject.client" class="modal-client">Client / Contexte : <strong>{{ selectedProject.client }}</strong></span>
              </div>

              <h2 class="modal-project-title">{{ selectedProject.title }}</h2>
              <p class="modal-lead-desc">{{ selectedProject.shortDescription }}</p>

              <div class="modal-section-block">
                <h4 class="block-title">Présentation & Architecture</h4>
                <p class="modal-full-text">{{ selectedProject.fullDescription }}</p>
              </div>

              <div v-if="selectedProject.impact" class="modal-section-block">
                <h4 class="block-title">Impact & Métriques Clés</h4>
                <ul class="impact-list">
                  <li v-for="imp in selectedProject.impact" :key="imp">
                    <svg viewBox="0 0 20 20" fill="currentColor" class="list-check">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ imp }}</span>
                  </li>
                </ul>
              </div>

              <div class="modal-section-block">
                <h4 class="block-title">Stack Technique</h4>
                <div class="modal-tags-grid">
                  <span v-for="tag in selectedProject.tags" :key="tag" class="modal-tag">{{ tag }}</span>
                </div>
              </div>

              <div class="modal-cta-row" v-if="selectedProject.link || selectedProject.github">
                <a v-if="selectedProject.link" :href="selectedProject.link" target="_blank" rel="noopener" class="btn-primary-modal">
                  <span>Accéder à la plateforme</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="cta-arrow">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
                <a v-if="selectedProject.github" :href="selectedProject.github" target="_blank" rel="noopener" class="btn-secondary-modal">
                  Code Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const activeFilter = ref('all')
const selectedProject = ref(null)
const activeImageIndex = ref(0)

const filters = [
  { key: 'all', label: 'Tous les projets' },
  { key: 'ai', label: '🤖 IA & Chatbots' },
  { key: 'saas', label: '⚡ SaaS & Plateformes' },
  { key: 'industry', label: '🏭 Industrie & IoT' }
]

const projects = [
  {
    id: 1,
    category: 'ai',
    categoryLabel: 'IA Conversationnelle & RAG',
    featured: true,
    layoutClass: 'bento-span-2',
    title: 'CIE Wélé — Chatbot IA & Observabilité Temps Réel',
    shortDescription: 'Assistant conversationnel intelligent pour la Compagnie Ivoirienne d\'Électricité avec monitoring opérationnel complet.',
    client: 'Compagnie Ivoirienne d\'Électricité (CIE)',
    fullDescription: 'Développement d\'un chatbot IA hybride déployé sur WhatsApp et Telegram pour la relation client de la CIE. Le système intègre un pipeline RAG branché sur la documentation technique et commerciale, couplé à un tableau de bord opérationnel live (temps de réponse 245ms, satisfaction client 92.3%, volume de 1200+ requêtes/jour, analyse de contenu et géolocalisation des demandes).',
    metrics: '87.5% Taux de Résolution',
    impact: [
      '87.5% des requêtes résolues automatiquement sans intervention humaine',
      'Temps de réponse moyen de l\'assistant IA de 245ms',
      'Dashboard opérationnel temps réel pour le suivi des incidents et KPIs de satisfaction',
      'Génération automatisée de rapports d\'analyse d\'arrêts et performances'
    ],
    images: [
      '/images/projects/ciewele-dashboard.png',
      '/images/projects/ciewele-whatsapp.png',
      '/images/projects/ciewele-chatbot.png'
    ],
    imageLabels: ['Dashboard Opérationnel', 'Bot WhatsApp / Telegram', 'Assistant Formateur IA'],
    tags: ['RAG Pipeline', 'NLP', 'WhatsApp Cloud API', 'Telegram Bot API', 'FastAPI', 'Vue.js Dashboard', 'Monitoring Ops'],
    link: null
  },
  {
    id: 2,
    category: 'ai',
    categoryLabel: 'Speech AI & NLP',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'Born of Spirit — Bible Audio IA en Langues Locales',
    shortDescription: 'Diffusion et interaction biblique en langues africaines via notes vocales WhatsApp et Telegram.',
    client: 'Born of Spirit Ministry',
    fullDescription: 'Plateforme innovante combinant reconnaissance vocale et synthèse audio IA (Text-to-Speech) pour rendre les textes bibliques accessibles en langues locales africaines. Les fidèles reçoivent et écoutent des notes vocales générées directement sur WhatsApp et Telegram, éliminant la barrière de l\'alphabétisation écrite.',
    metrics: 'Audio AI WhatsApp & Telegram',
    impact: [
      'Génération audio instantanée par note vocale sur WhatsApp et Telegram',
      'Support multilingue et préservation des langues africaines',
      'Interface conversationnelle accessible par un simple clic'
    ],
    images: [
      '/images/projects/bornofspirit-desktop.png',
      '/images/projects/bornofspirit-mobile.png'
    ],
    imageLabels: ['Version Web & Bot', 'Affiche Mobile'],
    tags: ['Speech Synthesis (TTS)', 'WhatsApp API', 'Telegram API', 'NLP', 'Voice AI'],
    link: null
  },
  {
    id: 3,
    category: 'saas',
    categoryLabel: 'Plateforme SaaS & GMAO',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'Kanari Africa — GMAO & Exécution Technique',
    shortDescription: 'Plateforme collaborative moderne pour la maintenance industrielle et les audits terrain.',
    client: 'Kanari Africa',
    fullDescription: 'Application SaaS complète de Gestion de Maintenance Assistée par Ordinateur (GMAO). Centralisation des plannings de travaux terrain, suivi des équipements, audits de conformité et contrats de performance énergétique (CPE) avec tableaux de bord réactifs.',
    metrics: 'GMAO & Maintenance Terrain',
    impact: [
      'Digitalisation à 100% des fiches d\'intervention et audits terrain',
      'Suivi en temps réel de la conformité et performance des parcs d\'équipements',
      'Architecture SaaS collaborative avec gestion multi-utilisateurs et rôles'
    ],
    images: [
      '/images/projects/kanari-africa.png'
    ],
    imageLabels: ['Plateforme Kanari Africa'],
    tags: ['Vue.js 3', 'GMAO', 'SaaS Architecture', 'Maintenance B2B', 'REST API'],
    link: 'https://kanari.africa'
  },
  {
    id: 4,
    category: 'saas',
    categoryLabel: 'Logiciel Desktop & Cloud',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'Ecofier — Logiciel de Pesée Industrielle',
    shortDescription: 'Solution logicielle multi-plateforme (Windows & macOS) pour les opérations de pesage et pont-bascule.',
    client: 'Ecofier Solutions',
    fullDescription: 'Suite logicielle pour la gestion des postes de pesage industriels et agricoles. Distribution multi-OS (Windows X64 et macOS), système de gestion de licences par clé d\'activation, génération de bordereaux de pesée certifiés et portail client.',
    metrics: 'Multi-plateforme (Win/Mac)',
    impact: [
      'Prise en charge directe des protocoles de ponts-bascules industriels',
      'Gestion automatisée des licences logicielles et mises à jour cloud',
      'Portail web de documentation et téléchargement optimisé'
    ],
    images: [
      '/images/projects/ecofier-landing.png',
      '/images/projects/ecofier-download.png'
    ],
    imageLabels: ['Landing Page & Portail', 'Espace Téléchargement'],
    tags: ['Desktop App', 'Electron', 'IoT Serial/USB', 'Licensing System', 'Web Design'],
    link: null
  },
  {
    id: 5,
    category: 'saas',
    categoryLabel: 'Transformation Digitale',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'Leonon Group — Digitalisation B2B Afrique',
    shortDescription: 'Plateforme digitale pour l\'accélération technologique des commerces et industries.',
    client: 'Leonon Group',
    fullDescription: 'Conception et développement de la plateforme de marque et solutions de gestion pour Leonon Group. Accompagnement dans la digitalisation des points de vente, l\'optimisation logistique et la visibilité numérique sur le marché africain.',
    metrics: 'B2B Digital Platform',
    impact: [
      'Expérience utilisateur immersive avec animations de pointe',
      'Présentation structurée des pôles d\'expertise commerciale et industrielle',
      'Optimisation SEO et performance de chargement ultrarapide'
    ],
    images: [
      '/images/projects/leonon-group.png'
    ],
    imageLabels: ['Leonon Group Accueil'],
    tags: ['Web Design', 'Vue.js', 'Transformation Digitale', 'B2B Platform'],
    link: null
  },
  {
    id: 6,
    category: 'industry',
    categoryLabel: 'Innovation & Drones',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'TechRoot — Hardware, Software & Drones',
    shortDescription: 'Solutions technologiques intégrées adaptées aux défis d\'infrastructures du continent africain.',
    client: 'TechRoot Africa',
    fullDescription: 'Plateforme vitrine et moteur de projet pour TechRoot, startup spécialisée dans la fusion Hardware/Software et la télédétection par drones. Système de sélection de projets interactif et vitrine des pôles d\'ingénierie.',
    metrics: 'Hardware & Drones',
    impact: [
      'Moteur interactif de cadrage de projet en ligne',
      'Mise en valeur des technologies hardware et cartographie par drone',
      'Design moderne avec navigation guidée par expertise'
    ],
    images: [
      '/images/projects/techroot.png'
    ],
    imageLabels: ['Plateforme TechRoot'],
    tags: ['Startup Tech', 'Drones & Cartographie', 'Hardware/Software', 'Fullstack'],
    link: null
  },
  {
    id: 7,
    category: 'industry',
    categoryLabel: 'SCADA & Maintenance Prédictive',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'Supervision VRIDI II — Turbines CIPREL',
    shortDescription: 'Interface SCADA industrielle de surveillance proactive pour turbines à gaz.',
    client: 'Site Énergétique CIPREL',
    fullDescription: 'Maquette d\'écran de supervision industrielle pour le site CIPREL Vridi. Interface HMI pour le monitoring des vibrations, des températures d\'échappement et des alarmes critiques de turbines de production électrique.',
    metrics: 'SCADA Industrie 4.0',
    impact: [
      'Détection précoce des dérives thermiques et vibratoires',
      'Visualisation intuitive des paramètres critiques pour les opérateurs',
      'Réduction des arrêts non planifiés sur turbines industrielles'
    ],
    images: [
      '/images/projects/motor-analytics.jpg'
    ],
    imageLabels: ['Interface de Supervision SCADA'],
    tags: ['SCADA', 'HMI Design', 'Maintenance Prédictive', 'Turbines CIPREL', 'IoT'],
    link: null
  },
  {
    id: 8,
    category: 'industry',
    categoryLabel: 'Analytics Énergie',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'KANARI Energy — Dashboard Mix Énergétique',
    shortDescription: 'Visualisation prédictive de la charge du réseau électrique ivoirien et du mix renouvelable.',
    client: 'Projet KANARI',
    fullDescription: 'Tableau de bord interactif visualisant en temps réel les flux d\'énergie, l\'équilibre offre-demande et la part du mix renouvelable en Côte d\'Ivoire pour guider la transition énergétique.',
    metrics: 'Data Viz Réseau Électrique',
    impact: [
      'Visualisation granulaire par source de production (Hydro, Gaz, Solaire)',
      'Prévision de la pointe de charge et détection de saturation',
      'Interface analytique accessible aux décideurs et ingénieurs'
    ],
    images: [
      '/images/projects/kanari-dashboard.png'
    ],
    imageLabels: ['Tableau de Bord Énergétique'],
    tags: ['Data Viz', 'Energy Mix', 'Time Series', 'Chart.js / ApexCharts', 'Python Backend'],
    link: 'https://kanari.energy'
  },
  {
    id: 9,
    category: 'saas',
    categoryLabel: 'Stratégie & Conseil',
    featured: false,
    layoutClass: 'bento-col-1',
    title: 'Paul Ginies — Portfolio Consultant International',
    shortDescription: 'Plateforme éditoriale et institutionnelle pour la transformation des systèmes éducatifs en Afrique.',
    client: 'Paul Ginies (Consultant International)',
    fullDescription: 'Conception et réalisation du site web institutionnel pour Paul Ginies, expert engagé auprès des gouvernements et bailleurs de fonds pour le développement stratégique de l\'éducation et de la formation professionnelle en Afrique.',
    metrics: 'Site Institutionnel',
    impact: [
      'Valorisation de 20+ années d\'expertise et publications stratégiques',
      'Identité visuelle premium, épurée et typographique',
      'Interface bilingue et espace de contact direct pour les investisseurs'
    ],
    images: [
      '/images/projects/paulginies.png'
    ],
    imageLabels: ['Portfolio Paul Ginies'],
    tags: ['Web Design', 'Portfolio Pro', 'Typography', 'Consulting'],
    link: null
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category === activeFilter.value)
})

const getCount = (filterKey) => {
  if (filterKey === 'all') return projects.length
  return projects.filter(p => p.category === filterKey).length
}

const openModal = (project) => {
  selectedProject.value = project
  activeImageIndex.value = 0
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  activeImageIndex.value = 0
  document.body.style.overflow = ''
}

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in')
      }
    })
  }, { threshold: 0.1 })
  
  reveals.forEach(r => observer.observe(r))
})
</script>

<style scoped>
.projects {
  background-color: var(--white);
  padding: 8rem 0;
  position: relative;
}

.projects-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(244, 91, 32, 0.08);
  border: 1px solid rgba(244, 91, 32, 0.25);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.2rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(244, 91, 32, 0.7);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 91, 32, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(244, 91, 32, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 91, 32, 0); }
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent) 0%, #E31B23 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  gap: 0.75rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1.4rem;
  background: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--gray-600);
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: var(--white);
  border-color: var(--black);
  color: var(--black);
}

.tab-btn.active {
  background: var(--black);
  border-color: var(--black);
  color: var(--white);
}

.tab-count {
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 0.15rem 0.5rem;
  border-radius: 100px;
}

.tab-btn:not(.active) .tab-count {
  background: rgba(0, 0, 0, 0.08);
}

/* Bento Grid */
.projects-bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3.5rem;
}

.project-card {
  background: var(--cream);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--black);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
}

.project-card.featured-card {
  grid-column: span 2;
}

.project-img-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--gray-100);
}

.featured-card .project-img-container {
  aspect-ratio: 21 / 10;
}

.project-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0, 0, 1);
}

.project-card:hover .project-img-container img {
  transform: scale(1.05);
}

.project-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-gradient-overlay {
  opacity: 0.3;
}

.card-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.category-badge {
  background: rgba(19, 19, 19, 0.85);
  backdrop-filter: blur(8px);
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.metric-badge {
  background: var(--accent);
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(244, 91, 32, 0.3);
}

.card-hover-action {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--white);
  color: var(--black);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 2;
}

.project-card:hover .card-hover-action {
  opacity: 1;
  transform: translateY(0);
}

.arrow-svg {
  width: 14px;
  height: 14px;
}

.project-content-bottom {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: var(--white);
}

.project-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 850;
  color: var(--black);
  margin-bottom: 0.6rem;
  line-height: 1.3;
}

.featured-card .project-title {
  font-size: 1.6rem;
}

.project-short-desc {
  font-size: 0.9rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: 1.4rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill {
  font-size: 0.7rem;
  font-weight: 700;
  background: var(--gray-100);
  color: var(--black);
  padding: 0.3rem 0.65rem;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tech-pill.more {
  background: var(--accent-light);
  color: var(--accent);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-card {
  background: var(--white);
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.2, 0, 0, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 42px;
  height: 42px;
  background: var(--black);
  color: var(--white);
  border: none;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: var(--accent);
  transform: scale(1.1);
}

.modal-inner-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  width: 100%;
  max-height: 90vh;
}

.modal-visual-column {
  background: var(--black);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  overflow-y: auto;
}

.main-preview-box {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.main-preview-box img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.thumbnail-switcher {
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumb-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 0 0 110px;
}

.thumb-btn img {
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.thumb-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.65rem;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.thumb-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.thumb-btn.active {
  border-color: var(--accent);
  background: rgba(244, 91, 32, 0.15);
}

.thumb-btn.active .thumb-label {
  color: var(--white);
}

.modal-details-column {
  padding: 4rem 3.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.modal-meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-cat-tag {
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.modal-client {
  font-size: 0.85rem;
  color: var(--gray-500);
}

.modal-project-title {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 900;
  color: var(--black);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.modal-lead-desc {
  font-size: 1.05rem;
  color: var(--gray-600);
  line-height: 1.6;
}

.modal-section-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.block-title {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--black);
}

.modal-full-text {
  font-size: 0.95rem;
  color: var(--gray-600);
  line-height: 1.7;
}

.impact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.impact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--gray-700);
}

.list-check {
  width: 18px;
  height: 18px;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 1px;
}

.modal-tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.modal-tag {
  background: var(--gray-100);
  color: var(--black);
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-cta-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary-modal {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--black);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary-modal:hover {
  background: var(--accent);
}

.cta-arrow {
  width: 16px;
  height: 16px;
}

.btn-secondary-modal {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--black);
  border: 1px solid var(--gray-300);
  padding: 0.9rem 1.8rem;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary-modal:hover {
  border-color: var(--black);
}

@media (max-width: 1024px) {
  .projects-bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .project-card.featured-card {
    grid-column: span 2;
  }
  .modal-inner-grid {
    grid-template-columns: 1fr;
  }
  .modal-visual-column {
    padding: 2rem;
  }
  .modal-details-column {
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .projects-bento-grid {
    grid-template-columns: 1fr;
  }
  .project-card.featured-card {
    grid-column: span 1;
  }
  .modal-overlay {
    padding: 0;
  }
  .modal-card {
    max-height: 100vh;
    border-radius: 0;
  }
}
</style>
