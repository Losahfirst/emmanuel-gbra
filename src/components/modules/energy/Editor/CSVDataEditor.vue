<template>
  <div class="csv-editor">
    <div class="editor-section-header">
      <div>
        <h2 class="section-title">Gestion des Données CSV</h2>
        <p class="section-subtitle">Visualisez et modifiez les données CSV utilisées par KANARI</p>
      </div>
      <button @click="loadCSVFiles" class="btn-secondary">
        <RefreshCw :size="18" />
        <span>Actualiser</span>
      </button>
    </div>

    <!-- CSV Files List -->
    <div class="csv-files-list">
      <div
        v-for="file in csvFiles"
        :key="file.name"
        class="csv-file-item"
        :class="{ active: selectedFile === file.name }"
        @click="selectFile(file.name)"
      >
        <div class="file-icon">
          <FileSpreadsheet :size="24" />
        </div>
        <div class="file-info">
          <h3 class="file-name">{{ file.displayName }}</h3>
          <p class="file-path">{{ file.name }}</p>
        </div>
        <div class="file-status">
          <span v-if="file.loaded" class="status-badge success">Chargé</span>
          <span v-else class="status-badge">Non chargé</span>
        </div>
      </div>
    </div>

    <!-- CSV Data Viewer/Editor -->
    <div v-if="selectedFile && csvData" class="csv-data-viewer">
      <div class="viewer-header">
        <h3>{{ getFileDisplayName(selectedFile) }}</h3>
        <div class="viewer-actions">
          <button @click="exportCSV" class="btn-secondary">
            <Download :size="18" />
            <span>Télécharger CSV</span>
          </button>
          <button @click="showAddRow = true" class="btn-primary">
            <Plus :size="18" />
            <span>Ajouter une ligne</span>
          </button>
        </div>
      </div>

      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th v-for="header in csvHeaders" :key="header">
                {{ header }}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in csvData" :key="index">
              <td v-for="header in csvHeaders" :key="header">
                <input
                  v-model="row[header]"
                  type="text"
                  class="table-input"
                  @blur="saveCSVData"
                />
              </td>
              <td>
                <button @click="deleteRow(index)" class="btn-delete-small">
                  <Trash2 :size="14" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="csvData.length === 0" class="empty-data">
        <p>Aucune donnée dans ce fichier</p>
        <button @click="showAddRow = true" class="btn-primary">
          Ajouter la première ligne
        </button>
      </div>
    </div>

    <!-- Add Row Modal -->
    <div v-if="showAddRow" class="modal-overlay" @click="showAddRow = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Ajouter une ligne</h2>
          <button @click="showAddRow = false" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group" v-for="header in csvHeaders" :key="header">
            <label class="form-label">{{ header }}</label>
            <input
              v-model="newRow[header]"
              type="text"
              class="form-input"
              :placeholder="header"
            />
          </div>
          <div class="form-actions">
            <button @click="showAddRow = false" class="btn-cancel">Annuler</button>
            <button @click="addRow" class="btn-save">Ajouter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RefreshCw, FileSpreadsheet, Download, Plus, Trash2, X } from 'lucide-vue-next'
import { getCSVData, saveCSVData as saveCSVDataStorage } from '../../../../services/editorStorage.js'
import Papa from 'papaparse'

const csvFiles = ref([
  { name: 'Consommation_Nationale.csv', displayName: 'Consommation Nationale', loaded: false },
  { name: 'Production_CIE_en_MWH_1.csv', displayName: 'Production CIE', loaded: false },
  { name: 'Longueur_Réseau_National_km.csv', displayName: 'Longueur Réseau', loaded: false },
  { name: 'Nombre_d\'abonnés_BTMTHT.csv', displayName: 'Nombre d\'Abonnés', loaded: false },
  { name: 'Pointe_maxi_Nationale_MW_1.csv', displayName: 'Pointe Maximale', loaded: false },
  { name: 'EletrificationRurale.csv', displayName: 'Électrification Rurale', loaded: false }
])

const selectedFile = ref(null)
const csvData = ref(null)
const csvHeaders = ref([])
const showAddRow = ref(false)
const newRow = ref({})

function getFileDisplayName(fileName) {
  const file = csvFiles.value.find(f => f.name === fileName)
  return file ? file.displayName : fileName
}

async function selectFile(fileName) {
  selectedFile.value = fileName
  
  try {
    // Charger depuis le fichier CSV public
    const response = await fetch(`/data/${fileName}`)
    if (!response.ok) {
      throw new Error('Fichier non trouvé')
    }
    
    const text = await response.text()
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        csvData.value = results.data
        csvHeaders.value = Object.keys(results.data[0] || {})
        csvFiles.value.find(f => f.name === fileName).loaded = true
      },
      error: (error) => {
        console.error('Erreur de parsing CSV:', error)
        alert('Erreur lors du chargement du fichier CSV')
      }
    })
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
    // Essayer de charger depuis localStorage
    const stored = getCSVData(fileName)
    if (stored && stored.data) {
      csvData.value = stored.data
      csvHeaders.value = Object.keys(stored.data[0] || {})
    } else {
      alert('Fichier non trouvé')
    }
  }
}

function saveCSVData() {
  if (!selectedFile.value || !csvData.value) return
  
  try {
    saveCSVDataStorage(selectedFile.value, csvData.value)
    // Les données sont automatiquement sauvegardées dans localStorage
    // Elles persisteront même après un rafraîchissement de la page
    // Pas besoin d'alerte pour chaque modification, seulement pour les actions importantes
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde')
  }
}

function addRow() {
  if (!csvHeaders.value.length) return
  
  const row = {}
  csvHeaders.value.forEach(header => {
    row[header] = newRow.value[header] || ''
  })
  
  csvData.value.push(row)
  saveCSVData()
  showAddRow.value = false
  newRow.value = {}
}

function deleteRow(index) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette ligne?')) {
    csvData.value.splice(index, 1)
    saveCSVData()
  }
}

function exportCSV() {
  if (!csvData.value || !selectedFile.value) return
  
  const csv = Papa.unparse(csvData.value)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = selectedFile.value
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function loadCSVFiles() {
  // Recharger la liste des fichiers
  csvFiles.value.forEach(file => {
    file.loaded = false
  })
  if (selectedFile.value) {
    selectFile(selectedFile.value)
  }
}

onMounted(() => {
  // Charger le premier fichier par défaut
  if (csvFiles.value.length > 0) {
    selectFile(csvFiles.value[0].name)
  }
})
</script>

<style scoped>
.csv-editor {
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

.csv-files-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.csv-file-item {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.csv-file-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.csv-file-item.active {
  border-color: #3B82F6;
  background: #EFF6FF;
}

.file-icon {
  color: #3B82F6;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.25rem 0;
}

.file-path {
  font-size: 0.8125rem;
  color: #6B7280;
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #E5E7EB;
  color: #6B7280;
}

.status-badge.success {
  background: #D1FAE5;
  color: #065F46;
}

.csv-data-viewer {
  background: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 2px solid #E5E7EB;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.viewer-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0;
}

.viewer-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.data-table-wrapper {
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  background: white;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.data-table thead {
  background: #F3F4F6;
}

.data-table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.875rem;
  color: #1A1A1A;
  border-bottom: 2px solid #E5E7EB;
}

.data-table td {
  padding: 0.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.table-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.table-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-delete-small {
  background: #EF4444;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-delete-small:hover {
  background: #DC2626;
}

.empty-data {
  text-align: center;
  padding: 3rem;
  color: #6B7280;
}

.btn-secondary,
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: #E5E7EB;
  color: #1A1A1A;
}

.btn-secondary:hover {
  background: #D1D5DB;
}

.btn-primary {
  background: #3B82F6;
  color: white;
}

.btn-primary:hover {
  background: #2563EB;
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-label {
  font-weight: 600;
  color: #1A1A1A;
  font-size: 0.9375rem;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  background: #F3F4F6;
  color: #1A1A1A;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #E5E7EB;
}

.btn-save {
  padding: 0.75rem 1.5rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:hover {
  background: #2563EB;
}
</style>
