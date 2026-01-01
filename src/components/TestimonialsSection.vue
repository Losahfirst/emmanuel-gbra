<template>
  <section class="testimonials-section section" id="testimonials">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">TÉMOIGNAGES</h2>
        <p class="section-subtitle">Ce que disent les professionnels</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
          <div class="testimonial-content">
            <div class="quote-icon">"</div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.initials }}</div>
            <div class="author-info">
              <div class="author-name">{{ testimonial.name }}</div>
              <div class="author-role">{{ testimonial.role }}</div>
              <div class="author-company">{{ testimonial.company }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    text: "Emmanuel a développé une solution remarquable avec Ecobin+. Son approche innovante combinant IoT et intelligence artificielle démontre un réel potentiel pour l'avenir du numérique en Afrique.",
    name: "Paul Ginies",
    role: "Directeur Général",
    company: "Eranove Academy",
    initials: "PG"
  },
  {
    text: "Un jeune développeur passionné qui allie créativité et compétences techniques. Son projet Ecobin+ montre comment la technologie peut être mise au service de l'environnement et de l'économie circulaire.",
    name: "Bruno Faure",
    role: "Journaliste",
    company: "RFI",
    initials: "BF"
  },
  {
    text: "Emmanuel fait preuve d'une excellente capacité à gérer des projets complexes, de l'analyse à l'exécution. Son travail sur l'analyse prédictive des turbines à gaz à la CIPREL est prometteur.",
    name: "KELEBOU KAPET ",
    role: "Superviseurs",
    company: "CIPREL",
    initials: "CP"
  }
]
</script>

<style scoped>
.testimonials-section {
  background: var(--bg-light);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  padding: 4rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--card-border);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(var(--glass-blur));
}

.testimonial-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-light);
}

.testimonial-content {
  margin-bottom: 2rem;
  position: relative;
}

.quote-icon {
  font-size: 4rem;
  color: var(--primary-purple);
  opacity: 0.2;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--light-gray);
  font-style: italic;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E2E8F0;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dark-gray);
  margin-bottom: 0.25rem;
}

.author-role {
  font-size: 0.95rem;
  color: var(--primary-purple);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.author-company {
  font-size: 0.85rem;
  color: var(--light-gray);
}

@media (max-width: 968px) {
  .testimonials-section {
    margin: 0;
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .testimonial-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .testimonials-section {
    margin: 0;
    padding: 1.5rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .testimonial-card {
    padding: 1.25rem;
  }
  
  .testimonial-text {
    font-size: 0.95rem;
  }
}
</style>
