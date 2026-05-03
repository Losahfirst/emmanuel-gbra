<template>
  <div class="home-wrapper">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <AwardsSection />
    <CertificationsSection />
    <ProjectsSection />
    <ArticlesSection />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import AwardsSection from '../components/AwardsSection.vue'
import CertificationsSection from '../components/CertificationsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ArticlesSection from '../components/ArticlesSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<style scoped>
.home-wrapper {
  position: relative;
}

</style>
