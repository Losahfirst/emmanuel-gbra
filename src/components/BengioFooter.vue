<template>
  <footer class="bengio-footer">
    <!-- Ambient mint glow like Bengio's bottom right corner -->
    <div class="footer-ambient-glow"></div>

    <div class="bengio-footer-container">
      <div class="footer-meta-row">
        <!-- Left: Copyright & Admin link -->
        <div class="footer-left">
          <p class="copyright-text">© Emmanuel GBRA, 2026</p>
          <div class="footer-links-col">
            <router-link to="/representative-works" class="footer-link">
              {{ t.footer.projectsLink }}
            </router-link>
            <router-link to="/admin" class="footer-link admin">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="footer-lock-svg">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{{ t.footer.admin }}</span>
            </router-link>
          </div>
        </div>

        <!-- Center: Signature Serif name -->
        <div class="footer-center">
          <span class="footer-serif-brand">Emmanuel GBRA</span>
        </div>

        <!-- Right: Credits & Tagline -->
        <div class="footer-right">
          <p class="footer-tagline">
            {{ t.footer.tagline }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLanguage } from '../stores/languageStore'

const { t } = useLanguage()
</script>

<style scoped>
.bengio-footer {
  position: relative;
  background-color: var(--bg-bengio);
  padding: 4rem 0 3.5rem;
  overflow: hidden;
  border-top: 1px solid rgba(126, 163, 163, 0.25);
}

.footer-ambient-glow {
  position: absolute;
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 50vh;
  background: radial-gradient(
    circle at 70% 70%,
    rgba(142, 224, 206, 0.35) 0%,
    rgba(195, 243, 230, 0.15) 50%,
    transparent 75%
  );
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
}

.bengio-footer-container {
  position: relative;
  z-index: 2;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.footer-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-left {
  font-family: var(--font-primary);
  font-size: 0.85rem;
  color: #555555;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links-col {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.footer-link {
  color: var(--bengio-teal);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-size: 0.84rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.2s;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-link.admin {
  color: #555555;
}

.footer-lock-svg {
  width: 13px;
  height: 13px;
}

.footer-center {
  text-align: center;
}

.footer-serif-brand {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 500;
  color: #111111;
  letter-spacing: -0.015em;
  display: block;
}

.footer-right {
  text-align: right;
  font-family: var(--font-primary);
  font-size: 0.85rem;
  color: #555555;
}

@media (max-width: 820px) {
  .footer-meta-row {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  .footer-left, .footer-right {
    text-align: center;
    align-items: center;
  }
}
</style>
