<template>
  <section class="about-section section" id="about">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">À PROPOS DE MOI</h2>
        <p class="section-subtitle">Passionné par l'innovation technologique au service de l'efficacité énergétique</p>
      </div>
      <div class="about-content">
        <div class="about-text">
          <p class="about-description">
  Je suis <strong>KOREKOU EMMANUEL GBRA</strong>, un étudiant passionné par le Machine Learning et ses applications concrètes dans le secteur de l'énergie. Mon expertise se concentre sur le développement de solutions d'analyse prédictive pour optimiser les performances des turbines à gaz et anticiper les défaillances critiques.
</p>
<p class="about-description">
  Mon parcours allie une solide formation technique en IoT, Big Data et Intelligence Artificielle à une vision pratique de l'industrie. Je m'attache à concevoir des systèmes intelligents qui transforment les données opérationnelles en décisions stratégiques, pour une gestion énergétique plus durable. J'ai notamment développé <strong>KANARI Energy</strong>, une plateforme web moderne de monitoring en temps réel du mix énergétique de la Côte d'Ivoire, avec visualisations interactives et alertes intelligentes.
</p>
          <div class="about-highlights">
            <div class="highlight-item">
              <div class="highlight-icon">
                <IconWrapper name="academic" size="lg" />
              </div>
              <div class="highlight-content">
                <h4>Formation Continue</h4>
                <p>Licence IoT à Eranove Academy & Machine Learning Engineering avec DataCamp</p>
              </div>
            </div>
            <div class="highlight-item">
              <div class="highlight-icon">
                <IconWrapper name="bolt" size="lg" />
              </div>
              <div class="highlight-content">
                <h4>Expertise Énergétique</h4>
                <p>Spécialisation en maintenance prédictive, optimisation des performances énergétiques et développement de plateformes de monitoring (KANARI Energy)</p>
              </div>
            </div>
            <div class="highlight-item">
              <div class="highlight-icon">
                <IconWrapper name="sparkles" size="lg" />
              </div>
              <div class="highlight-content">
                <h4>Innovation Durable</h4>
                <p>Créateur d'Ecobin+, solution IoT pour la gestion intelligente des déchets</p>
              </div>
            </div>
          </div>
        </div>
        <div class="about-image">
          <div class="image-placeholder">
            <div class="education-logos">
              <div class="logo-item">
               
                 <img 
                     src="https://www.eranove.com/wp-content/uploads/2023/03/ERANOVE-Academy-reacdre.jpg" 
                     alt="Illustration Innovation" 
                     style="width: 20%; object-fit: cover; border-radius: 8px;"
                  />

                <span>Eranove Academy</span>
              </div>
              <div class="logo-item">
                <InstitutionLogo name="DataCamp" size="md" />
                <span>DataCamp</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconWrapper from './icons/IconWrapper.vue'
import InstitutionLogo from './InstitutionLogo.vue'
</script>

<style scoped>
.about-section {
  background: var(--white);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.03em;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--light-gray);
  font-weight: 500;
}

.about-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-description {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--light-gray);
  margin-bottom: 1.5rem;
}

.about-description strong {
  color: var(--dark-gray);
  font-weight: 600;
}

.about-highlights {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.highlight-item {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.highlight-icon {
  flex-shrink: 0;
  color: var(--primary-purple);
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlight-icon :deep(svg) {
  width: 2rem;
  height: 2rem;
  stroke-width: 2;
}

.highlight-content h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.25rem;
  font-family: 'Space Grotesk', sans-serif;
}

.highlight-content p {
  font-size: 0.95rem;
  color: var(--light-gray);
  line-height: 1.6;
}

.about-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  max-width: 400px;
  background: linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  box-shadow: var(--shadow-sm);
}

.education-logos {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--white);
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
}

.logo-item:hover {
  transform: translate(-3px, -3px);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-yellow);
}


.logo-item span {
  font-weight: 600;
  color: var(--dark-gray);
  font-size: 1rem;
}

@media (max-width: 968px) {
  .about-section {
    margin: 1rem;
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .about-section {
    margin: 0.5rem;
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .about-description {
    font-size: 0.95rem;
  }
  
  .highlight-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .logo-item {
    padding: 1rem;
  }
}
</style>
