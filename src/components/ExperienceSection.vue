<template>
  <section class="section experience" id="experience">
    <h2 class="section-title">Parcours</h2>
    <p class="section-subtitle">Expériences professionnelles et formation</p>
    
    <div class="timeline-container">
      <!-- Experiences -->
      <div class="timeline-section">
        <h3 class="timeline-label">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
          </svg>
          Expériences
        </h3>
        
        <div class="timeline">
          <div class="timeline-item" v-for="exp in experiences" :key="exp.id">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">{{ exp.period }}</span>
                <span class="timeline-type">{{ exp.type }}</span>
              </div>
              <h4>{{ exp.title }}</h4>
              <p class="timeline-company">{{ exp.company }}</p>
              <p class="timeline-desc">{{ exp.description }}</p>
              <div class="timeline-techs">
                <span v-for="tech in exp.techs" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="timeline-section">
        <h3 class="timeline-label">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
          Formation
        </h3>
        
        <div class="timeline">
          <div class="timeline-item" v-for="edu in education" :key="edu.id">
            <div class="timeline-dot edu"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">{{ edu.period }}</span>
              </div>
              <h4>{{ edu.degree }}</h4>
              <p class="timeline-company">{{ edu.school }}</p>
              <p class="timeline-desc">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experiences = [
  {
    id: 1,
    title: 'Stage IoT & Data Monitoring',
    company: 'CIPREL',
    type: 'Énergie',
    period: 'Août 2025 – Déc 2025',
    description: 'Développement d\'applications Big Data pour l\'analyse prédictive des turbines à gaz.',
    techs: ['Django', 'Vue.js', 'PostgreSQL', 'Scikit-learn', 'ETL']
  },
  {
    id: 2,
    title: 'Chef de Projet Maintenance',
    company: 'INOVATEC',
    type: 'Tech',
    period: 'Sept 2021 – Mai 2025',
    description: 'Gestion de projets IoT et solutions de maintenance intelligente (GMAO, GTB).',
    techs: ['Flutter', 'Firebase', 'ESP32', 'IoT', 'GMAO']
  }
]

const education = [
  {
    id: 1,
    degree: 'Licence CNAM - IoT appliqué à l\'énergétique',
    school: 'Eranove Academy',
    period: 'Oct 2024 – Déc 2025',
    description: 'IoT appliqué à la production d\'électricité, optimisation des performances énergétiques, maintenance prédictive.'
  },
  {
    id: 2,
    degree: 'ML Engineering & Intelligence Artificielle',
    school: 'DataCamp - Bourse ISHERRO 2025-2026',
    period: 'Juil 2025',
    description: 'NLP, Deep Reinforcement Learning, MLOps, Deep Learning (PyTorch), XGBoost, Docker.'
  },
  {
    id: 3,
    degree: 'Bachelor Electronics for Embedded Systems',
    school: 'Université Tertiaire et Technologique',
    period: '2020 – 2021',
    description: 'Informatique, Télécommunication, Électronique, Automatisme. Meilleur Étudiant Filière Info-Télécom 2021.'
  },
  {
    id: 4,
    degree: 'Baccalauréat Série C',
    school: 'Lycée Classique Bouaké',
    period: '2016 – 2018',
    description: 'Physique théorique et mathématiques.'
  }
]
</script>

<style scoped>
.experience {
  background: var(--gray);
}

.timeline-container {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.timeline-section {
  display: flex;
  flex-direction: column;
}

.timeline-label {
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary);
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gray-dark);
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.5rem;
  top: 0;
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  transform: translateX(-5px);
  border: 2px solid var(--white);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.timeline-dot.edu {
  background: var(--accent);
  box-shadow: 0 0 0 3px #FEF3C7;
}

.timeline-content {
  background: var(--white);
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.timeline-date {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 600;
}

.timeline-type {
  font-size: 0.7rem;
  background: var(--primary-light);
  color: var(--primary-dark);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
}

.timeline-content h4 {
  font-size: 0.95rem;
  color: var(--dark);
  margin-bottom: 0.25rem;
}

.timeline-company {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.timeline-desc {
  font-size: 0.8rem;
  color: var(--text-light);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.timeline-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.timeline-techs span {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  background: var(--gray);
  border-radius: 10px;
  color: var(--text);
}

@media (max-width: 768px) {
  .timeline-container {
    grid-template-columns: 1fr;
  }
}
</style>
