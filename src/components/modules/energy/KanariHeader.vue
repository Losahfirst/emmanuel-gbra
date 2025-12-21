<template>
  <header class="kanari-header">
    <div class="header-container">
      <div class="header-left">
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Menu">
          <Menu v-if="!mobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
        <router-link to="/kanari-energy" class="logo-link">
          <img src="/kanari-logo.png" alt="KANARI Energy" class="kanari-logo-header" />
        </router-link>
        <div class="country-selector-wrapper">
          <CountrySelector />
        </div>
      </div>
      <nav class="header-nav" :class="{ 'mobile-open': mobileMenuOpen }">
        <router-link to="/kanari-energy/dashboard" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Dashboard</span>
        </router-link>
        <router-link to="/kanari-energy/production" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Production</span>
        </router-link>
        <router-link to="/kanari-energy/consumption" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Consommation</span>
        </router-link>
        <router-link to="/kanari-energy/infrastructure" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Infrastructure</span>
        </router-link>
        <router-link to="/kanari-energy/centrales" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Centrales</span>
        </router-link>
        <router-link to="/kanari-energy/mapping" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Cartographie</span>
        </router-link>
        <router-link to="/kanari-energy/prediction" class="nav-item" active-class="active" @click="closeMobileMenu">
          <span>Prédiction</span>
        </router-link>
      </nav>
      <div class="header-right">
        <button class="icon-btn mobile-hidden">
          <Bell :size="20" />
        </button>
        <button class="icon-btn mobile-hidden">
          <MessageCircle :size="20" />
        </button>
      </div>
    </div>
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, MessageCircle, Menu, X } from 'lucide-vue-next'
import CountrySelector from './CountrySelector.vue'

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.kanari-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  z-index: 1000;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background: #F3F4F6;
  color: #3B82F6;
}

.country-selector-wrapper {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin-right: 0.75rem;
}

.nav-item.router-link-active {
  color: #3B82F6;
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: #3B82F6;
  border-radius: 2px 2px 0 0;
}

.kanari-logo-header {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .kanari-logo-header {
    width: 60px;
    height: 60px;
  }
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.nav-item {
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  color: #6B7280;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item:hover {
  color: #3B82F6;
  background: #F3F4F6;
}

.nav-item.active {
  color: #3B82F6;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: #3B82F6;
  border-radius: 2px 2px 0 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  border: none;
  background: #F3F4F6;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: #E5E7EB;
  color: #3B82F6;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #F3F4F6;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-menu:hover {
  background: #E5E7EB;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3B82F6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-overlay {
  display: none;
}

.mobile-hidden {
  display: flex;
}

@media (max-width: 968px) {
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-hidden {
    display: none;
  }
  
  .header-container {
    padding: 0 1rem;
  }
  
  .header-left {
    gap: 0.5rem;
  }
  
  .country-selector-wrapper {
    display: flex;
  }
  
  .header-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: #FFFFFF;
    border-bottom: 1px solid #E5E7EB;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .header-nav.mobile-open {
    max-height: 500px;
    padding: 1rem;
  }
  
  .nav-item {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    justify-content: flex-start;
  }
  
  .nav-item.active::after {
    display: none;
  }
  
  .mobile-menu-overlay {
    display: block;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  .header-nav.mobile-open ~ .mobile-menu-overlay {
    opacity: 1;
    pointer-events: all;
  }
}

@media (max-width: 480px) {
  .kanari-header {
    padding: 0.5rem 1rem;
  }
  
  .kanari-logo-header {
    width: 40px;
    height: 40px;
  }
  
  .header-nav {
    top: 60px;
  }
  
  .mobile-menu-overlay {
    top: 60px;
  }
}
</style>
