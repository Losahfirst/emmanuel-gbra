<template>
  <section class="section awards" id="awards">
    <div class="section-header reveal">
      <span class="section-label">Distinctions & Impact</span>
      <h2 class="section-title">Reconnaissance</h2>
      <p class="section-subtitle">Prix et distinctions reçus pour l'innovation technologique.</p>
    </div>
    
    <div class="awards-list">
      <div v-for="(award, index) in awards" :key="award.id" 
           class="award-item reveal"
           :style="{ transitionDelay: (index * 150) + 'ms' }">
        <div class="award-date">{{ award.date }}</div>
        <div class="award-content">
          <h3 class="award-title">{{ award.title }}</h3>
          <span class="award-rank">{{ award.rank }}</span>
          <p class="award-desc">{{ award.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const awards = [
  {
    id: 1,
    title: 'Hackathon GS2E 2025 (CIE / SODECI)',
    date: '2025',
    rank: '1er Prix - Innovation IA',
    description: 'Vainqueur avec une solution IA multilingue permettant aux citoyens de communiquer en langues locales (Baoulé, Dioula, Bété) via WhatsApp.'
  },
  {
    id: 2,
    title: 'Hackathon Green Tech – Eranove Academy',
    date: '2025',
    rank: '1er Prix & Meilleur Pitcher',
    description: 'Lauréat pour le projet EcoBin+, une solution IoT de tri intelligent des déchets présentée lors de l\'inauguration du TechLab.'
  },
  {
    id: 3,
    title: 'Meilleur Étudiant – Info-Télécom',
    date: '2021',
    rank: 'Major de Promotion',
    description: 'Distinction académique majeure pour l\'excellence dans la filière Informatique Télécommunication.'
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
.awards-list {
  max-width: 1000px;
  margin: 0 auto;
}

.award-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 4rem;
  padding: 3rem 0;
  border-bottom: 1px solid var(--gray-200);
  transition: all 0.4s ease;
}

.award-item:hover {
  transform: translateX(10px);
}

.award-date {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent);
}

.award-title {
  font-size: 1.6rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.award-rank {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
}

.award-desc {
  font-size: 1.1rem;
  color: var(--gray-500);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .award-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem 0;
  }
}
</style>
