<template>
  <section class="section skills" id="skills">
    <div class="section-header reveal">
      <span class="section-label">Matrice de Compétences</span>
      <h2 class="section-title">Domaines d'Expertise</h2>
      <p class="section-subtitle">Une approche multidisciplinaire alliant ingénierie thermique et digital. </p>
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
    title: 'Supervision & GTB/GTC',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
    items: ['Vijeo Citect / AVEVA', 'OPC UA / DA', 'MODBUS / PROFINET / BACNET', 'Siemens TIA Portal', 'Régulation Industrielle (PID)']
  },
  {
    title: 'IoT & Monitoring',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 8v4l3 3"/></svg>',
    items: ['ThingsBoard & Grafana', 'Apache Kafka / Node-RED', 'InfluxDB', 'MQTT / LoRaWAN', 'Thermographie Ti450', 'Capteurs Analogiques (4-20mA)']
  },
  {
    title: 'Analyse & Performance',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    items: ['Python (Pandas, Numpy)', 'Power BI', 'SQL / ETL Pipelines', 'Maintenance Prédictive', 'Pareto & Ishikawa', 'KPI Énergétiques']
  },
  {
    title: 'Génie Énergétique & CVC',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    items: ['AutoCAD / Revit (BIM)', 'Carrier HAP / TRACE', 'Norme ISO 50001', 'Groupes à eau glacée / VRV', 'Bilan Carbone', 'Diagrammes Psychrométriques']
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
