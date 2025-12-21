<template>
  <div class="flash-info-editor">
    <div class="editor-section-header">
      <div>
        <h2 class="section-title">Gestion des Flash Info</h2>
        <p class="section-subtitle">Ajoutez et modifiez les informations flash qui défilent sur le dashboard</p>
      </div>
      <button @click="showFlashInfoForm = true; editingFlashInfo = null" class="btn-primary">
        <Plus :size="18" />
        <span>Nouvelle flash info</span>
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

    <!-- Flash Info List -->
    <div class="flash-info-list">
      <div
        v-for="info in filteredFlashInfo"
        :key="info.id"
        class="flash-info-item"
      >
        <div class="flash-info-content">
          <div class="flash-info-header">
            <div class="flash-info-badge">{{ getCountryName(info.countryCode || info.country_code) }}</div>
            <span class="flash-info-date">{{ formatDate(info.date) }}</span>
            <span class="flash-info-status" :class="{ active: (info.isActive !== undefined ? info.isActive : (info.is_active === 1)), inactive: (info.isActive !== undefined ? !info.isActive : (info.is_active === 0)) }">
              {{ (info.isActive !== undefined ? info.isActive : (info.is_active === 1)) ? 'Actif' : 'Inactif' }}
            </span>
          </div>
          <p class="flash-info-text">{{ info.text }}</p>
        </div>
        <div class="flash-info-actions">
          <button @click="editFlashInfo(info)" class="btn-edit">
            <Edit :size="18" />
            <span>Modifier</span>
          </button>
          <button @click="toggleActive(info)" class="btn-toggle" :class="{ active: (info.isActive !== undefined ? info.isActive : (info.is_active === 1)) }">
            <Power :size="18" />
            <span>{{ (info.isActive !== undefined ? info.isActive : (info.is_active === 1)) ? 'Désactiver' : 'Activer' }}</span>
          </button>
          <button @click="handleDeleteFlashInfo(info.id)" class="btn-delete">
            <Trash2 :size="18" />
            <span>Supprimer</span>
          </button>
        </div>
      </div>

      <div v-if="filteredFlashInfo.length === 0" class="empty-state">
        <AlertCircle :size="48" />
        <p>Aucune flash info trouvée</p>
        <button @click="showFlashInfoForm = true; editingFlashInfo = null" class="btn-primary">
          Créer la première flash info
        </button>
      </div>
    </div>

    <!-- Flash Info Form Modal -->
    <div v-if="showFlashInfoForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingFlashInfo ? 'Modifier la flash info' : 'Nouvelle flash info' }}</h2>
          <button @click="closeForm" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <FlashInfoForm
            :flashInfo="editingFlashInfo"
            @save="handleSaveFlashInfo"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, X, Power, AlertCircle } from 'lucide-vue-next'
import { getAllFlashInfo, saveFlashInfo, deleteFlashInfo } from '../../../../services/jsonDataService.js'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'
import FlashInfoForm from './FlashInfoForm.vue'

const flashInfoList = ref([])
const selectedCountryFilter = ref('')
const showFlashInfoForm = ref(false)
const editingFlashInfo = ref(null)

const countries = westAfricaCountries

const filteredFlashInfo = computed(() => {
  let filtered = flashInfoList.value
  if (selectedCountryFilter.value) {
    filtered = filtered.filter(info => info.countryCode === selectedCountryFilter.value)
  }
  return filtered
})

async function loadFlashInfo() {
  try {
    const infos = await getAllFlashInfo()
    flashInfoList.value = infos
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    flashInfoList.value = []
  }
}

function getCountryName(code) {
  const country = countries.find(c => c.code === code)
  return country ? country.name : code
}

function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  } catch (e) {
    return dateString
  }
}

function editFlashInfo(info) {
  editingFlashInfo.value = {
    id: info.id,
    countryCode: info.country_code,
    date: info.date,
    text: info.text,
    isActive: info.is_active === 1
  }
  showFlashInfoForm.value = true
}

async function handleSaveFlashInfo(flashInfoData) {
  try {
    await saveFlashInfo(flashInfoData)
    await loadFlashInfo()
    closeForm()
    alert('Flash info sauvegardée ! Le fichier flash-info.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde de la flash info')
  }
}

async function toggleActive(info) {
  try {
    await saveFlashInfo({
      id: info.id,
      countryCode: info.country_code,
      date: info.date,
      text: info.text,
      isActive: info.is_active === 1 ? 0 : 1
    })
    loadFlashInfo()
  } catch (error) {
    console.error('Erreur lors de la modification:', error)
    alert('Erreur lors de la modification')
  }
}

async function handleDeleteFlashInfo(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette flash info?')) {
    try {
      await deleteFlashInfo(id)
      await loadFlashInfo()
      alert('Flash info supprimée ! Le fichier flash-info.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }
}

function closeForm() {
  showFlashInfoForm.value = false
  editingFlashInfo.value = null
}

onMounted(() => {
  loadFlashInfo()
})
</script>

<style scoped>
.flash-info-editor {
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

.flash-info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flash-info-item {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  transition: all 0.2s ease;
}

.flash-info-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.flash-info-content {
  flex: 1;
}

.flash-info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.flash-info-badge {
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.flash-info-date {
  background: #6B8E23;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.flash-info-status {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.flash-info-status.active {
  background: #D1FAE5;
  color: #065F46;
}

.flash-info-status.inactive {
  background: #FEE2E2;
  color: #991B1B;
}

.flash-info-text {
  font-size: 0.9375rem;
  color: #1A1A1A;
  margin: 0;
  line-height: 1.6;
}

.flash-info-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-edit,
.btn-toggle,
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

.btn-toggle {
  background: #6B7280;
  color: white;
}

.btn-toggle:hover {
  background: #4B5563;
}

.btn-toggle.active {
  background: #10B981;
}

.btn-toggle.active:hover {
  background: #059669;
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
  .flash-info-item {
    flex-direction: column;
  }
  
  .flash-info-actions {
    flex-direction: row;
  }
}
</style>
