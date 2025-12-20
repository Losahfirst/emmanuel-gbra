<template>
  <div class="kanari-energy-page">
    <KanariHeader />
    <main class="kanari-main">
      <ProductionPage />
    </main>
    <KanariFooter />
  </div>
</template>

<script setup>
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import ProductionPage from '../components/modules/energy/Production/ProductionPage.vue'
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
