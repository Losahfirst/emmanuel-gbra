<template>
  <div class="kanari-home-page">
    <KanariHeader />
    <main class="kanari-main">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <Zap :size="20" />
            <span>Plateformes de Monitoring</span>
          </div>
          <h1 class="hero-title">KANARI</h1>
          <p class="hero-subtitle">
            Suite de plateformes de référence pour le monitoring et l'analyse des secteurs 
            énergétique, minier et hydraulique en Afrique de l'Ouest
          </p>
          <p class="hero-description">
            KANARI propose trois plateformes complémentaires pour une vision globale des ressources 
            en Afrique de l'Ouest : monitoring énergétique, suivi minier et gestion hydraulique. 
            Accédez à des données précises et actualisées pour mieux comprendre et gérer ces secteurs stratégiques.
          </p>
          <div class="hero-actions">
            <a href="#kanari-modules" class="btn-primary">
              <span>Découvrir les plateformes</span>
              <ChevronDown :size="20" />
            </a>
            <a href="#features" class="btn-secondary">
              <span>Fonctionnalités Energy</span>
              <ChevronDown :size="20" />
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-value">16</div>
              <div class="stat-label">Pays couverts</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">100+</div>
              <div class="stat-label">Centrales suivies</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">24/7</div>
              <div class="stat-label">Monitoring continu</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">API</div>
              <div class="stat-label">Données accessibles</div>
            </div>
          </div>
        </div>
      </section>

      <!-- KANARI Modules Section -->
      <section id="kanari-modules" class="modules-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Les Plateformes KANARI</h2>
            <p class="section-subtitle">
              Trois plateformes complémentaires pour une vision globale des ressources en Afrique de l'Ouest
            </p>
          </div>
          <div class="modules-grid">
            <!-- KANARI Energy -->
            <div class="module-card energy">
              <div class="module-icon-wrapper">
                <div class="module-icon" style="background: linear-gradient(135deg, #3B82F6, #2563EB);">
                  <Zap :size="48" />
                </div>
              </div>
              <h3 class="module-title">KANARI Energy</h3>
              <p class="module-description">
                Plateforme de monitoring et d'analyse du secteur énergétique. Visualisez la production 
                et la consommation électrique, les centrales, le réseau et les interconnexions en temps réel.
              </p>
              <div class="module-features">
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>16 pays couverts</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>100+ centrales suivies</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Cartographie interactive</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Prédictions et analyses</span>
                </div>
              </div>
              <router-link to="/kanari-energy/dashboard" class="module-link">
                <span>Accéder à KANARI Energy</span>
                <ArrowRight :size="20" />
              </router-link>
            </div>

            <!-- KANARI Mining -->
            <div class="module-card mining">
              <div class="module-icon-wrapper">
                <div class="module-icon" style="background: linear-gradient(135deg, #F97316, #EA580C);">
                  <Hammer :size="48" />
                </div>
              </div>
              <h3 class="module-title">KANARI Mining</h3>
              <p class="module-description">
                Plateforme de suivi et d'analyse du secteur minier. Suivez l'exploitation des ressources 
                minières, les sites d'extraction, les productions et les tendances du marché.
              </p>
              <div class="module-features">
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Sites miniers référencés</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Production par minerai</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Cartographie des gisements</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Analyses de marché</span>
                </div>
              </div>
              <div class="module-link coming-soon">
                <span>Bientôt disponible</span>
                <Clock :size="20" />
              </div>
            </div>

            <!-- KANARI Water -->
            <div class="module-card water">
              <div class="module-icon-wrapper">
                <div class="module-icon" style="background: linear-gradient(135deg, #06B6D4, #0891B2);">
                  <Droplet :size="48" />
                </div>
              </div>
              <h3 class="module-title">KANARI Water</h3>
              <p class="module-description">
                Plateforme de gestion et de monitoring des ressources hydrauliques. Suivez les barrages, 
                les réseaux d'eau, la qualité de l'eau et la gestion des ressources hydriques.
              </p>
              <div class="module-features">
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Barrages et réservoirs</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Réseaux de distribution</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Qualité de l'eau</span>
                </div>
                <div class="module-feature">
                  <CheckCircle :size="18" />
                  <span>Gestion des ressources</span>
                </div>
              </div>
              <div class="module-link coming-soon">
                <span>Bientôt disponible</span>
                <Clock :size="20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Fonctionnalités Principales</h2>
            <p class="section-subtitle">
              Explorez les outils puissants de KANARI Energy pour analyser et comprendre 
              le secteur énergétique ouest-africain
            </p>
          </div>
          <div class="features-grid">
            <router-link to="/kanari-energy/dashboard" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #3B82F6, #2563EB);">
                <BarChart3 :size="32" />
              </div>
              <h3 class="feature-title">Dashboard Interactif</h3>
              <p class="feature-description">
                Vue d'ensemble complète avec indicateurs clés, graphiques interactifs et 
                statistiques en temps réel par pays.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/production" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #3B82F6, #2563EB);">
                <Zap :size="32" />
              </div>
              <h3 class="feature-title">Production Énergétique</h3>
              <p class="feature-description">
                Visualisez la production d'énergie par source (hydraulique, thermique, solaire, etc.) 
                avec des graphiques interactifs et des analyses détaillées.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/consumption" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #F97316, #EA580C);">
                <TrendingUp :size="32" />
              </div>
              <h3 class="feature-title">Consommation</h3>
              <p class="feature-description">
                Analysez les tendances de consommation nationale et spéciale avec des courbes de charge 
                et des prévisions.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/infrastructure" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
                <Network :size="32" />
              </div>
              <h3 class="feature-title">Infrastructure</h3>
              <p class="feature-description">
                Découvrez les données sur le réseau électrique, les abonnés, l'électrification rurale 
                et les infrastructures.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/centrales" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #10B981, #059669);">
                <Building2 :size="32" />
              </div>
              <h3 class="feature-title">Centrales Électriques</h3>
              <p class="feature-description">
                Explorez la liste complète des centrales de production avec leurs caractéristiques, 
                capacités et statuts opérationnels.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/mapping" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #10B981, #059669);">
                <MapPin :size="32" />
              </div>
              <h3 class="feature-title">Cartographie</h3>
              <p class="feature-description">
                Visualisez sur une carte interactive les centrales, le réseau électrique et les zones 
                de forte consommation par pays.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/prediction" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
                <TrendingUp :size="32" />
              </div>
              <h3 class="feature-title">Prédiction</h3>
              <p class="feature-description">
                Accédez aux prévisions et projections énergétiques avec des modèles de prédiction 
                pour la production, consommation et infrastructure.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>

            <router-link to="/kanari-energy/api" class="feature-card">
              <div class="feature-icon" style="background: linear-gradient(135deg, #EF4444, #DC2626);">
                <Code :size="32" />
              </div>
              <h3 class="feature-title">API REST</h3>
              <p class="feature-description">
                Accédez à toutes les données via notre API REST complète pour intégrer KANARI Energy 
                dans vos applications.
              </p>
              <span class="feature-link">Explorer →</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- News Section -->
      <section class="news-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Actualités Énergétiques</h2>
            <p class="section-subtitle">
              Restez informé des dernières nouvelles et développements dans le secteur énergétique 
              en Afrique de l'Ouest
            </p>
          </div>
          <HomeBlogSection />
        </div>
      </section>

      <!-- About Section -->
      <section class="about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-text">
              <h2 class="section-title">À Propos de KANARI</h2>
              <p class="about-description">
                KANARI est une suite de plateformes web modernes dédiées à la visualisation et au monitoring 
                en temps réel des secteurs stratégiques en Afrique de l'Ouest. Notre mission est de fournir 
                des données précises, des analyses approfondies et des visualisations interactives pour 
                faciliter la compréhension et la gestion de ces secteurs essentiels.
              </p>
              <p class="about-description">
                La suite KANARI comprend trois plateformes complémentaires : <strong>KANARI Energy</strong> 
                pour le secteur énergétique (16 pays couverts, 100+ centrales suivies), <strong>KANARI Mining</strong> 
                pour le secteur minier, et <strong>KANARI Water</strong> pour la gestion des ressources hydrauliques. 
                Chaque plateforme offre une vue complète et actualisée de son secteur respectif.
              </p>
              <div class="about-features">
                <div class="about-feature">
                  <CheckCircle :size="24" />
                  <span>Données en temps réel et historiques</span>
                </div>
                <div class="about-feature">
                  <CheckCircle :size="24" />
                  <span>Analyses et visualisations avancées</span>
                </div>
                <div class="about-feature">
                  <CheckCircle :size="24" />
                  <span>Couverture multi-pays complète</span>
                </div>
                <div class="about-feature">
                  <CheckCircle :size="24" />
                  <span>API REST pour intégration</span>
                </div>
              </div>
              <router-link to="/kanari-energy/dashboard" class="btn-primary">
                <span>Commencer maintenant</span>
                <ArrowRight :size="20" />
              </router-link>
            </div>
            <div class="about-visual">
              <div class="visual-card">
                <Network :size="48" />
                <h3>Réseau Interconnecté</h3>
                <p>Visualisation du réseau électrique régional avec interconnexions WAPP</p>
              </div>
              <div class="visual-card">
                <BarChart3 :size="48" />
                <h3>Analyses Avancées</h3>
                <p>Graphiques interactifs et analyses de tendances</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <KanariFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import HomeBlogSection from '../components/modules/energy/Dashboard/HomeBlogSection.vue'
import { 
  Zap, 
  ArrowRight, 
  ChevronDown, 
  BarChart3, 
  TrendingUp, 
  Network, 
  Building2, 
  MapPin, 
  Code,
  CheckCircle
} from 'lucide-vue-next'
</script>

<style scoped>
.kanari-home-page {
  min-height: 100vh;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
}

.kanari-main {
  flex: 1;
  padding-top: 80px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.85) 0%, rgba(59, 130, 246, 0.8) 100%),
              url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%);
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  opacity: 0.95;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #1A1A1A;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* KANARI Modules Section */
.modules-section {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.module-card {
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 1.5rem;
  padding: 2.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.module-card.energy::before {
  background: linear-gradient(90deg, #3B82F6, #2563EB);
}

.module-card.mining::before {
  background: linear-gradient(90deg, #F97316, #EA580C);
}

.module-card.water::before {
  background: linear-gradient(90deg, #06B6D4, #0891B2);
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  border-color: #3B82F6;
}

.module-card:hover::before {
  transform: scaleX(1);
}

.module-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.module-icon {
  width: 100px;
  height: 100px;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.module-title {
  font-size: 2rem;
  font-weight: 900;
  color: #1A1A1A;
  margin: 0 0 1rem 0;
  text-align: center;
}

.module-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #6B7280;
  margin: 0 0 2rem 0;
  text-align: center;
}

.module-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.module-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4B5563;
  font-size: 0.9375rem;
}

.module-feature svg {
  color: #10B981;
  flex-shrink: 0;
}

.module-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  width: 100%;
}

.module-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
}

.module-link.coming-soon {
  background: linear-gradient(135deg, #9CA3AF, #6B7280);
  cursor: not-allowed;
}

.module-link.coming-soon:hover {
  transform: none;
  box-shadow: none;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1A1A1A;
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 1rem;
  padding: 2rem;
  text-decoration: none;
  color: #1A1A1A;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #3B82F6;
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
}

.feature-description {
  font-size: 0.9375rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.feature-link {
  color: #3B82F6;
  font-weight: 700;
  font-size: 0.9375rem;
}

/* News Section */
.news-section {
  padding: 5rem 2rem;
  background: #F9FAFB;
}

/* About Section */
.about-section {
  padding: 5rem 2rem;
  background: white;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4B5563;
  margin-bottom: 1.5rem;
}

.about-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.about-feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #1A1A1A;
  font-weight: 600;
}

.about-feature svg {
  color: #10B981;
  flex-shrink: 0;
}

.about-visual {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.visual-card {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  text-align: center;
}

.visual-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 1rem 0 0.5rem 0;
}

.visual-card p {
  opacity: 0.9;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-primary,
  .btn-secondary {
    justify-content: center;
  }
  
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .kanari-main {
    padding-top: 70px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 4rem 1.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-section,
  .news-section,
  .about-section {
    padding: 3rem 1.5rem;
  }
  
  .kanari-main {
    padding-top: 60px;
  }
}
</style>
