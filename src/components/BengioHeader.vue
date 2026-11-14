<template>
  <header class="bengio-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="bengio-header-container">
      <!-- Logo / Name in refined Serif -->
      <router-link to="/" class="bengio-brand" aria-label="Accueil">
        <span class="brand-name">Emmanuel GBRA</span>
      </router-link>

      <!-- Desktop Navigation Tabs : Exactly like Yoshua Bengio (PROJETS - BLOG - EN/FR) -->
      <nav class="bengio-nav-desktop">
        <ul class="nav-list">
          <li>
            <router-link to="/representative-works" class="nav-link">
              {{ t.nav.projects }}
            </router-link>
          </li>
          <li>
            <router-link to="/blog-maintenance-predictive" class="nav-link">
              {{ t.nav.blog }}
            </router-link>
          </li>
          <li class="lang-item">
            <button class="nav-link lang-switch-btn" @click="toggleLang" :title="t.nav.langLabel">
              {{ currentLang === 'FR' ? 'EN' : 'FR' }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button 
        class="bengio-mobile-toggle" 
        :class="{ active: mobileMenuOpen }" 
        @click="toggleMobileMenu"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div class="bengio-mobile-drawer" :class="{ open: mobileMenuOpen }">
      <nav class="mobile-nav-list">
        <router-link to="/" @click="closeMenu" class="mobile-nav-item">{{ t.nav.home }}</router-link>
        <router-link to="/representative-works" @click="closeMenu" class="mobile-nav-item">
          {{ t.nav.projects }}
        </router-link>
        <router-link to="/blog-maintenance-predictive" @click="closeMenu" class="mobile-nav-item">
          {{ t.nav.blog }}
        </router-link>
        <button class="mobile-nav-item mobile-lang-btn" @click="toggleLang(); closeMenu()">
          LANGUE : {{ currentLang === 'FR' ? 'EN (English)' : 'FR (Français)' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '../stores/languageStore'

const { currentLang, toggleLang, t } = useLanguage()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.bengio-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  transition: all 0.25s ease;
  padding: 2.2rem 0;
}

.bengio-header.is-scrolled {
  background: rgba(230, 231, 226, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(126, 163, 163, 0.25);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.bengio-header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bengio-brand {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.brand-name {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 3.5vw, 3.4rem);
  font-weight: 400;
  color: #000000;
  letter-spacing: -0.02em;
  transition: opacity 0.2s;
  line-height: 1;
}

.brand-name:hover {
  opacity: 0.8;
}

.bengio-nav-desktop .nav-list {
  display: flex;
  align-items: center;
  gap: 48px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-primary);
  font-size: clamp(19px, 1.35vw, 22px);
  font-weight: 600;
  color: #000000;
  text-decoration: none;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0.35rem 0;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease, opacity 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #000000;
  border-bottom-color: #000000; /* Exact official Bengio hover effect */
}

.nav-link.lang-switch-btn {
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  padding: 0 0 2px 0;
  cursor: pointer;
  color: #000000;
  font-family: var(--font-primary);
  font-size: clamp(19px, 1.35vw, 22px);
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.nav-link.lang-switch-btn:hover {
  color: #000000;
  border-bottom-color: #000000;
}

.mobile-lang-btn {
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
}

.admin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  opacity: 0.85;
}

.admin-link:hover {
  opacity: 1;
}

.lock-svg {
  width: 14px;
  height: 14px;
}

/* Mobile Toggle */
.bengio-mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.bengio-mobile-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #111;
  transition: transform 0.3s ease, opacity 0.3s;
}

.bengio-mobile-toggle.active span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.bengio-mobile-toggle.active span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

/* Mobile Drawer */
.bengio-mobile-drawer {
  position: fixed;
  inset: 0;
  top: 70px;
  background: var(--bg-bengio);
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
}

.bengio-mobile-drawer.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.mobile-nav-item {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #111111;
  text-decoration: none;
}

.mobile-nav-item.highlight {
  color: var(--bengio-teal);
}

.mobile-nav-item.admin-item {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--bengio-border);
  color: var(--bengio-teal);
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .bengio-nav-desktop {
    display: none;
  }
  .bengio-mobile-toggle {
    display: flex;
  }
}
</style>
