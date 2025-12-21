<template>
  <div class="country-dashboard">
    <!-- Section Pays Sélectionné -->
    <div v-if="countryStore?.selectedCountry" class="country-section">
      <div class="country-header">
        <div class="header-text">
          <h1 class="page-title">{{ countryStore.selectedCountry.name }}</h1>
        </div>
        <router-link to="/kanari-energy/editor" class="editor-access-btn" title="Accéder à l'éditeur de contenu">
          <Settings :size="16" />
          <span>Éditeur</span>
        </router-link>
      </div>

      <!-- Flash Info Section -->
      <FlashInfo />

      <!-- Regulator Section -->
      <div class="regulator-section" v-if="regulator || (energyData && energyData.regulator)">
        <div class="regulator-content">
          <div class="regulator-logo-wrapper">
            <img 
              v-if="(regulator?.logo || energyData?.regulator?.logo) && !logoError[countryStore.selectedCountryCode]" 
              :src="regulator?.logo || energyData?.regulator?.logo" 
              :alt="regulator?.name || energyData?.regulator?.name"
              class="regulator-logo-img"
              @error="handleLogoError"
            />
            <div v-else class="regulator-icon-placeholder">
              <Shield :size="20" />
            </div>
          </div>
          <div class="regulator-details">
            <h3 class="regulator-title">{{ regulator?.name || energyData?.regulator?.name }}</h3>
            <p class="regulator-desc" v-if="regulator?.description || energyData?.regulator?.description">{{ regulator?.description || energyData?.regulator?.description }}</p>
            <a v-if="(regulator?.website || energyData?.regulator?.website) && (regulator?.website || energyData?.regulator?.website) !== '#'" 
               :href="regulator?.website || energyData?.regulator?.website" 
               target="_blank" 
               class="regulator-website">
              <ExternalLink :size="14" />
              <span>Site officiel</span>
            </a>
          </div>
        </div>
      </div>

    <!-- News Section -->
    <section class="news-section">
      <h2 class="section-title">Actualités</h2>
      <BlogSection />
    </section>

    <!-- Quick Links Section -->
    <section class="links-section">
      <h2 class="section-title">Navigation</h2>
      <div class="links-grid">
        <router-link to="/kanari-energy/production" class="nav-link">
          <Zap :size="18" />
          <span>Production</span>
        </router-link>
        
        <router-link to="/kanari-energy/consumption" class="nav-link">
          <Activity :size="18" />
          <span>Consommation</span>
        </router-link>
        
        <router-link to="/kanari-energy/infrastructure" class="nav-link">
          <Building2 :size="18" />
          <span>Infrastructure</span>
        </router-link>
        
        <router-link to="/kanari-energy/centrales" class="nav-link">
          <Factory :size="18" />
          <span>Centrales</span>
        </router-link>
        
        <router-link to="/kanari-energy/mapping" class="nav-link">
          <MapPin :size="18" />
          <span>Cartographie</span>
        </router-link>
        
        <router-link to="/kanari-energy/prediction" class="nav-link">
          <TrendingUp :size="18" />
          <span>Prédiction</span>
        </router-link>
      </div>
    </section>
    </div>

    <!-- Message si aucun pays sélectionné -->
    <div v-else class="no-country-message">
      <MapPin :size="48" />
      <h2>Sélectionnez un pays</h2>
      <p>Choisissez un pays dans le sélecteur en haut de la page pour voir les données spécifiques.</p>
      <p v-if="!countryStore" style="color: red; margin-top: 1rem;">Erreur: Le store n'est pas initialisé</p>
      <router-link to="/kanari-energy" class="btn-back-home">
        <ArrowRight :size="20" />
        <span>Retour à l'accueil</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useCountryStore } from '../../../../stores/countryStore.js'
import { getCountryEnergyData } from '../../../../data/countryEnergyData.js'
import { getRegulator } from '../../../../services/jsonDataService.js'
import { 
  Shield, ArrowRight, Newspaper, MapPin,
  Zap, Activity, Building2, Factory, TrendingUp, ExternalLink, Settings
} from 'lucide-vue-next'
import BlogSection from './BlogSection.vue'
import FlashInfo from './FlashInfo.vue'

const countryStore = useCountryStore()
const logoError = ref({})

// Charger le régulateur de manière asynchrone
const regulator = ref(null)

// Gestionnaire d'événement pour les mises à jour
let regulatorsUpdateHandler = null

async function loadRegulator() {
  if (!countryStore.selectedCountryCode) {
    regulator.value = null
    return
  }
  
  try {
    regulator.value = await getRegulator(countryStore.selectedCountryCode)
  } catch (error) {
    console.error('Erreur lors du chargement du régulateur:', error)
    regulator.value = null
  }
}

const hasData = computed(() => {
  return countryStore.selectedCountry?.hasData || false
})

const energyData = computed(() => {
  if (!countryStore.selectedCountryCode) return null
  
  // Récupérer les données par défaut
  const defaultData = getCountryEnergyData(countryStore.selectedCountryCode)
  
  // Les données du régulateur seront chargées de manière asynchrone
  return defaultData
})

// S'assurer que le store est initialisé
onMounted(() => {
  console.log('CountryDashboard mounted', {
    selectedCountryCode: countryStore.selectedCountryCode,
    selectedCountry: countryStore.selectedCountry
  })
  
  if (!countryStore.selectedCountryCode) {
    countryStore.resetToDefault()
  }
  
  // S'assurer que selectedCountry existe
  if (!countryStore.selectedCountry) {
    console.warn('No country selected, resetting to default')
    countryStore.resetToDefault()
  }
  
  loadRegulator()
  
  // Écouter les événements de mise à jour
  regulatorsUpdateHandler = async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    await loadRegulator()
  }
  window.addEventListener('regulators-updated', regulatorsUpdateHandler)
})

onUnmounted(() => {
  if (regulatorsUpdateHandler) {
    window.removeEventListener('regulators-updated', regulatorsUpdateHandler)
    regulatorsUpdateHandler = null
  }
})

watch(() => countryStore.selectedCountryCode, () => {
  loadRegulator()
}, { immediate: true })

function handleLogoError(event) {
  const countryCode = countryStore.selectedCountryCode
  logoError.value[countryCode] = true
  event.target.style.display = 'none'
}
</script>

<style scoped>
.country-dashboard {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  background: #FFFFFF;
}


/* Country Section */
.country-section {
  padding: 2rem;
  padding-top: calc(80px + 2rem);
  max-width: 900px;
  margin: 0 auto;
}

.country-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E5E7EB;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  letter-spacing: -0.01em;
}

.editor-access-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: #6B7280;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: 1px solid #E5E7EB;
}

.editor-access-btn:hover {
  background: #F9FAFB;
  color: #111827;
  border-color: #D1D5DB;
}

.loading-message {
  padding: 2rem;
  text-align: center;
  color: #6B7280;
  font-size: 1rem;
}

/* No Country Message */
.no-country-message {
  text-align: center;
  padding: 4rem 2rem;
  padding-top: calc(80px + 4rem); /* Compense la hauteur de la navbar fixe + padding */
  color: #6B7280;
}

.no-country-message svg {
  color: #9CA3AF;
  margin-bottom: 1.5rem;
}

.no-country-message h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 0.75rem 0;
}

.no-country-message p {
  font-size: 1.125rem;
  margin: 0 0 2rem 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.btn-back-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-back-home:hover {
  background: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Regulator Section */
.regulator-section {
  margin-bottom: 3rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #E5E7EB;
}

.regulator-content {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.regulator-logo-wrapper {
  width: 80px;
  height: 80px;
  overflow: hidden;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.regulator-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.25rem;
}

.regulator-icon-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9FAFB;
  color: #9CA3AF;
}

.regulator-details {
  flex: 1;
}

.regulator-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.regulator-desc {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.regulator-website {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #2563EB;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 400;
}

.regulator-website:hover {
  text-decoration: underline;
}

/* News Section */
.news-section {
  margin-bottom: 3rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Links Section */
.links-section {
  margin-bottom: 3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.15s ease;
}

.nav-link:hover {
  background: #F9FAFB;
  color: #111827;
}

.nav-link.router-link-active {
  background: #F3F4F6;
  color: #111827;
  font-weight: 500;
}

.nav-link svg {
  color: #6B7280;
  flex-shrink: 0;
}

.nav-link:hover svg,
.nav-link.router-link-active svg {
  color: #374151;
}

@media (max-width: 768px) {
  .country-section {
    padding: 2rem 1.5rem;
    padding-top: calc(70px + 2rem);
  }

  .page-title {
    font-size: 1.75rem;
  }

  .regulator-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .regulator-logo-wrapper {
    width: 56px;
    height: 56px;
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .nav-link {
    font-size: 0.875rem;
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .country-section {
    padding: 1.5rem 1rem;
    padding-top: calc(60px + 1.5rem);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .country-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .no-country-message {
    padding-top: calc(60px + 4rem);
  }
}
</style>
