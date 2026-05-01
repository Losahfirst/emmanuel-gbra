<template>
  <div class="satellite-page">
    <div class="map-sidebar">
      <div class="sidebar-header">
        <router-link to="/outils" class="back-btn"><ArrowLeft size="18" /> Retour</router-link>
        <h2>Localisation <span class="accent">Satellite</span></h2>
      </div>

      <div class="tabs-control">
        <button :class="{ active: activeTab === 'search' }" @click="activeTab = 'search'">
          <Search size="16" /> Recherche
        </button>
        <button :class="{ active: activeTab === 'solar' }" @click="activeTab = 'solar'">
          <Sun size="16" /> Solaire
        </button>
      </div>

      <div v-show="activeTab === 'search'">
        <div class="location-form">
          <div class="search-box">
            <MapPin size="18" />
            <input 
              v-model="searchQuery" 
              placeholder="Nom du lieu ou coordonnées..." 
              @keyup.enter="searchLocation"
            />
          </div>
          <button class="add-btn" @click="saveCurrentLocation">
            Enregistrer cette zone
          </button>
        </div>

        <div class="saved-locations" v-if="savedLocations.length > 0">
          <h3>Lieux enregistrés ({{ savedLocations.length }})</h3>
          <ul class="location-list">
            <li v-for="(loc, index) in savedLocations" :key="index" @click="goToLocation(loc)">
              <div class="loc-info">
                <p class="loc-name">{{ loc.name }}</p>
                <p class="loc-coords">{{ loc.lat.toFixed(4) }}, {{ loc.lng.toFixed(4) }}</p>
              </div>
              <div class="loc-actions">
                <button @click.stop="removeLocation(index)" class="delete-btn"><Trash2 size="14" /></button>
              </div>
            </li>
          </ul>
          <button class="export-btn" @click="exportToCSV">
            Exporter (CSV) <Download size="16" />
          </button>
        </div>
      </div>

      <!-- Solar Potential Tab -->
      <div v-show="activeTab === 'solar'" class="solar-section">
        <div class="solar-card">
          <div class="solar-header">
            <Sun class="solar-icon" />
            <h4>Gisement Solaire</h4>
          </div>
          <p class="tool-desc">Calculez le potentiel énergétique de vos toitures en dessinant une surface sur la carte.</p>
          
          <button 
            class="measure-btn" 
            :class="{ active: isMeasuring }" 
            @click="toggleMeasurement"
          >
            <X v-if="isMeasuring" size="18" />
            <MapPin v-else size="18" />
            {{ isMeasuring ? 'Annuler la mesure' : 'Tracer une surface' }}
          </button>

          <div v-if="measuredArea > 0" class="solar-results">
            <div class="result-item">
              <span>Surface mesurée:</span>
              <strong>{{ measuredArea.toFixed(1) }} m²</strong>
            </div>
            <div class="result-item">
              <span>Puissance estimée:</span>
              <strong>{{ estimatedPower.toFixed(2) }} kWc</strong>
            </div>
            <div class="result-item highlights">
              <span>Rendement annuel:</span>
              <strong>{{ (estimatedPower * 1400).toFixed(0) }} kWh/an</strong>
            </div>
            <p class="calc-info">* Estimation basée sur une efficacité de 20% et une irradiation de 1400 kWh/m²/an.</p>
          </div>
        </div>
      </div>

      <div class="layer-switch">
        <div class="layer-btns">
          <button :class="{ active: currentLayerType === 'satellite' }" @click="switchLayer('satellite')">
            <Layers size="16" /> Satellite
          </button>
          <button :class="{ active: currentLayerType === 'night' }" @click="switchLayer('night')">
            <Moon size="16" /> Vue Nuit
          </button>
        </div>
        <button class="label-toggle" :class="{ active: showLabels }" @click="toggleLabels">
          <Type size="16" /> Noms des lieux: {{ showLabels ? 'Activés' : 'Désactivés' }}
        </button>
      </div>

    </div>

    <div class="map-viewport">
      <div id="map" ref="mapContainer"></div>
      
      <div class="map-info-overlay" v-if="currentCoords">
        <p>Position:</p>
        <strong>{{ currentCoords.lat.toFixed(6) }}, {{ currentCoords.lng.toFixed(6) }}</strong>
        <span>Zoom: {{ currentZoom }}</span>
      </div>

      <!-- Hint for measurement -->
      <div class="measure-hint" v-if="isMeasuring">
        <p>Cliquez sur la carte pour définir les points de votre surface.</p>
        <button @click="finishMeasurement" v-if="tempPoints.length > 2">Terminer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  MapPin, ArrowLeft, Trash2, Download, Layers, 
  Search, Sun, Moon, X, Type 
} from 'lucide-vue-next'

const mapContainer = ref(null)
const searchQuery = ref('')
let initialLocations = []
try {
  initialLocations = JSON.parse(localStorage.getItem('saved_locations') || '[]')
} catch (e) {
  initialLocations = []
}
const savedLocations = ref(initialLocations)
const currentCoords = ref(null)
const currentZoom = ref(15)
const activeTab = ref('search')
const currentLayerType = ref('satellite')
const showLabels = ref(true)

// Solar related
const isMeasuring = ref(false)
const tempPoints = ref([])
const measuredArea = ref(0)
const tempLayer = ref(null)
const markersLayer = ref(null)

let map = null
let satelliteLayer = null
let nightLayer = null
let labelsLayer = null

const estimatedPower = computed(() => {
  // Rough estimate: Area * 0.20 efficiency (modern panels)
  return measuredArea.value * 0.20
})

onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

const initMap = () => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    zoomControl: false,
    attributionControl: false
  }).setView([5.36, -3.99], 15)

  satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19
  })

  // CartoDB Night View
  nightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  })

  // Label Overlay Layer
  labelsLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    pane: 'overlayPane'
  })

  // Set initial layer
  satelliteLayer.addTo(map)
  if (showLabels.value) labelsLayer.addTo(map)

  L.control.scale({ position: 'bottomright' }).addTo(map)
  L.control.zoom({ position: 'bottomright' }).addTo(map)

  map.on('move', () => {
    const center = map.getCenter()
    currentCoords.value = { lat: center.lat, lng: center.lng }
    currentZoom.value = map.getZoom()
  })

  map.on('click', handleMapClick)

  currentCoords.value = { lat: 5.36, lng: -3.99 }
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
  if (showLabels.value) {
    labelsLayer.addTo(map)
  } else {
    map.removeLayer(labelsLayer)
  }
}

const switchLayer = (type) => {
  currentLayerType.value = type
  if (type === 'satellite') {
    map.removeLayer(nightLayer)
    satelliteLayer.addTo(map)
    // Update labels too for consistency if needed, but World Boundaries is fine for both
  } else {
    map.removeLayer(satelliteLayer)
    nightLayer.addTo(map)
  }
}

const toggleMeasurement = () => {
  isMeasuring.value = !isMeasuring.value
  if (!isMeasuring.value) {
    clearMeasurement()
  } else {
    tempPoints.value = []
    if (tempLayer.value) map.removeLayer(tempLayer.value)
    if (markersLayer.value) map.removeLayer(markersLayer.value)
    tempLayer.value = L.polygon([], { color: '#E31B23', fillColor: '#E31B23', fillOpacity: 0.3 }).addTo(map)
    markersLayer.value = L.layerGroup().addTo(map)
  }
}

const handleMapClick = (e) => {
  if (!isMeasuring.value) return
  
  const point = [e.latlng.lat, e.latlng.lng]
  tempPoints.value.push(point)
  
  // Update Polygon
  tempLayer.value.setLatLngs(tempPoints.value)
  
  // Add Marker
  L.circleMarker(e.latlng, { radius: 4, color: '#E31B23', fill: true }).addTo(markersLayer.value)
  
  if (tempPoints.value.length >= 3) {
    calculateArea()
  }
}

const calculateArea = () => {
  // Use Leaflet's spherical area calculation
  const points = tempPoints.value
  let area = 0
  if (points.length > 2) {
    const coords = points.map(p => L.latLng(p[0], p[1]))
    area = L.GeometryUtil.geodesicArea(coords)
    measuredArea.value = area
  }
}

const finishMeasurement = () => {
  isMeasuring.value = false
}

const clearMeasurement = () => {
  if (tempLayer.value) map.removeLayer(tempLayer.value)
  if (markersLayer.value) map.removeLayer(markersLayer.value)
  measuredArea.value = 0
  tempPoints.value = []
}

// Fixed Leaflet GeometryUtil polyfill
if (!L.GeometryUtil) {
  L.GeometryUtil = {
    geodesicArea: function (latLngs) {
      var pointsCount = latLngs.length,
          area = 0.0,
          d2r = Math.PI / 180,
          p1, p2;
      if (pointsCount > 2) {
        for (var i = 0; i < pointsCount; i++) {
          p1 = latLngs[i];
          p2 = latLngs[(i + 1) % pointsCount];
          area += ((p2.lng - p1.lng) * d2r) *
                  (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
        }
        area = area * 6378137.0 * 6378137.0 / 2.0;
      }
      return Math.abs(area);
    }
  }
}

const searchLocation = async () => {
  if (!searchQuery.value) return
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}`)
    const data = await response.json()
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      map.setView([lat, lon], 17)
    }
  } catch (err) {
    console.error("Geocoding error:", err)
  }
}

const saveCurrentLocation = () => {
  const center = map.getCenter()
  const name = searchQuery.value || `Zone ${center.lat.toFixed(3)}, ${center.lng.toFixed(3)}`
  const newLoc = { name, lat: center.lat, lng: center.lng, zoom: map.getZoom(), date: new Date().toISOString() }
  savedLocations.value.push(newLoc)
  localStorage.setItem('saved_locations', JSON.stringify(savedLocations.value))
}

const removeLocation = (index) => {
  savedLocations.value.splice(index, 1)
  localStorage.setItem('saved_locations', JSON.stringify(savedLocations.value))
}

const goToLocation = (loc) => {
  map.setView([loc.lat, loc.lng], loc.zoom || 15)
}

const exportToCSV = () => {
  const headers = ['Nom', 'Latitude', 'Longitude', 'Zoom', 'Date']
  const rows = savedLocations.value.map(l => [`"${l.name}"`, l.lat, l.lng, l.zoom, l.date])
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n")
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a"); link.setAttribute("href", encodedUri); link.setAttribute("download", "satellite_export.csv"); link.click()
}
</script>

<style scoped>
.satellite-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--white);
  padding-top: 80px;
}

.map-sidebar {
  width: 400px;
  background: var(--white);
  border-right: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  z-index: 10;
  overflow-y: auto;
}

.sidebar-header { margin-bottom: 2rem; }

.tabs-control {
  display: flex;
  background: var(--gray-50);
  padding: 0.25rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid var(--gray-200);
}

.tabs-control button {
  flex: 1;
  border: none;
  background: none;
  padding: 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--gray-500);
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tabs-control button.active {
  background: var(--white);
  color: var(--black);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.location-form { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  padding: 0.9rem 1.25rem;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  border-color: var(--black);
  background: var(--white);
  box-shadow: 0 0 0 4px var(--gray-100);
}

.search-box input { background: none; border: none; width: 100%; outline: none; font-size: 0.95rem; font-family: inherit; }

.add-btn {
  background: var(--black);
  color: var(--white);
  border: none;
  padding: 1.1rem;
  border-radius: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  font-size: 0.9rem;
}

.add-btn:hover { background: var(--accent); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(227, 27, 35, 0.2); }

.solar-section { flex-grow: 1; }

.solar-card {
  background: var(--white);
  border-radius: 24px;
  padding: 1.75rem;
  border: 1px solid var(--gray-200);
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}

.solar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.solar-icon { color: var(--accent); }

.solar-header h4 { font-weight: 900; font-size: 1.1rem; letter-spacing: -0.5px; }

.tool-desc { font-size: 0.85rem; color: var(--gray-500); line-height: 1.6; margin-bottom: 1.75rem; }

.measure-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.1rem;
  border-radius: 16px;
  border: 2px dashed var(--gray-300);
  background: var(--gray-50);
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--gray-600);
  font-size: 0.9rem;
}

.measure-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

.measure-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--white);
  border-style: solid;
}

.solar-results {
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-item { display: flex; justify-content: space-between; font-size: 0.9rem; align-items: center; }

.result-item span { color: var(--gray-500); font-weight: 500; }

.result-item strong { font-weight: 800; color: var(--black); }

.highlights { 
  background: var(--gray-50);
  padding: 1rem;
  border-radius: 12px;
  border-left: 4px solid var(--accent);
}

.highlights strong { color: var(--accent); font-size: 1.1rem; }

.calc-info { font-size: 0.7rem; color: var(--gray-400); margin-top: 0.5rem; line-height: 1.5; font-style: italic; }

.layer-switch {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--gray-50);
  padding: 0.75rem;
  border-radius: 16px;
  border: 1px solid var(--gray-200);
}

.layer-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.layer-switch button {
  border: none;
  background: none;
  padding: 0.85rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.3s ease;
  color: var(--gray-500);
}

.layer-btns button.active { 
  background: var(--white); 
  color: var(--black); 
  box-shadow: 0 4px 15px rgba(0,0,0,0.08); 
  border: 1px solid var(--gray-200);
}

.label-toggle {
  width: 100%;
  border: 1px solid var(--gray-200) !important;
  background: var(--white) !important;
}

.label-toggle.active {
  color: var(--accent) !important;
  background: var(--accent-light) !important;
  border-color: var(--accent) !important;
}

.map-viewport { flex-grow: 1; position: relative; }

#map { height: 100%; width: 100%; z-index: 1; cursor: crosshair; }

.map-info-overlay {
  position: absolute; top: 2rem; right: 2rem;
  background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px);
  padding: 1rem 1.5rem; border-radius: 16px;
  border: 1px solid var(--gray-200); z-index: 5;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.measure-hint {
  position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%);
  background: var(--black); color: var(--white);
  padding: 1rem 2rem; border-radius: 100px;
  z-index: 5; display: flex; align-items: center; gap: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.measure-hint p { font-size: 0.9rem; font-weight: 700; }

.measure-hint button {
  background: var(--accent); color: var(--white); border: none;
  padding: 0.6rem 1.5rem; border-radius: 100px; font-weight: 800; cursor: pointer;
  transition: transform 0.2s ease;
}

.measure-hint button:hover { transform: scale(1.05); }

.back-btn { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 800; color: var(--gray-400); text-decoration: none; margin-bottom: 1.5rem; transition: color 0.3s; }
.back-btn:hover { color: var(--black); }

.location-list { list-style: none; margin-top: 1rem; }

.location-list li {
  padding: 1rem; background: var(--gray-50); border-radius: 12px; margin-bottom: 0.75rem;
  cursor: pointer; display: flex; justify-content: space-between; align-items: center;
  border: 1px solid transparent; transition: all 0.3s;
}

.location-list li:hover { border-color: var(--black); background: var(--white); transform: translateX(5px); }

@media (max-width: 768px) {
  .satellite-page { flex-direction: column; }
  .map-sidebar { 
    width: 100%; 
    height: 50%; 
    order: 2;
    border-right: none;
    border-top: 1px solid var(--gray-200);
    padding: 1.5rem;
  }
  .map-viewport { 
    height: 50%; 
    order: 1;
  }
}
</style>
