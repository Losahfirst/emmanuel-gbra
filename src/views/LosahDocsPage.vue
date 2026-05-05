<template>
  <div class="docs-page">
    <div class="docs-container">
      <!-- Sidebar -->
      <aside class="docs-sidebar">
        <div class="sidebar-header">
          <router-link to="/outils" class="back-link">
            <ArrowLeft size="16" /> Retour aux outils
          </router-link>
          <div class="brand">
            <svg fill="none" height="30" viewBox="0 0 20 20" width="30" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
              <path
                d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
                fill="currentColor"
              />
            </svg>
            <span>LOSAH</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <h4>Général</h4>
            <a href="#intro" :class="{ active: activeSection === 'intro' }" @click="setActive('intro')">Introduction</a>
            <a href="#install" :class="{ active: activeSection === 'install' }" @click="setActive('install')">Installation</a>
          </div>
          <div class="nav-section">
            <h4>Tutoriels</h4>
            <a href="#mttr" :class="{ active: activeSection === 'mttr' }" @click="setActive('mttr')">MTTR</a>
            <a href="#rul" :class="{ active: activeSection === 'rul' }" @click="setActive('rul')">RUL</a>
            <a href="#gamma" :class="{ active: activeSection === 'gamma' }" @click="setActive('gamma')">Gamma</a>
          </div>
          <div class="nav-section">
            <h4>Référence</h4>
            <a href="#api" :class="{ active: activeSection === 'api' }" @click="setActive('api')">Référence API</a>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="docs-content">
        <section id="intro" class="doc-section">
          <h1>Documentation Losah</h1>
          <p class="lead">Bibliothèque Python de pointe pour la maintenance prédictive et l'efficacité énergétique.</p>
          <div class="info-card">
            <p>Losah permet de transformer vos données SCADA et IoT en indicateurs de maintenance actionnables via des algorithmes spécialisés.</p>
          </div>
        </section>

        <section id="install" class="doc-section">
          <h2>🚀 Guide de Démarrage Rapide</h2>
          <h3>Installation</h3>
          <div class="code-block">
            <pre><code>pip install losah</code></pre>
            <button class="copy-btn" @click="copyText('pip install losah')">Copier</button>
          </div>
          <p>Assurez-vous d'avoir Python 3.8+ installé sur votre système.</p>
        </section>

        <section id="mttr" class="doc-section">
          <h2>Tutoriel : Analyser le MTTR</h2>
          <p>Le <strong>Mean Time To Repair</strong> est un indicateur clé de la réactivité de maintenance.</p>
          <div class="code-block python">
            <div class="code-header">python</div>
            <pre><code>import losah
import pandas as pd

# Chargement des données
df = pd.read_csv("data.csv")

# Calcul et affichage interactif
losah.mttr(df).show()</code></pre>
          </div>
        </section>

        <section id="rul" class="doc-section">
          <h2>Tutoriel : Remaining Useful Life (RUL)</h2>
          <p>Prédisez le temps restant avant la prochaine panne majeure grâce à nos modèles statistiques.</p>
          <div class="code-block python">
            <div class="code-header">python</div>
            <pre><code># Exemple de calcul RUL
prediction = losah.predict_rul(sensor_data)
print(f"RUL estimé : {prediction} heures")</code></pre>
          </div>
        </section>

        <section id="gamma" class="doc-section">
          <h2>Tutoriel : Processus Gamma</h2>
          <p>Modélisation de la dégradation continue des équipements industriels.</p>
          <div class="code-block python">
            <div class="code-header">python</div>
            <pre><code># Modélisation Gamma
model = losah.GammaModel()
model.fit(degradation_history)</code></pre>
          </div>
        </section>

        <section id="api" class="doc-section">
          <h2>Référence API</h2>
          <p>La documentation complète des classes et fonctions est disponible sur le dépôt GitHub.</p>
          <a href="https://github.com" target="_blank" class="github-link">
            <Github size="18" /> Consulter sur GitHub
          </a>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowLeft, Github } from 'lucide-vue-next'

const activeSection = ref('intro')

const setActive = (id) => {
  activeSection.value = id
}

const copyText = (text) => {
  navigator.clipboard.writeText(text)
  alert('Copié dans le presse-papier !')
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.doc-section').forEach(section => {
    observer.observe(section)
  })
})
</script>

<style scoped>
.docs-page {
  background: var(--cream);
  min-height: 100vh;
  padding-top: 90px;
}

.docs-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 4rem;
  padding: 0 6%;
}

/* Sidebar */
.docs-sidebar {
  position: sticky;
  top: 130px;
  height: calc(100vh - 150px);
  overflow-y: auto;
  padding-bottom: 2rem;
}

.sidebar-header {
  margin-bottom: 3rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--gray-400);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--black);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 900;
  font-size: 1.2rem;
  color: var(--black);
}

.brand-svg {
  color: var(--accent);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.nav-section h4 {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray-400);
  margin-bottom: 1rem;
}

.nav-section a {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--gray-600);
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.3s;
}

.nav-section a:hover, .nav-section a.active {
  color: var(--accent);
  padding-left: 5px;
}

/* Content */
.docs-content {
  padding-bottom: 10rem;
}

.doc-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.doc-section:last-child {
  border-bottom: none;
}

h1 {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 950;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
}

.lead {
  font-size: 1.25rem;
  color: var(--gray-500);
  margin-bottom: 2rem;
}

h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

p {
  line-height: 1.8;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

.info-card {
  background: var(--white);
  padding: 2rem;
  border-radius: 16px;
  border-left: 4px solid var(--accent);
  margin: 2rem 0;
}

.info-card p {
  margin-bottom: 0;
  font-weight: 500;
}

/* Code Blocks */
.code-block {
  background: var(--black);
  border-radius: 12px;
  position: relative;
  margin: 1.5rem 0;
  overflow: hidden;
}

.code-header {
  background: #252525;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--gray-400);
  text-transform: uppercase;
}

pre {
  padding: 1.5rem;
  overflow-x: auto;
}

code {
  font-family: 'Space Grotesk', monospace;
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.6;
}

.copy-btn {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.5rem;
  background: var(--black);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: transform 0.3s;
}

.github-link:hover {
  transform: translateY(-3px);
}

@media (max-width: 1024px) {
  .docs-container {
    grid-template-columns: 1fr;
  }
  .docs-sidebar {
    display: none;
  }
  h1 { font-size: 2.5rem; }
}
</style>
