<template>
  <section class="section projects" id="work">
    <h2 class="section-title">Mes Projets</h2>
    <p class="section-subtitle">Projets récents en ML, IoT et Data</p>
    
    <div class="projects-grid">
      <div class="project-card" v-for="project in projects" :key="project.id" @click="openModal(project)">
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="project-overlay">
            <span>Voir détails</span>
          </div>
        </div>
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="selectedProject" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>
          
          <div class="modal-body">
            <h2>{{ selectedProject.title }}</h2>
            <p class="modal-description">{{ selectedProject.fullDescription }}</p>
            
            <div class="modal-tags">
              <span v-for="tag in selectedProject.tags" :key="tag">{{ tag }}</span>
            </div>
            
            <div class="modal-actions">
              <a v-if="selectedProject.link" :href="selectedProject.link" target="_blank" class="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Voir le projet
              </a>
              <a v-if="selectedProject.github" :href="selectedProject.github" target="_blank" class="btn btn-outline">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedProject = ref(null)

const openModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const projects = [
  {
    id: 1,
    title: 'Kanari - Energy Dashboard',
    description: 'Dashboard analytique pour le secteur énergétique ivoirien.',
    fullDescription: 'Dashboard analytique complet pour visualiser et analyser les données du secteur énergétique de la Côte d\'Ivoire. Suivi en temps réel de la production, consommation, et mix énergétique avec graphiques interactifs et KPIs.',
    image: '/kanari-screenshot.png',
    tags: ['Vue.js', 'Python', 'Supabase', 'Charts', 'Data Viz'],
    link: 'https://kanari.energy',
    github: 'https://github.com/emmanuel-gbra/kanari'
  },
  {
    id: 2,
    title: 'EcoBin - Poubelle Intelligente',
    description: 'Poubelle connectée IoT avec tri automatique.',
    fullDescription: 'Poubelle intelligente connectée développée lors du Hackathon Green Tech. Système IoT avec capteurs de niveau, tri automatique des déchets par type, et application mobile pour le suivi en temps réel du remplissage et statistiques de recyclage.',
    image: '/ecobin-screenshot.jpg',
    tags: ['IoT', 'ESP32', 'Flutter', 'Firebase', 'Capteurs'],
    link: 'https://rfi.my/BrJ0',
    github: 'https://github.com/emmanuel-gbra/ecobin-plus'
  },
  {
    id: 3,
    title: 'Ecofier - ERP Pont Bascule',
    description: 'Système ERP pour la gestion des pesées.',
    fullDescription: 'Système ERP complet pour la gestion des opérations de ponts bascules. Gestion des pesées entrantes/sortantes, facturation automatique, rapports détaillés, gestion des clients et des véhicules, intégration avec balances électroniques.',
    image: '/ecofier-screenshot.png',
    tags: ['Django', 'PostgreSQL', 'Vue.js', 'REST API', 'Docker'],
    link: 'https://ecofier-site.vercel.app/',
    github: null
  },
  {
    id: 4,
    title: 'Site M. Paul Ginies',
    description: 'Site web professionnel moderne.',
    fullDescription: 'Site web professionnel pour M. Paul Ginies avec un design moderne, élégant et entièrement responsive. Portfolio de ses travaux, page de contact, et intégration avec les réseaux sociaux.',
    image: '/paulginies-screenshot.png',
    tags: ['Vue.js', 'Tailwind CSS', 'Responsive', 'SEO'],
    link: 'https://paulginies.com',
    github: null
  },
  {
    id: 5,
    title: 'CIE WELE - Chatbot Telegram',
    description: 'Chatbot IA multilingue pour la CIE.',
    fullDescription: 'Solution IA conversationnelle via Telegram pour la Compagnie Ivoirienne d\'Électricité (CIE). Support des langues locales ivoiriennes (Baoulé, Dioula, Bété), assistance pour les factures, signalement de pannes, et informations sur les services.',
    image: '/ciewele-screenshot.png',
    tags: ['Telegram Bot', 'NLP', 'AI/ML', 'Cloud', 'Python'],
    link: 'https://t.me/Welecie_bot',
    github: null
  },
  {
    id: 6,
    title: 'Turbine Predictive Maintenance',
    description: 'Prédiction des arrêts de turbines à gaz.',
    fullDescription: 'Application de maintenance prédictive pour les turbines à gaz de CIPREL. Analyse des données opérationnelles, détection d\'anomalies avec Machine Learning (Random Forest, XGBoost), et prédiction des arrêts pour optimiser la maintenance.',
    image: 'https://www.africa50.com/fileadmin/uploads/africa50/Photos/Images/Project/Malicounda_power_plant.jpg',
    tags: ['Django', 'Scikit-learn', 'PostgreSQL', 'ETL', 'ML'],
    link: null,
    github: null
  }
]
</script>

<style scoped>
.project-card {
  cursor: pointer;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(16, 185, 129, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-overlay span {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-image {
  position: relative;
  overflow: hidden;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalIn 0.3s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: white;
  transform: scale(1.1);
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body h2 {
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 1rem;
}

.modal-description {
  color: #6B7280;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.modal-tags span {
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  background: #D1FAE5;
  color: #059669;
  border-radius: 15px;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.modal-actions .btn-primary {
  background: #10B981;
  color: white;
  border: none;
}

.modal-actions .btn-primary:hover {
  background: #059669;
}

.modal-actions .btn-outline {
  background: transparent;
  color: #374151;
  border: 2px solid #E5E7EB;
}

.modal-actions .btn-outline:hover {
  border-color: #374151;
  background: #F9FAFB;
}
</style>
