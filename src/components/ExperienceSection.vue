<template>
  <section class="section experience" id="experience">
    <div class="section-header reveal">
      <span class="section-label">Parcours Professionnel</span>
      <h2 class="section-title">Expérience & Vision</h2>
      <p class="section-subtitle">Une trajectoire dédiée à l'innovation énergétique et digitale.</p>
    </div>
    
    <div class="experience-grid">
      <div v-for="(exp, index) in experiences" :key="exp.id" 
           class="experience-card reveal"
           :style="{ transitionDelay: (index * 100) + 'ms' }">
        <div class="exp-header">
          <span class="exp-date">{{ exp.period }}</span>
          <span class="exp-type">{{ exp.type }}</span>
        </div>
        <h3 class="exp-title">{{ exp.title }}</h3>
        <p class="exp-company">{{ exp.company }} <span v-if="exp.location">| {{ exp.location }}</span></p>
        <p class="exp-desc">{{ exp.description }}</p>
        <div class="exp-techs">
          <span v-for="tech in exp.techs" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </div>

    <!-- Education Inline for clean layout -->
    <div class="education-section reveal">
      <h3 class="edu-heading">Formation Académique</h3>
      <div class="edu-grid">
        <div v-for="edu in education" :key="edu.id" class="edu-item">
          <span class="edu-date">{{ edu.period }}</span>
          <div class="edu-content">
            <h4>{{ edu.degree }}</h4>
            <p class="edu-school">{{ edu.school }}</p>
            <p v-if="edu.details" class="edu-details">{{ edu.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const experiences = [
  {
    id: 1,
    title: 'Founder',
    company: 'KANARI AFRICA',
    type: 'Temps plein',
    location: 'Abidjan · Hybride',
    period: 'Déc 2025 – Aujourd\'hui',
    description: 'Plateforme open data et analytique pour le secteur énergétique. Implémentation de modèles de prédiction de charge et analyse des mix énergétiques régionaux via des pipelines de données automatisés.',
    techs: ['Data Science', 'Energy Analytics', 'ML Pipelines']
  },
  {
    id: 2,
    title: 'Machine Learning & IoT Specialist (Intern)',
    company: 'CIPREL',
    type: 'Alternance',
    location: 'Abidjan',
    period: 'Août 2025 – Déc 2025',
    description: 'Développement de modèles de Machine Learning pour le monitoring prédictif des actifs industriels. Analyse avancée des données de turbines pour l\'optimisation opérationnelle.',
    techs: ['ML Engineering', 'Time Series', 'Industrial IoT']
  },
  {
    id: 3,
    title: 'Chef de Projet Performance Énergétique',
    company: 'Inovatec Côte d\'Ivoire',
    type: 'CDI',
    location: 'Abidjan',
    period: 'Sept 2021 – Avr 2025',
    description: 'Gestion de la performance opérationnelle et analytique des infrastructures critiques. Optimisation de la consommation énergétique via le monitoring et l\'analyse de données.',
    techs: ['Data Management', 'Energy Efficiency', 'Project Leadership']
  }
]

const education = [
  {
    id: 1,
    degree: 'Master of Science, Artificial Intelligence',
    school: 'DataCamp / Isheero Benin 🇧🇯',
    period: '2025 – 2027',
    details: 'Bourse d’étude Isheero Benin. Spécialisation en Machine Learning Engineering et Programmation Python avancée.'
  },
  {
    id: 2,
    degree: 'MBA Big Data & Intelligence Artificielle',
    school: 'Studi',
    period: '2026 – Présent',
    details: 'Stratégie d’innovation digitale, gestion de projets d’innovation et management d’équipes projet.'
  },
  {
    id: 3,
    degree: 'Licence Énergétique et Génie Climatique option IoT',
    school: 'CNAM / Eranove Academy',
    period: '2024 – 2026',
    details: 'Mention Très Bien. Focus sur la régulation énergétique, GTB/GTC et l’analyse de données IoT pour l’optimisation de performance.'
  },
  {
    id: 4,
    degree: 'Bachelor Electronics for Embedded Systems',
    school: 'Université Tertiaire et Technologique',
    period: '2020 – 2021'
  }
]

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
.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto 6rem;
}

.experience-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  padding: 3rem;
  transition: all 0.4s ease;
}

.experience-card:hover {
  background: var(--white);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  transform: translateY(-5px);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.exp-date {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
}

.exp-type {
  font-size: 0.7rem;
  background: var(--gray-200);
  padding: 0.3rem 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.exp-title {
  font-size: 1.4rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.exp-company {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--gray-500);
  margin-bottom: 1.5rem;
}

.exp-desc {
  font-size: 1rem;
  color: var(--gray-600);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.exp-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.exp-techs span {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--black);
  text-transform: uppercase;
  background: var(--white);
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--gray-200);
}

/* Education Section */
.education-section {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 4rem;
  border-top: 1px solid var(--gray-200);
}

.edu-heading {
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}

.edu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
}

.edu-item {
  display: flex;
  gap: 2rem;
}

.edu-date {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--gray-300);
}

.edu-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.edu-school {
  color: var(--black);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.edu-details {
  font-size: 0.85rem;
  color: var(--gray-500);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .edu-grid { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
