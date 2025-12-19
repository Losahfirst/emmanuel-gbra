/**
 * Store Pinia pour gérer le pays sélectionné
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { westAfricaCountries, getCountryByCode } from '../data/westAfricaCountries.js'

export const useCountryStore = defineStore('country', () => {
  // État
  const selectedCountryCode = ref('CI') // Côte d'Ivoire par défaut

  // Getters
  const selectedCountry = computed(() => {
    return getCountryByCode(selectedCountryCode.value) || westAfricaCountries[0]
  })

  const availableCountries = computed(() => {
    return westAfricaCountries
  })

  const countriesWithData = computed(() => {
    return westAfricaCountries.filter(country => country.hasData)
  })

  // Actions
  function setCountry(code) {
    if (westAfricaCountries.find(c => c.code === code)) {
      selectedCountryCode.value = code
    }
  }

  function resetToDefault() {
    selectedCountryCode.value = 'CI'
  }

  return {
    selectedCountryCode,
    selectedCountry,
    availableCountries,
    countriesWithData,
    setCountry,
    resetToDefault
  }
})
