<template>
  <section class="section experience" id="experience">
    <div class="experience-header-container">
      <div class="section-header reveal">
        <span class="section-label">Parcours Professionnel</span>
        <h2 class="section-title">Expérience & Vision</h2>
        <p class="section-subtitle">Une trajectoire dédiée à l'innovation énergétique et digitale.</p>
      </div>
    </div>
    
    <div class="experience-grid">
      <div v-for="(exp, index) in experiences" :key="exp.id" 
           class="experience-card reveal"
           :style="{ transitionDelay: (index * 100) + 'ms' }">
        <div class="pixel-icon-clean" v-html="exp.icon"></div>
        <h3 class="exp-title">{{ exp.title }}</h3>
        <p class="exp-company">{{ exp.company }} <span class="location">· {{ exp.period }}</span></p>
        <p class="exp-desc">{{ exp.description }}</p>
      </div>
    </div>

    <!-- Academic Excellence Section -->
    <div class="education-grid-section reveal">
      <div class="edu-header-centered">
        <h2 class="edu-main-title">Passez à la vitesse supérieure dans votre formation.</h2>
      </div>

      <div class="edu-modern-grid">
        <div v-for="edu in education" :key="edu.id" class="edu-item">
          <div class="edu-icon-black">
            <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h3 class="edu-item-title">{{ edu.school }}</h3>
          <p class="edu-item-desc">{{ edu.degree }} <br> <span class="edu-item-period">{{ edu.period }}</span></p>
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
    period: 'Déc 2025 – Aujourd\'hui',
    description: 'Plateforme open data et analytique pour le secteur énergétique. Implémentation de modèles de prédiction de charge et analyse des mix énergétiques régionaux.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>'
  },
  {
    id: 2,
    title: 'Machine Learning & IoT Specialist (Intern)',
    company: 'CIPREL',
    period: 'Août 2025 – Déc 2025',
    description: 'Développement de modèles de Machine Learning pour le monitoring prédictif des actifs industriels. Analyse avancée des données de turbines.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
  },
  {
    id: 3,
    title: 'Chef de Projet Performance Énergétique',
    company: 'Inovatec Côte d\'Ivoire',
    period: 'Sept 2021 – Avr 2025',
    description: 'Gestion de la performance opérationnelle et analytique des infrastructures critiques. Optimisation de la consommation énergétique.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 8v4l3 3"/></svg>'
  }
]

const education = [
  {
    id: 1,
    degree: 'Master of Science, Artificial Intelligence',
    school: 'DataCamp / Isheero Benin 🇧🇯',
    period: '2025 – 2027'
  },
  {
    id: 3,
    degree: 'Licence Énergétique et Génie Climatique option IoT',
    school: 'CNAM / Eranove Academy',
    period: '2024 – 2026'
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
.experience {
  background-color: var(--cream);
  padding: 8rem 0;
}

.experience-header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
  margin-bottom: 5rem;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto 10rem;
  padding: 0 6%;
}

.experience-card {
  background: #F9F7F2;
  padding: 2.5rem;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.experience-card:hover {
  transform: translateY(-8px);
  background: var(--white);
  box-shadow: 0 20px 50px rgba(0,0,0,0.03);
}

.pixel-icon-clean {
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.pixel-icon-clean :deep(svg) {
  width: 32px !important;
  height: 32px !important;
  display: block;
}

.exp-title {
  font-size: 1.3rem;
  font-weight: 850;
  line-height: 1.25;
  color: var(--black);
  letter-spacing: -0.5px;
}

.exp-company {
  font-size: 1rem;
  font-weight: 700;
  color: var(--black);
}

.location {
  color: var(--gray-400);
  font-weight: 500;
  font-size: 0.9rem;
}

.exp-desc {
  font-size: 1rem;
  color: var(--gray-600);
  line-height: 1.6;
}

/* Education Grid Section */
.education-grid-section {
  padding: 10rem 0;
  background-color: var(--cream);
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 6%;
  padding-right: 6%;
}

.edu-header-centered {
  text-align: center;
  margin-bottom: 8rem;
}

.edu-main-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 850;
  line-height: 1.1;
  max-width: 1000px;
  margin: 0 auto;
}

.edu-modern-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 2rem;
}

.edu-item {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-right: 2rem;
}

.edu-icon-black svg {
  width: 24px;
  height: 24px;
}

.edu-item-title {
  font-size: 1.4rem;
  font-weight: 850;
  color: var(--black);
  line-height: 1.3;
}

.edu-item-desc {
  font-size: 1.1rem;
  color: var(--gray-600);
  line-height: 1.6;
}

.edu-item-period {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--black);
  opacity: 0.6;
  margin-top: 0.5rem;
  display: inline-block;
}

@media (max-width: 1024px) {
  .edu-modern-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .edu-modern-grid { grid-template-columns: 1fr; }
  .edu-main-title { font-size: 2.5rem; }
}
</style>
