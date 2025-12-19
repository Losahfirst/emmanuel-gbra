<template>
  <div class="kanari-energy-page">
    <KanariHeader />
    <main class="kanari-main">
      <InfrastructurePage />
    </main>
    <KanariFooter />
  </div>
</template>

<script setup>
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import InfrastructurePage from '../components/modules/energy/Infrastructure/InfrastructurePage.vue'
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
</style>
