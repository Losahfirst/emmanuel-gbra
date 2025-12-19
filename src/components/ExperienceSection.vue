<template>
  <section class="experience-section section" id="experience">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">EXPÉRIENCE PROFESSIONNELLE</h2>
        <p class="section-subtitle">Un parcours dédié à l'innovation technologique et énergétique</p>
      </div>
      <div class="timeline">
        <div class="timeline-item" v-for="(exp, index) in experiences" :key="index">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3 class="timeline-title">{{ exp.title }}</h3>
              <span class="timeline-company">{{ exp.company }}</span>
              <span class="timeline-period">{{ exp.period }}</span>
            </div>
            <p class="timeline-description">{{ exp.description }}</p>
            <ul class="timeline-tasks">
              <li v-for="(task, i) in exp.tasks" :key="i">{{ task }}</li>
            </ul>
            <div class="timeline-tech">
              <span v-for="(tech, i) in exp.technologies" :key="i" class="tech-tag">{{ tech }}</span>
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
    title: 'Alternance en IoT et Data Monitoring',
    company: 'CIPREL',
    period: 'Août 2025 – Décembre 2025',
    description: 'Développement d\'applications Big Data pour l\'analyse prédictive des assets, notamment des turbines à gaz.',
    tasks: [
      'Conception d\'application web d\'analyse et de prédiction des arrêts des turbines à gaz avec Django, Vue.js et PostgreSQL',
      'Mise en place de pipelines ETL pour le traitement automatique des données d\'exploitation à partir de données CSV',
      'Conception de tableaux de bord de monitoring et d\'analyse des données',
      'Classification des données par Random Forest avec Scikit-learn'
    ],
    technologies: ['Django', 'Vue.js', 'PostgreSQL', 'Python', 'Scikit-learn', 'ETL', 'Big Data']
  },
  {
    title: 'Chef de Projet Maintenance',
    company: 'INOVATEC',
    period: 'Septembre 2021 – Mai 2025',
    description: 'Gestion de projets de maintenance intelligente et développement de solutions IoT pour le monitoring.',
    tasks: [
      'Conception d\'application de monitoring de température et humidité avec Flutter, Firebase, ESP32 et module DHT11',
      'Mise en place du service ISmart pour la gestion intelligente de la maintenance avec solutions GMAO et GTB',
      'Gestion de projets de maintenance pour ONOMO AEROPORT, PLAYCE MARCORY, COPHARMED DJIBI, Carrefour Market, NOOM HOTEL PLATEAU',
      'Gestion de la maintenance CVC, groupe électrogène et onduleurs des agences MTN Abidjan et Up-Country'
    ],
    technologies: ['Flutter', 'Firebase', 'ESP32', 'IoT', 'GMAO', 'GTB']
  }
]
</script>

<style scoped>
.experience-section {
  background: var(--bg-light);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  padding: 4rem 0;
  box-shadow: var(--shadow-game);
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;
}

.timeline-marker {
  position: absolute;
  left: -1.5rem;
  top: 0.5rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-purple);
  border: 4px solid white;
  box-shadow: 0 0 0 3px var(--primary-purple);
}

.timeline-content {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
}

.timeline-content:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
}

.timeline-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  flex: 1;
  min-width: 200px;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

.timeline-company {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-purple);
}

.timeline-period {
  font-size: 0.9rem;
  color: var(--light-gray);
  background: #F7FAFC;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
}

.timeline-description {
  font-size: 1rem;
  color: var(--light-gray);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.timeline-tasks {
  list-style: none;
  margin: 1rem 0;
  padding-left: 0;
}

.timeline-tasks li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--light-gray);
  line-height: 1.6;
}

.timeline-tasks li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--primary-teal);
  font-weight: bold;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tech-tag {
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  background: var(--accent-orange);
  color: var(--white);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
}

@media (max-width: 968px) {
  .experience-section {
    margin: 1rem;
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline-item {
    padding-left: 2rem;
  }
  
  .timeline-content {
    padding: 1.5rem;
  }
  
  .timeline-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .experience-section {
    margin: 0.5rem;
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .timeline {
    padding-left: 1rem;
  }
  
  .timeline-item {
    padding-left: 1.5rem;
  }
  
  .timeline-content {
    padding: 1.25rem;
  }
  
  .timeline-title {
    font-size: 1.25rem;
  }
  
  .timeline-tasks li {
    font-size: 0.9rem;
  }
}
</style>
