<template>
  <div class="plants-list-card">
    <div class="list-header">
      <h3 class="list-title">Liste Complète des Centrales</h3>
      <div class="filter-controls">
        <select v-model="selectedType" @change="filterPlants" class="type-filter">
          <option value="all">Tous les types</option>
          <option value="hydraulic">Hydraulique</option>
          <option value="thermal">Thermique</option>
          <option value="solar">Solaire</option>
          <option value="biomass">Biomasse</option>
          <option value="wind">Éolien</option>
          <option value="nuclear">Nucléaire</option>
        </select>
        <select v-model="selectedStatus" @change="filterPlants" class="status-filter">
          <option value="all">Tous les statuts</option>
          <option value="operational">En service</option>
          <option value="planned">Prévu</option>
        </select>
      </div>
    </div>

    <!-- Statistics -->
    <div class="statistics-bar">
      <div class="stat-item">
        <span class="stat-label">Total:</span>
        <span class="stat-value">{{ filteredPlants.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Capacité Totale:</span>
        <span class="stat-value">{{ formatTotalCapacity(filteredPlants) }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">En service:</span>
        <span class="stat-value">{{ operationalCount }}</span>
      </div>
    </div>

    <!-- Plants Grid -->
    <div class="plants-grid">
      <div
        v-for="plant in filteredPlants"
        :key="plant.id"
        class="plant-card"
        :class="{ 'no-data': !plant.hasData }"
      >
        <div class="plant-header">
          <div class="plant-type-badge" :class="plant.type">
            <component :is="getTypeIcon(plant.type)" :size="16" />
            <span>{{ getTypeLabel(plant.type) }}</span>
          </div>
          <div class="plant-status" :class="plant.status">
            <div class="status-dot"></div>
            <span>{{ getStatusLabel(plant.status) }}</span>
          </div>
        </div>

        <div class="plant-body">
          <h4 class="plant-name">{{ plant.name }}</h4>
          <div class="plant-info">
            <div class="info-item">
              <span class="info-label">Capacité:</span>
              <span class="info-value">{{ plant.capacity }} MW</span>
            </div>
            <div class="info-item">
              <span class="info-label">Installation:</span>
              <span class="info-value">{{ plant.installationDate }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Localisation:</span>
              <span class="info-value">{{ plant.location }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Opérateur:</span>
              <span class="info-value">{{ plant.operator }}</span>
            </div>
          </div>
        </div>

        <div class="plant-footer">
          <div v-if="plant.hasData" class="data-badge has-data">
            <CheckCircle :size="14" />
            <span>Données disponibles</span>
          </div>
          <div v-else class="data-badge no-data">
            <AlertCircle :size="14" />
            <span>Aucune donnée</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPlants.length === 0" class="empty-state">
      <AlertCircle :size="48" />
      <p>Aucune centrale trouvée avec ces filtres</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Droplet, Flame, Sun, Leaf, CheckCircle, AlertCircle, Wind, Atom } from 'lucide-vue-next'
import { allPowerPlants, getPowerPlantsByType } from '../../../../data/powerPlantsData.js'
import { formatPower } from '../../../../utils/formatters.js'

const props = defineProps({
  plants: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'all'
  }
})

const selectedType = ref(props.type || 'all')
const selectedStatus = ref('all')

// Variable locale pour stocker toutes les centrales si props.plants est vide
const allPlants = ref(allPowerPlants)

const filteredPlants = computed(() => {
  let filtered = props.plants.length > 0 ? props.plants : allPlants.value

  if (selectedType.value !== 'all') {
    filtered = filtered.filter(plant => plant.type === selectedType.value)
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(plant => plant.status === selectedStatus.value)
  }

  return filtered.sort((a, b) => {
    // Trier par capacité décroissante
    return b.capacity - a.capacity
  })
})

const operationalCount = computed(() => {
  return filteredPlants.value.filter(plant => plant.status === 'operational').length
})

function filterPlants() {
  // Le computed filteredPlants se met à jour automatiquement
}

function getTypeIcon(type) {
  const icons = {
    hydraulic: Droplet,
    thermal: Flame,
    solar: Sun,
    biomass: Leaf,
    wind: Wind,
    nuclear: Atom
  }
  return icons[type] || Droplet
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

function getStatusLabel(status) {
  const labels = {
    operational: 'En service',
    planned: 'Prévu',
    maintenance: 'Maintenance'
  }
  return labels[status] || status
}

function formatTotalCapacity(plantsList) {
  const total = plantsList.reduce((sum, plant) => sum + plant.capacity, 0)
  return formatPower(total)
}

onMounted(() => {
  // Si aucune plante n'est fournie via props, utiliser toutes les centrales
  if (props.plants.length === 0) {
    allPlants.value = allPowerPlants
  }
  
  // Si un type est fourni via props, l'utiliser comme filtre initial
  if (props.type && props.type !== 'all') {
    selectedType.value = props.type
  }
})
</script>

<style scoped>
.plants-list-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.list-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.filter-controls {
  display: flex;
  gap: 0.75rem;
}

.type-filter,
.status-filter {
  padding: 0.5rem 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.875rem;
  cursor: pointer;
}

.statistics-bar {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
}

.plants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.plant-card {
  background: #FFFFFF;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.plant-card:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.plant-card.no-data {
  opacity: 0.8;
  border-style: dashed;
}

.plant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.plant-type-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.plant-type-badge.hydraulic {
  background: #3B82F6;
}

.plant-type-badge.thermal {
  background: #F97316;
}

.plant-type-badge.solar {
  background: #FACC15;
  color: #1A1A1A;
}

.plant-type-badge.biomass {
  background: #22C55E;
}

.plant-type-badge.wind {
  background: #06B6D4;
}

.plant-type-badge.nuclear {
  background: #8B5CF6;
}

.plant-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.plant-status.operational {
  color: #22C55E;
}

.plant-status.planned {
  color: #F97316;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.plant-body {
  flex: 1;
  margin-bottom: 1rem;
}

.plant-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 1rem 0;
}

.plant-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.info-value {
  font-size: 0.875rem;
  color: #1A1A1A;
  font-weight: 600;
}

.plant-footer {
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}

.data-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
}

.data-badge.has-data {
  background: #D1FAE5;
  color: #065F46;
}

.data-badge.no-data {
  background: #FEE2E2;
  color: #991B1B;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6B7280;
}

.empty-state svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .plants-grid {
    grid-template-columns: 1fr;
  }
  
  .list-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-controls {
    width: 100%;
    flex-direction: column;
  }
  
  .type-filter,
  .status-filter {
    width: 100%;
  }
}
</style>
