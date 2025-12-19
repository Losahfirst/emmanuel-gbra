<template>
  <div class="institution-logo" :style="sizeClass">
    <img 
      v-if="logoUrl" 
      :src="logoUrl" 
      :alt="name"
      class="institution-logo-image"
      @error="handleError"
    />
    <div v-else class="institution-logo-fallback">
      <span class="institution-logo-text">{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

const imageError = ref(false)

const sizeClass = computed(() => {
  const sizes = {
    'sm': { width: '3rem', height: '3rem' },
    'md': { width: '4rem', height: '4rem' },
    'lg': { width: '6rem', height: '6rem' },
    'xl': { width: '8rem', height: '8rem' }
  }
  return sizes[props.size] || sizes.md
})

const initials = computed(() => {
  const words = props.name.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return props.name.substring(0, 2).toUpperCase()
})

// URLs des logos des institutions (à remplacer par les vrais logos si disponibles)
const logoMap = {
  'Eranove Academy': null, // À remplacer par l'URL du logo
  'DataCamp': 'https://cdn.simpleicons.org/datacamp/03EF62',
  'CIPREL': null, // À remplacer par l'URL du logo
  'UTT LOKO': null, // À remplacer par l'URL du logo
  'INOVATEC': null // À remplacer par l'URL du logo
}

const logoUrl = computed(() => {
  return logoMap[props.name] || null
})

const handleError = () => {
  imageError.value = true
}
</script>

<style scoped>
.institution-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.institution-logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
}

.institution-logo-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.institution-logo-text {
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
}
</style>
