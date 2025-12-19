<template>
  <div class="kpi-card">
    <div class="kpi-header">
      <div class="kpi-icon" :style="{ backgroundColor: iconBgColor }">
        <component :is="icon" :size="24" />
      </div>
      <span class="kpi-label">{{ label }}</span>
    </div>
    <div class="kpi-value">{{ formattedValue }}</div>
    <div class="kpi-unit">{{ unit }}</div>
    <div v-if="trend" class="kpi-trend" :class="trendClass">
      <component :is="trendIcon" :size="16" />
      <span>{{ trendText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'
import { formatPower, formatFrequency, formatCarbonRate } from '../../../../utils/formatters.js'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  unit: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    required: true
  },
  iconBgColor: {
    type: String,
    default: '#3B82F6'
  },
  trend: {
    type: Number,
    default: null
  }
})

const formattedValue = computed(() => {
  if (props.unit === 'MW') {
    return formatPower(props.value)
  } else if (props.unit === 'Hz') {
    return formatFrequency(props.value)
  } else if (props.unit === 'gCO₂/kWh') {
    return formatCarbonRate(props.value)
  }
  return props.value
})

const trendClass = computed(() => {
  if (props.trend === null) return ''
  if (props.trend > 0) return 'trend-up'
  if (props.trend < 0) return 'trend-down'
  return 'trend-neutral'
})

const trendIcon = computed(() => {
  if (props.trend === null) return Minus
  if (props.trend > 0) return TrendingUp
  if (props.trend < 0) return TrendingDown
  return Minus
})

const trendText = computed(() => {
  if (props.trend === null) return ''
  const sign = props.trend > 0 ? '+' : ''
  return `${sign}${props.trend.toFixed(1)}%`
})
</script>

<style scoped>
.kpi-card {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.kpi-card:hover {
  transform: translateY(-4px);
  border-color: #3B82F6;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.kpi-icon {
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.kpi-label {
  font-size: 0.875rem;
  color: #666666;
  font-weight: 500;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 0.25rem;
  font-family: 'Space Grotesk', sans-serif;
}

.kpi-unit {
  font-size: 0.75rem;
  color: #999999;
  margin-bottom: 0.75rem;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.kpi-trend.trend-up {
  color: #22C55E;
}

.kpi-trend.trend-down {
  color: #EF4444;
}

.kpi-trend.trend-neutral {
  color: #999999;
}
</style>
