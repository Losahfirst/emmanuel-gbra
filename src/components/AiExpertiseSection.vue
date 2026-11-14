<template>
  <section class="section ai-expertise" id="expertise">
    <div class="expertise-container">
      <div class="section-header reveal">
        <div class="badge-pill">
          <span class="pulse-dot"></span>
          <span>Core Capabilities</span>
        </div>
        <h2 class="section-title">
          Expertise & <span class="text-gradient">Ingénierie IA</span>
        </h2>
        <p class="section-subtitle">
          De la recherche appliquée au déploiement en production, je construis des solutions d'intelligence artificielle robustes et à fort impact.
        </p>
      </div>

      <div class="pillars-grid">
        <div 
          v-for="(pillar, idx) in pillars" 
          :key="pillar.id"
          class="pillar-card reveal"
          :style="{ transitionDelay: (idx * 100) + 'ms' }"
        >
          <div class="pillar-top">
            <div class="pillar-icon-box" :class="pillar.colorClass">
              <component :is="pillar.icon" class="pillar-icon" />
            </div>
            <span class="pillar-number">0{{ idx + 1 }}</span>
          </div>

          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-desc">{{ pillar.description }}</p>

          <div class="pillar-highlights">
            <div v-for="item in pillar.highlights" :key="item" class="highlight-item">
              <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>{{ item }}</span>
            </div>
          </div>

          <div class="pillar-tags">
            <span v-for="tag in pillar.tags" :key="tag" class="tech-tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <!-- Live Terminal / Stack Showcase Banner -->
      <div class="tech-matrix-banner reveal">
        <div class="matrix-header">
          <div class="terminal-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="matrix-title">AI & Data Engineering Stack</span>
        </div>
        <div class="tech-categories">
          <div class="tech-cat">
            <span class="cat-label">IA & LLMs</span>
            <div class="cat-badges">
              <span>LangChain</span>
              <span>LlamaIndex</span>
              <span>RAG</span>
              <span>OpenAI / Mistral API</span>
              <span>Whisper (Audio)</span>
              <span>Vector DBs (Chroma/Pinecone)</span>
            </div>
          </div>
          <div class="tech-cat">
            <span class="cat-label">ML & Data Science</span>
            <div class="cat-badges">
              <span>Python</span>
              <span>PyTorch</span>
              <span>Scikit-Learn</span>
              <span>Pandas / Polars</span>
              <span>Time Series Forecasting</span>
              <span>Anomaly Detection</span>
            </div>
          </div>
          <div class="tech-cat">
            <span class="cat-label">Backend & Fullstack</span>
            <div class="cat-badges">
              <span>FastAPI</span>
              <span>Vue.js 3</span>
              <span>Node.js</span>
              <span>PostgreSQL</span>
              <span>Supabase</span>
              <span>Docker & REST APIs</span>
            </div>
          </div>
          <div class="tech-cat">
            <span class="cat-label">IoT & Messagerie</span>
            <div class="cat-badges">
              <span>WhatsApp Cloud API</span>
              <span>Telegram Bot API</span>
              <span>MQTT</span>
              <span>Telemetry SCADA</span>
              <span>Edge Computing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, h } from 'vue'

const BotIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { x: '3', y: '11', width: '18', height: '10', rx: '2' }),
  h('circle', { cx: '12', cy: '5', r: '2' }),
  h('path', { d: 'M12 7v4' }),
  h('line', { x1: '8', y1: '16', x2: '8.01', y2: '16' }),
  h('line', { x1: '16', y1: '16', x2: '16.01', y2: '16' })
])

const BrainIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z' }),
  h('path', { d: 'M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z' })
])

const ActivityIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('polyline', { points: '22 12 18 12 15 21 9 3 6 12 2 12' })
])

const ServerIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { x: '2', y: '2', width: '20', height: '8', rx: '2', ry: '2' }),
  h('rect', { x: '2', y: '14', width: '20', height: '8', rx: '2', ry: '2' }),
  h('line', { x1: '6', y1: '6', x2: '6.01', y2: '6' }),
  h('line', { x1: '6', y1: '18', x2: '6.01', y2: '18' })
])

const pillars = [
  {
    id: 1,
    title: 'Agents IA & Architectures RAG',
    description: 'Conception de pipelines RAG avancés, connectés à des bases vectorielles et documents d\'entreprise pour des réponses fiables et contextualisées.',
    icon: BrainIcon,
    colorClass: 'color-orange',
    highlights: [
      'Pipelines RAG multi-sources avec vector search',
      'Orchestration d\'agents autonomes & tool calling',
      'Guardrails & évaluation de fidélité des réponses',
      'Intégration d\'APIs de pointe (Mistral, OpenAI, Claude)'
    ],
    tags: ['RAG', 'Vector Embeddings', 'LangChain', 'LlamaIndex', 'ChromaDB']
  },
  {
    id: 2,
    title: 'Chatbots & Voice AI Conversationnels',
    description: 'Déploiement de bots intelligents sur WhatsApp, Telegram et web, incluant la génération et compréhension vocale en langues locales.',
    icon: BotIcon,
    colorClass: 'color-blue',
    highlights: [
      'Intégration native WhatsApp Business & Telegram Bot API',
      'Synthèse vocale (TTS) et Audio AI en langues africaines',
      'Dashboards de monitoring, logs & métriques de support',
      'Taux de résolution élevé avec fallback humain fluide'
    ],
    tags: ['WhatsApp Cloud API', 'Voice AI', 'NLP', 'TTS', 'Telegram API']
  },
  {
    id: 3,
    title: 'Machine Learning & Maintenance Prédictive',
    description: 'Modélisation statistique et algorithmes prédictifs pour l\'optimisation industrielle, la détection d\'anomalies et la prévision de séries temporelles.',
    icon: ActivityIcon,
    colorClass: 'color-emerald',
    highlights: [
      'Prévision de charge électrique & mix énergétique',
      'Algorithmes de détection d\'anomalies en temps réel',
      'Traitement de signaux SCADA et données de turbines',
      'Indicateurs KPI de fiabilité industrielle'
    ],
    tags: ['PyTorch', 'Scikit-Learn', 'Time Series', 'SCADA', 'Pandas']
  },
  {
    id: 4,
    title: 'Ingénierie Full-Stack & Systèmes Scalables',
    description: 'Développement d\'interfaces réactives, d\'APIs ultra-rapides et d\'architectures cloud conçues pour scaler en production.',
    icon: ServerIcon,
    colorClass: 'color-purple',
    highlights: [
      'Microservices haute performance avec FastAPI & Node',
      'Applications web modernes en Vue.js 3 / React',
      'Bases de données SQL & NoSQL optimisées',
      'Déploiement Docker, pipelines CI/CD & Cloud'
    ],
    tags: ['FastAPI', 'Vue.js 3', 'Supabase', 'PostgreSQL', 'Docker']
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
.ai-expertise {
  background: var(--cream);
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
}

.expertise-container {
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

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.pillar-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.pillar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: var(--accent);
  transition: height 0.4s ease;
}

.pillar-card:hover {
  transform: translateY(-6px);
  border-color: var(--black);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.06);
}

.pillar-card:hover::before {
  height: 100%;
}

.pillar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.pillar-icon-box {
  width: 54px;
  height: 54px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.pillar-card:hover .pillar-icon-box {
  transform: scale(1.1);
}

.pillar-icon {
  width: 26px;
  height: 26px;
}

.color-orange { background: #FFF0E6; color: #F45B20; }
.color-blue { background: #EBF2FF; color: #0047FF; }
.color-emerald { background: #E6FBF2; color: #00A86B; }
.color-purple { background: #F3E8FF; color: #7928CA; }

.pillar-number {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--gray-300);
}

.pillar-title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 850;
  color: var(--black);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.pillar-desc {
  font-size: 0.98rem;
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.pillar-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--gray-700);
  line-height: 1.4;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 1px;
}

.pillar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-100);
}

.tech-tag {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--gray-100);
  color: var(--black);
  padding: 0.35rem 0.75rem;
  border-radius: 3px;
}

/* Tech Matrix Banner */
.tech-matrix-banner {
  background: var(--black);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
}

.matrix-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #FF5F56; }
.dot.yellow { background: #FFBD2E; }
.dot.green { background: #27C93F; }

.matrix-title {
  color: var(--white);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 2.5rem 2rem;
  gap: 2rem;
}

.tech-cat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cat-label {
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.cat-badges {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cat-badges span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cat-badges span::before {
  content: '›';
  color: var(--accent);
  font-weight: 800;
}

@media (max-width: 1024px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
  .tech-categories {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .tech-categories {
    grid-template-columns: 1fr;
  }
  .pillar-card {
    padding: 2rem;
  }
}
</style>
