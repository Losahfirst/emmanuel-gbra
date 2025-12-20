<template>
  <div class="no-data-message">
    <div class="no-data-icon">
      <AlertCircle :size="48" />
    </div>
    <h3 class="no-data-title">Données non disponibles</h3>
    <p class="no-data-text">
      Les données énergétiques pour <strong>{{ countryName }}</strong> ne sont pas encore disponibles.
    </p>
    <p class="no-data-subtext">
      Seules les données de la Côte d'Ivoire sont actuellement accessibles.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import { useCountryStore } from '../../../stores/countryStore.js'

const countryStore = useCountryStore()
const countryName = computed(() => countryStore.selectedCountry?.name || 'ce pays')
</script>

<style scoped>
.no-data-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  margin: 2rem 0;
}

.no-data-icon {
  color: #F97316;
  margin-bottom: 1.5rem;
}

.no-data-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 1rem 0;
}

.no-data-text {
  font-size: 1rem;
  color: #6B7280;
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
}

.no-data-text strong {
  color: #1A1A1A;
  font-weight: 600;
}

.no-data-subtext {
  font-size: 0.875rem;
  color: #9CA3AF;
  margin: 0;
}
</style>
