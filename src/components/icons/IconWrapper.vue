<template>
  <span :class="['material-icons', sizeClass]">{{ iconName }}</span>
</template>

<script setup>
import { computed } from 'vue'

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

const iconMap = {
  'bolt': 'bolt',
  'gas-turbine': 'local_fire_department',
  'cpu': 'memory',
  'chart': 'bar_chart',
  'academic': 'school',
  'lightbulb': 'lightbulb',
  'sparkles': 'auto_awesome',
  'code': 'code',
  'server': 'dns',
  'cloud': 'cloud',
  'cog': 'settings',
  'terminal': 'terminal',
  'mobile': 'smartphone',
  'globe': 'public',
  'wrench': 'handyman',
  'beaker': 'science',
  'book': 'menu_book',
  'users': 'group',
  'envelope': 'mail',
  'phone': 'call',
  'briefcase': 'work',
  'document': 'description',
  'chevron-down': 'expand_more'
}

const iconName = computed(() => {
  return iconMap[props.name] || 'code'
})

const sizeClass = computed(() => {
  return `icon-${props.size}`
})
</script>

<style scoped>
.icon-xs { font-size: 12px; }
 .icon-sm { font-size: 16px; }
 .icon-md { font-size: 24px; }
 .icon-lg { font-size: 32px; }
 .icon-xl { font-size: 48px; }
</style>
