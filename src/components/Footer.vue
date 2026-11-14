<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand">
            <svg fill="none" height="38" viewBox="0 0 20 20" width="38" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
              <path
                d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
                fill="currentColor"
              />
            </svg>
            <div class="brand-text">
              <span class="brand-title">EMMANUEL <span class="text-accent">GBRA</span></span>
              <span class="brand-subtitle">AI Systems & ML Developer</span>
            </div>
          </div>
          <p class="footer-bio">
            Développeur & Architecte de solutions d'intelligence artificielle, agents RAG, chatbots conversationnels et ingénierie prédictive.
          </p>
        </div>

        <div class="footer-links-col">
          <span class="links-header">Navigation</span>
          <ul class="footer-links">
            <li><router-link to="/#projects">Projets (9)</router-link></li>
            <li><router-link to="/#articles">Articles & Recherche</router-link></li>
            <li><router-link to="/#expertise">Expertise IA</router-link></li>
            <li><router-link to="/outils">Mes Outils Live</router-link></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <span class="links-header">Laboratoire Outils</span>
          <ul class="footer-links">
            <li><router-link to="/outils/iot">Simulateur IoT</router-link></li>
            <li><router-link to="/outils/cvc">Outils CVC</router-link></li>
            <li><router-link to="/outils/datasets">Datasets Énergie</router-link></li>
            <li><router-link to="/outils/satellite">Carte Réseau</router-link></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <span class="links-header">Réseaux & Contact</span>
          <ul class="footer-links">
            <li><a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://github.com/Losahfirst" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://medium.com/@emmanuelgbra88" target="_blank" rel="noopener">Medium</a></li>
            <li><a href="https://losah.substack.com/" target="_blank" rel="noopener">Substack</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">&copy; {{ year }} Emmanuel Gbra. Tous droits réservés.</p>
        <p class="stack-credit">Conçu pour l'ingénierie IA · Vue.js & Modern Web Stack</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 6rem 0 3rem;
  background: var(--black);
  color: var(--white);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1fr;
  gap: 3.5rem;
  margin-bottom: 4rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.2rem;
}

.brand-svg {
  color: var(--accent);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 950;
  color: var(--white);
  letter-spacing: 1.5px;
}

.text-accent {
  color: var(--accent);
}

.brand-subtitle {
  font-size: 0.68rem;
  font-weight: 750;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.footer-bio {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 360px;
}

.links-header {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--white);
  margin-bottom: 1.2rem;
  display: block;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
}
</style>
