<template>
  <div class="bengio-home-wrapper">
    <!-- Hero with Bengio's signature circular portrait and refined Serif headline -->
    <BengioHeroSection />

    <!-- Bio / Description Section with signature top vertical line -->
    <BengioBioSection />

    <!-- NOUVELLES: Carousel card with photo, serif title, summary & arrow -->
    <BengioNewsSection />

    <!-- ARTICLES RÉCENTS DU BLOG: Framed box with green border & metadata -->
    <BengioBlogSection />

    <!-- CONTACT: 3-column table grid with fine green borders -->
    <BengioContactSection />
  </div>
</template>

<script setup>
import BengioHeroSection from '../components/BengioHeroSection.vue'
import BengioBioSection from '../components/BengioBioSection.vue'
import BengioNewsSection from '../components/BengioNewsSection.vue'
import BengioBlogSection from '../components/BengioBlogSection.vue'
import BengioContactSection from '../components/BengioContactSection.vue'
</script>

<style scoped>
.bengio-home-wrapper {
  position: relative;
  background-color: var(--bg-bengio);
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
