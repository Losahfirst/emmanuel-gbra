<template>
  <section class="section certifications bg-grid" id="certifications">
    <div class="certs-container-unified">
      <div class="certs-top-nav">
        <div class="section-header reveal">
          <span class="section-label">Formation Continue</span>
          <h2 class="section-title">Certifications & <span class="text-accent">Accréditations</span></h2>
          <p class="section-subtitle">Un engagement constant pour l'excellence et la maîtrise des technologies émergentes.</p>
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

      <div class="certs-filter reveal">
        <button v-for="cat in categories" :key="cat" 
                :class="['filter-btn', { active: activeCategory === cat }]"
                @click="activeCategory = cat">
          {{ cat }}
        </button>
      </div>
      
      <div class="horizontal-scroll-wrapper reveal">
        <div class="certs-horizontal" ref="scrollContainer">
          <div v-for="(cert, index) in filteredCerts" :key="cert.id" 
               class="cert-card-h">
            <div class="cert-header">
              <div class="issuer-box">
                <component :is="getIssuerIcon(cert.issuer)" class="issuer-icon" />
              </div>
              <span class="issuer-name">{{ cert.issuer }}</span>
            </div>
            
            <div class="cert-body">
              <span class="cert-date">{{ cert.date }}</span>
              <h3 class="cert-name">{{ cert.title }}</h3>
              <div class="cert-skills">
                <span v-for="skill in cert.skills" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
            </div>

            <div class="cert-footer">
              <span v-if="cert.id_num" class="cert-id">ID: {{ cert.id_num }}</span>
              <a v-if="cert.link" :href="cert.link" target="_blank" class="cert-link">
                VÉRIFIER
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="12" height="12">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GraduationCap, Award, BookOpen, ShieldCheck, Cpu, Zap } from 'lucide-vue-next'

const scrollContainer = ref(null)
const activeCategory = ref('Tous')
const categories = ['Tous', 'IA & Data', 'Énergie & Industrie', 'Dev & Systèmes']

const scroll = (direction) => {
  if (!scrollContainer.value) return
  const scrollAmount = 370
  scrollContainer.value.scrollBy({
    left: direction === 'next' ? scrollAmount : -scrollAmount,
    behavior: 'smooth'
  })
}

const getIssuerIcon = (issuer) => {
  if (issuer.includes('NVIDIA') || issuer.includes('Microchip')) return Cpu
  if (issuer.includes('OpenClassrooms')) return BookOpen
  if (issuer.includes('Schneider') || issuer.includes('ELEC')) return Zap
  if (issuer.includes('AFD')) return ShieldCheck
  return GraduationCap
}

const certs = [
  { id: 1, title: 'Mettez en place un RAG pour un LLM', issuer: 'OpenClassrooms', date: 'Avr 2026', category: 'IA & Data', skills: ['RAG', 'Deep Learning', 'LLM'], link: '#' },
  { id: 4, title: 'AI for All: From Basics to GenAI Practice', issuer: 'NVIDIA', date: 'Avr 2025', category: 'IA & Data', skills: ['GenAI', 'Deep Learning', 'GPU'] },
  { id: 2, title: 'Hydrogène - Transport and Storage', issuer: 'IFP School / FUN', date: 'Avr 2026', category: 'Énergie & Industrie', skills: ['Hydrogène', 'Stockage', 'Transport'] },
  { id: 5, title: 'Approvisionnement en énergie', issuer: 'Schneider Electric University', date: 'Sept 2025', category: 'Énergie & Industrie', skills: ['Energy Supply', 'Markets'] },
  { id: 6, title: 'Systèmes énergétiques : objectif bas carbone', issuer: 'IFP School / FUN', date: 'Août 2025', category: 'Énergie & Industrie', skills: ['Low Carbon', 'Renewable Energy'] },
  { id: 7, title: 'Python For Beginners', issuer: 'OpenCV University', date: 'Juin 2025', category: 'IA & Data', skills: ['Python', 'Data Structures'], id_num: '0b0a3b2a762a46daad41fa59a3d99fc7' },
  { id: 8, title: 'Exploring Linux Build Systems (Buildroot)', issuer: 'Microchip Technology', date: 'Avr 2024', category: 'Dev & Systèmes', skills: ['Embedded Linux', 'Buildroot'], id_num: 'x77ub52jo3k8' }
]

const filteredCerts = computed(() => {
  if (activeCategory.value === 'Tous') return certs
  return certs.filter(c => c.category === activeCategory.value)
})

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
.certifications {
  background: var(--white);
  padding: 10rem 0;
  overflow: hidden;
}

.certs-container-unified {
  max-width: 1400px;
  margin: 0 auto;
}

.certs-top-nav {
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

.certs-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 4rem 0;
  padding: 0 6%;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.25rem;
  background: var(--cream);
  border: 1px solid var(--gray-200);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active, .filter-btn:hover {
  background: var(--black);
  color: var(--white);
  border-color: var(--black);
}

.horizontal-scroll-wrapper {
  padding: 0 6% 4rem;
}

.certs-horizontal {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 2rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.certs-horizontal::-webkit-scrollbar {
  display: none;
}

.cert-card-h {
  flex: 0 0 350px;
  background: var(--cream);
  padding: 2rem;
  border: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  scroll-snap-align: start;
}

.cert-card-h:hover {
  background: var(--white);
  border-color: var(--black);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.cert-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.issuer-box {
  width: 40px;
  height: 40px;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
}

.issuer-icon {
  color: var(--white);
  width: 20px;
  height: 20px;
}

.issuer-name {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cert-date {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0.5rem;
  display: block;
}

.cert-name {
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 1.25;
  color: var(--black);
  min-height: 2.5em;
}

.cert-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.skill-tag {
  font-size: 0.6rem;
  font-weight: 800;
  background: var(--white);
  color: var(--gray-500);
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--gray-200);
}

.cert-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cert-id {
  font-size: 0.6rem;
  color: var(--gray-400);
  font-family: monospace;
}

.cert-link {
  font-size: 0.7rem;
  font-weight: 900;
  text-decoration: none;
  color: var(--black);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cert-link:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .cert-card-h {
    flex: 0 0 300px;
  }
}
</style>

