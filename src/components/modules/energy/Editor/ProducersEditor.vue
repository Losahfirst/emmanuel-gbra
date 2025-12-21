<template>
  <div class="producers-editor">
    <div class="editor-section-header">
      <div>
        <h2 class="section-title">Gestion des Producteurs</h2>
        <p class="section-subtitle">Ajoutez et modifiez les producteurs d'énergie par pays</p>
      </div>
      <button @click="showProducerForm = true; editingProducer = null" class="btn-primary">
        <Plus :size="18" />
        <span>Nouveau producteur</span>
      </button>
    </div>

    <!-- Country Filter -->
    <div class="filter-section">
      <label class="filter-label">Filtrer par pays:</label>
      <select v-model="selectedCountryFilter" class="country-select">
        <option value="">Tous les pays</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <!-- Producers List -->
    <div class="producers-list">
      <div
        v-for="producer in filteredProducers"
        :key="producer.id"
        class="producer-item"
      >
        <div class="producer-info">
          <div class="producer-header">
            <h3 class="producer-name">{{ producer.name }}</h3>
            <div class="producer-badge">{{ getCountryName(producer.countryCode) }}</div>
          </div>
          <div class="producer-details">
            <span class="detail-item">
              <strong>Type:</strong> {{ producer.type }}
            </span>
            <span class="detail-item">
              <strong>Capacité:</strong> {{ producer.capacity }}
            </span>
          </div>
        </div>
        <div class="producer-actions">
          <button @click="editProducer(producer)" class="btn-edit">
            <Edit :size="18" />
            <span>Modifier</span>
          </button>
          <button @click="handleDeleteProducer(producer.id)" class="btn-delete">
            <Trash2 :size="18" />
            <span>Supprimer</span>
          </button>
        </div>
      </div>

      <div v-if="filteredProducers.length === 0" class="empty-state">
        <Factory :size="48" />
        <p>Aucun producteur trouvé</p>
        <button @click="showProducerForm = true; editingProducer = null" class="btn-primary">
          Créer le premier producteur
        </button>
      </div>
    </div>

    <!-- Producer Form Modal -->
    <div v-if="showProducerForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingProducer ? 'Modifier le producteur' : 'Nouveau producteur' }}</h2>
          <button @click="closeForm" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <ProducerForm
            :producer="editingProducer"
            @save="handleSaveProducer"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, Factory, X } from 'lucide-vue-next'
import { getAllProducers, saveProducer, deleteProducer } from '../../../../services/jsonDataService.js'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'
import ProducerForm from './ProducerForm.vue'

const producers = ref([])
const selectedCountryFilter = ref('')
const showProducerForm = ref(false)
const editingProducer = ref(null)

const countries = westAfricaCountries

const filteredProducers = computed(() => {
  let filtered = producers.value
  if (selectedCountryFilter.value) {
    filtered = filtered.filter(p => p.countryCode === selectedCountryFilter.value)
  }
  return filtered
})

async function loadProducers() {
  try {
    // Charger tous les producteurs de tous les pays
    const allProducers = await getAllProducers()
    producers.value = allProducers
  } catch (error) {
    console.error('Erreur lors du chargement des producteurs:', error)
    producers.value = []
  }
}

function getCountryName(code) {
  const country = countries.find(c => c.code === code)
  return country ? country.name : code
}

function editProducer(producer) {
  editingProducer.value = { ...producer }
  showProducerForm.value = true
}

async function handleSaveProducer(producerData) {
  try {
    await saveProducer(producerData)
    await loadProducers()
    closeForm()
    alert('Producteur sauvegardé ! Le fichier producers.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde du producteur')
  }
}

async function handleDeleteProducer(producerId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce producteur?')) {
    try {
      await deleteProducer(producerId)
      await loadProducers()
      alert('Producteur supprimé ! Le fichier producers.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }
}

function closeForm() {
  showProducerForm.value = false
  editingProducer.value = null
}

onMounted(() => {
  loadProducers()
})
</script>

<style scoped>
.producers-editor {
  width: 100%;
}

.editor-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.section-subtitle {
  color: #6B7280;
  font-size: 0.9375rem;
  margin: 0;
}

.filter-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}

.country-select {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  background: white;
  cursor: pointer;
}

.producers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.producer-item {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  transition: all 0.2s ease;
}

.producer-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.producer-info {
  flex: 1;
}

.producer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.producer-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
  flex: 1;
}

.producer-badge {
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.producer-details {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.detail-item {
  font-size: 0.9375rem;
  color: #6B7280;
}

.detail-item strong {
  color: #1A1A1A;
  font-weight: 600;
}

.producer-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-edit {
  background: #3B82F6;
  color: white;
}

.btn-edit:hover {
  background: #2563EB;
}

.btn-delete {
  background: #EF4444;
  color: white;
}

.btn-delete:hover {
  background: #DC2626;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6B7280;
}

.empty-state svg {
  color: #9CA3AF;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.125rem;
  margin: 0 0 1.5rem 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.modal-close {
  background: #F3F4F6;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #E5E7EB;
}

.modal-body {
  padding: 1.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #2563EB;
}

@media (max-width: 768px) {
  .producer-item {
    flex-direction: column;
  }
  
  .producer-actions {
    flex-direction: row;
  }
}
</style>
