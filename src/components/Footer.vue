<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-logo">
        <div class="footer-brand">
          <svg fill="none" height="48" viewBox="0 0 20 20" width="48" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
            <path
              d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
              fill="currentColor"
            />
          </svg>
          <span class="logo-text">Emmanuel<span>.</span>Gbra</span>
        </div>
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
  padding: 8rem 6% 4rem;
  background: var(--black);
  color: var(--white);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.brand-svg {
  color: var(--accent);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 850;
  letter-spacing: -0.5px;
  color: var(--white);
}

.logo-text span {
  color: var(--accent);
}

.footer-logo p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 400px;
}

.footer-copy {
  text-align: right;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .footer-copy { text-align: left; }
}
</style>
