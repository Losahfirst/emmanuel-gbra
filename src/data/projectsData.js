export const ALL_PROJECTS = [
  {
    id: 1,
    category: 'ai',
    categoryLabel: 'IA Conversationnelle & RAG',
    featured: true,
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
    title: 'Born of Spirit — Bible Audio IA en Langues Locales',
    shortDescription: 'Diffusion et interaction biblique en langues africaines via notes vocales WhatsApp et Telegram.',
    client: 'Born of Spirit Ministry',
    fullDescription: 'Plateforme combinant reconnaissance vocale et synthèse audio IA (Text-to-Speech) pour rendre les textes bibliques accessibles en langues locales africaines. Les fidèles reçoivent et écoutent des notes vocales générées directement sur WhatsApp et Telegram, éliminant la barrière de l\'alphabétisation écrite.',
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
