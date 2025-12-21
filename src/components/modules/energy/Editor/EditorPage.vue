<template>
  <div class="editor-page" style="padding-top: 100px;">
    <div class="editor-header">
      <div class="header-content">
        <h1 class="editor-title">
          <Settings :size="28" />
          <span>KANARI Editor</span>
        </h1>
        <p class="editor-subtitle">Gestion complète du contenu KANARI</p>
        <p class="editor-info">
          <Info :size="16" />
          <span>Les modifications téléchargent automatiquement les fichiers JSON. Copiez-les dans public/data/ pour qu'ils soient persistants.</span>
        </p>
      </div>
      <div class="header-actions">
        <button @click="exportData" class="btn-secondary">
          <Download :size="18" />
          <span>Exporter</span>
        </button>
        <button @click="showImportDialog = true" class="btn-secondary">
          <Upload :size="18" />
          <span>Importer</span>
        </button>
        <button @click="clearAllData" class="btn-danger">
          <Trash2 :size="18" />
          <span>Réinitialiser</span>
        </button>
      </div>
    </div>

    <div class="editor-content">
      <!-- Tabs Navigation -->
      <div class="editor-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
        >
          <component :is="tab.icon" :size="20" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content-wrapper">
        <!-- Flash Info Tab -->
        <div v-if="activeTab === 'flash-info'" class="tab-content">
          <FlashInfoEditor />
        </div>

        <!-- Articles Tab -->
        <div v-if="activeTab === 'articles'" class="tab-content">
          <ArticlesEditor />
        </div>

        <!-- Regulators Tab -->
        <div v-if="activeTab === 'regulators'" class="tab-content">
          <RegulatorsEditor />
        </div>

        <!-- Producers Tab -->
        <div v-if="activeTab === 'producers'" class="tab-content">
          <ProducersEditor />
        </div>

        <!-- CSV Data Tab -->
        <div v-if="activeTab === 'csv'" class="tab-content">
          <CSVDataEditor />
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <EditorSettings />
        </div>
      </div>
    </div>

    <!-- Import Dialog -->
    <div v-if="showImportDialog" class="modal-overlay" @click="showImportDialog = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Importer des données</h2>
          <button @click="showImportDialog = false" class="modal-close">
            <X :size="24" />
          </button>
        </div>
        <div class="modal-body">
          <input
            type="file"
            ref="importFileInput"
            @change="handleImportFile"
            accept=".json"
            style="display: none"
          />
          <button @click="importFileInput?.click()" class="btn-primary">
            <Upload :size="18" />
            <span>Sélectionner un fichier JSON</span>
          </button>
          <p class="help-text">Sélectionnez un fichier JSON exporté précédemment</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Settings,
  Download,
  Upload,
  Trash2,
  FileText,
  Shield,
  Factory,
  Database,
  X,
  Info,
  AlertCircle
} from 'lucide-vue-next'
import ArticlesEditor from './ArticlesEditor.vue'
import RegulatorsEditor from './RegulatorsEditor.vue'
import ProducersEditor from './ProducersEditor.vue'
import CSVDataEditor from './CSVDataEditor.vue'
import EditorSettings from './EditorSettings.vue'
import FlashInfoEditor from './FlashInfoEditor.vue'
import { exportAllData, importAllData, clearCache } from '../../../../services/jsonDataService.js'

const activeTab = ref('articles')
const showImportDialog = ref(false)
const importFileInput = ref(null)

const tabs = [
  { id: 'articles', label: 'Actualités', icon: FileText },
  { id: 'regulators', label: 'Régulateurs', icon: Shield },
  { id: 'producers', label: 'Producteurs', icon: Factory },
  { id: 'csv', label: 'Données CSV', icon: Database },
  { id: 'settings', label: 'Paramètres', icon: Settings }
]

function exportData() {
  try {
    const data = exportAllData()
    if (!data) {
      alert('Erreur lors de l\'export des données')
      return
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kanari-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('Données exportées avec succès!')
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    alert('Erreur lors de l\'export des données')
  }
}

async function handleImportFile(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result)
      await importAllData(data)
      alert('Données importées avec succès! Les fichiers JSON ont été téléchargés. Veuillez les copier dans public/data/ pour que les changements soient persistants.')
      showImportDialog.value = false
      // Recharger la page pour appliquer les changements
      window.location.reload()
    } catch (error) {
      console.error('Erreur lors de l\'import:', error)
      alert('Format de fichier invalide')
    }
  }
  reader.readAsText(file)
}

async function clearAllData() {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données? Cette action va vider le cache et télécharger des fichiers JSON vides.')) {
    try {
      clearCache()
      // Télécharger des fichiers JSON vides
      const emptyData = { articles: [], flashInfo: [], regulators: [], producers: [] }
      await importAllData(emptyData)
      alert('Toutes les données ont été réinitialisées. Les fichiers JSON vides ont été téléchargés. Veuillez les copier dans public/data/ pour que les changements soient persistants.')
      window.location.reload()
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error)
      alert('Erreur lors de la réinitialisation')
    }
  }
}
</script>

<style scoped>
.editor-page {
  min-height: 100vh;
  background: #F9FAFB;
  padding: 2rem;
}

.editor-header {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-content {
  flex: 1;
}

.editor-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 900;
  color: #1A1A1A;
  margin: 0 0 0.5rem 0;
}

.editor-subtitle {
  color: #6B7280;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.editor-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10B981;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem 0.75rem;
  background: #D1FAE5;
  border-radius: 0.5rem;
  border: 1px solid #A7F3D0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-secondary,
.btn-danger {
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

.btn-danger {
  background: #EF4444;
  color: white;
}

.btn-danger:hover {
  background: #DC2626;
}

.editor-content {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.editor-tabs {
  display: flex;
  border-bottom: 2px solid #E5E7EB;
  background: #F9FAFB;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #6B7280;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  color: #3B82F6;
  background: #F3F4F6;
}

.tab-button.active {
  color: #3B82F6;
  border-bottom-color: #3B82F6;
  background: white;
}

.tab-content-wrapper {
  min-height: 600px;
}

.tab-content {
  padding: 2rem;
}

/* Modal */
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
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.help-text {
  margin-top: 1rem;
  color: #6B7280;
  font-size: 0.875rem;
  text-align: center;
}

@media (max-width: 768px) {
  .editor-page {
    padding: 1rem;
  }
  
  .editor-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .editor-tabs {
    flex-wrap: nowrap;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
