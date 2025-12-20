<template>
  <div class="mapping-page">
    <div class="page-header">
      <h1 class="page-title">Cartographie Énergétique - {{ countryStore.selectedCountry?.name || 'Chargement...' }}</h1>
      <div class="header-actions">
        <div class="map-controls">
          <button 
            v-for="layer in mapLayers" 
            :key="layer.id"
            @click="toggleLayer(layer.id)"
            :class="['layer-btn', { active: activeLayers[layer.id] }]"
          >
            <component :is="layer.icon" :size="18" />
            <span>{{ layer.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="!countryStore.selectedCountry" class="loading-state">
      <p>Chargement des données...</p>
    </div>

    <NoDataMessage v-else-if="!hasData && countryPlants.length === 0" />

    <div v-else class="mapping-content">
      <!-- Map Container -->
      <div class="map-container">
        <div id="energy-map" class="map"></div>
        
        <!-- Map Legend -->
        <div class="map-legend">
          <h3 class="legend-title">Légende</h3>
          <div class="legend-items">
            <div class="legend-item" v-if="activeLayers.powerPlants">
              <div class="legend-marker hydraulic"></div>
              <span>Hydraulique</span>
            </div>
            <div class="legend-item" v-if="activeLayers.powerPlants">
              <div class="legend-marker thermal"></div>
              <span>Thermique</span>
            </div>
            <div class="legend-item" v-if="activeLayers.powerPlants">
              <div class="legend-marker solar"></div>
              <span>Solaire</span>
            </div>
            <div class="legend-item" v-if="activeLayers.network">
              <div class="legend-line network-high"></div>
              <span>Réseau HT (225-330 kV)</span>
            </div>
            <div class="legend-item" v-if="activeLayers.network">
              <div class="legend-line network-medium"></div>
              <span>Réseau MT (161 kV)</span>
            </div>
            <div class="legend-item" v-if="activeLayers.network">
              <div class="legend-line network-low"></div>
              <span>Réseau BT (90 kV)</span>
            </div>
            <div class="legend-item" v-if="activeLayers.network">
              <div class="legend-dot interconnection"></div>
              <span>Interconnexion</span>
            </div>
            <div class="legend-item" v-if="activeLayers.consumption">
              <div class="legend-area consumption"></div>
              <span>Zone forte consommation</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Panel -->
      <div class="stats-panel">
        <div class="stat-card">
          <h3 class="stat-title">Centrales sur la carte</h3>
          <p class="stat-value">{{ visiblePlants.length }}</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-title">Capacité totale</h3>
          <p class="stat-value">{{ formatPower(totalCapacity) }}</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-title">Réseau (km)</h3>
          <p class="stat-value">{{ formatLength(networkLength) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useCountryStore } from '../../../../stores/countryStore.js'
import { getPowerPlantsByCountry } from '../../../../data/powerPlantsData.js'
import { energyApi } from '../../../../api/energyApi.js'
import { formatPower, formatLength } from '../../../../utils/formatters.js'
import { getCoordinatesByPlantId, getCoordinatesByLocation, getCountryCenter } from '../../../../data/powerPlantsCoordinates.js'
import { getInterconnectionsForCountry, getAllInterconnections } from '../../../../data/networkInterconnections.js'
import { Building2, Network, TrendingUp, MapPin } from 'lucide-vue-next'
import NoDataMessage from '../NoDataMessage.vue'

const countryStore = useCountryStore()
const hasData = computed(() => countryStore.selectedCountry?.hasData || false)
const countryPlants = computed(() => {
  if (!countryStore.selectedCountryCode) return []
  return getPowerPlantsByCountry(countryStore.selectedCountryCode) || []
})

const activeLayers = ref({
  powerPlants: true,
  network: true,
  consumption: true
})

const mapLayers = [
  { id: 'powerPlants', label: 'Centrales', icon: Building2 },
  { id: 'network', label: 'Réseau', icon: Network },
  { id: 'consumption', label: 'Consommation', icon: TrendingUp }
]

const visiblePlants = computed(() => {
  if (!activeLayers.value.powerPlants) return []
  return countryPlants.value
})

const totalCapacity = computed(() => {
  return visiblePlants.value.reduce((sum, plant) => sum + (plant.capacity || 0), 0)
})

const networkLength = ref(0)
let map = null
let markers = []
let networkLines = []
let consumptionZones = []

function getCoordinatesForLocation(location, plantId, countryCode) {
  // D'abord essayer de trouver par ID de centrale
  if (plantId) {
    const coordsById = getCoordinatesByPlantId(plantId)
    if (coordsById) {
      return coordsById
    }
  }
  
  // Ensuite chercher par localisation
  const coordsByLocation = getCoordinatesByLocation(location, countryCode)
  if (coordsByLocation) {
    return coordsByLocation
  }
  
  // En dernier recours, retourner le centre du pays
  return getCountryCenter(countryCode)
}

function initMap() {
  if (typeof L === 'undefined') {
    console.error('Leaflet n\'est pas chargé')
    return
  }

  const center = getCountryCenter(countryStore.selectedCountryCode)
  
  // Détruire la carte existante si elle existe
  if (map) {
    map.remove()
  }

  map = L.map('energy-map').setView(center, 7)

  // Ajouter la couche de tuiles OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map)

  updateMapLayers()
}

function updateMapLayers() {
  if (!map) return

  // Supprimer les marqueurs existants
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  // Supprimer les lignes de réseau
  networkLines.forEach(line => map.removeLayer(line))
  networkLines = []

  // Supprimer les zones de consommation
  consumptionZones.forEach(zone => map.removeLayer(zone))
  consumptionZones = []

  // Ajouter les centrales
  if (activeLayers.value.powerPlants) {
    countryPlants.value.forEach(plant => {
      const coords = getCoordinatesForLocation(plant.location, plant.id, plant.countryCode || countryStore.selectedCountryCode)
      const color = getPlantColor(plant.type)
      
      const marker = L.circleMarker(coords, {
        radius: Math.max(8, Math.min(plant.capacity / 10, 25)),
        fillColor: color,
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map)

      marker.bindPopup(`
        <div class="map-popup">
          <h3>${plant.name}</h3>
          <p><strong>Type:</strong> ${getTypeLabel(plant.type)}</p>
          <p><strong>Capacité:</strong> ${plant.capacity} MW</p>
          <p><strong>Localisation:</strong> ${plant.location}</p>
          <p><strong>Opérateur:</strong> ${plant.operator}</p>
          <p><strong>Statut:</strong> ${plant.status === 'operational' ? 'En service' : 'Prévu'}</p>
        </div>
      `)

      markers.push(marker)
    })
  }

  // Ajouter le réseau électrique (inspiré de la carte WAPP)
  if (activeLayers.value.network) {
    // 1. Réseau interne : lignes entre centrales principales du pays
    if (countryPlants.value.length > 0) {
      const majorPlants = countryPlants.value
        .filter(plant => plant.capacity >= 50) // Centrales de plus de 50 MW
        .map(plant => ({
          ...plant,
          coords: getCoordinatesForLocation(plant.location, plant.id, plant.countryCode || countryStore.selectedCountryCode)
        }))
        .sort((a, b) => b.capacity - a.capacity)
        .slice(0, 15) // Prendre les 15 plus grandes centrales
      
      // Créer un réseau en étoile autour des plus grandes centrales
      if (majorPlants.length > 1) {
        const hubPlants = majorPlants.slice(0, 3) // Les 3 plus grandes comme hubs
        const otherPlants = majorPlants.slice(3)
        
        // Connecter les hubs entre eux
        for (let i = 0; i < hubPlants.length - 1; i++) {
          for (let j = i + 1; j < hubPlants.length; j++) {
            const line = L.polyline([hubPlants[i].coords, hubPlants[j].coords], {
              color: '#2563EB',
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 5'
            }).addTo(map)
            networkLines.push(line)
          }
        }
        
        // Connecter les autres centrales aux hubs les plus proches
        otherPlants.forEach(plant => {
          const nearestHub = hubPlants.reduce((nearest, hub) => {
            const hubDist = Math.sqrt(
              Math.pow(plant.coords[0] - hub.coords[0], 2) + 
              Math.pow(plant.coords[1] - hub.coords[1], 2)
            )
            const nearestDist = nearest ? Math.sqrt(
              Math.pow(plant.coords[0] - nearest.coords[0], 2) + 
              Math.pow(plant.coords[1] - nearest.coords[1], 2)
            ) : Infinity
            return hubDist < nearestDist ? hub : nearest
          }, null)
          
          if (nearestHub) {
            const line = L.polyline([plant.coords, nearestHub.coords], {
              color: '#3B82F6',
              weight: 2,
              opacity: 0.5
            }).addTo(map)
            networkLines.push(line)
          }
        })
      }
    }
    
    // 2. Interconnexions internationales (inspiré de WAPP)
    const interconnections = showAllInterconnections.value 
      ? getAllInterconnections() 
      : getInterconnectionsForCountry(countryStore.selectedCountryCode)
    
    interconnections.forEach(conn => {
      // Déterminer l'épaisseur selon la capacité
      const capacity = parseInt(conn.capacity) || 50
      const weight = capacity >= 150 ? 5 : capacity >= 100 ? 4 : capacity >= 50 ? 3 : 2
      
      // Déterminer la couleur selon la tension
      let color = '#3B82F6' // 161 kV
      if (conn.voltage.includes('330')) color = '#1E40AF' // 330 kV
      else if (conn.voltage.includes('225')) color = '#2563EB' // 225 kV
      else if (conn.voltage.includes('90')) color = '#60A5FA' // 90 kV
      
      const line = L.polyline([conn.from.coords, conn.to.coords], {
        color: color,
        weight: weight,
        opacity: conn.status === 'operational' ? 0.8 : 0.4,
        dashArray: conn.status === 'operational' ? null : '15, 10'
      }).addTo(map)
      
      // Ajouter un popup avec les informations de l'interconnexion
      const midPoint = [
        (conn.from.coords[0] + conn.to.coords[0]) / 2,
        (conn.from.coords[1] + conn.to.coords[1]) / 2
      ]
      
      const marker = L.marker(midPoint, {
        icon: L.divIcon({
          className: 'interconnection-marker',
          html: `<div style="
            background: ${color};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [12, 12]
        })
      }).addTo(map)
      
      marker.bindPopup(`
        <div class="map-popup">
          <h3>${conn.name}</h3>
          <p><strong>Capacité:</strong> ${conn.capacity}</p>
          <p><strong>Tension:</strong> ${conn.voltage}</p>
          <p><strong>Statut:</strong> ${conn.status === 'operational' ? 'Opérationnel' : 'Prévu'}</p>
          <p><strong>De:</strong> ${conn.from.city} (${conn.from.country})</p>
          <p><strong>Vers:</strong> ${conn.to.city} (${conn.to.country})</p>
        </div>
      `)
      
      networkLines.push(line)
      networkLines.push(marker)
    })
  }

  // Ajouter les zones de forte consommation (simulation autour des grandes villes)
  if (activeLayers.value.consumption) {
    const majorCitiesByCountry = {
      'CI': ['Abidjan', 'Yamoussoukro', 'Bouaké', 'San-Pédro', 'Korhogo'],
      'SN': ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack'],
      'GH': ['Accra', 'Kumasi', 'Tamale', 'Takoradi'],
      'NG': ['Lagos', 'Abuja', 'Kano', 'Port Harcourt'],
      'ML': ['Bamako', 'Sikasso', 'Kayes', 'Mopti'],
      'BF': ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou'],
      'NE': ['Niamey', 'Zinder', 'Maradi'],
      'TG': ['Lomé', 'Kara', 'Sokodé'],
      'BJ': ['Cotonou', 'Porto-Novo', 'Parakou'],
      'GN': ['Conakry', 'Kankan', 'Kindia'],
      'GW': ['Bissau'],
      'LR': ['Monrovia'],
      'SL': ['Freetown', 'Bo'],
      'GM': ['Banjul', 'Serekunda'],
      'MR': ['Nouakchott'],
      'CV': ['Praia', 'Mindelo']
    }
    
    const majorCities = majorCitiesByCountry[countryStore.selectedCountryCode] || ['Abidjan']
    majorCities.forEach(city => {
      const coords = getCoordinatesByLocation(city, countryStore.selectedCountryCode)
      if (coords) {
        const zone = L.circle(coords, {
          radius: 30000, // 30 km
          color: '#F97316',
          fillColor: '#F97316',
          fillOpacity: 0.2,
          weight: 2
        }).addTo(map)
        
        zone.bindPopup(`<div class="map-popup"><h3>${city}</h3><p>Zone de forte consommation</p></div>`)
        consumptionZones.push(zone)
      }
    })
  }
}

function toggleLayer(layerId) {
  activeLayers.value[layerId] = !activeLayers.value[layerId]
  updateMapLayers()
}

function getPlantColor(type) {
  const colors = {
    hydraulic: '#3B82F6',
    thermal: '#F97316',
    solar: '#FACC15',
    biomass: '#22C55E',
    wind: '#06B6D4',
    nuclear: '#8B5CF6'
  }
  return colors[type] || '#6B7280'
}

function getTypeLabel(type) {
  const labels = {
    hydraulic: 'Hydraulique',
    thermal: 'Thermique',
    solar: 'Solaire',
    biomass: 'Biomasse',
    wind: 'Éolien',
    nuclear: 'Nucléaire'
  }
  return labels[type] || type
}

async function loadNetworkData() {
  try {
    const data = await energyApi.getNetworkLength({ startYear: 2020, endYear: 2020 })
    if (data && data.length > 0) {
      networkLength.value = data[data.length - 1].total || 0
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données réseau:', error)
  }
}

onMounted(async () => {
  // Charger Leaflet CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.head.appendChild(link)

  // Charger Leaflet JS
  if (typeof L === 'undefined') {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => {
      setTimeout(() => {
        if (countryStore.selectedCountry) {
          initMap()
          loadNetworkData()
        }
      }, 100)
    }
    document.head.appendChild(script)
  } else {
    setTimeout(() => {
      if (countryStore.selectedCountry) {
        initMap()
        loadNetworkData()
      }
    }, 100)
  }
})

watch(() => countryStore.selectedCountryCode, () => {
  if (map && countryStore.selectedCountry) {
    initMap()
    loadNetworkData()
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.mapping-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #FAFAFA;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0;
}

.map-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.layer-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #6B7280;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layer-btn:hover {
  border-color: #3B82F6;
  color: #3B82F6;
}

.layer-btn.active {
  background: #3B82F6;
  border-color: #3B82F6;
  color: #FFFFFF;
}

.loading-state {
  padding: 3rem;
  text-align: center;
  color: #6B7280;
}

.mapping-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.map-container {
  position: relative;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 600px;
}

.map {
  width: 100%;
  height: 100%;
}

.map-legend {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1rem;
  z-index: 1000;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.legend-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.75rem 0;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #4B5563;
}

.legend-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
}

.legend-marker.hydraulic { background: #3B82F6; }
.legend-marker.thermal { background: #F97316; }
.legend-marker.solar { background: #FACC15; }

.legend-line {
  width: 24px;
  height: 3px;
  background: #3B82F6;
}

.legend-line.network-high {
  width: 24px;
  height: 5px;
  background: #1E40AF;
}

.legend-line.network-medium {
  width: 24px;
  height: 4px;
  background: #2563EB;
}

.legend-line.network-low {
  width: 24px;
  height: 2px;
  background: #60A5FA;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.legend-dot.interconnection {
  background: #3B82F6;
}

.legend-area {
  width: 24px;
  height: 16px;
  background: #F97316;
  opacity: 0.3;
  border: 1px solid #F97316;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-title {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0;
}

:deep(.map-popup) {
  font-family: inherit;
}

:deep(.map-popup h3) {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
}

:deep(.map-popup p) {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #4B5563;
}

:deep(.interconnection-marker) {
  background: transparent !important;
  border: none !important;
}

@media (max-width: 768px) {
  .mapping-page {
    padding: 1rem;
  }

  .map-container {
    height: 400px;
  }

  .map-legend {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 1rem;
  }

  .map-controls {
    width: 100%;
  }

  .layer-btn {
    flex: 1;
  }
}
</style>
