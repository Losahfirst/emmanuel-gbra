<template>
  <section class="section awards bg-grid" id="awards">
    <div class="awards-container-unified">
      <div class="awards-top-nav">
        <div class="section-header reveal">
          <span class="section-label">Distinctions & Impact</span>
          <h2 class="section-title"><span class="text-accent">Reconnaissance</span></h2>
          <p class="section-subtitle">Prix et distinctions reçus pour l'innovation technologique et l'excellence.</p>
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
        <div class="awards-horizontal" ref="scrollContainer">
          <div v-for="(award, index) in awards" :key="award.id" 
               class="award-card-h">
            <div class="award-header">
              <div class="award-icon-box" :class="getColor(index)">
                 <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                   <path d="M12 15l-2 5L9 9l11 4-5 2zm0 0l4 8" />
                 </svg>
              </div>
              <span class="award-date">{{ award.date }}</span>
            </div>
            
            <div class="award-body">
              <h3 class="award-title">{{ award.title }}</h3>
              <span class="award-rank">{{ award.rank }}</span>
              <p class="award-desc">{{ award.description }}</p>
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

const scroll = (direction) => {
  if (!scrollContainer.value) return
  const scrollAmount = 470
  scrollContainer.value.scrollBy({
    left: direction === 'next' ? scrollAmount : -scrollAmount,
    behavior: 'smooth'
  })
}

const awards = [
  {
    id: 1,
    title: 'Hackathon GS2E 2025 (CIE / SODECI)',
    date: '2025',
    rank: '1er Prix - Innovation IA',
    description: 'Vainqueur avec une solution IA multilingue permettant aux citoyens de communiquer en langues locales via WhatsApp.'
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

const getColor = (index) => {
  const colors = ['red', 'orange', 'blue']
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
.awards {
  background-color: var(--white);
  padding: 10rem 0;
  overflow: hidden;
  border-top: 1px solid var(--gray-200);
}

.awards-container-unified {
  max-width: 1400px;
  margin: 0 auto;
}

.awards-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 6%;
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

.text-accent {
  color: var(--accent);
}

.horizontal-scroll-wrapper {
  padding: 4rem 6%;
}

.awards-horizontal {
  display: flex;
  overflow-x: auto;
  gap: 2.5rem;
  padding-bottom: 2rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.awards-horizontal::-webkit-scrollbar {
  display: none;
}

.award-card-h {
  flex: 0 0 450px;
  background: var(--cream);
  border: 1px solid var(--gray-200);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  scroll-snap-align: start;
}

.award-card-h:hover {
  background: var(--white);
  border-color: var(--black);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.award-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.award-icon-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.award-icon-box svg {
  width: 24px;
  height: 24px;
}

.award-date {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--gray-400);
}

.award-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 950;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  color: var(--black);
}

.award-rank {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 1.5rem;
}

.award-desc {
  font-size: 1.05rem;
  color: var(--gray-600);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .award-card-h {
    flex: 0 0 320px;
    padding: 2rem;
  }
}
</style>

