<template>
  <div 
    class="feature-bubble" 
    :style="{ 
      top: position.top + '%', 
      left: position.left + '%',
      animationDelay: delay + 's'
    }"
  >
    <div class="bubble-icon">
      <IconWrapper :name="iconName" size="md" />
    </div>
    <div class="bubble-text">{{ text }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconWrapper from './icons/IconWrapper.vue'

const props = defineProps({
  icon: String,
  iconName: {
    type: String,
    default: 'bolt'
  },
  text: String,
  delay: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: null
  },
  left: {
    type: Number,
    default: null
  }
})

const positions = [
  { top: 10, left: -10 },
  { top: 50, left: -15 },
  { top: 80, left: -5 }
]

const position = computed(() => {
  if (props.top !== null && props.left !== null) {
    return { top: props.top, left: props.left }
  }
  // Default positions based on index
  const index = Math.floor(Math.random() * positions.length)
  return positions[index]
})
</script>

<style scoped>
.feature-bubble {
  position: absolute;
  background: var(--card-bg);
  border-radius: 1.5rem;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow-game);
  animation: float 3s ease-in-out infinite;
  z-index: 10;
  border: var(--border-thick) solid var(--card-border);
  backdrop-filter: blur(var(--glass-blur));
  min-width: 180px;
}

.bubble-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: var(--border-thick) solid var(--card-border);
  color: white;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.bubble-icon :deep(svg) {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

.bubble-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--dark-gray);
  white-space: nowrap;
  font-family: 'Space Grotesk', sans-serif;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-15px) translateX(5px);
  }
}

@media (max-width: 768px) {
  .feature-bubble {
    padding: 0.75rem 1rem;
    min-width: 150px;
  }
  
  .bubble-text {
    font-size: 0.8rem;
  }
}
</style>
