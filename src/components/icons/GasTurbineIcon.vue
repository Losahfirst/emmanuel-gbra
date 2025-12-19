<template>
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class="gas-turbine-icon"
    :style="svgStyle"
  >
    <!-- Corps principal de la turbine -->
    <rect x="20" y="35" width="60" height="30" rx="3" fill="currentColor" opacity="0.9"/>
    
    <!-- Compresseur (gauche) -->
    <circle cx="30" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="30" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
    
    <!-- Chambre de combustion (centre) -->
    <rect x="40" y="42" width="20" height="16" rx="2" fill="currentColor" opacity="0.7"/>
    <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.5"/>
    
    <!-- Turbine (droite) -->
    <circle cx="70" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="70" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
    
    <!-- Aubes de turbine -->
    <path d="M 65 50 L 70 45 L 70 50 L 65 50" fill="currentColor" opacity="0.8"/>
    <path d="M 65 50 L 70 55 L 70 50 L 65 50" fill="currentColor" opacity="0.8"/>
    
    <!-- Entrée d'air (gauche) -->
    <path d="M 10 45 L 20 42 L 20 58 L 10 55 Z" fill="currentColor" opacity="0.6"/>
    
    <!-- Sortie (droite) -->
    <path d="M 80 42 L 90 40 L 90 60 L 80 58 Z" fill="currentColor" opacity="0.6"/>
    
    <!-- Lignes de flux -->
    <path d="M 15 50 L 20 50" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
    <path d="M 80 50 L 85 50" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: [String, Number],
    default: 24
  },
  class: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  }
})

const svgStyle = computed(() => {
  return {
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    ...props.style
  }
})
</script>

<style scoped>
.gas-turbine-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
