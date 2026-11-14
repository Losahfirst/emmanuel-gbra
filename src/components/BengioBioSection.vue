<template>
  <section class="bengio-bio-section">
    <div class="bio-container">
      <!-- Signature vertical fine divider line like Yoshua Bengio's top center accent -->
      <div class="bio-vertical-line" aria-hidden="true"></div>

      <!-- Bio paragraphs matching Bengio's exact typography, spacing & tone -->
      <div class="bio-content">
        <p class="bio-paragraph">
          {{ t.bio.p1 }}
        </p>

        <p class="bio-paragraph">
          {{ t.bio.p2 }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../stores/languageStore'

const { t } = useLanguage()
</script>

<style scoped>
.bengio-bio-section {
  position: relative;
  background-color: transparent;
  padding: 1rem 0 5.5rem;
  z-index: 2;
}

.bio-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Elegant vertical connector line identical to Yoshua Bengio's site */
.bio-vertical-line {
  width: 1.5px;
  height: 58px;
  background-color: #70afbe;
  opacity: 0.85;
  margin-bottom: 3.5rem;
}

.bio-content {
  width: 100%;
}

.bio-paragraph {
  font-family: var(--font-primary);
  font-size: clamp(1.08rem, 1.4vw, 1.2rem);
  line-height: 1.82;
  color: #111111;
  font-weight: 400;
  letter-spacing: -0.005em;
  margin-bottom: 2rem;
  text-align: left;
}

.bio-paragraph:last-child {
  margin-bottom: 0;
}

.bio-paragraph strong {
  font-weight: 600;
  color: #003c37;
}

@media (max-width: 768px) {
  .bengio-bio-section {
    padding: 1rem 0 4rem;
  }
  .bio-vertical-line {
    height: 42px;
    margin-bottom: 2.2rem;
  }
  .bio-paragraph {
    font-size: 1.02rem;
    line-height: 1.7;
  }
}
</style>
