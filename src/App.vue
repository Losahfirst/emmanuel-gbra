<template>
  <div id="app">
    <BengioHeader v-if="!isKanariPage" />
    <router-view />
    <BengioFooter v-if="!isKanariPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BengioHeader from './components/BengioHeader.vue'
import BengioFooter from './components/BengioFooter.vue'

const route = useRoute()
const isKanariPage = computed(() => route.path.startsWith('/kanari-energy'))
</script>

<style scoped>
#app {
  width: 100%;
}
</style>
