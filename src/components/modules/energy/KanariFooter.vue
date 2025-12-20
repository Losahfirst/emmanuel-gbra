<template>
  <footer class="kanari-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <img src="/kanari-logo.png" alt="KANARI Energy" class="footer-logo" />
            <h3 class="footer-title">KANARI Energy</h3>
          </div>
          <p class="footer-description">
            Plateforme de monitoring en temps réel de la production et consommation électrique de la Côte d'Ivoire.
          </p>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li><router-link to="/kanari-energy/dashboard">Dashboard</router-link></li>
            <li><router-link to="/kanari-energy/production">Production</router-link></li>
            <li><router-link to="/kanari-energy/consumption">Consommation</router-link></li>
            <li><router-link to="/kanari-energy/infrastructure">Infrastructure</router-link></li>
            <li><router-link to="/kanari-energy/centrales">Centrales</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">Ressources</h4>
          <ul class="footer-links">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4 class="footer-heading">Contact</h4>
          <div class="contact-info">
            <p>Email: contact@kanari-energy.ci</p>
            <p>Téléphone: +225 XX XX XX XX</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} KANARI Energy. Tous droits réservés.</p>
        <div class="footer-links-horizontal">
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">CGU</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.kanari-footer {
  background: #FFFFFF;
  border-top: 1px solid #E5E7EB;
  padding: 2rem 1.5rem 1rem;
  margin-top: 3rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.footer-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3B82F6;
  font-family: 'Space Grotesk', sans-serif;
}

.footer-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: #6B7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-links a:hover,
.footer-links a.router-link-active {
  color: #3B82F6;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-info p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #E5E7EB;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom p {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.footer-links-horizontal {
  display: flex;
  gap: 2rem;
}

.footer-links-horizontal a {
  font-size: 0.875rem;
  color: #6B7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links-horizontal a:hover {
  color: #3B82F6;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
