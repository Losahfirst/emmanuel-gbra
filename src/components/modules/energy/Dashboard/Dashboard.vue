<template>
  <div class="energy-dashboard">
    <CountryDashboard />
  </div>
</template>

<script setup>
import CountryDashboard from './CountryDashboard.vue'
</script>

<style scoped>
.energy-dashboard {
  width: 100%;
  min-height: calc(100vh - 80px);
  background: #FAFAFA;
}
</style>
