<template>
  <div class="energy-source-toggles">
    <label class="filter-label">Sources d'énergie</label>
    <div class="toggle-list">
      <div
        v-for="source in sources"
        :key="source.category"
        class="toggle-item"
        @click="toggleSource(source.category)"
      >
        <div class="toggle-content">
          <div
            class="toggle-color"
            :style="{ backgroundColor: source.color }"
          ></div>
          <span class="toggle-label">{{ source.name }}</span>
        </div>
        <div
          class="toggle-switch"
          :class="{ active: isSourceActive(source.category) }"
        >
          <div class="toggle-slider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEnergyStore } from '../../../../stores/energyStore.js'

const store = useEnergyStore()

const sources = [
  { category: 'hydraulic', name: 'Hydraulique', color: '#3B82F6' },
  { category: 'thermal', name: 'Thermique (Gaz)', color: '#F97316' },
  { category: 'solar', name: 'Solaire', color: '#FACC15' },
  { category: 'bioenergy', name: 'Bioénergie', color: '#22C55E' }
]

function isSourceActive(category) {
  return store.filters.sources.includes(category)
}

function toggleSource(category) {
  store.toggleSource(category)
  store.loadEnergyData()
}
</script>

<style scoped>
.energy-source-toggles {
  margin-bottom: 1.5rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-item:hover {
  background: #EEEEEE;
  border-color: #3B82F6;
}

.toggle-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toggle-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.toggle-label {
  font-size: 0.875rem;
  color: #1A1A1A;
  font-weight: 500;
}

.toggle-switch {
  width: 44px;
  height: 24px;
  background: #D1D5DB;
  border-radius: 12px;
  position: relative;
  transition: all 0.2s ease;
}

.toggle-switch.active {
  background: #3B82F6;
}

.toggle-slider {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all 0.2s ease;
}

.toggle-switch.active .toggle-slider {
  transform: translateX(20px);
}
</style>
