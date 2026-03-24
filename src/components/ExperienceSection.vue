<template>
  <section class="section experience" id="experience">
    <div class="section-header">
      <span class="section-label">Mon Parcours</span>
      <h2 class="section-title">Expériences & Formation</h2>
      <p class="section-subtitle">De l'ingénierie terrain à la Data Science appliquée à l'énergie</p>
    </div>
    
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
              <p class="timeline-company">{{ exp.company }} · {{ exp.location }}</p>
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
    title: 'Co-Founder – Energy Data Platform & Smart Energy Analytics',
    company: 'KANARI AFRICA',
    type: 'Co-Founder',
    location: 'Nairobi, Kenya · Hybride',
    period: 'Déc 2025 – Aujourd\'hui',
    description: 'Plateforme d\'analyse et de valorisation des données énergétiques en Afrique de l\'Ouest. Collecte, structuration et analyse de données pour décisions stratégiques.',
    techs: ['Full-Stack', 'Gestion de projet', 'Data Analytics', 'Energy']
  },
  {
    id: 2,
    title: 'IoT & Energy Data Monitoring Engineer',
    company: 'Compagnie Ivoirienne de Production d\'Electricité (CIPREL)',
    type: 'Apprentissage',
    location: 'Abidjan, Côte d\'Ivoire',
    period: 'Août 2025 – Déc 2025',
    description: 'Analyse des données d\'arrêts turbines, pipelines ETL, tableaux de bord de monitoring et prédiction des arrêts critiques.',
    techs: ['Machine Learning', 'Python', 'ETL', 'Data Viz', 'Django']
  },
  {
    id: 3,
    title: 'Data Monitoring & Evaluation Analyst',
    company: 'SAYNA – Talent4Startup',
    type: 'Freelance',
    location: 'À distance',
    period: 'Mai 2025 – Août 2025',
    description: 'Collecte, structuration des données des apprenants et suivi-évaluation des performances des participants.',
    techs: ['Data Analysis', 'Monitoring', 'Evaluation', 'Reporting']
  },
  {
    id: 4,
    title: 'Technical Project Manager – Industrial Systems',
    company: 'Inovatec Côte d\'Ivoire',
    type: 'CDI',
    location: 'Abidjan · Hybride',
    period: 'Août 2021 – Avr 2025',
    description: 'Gestion de projets CVC, groupes électrogènes (2000KVA, 500KVA), ascenseurs et maintenance multi-technique pour Noom Hotel, MTN, JECEDA.',
    techs: ['Gestion de projet', 'Electronics', 'Maintenance', 'CVC']
  }
]

const education = [
  {
    id: 1,
    degree: 'Licence CNAM – IoT appliqué à l\'énergétique',
    school: 'Eranove Academy',
    period: 'Oct 2024 – Mars 2026',
    description: 'IoT pour la production d\'électricité, optimisation énergétique, maintenance prédictive. 🏆 Meilleur Pitcher Hackathon Green Tech 2025.'
  },
  {
    id: 2,
    degree: 'ML Engineering & Intelligence Artificielle',
    school: 'DataCamp – Bourse ISHERRO 2025-2026',
    period: 'Juil 2025',
    description: 'NLP, Deep Reinforcement Learning, MLOps, Deep Learning (PyTorch), XGBoost, Docker, Design Patterns.'
  },
  {
    id: 3,
    degree: 'Bachelor Electronics for Embedded Systems',
    school: 'Université Tertiaire et Technologique',
    period: '2020 – 2021',
    description: 'Informatique, Télécommunication, Électronique, Automatisme. 🏆 Meilleur Étudiant Filière Info-Télécom 2021.'
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
</style>
