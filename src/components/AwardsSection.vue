<template>
  <section class="section awards" id="awards">
    <h2 class="section-title">Récompenses</h2>
    <p class="section-subtitle">Hackathons et distinctions</p>
    
    <div class="awards-grid">
      <div class="award-card" v-for="award in awards" :key="award.id">
        <div class="award-header">
          <div class="award-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M5 3h14c.55 0 1 .45 1 1v3c0 2.55-1.92 4.63-4.39 4.94.33 1.23 1.15 2.3 2.21 3.01.76.51 1.18 1.35 1.18 2.25V19c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1.8c0-.9.42-1.74 1.18-2.25 1.06-.71 1.88-1.78 2.21-3.01C5.92 11.63 4 9.55 4 7V4c0-.55.45-1 1-1zm2 2v2c0 1.1.9 2 2 2h.28c-.04-.32-.07-.65-.07-1 0-1.07.26-2.08.71-2.98L7 5zm10 0l-2.93.02c.46.9.72 1.91.72 2.98 0 .35-.03.68-.07 1H15c1.1 0 2-.9 2-2V5zM12 5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-3 14h6v-1c0-.07-.03-.13-.06-.19-.56-.38-1.01-.86-1.31-1.43-.46.4-1.06.62-1.63.62s-1.17-.22-1.63-.62c-.3.57-.75 1.05-1.31 1.43-.03.06-.06.12-.06.19v1z"/>
            </svg>
          </div>
          <div class="award-info">
            <h3>{{ award.title }}</h3>
            <div class="award-meta">
              <span>{{ award.date }}</span>
              <span class="award-badge">{{ award.rank }}</span>
            </div>
          </div>
        </div>
        <p class="award-description">{{ award.description }}</p>
        <div class="award-project">
          <h4>Technologies</h4>
          <div class="award-techs">
            <span v-for="tech in award.techs" :key="tech">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const awards = [
  {
    id: 1,
    title: 'Hackathon Green Tech 2025 - Eranove Academy',
    date: '2025',
    rank: '1er Prix',
    description: 'Victoire avec EcoBin+, une poubelle intelligente connectée permettant le tri automatique des déchets et le suivi en temps réel du remplissage.',
    techs: ['IoT', 'ESP32', 'Flutter', 'Raspberry PI']
  },
  {
    id: 2,
    title: 'Hackathon GS2E 2025',
    date: 'Décembre 2025',
    rank: '1er Prix',
    description: 'Développement d\'une solution IA WhatsApp pour la CIE, permettant aux citoyens de communiquer en langues locales ivoiriennes.',
    techs: ['WhatsApp API', 'AI/ML', 'NLP', 'Cloud']
  },
  {
    id: 3,
    title: 'Meilleur Étudiant Info-Télécom 2021',
    date: '2021',
    rank: 'Major de Promo',
    description: 'Meilleur étudiant de la filière Informatique Télécommunication à l\'Université Tertiaire et Technologique.',
    techs: ['Embedded C', 'IoT', 'Électronique', 'Automatisme']
  }
]
</script>
