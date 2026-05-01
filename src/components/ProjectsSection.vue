<template>
  <section class="section projects" id="work">
    <div class="section-header reveal">
      <span class="section-label">Sélection de Travaux</span>
      <h2 class="section-title">Impact & Innovation</h2>
      <p class="section-subtitle">Solutions technologiques pour les défis énergétiques de demain.</p>
    </div>
    
    <div class="projects-decorations">
      <img src="/images/decorations/predictive-iot.png" class="deco-item deco-1" alt="Deco 1" />
      <img src="/images/decorations/maintenance-strategy.jpg" class="deco-item deco-2" alt="Deco 2" />
    </div>

    <div class="projects-grid">
      <div class="project-card reveal" v-for="(project, index) in projects" 
           :key="project.id" 
           :style="{ transitionDelay: (index * 100) + 'ms' }"
           @click="openModal(project)">
        <div class="project-image-wrapper">
          <img :src="project.image" :alt="project.title" />
          <div class="project-info-overlay">
            <span class="project-category">{{ project.tags[0] }}</span>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-excerpt-hover">{{ project.shortDescription }}</p>
            <span class="view-project">Détails →</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Premium -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="selectedProject" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">✕</button>
          
          <div class="modal-grid">
            <div class="modal-image-side">
              <img :src="selectedProject.image" :alt="selectedProject.title" />
            </div>
            <div class="modal-info-side">
              <span class="modal-label">Projet</span>
              <h2 class="modal-title">{{ selectedProject.title }}</h2>
              <p class="modal-description">{{ selectedProject.fullDescription }}</p>
              
              <div class="modal-tags">
                <span v-for="tag in selectedProject.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              
              <div class="modal-footer">
                <a v-if="selectedProject.link" :href="selectedProject.link" target="_blank" class="btn btn-dark">Consulter</a>
                <a v-if="selectedProject.github" :href="selectedProject.github" target="_blank" class="btn btn-outline-dark">Code Source</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedProject = ref(null)

const projects = [
  {
    id: 1,
    title: 'Energy Load Forecasting',
    shortDescription: 'Algorithmes de régression pour la prédiction de charge réseau.',
    fullDescription: 'Développement de modèles de régression linéaire et polynomiale pour anticiper la demande énergétique nationale. Analyse de séries temporelles intégrant des variables météorologiques et socio-économiques.',
    image: '/images/projects/load-forecasting.png',
    tags: ['Machine Learning', 'Regression', 'Data Science'],
    link: null
  },
  {
    id: 2,
    title: 'Industrial Data Pipeline',
    shortDescription: 'Architecture ETL pour le monitoring en temps réel.',
    fullDescription: 'Mise en place de pipelines de données robustes utilisant Apache Kafka et FastAPI pour l\'acquisition et le traitement de données provenant de milliers de capteurs IoT industriels.',
    image: '/images/projects/data-pipeline.png',
    tags: ['Data Engineering', 'FastAPI', 'MLOps'],
    link: null
  },
  {
    id: 3,
    title: 'Supervision VRIDI II',
    shortDescription: 'Maquette de supervision SCADA pour turbines industrielles.',
    fullDescription: 'Conception de maquette d\'écran de supervision (SCADA) pour la maintenance proactive du site CIPREL. Interface HMI optimisée pour le suivi des turbines.',
    image: '/images/projects/motor-analytics.jpg',
    tags: ['Supervision', 'SCADA', 'Industrie 4.0'],
    link: null
  },
  {
    id: 4,
    title: 'Dashboard KANARI',
    shortDescription: 'Analytique du mix énergétique et de la charge du réseau.',
    fullDescription: 'Maquette analytique visualisant la charge du réseau électrique ivoirien et le mix énergétique pour la transition vers des énergies propres.',
    image: '/images/projects/kanari-dashboard.png',
    tags: ['Data Viz', 'Energy Mix', 'Analytics'],
    link: 'https://kanari.energy'
  }
]

const openModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
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
  position: relative;
  overflow: hidden;
}

.projects-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.deco-item {
  position: absolute;
  opacity: 0.1;
  filter: grayscale(1);
  border-radius: 50%;
  transition: all 1s ease;
}

.deco-1 {
  width: 300px;
  top: 10%;
  left: -100px;
  animation: float-slow 15s ease-in-out infinite;
}

.deco-2 {
  width: 400px;
  bottom: 10%;
  right: -150px;
  animation: float-slow 20s ease-in-out infinite reverse;
}

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, 50px) rotate(5deg); }
  66% { transform: translate(-20px, 30px) rotate(-5deg); }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  cursor: pointer;
  background: var(--gray-100);
}

.project-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0, 0, 1);
}

.project-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: var(--white);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
}

.project-card:hover .project-info-overlay {
  transform: translateY(0);
  opacity: 1;
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-category {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 0.5rem;
  display: block;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.project-excerpt-hover {
  font-size: 0.9rem;
  color: var(--gray-300);
  margin-bottom: 1.5rem;
  line-height: 1.4;
  max-width: 90%;
}

.view-project {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: var(--white);
  width: 100%;
  max-width: 1000px;
  position: relative;
  overflow: hidden;
  animation: modalSlide 0.5s cubic-bezier(0.2, 0, 0, 1);
}

@keyframes modalSlide {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: var(--black);
  color: var(--white);
  border: none;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-image-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info-side {
  padding: 4rem;
}

.modal-description {
  font-size: 1.1rem;
  color: var(--gray-600);
  margin: 2rem 0;
  line-height: 1.7;
}

.modal-tags {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--gray-100);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
  .modal-grid { grid-template-columns: 1fr; }
  .modal-info-side { padding: 2rem; }
}
</style>
