<template>
  <section class="trust-section">
    <div class="container">
      <p class="trust-label reveal">Ils me font confiance</p>
      <div class="logos-grid reveal">
        <div v-for="partner in partners" :key="partner.name" class="partner-logo">
          <img :src="partner.logo" :alt="partner.name" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const partners = [
  {
    name: 'CIPREL',
    logo: 'https://ciprel.ci/wp-content/uploads/2023/05/Groupe-886.svg'
  },
  {
    name: 'Leonon Group',
    logo: 'https://leonongroup.com/_next/image?url=%2Flogo-new.png&w=828&q=75'
  },
  {
    name: 'Techroot Group',
    logo: 'https://www.techrootgroup.io/images/logo.png'
  }
]

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
.trust-section {
  padding: 4rem 0;
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
  text-align: center;
}

.trust-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray-400);
  margin-bottom: 3rem;
}

.logos-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  flex-wrap: wrap;
}

.partner-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(1) opacity(0.6);
  transition: all 0.4s ease;
}

.partner-logo:hover {
  filter: grayscale(0) opacity(1);
  transform: scale(1.05);
}

.partner-logo img {
  max-height: 100%;
  max-width: 180px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .logos-grid {
    gap: 3rem;
  }
  .partner-logo {
    height: 35px;
  }
}
</style>
