<template>
  <section class="bengio-contact-section" id="contact">
    <div class="bengio-contact-container">
      <!-- Section Title in Uppercase Bold -->
      <h2 class="bengio-section-title">{{ t.contact.title }}</h2>

      <!-- Framed Grid with Bengio's 3-column table structure -->
      <div class="bengio-contact-grid">
        <!-- Column 1: Collaboration / Contact Request -->
        <div class="grid-cell col-collab">
          <div class="cell-header">
            <span class="cell-label">{{ t.contact.col1Label }}</span>
            <span class="cell-arrow">→</span>
          </div>
          <div class="cell-body">
            <a 
              href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="contact-linkedin-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="in-svg-icon" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V9.95H5.05v8.55h2.81Z"/>
              </svg>
              <span>{{ t.contact.col1Btn }}</span>
              <span class="diagonal-arrow-ico">↗</span>
            </a>
            <p class="cell-sub">
              {{ t.contact.col1Sub }}
            </p>
          </div>
          <div class="social-icons-row">
            <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" class="social-svg">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V9.95H5.05v8.55h2.81Z"/>
              </svg>
            </a>
            <a href="https://github.com/manuelemmanuel" target="_blank" rel="noopener" class="social-link" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" class="social-svg">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
              </svg>
            </a>
            <a href="https://medium.com/@emmanuelgbra88" target="_blank" rel="noopener" class="social-link" title="Medium">
              <span class="social-text-icon">Medium</span>
            </a>
            <a href="https://losah.substack.com/" target="_blank" rel="noopener" class="social-link" title="Substack">
              <span class="social-text-icon">Substack</span>
            </a>
          </div>
        </div>

        <!-- Column 2: Profile & Engineering Lead -->
        <div class="grid-cell col-role">
          <div class="cell-header">
            <span class="cell-label">{{ t.contact.col2Label }}</span>
            <span class="cell-arrow">→</span>
          </div>
          <div class="cell-body">
            <h4 class="cell-headline">{{ t.contact.col2Headline }}</h4>
            <p class="cell-sub">
              {{ t.contact.col2Bullet1 }}<br>
              {{ t.contact.col2Bullet2 }}<br>
              {{ t.contact.col2Bullet3 }}
            </p>
          </div>
        </div>

        <!-- Column 3: Location & Ecosystem -->
        <div class="grid-cell col-loc">
          <div class="cell-header">
            <span class="cell-label">{{ t.contact.col3Label }}</span>
            <span class="cell-arrow">→</span>
          </div>
          <div class="cell-body">
            <h4 class="cell-headline">{{ t.contact.col3Headline }}</h4>
            <p class="cell-sub">
              {{ t.contact.col3Sub }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../stores/languageStore'

const { t } = useLanguage()
</script>

<style scoped>
.bengio-contact-section {
  background-color: var(--bg-bengio);
  padding: 3rem 0 5rem;
}

.bengio-contact-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.bengio-section-title {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #111111;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

/* Bengio's Grid with 1px border teal/sage */
.bengio-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid var(--bengio-border);
  background-color: rgba(255, 255, 255, 0.4);
}

.grid-cell {
  padding: 2.5rem 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-cell:not(:last-child) {
  border-right: 1px solid var(--bengio-border);
}

.cell-header {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 1.4rem;
}

.cell-label {
  font-family: var(--font-primary);
  font-size: 0.95rem;
  font-weight: 700;
  color: #111111;
}

.cell-arrow {
  color: #111111;
  font-weight: 700;
  font-size: 1rem;
}

.cell-headline {
  font-family: var(--font-primary);
  font-size: 1.05rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 0.8rem;
}

.contact-linkedin-link {
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--bengio-teal);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  transition: all 0.2s ease;
  border-bottom: 1.5px solid transparent;
}

.contact-linkedin-link:hover {
  border-bottom-color: var(--bengio-teal);
  transform: translateX(2px);
}

.in-svg-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.diagonal-arrow-ico {
  font-size: 1.1rem;
  line-height: 1;
}

.cell-sub {
  font-family: var(--font-primary);
  font-size: 0.92rem;
  line-height: 1.6;
  color: #444444;
}

/* Social icons */
.social-icons-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.8rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(126, 163, 163, 0.3);
}

.social-link {
  color: #111111;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: color 0.2s;
}

.social-link:hover {
  color: var(--bengio-teal);
}

.social-svg {
  width: 18px;
  height: 18px;
}

.social-text-icon {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .bengio-contact-grid {
    grid-template-columns: 1fr;
  }
  .grid-cell:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid var(--bengio-border);
  }
}
</style>
