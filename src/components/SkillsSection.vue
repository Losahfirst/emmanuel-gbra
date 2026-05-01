<template>
  <section class="section skills" id="skills">
    <div class="section-header reveal">
      <span class="section-label">Matrice de Compétences</span>
      <h2 class="section-title">Domaines d'Expertise</h2>
      <p class="section-subtitle">Expertise pointue en Data Science et Machine Learning appliquée aux infrastructures énergétiques. </p>
    </div>

    <div class="skills-intro-decoration reveal">
      <img src="/images/decorations/ai-viz.png" alt="AI Visualization" />
    </div>
    
    <div class="skills-grid">
      <div v-for="(cat, index) in skillCategories" :key="cat.title" 
           class="skill-category-card reveal"
           :style="{ transitionDelay: (index * 100) + 'ms' }">
        <div class="category-header">
          <div class="category-icon" v-html="cat.icon"></div>
          <h3>{{ cat.title }}</h3>
        </div>
        <div class="skill-list">
          <div v-for="skill in cat.items" :key="skill" class="skill-pill">
            {{ skill }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const skillCategories = [
  {
    title: 'Fullstack Web Development',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/></svg>',
    items: ['React.js & Vue.js', 'FastAPI & Django', 'Modern Dashboard Design', 'State Management (Pinia/Redux)', 'Tailwind CSS & Framer Motion']
  },
  {
    title: 'Machine Learning Engineering',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    items: ['MLOps & Pipeline Deployment', 'Deep Learning (PyTorch/TF)', 'Algorithmes de Régression', 'NLP & LLM Integration', 'FastAPI & Microservices']
  },
  {
    title: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    items: ['Analyse de Séries Temporelles', 'Statistiques Avancées', 'Python (Scikit-Learn, Pandas)', 'Power BI & Data Viz', 'SQL / NoSQL (InfluxDB)']
  },
  {
    title: 'Data Engineering & IoT',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 8v4l3 3"/></svg>',
    items: ['Apache Kafka / MQTT', 'ETL Pipelines (Airflow)', 'Monitoring Cloud (ThingsBoard)', 'Data Acquisition (SCADA)', 'Edge Computing']
  },
  {
    title: 'Supervision Industrielle',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
    items: ['AVEVA System Platform', 'Vijeo Citect', 'OPC UA / Modbus', 'Siemens TIA Portal', 'KPI Performance Industrielle']
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
.skills-intro-decoration {
  max-width: 600px;
  margin: -2rem auto 4rem;
  text-align: center;
  opacity: 0.6;
}

.skills-intro-decoration img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  filter: grayscale(1) brightness(1.2);
  transition: all 0.5s ease;
}

.skills-intro-decoration:hover img {
  filter: grayscale(0) brightness(1);
  opacity: 1;
  transform: scale(1.02);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

.skill-category-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  padding: 3rem;
  border-radius: 4px;
  transition: all 0.4s ease;
}

.skill-category-card:hover {
  background: var(--white);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.category-icon {
  color: var(--accent);
}

.category-icon svg {
  width: 32px;
  height: 32px;
}

.category-header h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--black);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-pill {
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.skill-category-card:hover .skill-pill {
  border-color: var(--gray-300);
  color: var(--black);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
