<template>
  <section class="skills-section section" id="skills">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">COMPÉTENCES & EXPERTISE</h2>
        <p class="section-subtitle">Un éventail de technologies maîtrisées pour l'innovation énergétique</p>
      </div>
      <div class="skills-content">
        <div class="skills-category" v-for="(category, index) in skillCategories" :key="index">
          <h3 class="category-title">{{ category.title }}</h3>
          <div class="skills-grid">
            <div class="skill-item" v-for="(skill, i) in category.skills" :key="i">
              <TechLogo :name="skill.name" size="sm" />
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="certifications">
        <h3 class="certifications-title">Formations & Certifications</h3>
        <div class="certifications-grid">
          <div class="cert-item" v-for="(cert, index) in certifications" :key="index">
            <img 
                     src="https://cdn-icons-png.flaticon.com/512/6785/6785648.png" 
                    
                     style="width: 25%; height: 25%; "
                  />
            <div class="cert-content">
              <h4>{{ cert.title }}</h4>
              <p>{{ cert.institution }}</p>
              <span class="cert-period">{{ cert.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TechLogo from './TechLogo.vue'
import InstitutionLogo from './InstitutionLogo.vue'

const skillCategories = [
  {
    title: 'Machine Learning & IA',
    skills: [
      { name: 'Scikit-learn' },
      { name: 'Random Forest' },
      { name: 'XGBoost' },
      { name: 'Deep Learning' },
      { name: 'PyTorch' },
      { name: 'Transformers' },
      { name: 'Hugging Face' },
      { name: 'MLOps' },
      { name: 'Computer vision' }
    ]
  },
  {
    title: 'Développement Web & Backend',
    skills: [
      { name: 'Python' },
      { name: 'Django' },
      { name: 'Flask' },
      { name: 'Vue.js' },
      { name: 'React.js' },
      { name: 'Node.js' },
      { name: 'PostgreSQL' },
      { name: 'REST API' }
    ]
  },
  {
    title: 'IoT & Big Data',
    skills: [
      { name: 'Internet des Objets' },
      { name: 'ESP32' },
      { name: 'Big Data' },
      { name: 'ETL Pipelines' },
      { name: 'Data Analysis' },
      { name: 'SQL' },
      { name: 'Firebase' },
      { name: 'Docker' }
    ]
  },
  {
    title: 'Outils & Méthodologies',
    skills: [
      { name: 'Git' },
      { name: 'CI/CD' },
      { name: 'Postman' },
      { name: 'Pytest' },
      { name: 'Agile' },
      { name: 'GMAO' },
      { name: 'GTB' },
      { name: 'Flutter' }
    ]
  }
]

const certifications = [
  {
    title: 'Machine Learning Engineering',
    institution: 'DataCamp (Bourse ISHEERO 2025)',
    period: 'Juillet 2025 – Mai 2026'
  },
  {
    title: 'Licence en Internet des Objets',
    institution: 'Eranove Academy',
    period: '2024 – Mars 2026'
  },
  {
    title: 'Licence en Électronique et Automatisme',
    institution: 'UTT LOKO',
    period: '2018 - 2021'
  }
]
</script>

<style scoped>
.skills-section {
  background: var(--bg-light);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  padding: 4rem 0;
}

.skills-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

.skills-category {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E2E8F0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: var(--white);
  border-radius: 1rem;
  transition: all 0.2s ease;
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.05);
}

.skill-item:hover {
  background: var(--accent-yellow);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
}


.skill-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--dark-gray);
}

.certifications {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
}

.certifications-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E2E8F0;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.cert-item {
  display: flex;
  gap: 1rem;
  padding: 1.75rem;
  background: var(--white);
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
}

.cert-item:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-yellow);
}


.cert-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
}

.cert-content p {
  font-size: 0.95rem;
  color: var(--primary-purple);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.cert-period {
  font-size: 0.85rem;
  color: var(--light-gray);
  background: #F7FAFC;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  display: inline-block;
}

@media (max-width: 968px) {
  .skills-section {
    margin: 1rem;
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skills-category {
    padding: 1.5rem;
  }
  
  .certifications {
    padding: 1.5rem;
  }
  
  .certifications-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .skills-section {
    margin: 0.5rem;
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .skills-category {
    padding: 1.25rem;
  }
  
  .skill-item {
    padding: 0.75rem;
  }
  
  .cert-item {
    padding: 1.25rem;
    flex-direction: column;
    text-align: center;
  }
}
</style>
