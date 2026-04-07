<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <!-- Logo Side -->
      <router-link to="/" class="logo">
        <span class="logo-text">EMMANUEL GBRA</span>
      </router-link>
      
      <!-- Desktop Navigation -->
      <nav class="nav-desktop">
        <ul class="nav-links">
          <li><router-link to="/#about">ABOUT</router-link></li>
          <li><router-link to="/#experience">EXPERIENCE</router-link></li>
          <li><router-link to="/outils">MES OUTILS</router-link></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
        <router-link to="/articles" class="nav-cta">ARTICLES</router-link>
      </nav>
      
      <!-- Mobile Toggle -->
      <div class="menu-toggle" :class="{ active: menuOpen }" @click="toggleMenu">
        <span class="menu-label">MENU</span>
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <nav class="mobile-nav">
        <router-link to="/#about" @click="closeMenu">ABOUT</router-link>
        <router-link to="/#experience" @click="closeMenu">EXPERIENCE</router-link>
        <router-link to="/outils" @click="closeMenu">MES OUTILS</router-link>
        <router-link to="/#work" @click="closeMenu">PROJECTS</router-link>
        <a href="#contact" @click="closeMenu">CONTACT</a>
        <router-link to="/articles" @click="closeMenu" class="mobile-cta">ARTICLES</router-link>
      </nav>
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

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  z-index: 2000;
  background: var(--white);
  transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
  padding: 0 4%;
  border-bottom: 1px solid var(--gray-100);
}

.header-container {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  text-decoration: none;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--black);
  letter-spacing: 1px;
}

/* Desktop Nav */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-500);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links .router-link-active {
  color: var(--black);
}

.nav-cta {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--white);
  background: var(--accent);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  background: var(--black);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(227, 27, 35, 0.3);
}

/* Mobile Toggle */
.menu-toggle {
  display: none;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  z-index: 3000;
}

.menu-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  width: 22px;
  height: 1.5px;
  background: var(--black);
  transition: 0.3s ease;
}

.menu-toggle.active .hamburger span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
.menu-toggle.active .hamburger span:nth-child(2) { opacity: 0; }
.menu-toggle.active .hamburger span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1);
  z-index: 2500;
}

.mobile-menu.open {
  transform: translateY(0);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.mobile-nav a {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--black);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-cta {
  background: var(--accent);
  color: var(--white) !important;
  padding: 1rem 3rem;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: flex; }
}
</style>
