<template>
  <div class="home-wrapper">
    <!-- Fixed Tools Button -->
    <router-link to="/outils" class="floating-tools-btn" aria-label="Accéder à mes outils">
      <div class="btn-content">
        <Wrench class="icon" size="18" />
        <span class="text">MES OUTILS</span>
      </div>
    </router-link>

    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <AwardsSection />
    <ProjectsSection />
    <ArticlesSection />
    <ContactSection />
  </div>
</template>

<script setup>
import { Wrench } from 'lucide-vue-next'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import AwardsSection from '../components/AwardsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ArticlesSection from '../components/ArticlesSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<style scoped>
.home-wrapper {
  position: relative;
}

.floating-tools-btn {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: var(--black, #000);
  color: var(--white, #fff);
  text-decoration: none;
  padding: 1.5rem 0.5rem;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none;
}

.floating-tools-btn:hover {
  background: var(--accent, #e31b23);
  padding-left: 0.75rem;
  box-shadow: 8px 0 20px rgba(227, 27, 35, 0.2);
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .floating-tools-btn {
    top: auto;
    bottom: 2rem;
    left: 1.5rem;
    transform: none;
    padding: 1rem;
    border-radius: 50%;
    border: none;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .floating-tools-btn:hover {
    padding-left: 1rem;
    transform: translateY(-5px);
  }

  .text {
    display: none;
  }
}
</style>
