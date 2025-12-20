<template>
  <div class="kanari-energy-page">
    <KanariHeader />
    <main class="kanari-main">
      <div v-if="error" class="error-boundary" style="padding: 2rem; text-align: center; color: #EF4444;">
        <h2>Erreur de chargement</h2>
        <p>{{ error }}</p>
        <button @click="retry" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3B82F6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Réessayer</button>
      </div>
      <ProductionPage v-else />
    </main>
    <KanariFooter />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import ProductionPage from '../components/modules/energy/Production/ProductionPage.vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err.message || 'Une erreur est survenue'
  console.error('Erreur capturée dans KanariProduction:', err)
  return false
})

function retry() {
  error.value = null
}
</script>

<style scoped>
.kanari-energy-page {
  min-height: 100vh;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
}

.kanari-main {
  flex: 1;
  padding-top: 80px;
}

@media (max-width: 768px) {
  .kanari-main {
    padding-top: 70px;
  }
}

@media (max-width: 480px) {
  .kanari-main {
    padding-top: 60px;
  }
}
</style>
