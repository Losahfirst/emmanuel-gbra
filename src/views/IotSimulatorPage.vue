<template>
  <div class="gtb-simulator-container">
    <!-- AUTONOMOUS HEADER (Emmanuel GTB Simulator) -->
    <header class="gtb-nav">
      <div class="gtb-nav-content">
        <div class="gtb-brand">
          <div class="tinker-logo">
            <div class="t-grid">
              <div class="t-box active">E</div><div class="t-box"></div><div class="t-box active">G</div>
              <div class="t-box"></div><div class="t-box active">S</div><div class="t-box"></div>
              <div class="t-box active">I</div><div class="t-box"></div><div class="t-box active">M</div>
            </div>
          </div>
          <div class="brand-text">
            <h1 class="brand-name">Emmanuel Gbra <sub>GTB</sub></h1>
            <span class="app-tag">GTB SIMULATOR v2.0</span>
          </div>
        </div>

        <div class="gtb-steps-nav">
          <div class="gtb-step-item" :class="{ active: currentStep === 'arch' }" @click="goToStep('arch')">
            <span class="step-idx">01</span>
            <span class="step-label">ARCHITECTURE</span>
          </div>
          <div class="gtb-step-item" :class="{ active: currentStep === 'config' }" @click="goToStep('config')">
            <span class="step-idx">02</span>
            <span class="step-label">CONFIGURATION</span>
          </div>
          <div class="gtb-step-item" :class="{ active: currentStep === 'run' }" @click="goToStep('run')">
            <span class="step-idx">03</span>
            <span class="step-label">DASHBOARD</span>
          </div>
        </div>

        <div class="gtb-nav-actions">
          <router-link to="/outils" class="exit-btn">QUITTER</router-link>
          <div class="live-status" :class="{ active: isRunning }">
            <div class="status-dot"></div>
            <span>{{ isRunning ? 'SIMULATION ACTIVE' : 'PRET' }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="gtb-main">
      <!-- STEP 1: ADVANCED ARCHITECTURE -->
      <div v-if="currentStep === 'arch'" class="gtb-view arch-view fade-in">
        <div class="view-intro">
          <h2>Modélisation Physique & Logique</h2>
          <p>Définissez votre schéma d'installation, les points de mesure et le bus de communication.</p>
        </div>

        <div class="arch-workspace">
          <!-- SENSOR MODULE BUILDER -->
          <div class="workspace-panel sensor-panel">
            <div class="panel-header">
              <h3><Waves size="18" /> ÉQUIPEMENTS & SENSORS</h3>
              <button class="add-sensor-btn" @click="addNewSensorBlock">+ Ajouter un bloc</button>
            </div>

            <div class="sensor-blocks-list">
              <div v-if="config.sensorBlocks.length === 0" class="empty-state">
                Aucun équipement défini. Cliquez sur "Ajouter un bloc" pour commencer.
              </div>
              
              <div v-for="(block, index) in config.sensorBlocks" :key="block.id" class="sensor-config-card">
                <div class="card-row">
                  <div class="input-ctrl">
                    <label>Type de Capteur</label>
                    <select v-model="block.sensorId" @change="updateBlockDefaults(block)">
                      <option v-for="s in SENSORS" :key="s.id" :value="s.id">{{ s.name }}</option>
                    </select>
                  </div>
                  <div class="input-ctrl qty-ctrl">
                    <label>Quantité</label>
                    <input type="number" v-model="block.quantity" min="1" max="10" />
                  </div>
                  <button class="remove-block-btn" @click="removeSensorBlock(index)">×</button>
                </div>
                
                <div class="card-row second-row">
                  <div class="input-ctrl">
                    <label>Connexion</label>
                    <select v-model="block.connectionType">
                      <option v-for="c in CONNECTION_TYPES" :key="c" :value="c">{{ c }}</option>
                    </select>
                  </div>
                  <div class="input-ctrl">
                    <label>Seuil Alerte</label>
                    <input type="number" v-model="block.threshold" step="0.1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PHYSICAL SCHEMA VISUALIZATION -->
          <div class="workspace-panel schema-panel">
            <div class="panel-header">
              <h3><Box size="18" /> SCHÉMA PHYSIQUE</h3>
            </div>
            
            <div class="visual-canvas">
              <div class="schema-diagram">
                <!-- SENSORS COLUMN -->
                <div class="schema-col sensors-col">
                  <div v-for="block in config.sensorBlocks" :key="'vis-'+block.id" class="schema-node sensor-node">
                    <div class="node-icon"><Waves size="14" /></div>
                    <div class="node-info">
                      <strong>{{ getSensorName(block.sensorId) }}</strong>
                      <span>x{{ block.quantity }} ({{ block.connectionType }})</span>
                    </div>
                    <div class="node-cable" :class="block.connectionType.toLowerCase()"></div>
                  </div>
                </div>

                <!-- CENTRAL HUB / CABLE MANAGEMENT -->
                <div class="schema-bridge">
                  <div class="bus-line"></div>
                </div>

                <!-- CONTROLLER COLUMN -->
                <div class="schema-col board-col">
                  <div class="board-selector-wrap">
                    <label>Contrôleur Principal</label>
                    <select v-model="config.board" class="board-pick">
                      <option v-for="b in BOARDS" :key="b.id" :value="b.id">{{ b.name }}</option>
                    </select>
                  </div>
                  <div class="schema-node board-node" v-if="config.board">
                    <div class="node-icon"><Cpu size="20" /></div>
                    <div class="node-info">
                      <strong>{{ getBoardName(config.board) }}</strong>
                      <span>Traitement Edge</span>
                    </div>
                  </div>
                </div>

                <!-- CLOUD COLUMN -->
                <div class="schema-col cloud-col">
                  <div class="cloud-selector-wrap">
                    <label>Destination SCADA</label>
                    <select v-model="config.platform" class="cloud-pick">
                      <option v-for="c in CLOUDS" :key="c.id" :value="c.id">{{ c.name }}</option>
                    </select>
                  </div>
                  <div class="schema-node cloud-node" v-if="config.platform">
                    <div class="node-icon"><Cloud size="20" /></div>
                    <div class="node-info">
                      <strong>{{ getCloudName(config.platform) }}</strong>
                      <span>Supervision Distante</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="view-actions-footer">
          <button class="primary-gtb-btn" :disabled="!isArchValid" @click="proceedTo('config')">
            VALIDER LA TOPOLOGIE <ArrowRight size="18" />
          </button>
        </div>
      </div>

      <!-- STEP 2: CONFIGURATION -->
      <div v-if="currentStep === 'config'" class="gtb-view config-view fade-in">
        <div class="view-intro">
          <h2>Configuration & Intelligence</h2>
          <p>Paramétrez les protocoles de communication et examinez le code généré.</p>
        </div>

        <div class="config-grid">
          <div class="config-sidebar">
            <div class="config-box">
              <h3>PROTOCOLE COMM.</h3>
              <div class="input-ctrl">
                <label>Bus de terrain / Protocole</label>
                <select v-model="config.protocol">
                  <option v-for="p in PROTOCOLS" :key="p.id" :value="p.id">{{ p.name }}</option>
                </select>
              </div>
              <div class="input-ctrl">
                <label>Fréquence d'Indicateur (sec)</label>
                <input type="number" v-model="config.interval" min="1" />
              </div>
            </div>

            <div class="config-box">
              <h3>POINTS DE MESURES ({{ totalSensorsCount }})</h3>
              <div class="points-list">
                <div v-for="block in config.sensorBlocks" :key="'cal-'+block.id" class="cal-point">
                  <span>{{ getSensorName(block.sensorId) }}</span>
                  <div class="cal-range">
                    <input type="number" v-model="block.min" placeholder="Min" />
                    <input type="number" v-model="block.max" placeholder="Max" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-explorer">
            <div class="explorer-header">
              <span class="file-name">{{ codeExtension }}</span>
              <div class="code-actions">
                <button @click="copyCode">COPIER</button>
              </div>
            </div>
            <div class="code-body">
              <pre><code>{{ generatedCode }}</code></pre>
            </div>
          </div>
        </div>

        <div class="view-actions-footer">
          <button class="secondary-gtb-btn" @click="goToStep('arch')">MODIFIER SCHEMA</button>
          <button class="primary-gtb-btn" @click="proceedTo('run')">LANCER LA SUPERVISION</button>
        </div>
      </div>

      <!-- STEP 3: DASHBOARD -->
      <div v-if="currentStep === 'run'" class="gtb-view run-view fade-in">
        <div class="dashboard-header">
          <div class="dash-meta">
            <h2>Supervision Active</h2>
            <div class="dash-pills">
              <span>CONTROLEUR: {{ getBoardName(config.board) }}</span>
              <span>PROTOCOLE: {{ config.protocol.toUpperCase() }}</span>
            </div>
          </div>
          <div class="dash-main-actions">
            <button class="sim-toggle-btn" :class="{ running: isRunning }" @click="toggleSimulation">
              <Power v-if="!isRunning" size="18" />
              <Square v-else size="18" />
              {{ isRunning ? 'ARRETER SIMULATION' : 'DEMARRER SIMULATION' }}
            </button>
          </div>
        </div>

        <div class="dashboard-layout">
          <!-- LIVE GAUGES -->
          <div class="dash-grid-system">
             <div v-for="inst in sensorInstances" :key="inst.uid" class="gtb-card gauge-card">
                <div class="card-head">
                  <span class="inst-name">{{ inst.name }} #{{ inst.instanceIdx }}</span>
                  <span class="inst-status" :class="getInstStatus(inst)"></span>
                </div>
                <div class="gauge-preview">
                   <svg viewBox="0 0 100 100" class="gauge-svg-prime">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" stroke-width="6" />
                      <circle cx="50" cy="50" r="45" fill="none" :stroke="getInstColor(inst)" stroke-width="6"
                        stroke-linecap="round" :stroke-dasharray="getInstDash(inst)"
                        transform="rotate(-90 50 50)" />
                      <text x="50" y="52" text-anchor="middle" class="gauge-text-val">{{ lastValuesMap[inst.uid] || 0 }}</text>
                   </svg>
                </div>
                <div class="card-foot">
                  <span>{{ inst.connectionType }}</span>
                  <span class="threshold-label">Seuil: {{ inst.threshold }}</span>
                </div>
             </div>
          </div>

          <!-- ANALYTICS & LOGS -->
          <div class="dash-secondary-system">
            <div class="gtb-card chart-card-gtb">
               <div class="card-head"><h3>TENDANCES TEMPS RÉEL</h3></div>
               <div class="chart-content-gtb">
                 <VueApexCharts width="100%" height="300" type="area" :options="chartOptions" :series="chartSeries" />
               </div>
            </div>
            <div class="gtb-card terminal-card-gtb">
               <div class="card-head"><h3>CONSOLE INDUSTRIELLE</h3></div>
               <div class="terminal-gtb-content" ref="terminalRef">
                 <div v-for="(log, i) in logs" :key="i" class="gtb-log-line">
                   <span class="l-time">[{{ log.time }}]</span>
                   <span class="l-msg" :class="log.type">{{ log.message }}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onUnmounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { 
  ArrowLeft, Cpu, Waves, Cloud, ArrowRight, Code, 
  Play, Square, Power, Terminal, Check, ArrowDown, Box
} from 'lucide-vue-next'

const SENSORS = [
  { id: 'vibration', name: 'Accéléromètre 3D', desc: 'Vibrations', dMin: 1.0, dMax: 5.5, dThresh: 4.5 },
  { id: 'meter', name: 'Smart Meter RS485', desc: 'Compteur KwH', dMin: 300, dMax: 3500, dThresh: 3000 },
  { id: 'pt100', name: 'Sonde PT100', desc: 'Température °C', dMin: -10, dMax: 85, dThresh: 70 },
  { id: 'weather', name: 'Station Météo', desc: 'Vent, Soleil', dMin: 0, dMax: 1000, dThresh: 800 },
  { id: 'water', name: 'Débitmètre', desc: 'Eau (m3)', dMin: 5, dMax: 20, dThresh: 18 },
  { id: 'iaq', name: 'Sonde CO2', desc: 'Qualité Air', dMin: 350, dMax: 1500, dThresh: 1000 },
  { id: 'lux', name: 'Luxmètre', desc: 'Luminosité', dMin: 0, dMax: 1000, dThresh: 900 },
  { id: 'pressure', name: 'Pressostat', desc: 'Pression Diff.', dMin: 0, dMax: 250, dThresh: 200 }
]

const BOARDS = [
  { id: 'raspberry', name: 'Raspberry Pi 4', desc: 'Passerelle Python' },
  { id: 'esp32', name: 'ESP32 NodeMCU', desc: 'Microcontrôleur C++' },
  { id: 'siemens', name: 'Siemens S7-1200', desc: 'PROFINET PLC' },
  { id: 'schneider', name: 'Modicon M241', desc: 'PLC Schneider' }
]

const CLOUDS = [
  { id: 'thingsboard', name: 'ThingsBoard', desc: 'Dashboard IoT' },
  { id: 'grafana', name: 'Grafana & InfluxDB', desc: 'TSDB Temps Réel' },
  { id: 'aws', name: 'AWS IoT Core', desc: 'Amazon Cloud' }
]

const PROTOCOLS = [
  { id: 'mqtt', name: 'MQTT (Pub/Sub)' },
  { id: 'modbus', name: 'Modbus TCP/IP' },
  { id: 'opcua', name: 'OPC-UA' },
  { id: 'bacnet', name: 'BACnet/IP (Bâtiment)' }
]

const CONNECTION_TYPES = ['Analogique (4-20mA)', 'Digital (0/1)', 'RS485 (Serial)', 'Ethernet/IP']

const currentStep = ref('arch')
const stepStatus = reactive({ arch: false, config: false, run: false })
const isRunning = ref(false)
const terminalRef = ref(null)
const logs = ref([])
let simInterval = null

const config = reactive({
  sensorBlocks: [],
  board: 'raspberry',
  platform: 'thingsboard',
  protocol: 'mqtt',
  interval: 2
})

// HELPER SELECTORS
const getSensorName = (id) => SENSORS.find(s => s.id === id)?.name || id
const getBoardName = (id) => BOARDS.find(b => b.id === id)?.name || id
const getCloudName = (id) => CLOUDS.find(c => c.id === id)?.name || id
const isArchValid = computed(() => config.sensorBlocks.length > 0 && config.board && config.platform)

// SENSOR BLOCK MANAGEMENT
const addNewSensorBlock = () => {
  const defaultSensor = SENSORS[0]
  config.sensorBlocks.push({
    id: Math.random().toString(36).substr(2, 9),
    sensorId: defaultSensor.id,
    quantity: 1,
    connectionType: CONNECTION_TYPES[0],
    min: defaultSensor.dMin,
    max: defaultSensor.dMax,
    threshold: defaultSensor.dThresh
  })
}

const removeSensorBlock = (index) => {
  config.sensorBlocks.splice(index, 1)
}

const updateBlockDefaults = (block) => {
  const sensorDef = SENSORS.find(s => s.id === block.sensorId)
  if (sensorDef) {
    block.min = sensorDef.dMin
    block.max = sensorDef.dMax
    block.threshold = sensorDef.dThresh
  }
}

// TOTAL SENSORS
const totalSensorsCount = computed(() => {
  return config.sensorBlocks.reduce((acc, block) => acc + parseInt(block.quantity), 0)
})

// EXPANDED INSTANCES FOR DASHBOARD
const sensorInstances = computed(() => {
  const instances = []
  config.sensorBlocks.forEach(block => {
    for (let i = 1; i <= block.quantity; i++) {
      instances.push({
        uid: `${block.id}-${i}`,
        sensorId: block.sensorId,
        name: getSensorName(block.sensorId),
        instanceIdx: i,
        connectionType: block.connectionType,
        min: block.min,
        max: block.max,
        threshold: block.threshold
      })
    }
  })
  return instances
})

// NAVIGATION
const proceedTo = (step) => {
  if (step === 'config') stepStatus.arch = true
  if (step === 'run') stepStatus.config = true
  window.scrollTo({ top: 0, behavior: 'instant' })
  currentStep.value = step
}

const goToStep = (step) => {
  if (step === 'config' && !isArchValid.value) return
  if (step === 'run' && !stepStatus.config) return
  window.scrollTo({ top: 0, behavior: 'instant' })
  currentStep.value = step
}

// DASHBOARD LOGIC
const lastValuesMap = reactive({})
const chartSeries = ref([])
const chartOptions = computed(() => ({
  chart: { type: 'area', toolbar: { show: false }, animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: config.interval * 1000 } } },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { type: 'datetime', range: config.interval * 1000 * 15, labels: { show: false } },
  tooltip: { theme: 'dark' }
}))

const getInstStatus = (inst) => {
  const val = lastValuesMap[inst.uid] || 0
  return val > inst.threshold ? 'error' : 'ok'
}

const getInstColor = (inst) => {
  return getInstStatus(inst) === 'error' ? '#ef4444' : '#10b981'
}

const getInstDash = (inst) => {
  const val = lastValuesMap[inst.uid] || 0
  const pct = Math.min(1, Math.max(0, (val - inst.min) / (inst.max - inst.min)))
  return `${pct * 283} 283`
}

const addLog = (message, type = 'info') => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift({ time, message, type })
  if (logs.value.length > 50) logs.value.pop()
}

const toggleSimulation = () => {
  if (isRunning.value) stopSimulation()
  else startSimulation()
}

const startSimulation = () => {
  isRunning.value = true
  logs.value = []
  
  // Initialize Chart Series
  chartSeries.value = sensorInstances.value.map(inst => ({
    name: `${inst.name} #${inst.instanceIdx}`,
    data: []
  }))

  addLog(`System booting on ${getBoardName(config.board)}...`, 'sys')
  addLog(`Establishing ${config.protocol.toUpperCase()} connection to ${getCloudName(config.platform)}`, 'sys')

  simInterval = setInterval(() => {
    const now = new Date().getTime()
    sensorInstances.value.forEach((inst, idx) => {
      const val = (Math.random() * (inst.max - inst.min) + inst.min).toFixed(2)
      lastValuesMap[inst.uid] = parseFloat(val)

      // Add to series
      if (!chartSeries.value[idx]) return
      chartSeries.value[idx].data.push({ x: now, y: parseFloat(val) })
      if (chartSeries.value[idx].data.length > 20) chartSeries.value[idx].data.shift()

      // Alert check
      if (parseFloat(val) > inst.threshold) {
        addLog(`ALERT: ${inst.name} #${inst.instanceIdx} exceeded threshold (${val} > ${inst.threshold})`, 'error')
      }
    })

    addLog(`Telemetry batch sent via ${config.protocol.toUpperCase()}`, 'data')
  }, config.interval * 1000)
}

const stopSimulation = () => {
  isRunning.value = false
  if (simInterval) clearInterval(simInterval)
  addLog("Simulation stopped.", 'sys')
}

onUnmounted(stopSimulation)

// CODE GENERATION
const codeExtension = computed(() => {
  if (config.board === 'raspberry') return 'main.py'
  if (config.board === 'esp32') return 'main.cpp'
  return 'program.scl'
})

const generatedCode = computed(() => {
  let code = `/* Emmanuel GTB Simulator Code - ${getBoardName(config.board)} */\n\n`
  
  if (config.board === 'raspberry') {
    code += `import time\nimport paho.mqtt.client as mqtt\n\n`
    code += `def read_sensors():\n  return {\n`
    sensorInstances.value.forEach(inst => {
      code += `    "${inst.name.toLowerCase()}_${inst.instanceIdx}": read_analog(${inst.instanceIdx}),\n`
    })
    code += `  }\n\n`
    code += `# Main Loop\nwhile True:\n  data = read_sensors()\n  client.publish("gtb/${config.platform}", data)\n  time.sleep(${config.interval})`
  } else {
    code += `// Generated Logic for ${config.protocol.toUpperCase()}\n`
    code += `void loop() {\n`
    sensorInstances.value.forEach(inst => {
      code += `  Serial.println("Reading pin ${inst.instanceIdx}...");\n`
    })
    code += `  delay(${config.interval * 1000});\n}`
  }
  return code
})

const copyCode = () => {
  navigator.clipboard.writeText(generatedCode.value)
  alert("Code copié !")
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@500;700&display=swap');

.gtb-simulator-container {
  min-height: 100vh;
  background: #fdfdfd;
  color: #1a1a2e;
  font-family: 'Inter', sans-serif;
}

/* NAVIGATION AUTONOME */
.gtb-nav {
  height: 80px;
  background: #fff;
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 2rem;
}

.gtb-nav-content {
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gtb-brand {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

/* LOGO TINKERCAD STYLE */
.tinker-logo {
  width: 42px;
  height: 42px;
  background: #000;
  padding: 4px;
}

.t-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  height: 100%;
}

.t-box {
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: #fff;
  font-weight: 900;
}

.t-box.active {
  background: #E31B23;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 900;
  margin: 0;
  color: #000;
  line-height: 1;
}

.brand-name sub {
  color: #E31B23;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.app-tag {
  font-size: 0.65rem;
  font-weight: 700;
  color: #999;
  letter-spacing: 1px;
}

.gtb-steps-nav {
  display: flex;
  gap: 2rem;
}

.gtb-step-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s;
}

.gtb-step-item.active {
  opacity: 1;
}

.step-idx {
  font-size: 0.7rem;
  font-weight: 900;
  color: #E31B23;
}

.step-label {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.gtb-nav-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.exit-btn {
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 900;
  color: #000;
  padding: 0.6rem 1.2rem;
  border: 2px solid #000;
  transition: all 0.2s;
}

.exit-btn:hover {
  background: #000;
  color: #fff;
}

.live-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  font-weight: 800;
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
}

.live-status.active .status-dot {
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

/* MAIN CONTENT */
.gtb-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.view-intro {
  margin-bottom: 4rem;
}

.view-intro h2 {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin-bottom: 0.5rem;
}

.view-intro p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
}

/* ARCHITECTURE WORKSPACE */
.arch-workspace {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.workspace-panel {
  background: #fff;
  border: 2px solid #f0f0f0;
  padding: 2rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f5f5f5;
  padding-bottom: 1rem;
}

.panel-header h3 {
  font-size: 0.9rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.add-sensor-btn {
  background: #000;
  color: #fff;
  border: none;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.sensor-config-card {
  background: #fcfcfc;
  border: 1px solid #eee;
  padding: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
}

.card-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.second-row { margin-bottom: 0; }

.input-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.qty-ctrl { flex: 0 0 80px; }

.input-ctrl label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #999;
  text-transform: uppercase;
}

.input-ctrl select, .input-ctrl input {
  padding: 0.6rem;
  border: 1px solid #ddd;
  font-size: 0.85rem;
  font-weight: 600;
  outline: none;
}

.remove-block-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #ccc;
  cursor: pointer;
}

.remove-block-btn:hover { color: #E31B23; }

/* VISUAL SCHEMA */
.visual-canvas {
  height: 500px;
  background: #fafafa;
  border: 1px dashed #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.schema-diagram {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.schema-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.schema-node {
  background: #fff;
  border: 2px solid #000;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 180px;
  position: relative;
}

.node-icon {
  width: 32px;
  height: 32px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node-info strong { font-size: 0.8rem; display: block; }
.node-info span { font-size: 0.65rem; color: #777; font-weight: 700; }

.node-cable {
  position: absolute;
  right: -2rem;
  height: 2px;
  width: 2rem;
  background: #000;
}

.schema-bridge {
  width: 2px;
  background: #eee;
  height: 80%;
}

.board-selector-wrap, .cloud-selector-wrap {
  margin-bottom: 2rem;
}

.board-selector-wrap label, .cloud-selector-wrap label {
  font-size: 0.6rem;
  font-weight: 900;
  display: block;
  margin-bottom: 0.5rem;
}

.board-pick, .cloud-pick {
  width: 100%;
  padding: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.view-actions-footer {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.primary-gtb-btn {
  background: #E31B23;
  color: #fff;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;
}

.primary-gtb-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.primary-gtb-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(227,27,35,0.2); }

/* CONFIG VIEW */
.config-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
}

.config-box {
  background: #fff;
  border: 2px solid #f0f0f0;
  padding: 2rem;
  margin-bottom: 2rem;
}

.config-box h3 { font-size: 0.8rem; font-weight: 900; color: #999; margin-bottom: 1.5rem; }

.points-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.cal-point {
  font-size: 0.85rem;
  font-weight: 800;
}

.cal-range {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cal-range input {
  width: 100%;
  padding: 0.4rem;
  font-size: 0.8rem;
}

.code-explorer {
  background: #111;
  color: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.explorer-header {
  background: #222;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-name { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #999; }

.code-actions button {
  background: none;
  border: 1px solid #444;
  color: #999;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}

.code-body {
  padding: 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  max-height: 600px;
  overflow-y: auto;
}

/* RUN VIEW / DASHBOARD */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.dash-meta h2 { font-size: 2rem; font-weight: 900; margin-bottom: 0.8rem; }

.dash-pills { display: flex; gap: 1rem; }
.dash-pills span {
  font-size: 0.7rem;
  font-weight: 800;
  background: #f0f0f0;
  padding: 0.4rem 0.8rem;
}

.sim-toggle-btn {
  background: #111;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
}

.sim-toggle-btn.running { background: #E31B23; }

.dashboard-layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.dash-grid-system {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.gtb-card {
  background: #fff;
  border: 2px solid #f0f0f0;
  padding: 1.5rem;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.inst-name { font-size: 0.8rem; font-weight: 900; }

.inst-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
}

.inst-status.error { background: #E31B23; animation: pulse-red 1s infinite; }

@keyframes pulse-red { 50% { opacity: 0.3; } }

.gauge-svg-prime { width: 100%; height: 160px; }
.gauge-text-val { font-size: 1.5rem; font-weight: 900; fill: #000; }

.card-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-size: 0.65rem;
  font-weight: 800;
  color: #999;
}

.dash-secondary-system {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.terminal-gtb-content {
  height: 300px;
  background: #111;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
}

.gtb-log-line { margin-bottom: 0.4rem; }
.l-time { color: #555; margin-right: 1rem; }
.l-msg.sys { color: #007acc; }
.l-msg.data { color: #aaa; }
.l-msg.error { color: #E31B23; font-weight: bold; }

@media (max-width: 1024px) {
  .gtb-steps-nav, .gtb-nav-actions { display: none; }
  .arch-workspace, .dash-secondary-system, .config-grid { grid-template-columns: 1fr; }
  .view-intro h2 { font-size: 2rem; }
}
</style>
