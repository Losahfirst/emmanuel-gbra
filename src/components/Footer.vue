<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">KOREKOU EMMANUEL GBRA</h3>
          <p class="footer-description">
  Futur Machine Learning Engineer dédié à l'innovation énergétique et à l'intelligence artificielle.
</p>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li><a href="#about" @click.prevent="scrollTo('about')">À Propos</a></li>
            <li><a href="#experience" @click.prevent="scrollTo('experience')">Expérience</a></li>
            <li><a href="#projects" @click.prevent="scrollTo('projects')">Projets</a></li>
            <li><a href="#skills" @click.prevent="scrollTo('skills')">Compétences</a></li>
            <li><a href="#contact" @click.prevent="scrollTo('contact')">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">Réseaux</h4>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" class="social-link">
              LinkedIn
            </a>
            <a href="https://medium.com/@emmanuelgbra88" target="_blank" class="social-link">
              Medium
            </a>
            <a href="https://www.youtube.com/@emmanuelgbra" target="_blank" class="social-link">
              Youtube
            </a>
          </div>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">Contact</h4>
          <div class="contact-info">
            <a href="mailto:emmanuelgbra88@gmail.com" class="contact-link">emmanuelgbra88@gmail.com</a>
            <a href="tel:+2250554787015" class="contact-link">+225 0554787015</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} KOREKOU EMMANUEL GBRA.</p>
        <p class="footer-note">J'aime la tech et la Data.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const scrollTo = (section) => {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.footer {
  background: var(--dark-gray);
  color: white;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
  border-top: var(--border-thick) solid var(--border-color);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: var(--primary-teal);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.social-link:hover {
  color: var(--primary-purple);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.contact-link:hover {
  color: var(--primary-teal);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.footer-note {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 968px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 2rem 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-title {
    font-size: 1.25rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .footer-bottom p {
    font-size: 0.85rem;
  }
}
</style>
