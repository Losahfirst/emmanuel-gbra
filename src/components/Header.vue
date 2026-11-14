<template>
  <header class="header" :class="headerClass">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/" class="logo" aria-label="Accueil">
          <svg fill="none" height="32" viewBox="0 0 20 20" width="32" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
            <path
              d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
              fill="currentColor"
            />
          </svg>
          <div class="brand-name">
            <span class="logo-text">EMMANUEL <span class="text-accent">GBRA</span></span>
            <span class="logo-subtitle">AI Systems & ML</span>
          </div>
        </router-link>
        
        <!-- Main Navigation Links -->
        <nav class="nav-desktop">
          <ul class="nav-links">
            <li><router-link to="/#projects">Projets (9)</router-link></li>
            <li><router-link to="/#articles">Articles</router-link></li>
            <li><router-link to="/#expertise">Expertise IA</router-link></li>
            <li><router-link to="/outils">Mes Outils</router-link></li>
          </ul>
        </nav>
      </div>
      
      <div class="header-right mobile-hidden">
        <a href="#contact" class="nav-cta">
          <span>Discuter d'un projet</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="cta-mini-arrow">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
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
        <div class="mobile-logo">
          <svg fill="none" height="50" viewBox="0 0 20 20" width="50" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
            <path
              d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <router-link to="/" @click="closeMenu">ACCUEIL</router-link>
        <router-link to="/#projects" @click="closeMenu">PROJETS IA</router-link>
        <router-link to="/#articles" @click="closeMenu">ARTICLES</router-link>
        <router-link to="/#expertise" @click="closeMenu">EXPERTISE</router-link>
        <router-link to="/outils" @click="closeMenu">MES OUTILS</router-link>
        <a href="#contact" @click="closeMenu" class="mobile-cta">CONTACTER EMMANUEL</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

const isForceScrolled = computed(() => {
  const lightPaths = ['/outils/', '/representative-works']
  const currentPath = route.path
  const darkHeroPages = ['/', '/outils', '/articles']
  if (darkHeroPages.includes(currentPath)) return false
  return lightPaths.some(path => currentPath.startsWith(path))
})

const headerClass = computed(() => {
  return {
    scrolled: isScrolled.value || isForceScrolled.value
  }
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
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
  height: 85px;
  display: flex;
  align-items: center;
  z-index: 2000;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header.scrolled {
  background: rgba(19, 19, 19, 0.9);
  backdrop-filter: blur(15px);
  height: 72px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
  gap: 2rem;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.brand-svg {
  color: var(--accent);
  transition: all 0.4s ease;
}

.brand-name {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 950;
  color: var(--white);
  letter-spacing: 1.5px;
}

.logo-subtitle {
  font-size: 0.65rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.text-accent {
  color: var(--accent);
}

.nav-desktop {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2.2rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.88rem;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.nav-links a:hover {
  color: var(--white);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--white);
  background: var(--accent);
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(244, 91, 32, 0.25);
}

.nav-cta:hover {
  background: #ff6d38;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 91, 32, 0.4);
}

.cta-mini-arrow {
  width: 14px;
  height: 14px;
}

.menu-toggle {
  display: none;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  z-index: 3000;
  color: var(--white);
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
  background: currentColor;
  transition: 0.3s ease;
}

.menu-toggle.active .hamburger span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
.menu-toggle.active .hamburger span:nth-child(2) { transform: rotate(-45deg) translate(1px, -2px); }

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2500;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2rem;
  width: 100%;
  padding: 0 10%;
}

.mobile-logo {
  margin-bottom: 1.5rem;
  color: var(--accent);
}

.mobile-nav a {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--white);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.mobile-nav a:hover {
  color: var(--accent);
}

.mobile-cta {
  background: var(--accent) !important;
  color: var(--white) !important;
  padding: 1.1rem 2.2rem !important;
  width: 100%;
  text-align: center;
  font-size: 1rem !important;
  border-radius: 6px;
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
