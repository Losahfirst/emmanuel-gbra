<template>
  <div id="app">
    <Header v-if="!isKanariPage" />
    <router-view />
    <Footer v-if="!isKanariPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isKanariPage = computed(() => route.path.startsWith('/kanari-energy'))
</script>

<style scoped>
#app {
  width: 100%;
}
</style>
