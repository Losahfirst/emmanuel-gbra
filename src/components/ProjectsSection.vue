<template>
  <section class="projects-section section" id="projects">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">PROJETS & INNOVATIONS</h2>
        <p class="section-subtitle">Solutions technologiques au service de l'efficacité énergétique et du développement durable</p>
      </div>
      <div class="projects-grid">
        <div class="project-card" v-for="(project, index) in projects" :key="index">
          <ProjectLogo 
            :name="project.title" 
            :imageUrl="project.logoUrl"
            :fallbackIcon="project.iconName"
            size="md"
          />
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="(tech, i) in project.technologies" :key="i" class="tech-badge">{{ tech }}</span>
          </div>
          <div class="project-links" v-if="project.link">
            <a :href="project.link" target="_blank" class="project-link">
              Voir le projet →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProjectLogo from './ProjectLogo.vue'

const projects = [
  {
    iconName: 'bolt',
    title: 'KANARI Energy Monitoring Énergétique d\'Afrique',
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4E0BAQHpc5zzJ8GLJQ/company-logo_100_100/B4EZY9a03xHgAU-/0/1744787165175?e=1767830400&v=beta&t=RTaSjH2GaVltqJN5VJLozCSr0Faxrnsb9lyCgu187zk', // Note: Vérifiez si vous avez un logo local plus pro
    description: 'Suite de plateformes Big Data (Energy, Mining, Water) dédiée au monitoring temps réel des secteurs critiques en Afrique de l’Ouest. Kanari centralise des flux massifs de données historiques et temps réel via des dashboards haute fidélité, offrant une couverture multi-pays complète et une API REST robuste pour l\'intégration décisionnelle.',
    technologies: [
        'Python (Scrapy / Pandas / FastAPI)', 
        'WebSockets / Real-time Data',
        'PostgreSQL / TimeScaleDB', 
        'REST API Design'
    ],
    link: 'https://kanari.ecobin.tech/' 
},
  {
    iconName: 'gas-turbine',
    title: 'Analyse Prédictive des Turbines à Gaz',
    logoUrl: 'https://thumbs.dreamstime.com/b/ic%C3%B4ne-de-centrale-thermique-vectorielle-illustration-l-usine-d-%C3%A9lectricit%C3%A9-des-sources-%C3%A9nergie-traditionnelles-jour-la-terre-249173291.jpg', // À remplacer par le logo CIPREL si disponible
    description: 'Application Big Data pour l\'analyse et la prédiction des arrêts des turbines à gaz à la CIPREL. Intégration IoT et Machine Learning pour optimiser les performances. Cette expertise en monitoring énergétique a inspiré le développement de KANARI Energy, une plateforme de visualisation du mix énergétique national.',
    technologies: ['Django', 'Vue.js', 'PostgreSQL', 'Scikit-learn', 'Random Forest', 'ETL'],
    link: null
  },
  {
    iconName: 'sparkles',
    title: 'Ecobin+ - Poubelle Intelligente',
    description: 'Poubelle connectée capable de reconnaître automatiquement les déchets et effectuer le tri sélectif. Solution IoT avec panneau solaire et application mobile.',
    technologies: ['IoT', 'Machine Learning', 'Mobile App', 'Solar Energy'],
    link: 'https://rfi.my/BrJ0',
    logoUrl: 'https://s.rfi.fr/media/display/8080a1ac-6261-11f0-9bc7-005056a97e36/w:1024/1-7-1.jpeg'// À remplacer par le logo Ecobin+ si disponible
  },
  {
    iconName: 'globe',
    title: 'Site Web Paul Ginies',
    logoUrl: 'https://paulginies.com/d.jpeg',
    description: 'Conception et hébergement d\'un site web professionnel avec Vue.js et Node.js, mettant en avant l\'expertise et les réalisations de Monsieur Paul Ginies',
    technologies: ['Vue.js', 'Node.js', 'Web Development'],
    link: 'https://paulginies.com/'
  },
  {
    iconName: 'mobile',
    title: 'Plateforme QR Code SICTA',
    description: 'Plateforme de génération de QR codes pour la SICTA, développée avec Flask et React.js, permettant une gestion efficace des codes QR.',
    technologies: ['Flask', 'React.js', 'Python', 'Backend'],
    link: 'https://emmanuelgbra.pythonanywhere.com/',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdymmtr-mGpLiO6h_QIvtBgElSqWbyP_dGfQ&s'
  },
  {
    iconName: 'cpu',
    title: 'Modèle IA Transformers TTS/STT',
    description: 'Intégration de modèles Transformers pour la transcription et synthèse vocale en langue locale Dioula, utilisant Hugging Face.',
    technologies: ['Transformers', 'Hugging Face', 'NLP', 'TTS', 'STT'],
    link: null,
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvAJhsMcU0wohrj9ok1VMlaxfngB7JN0MxdQ&s'
  },
  {
    iconName: 'users',
    title: 'Chatbot Interactif',
    description: 'Conception de chatbots interactifs pour Telegram et WhatsApp avec intégration d\'API, offrant une expérience utilisateur fluide.',
    technologies: ['Telegram API', 'WhatsApp API', 'Python', 'Chatbot'],
    link: null,
    logoUrl: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Knms/di-dong/1-chatbot-ai-la-gi.jpg'
  },
  {
    iconName: 'hand', // Ou 'video' selon votre bibliothèque d'icônes
    title: 'Contrôle Gestuel par IA',
    description: 'Développement d\'un algorithme de vision par ordinateur permettant de piloter un ordinateur par gestes (déplacement du curseur, clics) en temps réel.',
    technologies: ['Python',  'MediaPipe', 'Vision par ordinateur'],
    link: 'https://www.linkedin.com/posts/korekou-emmanuel-gbra_ia-reconnaissancedimage-technologie-ugcPost-7314465519724625920-KyfK?utm_source=share&utm_medium=member_desktop&rcm=ACoAADIxZAgBar6Sg6SQUOd4eA86pTAqzXJf3nc',
    logoUrl: 'https://advertisingweek.com/wp-content/uploads/2023/10/ai-machine-learning-robot-hand-ai-artificial-intelligence-assistance-human-touching-on-big.jpg_s1024x1024wisk20cCbA1aSI-cfn3vkm3YfbkJvc7Jm3tZVJ5aibR8mYT-8w.jpg' 
  // Note : J'ai suggéré une image de haute qualité sur l'IA/Robotique, 
  // mais vous pouvez utiliser une capture d'écran de votre propre démo LinkedIn !
},

{
  iconName: 'book-open',
  title: 'Vulgarisation : ML & Énergétique',
  description: 'Partage d\'expertise sur l\'application du Machine Learning (Scikit-learn) pour prédire les pics de consommation. Une approche pédagogique liant IoT et maintenance prédictive pour relever les défis énergétiques en Afrique. Cette expertise a été mise en pratique dans KANARI Energy, une plateforme de monitoring énergétique en temps réel.',
  technologies: ['Scikit-learn', 'IoT',  'Efficacité Énergétique'],
  link: 'https://www.linkedin.com/posts/korekou-emmanuel-gbra_iot-machinelearning-energie-activity-7352090015633395713-2ONe?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADIxZAgBar6Sg6SQUOd4eA86pTAqzXJf3nc',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/8055/8055576.png'
}
]
</script>

<style scoped>
.projects-section {
  background: var(--bg-light);
  margin: 2rem;
  border-radius: 2rem;
  padding: 4rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-game);
  position: relative;
}

.project-card :deep(.project-logo) {
  margin-bottom: 1.5rem;
  align-self: flex-start;
}

.project-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
}

.project-card:nth-child(odd) {
  background: var(--white);
}

.project-card:nth-child(even) {
  background: var(--accent-yellow);
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

.project-description {
  font-size: 0.95rem;
  color: var(--light-gray);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  font-weight: 400;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-badge {
  font-size: 0.8rem;
  padding: 0.375rem 0.875rem;
  background: var(--white);
  color: var(--dark-gray);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
}

.project-links {
  margin-top: auto;
}

.project-link {
  color: var(--dark-gray);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--border-color);
  background: var(--white);
}

.project-link:hover {
  background: var(--accent-orange);
  color: var(--white);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
}

@media (max-width: 968px) {
  .projects-section {
    margin: 1rem;
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .projects-section {
    margin: 0.5rem;
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .project-card {
    padding: 1.25rem;
  }
  
  .project-title {
    font-size: 1.25rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
}
</style>
