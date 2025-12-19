<template>
  <header class="kanari-header">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/kanari-energy/dashboard" class="logo-link">
          <img src="/kanari-logo.png" alt="KANARI Energy" class="kanari-logo-header" />
        </router-link>
        <CountrySelector />
      </div>
      <nav class="header-nav">
        <router-link to="/kanari-energy/dashboard" class="nav-item" active-class="active">
          <span>Dashboard</span>
        </router-link>
        <router-link to="/kanari-energy/production" class="nav-item" active-class="active">
          <span>Production</span>
        </router-link>
        <router-link to="/kanari-energy/consumption" class="nav-item" active-class="active">
          <span>Consommation</span>
        </router-link>
        <router-link to="/kanari-energy/infrastructure" class="nav-item" active-class="active">
          <span>Infrastructure</span>
        </router-link>
        <router-link to="/kanari-energy/centrales" class="nav-item" active-class="active">
          <span>Centrales</span>
        </router-link>
        <router-link to="/kanari-energy/realtime" class="nav-item" active-class="active">
          <span>Temps Réel</span>
        </router-link>
      </nav>
      <div class="header-right">
        <button class="icon-btn">
          <Bell :size="20" />
        </button>
        <button class="icon-btn">
          <MessageCircle :size="20" />
        </button>
        <div class="user-menu">
          <div class="user-avatar">
            <User :size="20" />
          </div>
          <ChevronDown :size="16" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, MessageCircle, User, ChevronDown } from 'lucide-vue-next'
import CountrySelector from './CountrySelector.vue'
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
}

.header-left {
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
  width: 80px;
  height: 80px;
  object-fit: contain;
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

@media (max-width: 968px) {
  .header-nav {
    display: none;
  }
  
  .header-container {
    padding: 0 1rem;
  }
}
</style>
