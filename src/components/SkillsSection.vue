<template>
  <section class="section skills bg-grid" id="skills">
    <div class="skills-container-unified">
      <div class="skills-top-nav">
        <div class="section-header reveal">
          <span class="section-label">Matrice de Compétences</span>
          <h2 class="section-title">Domaines d'<span class="text-accent">Expertise</span></h2>
          <p class="section-subtitle">Expertise pointue en Data Science et Machine Learning appliquée aux infrastructures énergétiques. </p>
        </div>
        
        <div class="carousel-controls reveal">
          <button @click="scroll('prev')" class="control-btn" aria-label="Précédent">
            <span class="arrow">‹</span>
          </button>
          <button @click="scroll('next')" class="control-btn" aria-label="Suivant">
            <span class="arrow">›</span>
          </button>
        </div>
      </div>

      <div class="horizontal-scroll-wrapper reveal">
        <div class="skills-horizontal" ref="scrollContainer">
          <div v-for="(cat, index) in skillCategories" :key="cat.title" 
               class="skill-category-card-h">
            <div class="category-header">
              <div class="pixel-box" :class="getColor(index)">
                <div class="category-icon" v-html="cat.icon"></div>
              </div>
              <h3>{{ cat.title }}</h3>
            </div>
            
            <div class="skill-list">
              <div v-for="skill in cat.items" :key="skill" class="skill-pill">
                {{ skill }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const scrollContainer = ref(null)

const skillCategories = [
  {
    title: 'Machine Learning Engineering',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    items: ['Modèles d\'IA pour entreprises', 'Conception de systèmes RAG', 'MLOps & Pipeline Deployment', 'Deep Learning (PyTorch/TF)', 'FastAPI & Microservices']
  },
  {
    title: 'Data Science & Maintenance',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    items: ['Maintenance Prédictive', 'Analyse de Séries Temporelles', 'Statistiques Avancées', 'Python (Scikit-Learn, Pandas)', 'SQL / NoSQL (InfluxDB)']
  },
  {
    title: 'Fullstack Web Development',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/></svg>',
    items: ['Dashboards d\'Analyse de Données', 'React.js & Vue.js', 'FastAPI & Django', 'State Management (Pinia/Redux)', 'Tailwind CSS']
  },
  {
    title: 'Data Engineering & IoT',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 8v4l3 3"/></svg>',
    items: ['Apache Kafka / MQTT', 'ETL Pipelines (Airflow)', 'Data Acquisition (SCADA)', 'Edge Computing', 'Monitoring Industriel']
  }
]

const scroll = (direction) => {
  if (!scrollContainer.value) return
  const scrollAmount = 440
  scrollContainer.value.scrollBy({
    left: direction === 'next' ? scrollAmount : -scrollAmount,
    behavior: 'smooth'
  })
}

const getColor = (index) => {
  const colors = ['orange', 'blue', 'yellow', 'red']
  return colors[index % colors.length]
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
.skills {
  background-color: var(--cream);
  padding: 8rem 0;
  overflow: hidden;
}

.skills-container-unified {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.skills-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
}

.section-header {
  margin-bottom: 0;
}

.carousel-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.control-btn {
  width: 50px;
  height: 50px;
  background: var(--black);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: var(--accent);
}

.control-btn .arrow {
  color: var(--white);
  font-size: 1.8rem;
  font-weight: 300;
}

.horizontal-scroll-wrapper {
  padding: 1rem 0;
}

.skills-horizontal {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 2rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.skills-horizontal::-webkit-scrollbar {
  display: none;
}

.skill-category-card-h {
  flex: 0 0 420px;
  background: var(--white);
  border: 1px solid var(--gray-200);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  scroll-snap-align: start;
}

.skill-category-card-h:hover {
  border-color: var(--accent);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.04);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.pixel-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pixel-box.orange { background-color: var(--accent); }
.pixel-box.blue { background-color: #2D31FA; }
.pixel-box.yellow { background-color: #FFB800; }
.pixel-box.red { background-color: #FF4D4D; }

.category-icon svg {
  width: 24px;
  height: 24px;
}

.category-header h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--black);
  letter-spacing: -0.5px;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skill-pill {
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.8rem 1.25rem;
  background: var(--accent-light);
  border-radius: 2px;
  color: var(--black);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.skill-pill::before {
  content: '›';
  color: var(--accent);
  font-size: 1.2rem;
  font-weight: 800;
}

@media (max-width: 768px) {
  .skill-category-card-h {
    flex: 0 0 320px;
    padding: 2rem;
  }
  .skills-top-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
}
</style>

