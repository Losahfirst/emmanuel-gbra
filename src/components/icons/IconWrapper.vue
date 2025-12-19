<template>
  <component :is="iconComponent" :class="['icon', sizeClass]" :style="iconStyle" :size="iconSizeValue" />
</template>

<script setup>
import { computed } from 'vue'
import {
  BoltIcon,
  CpuChipIcon,
  ChartBarIcon,
  AcademicCapIcon,
  LightBulbIcon,
  SparklesIcon,
  CodeBracketIcon,
  ServerIcon,
  CloudIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  BookOpenIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'
import GasTurbineIcon from './GasTurbineIcon.vue'

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
  'bolt': BoltIcon,
  'gas-turbine': GasTurbineIcon,
  'cpu': CpuChipIcon,
  'chart': ChartBarIcon,
  'academic': AcademicCapIcon,
  'lightbulb': LightBulbIcon,
  'sparkles': SparklesIcon,
  'code': CodeBracketIcon,
  'server': ServerIcon,
  'cloud': CloudIcon,
  'cog': Cog6ToothIcon,
  'terminal': CommandLineIcon,
  'mobile': DevicePhoneMobileIcon,
  'globe': GlobeAltIcon,
  'wrench': WrenchScrewdriverIcon,
  'beaker': BeakerIcon,
  'book': BookOpenIcon,
  'users': UserGroupIcon,
  'envelope': EnvelopeIcon,
  'phone': PhoneIcon,
  'briefcase': BriefcaseIcon,
  'document': DocumentTextIcon,
  'chevron-down': ChevronDownIcon
}

const iconComponent = computed(() => {
  return iconMap[props.name] || CodeBracketIcon
})

const sizeClass = computed(() => {
  return `icon-${props.size}`
})

const iconStyle = computed(() => {
  // Pour les icônes Heroicons (stroke), on utilise le style
  // Pour les icônes personnalisées (comme GasTurbineIcon), on passe la taille en prop
  if (props.name === 'gas-turbine') {
    return {}
  }
  const sizes = {
    'xs': { width: '0.75rem', height: '0.75rem' },
    'sm': { width: '1rem', height: '1rem' },
    'md': { width: '1.5rem', height: '1.5rem' },
    'lg': { width: '2rem', height: '2rem' },
    'xl': { width: '3rem', height: '3rem' }
  }
  return sizes[props.size] || sizes.md
})

const iconSizeValue = computed(() => {
  const sizes = {
    'xs': 12,
    'sm': 16,
    'md': 24,
    'lg': 32,
    'xl': 48
  }
  return sizes[props.size] || sizes.md
})
</script>

<style scoped>
.icon {
  display: inline-block;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
}
</style>
