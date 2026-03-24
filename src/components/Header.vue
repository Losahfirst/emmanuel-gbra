<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <a href="#" class="logo">
      <span class="logo-icon">E</span>
      <span class="logo-text">mmanuel<span class="logo-dot">.</span></span>
    </a>
    
    <nav class="nav" :class="{ active: menuOpen }">
      <a href="#about" @click="closeMenu">About</a>
      <a href="#experience" @click="closeMenu">Parcours</a>
      <a href="#skills" @click="closeMenu">Skills</a>
      <a href="#work" @click="closeMenu">Works</a>
      <a href="#articles" @click="closeMenu">Articles</a>
      <a href="#contact" @click="closeMenu">Contact</a>
    </nav>
    
    <div class="menu-toggle" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: var(--black);
  color: var(--white);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--black);
}

.logo-dot {
  color: #10B981;
}

@media (max-width: 768px) {
  .logo-text {
    display: none;
  }
}
</style>
