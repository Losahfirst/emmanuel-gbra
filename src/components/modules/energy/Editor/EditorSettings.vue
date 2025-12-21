<template>
  <div class="editor-settings">
    <div class="settings-section">
      <h2 class="section-title">Paramètres de l'Editor</h2>
      <p class="section-subtitle">Configurez les paramètres de gestion du contenu KANARI</p>
    </div>

    <div class="settings-content">
      <div class="setting-card">
        <h3 class="setting-title">Stockage des données</h3>
        <p class="setting-description">
          Les données sont stockées localement dans votre navigateur (localStorage).
          Pour une sauvegarde permanente, utilisez la fonction d'export.
        </p>
        <div class="setting-info">
          <div class="info-item">
            <span class="info-label">Articles:</span>
            <span class="info-value">{{ articlesCount }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Régulateurs:</span>
            <span class="info-value">{{ regulatorsCount }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Producteurs:</span>
            <span class="info-value">{{ producersCount }}</span>
          </div>
        </div>
      </div>

      <div class="setting-card">
        <h3 class="setting-title">Intégration avec les pages</h3>
        <p class="setting-description">
          Les données créées dans l'Editor sont automatiquement utilisées par les pages KANARI.
          Les données de l'Editor ont la priorité sur les données par défaut.
        </p>
      </div>

      <div class="setting-card">
        <h3 class="setting-title">Gestion des images</h3>
        <p class="setting-description">
          Pour les images, vous pouvez utiliser:
        </p>
        <ul class="setting-list">
          <li>URLs complètes (https://example.com/image.jpg)</li>
          <li>Chemins relatifs depuis le dossier public (/logos/regulators/logo.png)</li>
          <li>Images hébergées sur des services externes (Unsplash, etc.)</li>
        </ul>
      </div>

      <div class="setting-card">
        <h3 class="setting-title">Export et Import</h3>
        <p class="setting-description">
          Utilisez les boutons d'export/import dans l'en-tête de l'Editor pour sauvegarder
          ou restaurer toutes vos données.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllArticles, getAllRegulators, getAllProducers } from '../../../../services/jsonDataService.js'

const articlesCount = ref(0)
const regulatorsCount = ref(0)
const producersCount = ref(0)

async function updateCounts() {
  try {
    const articles = await getAllArticles()
    const regulators = await getAllRegulators()
    const producers = await getAllProducers()
    
    articlesCount.value = articles.length
    regulatorsCount.value = regulators.length
    producersCount.value = producers.length
  } catch (error) {
    console.error('Erreur lors de la mise à jour des compteurs:', error)
  }
}

onMounted(() => {
  updateCounts()
  // Actualiser toutes les 2 secondes
  setInterval(updateCounts, 2000)
})
</script>

<style scoped>
.editor-settings {
  width: 100%;
}

.settings-section {
  margin-bottom: 2rem;
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

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-card {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.setting-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 0.5rem 0;
}

.setting-description {
  color: #6B7280;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.setting-info {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.8125rem;
  color: #6B7280;
  font-weight: 600;
}

.info-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3B82F6;
}

.setting-list {
  margin: 0;
  padding-left: 1.5rem;
  color: #6B7280;
  font-size: 0.9375rem;
  line-height: 1.8;
}

.setting-list li {
  margin-bottom: 0.5rem;
}
</style>
