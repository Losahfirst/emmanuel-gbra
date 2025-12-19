<template>
  <div class="api-page">
    <div class="page-header">
      <h1 class="page-title">API Documentation</h1>
      <p class="page-subtitle">Accédez aux données énergétiques de la Côte d'Ivoire via l'API REST</p>
    </div>

    <!-- API Overview -->
    <div class="api-overview">
      <div class="overview-card">
        <h3 class="overview-title">Base URL</h3>
        <code class="code-block">energyApi.methodName(params)</code>
        <p class="overview-description">
          L'API est accessible directement depuis le code JavaScript via l'objet <code>energyApi</code>.
        </p>
      </div>
    </div>

    <!-- Endpoints List -->
    <div class="endpoints-section">
      <h2 class="section-title">Endpoints Disponibles</h2>

      <!-- Production -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getProduction</h3>
        </div>
        <p class="endpoint-description">Récupère les données de production mensuelle</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startDate</code> (string, optionnel) - Date de début (ISO 8601)</li>
            <li><code>endDate</code> (string, optionnel) - Date de fin (ISO 8601)</li>
            <li><code>source</code> (string, optionnel) - 'hydraulic' | 'thermal' | 'all'</li>
          </ul>
        </div>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const data = await energyApi.getProduction({
  startDate: '2020-01-01',
  endDate: '2020-12-31',
  source: 'hydraulic'
})</code></pre>
        </div>
      </div>

      <!-- Consumption -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getConsumption</h3>
        </div>
        <p class="endpoint-description">Récupère les données de consommation nationale annuelle</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel) - Année de début</li>
            <li><code>endYear</code> (number, optionnel) - Année de fin</li>
            <li><code>type</code> (string, optionnel) - 'bt' | 'htmt' | 'all'</li>
          </ul>
        </div>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const data = await energyApi.getConsumption({
  startYear: 2015,
  endYear: 2020,
  type: 'bt'
})</code></pre>
        </div>
      </div>

      <!-- Production Brute -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getProductionBrute</h3>
        </div>
        <p class="endpoint-description">Récupère les données de production brute annuelle</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
            <li><code>source</code> (string, optionnel) - 'hydraulic' | 'thermal' | 'isolated' | 'all'</li>
          </ul>
        </div>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const data = await energyApi.getProductionBrute({
  startYear: 2010,
  endYear: 2020
})</code></pre>
        </div>
      </div>

      <!-- Installed Power -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getInstalledPower</h3>
        </div>
        <p class="endpoint-description">Récupère les données de puissance installée</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
          </ul>
        </div>
      </div>

      <!-- Peak Power -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getPeakPower</h3>
        </div>
        <p class="endpoint-description">Récupère les données de pointe maximale</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
          </ul>
        </div>
      </div>

      <!-- Network Length -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getNetworkLength</h3>
        </div>
        <p class="endpoint-description">Récupère les données de longueur de réseau</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
            <li><code>type</code> (string, optionnel) - 'bt' | 'mt' | 'ht' | 'all'</li>
          </ul>
        </div>
      </div>

      <!-- Subscribers -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getSubscribers</h3>
        </div>
        <p class="endpoint-description">Récupère les données d'abonnés</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
            <li><code>type</code> (string, optionnel) - 'bt' | 'htmt' | 'all'</li>
          </ul>
        </div>
      </div>

      <!-- Rural Electrification -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getRuralElectrification</h3>
        </div>
        <p class="endpoint-description">Récupère les données d'électrification rurale</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
          </ul>
        </div>
      </div>

      <!-- Specific Consumption -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getSpecificConsumption</h3>
        </div>
        <p class="endpoint-description">Récupère les données de consommation spécifique (kWh par habitant)</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
          </ul>
        </div>
      </div>

      <!-- KPIs -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getKPIs</h3>
        </div>
        <p class="endpoint-description">Récupère les KPIs calculés (pas de paramètres)</p>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const kpis = await energyApi.getKPIs()
// Retourne: {
//   totalProduction, totalConsumption, installedPower,
//   peakPower, renewableRate, growthRate, subscribers,
//   ruralElectrification, networkLength, year
// }</code></pre>
        </div>
      </div>

      <!-- Statistics -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getStatistics</h3>
        </div>
        <p class="endpoint-description">Récupère des statistiques agrégées sur une période</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel) - Par défaut: 1980</li>
            <li><code>endYear</code> (number, optionnel) - Par défaut: 2020</li>
          </ul>
        </div>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const stats = await energyApi.getStatistics({
  startYear: 2010,
  endYear: 2020
})</code></pre>
        </div>
      </div>

      <!-- Power Plants List -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getPowerPlantsList</h3>
        </div>
        <p class="endpoint-description">Récupère la liste complète de toutes les centrales électriques</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>type</code> (string, optionnel) - 'hydraulic' | 'thermal' | 'solar' | 'bioenergy' | 'all'</li>
          </ul>
        </div>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>// Toutes les centrales
const allPlants = await energyApi.getPowerPlantsList()

// Centrales hydrauliques uniquement
const hydraulicPlants = await energyApi.getPowerPlantsList({ type: 'hydraulic' })

// Centrales thermiques uniquement
const thermalPlants = await energyApi.getPowerPlantsList({ type: 'thermal' })</code></pre>
        </div>
      </div>

      <!-- Power Plant Info -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getPowerPlantInfo</h3>
        </div>
        <p class="endpoint-description">Récupère les informations détaillées d'une centrale spécifique</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>id</code> (string, requis) - ID de la centrale (ex: 'azito', 'kossou', 'biovea')</li>
          </ul>
        </div>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const plantInfo = await energyApi.getPowerPlantInfo('azito')
// Retourne: { id, name, location, capacity, installationDate, status, operator, description, type }</code></pre>
        </div>
      </div>

      <!-- Power Plants Stats -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getPowerPlantsStats</h3>
        </div>
        <p class="endpoint-description">Récupère les statistiques des centrales par type</p>
        <div class="endpoint-example">
          <h4>Exemple :</h4>
          <pre><code>const stats = await energyApi.getPowerPlantsStats()
// Retourne: {
//   hydraulic: { total, totalCapacity, operational, planned, underConstruction },
//   thermal: { ... },
//   solar: { ... },
//   bioenergy: { ... }
// }</code></pre>
        </div>
      </div>

      <!-- Centrales Production -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getCentralesProduction</h3>
        </div>
        <p class="endpoint-description">Récupère les données de production par centrale (AZITO, CIPREL, AGGREKO)</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
            <li><code>centrale</code> (string, optionnel) - 'azito' | 'ciprel' | 'aggreko' | 'all'</li>
          </ul>
        </div>
      </div>

      <!-- Centrales Availability -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getCentralesAvailability</h3>
        </div>
        <p class="endpoint-description">Récupère les données de disponibilité des centrales</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel)</li>
            <li><code>endYear</code> (number, optionnel)</li>
            <li><code>centrale</code> (string, optionnel) - 'azito' | 'ciprel' | 'aggreko' | 'all'</li>
          </ul>
        </div>
      </div>

      <!-- Centrales Comparison -->
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge get">GET</span>
          <h3 class="endpoint-name">getCentralesComparison</h3>
        </div>
        <p class="endpoint-description">Compare les performances des centrales (production et disponibilité)</p>
        <div class="endpoint-params">
          <h4>Paramètres :</h4>
          <ul>
            <li><code>startYear</code> (number, optionnel) - Par défaut: 2010</li>
            <li><code>endYear</code> (number, optionnel) - Par défaut: 2020</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Usage Examples -->
    <div class="examples-section">
      <h2 class="section-title">Exemples d'Utilisation</h2>
      
      <div class="example-card">
        <h3>Charger toutes les données de production</h3>
        <pre><code>import { energyApi } from '@/api/energyApi.js'

// Charger toutes les données
const allProduction = await energyApi.getProduction()

// Filtrer par période
const recentProduction = await energyApi.getProduction({
  startDate: '2015-01-01',
  endDate: '2020-12-31'
})

// Filtrer par source
const hydraulicOnly = await energyApi.getProduction({
  source: 'hydraulic'
})</code></pre>
      </div>

      <div class="example-card">
        <h3>Obtenir les KPIs actuels</h3>
        <pre><code>const kpis = await energyApi.getKPIs()

console.log(`Production totale: ${kpis.totalProduction} GWh`)
console.log(`Taux renouvelable: ${kpis.renewableRate}%`)
console.log(`Puissance installée: ${kpis.installedPower} MW`)
console.log(`Pointe maximale: ${kpis.peakPower} MW`)</code></pre>
      </div>

      <div class="example-card">
        <h3>Analyser les tendances</h3>
        <pre><code>// Comparer deux périodes
const recent = await energyApi.getConsumption({
  startYear: 2015,
  endYear: 2020
})

const previous = await energyApi.getConsumption({
  startYear: 2010,
  endYear: 2014
})

// Calculer la croissance
const recentAvg = recent.reduce((sum, d) => sum + d.total, 0) / recent.length
const previousAvg = previous.reduce((sum, d) => sum + d.total, 0) / previous.length
const growth = ((recentAvg - previousAvg) / previousAvg * 100).toFixed(1)

console.log(`Croissance: ${growth}%`)</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.api-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #FAFAFA;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: #6B7280;
}

.api-overview {
  margin-bottom: 3rem;
}

.overview-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.overview-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
}

.code-block {
  display: block;
  background: #F3F4F6;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
}

.overview-description {
  font-size: 0.875rem;
  color: #6B7280;
  line-height: 1.6;
}

.endpoints-section,
.examples-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1.5rem;
}

.endpoint-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.method-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.method-badge.get {
  background: #D1FAE5;
  color: #065F46;
}

.endpoint-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.endpoint-description {
  font-size: 0.95rem;
  color: #6B7280;
  margin-bottom: 1rem;
}

.endpoint-params {
  margin-bottom: 1rem;
}

.endpoint-params h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}

.endpoint-params ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.endpoint-params li {
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.endpoint-params code {
  background: #F3F4F6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #3B82F6;
  font-weight: 600;
}

.endpoint-example {
  margin-top: 1rem;
}

.endpoint-example h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}

.endpoint-example pre {
  background: #1A1A1A;
  color: #E5E7EB;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.endpoint-example code {
  font-family: 'Courier New', monospace;
}

.example-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.example-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1rem;
}

.example-card pre {
  background: #1A1A1A;
  color: #E5E7EB;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .endpoint-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
