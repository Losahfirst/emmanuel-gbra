<template>
  <div class="flash-info-container" v-if="flashInfoList.length > 0">
    <div class="flash-info-label">FLASH INFO</div>
    <div class="flash-info-scroll" ref="scrollContainer">
      <div class="flash-info-content" :style="{ '--animation-duration': animationDuration }">
        <div 
          v-for="(info, index) in duplicatedList" 
          :key="`${info.id}-${index}`"
          class="flash-info-item"
        >
          <span class="flash-info-date">{{ formatDate(info.date) }}</span>
          <span class="flash-info-text">{{ info.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCountryStore } from '../../../../stores/countryStore.js'
import { getFlashInfoByCountry } from '../../../../services/jsonDataService.js'

const countryStore = useCountryStore()
const flashInfoList = ref([])
const scrollContainer = ref(null)

// Dupliquer la liste pour un défilement continu
const duplicatedList = computed(() => {
  if (flashInfoList.value.length === 0) return []
  // Dupliquer 3 fois pour un défilement fluide
  return [...flashInfoList.value, ...flashInfoList.value, ...flashInfoList.value]
})

// Calculer la durée de l'animation basée sur le nombre d'éléments
const animationDuration = computed(() => {
  const itemCount = flashInfoList.value.length
  // ~5 secondes par élément
  return `${itemCount * 5}s`
})

function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  } catch (e) {
    return dateString
  }
}

async function loadFlashInfo() {
  if (!countryStore.selectedCountryCode) {
    flashInfoList.value = []
    return
  }
  
  try {
    const infos = await getFlashInfoByCountry(countryStore.selectedCountryCode)
    flashInfoList.value = infos.filter(info => info.isActive !== false)
  } catch (error) {
    console.error('Erreur lors du chargement des flash info:', error)
    flashInfoList.value = []
  }
}

// Surveiller les changements de pays
watch(() => countryStore.selectedCountryCode, async () => {
  await loadFlashInfo()
}, { immediate: true })

// Écouter les mises à jour des flash info
let flashInfoUpdateHandler = null

onMounted(async () => {
  await loadFlashInfo()
  
  // Écouter les événements de mise à jour
  flashInfoUpdateHandler = async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    await loadFlashInfo()
  }
  window.addEventListener('flash-info-updated', flashInfoUpdateHandler)
})

onUnmounted(() => {
  if (flashInfoUpdateHandler) {
    window.removeEventListener('flash-info-updated', flashInfoUpdateHandler)
    flashInfoUpdateHandler = null
  }
})
</script>

<style scoped>
.flash-info-container {
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
}

.flash-info-label {
  background: #6B8E23;
  color: #FFFFFF;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.flash-info-scroll {
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 1.5rem;
}

.flash-info-content {
  display: flex;
  gap: 2rem;
  white-space: nowrap;
  animation: scroll var(--animation-duration, 30s) linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.flash-info-item {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
}

.flash-info-date {
  background: #6B8E23;
  color: #FFFFFF;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.flash-info-text {
  color: #111827;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .flash-info-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .flash-info-scroll {
    width: 100%;
  }
  
  .flash-info-label {
    width: 100%;
    text-align: center;
  }
}
</style>
