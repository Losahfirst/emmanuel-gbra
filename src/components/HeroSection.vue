<template>
  <section class="hero" id="home">
    <div class="hero-bg-mesh">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="hero-container">
      <div class="hero-layout">
        <!-- Left Side: Main Value Proposition -->
        <div class="hero-left reveal">
          <div class="status-badge">
            <span class="status-indicator"></span>
            <span>Développeur & Architecte IA · Disponible pour missions</span>
          </div>

          <h1 class="hero-title">
            Bâtir l'IA de production.<br>
            <span class="text-gradient">Agents, RAG & Systèmes.</span>
          </h1>

          <p class="hero-subtitle">
            Je conçois et déploie des <strong>chatbots intelligents</strong>, des <strong>architectures RAG sur mesure</strong>, des solutions de <strong>maintenance prédictive</strong> et des applications web à fort impact opérationnel.
          </p>

          <div class="hero-actions">
            <a href="#projects" class="btn-hero-primary">
              <span>Explorer mes Projets (9)</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-arrow">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#articles" class="btn-hero-secondary">
              <span>Articles & Recherches</span>
            </a>
            <a href="#contact" class="btn-hero-ghost">
              <span>Me contacter</span>
            </a>
          </div>

          <!-- Quick Tech Stack Floating Bar -->
          <div class="hero-stack-row">
            <span class="stack-label">Stack Maîtrisée :</span>
            <div class="stack-badges">
              <span class="stack-badge">LangChain</span>
              <span class="stack-badge">FastAPI</span>
              <span class="stack-badge">PyTorch</span>
              <span class="stack-badge">Vue.js 3</span>
              <span class="stack-badge">WhatsApp API</span>
              <span class="stack-badge">RAG</span>
            </div>
          </div>
        </div>

        <!-- Right Side: Live AI Interactive Simulation Card -->
        <div class="hero-right reveal">
          <div class="ai-terminal-card">
            <div class="terminal-bar">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="terminal-icon">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <span>AI Agent Live Workflow</span>
              </div>
              <span class="model-tag">GPT-4o / Mistral Large</span>
            </div>

            <div class="terminal-body">
              <div class="prompt-box">
                <span class="prompt-prefix">user@query:</span>
                <span class="typed-text">{{ currentPrompt }}</span>
                <span class="cursor-blink">|</span>
              </div>

              <div class="agent-step-list">
                <div 
                  v-for="(step, sIdx) in activeSteps" 
                  :key="sIdx"
                  class="agent-step"
                  :class="step.type"
                >
                  <div class="step-icon">
                    <span v-if="step.type === 'retrieve'">🔍</span>
                    <span v-else-if="step.type === 'reason'">⚡</span>
                    <span v-else-if="step.type === 'execute'">⚙️</span>
                    <span v-else>✨</span>
                  </div>
                  <div class="step-info">
                    <span class="step-title">{{ step.title }}</span>
                    <span class="step-detail">{{ step.detail }}</span>
                  </div>
                  <span class="step-timing">{{ step.time }}</span>
                </div>
              </div>

              <!-- Live KPI metrics footer in card -->
              <div class="terminal-metrics">
                <div class="mini-kpi">
                  <span class="kpi-num">87.5%</span>
                  <span class="kpi-lbl">Taux Résolution CIE</span>
                </div>
                <div class="mini-kpi">
                  <span class="kpi-num">245ms</span>
                  <span class="kpi-lbl">Temps Réponse</span>
                </div>
                <div class="mini-kpi">
                  <span class="kpi-num">9+</span>
                  <span class="kpi-lbl">Systèmes Déployés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live KPI Impact Stats Strip -->
      <div class="hero-stats-strip reveal">
        <div class="stat-item">
          <span class="stat-value">9+</span>
          <span class="stat-title">Systèmes & Plateformes IA</span>
          <span class="stat-sub">Déployés en production</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">87.5%</span>
          <span class="stat-title">Résolution Chatbot Automatique</span>
          <span class="stat-sub">Sur projet CIE Wélé</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">4+</span>
          <span class="stat-title">Langues & Synthèse Vocale</span>
          <span class="stat-sub">Born of Spirit Audio AI</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">100%</span>
          <span class="stat-title">Architecture Production-Ready</span>
          <span class="stat-sub">Sécurisé & Scalable</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentPrompt = ref("Analyse l'arrêt de la turbine VRIDI 2 et prépare la note vocale WhatsApp CIE...")

const activeSteps = ref([
  { type: 'retrieve', title: 'Vector Search & Embeddings', detail: 'ChromaDB : 4 segments de doc technique CIE récupérés', time: '18ms' },
  { type: 'reason', title: 'RAG Reasoning & Agent Flow', detail: 'Validation du diagnostic thermique et calcul de corrélation', time: '112ms' },
  { type: 'execute', title: 'Tool Execution : Speech AI', detail: 'Génération du flux audio TTS & envoi webhook WhatsApp', time: '94ms' }
])

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
.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 130px 0 60px;
}

.hero-bg-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.25;
  transition: all 1s ease;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: var(--accent);
  top: -150px;
  right: 5%;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: #0047FF;
  bottom: -100px;
  left: 0;
  opacity: 0.2;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

.hero-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 6%;
  position: relative;
  z-index: 10;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4.5rem;
  align-items: center;
  margin-bottom: 5rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.8rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #00E676;
  border-radius: 50%;
  box-shadow: 0 0 10px #00E676;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5.2vw, 4.8rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -2px;
  color: var(--white);
  margin-bottom: 1.8rem;
}

.text-gradient {
  background: linear-gradient(135deg, #FFB800 0%, #F45B20 50%, #FF4D4D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.65;
  max-width: 620px;
  margin-bottom: 2.8rem;
  font-weight: 400;
}

.hero-subtitle strong {
  color: var(--white);
  font-weight: 600;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--accent);
  color: var(--white);
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  box-shadow: 0 10px 30px rgba(244, 91, 32, 0.35);
}

.btn-hero-primary:hover {
  background: #ff6d38;
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(244, 91, 32, 0.5);
}

.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.btn-hero-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1rem 1.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-hero-ghost {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  padding: 1rem 1.2rem;
  transition: color 0.3s ease;
}

.btn-hero-ghost:hover {
  color: var(--accent);
}

.hero-stack-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.stack-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stack-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stack-badge {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
}

/* AI Terminal Card */
.ai-terminal-card {
  background: rgba(18, 18, 22, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
}

.terminal-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

.terminal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.terminal-icon {
  width: 14px;
  height: 14px;
  color: var(--accent);
}

.model-tag {
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(244, 91, 32, 0.15);
  color: var(--accent);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  border: 1px solid rgba(244, 91, 32, 0.3);
}

.terminal-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.prompt-box {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 1rem;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.prompt-prefix {
  color: #00E676;
  font-weight: 700;
  margin-right: 0.5rem;
}

.cursor-blink {
  animation: blink 1s infinite;
  color: var(--accent);
  font-weight: 900;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.agent-step-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.agent-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.agent-step:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.step-icon {
  font-size: 1.1rem;
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
}

.step-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--white);
}

.step-detail {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.step-timing {
  font-size: 0.72rem;
  font-weight: 700;
  color: #00E676;
  background: rgba(0, 230, 118, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

.terminal-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.mini-kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
}

.kpi-num {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--accent);
}

.kpi-lbl {
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

/* Stats Strip */
.hero-stats-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2.2rem 3.5rem;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--white);
  letter-spacing: -1px;
}

.stat-title {
  font-size: 0.88rem;
  font-weight: 750;
  color: var(--accent);
}

.stat-sub {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 1100px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .hero-stats-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 2rem;
  }
  .stat-divider { display: none; }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 100px;
  }
  .hero-title {
    font-size: 2.6rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-stats-strip {
    grid-template-columns: 1fr;
  }
}
</style>
