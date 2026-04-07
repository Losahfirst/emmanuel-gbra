<template>
  <div class="datasets-page">
    <div class="sidebar">
      <div class="sidebar-header">
        <router-link to="/outils" class="back-btn"><ArrowLeft size="18" /> Retour</router-link>
        <h2>Jeux de <span class="accent">Données</span></h2>
      </div>

      <div class="filter-control">
        <p class="filter-desc">
          Ces 15 jeux de données sont générés de manière synthétique à titre illustratif (Data Science, Formations IoT, Algorithmes de Maintenance).
        </p>
      </div>
    </div>

    <div class="main-content">
      <div class="dashboard">
        <div class="dash-header">
          <h3>Catalogue de Datasets (CSV)</h3>
          <p class="dash-subtitle">Cliquez sur une carte pour visualiser un aperçu des données avant le téléchargement.</p>
        </div>

        <div class="datasets-grid">
          <div v-for="(ds, index) in datasets" :key="index" class="dataset-card" :class="{ 'expanded': ds.showPreview }">
            <div class="card-clickable-area" @click="togglePreview(ds)">
              <div class="ds-header-top">
                <div class="ds-icon-wrapper">
                  <component :is="ds.icon" class="ds-icon" />
                </div>
                <div class="expand-icon">
                  <ChevronDown v-if="!ds.showPreview" size="20" />
                  <ChevronUp v-else size="20" />
                </div>
              </div>
              <div class="ds-content">
                <h4>{{ ds.title }}</h4>
                <p>{{ ds.description }}</p>
                <div class="ds-meta">
                  <span class="ds-tag"><Database size="12" /> {{ ds.rows }} lignes</span>
                  <span class="ds-tag"><Columns size="12" /> {{ ds.cols }} colonnes</span>
                </div>
              </div>
            </div>
            
            <!-- Preview Section inside the card -->
            <div v-show="ds.showPreview" class="preview-section">
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th v-for="header in ds.previewHeaders" :key="header">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rIdx) in ds.previewRows" :key="rIdx">
                      <td v-for="(cell, cIdx) in row" :key="cIdx">{{ cell }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="ds-actions">
                <button class="download-btn" @click.stop="downloadDataset(ds)" :disabled="isGenerating === ds.id">
                  <span v-if="isGenerating !== ds.id"><Download size="16" /> Télécharger CSV complet ({{ ds.rows }})</span>
                  <span v-else><RefreshCw size="16" class="spin" /> Génération du fichier...</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ArrowLeft, Database, Download, Columns, Activity, Zap, Wind, Droplet, Thermometer, Box, Info, RefreshCw, Power, ChevronDown, ChevronUp } from 'lucide-vue-next'

const isGenerating = ref(null)

const datasets = reactive([
  { id: 'meteo', title: "Données Météorologiques (5 ans)", description: "Température extérieure, humidité relative, ensoleillement W/m2, et vitesse de vent.", rows: "43 800", cols: 5, icon: Wind, generator: generateMeteo, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'elec_factory', title: "Consommation Usine (Smart Metering)", description: "Courbes de charge KWh, Cos-Phi, Puissance active et réactive d'une usine.", rows: "52 560", cols: 6, icon: Zap, generator: generateElecFactory, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'chiller', title: "Carnet de Défauts Groupe à Eau Glacée", description: "Registre d'alarmes sur 20 ans : codes erreurs (BP, HP, débit) et valeurs de déclenchement.", rows: "3 500", cols: 7, icon: Droplet, generator: generateChiller, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'residential', title: "Courbes de charge Résidentielles", description: "Consommations de 500 abonnés électriques BT sur 1 an (Linky / Smart Meters).", rows: "182 500", cols: 4, icon: Power, generator: generateResidential, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'power_quality', title: "Défauts Réseau Électrique (Qualité)", description: "Creux de tension, surtensions, harmoniques (THD) sur TGBT industriel simulé.", rows: "10 000", cols: 5, icon: Activity, generator: generateQuality, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'motors', title: "Vibrations & Températures Moteurs", description: "Télémétrie vibratoire et thermique pour la Maintenance Prédictive (PdM).", rows: "150 000", cols: 4, icon: Box, generator: generateMotors, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'bms', title: "Télémétrie Bâtiment Intelligent (GTB)", description: "Taux de CO2, occupation, température zones et état des clapets CVC.", rows: "35 000", cols: 6, icon: Thermometer, generator: generateBms, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'gas', title: "Historique Consommation Gaz Industriel", description: "Débits débitmètres massiques, pression de ligne et PCS.", rows: "8 760", cols: 4, icon: Activity, generator: generateGas, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'solar', title: "Efficacité Panneaux Solaires", description: "Irradiance (W/m2), Température panneau vs Rendement électrique réel.", rows: "17 520", cols: 5, icon: Zap, generator: generateSolar, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'ev_charging', title: "Profil Charge Bornes IRVE", description: "Données de charge véhicules électriques : durée, énergie (kWh), pic de puissance.", rows: "5 000", cols: 5, icon: Zap, generator: generateEv, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'mqtt', title: "Historique Alarmes MQTT Production", description: "Logs bruts de topics MQTT avec statuts de machines, erreurs et acquittements.", rows: "12 000", cols: 4, icon: Database, generator: generateMqtt, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'wind_turbines', title: "Production Éoliennes (SCADA)", description: "Vitesse vent nacelle, pitch angle, puissance active et vitesse rotor.", rows: "52 560", cols: 5, icon: Wind, generator: generateWind, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'data_center', title: "Consommation Data Center (PUE)", description: "Consommation IT, refroidissement, pertes onduleurs et ratio PUE.", rows: "8 760", cols: 5, icon: Database, generator: generateDataCenter, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'hvac_ahu', title: "Performances Centrale Traitement Air (CTA)", description: "Débit d'air, filtres encrassés (Pa), consigne température et vanne d'eau.", rows: "17 520", cols: 6, icon: Thermometer, generator: generateAhu, showPreview: false, previewHeaders: [], previewRows: [] },
  { id: 'microgrid', title: "Bilan Énergétique Microgrid", description: "Équilibre entre production solaire, stockage batterie et réseau hybride.", rows: "35 040", cols: 6, icon: Activity, generator: generateMicrogrid, showPreview: false, previewHeaders: [], previewRows: [] }
])

// Function to open/close the preview
const togglePreview = (ds) => {
  ds.showPreview = !ds.showPreview
  
  if (ds.showPreview && ds.previewHeaders.length === 0) {
    // Generate only 5 rows for preview
    const sampleCsv = ds.generator(5)
    const lines = sampleCsv.trim().split('\n')
    ds.previewHeaders = lines[0].split(',')
    ds.previewRows = lines.slice(1).map(line => line.split(','))
  }
}

const downloadDataset = async (ds) => {
  if(isGenerating.value) return;
  isGenerating.value = ds.id;
  
  // Simulation de délai pour générer les données
  setTimeout(() => {
    try {
      // Gen full dataset (no limit passed)
      const csvContent = ds.generator()
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `${ds.id}_dataset.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch(e) {
      console.error(e)
    } finally {
      isGenerating.value = null
    }
  }, 300)
}

// ------ GENERATORS WITH LIMIT LOGIC ------ //

function random(min, max) { return Math.random() * (max - min) + min; }

function generateMeteo(limit = 43800) {
  let csv = "Timestamp,Temp_C,Humidity_RH,Solar_Irradiance_W_m2,Wind_Speed_m_s\n"
  let ts = new Date('2019-01-01T00:00:00Z').getTime()
  for (let i = 0; i < limit; i++) {
    let date = new Date(ts); let hour = date.getHours(); let day = (i % 8760)/24;
    let tempBase = 15 + 10 * Math.sin(2 * Math.PI * (day - 100) / 365) - 5 * Math.cos(2 * Math.PI * hour / 24)
    let temp = tempBase + random(-2, 2); let hum = Math.max(0, Math.min(100, 60 + random(-10, 20) - (temp-15)*1.5))
    let isDay = hour > 6 && hour < 18; let sun = isDay ? random(100, 900) * Math.sin(Math.PI * (hour-6)/12) : 0
    let wind = Math.max(0, random(0, 15) + 3*Math.sin(day/10))
    csv += `${date.toISOString()},${temp.toFixed(2)},${hum.toFixed(1)},${sun.toFixed(0)},${wind.toFixed(1)}\n`
    ts += 3600000 
  }
  return csv
}

function generateElecFactory(limit = 52560) {
  let csv = "Timestamp,ActivePower_kW,ReactivePower_kVAR,CosPhi,Voltage_L1_V,Frequency_Hz\n"
  let ts = new Date('2025-01-01T00:00:00Z').getTime()
  for (let i = 0; i < limit; i++) {
    let hour = new Date(ts).getHours(); let isWorkingHour = hour >= 7 && hour <= 19
    let active = isWorkingHour ? random(800, 1200) : random(150, 300); let react = active * random(0.2, 0.4)
    let cosPhi = active / Math.sqrt(active*active + react*react); let volt = random(390, 410); let freq = random(49.85, 50.15)
    csv += `${new Date(ts).toISOString()},${active.toFixed(2)},${react.toFixed(2)},${cosPhi.toFixed(3)},${volt.toFixed(1)},${freq.toFixed(3)}\n`
    ts += 600000
  }
  return csv
}

function generateChiller(limit = 3500) {
  let csv = "Timestamp,Chiller_ID,Alarm_Code,Description,Severity,Trigger_Value_C_or_Bar,Resolution_Time_Hrs\n"
  let ts = new Date('2005-01-01T00:00:00Z').getTime()
  const faults = [
    { code: "E01", desc: "Défaut Basse Pression (Fuite/Charge)", severity: "High" },
    { code: "E02", desc: "Défaut Haute Pression (Encrassement Condenseur)", severity: "Critical" },
    { code: "E03", desc: "Défaut Interrupteur de Débit d'Eau Glacée", severity: "Medium" },
    { code: "E04", desc: "Température d'Approche Élevée", severity: "Medium" },
    { code: "E05", desc: "Défaut Compresseur (Surintensité thermique)", severity: "Critical" },
    { code: "E06", desc: "Déséquilibre de Phase Électrique", severity: "High" },
    { code: "E07", desc: "Sonde de Température Évaporateur Défectueuse", severity: "Low" }
  ]
  for (let i = 0; i < limit; i++) {
    let fault = faults[Math.floor(random(0, faults.length))]
    let trigger = fault.code === 'E01' ? random(1.5, 2.0).toFixed(2) + ' bar' : 
                  fault.code === 'E02' ? random(18, 22).toFixed(2) + ' bar' : 
                  fault.code === 'E04' ? random(45, 55).toFixed(1) + ' °C' : 
                  fault.code === 'E05' ? random(150, 200).toFixed(0) + ' A' : 'N/A'
    let duration = random(0.5, 48).toFixed(1)
    csv += `${new Date(ts).toISOString()},CH-${Math.floor(random(1,4))},${fault.code},${fault.desc},${fault.severity},${trigger},${duration}\n`
    ts += 86400000 * random(8, 60)
  }
  return csv
}

function generateResidential(limit = 182500) {
  let csv = "Timestamp,Meter_ID,Consumption_kWh,Peak_Demand_kW\n"
  let ts = new Date('2024-01-01T00:00:00Z').getTime()
  for (let i = 0; i < limit; i++) {
    let hour = new Date(ts).getHours()
    let load = (hour > 18 && hour < 22) ? random(1.5, 4.0) : random(0.1, 1.0)
    csv += `${new Date(ts).toISOString()},MTR-${Math.floor(random(1000, 9999))},${load.toFixed(3)},${(load*1.5).toFixed(2)}\n`
    ts += 3600000
  }
  return csv
}

function generateGeneric(colsStr, rowCount, formula, limit) {
  let actualLimit = limit && limit < rowCount ? limit : rowCount
  let csv = colsStr + "\n"
  let ts = new Date('2024-01-01T00:00:00Z').getTime()
  for(let i=0; i < actualLimit; i++) {
    csv += new Date(ts).toISOString() + "," + formula(i) + "\n"
    ts += 3600000
  }
  return csv
}

function generateQuality(limit) { return generateGeneric("Timestamp,Voltage_V,THD_U_pct,THD_I_pct,Event_Type", 10000, () => `${random(200,240).toFixed(1)},${random(1, 8).toFixed(2)},${random(2, 12).toFixed(2)},${Math.random()>0.95?'SAG':'NORMAL'}`, limit) }
function generateMotors(limit) { return generateGeneric("Timestamp,Motor_ID,Vibration_mm_s,Temp_C", 150000, () => `MOT-${Math.floor(random(1,5))},${random(1,15).toFixed(2)},${random(40,95).toFixed(1)}`, limit) }
function generateBms(limit) { return generateGeneric("Timestamp,Zone_ID,CO2_ppm,Occupancy,Temp_C,Damper_Pos_pct", 35000, () => `Z-${Math.floor(random(1,10))},${Math.floor(random(400, 1200))},${Math.random()>0.5?1:0},${random(19,26).toFixed(1)},${random(0,100).toFixed(0)}`, limit) }
function generateGas(limit) { return generateGeneric("Timestamp,Flow_Nm3_h,Pressure_mbar,PCS_kWh_Nm3", 8760, () => `${random(50, 500).toFixed(1)},${random(20, 50).toFixed(1)},${random(10.5, 11.5).toFixed(2)}`, limit) }
function generateSolar(limit) { return generateGeneric("Timestamp,Panel_ID,Irradiance_W_m2,Panel_Temp_C,Power_kW", 17520, () => `PAN-${Math.floor(random(1,15))},${random(0,1000).toFixed(0)},${random(10, 60).toFixed(1)},${random(0,0.3).toFixed(3)}`, limit) }
function generateEv(limit) { return generateGeneric("Timestamp,Station_ID,Duration_min,Energy_kWh,Max_kW", 5000, () => `CS-${Math.floor(random(1,5))},${random(10, 180).toFixed(0)},${random(5, 80).toFixed(1)},${random(11, 50).toFixed(1)}`, limit) }
function generateMqtt(limit) { return generateGeneric("Timestamp,Topic,Payload_Value,QoS", 12000, () => `factory/machine/sensor,${random(0,100).toFixed(2)},${Math.floor(Math.random()*3)}`, limit) }
function generateWind(limit) { return generateGeneric("Timestamp,Turbine_ID,WindSpeed_m_s,Pitch_deg,Power_MW", 52560, () => `WTB-01,${random(0, 25).toFixed(1)},${random(0, 45).toFixed(1)},${random(0, 2).toFixed(3)}`, limit) }
function generateDataCenter(limit) { return generateGeneric("Timestamp,IT_Load_kW,Cooling_Load_kW,UPS_Losses_kW,PUE", 8760, () => { let it=random(500,1000); let cool=it*random(0.2,0.4); return `${it.toFixed(1)},${cool.toFixed(1)},${(it*0.05).toFixed(1)},${((it+cool+it*0.05)/it).toFixed(2)}`}, limit) }
function generateAhu(limit) { return generateGeneric("Timestamp,Airflow_m3_h,Filter_DP_Pa,SetPoint_C,Valve_pct,Return_Temp_C", 17520, () => `${random(5000, 15000).toFixed(0)},${random(50, 300).toFixed(0)},${random(20,24).toFixed(1)},${random(0,100).toFixed(1)},${random(18,28).toFixed(1)}`, limit) }
function generateMicrogrid(limit) { return generateGeneric("Timestamp,Solar_kW,Battery_kW,Grid_kW,Load_kW,SoC_pct", 35040, () => {let l=random(100,500); return `${random(0,300).toFixed(1)},${random(-100,100).toFixed(1)},${random(0,l).toFixed(1)},${l.toFixed(1)},${random(20,95).toFixed(1)}`}, limit) }

</script>

<style scoped>
.datasets-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--gray-50);
  padding-top: 80px;
}

.sidebar {
  width: 380px;
  background: var(--white);
  border-right: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  z-index: 10;
  overflow-y: auto;
}

.sidebar-header { margin-bottom: 2rem; }

.back-btn { 
  display: flex; align-items: center; gap: 0.5rem; 
  font-size: 0.85rem; font-weight: 800; color: var(--gray-400); 
  text-decoration: none; margin-bottom: 1.5rem; transition: color 0.3s; 
}
.back-btn:hover { color: var(--black); }

h2 { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; }

.filter-control {
  background: var(--gray-50);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--gray-200);
}

.filter-desc {
  font-size: 0.85rem;
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  background: var(--black);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.info-btn:hover {
  background: var(--accent);
}

.main-content {
  flex-grow: 1;
  padding: 3rem;
  overflow-y: auto;
}

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dash-header {
  margin-bottom: 3rem;
}

.dash-header h3 {
  font-size: 2rem;
  font-weight: 900;
  color: var(--black);
  letter-spacing: -1px;
}

.dash-subtitle {
  color: var(--gray-500);
  margin-top: 0.5rem;
}

.datasets-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 4rem;
}

.dataset-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  overflow: hidden;
}

.dataset-card.expanded {
  border-color: var(--black);
  box-shadow: 0 15px 30px rgba(0,0,0,0.05);
}

.card-clickable-area {
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card-clickable-area:hover {
  background: var(--gray-50);
}

.ds-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.expand-icon {
  color: var(--gray-400);
}

.dataset-card.expanded .expand-icon {
  color: var(--black);
}

.ds-icon-wrapper {
  width: 48px;
  height: 48px;
  background: var(--gray-50);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--accent);
}

.dataset-card.expanded .ds-icon-wrapper {
  background: var(--accent);
  color: var(--white);
}

.ds-icon { width: 24px; height: 24px; }

.ds-content h4 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: 0.5rem;
}

.ds-content p {
  font-size: 0.95rem;
  color: var(--gray-500);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.ds-meta {
  display: flex;
  gap: 1rem;
}

.ds-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-600);
  background: var(--gray-100);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
}

/* Table Preview Section */
.preview-section {
  padding: 0 2rem 2rem 2rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  margin-bottom: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.8rem;
}

th {
  background: var(--gray-200);
  color: var(--black);
  font-weight: 800;
  padding: 0.75rem 1rem;
  white-space: nowrap;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-600);
  font-family: monospace;
  white-space: nowrap;
}

tbody tr:last-child td {
  border-bottom: none;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: var(--black);
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s;
}

.download-btn span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.download-btn:hover:not(:disabled) {
  background: var(--accent);
}

.download-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: var(--gray-400);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .datasets-page { flex-direction: column; overflow-y: auto; height: auto; display: block; }
  .sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--gray-200); }
  .main-content { padding: 1.5rem; overflow-y: visible; }
  .dash-header h3 { font-size: 1.5rem; }
}
</style>
