<template>
  <section class="section contact" id="contact">
    <div class="contact-card reveal">
      <div class="contact-info">
        <span class="section-label" style="color: var(--white)">Collaboration</span>
        <h2 class="section-title" style="color: var(--white)">Prêt à transformer vos opérations ?</h2>
        <p class="contact-desc">
          Discutons de vos projets IoT, de vos besoins en analyse de données ou de l'optimisation de vos infrastructures énergétiques.
        </p>
        <div class="contact-actions">
          <a href="mailto:emmanuelgbra88@gmail.com" class="btn btn-white">Me contacter par email</a>
          <div class="contact-socials">
            <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank">LinkedIn</a>
            <a href="https://github.com/Losahfirst" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
      <div class="contact-portrait">
        <img src="/images/site/hero-banner.jpg" alt="Collaborons ensemble" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

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
.contact-card {
  background: var(--black);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.2);
}

.contact-info {
  padding: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-desc {
  font-size: 1.2rem;
  color: var(--gray-400);
  margin: 2rem 0 4rem;
  line-height: 1.6;
}

.contact-actions {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.btn-white {
  background: var(--white);
  color: var(--black);
  padding: 1.1rem 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
}

.btn-white:hover {
  background: var(--accent);
  color: var(--white);
}

.contact-socials {
  display: flex;
  gap: 2rem;
}

.contact-socials a {
  color: var(--white);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.contact-socials a:hover {
  opacity: 1;
}

.contact-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.contact-card:hover .contact-portrait img {
  filter: grayscale(0%);
}

@media (max-width: 1024px) {
  .contact-card { grid-template-columns: 1fr; }
  .contact-info { padding: 4rem 2rem; }
  .contact-portrait { height: 400px; order: -1; }
  .contact-actions { flex-direction: column; align-items: flex-start; gap: 2rem; }
}
</style>
