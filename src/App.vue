<template>
  <!-- Loading Screen -->
  <transition name="fade-loader">
    <div v-if="isLoading" class="loading-screen">
      <div class="loader-content">
        <div class="loader-logo">E<span>.</span></div>
        <div class="loader-progress">
          <div class="progress-bar" :style="{ width: loadProgress + '%' }"></div>
        </div>
      </div>
    </div>
  </transition>

  <div id="app" :class="{ 'app-loaded': !isLoading }">
    <Header v-if="!isKanariPage" />
    <router-view />
    <Footer v-if="!isKanariPage" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isKanariPage = computed(() => route.path.startsWith('/kanari-energy'))

// Loading state
const isLoading = ref(true)
const loadProgress = ref(0)

onMounted(() => {
  // Simulate progress
  const progressInterval = setInterval(() => {
    if (loadProgress.value < 90) {
      loadProgress.value += Math.random() * 15
    }
  }, 100)

  // Wait for everything to load
  window.addEventListener('load', () => {
    loadProgress.value = 100
    clearInterval(progressInterval)
    
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  })

  // Fallback timeout
  setTimeout(() => {
    loadProgress.value = 100
    clearInterval(progressInterval)
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }, 3000)
})
</script>

<style scoped>
#app {
  width: 100%;
}

#app.app-loaded {
  animation: contentReveal 0.6s ease-out;
}

@keyframes contentReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading Screen — Minimal Monochrome */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.loader-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  color: white;
  letter-spacing: -2px;
  margin-bottom: 2rem;
  animation: logoPulse 2s ease-in-out infinite;
}

.loader-logo span {
  color: #10B981;
}

@keyframes logoPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Progress Bar */
.loader-progress {
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.progress-bar {
  height: 100%;
  background: white;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Fade Transition */
.fade-loader-enter-active,
.fade-loader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-loader-enter-from,
.fade-loader-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
