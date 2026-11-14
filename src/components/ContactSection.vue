<template>
  <section class="section contact" id="contact">
    <div class="contact-container">
      <div class="contact-card reveal">
        <!-- Glow accents -->
        <div class="card-glow-mesh">
          <div class="glow-point p1"></div>
          <div class="glow-point p2"></div>
        </div>

        <div class="contact-grid">
          <!-- Left side: Text & Call to action -->
          <div class="contact-left">
            <div class="badge-pill-light">
              <span class="status-dot"></span>
              <span>Discutons de votre projet</span>
            </div>

            <h2 class="contact-title">
              Prêt à accélérer avec l'<span class="text-gradient">Intelligence Artificielle</span> ?
            </h2>

            <p class="contact-description">
              Que ce soit pour le déploiement d'un <strong>chatbot IA sur WhatsApp</strong>, la conception d'un <strong>pipeline RAG sécurisé</strong>, l'optimisation de <strong>maintenance prédictive</strong> ou le développement d'une <strong>plateforme SaaS sur mesure</strong>, je réponds rapidement.
            </p>

            <!-- Actions Row -->
            <div class="contact-action-box">
              <div class="contact-buttons-group">
                <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" rel="noopener noreferrer" class="btn-email-direct">
                  <span>Me contacter sur LinkedIn</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="arrow-ico">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

                <a href="https://wa.me/2250700000000" target="_blank" rel="noopener" class="btn-whatsapp">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="wa-ico">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.076-1.802-.407-1.393-.576-2.316-1.996-2.386-2.09-.07-.094-.572-.761-.572-1.45 0-.689.362-1.028.49-1.168.129-.14.282-.175.376-.175.094 0 .188.001.27.005.087.004.204-.033.319.243.119.288.406.993.442 1.066.035.074.059.16.01.258-.05.097-.074.158-.148.244-.074.086-.156.192-.223.258-.075.073-.153.153-.066.302.087.148.388.641.833 1.037.573.51 1.056.668 1.205.742.149.074.236.062.324-.039.088-.101.378-.44.479-.591.101-.151.202-.126.339-.075.138.051.874.412 1.024.487.15.075.25.112.287.175.037.063.037.367-.107.772z"/>
                  </svg>
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="contact-social-strip">
              <span class="social-label">Réseaux :</span>
              <div class="social-links">
                <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" rel="noopener" class="social-pill">
                  <span>LinkedIn</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mini-arrow"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
                <a href="https://github.com/Losahfirst" target="_blank" rel="noopener" class="social-pill">
                  <span>GitHub</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mini-arrow"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
                <a href="https://medium.com/@emmanuelgbra88" target="_blank" rel="noopener" class="social-pill">
                  <span>Medium</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mini-arrow"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
                <a href="https://losah.substack.com/" target="_blank" rel="noopener" class="social-pill">
                  <span>Substack</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mini-arrow"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Right side: Profile Photo / Brand Card -->
          <div class="contact-right">
            <div class="profile-frame">
              <img src="/profile-photo.png" alt="Emmanuel Gbra" class="profile-img" />
              <div class="profile-card-footer">
                <div class="profile-info">
                  <span class="p-name">Emmanuel Gbra</span>
                  <span class="p-role">AI Developer & Systems Builder</span>
                </div>
                <div class="profile-badge">
                  <span class="online-indicator"></span>
                  <span>En ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const copied = ref(false)

const copyEmail = () => {
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2500)
}

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
.contact {
  background: var(--cream);
  padding: 8rem 0;
  position: relative;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.contact-card {
  background: var(--black);
  color: var(--white);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.25);
}

.card-glow-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.glow-point {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.25;
}

.p1 {
  width: 400px;
  height: 400px;
  background: var(--accent);
  top: -100px;
  left: -100px;
}

.p2 {
  width: 400px;
  height: 400px;
  background: #0047FF;
  bottom: -100px;
  right: -100px;
  opacity: 0.2;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  position: relative;
  z-index: 2;
}

.contact-left {
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge-pill-light {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.8rem;
  width: fit-content;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00E676;
  border-radius: 50%;
  box-shadow: 0 0 8px #00E676;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.8vw, 3.4rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(135deg, #FFB800 0%, #F45B20 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-description {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.65;
  margin-bottom: 2.8rem;
}

.contact-description strong {
  color: var(--white);
}

.contact-action-box {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3rem;
}

.email-copy-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 0.6rem 0.6rem 0.6rem 1.4rem;
  max-width: 480px;
}

.email-text {
  font-family: 'Space Grotesk', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--white);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--white);
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 750;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: var(--accent);
}

.copy-ico {
  width: 16px;
  height: 16px;
}

.contact-buttons-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-email-direct {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--accent);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(244, 91, 32, 0.3);
}

.btn-email-direct:hover {
  background: #ff6d38;
  transform: translateY(-2px);
}

.arrow-ico {
  width: 16px;
  height: 16px;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #25D366;
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-whatsapp:hover {
  background: #20BA5A;
  transform: translateY(-2px);
}

.wa-ico {
  width: 18px;
  height: 18px;
}

/* Social Strip */
.contact-social-strip {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.social-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.social-links {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.78rem;
  font-weight: 650;
  padding: 0.35rem 0.8rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-pill:hover {
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.25);
}

.mini-arrow {
  width: 12px;
  height: 12px;
  opacity: 0.6;
}

/* Right Side Portrait */
.contact-right {
  display: flex;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.02);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.profile-frame {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.profile-img {
  width: 100%;
  height: 100%;
  min-height: 480px;
  object-fit: cover;
  filter: grayscale(80%) contrast(110%);
  transition: filter 0.5s ease;
}

.profile-frame:hover .profile-img {
  filter: grayscale(0%) contrast(100%);
}

.profile-card-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.8rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.p-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--white);
}

.p-role {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 700;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  padding: 0.3rem 0.7rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 750;
  color: #00E676;
  border: 1px solid rgba(0, 230, 118, 0.3);
}

.online-indicator {
  width: 6px;
  height: 6px;
  background: #00E676;
  border-radius: 50%;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .contact-right {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .contact-left {
    padding: 3.5rem 2rem;
  }
  .profile-img {
    height: 380px;
    min-height: auto;
  }
}
</style>
