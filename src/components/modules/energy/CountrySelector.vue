<template>
  <div class="country-selector" ref="selectorRef">
    <button 
      @click="toggleDropdown" 
      class="flag-button"
      :class="{ active: isOpen }"
    >
      <CountryFlag :country="selectedCountry" :size="32" />
      <ChevronDown :size="16" class="chevron" :class="{ rotated: isOpen }" />
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <div class="dropdown-header">
          <h4 class="dropdown-title">Sélectionner un pays</h4>
        </div>
        <div class="countries-list">
          <button
            v-for="country in availableCountries"
            :key="country.code"
            @click="selectCountry(country.code)"
            class="country-item"
            :class="{ 
              active: country.code === selectedCountry.code,
              'no-data': !country.hasData
            }"
          >
            <CountryFlag :country="country" :size="24" />
            <div class="country-info">
              <span class="country-name">{{ country.name }}</span>
              <span v-if="!country.hasData" class="no-data-badge">Données à venir</span>
            </div>
            <Check v-if="country.code === selectedCountry.code" :size="16" class="check-icon" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'
import { useCountryStore } from '../../../stores/countryStore.js'
import CountryFlag from './CountryFlag.vue'

const countryStore = useCountryStore()
const selectorRef = ref(null)
const isOpen = ref(false)

const selectedCountry = computed(() => countryStore.selectedCountry)
const availableCountries = computed(() => countryStore.availableCountries)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectCountry(code) {
  countryStore.setCountry(code)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (selectorRef.value && !selectorRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.country-selector {
  position: relative;
}

.flag-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.flag-button:hover {
  border-color: #3B82F6;
  background: #F9FAFB;
}

.flag-button.active {
  border-color: #3B82F6;
  background: #EFF6FF;
}

.chevron {
  transition: transform 0.2s ease;
  color: #6B7280;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 280px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  background: #FFFFFF;
  z-index: 1;
}

.dropdown-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
}

.countries-list {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: none;
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.country-item:hover {
  background: #F9FAFB;
}

.country-item.active {
  background: #EFF6FF;
  border: 1px solid #3B82F6;
}

.country-item.no-data {
  opacity: 0.7;
}

.country-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.country-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
}

.no-data-badge {
  font-size: 0.75rem;
  color: #6B7280;
  font-style: italic;
}

.check-icon {
  color: #3B82F6;
  flex-shrink: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
