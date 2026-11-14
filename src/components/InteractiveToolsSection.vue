<template>
  <section class="section interactive-tools" id="tools-preview">
    <div class="tools-container">
      <div class="section-header reveal">
        <div class="badge-pill">
          <span class="pulse-dot"></span>
          <span>Espace Interactif & Outils Live</span>
        </div>
        <h2 class="section-title">
          Laboratoire & <span class="text-gradient">Outils Interactifs</span>
        </h2>
        <p class="section-subtitle">
          Testez directement sur la plateforme mes simulateurs de capteurs IoT, outils de calcul CVC et visualisations de datasets énergétiques.
        </p>
      </div>

      <div class="tools-grid">
        <router-link 
          v-for="(tool, idx) in tools" 
          :key="tool.path"
          :to="tool.path"
          class="tool-card reveal"
          :style="{ transitionDelay: (idx * 90) + 'ms' }"
        >
          <div class="tool-icon-wrapper" :class="tool.colorClass">
            <component :is="tool.icon" class="tool-svg" />
          </div>

          <div class="tool-card-content">
            <div class="tool-meta">
              <span class="tool-tag">{{ tool.tag }}</span>
              <span class="tool-badge-live">LIVE APP</span>
            </div>
            <h3 class="tool-title">{{ tool.title }}</h3>
            <p class="tool-desc">{{ tool.description }}</p>
          </div>

          <div class="tool-card-bottom">
            <span>Lancer l'outil</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="tool-arrow">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, h } from 'vue'

const CpuIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2' }),
  h('rect', { x: '9', y: '9', width: '6', height: '6' }),
  h('line', { x1: '9', y1: '1', x2: '9', y2: '4' }),
  h('line', { x1: '15', y1: '1', x2: '15', y2: '4' }),
  h('line', { x1: '9', y1: '20', x2: '9', y2: '23' }),
  h('line', { x1: '15', y1: '20', x2: '15', y2: '23' }),
  h('line', { x1: '20', y1: '9', x2: '23', y2: '9' }),
  h('line', { x1: '20', y1: '15', x2: '23', y2: '15' }),
  h('line', { x1: '1', y1: '9', x2: '4', y2: '9' }),
  h('line', { x1: '1', y1: '15', x2: '4', y2: '15' })
])

const ThermometerIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z' })
])

const DatabaseIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }),
  h('path', { d: 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' }),
  h('path', { d: 'M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' })
])

const GlobeIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('line', { x1: '2', y1: '12', x2: '22', y2: '12' }),
  h('path', { d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' })
])

const tools = [
  {
    title: 'Simulateur IoT & Télémétrie',
    path: '/outils/iot',
    tag: 'Télémétrie & Capteurs',
    colorClass: 'c-blue',
    icon: CpuIcon,
    description: 'Générateur de flux de capteurs industriels en temps réel, monitoring de vibrations et calculs d\'anomalies en direct.'
  },
  {
    title: 'Calculateur & Outils CVC',
    path: '/outils/cvc',
    tag: 'Efficacité Énergétique',
    colorClass: 'c-orange',
    icon: ThermometerIcon,
    description: 'Boîte à outils de dimensionnement thermique, calculs de débits d\'air, bilan de puissance et optimisation énergétique.'
  },
  {
    title: 'Datasets Énergétiques Afrique',
    path: '/outils/datasets',
    tag: 'Data Science & Open Data',
    colorClass: 'c-emerald',
    icon: DatabaseIcon,
    description: 'Exploration interactive des données de production, mix énergétique et indicateurs réseau de l\'Afrique de l\'Ouest.'
  },
  {
    title: 'Cartographie Satellite Réseau',
    path: '/outils/satellite',
    tag: 'SIG & Infrastructure',
    colorClass: 'c-purple',
    icon: GlobeIcon,
    description: 'Visualisation géospatiale interactive des centrales électriques, lignes haute tension et interconnexions régionales.'
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
.interactive-tools {
  background: var(--white);
  padding: 8rem 0;
  position: relative;
}

.tools-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(244, 91, 32, 0.08);
  border: 1px solid rgba(244, 91, 32, 0.25);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.2rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(244, 91, 32, 0.7);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 91, 32, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(244, 91, 32, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 91, 32, 0); }
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent) 0%, #E31B23 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.8rem;
  margin-top: 3.5rem;
}

.tool-card {
  background: var(--cream);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 2.2rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
  overflow: hidden;
}

.tool-card:hover {
  transform: translateY(-6px);
  border-color: var(--black);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
  background: var(--white);
}

.tool-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.tool-card:hover .tool-icon-wrapper {
  transform: scale(1.1);
}

.tool-svg {
  width: 24px;
  height: 24px;
}

.c-blue { background: #EBF2FF; color: #0047FF; }
.c-orange { background: #FFF0E6; color: #F45B20; }
.c-emerald { background: #E6FBF2; color: #00A86B; }
.c-purple { background: #F3E8FF; color: #7928CA; }

.tool-card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tool-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.tool-tag {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-500);
}

.tool-badge-live {
  font-size: 0.65rem;
  font-weight: 800;
  color: #00E676;
  background: rgba(0, 230, 118, 0.1);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
}

.tool-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 850;
  color: var(--black);
  line-height: 1.3;
  margin-bottom: 0.8rem;
}

.tool-desc {
  font-size: 0.88rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: 2rem;
}

.tool-card-bottom {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--black);
  margin-top: auto;
  transition: color 0.2s ease;
}

.tool-card:hover .tool-card-bottom {
  color: var(--accent);
}

.tool-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.tool-card:hover .tool-arrow {
  transform: translateX(4px);
}

@media (max-width: 1200px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
