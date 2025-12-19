<template>
  <div class="granularity-selector">
    <label class="filter-label">Granularité</label>
    <div class="granularity-options">
      <button
        v-for="option in options"
        :key="option.value"
        @click="setGranularity(option.value)"
        class="granularity-btn"
        :class="{ active: store.filters.granularity === option.value }"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useEnergyStore } from '../../../../stores/energyStore.js'

const store = useEnergyStore()

const options = [
  { label: 'Mois', value: 'month' },
  { label: 'Année', value: 'year' }
]

function setGranularity(granularity) {
  store.setGranularity(granularity)
  store.loadEnergyData()
}
</script>

<style scoped>
.granularity-selector {
  margin-bottom: 1.5rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
}

.granularity-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.granularity-btn {
  padding: 0.75rem;
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  border-radius: 0.5rem;
  color: #666666;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.granularity-btn:hover {
  background: #EEEEEE;
  border-color: #3B82F6;
}

.granularity-btn.active {
  background: #3B82F6;
  border-color: #3B82F6;
  color: white;
}
</style>
