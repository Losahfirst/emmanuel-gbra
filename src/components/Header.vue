<template>
  <header class="header" :class="headerClass">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/" class="logo" aria-label="Accueil">
          <svg fill="none" height="35" viewBox="0 0 20 20" width="35" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
            <path
              d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
              fill="currentColor"
            />
          </svg>
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
        <div class="mobile-logo">
          <svg fill="none" height="60" viewBox="0 0 20 20" width="60" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
            <path
              d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
              fill="currentColor"
            />
          </svg>
        </div>
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

// Force scrolled state (dark text) for specific internal pages that have light backgrounds
const isForceScrolled = computed(() => {
  const lightPaths = ['/outils/', '/articles', '/representative-works']
  // We want to force it if it matches these paths BUT isn't exactly the Home or Tools list (which have dark heroes)
  // Actually, simplified: if it's any tool page or subpage.
  const currentPath = route.path
  
  // Specific pages that DON'T need force (because they have dark heroes)
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
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand-svg {
  color: #FFB800;
  transition: all 0.4s ease;
}

.header.scrolled .brand-svg {
  color: var(--accent);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.3rem;
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

.mobile-logo {
  margin-bottom: 2rem;
  color: var(--accent);
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

