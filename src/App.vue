<template>
  <!-- Loading Screen -->
  <transition name="fade-loader">
    <div v-if="isLoading" class="loading-screen">
      <div class="loader-content">
        <div class="loader-rings">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
        <div class="loader-text">
          <span class="loader-name">Emmanuel Gbra</span>
          <span class="loader-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
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

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f1923 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

/* Animated Rings */
.loader-rings {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
}

.ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.ring:nth-child(1) {
  border-top-color: #10B981;
  animation: spin 1.5s linear infinite;
}

.ring:nth-child(2) {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  border-right-color: #34D399;
  animation: spin 1.2s linear infinite reverse;
}

.ring:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-bottom-color: #6EE7B7;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Loader Text */
.loader-text {
  margin-bottom: 1.5rem;
}

.loader-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  letter-spacing: 2px;
  display: block;
  animation: textPulse 2s ease-in-out infinite;
}

@keyframes textPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.loader-dots {
  display: inline-flex;
  gap: 4px;
  margin-left: 4px;
}

.loader-dots span {
  color: #10B981;
  font-size: 1.5rem;
  font-weight: bold;
  animation: dotBounce 1.4s ease-in-out infinite;
}

.loader-dots span:nth-child(1) { animation-delay: 0s; }
.loader-dots span:nth-child(2) { animation-delay: 0.2s; }
.loader-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* Progress Bar */
.loader-progress {
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10B981, #34D399, #6EE7B7);
  border-radius: 3px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

/* Fade Transition */
.fade-loader-enter-active,
.fade-loader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-loader-enter-from,
.fade-loader-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
