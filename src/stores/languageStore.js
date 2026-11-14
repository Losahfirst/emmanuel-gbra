import { ref, computed } from 'vue'

const STORAGE_KEY = 'emmanuel_gbra_lang'

const currentLang = ref(localStorage.getItem(STORAGE_KEY) || 'FR')

export function useLanguage() {
  const isEn = computed(() => currentLang.value === 'EN')
  const lang = computed(() => currentLang.value)

  function toggleLang() {
    currentLang.value = currentLang.value === 'FR' ? 'EN' : 'FR'
    try {
      localStorage.setItem(STORAGE_KEY, currentLang.value)
    } catch (e) {
      console.warn('LocalStorage non disponible pour la langue:', e)
    }
  }

  function setLang(newLang) {
    if (newLang === 'FR' || newLang === 'EN') {
      currentLang.value = newLang
      try {
        localStorage.setItem(STORAGE_KEY, newLang)
      } catch (e) {
        console.warn('LocalStorage non disponible pour la langue:', e)
      }
    }
  }

  // Dictionnaire de traductions complet du site
  const translations = {
    FR: {
      nav: {
        home: 'ACCUEIL',
        projects: 'PROJETS',
        blog: 'BLOG',
        langLabel: 'Passer en Anglais'
      },
      hero: {
        headline: 'Je pense être le Xavier Niel Africain'
      },
      bio: {
        p1: "Je suis un passionné de R&D et d'amélioration continue qui aime bricoler l'électronique, créer des logiciels et faire parler les données des machines pour résoudre des vrais problèmes sur le terrain. J'ai à mon actif 4 logiciels Windows client-serveur déployés sur des sites miniers et industriels, j'ai conçu le premier répétiteur de poids Bluetooth pour pont-bascule, et j'ai fabriqué un chatbot qui traduit et permet de lire la Bible en langue locale.",
        p2: "Aujourd'hui, je développe des solutions connectées pour fiabiliser les équipements en milieu exigeant, tout en travaillant sur le premier système LiDAR/radar pour véhicules autonomes adapté à l'Afrique et sur la production d'électricité houlomotrice pour les pays côtiers."
      },
      news: {
        title: 'NOUVELLES',
        readPdf: 'Consulter le rapport PDF',
        readArticle: "Lire l'article complet"
      },
      blog: {
        title: 'BLOGUE',
        published: 'Publié :',
        by: 'Par :',
        viewAll: 'Voir tous les articles et recherches →'
      },
      contact: {
        title: 'CONTACT',
        col1Label: 'Demandes de projets & collaboration',
        col1Btn: 'Me contacter sur LinkedIn',
        col1Sub: 'Disponible pour missions de conseil, architectures RAG, développement de solutions IA et maintenance prédictive.',
        col2Label: 'Spécialités & Expertise',
        col2Headline: 'Architecte Systèmes IA & Data',
        col2Bullet1: '• Modélisation prédictive & KPIs industriels',
        col2Bullet2: '• Architectures RAG & agents autonomes',
        col2Bullet3: '• IoT, Smart Grids & optimisation énergétique',
        col3Label: 'Localisation & Mobilité',
        col3Headline: "Abidjan · Côte d'Ivoire",
        col3Sub: 'Interventions internationales en distanciel et sur site. Collaboration avec des centres de recherche, entreprises énergétiques et institutions industrielles.'
      },
      footer: {
        projectsLink: 'Projets & Réalisations (9) →',
        admin: 'Administration',
        tagline: 'Intelligence Artificielle & Maintenance Prédictive'
      },
      works: {
        title: 'TRAVAUX REPRÉSENTATIFS',
        subtitle: 'Une sélection de systèmes d\'intelligence artificielle, plateformes logicielles industrielles, solutions de maintenance prédictive et prototypes IoT déployés sur le terrain.',
        backHome: '← Retour à l\'accueil',
        filterAll: 'TOUS',
        filterAi: 'SYSTÈMES IA & RAG',
        filterMaintenance: 'MAINTENANCE PRÉDICTIVE',
        filterIot: 'IOT INDUSTRIEL & MATÉRIEL',
        filterSaas: 'SOFTWARE MINIER & SAAS',
        modalDesc: 'Description détaillée',
        modalTech: 'Technologies & Composants',
        modalImpact: 'Impact & Déploiement terrain',
        modalBtn: 'Consulter le projet direct',
        modalClose: 'Fermer',
        clientLabel: 'Commanditaire / Contexte :'
      },
      blogPage: {
        title: 'MAINTENANCE PRÉDICTIVE & R&D',
        subtitle: 'Articles de fond, épisodes d\'analyse KPI, retours d\'expérience industriels et méthodologies de surveillance prédictive par Emmanuel GBRA.',
        searchPlaceholder: 'Rechercher un épisode, KPI, capteur, turbine...',
        filterAll: 'Tous les travaux',
        filterKpi: 'Indicateurs KPI',
        filterMl: 'Machine Learning',
        filterIot: 'IoT & Réseaux',
        filterEnergy: 'Efficacité Énergétique',
        pillPdf: '📄 Document Technique PDF',
        pillExt: '🔗 Article Web / Tribune',
        backHome: '← Retour à l\'accueil',
        empty: 'Aucun document ne correspond à votre recherche.'
      }
    },
    EN: {
      nav: {
        home: 'HOME',
        projects: 'PROJECTS',
        blog: 'BLOG',
        langLabel: 'Switch to French'
      },
      hero: {
        headline: 'I think I am the African Xavier Niel'
      },
      bio: {
        p1: "Driven by a deep passion for R&D and continuous improvement, I love tinkering with electronics, crafting software, and unlocking machine data to solve real-world problems in the field. I have built and deployed 4 Windows client-server software suites across mining and industrial sites, designed the first Bluetooth weight repeater for weighbridges, and created a chatbot that translates and enables reading the Bible in local languages.",
        p2: "Today, I develop connected solutions to enhance equipment reliability in demanding environments, while working on the first LiDAR/radar system for autonomous vehicles tailored to Africa and wave energy power generation for coastal nations."
      },
      news: {
        title: 'NEWS',
        readPdf: 'View PDF Technical Report',
        readArticle: 'Read Full Article'
      },
      blog: {
        title: 'BLOG',
        published: 'Published:',
        by: 'By:',
        viewAll: 'View all articles & research papers →'
      },
      contact: {
        title: 'CONTACT',
        col1Label: 'Project Inquiries & Collaboration',
        col1Btn: 'Connect on LinkedIn',
        col1Sub: 'Available for consulting missions, RAG architectures, AI solution development, and predictive maintenance.',
        col2Label: 'Specialties & Core Expertise',
        col2Headline: 'AI & Data Systems Architect',
        col2Bullet1: '• Predictive modeling & industrial KPIs',
        col2Bullet2: '• RAG architectures & autonomous agents',
        col2Bullet3: '• IoT, Smart Grids & energy optimization',
        col3Label: 'Location & Mobility',
        col3Headline: "Abidjan · Ivory Coast",
        col3Sub: 'International remote and on-site missions. Collaborating with research centers, energy companies, and industrial institutions.'
      },
      footer: {
        projectsLink: 'Projects & Works (9) →',
        admin: 'Administration',
        tagline: 'Artificial Intelligence & Predictive Maintenance'
      },
      works: {
        title: 'REPRESENTATIVE WORKS',
        subtitle: 'A selection of artificial intelligence systems, industrial software platforms, predictive maintenance architectures, and hardware IoT prototypes deployed in the field.',
        backHome: '← Back to Home',
        filterAll: 'ALL',
        filterAi: 'AI & RAG SYSTEMS',
        filterMaintenance: 'PREDICTIVE MAINTENANCE',
        filterIot: 'INDUSTRIAL IOT & HARDWARE',
        filterSaas: 'MINING SOFTWARE & SAAS',
        modalDesc: 'Detailed Overview',
        modalTech: 'Technologies & Architecture',
        modalImpact: 'Field Impact & Operational Results',
        modalBtn: 'View Live Project',
        modalClose: 'Close',
        clientLabel: 'Client / Context:'
      },
      blogPage: {
        title: 'PREDICTIVE MAINTENANCE & R&D',
        subtitle: 'In-depth research papers, KPI analysis episodes, industrial feedback, and predictive monitoring methodologies by Emmanuel GBRA.',
        searchPlaceholder: 'Search episode, KPI, sensor, turbine...',
        filterAll: 'All Works',
        filterKpi: 'KPI Indicators',
        filterMl: 'Machine Learning',
        filterIot: 'IoT & Grids',
        filterEnergy: 'Energy Efficiency',
        pillPdf: '📄 Technical PDF Document',
        pillExt: '🔗 Web Article / Op-Ed',
        backHome: '← Back to Home',
        empty: 'No documents match your search.'
      }
    }
  }

  // Traduction des 9 projets pour la page Travaux Représentatifs
  const projectTranslations = {
    EN: {
      1: {
        title: 'CIE Wélé — AI Chatbot & Real-Time Observability',
        shortDescription: 'Intelligent conversational assistant for the Ivory Coast Electricity Company with comprehensive operational monitoring.',
        client: 'Compagnie Ivoirienne d\'Électricité (CIE)',
        fullDescription: 'Development of a hybrid AI chatbot deployed on WhatsApp and Telegram for CIE customer relations. The system integrates a RAG pipeline connected to technical and commercial documentation, coupled with a live operational dashboard (245ms response time, 92.3% customer satisfaction, 1,200+ requests/day, content analytics, and geo-tagged incident tracking).',
        metrics: '87.5% Automated Resolution Rate',
        impact: [
          '87.5% of incoming customer requests resolved automatically without human escalation',
          'Average AI assistant response latency of 245ms',
          'Real-time operational dashboard for incident monitoring and customer satisfaction KPIs',
          'Automated generation of outage analytics and network performance summaries'
        ]
      },
      2: {
        title: 'Born of Spirit — Speech AI & Audio Bible in Local Languages',
        shortDescription: 'Scripture broadcasting and interactive audio Bible in African languages via WhatsApp and Telegram voice notes.',
        client: 'Born of Spirit Ministry',
        fullDescription: 'Platform combining speech recognition and AI audio synthesis (Text-to-Speech) to make biblical scriptures accessible in indigenous African languages. Users receive and listen to dynamically generated audio voice notes directly on WhatsApp and Telegram, dismantling literacy barriers.',
        metrics: 'WhatsApp & Telegram Speech AI',
        impact: [
          'Instant audio generation via interactive voice notes on WhatsApp and Telegram',
          'Multilingual support preserving indigenous African oral traditions and dialects',
          'Conversational interface accessible through a single tap without app download'
        ]
      },
      3: {
        title: 'Kanari Africa — CMMS & Field Maintenance Execution',
        shortDescription: 'Modern collaborative platform for industrial maintenance operations and on-site technical audits.',
        client: 'Kanari Africa',
        fullDescription: 'Comprehensive SaaS Computerized Maintenance Management System (CMMS). Centralization of field technician work orders, equipment asset tracking, regulatory compliance audits, and energy performance contracts (EPC) with responsive real-time dashboards.',
        metrics: 'CMMS & Field Operations',
        impact: [
          'Full digitisation of industrial work orders and maintenance logs',
          'Real-time monitoring of energy performance contracts and critical assets',
          'Collaborative portal connecting on-site technicians with engineering managers'
        ]
      },
      4: {
        title: 'Ecofier — Industrial Weighing Software & Licensing',
        shortDescription: 'Cross-platform industrial weighing management software (Windows & macOS) for weighbridge and truck scale operations.',
        client: 'Ecofier Solutions',
        fullDescription: 'Complete desktop and cloud solution for managing industrial and agricultural weighbridges. Cross-platform distribution (Windows x64 and macOS), automated license key activation, verified weighing slips, and secure client portal.',
        metrics: 'Multi-Platform (Win/Mac)',
        impact: [
          'Direct hardware interfacing with industrial weighbridge digital indicators',
          'Automated cloud license management and over-the-air software updates',
          'Optimized documentation and software download web portal'
        ]
      },
      5: {
        title: 'Leonon Group — B2B Digital Transformation in Africa',
        shortDescription: 'Digital platform accelerating tech transformation for retail, logistics, and industrial businesses across Africa.',
        client: 'Leonon Group',
        fullDescription: 'Design and engineering of the corporate web platform and digital solutions for Leonon Group. Empowering retail point-of-sale digitization, logistics route optimization, and modern digital visibility in West Africa.',
        metrics: 'B2B Digital Platform',
        impact: [
          'Immersive brand experience with high-performance responsive UI',
          'Structured showcases for commercial and industrial expertise poles',
          'SEO-optimized architecture with sub-second loading speeds'
        ]
      },
      6: {
        title: 'TechRoot — Hardware, Software & Drone Solutions',
        shortDescription: 'Integrated hardware, software, and drone mapping technologies tailored to African infrastructure challenges.',
        client: 'TechRoot Africa',
        fullDescription: 'Showcase and project scoping platform for TechRoot, an African startup specializing in hardware/software convergence and aerial drone photogrammetry. Interactive project scoping engine and engineering portfolio.',
        metrics: 'Hardware & Drones',
        impact: [
          'Interactive online scoping wizard for industrial drone missions',
          'Showcase of embedded hardware, firmware, and aerial mapping',
          'Modern responsive UX with guided navigation by domain'
        ]
      },
      7: {
        title: 'VRIDI II Supervision — CIPREL Gas Turbines SCADA',
        shortDescription: 'Industrial SCADA monitoring interface for proactive surveillance and predictive maintenance of gas turbines.',
        client: 'Site Énergétique CIPREL',
        fullDescription: 'Industrial HMI/SCADA supervisory system for the CIPREL Vridi power generation facility. Real-time monitoring of bearing vibration, exhaust gas temperatures, and critical alarm thresholds on power generation turbines.',
        metrics: 'Industry 4.0 SCADA',
        impact: [
          'Early detection of thermal anomalies and mechanical bearing vibration drifts',
          'Intuitive visual HMI for operational control room technicians',
          'Drastic reduction in unplanned turbine outages and maintenance downtime'
        ]
      },
      8: {
        title: 'KANARI Energy — National Grid & Energy Mix Dashboard',
        shortDescription: 'Predictive visualization of the Ivorian electricity grid demand, commodities prices, and renewable energy mix.',
        client: 'Projet KANARI',
        fullDescription: 'Interactive real-time data hub tracking energy flows, power grid supply-demand balance, fuel prices, and renewable energy penetration in Côte d\'Ivoire to support strategic energy transition decisions.',
        metrics: 'National Grid Data Viz',
        impact: [
          'Granular monitoring by generation source (Hydroelectric, Thermal Gas, Solar)',
          'Peak demand forecasting and grid saturation alerts',
          'Analytical executive dashboard accessible to engineers and policy makers'
        ]
      },
      9: {
        title: 'Paul Ginies — International Consultant Portfolio',
        shortDescription: 'Editorial and institutional showcase for an international leader in African education and energy transformation.',
        client: 'Paul Ginies (Consultant International)',
        fullDescription: 'Design and development of the official personal showcase for Paul Ginies, strategic advisor to governments, development banks, and higher education institutions across Africa for over 20 years.',
        metrics: 'Institutional Showcase',
        impact: [
          'Comprehensive digital archive of strategic books, op-eds, and conference talks',
          'Refined Swiss-inspired minimalist typography and visual identity',
          'Bilingual contact hub for university boards and executive advisories'
        ]
      }
    }
  }

  // Articles bilingues
  const articleTranslations = {
    EN: {
      7: {
        title: 'Transmitting Data from Bluetooth Directly to Satellites: Now a Reality!',
        excerpt: 'Hubble Network, an innovative US startup, has developed a breakthrough way to connect everyday devices: using standard Bluetooth to beam data directly to orbiting satellites without SIM cards, cellular networks, or bulky satellite modems.',
        caption: '© Emmanuel GBRA · ESP32-C6 IoT Architecture, Bluetooth Telemetry & Hubble Cloud Satellite Uplink',
        paragraphs: [
          "Hubble Network, an innovative US tech startup, has introduced a breakthrough paradigm for connecting everyday devices and remote assets.",
          "The underlying concept is remarkable: leveraging standard Bluetooth technology — identical to the chips in our smartphones and connected sensors — to beam telemetry directly to low Earth orbit satellites.",
          "In practice, any sensor embedded with a compatible Bluetooth chipset can transmit small packets to a Hubble satellite without requiring a SIM card, cellular carrier subscription, or dedicated satellite modem. Hubble accomplished this by tailoring the physical layer and signal processing so that orbiting satellites can detect and demodulate ultra-low-power Bluetooth bursts across orbital distances. Payload sizes are compact, up to 13 bytes — sufficient for critical telemetry, operational status codes, or sensor metrics.",
          "Consider a real-world example: an agricultural water borehole in an off-grid rural area with zero cellular coverage. A compact self-contained node equipped with a hydrostatic level probe monitors water availability and pump activity. It periodically transmits readings via Bluetooth. A passing Hubble satellite picks up the transmission and relays it to a centralized cloud platform accessible from anywhere.",
          "The operator can monitor infrastructure health, water reserves, and equipment runtimes remotely, eliminating the need for frequent and costly physical inspections.",
          "This technology unlocks groundbreaking possibilities for precision agriculture, remote water utility management, industrial asset tracking, and environmental monitoring across vast territories.",
          "If additional satellite constellations and silicon manufacturers embrace this paradigm, future embedded architectures could seamlessly combine multiple communication layers: Bluetooth for short-range local mesh, cellular networks when available, and direct-to-satellite uplinks in remote isolated geographies.",
          "We could therefore connect a multitude of mission-critical assets worldwide with simpler hardware, lower power consumption, and significantly reduced deployment costs.",
          "A major technological frontier to follow closely for the future of sovereign IoT and mission-critical embedded systems!"
        ]
      },
      1: {
        title: 'KPI Analysis Tools - Episode 4: Advanced Industrial Operations',
        excerpt: 'Advanced methodologies and actionable metrics for industrial performance monitoring and proactive surveillance of high-criticality assets.'
      },
      2: {
        title: 'KPI Analysis Tools - Episode 3: Algorithms & Core Indicators',
        excerpt: 'In-depth research on predictive maintenance key indicators, mathematical modeling, and real-time sensor correlation.'
      },
      3: {
        title: 'KPI Analysis Tools - Episode 2: Energy Performance Tracking',
        excerpt: 'Practical guide and methodological framework on analysis tools and essential metrics for thermal diagnosis and energy monitoring.'
      },
      4: {
        title: 'The AI Era in Industry: Real Manufacturer Use Cases (Episode 14)',
        excerpt: 'Real-world case studies and operational feedback on AI deployment in manufacturing plants, predictive automation, and asset reliability.'
      },
      5: {
        title: 'Machine Learning and Electricity Generation: A Winning Pair',
        excerpt: 'How AI optimizes gas turbine operations, predicts thermomechanical anomalies, and stabilizes power grids in West Africa.'
      },
      6: {
        title: 'Smart Meters & IoT: Revolutionizing Smart Metering in Africa',
        excerpt: 'Harnessing massive smart meter data with load forecasting models to minimize non-technical losses and modernize utility grids.'
      }
    }
  }

  const t = computed(() => translations[currentLang.value])

  return {
    currentLang,
    isEn,
    lang,
    toggleLang,
    setLang,
    t,
    projectTranslations,
    articleTranslations
  }
}
