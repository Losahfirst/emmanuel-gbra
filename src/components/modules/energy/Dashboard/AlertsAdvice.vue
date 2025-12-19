<template>
  <div class="alerts-advice">
    <h3 class="section-title">Alertes & Conseils</h3>
    
    <!-- Alertes -->
    <div v-if="alerts.length > 0" class="alerts-section">
      <h4 class="subsection-title">Alertes</h4>
      <div class="alerts-list">
        <div
          v-for="(alert, index) in alerts"
          :key="index"
          class="alert-item"
          :class="`alert-${alert.type}`"
        >
          <component :is="getIcon(alert.icon)" :size="20" class="alert-icon" />
          <div class="alert-content">
            <div class="alert-title">{{ alert.title }}</div>
            <div class="alert-message">{{ alert.message }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Conseils -->
    <div v-if="advice.length > 0" class="advice-section">
      <h4 class="subsection-title">Conseils</h4>
      <div class="advice-list">
        <div
          v-for="(item, index) in advice"
          :key="index"
          class="advice-item"
          :class="`advice-${item.type}`"
        >
          <component :is="getIcon(item.icon)" :size="20" class="advice-icon" />
          <div class="advice-content">
            <div class="advice-title">{{ item.title }}</div>
            <div class="advice-message">{{ item.message }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Message vide -->
    <div v-if="alerts.length === 0 && advice.length === 0" class="empty-state">
      <component :is="CheckCircle" :size="48" />
      <p>Tout fonctionne normalement !</p>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, Zap, CheckCircle, Clock, Leaf } from 'lucide-vue-next'

const props = defineProps({
  alerts: {
    type: Array,
    default: () => []
  },
  advice: {
    type: Array,
    default: () => []
  }
})

function getIcon(iconName) {
  const icons = {
    'alert-triangle': AlertTriangle,
    'zap': Zap,
    'check-circle': CheckCircle,
    'clock': Clock,
    'leaf': Leaf
  }
  return icons[iconName] || CheckCircle
}
</script>

<style scoped>
.alerts-advice {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1.25rem;
  font-family: 'Space Grotesk', sans-serif;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 1rem;
}

.alerts-section,
.advice-section {
  margin-bottom: 1.5rem;
}

.alerts-list,
.advice-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.alert-item,
.advice-item {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid;
  transition: all 0.2s ease;
}

.alert-item.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.alert-item.alert-warning {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
}

.alert-item.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.advice-item.advice-info {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.advice-item.advice-tip {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.alert-icon,
.advice-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.alert-item.alert-error .alert-icon {
  color: #EF4444;
}

.alert-item.alert-warning .alert-icon {
  color: #FBBF24;
}

.alert-item.alert-success .alert-icon {
  color: #22C55E;
}

.advice-item.advice-info .advice-icon {
  color: #3B82F6;
}

.advice-item.advice-tip .advice-icon {
  color: #22C55E;
}

.alert-content,
.advice-content {
  flex: 1;
}

.alert-title,
.advice-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.25rem;
}

.alert-message,
.advice-message {
  font-size: 0.8125rem;
  color: #666666;
  line-height: 1.5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #999999;
  text-align: center;
}

.empty-state svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  font-size: 0.875rem;
}
</style>
