<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-logo">
        <span class="logo-text">Emmanuel<span>.</span>Gbra</span>
        <p>Chargé d'étude IoT & Efficacité Énergétique pour un futur durable.</p>
      </div>
      <div class="footer-copy">
        <p>&copy; {{ year }} Emmanuel Gbra. Tous droits réservés.</p>
        <p>Expertise & Innovation Énergétique.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 6rem 6% 3rem;
  background: var(--gray-50);
  border-top: 1px solid var(--gray-200);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 850;
  display: block;
  margin-bottom: 1rem;
}

.logo-text span {
  color: var(--accent);
}

.footer-logo p {
  color: var(--gray-500);
  font-size: 0.95rem;
}

.footer-copy {
  text-align: right;
  color: var(--gray-400);
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .footer-copy { text-align: left; }
}
</style>
