<template>
  <div class="regulators-editor">
    <div class="editor-section-header">
      <div>
        <h2 class="section-title">Gestion des Régulateurs</h2>
        <p class="section-subtitle">Ajoutez et modifiez les informations des régulateurs par pays</p>
      </div>
      <button @click="showRegulatorForm = true; editingRegulator = null" class="btn-primary">
        <Plus :size="18" />
        <span>Nouveau régulateur</span>
      </button>
    </div>

    <!-- Regulators List -->
    <div class="regulators-list">
      <div
        v-for="regulator in regulators"
        :key="regulator.countryCode"
        class="regulator-item"
      >
        <div class="regulator-preview">
          <div class="regulator-logo-preview">
            <img v-if="regulator.logo" :src="regulator.logo" :alt="regulator.name" />
            <div v-else class="no-logo">
              <Shield :size="32" />
            </div>
          </div>
          <div class="regulator-info">
            <div class="regulator-header">
              <h3 class="regulator-name">{{ regulator.name }}</h3>
              <div class="regulator-badge">{{ getCountryName(regulator.countryCode) }}</div>
            </div>
            <p class="regulator-description">{{ regulator.description }}</p>
            <div class="regulator-meta">
              <span v-if="regulator.website && regulator.website !== '#'" class="meta-item">
                <a :href="regulator.website" target="_blank" class="website-link">
                  <ExternalLink :size="14" />
                  <span>Site web</span>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div class="regulator-actions">
          <button @click="editRegulator(regulator)" class="btn-edit">
            <Edit :size="18" />
            <span>Modifier</span>
          </button>
          <button @click="handleDeleteRegulator(regulator.countryCode)" class="btn-delete">
            <Trash2 :size="18" />
            <span>Supprimer</span>
          </button>
        </div>
      </div>

      <div v-if="regulators.length === 0" class="empty-state">
        <Shield :size="48" />
        <p>Aucun régulateur enregistré</p>
        <button @click="showRegulatorForm = true; editingRegulator = null" class="btn-primary">
          Créer le premier régulateur
        </button>
      </div>
    </div>

    <!-- Regulator Form Modal -->
    <div v-if="showRegulatorForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingRegulator ? 'Modifier le régulateur' : 'Nouveau régulateur' }}</h2>
          <button @click="closeForm" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <RegulatorForm
            :regulator="editingRegulator"
            @save="handleSaveRegulator"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Edit, Trash2, Shield, X, ExternalLink } from 'lucide-vue-next'
import { getAllRegulators, saveRegulator, getRegulator, deleteRegulator } from '../../../../services/jsonDataService.js'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'
import RegulatorForm from './RegulatorForm.vue'

const regulators = ref([])
const showRegulatorForm = ref(false)
const editingRegulator = ref(null)

const countries = westAfricaCountries

function loadRegulators() {
  regulators.value = getAllRegulators()
}

function getCountryName(code) {
  const country = countries.find(c => c.code === code)
  return country ? country.name : code
}

function editRegulator(regulator) {
  editingRegulator.value = { ...regulator }
  showRegulatorForm.value = true
}

async function handleSaveRegulator(regulatorData) {
  try {
    await saveRegulator(regulatorData)
    await loadRegulators()
    closeForm()
    alert('Régulateur sauvegardé ! Le fichier regulators.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde du régulateur')
  }
}

async function handleDeleteRegulator(countryCode) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce régulateur?')) {
    try {
      await deleteRegulator(countryCode)
      await loadRegulators()
      alert('Régulateur supprimé ! Le fichier regulators.json a été téléchargé. Veuillez le copier dans public/data/ pour que les changements soient persistants.')
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }
}

function closeForm() {
  showRegulatorForm.value = false
  editingRegulator.value = null
}

onMounted(() => {
  loadRegulators()
})
</script>

<style scoped>
.regulators-editor {
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

.regulators-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.regulator-item {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  transition: all 0.2s ease;
}

.regulator-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.regulator-preview {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.regulator-logo-preview {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #E5E7EB;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #D1D5DB;
}

.regulator-logo-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
}

.no-logo {
  color: #9CA3AF;
}

.regulator-info {
  flex: 1;
}

.regulator-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.regulator-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
  flex: 1;
}

.regulator-badge {
  background: #3B82F6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.regulator-description {
  color: #6B7280;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.regulator-meta {
  display: flex;
  gap: 1rem;
}

.website-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
}

.website-link:hover {
  text-decoration: underline;
}

.regulator-actions {
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
  .regulator-item {
    flex-direction: column;
  }
  
  .regulator-preview {
    flex-direction: column;
  }
  
  .regulator-logo-preview {
    width: 100%;
    height: 120px;
  }
  
  .regulator-actions {
    flex-direction: row;
  }
}
</style>
