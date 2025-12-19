<template>
  <div class="logo-container" :class="sizeClass">
    <img 
      v-if="imageUrl" 
      :src="imageUrl" 
      :alt="name"
      class="logo-image"
      @error="handleImageError"
    />
    <div v-else class="logo-placeholder">
      <span class="logo-initials">{{ initials }}</span>
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
  },
  imageUrl: {
    type: String,
    default: null
  }
})

const imageError = ref(false)

const sizeClass = computed(() => {
  const sizes = {
    'sm': 'w-12 h-12',
    'md': 'w-16 h-16',
    'lg': 'w-24 h-24',
    'xl': 'w-32 h-32'
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

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-initials {
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
}
</style>
