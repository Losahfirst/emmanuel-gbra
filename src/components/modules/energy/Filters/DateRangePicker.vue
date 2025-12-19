<template>
  <div class="date-range-picker">
    <label class="filter-label">Période</label>
    <div class="date-inputs">
      <div class="date-input-group">
        <label class="date-label">Début</label>
        <input
          type="date"
          v-model="startDate"
          @change="updateDateRange"
          class="date-input"
        />
      </div>
      <div class="date-input-group">
        <label class="date-label">Fin</label>
        <input
          type="date"
          v-model="endDate"
          @change="updateDateRange"
          class="date-input"
        />
      </div>
    </div>
    <div class="quick-options">
      <button
        v-for="option in quickOptions"
        :key="option.label"
        @click="setQuickRange(option.days)"
        class="quick-btn"
        :class="{ active: isActive(option.days) }"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEnergyStore } from '../../../../stores/energyStore.js'

const store = useEnergyStore()

const startDate = ref('')
const endDate = ref('')

const quickOptions = [
  { label: '7j', days: 7 },
  { label: '30j', days: 30 },
  { label: '90j', days: 90 },
  { label: '1an', days: 365 }
]

function updateDateRange() {
  if (startDate.value && endDate.value) {
    store.setDateRange(startDate.value, endDate.value)
    store.loadEnergyData()
    store.loadKPIs()
    store.loadAlertsAndAdvice()
  }
}

function setQuickRange(days) {
  const end = new Date()
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
  
  startDate.value = start.toISOString().split('T')[0]
  endDate.value = end.toISOString().split('T')[0]
  
  updateDateRange()
}

function isActive(days) {
  const end = new Date()
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
  const currentStart = new Date(store.filters.dateRange.start)
  const currentEnd = new Date(store.filters.dateRange.end)
  
  const diffDays = Math.round((currentEnd - currentStart) / (24 * 60 * 60 * 1000))
  return diffDays === days
}

onMounted(() => {
  const start = new Date(store.filters.dateRange.start)
  const end = new Date(store.filters.dateRange.end)
  startDate.value = start.toISOString().split('T')[0]
  endDate.value = end.toISOString().split('T')[0]
})
</script>

<style scoped>
.date-range-picker {
  margin-bottom: 1.5rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
}

.date-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.date-label {
  font-size: 0.75rem;
  color: #666666;
}

.date-input {
  padding: 0.75rem;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.date-input:focus {
  outline: none;
  border-color: #3B82F6;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.quick-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.quick-btn {
  padding: 0.5rem 1rem;
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  border-radius: 0.5rem;
  color: #666666;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-btn:hover {
  background: #EEEEEE;
  border-color: #3B82F6;
}

.quick-btn.active {
  background: #3B82F6;
  border-color: #3B82F6;
  color: white;
}
</style>
