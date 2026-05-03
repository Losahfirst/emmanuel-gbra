<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/" class="logo">
          <span class="logo-text">EMMANUEL <span class="text-accent">GBRA</span></span>
        </router-link>
        
        <!-- Main Navigation Links -->
        <nav class="nav-desktop">
          <ul class="nav-links">
            <li><router-link to="/#about">À propos</router-link></li>
            <li><router-link to="/#experience">Parcours</router-link></li>
            <li><router-link to="/articles">Articles</router-link></li>
          </ul>
        </nav>
      </div>
      
      <div class="header-right mobile-hidden">
        <router-link to="/outils" class="nav-link-right desktop-only">Mes outils</router-link>
        <a href="#contact" class="nav-cta">Contact</a>
      </div>
      
      <!-- Mobile Toggle -->
      <div class="menu-toggle" :class="{ active: menuOpen }" @click="toggleMenu">
        <span class="menu-label">{{ menuOpen ? 'FERMER' : 'MENU' }}</span>
        <div class="hamburger">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <nav class="mobile-nav">
        <router-link to="/" @click="closeMenu">ACCUEIL</router-link>
        <router-link to="/#about" @click="closeMenu">À PROPOS</router-link>
        <router-link to="/outils" @click="closeMenu">MES OUTILS</router-link>
        <router-link to="/articles" @click="closeMenu">ARTICLES</router-link>
        <a href="#contact" @click="closeMenu" class="mobile-cta">CONTACT</a>
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
  height: 90px;
  display: flex;
  align-items: center;
  z-index: 2000;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header.scrolled {
  background: rgba(247, 244, 240, 0.9);
  backdrop-filter: blur(15px);
  height: 70px;
  border-bottom: 1px solid var(--gray-200);
}

.header-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 3.5rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.logo {
  text-decoration: none;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 950;
  color: var(--white);
  letter-spacing: 2px;
  transition: color 0.4s ease;
}

.header.scrolled .logo-text {
  color: var(--black);
}

.text-accent {
  color: #FFB800;
}

.header.scrolled .text-accent {
  color: var(--accent);
}

.nav-desktop {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a, .nav-link-right {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  text-transform: capitalize;
  letter-spacing: 0.1px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.header.scrolled .nav-links a, 
.header.scrolled .nav-link-right {
  color: var(--black);
}

.nav-links a:hover, .nav-link-right:hover {
  color: var(--white);
  opacity: 1;
}

.nav-cta {
  font-size: 0.85rem;
  font-weight: 850;
  color: var(--white);
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.header.scrolled .nav-cta {
  background: var(--black);
  border-color: var(--black);
}

.nav-cta:hover {
  background: rgba(255, 255, 255, 0.2);
}

.header.scrolled .nav-cta:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.menu-toggle {
  display: none;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  z-index: 3000;
  color: var(--white); /* Start white on dark background */
}

.header.scrolled .menu-toggle {
  color: var(--black);
}

.menu-label {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: currentColor; /* Use dynamic text color */
  transition: 0.3s ease;
}

.menu-toggle.active .hamburger span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
.menu-toggle.active .hamburger span:nth-child(2) { transform: rotate(-45deg) translate(1px, -2px); }

/* Ensure label/hamburger stay black when menu is open */
.menu-toggle.active {
  color: var(--black) !important;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(100%);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2500;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  padding: 0 10%;
}

.mobile-nav a {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--black);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.mobile-nav a:hover {
  color: var(--accent);
}

.mobile-cta {
  background: var(--black) !important;
  color: var(--white) !important;
  padding: 1.2rem 2.5rem !important;
  width: 100%;
  text-align: center;
  font-size: 1.1rem !important;
  margin-top: 1rem;
}

@media (max-width: 1024px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: flex; }
}

@media (max-width: 640px) {
  .mobile-hidden { display: none; }
}
</style>

