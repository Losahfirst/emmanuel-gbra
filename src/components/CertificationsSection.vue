<template>
  <section class="section certifications" id="certifications">
    <div class="section-header reveal">
      <span class="section-label">Formation Continue</span>
      <h2 class="section-title">Certifications & Accréditations</h2>
      <p class="section-subtitle">Un engagement constant pour l'excellence et la maîtrise des technologies émergentes.</p>
    </div>

    <div class="certs-filter reveal">
      <button v-for="cat in categories" :key="cat" 
              :class="['filter-btn', { active: activeCategory === cat }]"
              @click="activeCategory = cat">
        {{ cat }}
      </button>
    </div>
    
    <div class="certs-grid">
      <div v-for="(cert, index) in filteredCerts" :key="cert.id" 
           class="cert-card reveal"
           :style="{ transitionDelay: (index * 50) + 'ms' }">
        <div class="cert-issuer-logo">
          <component :is="getIssuerIcon(cert.issuer)" class="issuer-icon" />
          <span class="issuer-name">{{ cert.issuer }}</span>
        </div>
        <div class="cert-info">
          <span class="cert-date">{{ cert.date }}</span>
          <h3 class="cert-name">{{ cert.title }}</h3>
          <div class="cert-skills">
            <span v-for="skill in cert.skills" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
          <div class="cert-footer">
            <span v-if="cert.id_num" class="cert-id">ID: {{ cert.id_num }}</span>
            <a v-if="cert.link" :href="cert.link" target="_blank" class="cert-link">Voir →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GraduationCap, Award, BookOpen, ShieldCheck, Cpu, Zap } from 'lucide-vue-next'

const activeCategory = ref('Tous')
const categories = ['Tous', 'IA & Data', 'Énergie & Industrie', 'Dev & Systèmes']

const getIssuerIcon = (issuer) => {
  if (issuer.includes('NVIDIA') || issuer.includes('Microchip')) return Cpu
  if (issuer.includes('OpenClassrooms')) return BookOpen
  if (issuer.includes('Schneider') || issuer.includes('ELEC')) return Zap
  if (issuer.includes('AFD')) return ShieldCheck
  return GraduationCap
}

const certs = [
  {
    id: 1,
    title: 'Mettez en place un RAG pour un LLM',
    issuer: 'OpenClassrooms',
    date: 'Avr 2026',
    category: 'IA & Data',
    skills: ['RAG', 'Deep Learning', 'LLM'],
    link: '#'
  },
  {
    id: 2,
    title: 'Hydrogène - Transport and Storage',
    issuer: 'IFP School / FUN',
    date: 'Avr 2026',
    category: 'Énergie & Industrie',
    skills: ['Hydrogène', 'Stockage', 'Transport']
  },
  {
    id: 3,
    title: 'Menez un audit réglementaire avec Argos',
    issuer: 'OpenClassrooms',
    date: 'Avr 2026',
    category: 'Énergie & Industrie',
    skills: ['Audit Énergétique', 'Argos']
  },
  {
    id: 4,
    title: 'AI for All: From Basics to GenAI Practice',
    issuer: 'NVIDIA',
    date: 'Avr 2025',
    category: 'IA & Data',
    skills: ['GenAI', 'Deep Learning', 'GPU']
  },
  {
    id: 5,
    title: 'Approvisionnement en énergie',
    issuer: 'Schneider Electric University',
    date: 'Sept 2025',
    category: 'Énergie & Industrie',
    skills: ['Energy Supply', 'Markets']
  },
  {
    id: 6,
    title: 'Systèmes énergétiques : objectif bas carbone',
    issuer: 'IFP School / FUN',
    date: 'Août 2025',
    category: 'Énergie & Industrie',
    skills: ['Low Carbon', 'Renewable Energy']
  },
  {
    id: 7,
    title: 'Python For Beginners',
    issuer: 'OpenCV University',
    date: 'Juin 2025',
    category: 'IA & Data',
    skills: ['Python', 'Data Structures'],
    id_num: '0b0a3b2a762a46daad41fa59a3d99fc7'
  },
  {
    id: 8,
    title: 'Exploring Linux Build Systems (Buildroot)',
    issuer: 'Microchip Technology',
    date: 'Avr 2024',
    category: 'Dev & Systèmes',
    skills: ['Embedded Linux', 'Buildroot'],
    id_num: 'x77ub52jo3k8'
  },
  {
    id: 9,
    title: 'USB Type-C & Power Delivery',
    issuer: 'Microchip Technology',
    date: 'Nov 2024',
    category: 'Dev & Systèmes',
    skills: ['Embedded Systems', 'Power Delivery'],
    id_num: 'o78w65y7ukmh'
  },
  {
    id: 10,
    title: 'Dimenssionnement réseau électrique BT/HT',
    issuer: 'FC ELEC',
    date: 'Juin 2024',
    category: 'Énergie & Industrie',
    skills: ['Electrical Engineering', 'AutoCAD']
  },
  {
    id: 11,
    title: 'Suivi Evaluation de projet de developpement',
    issuer: 'AFD',
    date: 'Juil 2025',
    category: 'Énergie & Industrie',
    skills: ['Program Evaluation', 'Project Management']
  },
  {
    id: 12,
    title: 'Objectif IA : initiez-vous à l\'IA',
    issuer: 'OpenClassrooms',
    date: 'Mars 2022',
    category: 'IA & Data',
    skills: ['IA Basics'],
    id_num: '4256142560'
  },
  {
    id: 13,
    title: 'Tech the Power',
    issuer: 'Trace Academia',
    date: 'Août 2023',
    category: 'Dev & Systèmes',
    skills: ['Tech Empowerment']
  },
  {
    id: 14,
    title: 'Cloud-based Applications (WFI32)',
    issuer: 'Microchip Technology',
    date: 'Avr 2025',
    category: 'Dev & Systèmes',
    skills: ['Cloud IoT', 'Embedded C']
  },
  {
    id: 15,
    title: 'Dépannage et mise en service VRV IV',
    issuer: 'Daikin MEA',
    date: 'Oct 2024',
    category: 'Énergie & Industrie',
    skills: ['Technical Skillset', 'HVAC']
  },
  {
    id: 16,
    title: 'Apprenez les bases du langage Python',
    issuer: 'OpenClassrooms',
    date: 'Mars 2022',
    category: 'Dev & Systèmes',
    skills: ['Python', 'Basics'],
    id_num: '5233636101'
  },
  {
    id: 17,
    title: 'Les éco-gestes au quotidien',
    issuer: 'AFD',
    date: 'Févr 2025',
    category: 'Énergie & Industrie',
    skills: ['Sustainability'],
    id_num: '5780629243KG'
  },
  {
    id: 18,
    title: 'Mooc Transition Énergétique',
    issuer: 'AFD',
    date: 'Juil 2025',
    category: 'Énergie & Industrie',
    skills: ['Renewable Energy', 'Energy Management'],
    id_num: '0541689450KG'
  },
  {
    id: 19,
    title: 'Getting Started with Harmony Graphics',
    issuer: 'Microchip Technology',
    date: 'Avr 2025',
    category: 'Dev & Systèmes',
    skills: ['GUI Design', 'Embedded C++'],
    id_num: 'gb6i57tnpxeh'
  }
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
  background: var(--gray-50);
}

.certs-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  font-size: 0.75rem;
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

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.cert-card {
  background: var(--white);
  padding: 2.5rem;
  border: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.cert-card:hover {
  border-color: var(--accent);
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.cert-issuer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.issuer-icon {
  color: var(--accent);
  width: 24px;
  height: 24px;
}

.issuer-name {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-400);
}

.cert-date {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-400);
  margin-bottom: 0.5rem;
  display: block;
}

.cert-name {
  font-size: 1.2rem;
  font-weight: 850;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  min-height: 2.8em;
}

.cert-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.skill-tag {
  font-size: 0.65rem;
  font-weight: 700;
  background: var(--gray-50);
  color: var(--gray-500);
  padding: 0.3rem 0.7rem;
  text-transform: uppercase;
  border: 1px solid var(--gray-200);
}

.cert-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cert-id {
  font-size: 0.65rem;
  color: var(--gray-400);
  font-family: monospace;
}

.cert-link {
  font-size: 0.8rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--black);
  text-transform: uppercase;
}

.cert-link:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .certs-grid { grid-template-columns: 1fr; }
}
</style>
