<template>
  <div class="project-logo" :style="sizeStyle">
    <img 
      v-if="imageUrl && !imageError" 
      :src="imageUrl" 
      :alt="name"
      class="project-logo-image"
      @error="handleImageError"
    />
    <div v-else class="project-logo-fallback">
      <IconWrapper :name="fallbackIcon" size="lg" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import IconWrapper from './icons/IconWrapper.vue'

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
  },
  fallbackIcon: {
    type: String,
    default: 'code'
  }
})

const imageError = ref(false)

const sizeStyle = computed(() => {
  const sizes = {
    'sm': { width: '3rem', height: '3rem' },
    'md': { width: '4.5rem', height: '4.5rem' },
    'lg': { width: '5rem', height: '5rem' }
  }
  return sizes[props.size] || sizes.md
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.project-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  box-shadow: var(--shadow-game);
  flex-shrink: 0;
  border: var(--border-thick) solid var(--border-color);
}

.project-logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-logo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0.5rem;
}

.project-logo-fallback :deep(svg) {
  width: 60%;
  height: 60%;
  stroke-width: 2;
}

.project-logo-fallback :deep(.gas-turbine-icon) {
  width: 60% !important;
  height: 60% !important;
}
</style>
