<template>
  <div class="platform-page">
    <header class="platform-header">
      <div class="header-left">
        <router-link to="/outils" class="header-back"><ArrowLeft size="18" /></router-link>
        <div class="platform-logo">
          <Cpu size="24" class="accent" />
          <h2>IoT & GTB <span>Studio</span></h2>
        </div>
      </div>
      <div class="header-steps">
        <div class="step" :class="{ 'active': currentStep === 'arch', 'completed': stepStatus.arch }" @click="goToStep('arch')">
          <span class="step-num">1</span>
          <span class="step-text">Architecture</span>
        </div>
        <div class="step-divider"></div>
        <div class="step" :class="{ 'active': currentStep === 'config', 'completed': stepStatus.config }" @click="goToStep('config')">
          <span class="step-num">2</span>
          <span class="step-text">Paramétrage</span>
        </div>
        <div class="step-divider"></div>
        <div class="step" :class="{ 'active': currentStep === 'run', 'completed': stepStatus.run }" @click="goToStep('run')">
          <span class="step-num">3</span>
          <span class="step-text">Supervision Dashboard</span>
        </div>
      </div>
      <div class="header-right">
        <div class="status-indicator">
          <div class="dot" :class="{ 'active': isRunning }"></div>
          {{ isRunning ? 'En Ligne' : 'Hors Ligne' }}
        </div>
      </div>
    </header>

    <div class="platform-body">
      
      <!-- STEP 1 : ARCHITECTURE -->
      <div v-show="currentStep === 'arch'" class="step-view view-arch fade-in">
        <div class="view-header">
          <h3>Conception de Matrice (Edge-to-Cloud)</h3>
          <p>Construisez l'architecture matérielle électrique et virtuelle.</p>
        </div>

        <div class="arch-builder-vertical">
          
          <!-- SENSORS (MULTI-SELECT) -->
          <div class="builder-section">
            <div class="section-top">
              <h4 class="col-title"><Waves size="20" class="accent" /> 1. Appareils Terrain & Capteurs <span class="tag-multi">(Sélection Multiple)</span></h4>
              <span class="count-badge">{{ config.sensors.length }} sélectionné(s)</span>
            </div>
            <div class="grid-cards-small">
              <div v-for="item in SENSORS" :key="item.id" 
                   class="component-small-card" 
                   :class="{ 'selected': config.sensors.includes(item.id) }" 
                   @click="toggleSensor(item.id)">
                <div class="check-circle" v-if="config.sensors.includes(item.id)"><Check size="14" /></div>
                <div class="empty-circle" v-else></div>
                <div class="comp-info-small">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="arrow-down"><ArrowDown size="24" /></div>

          <!-- BOARDS (SINGLE SELECT) -->
          <div class="builder-section">
            <h4 class="col-title"><Cpu size="20" style="color:#3b82f6" /> 2. Automates API & Microcontrôleurs (Edge)</h4>
            <div class="grid-cards-small">
              <div v-for="item in BOARDS" :key="item.id" 
                   class="component-small-card board-card" 
                   :class="{ 'selected': config.board === item.id }" 
                   @click="config.board = item.id">
                <div class="comp-info-small">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="arrow-down"><ArrowDown size="24" /></div>

          <!-- CLOUD (SINGLE SELECT) -->
          <div class="builder-section">
            <h4 class="col-title"><Cloud size="20" style="color:#10b981" /> 3. Plateformes d'Acquisition (SCADA / Cloud)</h4>
            <div class="grid-cards-small">
              <div v-for="item in CLOUDS" :key="item.id" 
                   class="component-small-card cloud-card" 
                   :class="{ 'selected': config.platform === item.id }" 
                   @click="config.platform = item.id">
                <div class="comp-info-small">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="step-footer">
          <button class="next-btn" :disabled="!isArchValid" @click="proceedTo('config')">
            Valider et Passer au Paramétrage <ArrowRight size="18" />
          </button>
        </div>
      </div>

      <!-- STEP 2 : PROGRAMMING & CONFIG -->
      <div v-show="currentStep === 'config'" class="step-view view-config fade-in">
        <div class="view-header">
          <h3>Paramétrage & Programmation Automatique</h3>
          <p>Calibrez vos instruments et configurez vos protocoles réseaux.</p>
        </div>
        
        <div class="config-layout">
          <div class="sidebar-config">
            <div class="config-block">
              <h3>Topologie & Réseau</h3>
              <div class="input-modern">
                <label>Protocole d'Échange</label>
                <select v-model="config.protocol">
                  <option v-for="p in PROTOCOLS" :key="p.id" :value="p.id">{{ p.name }}</option>
                </select>
              </div>
              <div class="input-modern">
                <label>Endpoint / IP Distante</label>
                <input type="text" v-model="config.ip" placeholder="ex: 10.0.1.55 ou iot.cloud.com" />
              </div>
              <div class="input-modern">
                <label>Fréquence de Push</label>
                <select v-model="config.interval">
                  <option value="1">1 Seconde (Temps Réel)</option>
                  <option value="2">2 Secondes</option>
                  <option value="5">5 Secondes (Standard)</option>
                </select>
              </div>
            </div>

            <div class="config-block">
              <h3>Calibration (Plage de mesure)</h3>
              <div v-if="config.sensors.length === 0" class="empty-calib">Aucun capteur sélectionné.</div>
              <div v-for="s_id in config.sensors" :key="s_id" class="calib-item">
                <label class="calib-title">{{ getSensorName(s_id) }}</label>
                <div class="calib-inputs">
                  <div class="c-input">
                    <span class="c-label">Min</span>
                    <input type="number" step="0.1" v-model="config.calib[s_id].min" />
                  </div>
                  <div class="c-input">
                    <span class="c-label">Max</span>
                    <input type="number" step="0.1" v-model="config.calib[s_id].max" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="code-workspace">
            <div class="code-header">
              <span><Code size="16" /> Code Déployé : {{ config.board }}</span>
              <span class="badge-lang">{{ codeExtension }}</span>
            </div>
            <div class="code-editor-area">
              <pre><code>{{ generatedCode }}</code></pre>
            </div>
            <div class="step-footer-alt">
              <button class="back-btn-alt" @click="goToStep('arch')">Retour Architecture</button>
              <button class="next-btn" @click="proceedTo('run')">
                Aller au Dashboard Temps Réel <ArrowRight size="18" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3 : RUN (TERMINAL & GRAPH) -->
      <div v-show="currentStep === 'run'" class="step-view view-run fade-in">
        <div class="run-header">
          <h3>Tableau de Bord / Supervision SCADA</h3>
          <button class="launch-btn" @click="startSimulation" v-if="!isRunning">
            <Power size="18" /> Initialiser la Simulation
          </button>
          <button class="stop-btn" @click="stopSimulation" v-else>
            <Square size="18" /> Arrêter la Simulation
          </button>
        </div>

        <div class="dashboard-grid">
          <div class="dash-card dash-chart">
            <div class="dash-card-header">
              <strong>Courbes Temps Réel (Multi-Capteurs)</strong>
            </div>
            <div class="chart-wrapper">
              <VueApexCharts 
                width="100%" 
                height="100%" 
                type="area" 
                :options="chartOptions" 
                :series="chartSeries" 
              />
            </div>
          </div>

          <div class="dash-card dash-info">
            <div class="dash-card-header"><strong>Matériel Déployé</strong></div>
            <div class="info-content">
              <p><span>Automate :</span> {{ selectedBoardName }}</p>
              <p><span>Protocole :</span> {{ config.protocol.toUpperCase() }} vers {{ config.ip }}</p>
              <p><span>Capteurs :</span> {{ config.sensors.length }} Actif(s)</p>
            </div>
            <hr>
            <div class="dash-card-header"><strong>Dernières Valeurs</strong></div>
            <div class="live-values">
              <div v-for="(val, key) in lastValuesMap" :key="key" class="live-val-box">
                <span class="l-key">{{ key }}</span>
                <span class="l-val">{{ val }}</span>
              </div>
            </div>
          </div>

          <div class="dash-card dash-terminal">
            <div class="terminal-header">
              <span><Terminal size="16" /> Sniffer Réseau</span>
              <div class="window-actions">
                <div class="window-dot red"></div>
                <div class="window-dot yellow"></div>
                <div class="window-dot green"></div>
              </div>
            </div>
            <div class="terminal-body" ref="terminalRef">
              <div v-if="logs.length === 0" class="terminal-placeholder">En attente de connexion...</div>
              <div v-for="(log, i) in logs" :key="i" class="log-line">
                <span class="log-time">[{{ log.time }}]</span>
                <span class="log-payload" :class="log.type">{{ log.message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-padding"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { ArrowLeft, Cpu, Waves, Cloud, ArrowRight, Code, Play, Square, Power, Terminal, Check, ArrowDown } from 'lucide-vue-next'

const SENSORS = [
  { id: 'vibration', name: 'Accéléromètre 3D', desc: 'Vibrations', dMin: 1.0, dMax: 5.5 },
  { id: 'meter', name: 'Smart Meter RS485', desc: 'Compteur KwH', dMin: 300, dMax: 3500 },
  { id: 'pt100', name: 'Sonde PT100', desc: 'Température °C', dMin: -10, dMax: 85 },
  { id: 'weather', name: 'Station Météo', desc: 'Vent, Soleil', dMin: 0, dMax: 1000 },
  { id: 'water', name: 'Débitmètre', desc: 'Eau (m3)', dMin: 5, dMax: 20 },
  { id: 'iaq', name: 'Sonde CO2', desc: 'Qualité d\'Air', dMin: 350, dMax: 1500 },
  { id: 'lux', name: 'Luxmètre', desc: 'Luminosité', dMin: 0, dMax: 1000 },
  { id: 'pressure', name: 'Pressostat', desc: 'Pression Diff.', dMin: 0, dMax: 250 },
  { id: 'pir', name: 'Présence PIR', desc: 'Mouvement', dMin: 0, dMax: 1 },
  { id: 'rogowski', name: 'Pince Rogowski', desc: 'Ampères', dMin: 0, dMax: 100 },
  { id: 'ultrasonic', name: 'Sonde Ultrasons', desc: 'Niveau Cuve (%)', dMin: 0, dMax: 100 },
  { id: 'ph', name: 'Sonde pH/ORP', desc: 'Qualité Eau', dMin: 6.5, dMax: 8.5 },
  { id: 'humidity', name: 'Hygrométrie', desc: 'Humidité Rel. %', dMin: 20, dMax: 90 },
  { id: 'siren', name: 'Sirène Industrielle', desc: 'Actionneur Alarme', dMin: 0, dMax: 1 },
  { id: 'harmonique', name: 'Analyseur Réseau', desc: 'THD %', dMin: 0, dMax: 15 },
  { id: 'incline', name: 'Inclinomètre', desc: 'Structure Tilt', dMin: -10, dMax: 10 }
]

const BOARDS = [
  { id: 'raspberry', name: 'Raspberry Pi 4', desc: 'Passerelle Python' },
  { id: 'esp32', name: 'ESP32 NodeMCU', desc: 'Microcontrôleur C++' },
  { id: 'siemens', name: 'Siemens S7-1200', desc: 'PROFINET PLC' },
  { id: 'wago', name: 'Wago PFC200', desc: 'CODESYS V3' },
  { id: 'lora', name: 'Node STM32 LoRa', desc: 'Low-Power LPWAN' },
  { id: 'arduino', name: 'Arduino Mega 2560', desc: 'Classique C++' },
  { id: 'jetson', name: 'NVIDIA Jetson Nano', desc: 'Edge AI inference' },
  { id: 'schneider', name: 'Modicon M241', desc: 'PLC Schneider' },
  { id: 'ab', name: 'Allen-Bradley', desc: 'CompactLogix PLC' },
  { id: 'beckhoff', name: 'Beckhoff CX', desc: 'TwinCAT 3 EtherCAT' },
  { id: 'saia', name: 'SAIA Burgess PCD', desc: 'PLC CVC GTB' },
  { id: 'distech', name: 'Distech ECL', desc: 'Contrôleur BACnet' },
  { id: 'omron', name: 'Omron NJ/NX', desc: 'EtherNet/IP MAC' },
  { id: 'revpi', name: 'RevPi Core', desc: 'Indus. Linux IPC' }
]

const CLOUDS = [
  { id: 'thingsboard', name: 'ThingsBoard', desc: 'Dashboard IoT' },
  { id: 'grafana', name: 'Grafana & InfluxDB', desc: 'TSDB Temps Réel' },
  { id: 'aws', name: 'AWS IoT Core', desc: 'Amazon Cloud' },
  { id: 'ignition', name: 'Ignition (Inductive)', desc: 'SCADA Web' },
  { id: 'kepware', name: 'Kepware OPC.Server', desc: 'Global OPC-UA' },
  { id: 'azure', name: 'Azure IoT Hub', desc: 'Microsoft Cloud' },
  { id: 'gcp', name: 'Google Cloud IoT', desc: 'GCP Pipeline' },
  { id: 'elk', name: 'Splunk / ELK', desc: 'Logs Industriels' },
  { id: 'datadog', name: 'Datadog', desc: 'Monitoring DevOps' },
  { id: 'thingworx', name: 'PTC ThingWorx', desc: 'IIoT Enterprise' },
  { id: 'wonderware', name: 'AVEVA System Platform', desc: 'Wonderware' },
  { id: 'pcvue', name: 'PCVue Solutions', desc: 'Supervision GTB' },
  { id: 'wincc', name: 'WinCC Unified', desc: 'SCADA Siemens' }
]

const PROTOCOLS = [
  { id: 'mqtt', name: 'MQTT (Pub/Sub)' },
  { id: 'kafka', name: 'Apache Kafka' },
  { id: 'modbus', name: 'Modbus TCP/IP' },
  { id: 'opcua', name: 'OPC-UA' },
  { id: 'http', name: 'HTTP REST API (POST)' },
  { id: 'lorawan', name: 'LoRaWAN Payload' },
  { id: 'bacnet', name: 'BACnet/IP (Bâtiment)' },
  { id: 'profinet', name: 'ProfiNet / EtherNet/IP' }
]

const currentStep = ref('arch')
const stepStatus = reactive({ arch: false, config: false, run: false })
const isRunning = ref(false)
const terminalRef = ref(null)
const logs = ref([])
let simInterval = null

const config = reactive({
  sensors: [],
  calib: {}, 
  board: '',
  platform: '',
  protocol: 'mqtt',
  ip: 'scada.local.network',
  interval: '2',
  security: 'tls'
})

const isArchValid = computed(() => config.sensors.length > 0 && config.board !== '' && config.platform !== '')
const getSensorName = (id) => SENSORS.find(s => s.id === id)?.name || id
const selectedSensorsNames = computed(() => config.sensors.map(id => getSensorName(id)).join(', '))
const selectedBoardName = computed(() => BOARDS.find(b => b.id === config.board)?.name || '')

const toggleSensor = (id) => {
  if (config.sensors.includes(id)) {
    config.sensors = config.sensors.filter(s => s !== id)
    delete config.calib[id]
  } else {
    config.sensors.push(id)
    const def = SENSORS.find(s => s.id === id)
    config.calib[id] = { min: def.dMin, max: def.dMax }
  }
}

const proceedTo = (step) => {
  if (step === 'config') stepStatus.arch = true
  if (step === 'run') stepStatus.config = true
  
  window.scrollTo({ top: 0, behavior: 'instant' })
  currentStep.value = step
}

const goToStep = (step) => {
  if (step === 'config' && !isArchValid.value) return;
  if (step === 'run' && !stepStatus.config) return;
  window.scrollTo({ top: 0, behavior: 'instant' })
  currentStep.value = step
}

// ------ APEX CHARTS SETUP ------ //
const chartSeries = ref([])
const lastValuesMap = reactive({})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: parseInt(config.interval)*1000 } },
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent'
    },
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    xaxis: { type: 'datetime', range: parseInt(config.interval)*1000 * 15, labels: { show: false } },
    legend: { position: 'top', horizontalAlign: 'left' },
    tooltip: { x: { format: 'HH:mm:ss' } },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 }
  }
})


// ------ SMART CODE GENERATION ------ //
const codeExtension = computed(() => {
  const b = config.board
  if (['esp32', 'arduino', 'lora'].includes(b)) return 'main.cpp (C/C++)'
  if (['raspberry', 'jetson', 'revpi'].includes(b)) return 'app.py (Python3)'
  return 'Main.scl (IEC 61131-3 PLC)'
})

const generatedCode = computed(() => {
  const b = config.board || 'raspberry'
  const p = config.protocol
  const ip = config.ip || '127.0.0.1'
  const sel = config.sensors

  const getPythonMultiPayload = () => {
    let fields = []
    sel.forEach(s => {
      let min = config.calib[s]?.min || 0
      let max = config.calib[s]?.max || 100
      let k = s === 'pt100' ? 'temp' : (s === 'weather' ? 'solar' : s)
      fields.push(`"${k}": round(random.uniform(${min}, ${max}), 2)`)
    })
    return '{ ' + fields.join(', ') + ' }'
  }

  const getCppMultiPayload = () => {
    let vars = ""
    vars += '  String payload = "{";\n'
    sel.forEach((s, idx) => {
      let min = config.calib[s]?.min || 0
      let max = config.calib[s]?.max || 100
      let vname = 'val' + idx
      vars += `  float ${vname} = random(${min*10}, ${max*10}) / 10.0;\n`
      let keyName = s === 'pt100' ? 'temp' : (s === 'weather' ? 'solar' : s)
      let suffix = (idx < sel.length - 1) ? ' + ", ";' : ';'
      vars += '  payload += "\\"' + keyName + '\\":" + String(' + vname + ')' + suffix + '\n'
    })
    vars += '  payload += "}";\n'
    return vars
  }

  if (['raspberry', 'jetson', 'revpi'].includes(b)) {
    let c = 'import' + ' time, json, random\n'
    if (p === 'mqtt') {
      c += 'import' + ' paho.mqtt.client as mqtt\n\nBROKER = "' + ip + '"\nclient = mqtt.Client("EdgeNode")\nclient.connect(BROKER, 1883)\n'
    } else {
      c += 'import' + ' requests\n'
    }

    c += '\n\ndef read_sensors():\n    return ' + getPythonMultiPayload() + '\n\nwhile True:\n    data = read_sensors()\n'
    c += '    print("PUSH -> " + str(data))\n    time.sleep(' + config.interval + ')\n'
    return c
  }
  
  if (['esp32', 'arduino', 'lora'].includes(b)) {
    let c = '#include <Arduino.h>\n'
    if(b==='esp32') c += '#include <WiFi.h>\n#include <PubSubClient.h>\n'
    
    c += '\nvoid setup() {\n  Serial.begin(115200);\n}\n\nvoid loop() {\n'
    c += getCppMultiPayload() + "\n"
    c += '  // Send Payload...\n  delay(' + config.interval + '000);\n}\n'
    return c
  }
  
  // PLC SCL logic
  let scl = '// Structured Text (IEC 61131-3) / SCL Logic\n// Automate: ' + b.toUpperCase() + '\n\nPROGRAM Main_Routine\nVAR\n'
  scl += '  SensorValues : ARRAY[0..' + (sel.length-1) + '] OF REAL;\n  CommFault : BOOL;\nEND_VAR\n\nBEGIN\n'
  scl += '  // Polling inputs corresponding to multiselection\n'
  sel.forEach((s, i) => {
    let min = config.calib[s]?.min || 0
    let max = config.calib[s]?.max || 100
    scl += '  SensorValues[' + i + '] := SCALE_R(RAW:=IW' + (100+i*2) + ', MIN:=' + min + '.0, MAX:=' + max + '.0); // ' + s + '\n'
  })
  scl += '  \n  CALL MQTT_DRIVER_FB( ENABLE := TRUE );\nEND_PROGRAM'
  return scl
})

// ------ TERMINAL & SIMULATION ------ //
const addLog = (message, type = 'info') => {
  const now = new Date()
  const time = now.toISOString().split('T')[1].slice(0, 8)
  logs.value.push({ time, message, type })
  if (logs.value.length > 50) logs.value.shift()
  nextTick(() => { if (terminalRef.value) terminalRef.value.scrollTop = terminalRef.value.scrollHeight })
}

const startSimulation = () => {
  isRunning.value = true
  logs.value = []
  
  // Init graphs arrays
  let newSeries = []
  config.sensors.forEach(s => {
    newSeries.push({ name: getSensorName(s), data: [] })
  })
  chartSeries.value = newSeries

  const bLayer = (!['esp32','arduino','lora','raspberry','jetson','revpi'].includes(config.board)) ? 'PLC RUN MODE ACTIVATED' : 'OS Kernel boot procedure'
  addLog(`[SYSTEM] Initialisation : ${bLayer}`, 'sys')
  addLog(`[SYSTEM] Calibration loaded for ${config.sensors.length} sensor(s)... OK`, 'sys')
  addLog(`[RESEAU] Session IPC ouverte vers ${config.ip}...`, 'sys')
  
  simInterval = setInterval(() => {
    let payloadObj = {}
    let now = new Date().getTime()
    let currentSeries = [...chartSeries.value]
    
    config.sensors.forEach((s, idx) => {
      let min = parseFloat(config.calib[s]?.min || 0)
      let max = parseFloat(config.calib[s]?.max || 100)
      let val = Math.random() * (max - min) + min
      let floatVal = parseFloat(val.toFixed(2))
      
      let targetKey = s === 'pt100' ? 'temp' : (s === 'weather' ? 'solar' : s)
      payloadObj[targetKey] = floatVal
      lastValuesMap[getSensorName(s)] = floatVal

      // Array update for Chart
      if(!currentSeries[idx].data) currentSeries[idx].data = []
      currentSeries[idx].data.push([now, floatVal])
      if (currentSeries[idx].data.length > 20) currentSeries[idx].data.shift()
    })

    chartSeries.value = currentSeries

    let payload = JSON.stringify(payloadObj)
    if (config.protocol === 'modbus') {
      addLog(`>> BUS_REGS_UPDATE : ${Object.values(payloadObj).join('|')}`, 'data')
    } else {
      addLog(`MQTT >> ${payload}`, 'data')
    }

  }, parseInt(config.interval) * 1000)
}

const stopSimulation = () => {
  isRunning.value = false
  clearInterval(simInterval)
  addLog(`[SYSTEM] Arrêt d'urgence de la simulation.`, 'error')
}

watch(config, () => { if (isRunning.value) stopSimulation() }, { deep: true })
</script>

<style scoped>
.platform-page { display: flex; flex-direction: column; min-height: 100vh; width: 100%; background: #f8fafc; }

/* HEADER */
.platform-header { height: 70px; background: var(--white); border-bottom: 2px solid var(--gray-200); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; z-index: 100; position: sticky; top: 0;}
.header-left { display: flex; align-items: center; gap: 1.5rem; }
.header-back { color: var(--gray-500); transition: color 0.3s; }
.header-back:hover { color: var(--black); }
.platform-logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 900; font-size: 1.25rem; letter-spacing: -0.5px; }
.platform-logo span { color: var(--gray-400); font-weight: 700; }
.header-steps { display: flex; align-items: center; gap: 1rem; }
.step { display: flex; align-items: center; gap: 0.5rem; color: var(--gray-400); font-weight: 700; font-size: 0.9rem; cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s; }
.step:hover { background: var(--gray-50); color: var(--black); }
.step-num { width: 24px; height: 24px; background: var(--gray-200); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; }
.step.active { color: var(--accent); }
.step.active .step-num { background: var(--accent); color: var(--white); }
.step-divider { width: 40px; height: 2px; background: var(--gray-200); }
.status-indicator { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.8rem; padding: 0.5rem 1rem; background: var(--gray-50); border-radius: 20px; color: var(--gray-600); }
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gray-400); }
.dot.active { background: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.5); }

.platform-body { background: #f8fafc; }

.step-view { padding: 3rem 2rem; max-width: 1300px; margin: 0 auto; }
.view-header { text-align: center; margin-bottom: 3rem; }
.view-header h3 { font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 0.5rem;}
.view-header p { color: var(--gray-500); font-size: 1.1rem; }

.fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* BUILDER BLOCKS */
.arch-builder-vertical { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.builder-section { width: 100%; background: var(--white); border: 1px solid var(--gray-200); border-radius: 16px; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
.section-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;}
.col-title { display: flex; align-items: center; gap: 0.8rem; font-size: 1.3rem; font-weight: 800; color: var(--black); margin-bottom: 2rem;}
.tag-multi { font-size: 0.8rem; font-weight: 700; color: var(--gray-400); background: var(--gray-50); padding: 0.3rem 0.8rem; border-radius: 20px;}
.count-badge { font-size: 0.85rem; font-weight: 800; color: var(--accent); background: rgba(227,27,35,0.1); padding: 0.4rem 1rem; border-radius: 20px; }
.grid-cards-small { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
.component-small-card { background: var(--white); border: 2px solid var(--gray-200); border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; position: relative;}
.component-small-card:hover { border-color: var(--gray-400); transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.05); }
.check-circle { color: var(--white); background: var(--accent); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;}
.empty-circle { border: 2px solid var(--gray-300); width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;}
.component-small-card.selected { border-color: var(--accent); background: #fffafa; box-shadow: 0 5px 15px rgba(227,27,35,0.05); }
.board-card.selected { border-color: #3b82f6; background: #eff6ff; }
.cloud-card.selected { border-color: #10b981; background: #f0fdf4; }
.comp-info-small { display: flex; flex-direction: column; gap: 0.3rem; }
.comp-info-small strong { font-size: 0.9rem; font-weight: 800; color: var(--black); line-height: 1.2;}
.comp-info-small span { font-size: 0.75rem; color: var(--gray-500); line-height: 1.2;}
.arrow-down { color: var(--gray-300); margin: 0.5rem 0;}

/* BUTTONS */
.step-footer { margin-top: 3rem; display: flex; justify-content: center; }
.next-btn { display: flex; align-items: center; gap: 0.8rem; background: var(--black); color: var(--white); padding: 1rem 3rem; border: none; border-radius: 50px; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: all 0.3s;}
.next-btn:hover:not(:disabled) { background: var(--accent); box-shadow: 0 10px 20px rgba(227,27,35,0.2); }
.next-btn:disabled { background: var(--gray-300); cursor: not-allowed; }

/* CONFIG VIEW */
.config-layout { display: grid; grid-template-columns: 350px 1fr; gap: 2rem; }
.sidebar-config { background: var(--white); border-radius: 12px; border: 1px solid var(--gray-200); padding: 2rem; display: flex; flex-direction: column; gap: 2rem;}
.config-block h3 { font-size: 1rem; font-weight: 900; margin-bottom: 1.5rem; text-transform: uppercase; color: var(--gray-500); }
.input-modern { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.input-modern label { font-size: 0.85rem; font-weight: 700; color: var(--black); }
.input-modern select, .input-modern input { padding: 0.8rem; background: #f8fafc; border: 1px solid var(--gray-200); border-radius: 8px; font-weight: 600; outline: none; }
.calib-item { margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border: 1px solid var(--gray-200);}
.calib-title { font-weight: 800; font-size: 0.85rem; display: block; margin-bottom: 0.8rem; color: var(--accent);}
.calib-inputs { display: flex; gap: 1rem; }
.c-input { display: flex; flex-direction: column; gap: 0.3rem; flex: 1;}
.c-label { font-size: 0.7rem; font-weight: 800; color: var(--gray-400);}
.c-input input { padding: 0.5rem; border: 1px solid var(--gray-200); border-radius: 6px; font-weight: 600;}

.code-workspace { background: #1e1e1e; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
.code-header { height: 50px; background: #252526; display: flex; align-items: center; padding: 0 1.5rem; color: #eee; font-family: monospace; font-size: 0.9rem; justify-content: space-between; border-bottom: 1px solid #000; }
.badge-lang { background: #007acc; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
.code-editor-area { flex-grow: 1; padding: 2rem; overflow-y: auto; color: #d4d4d4; font-family: 'Courier New', Courier, monospace; height: 500px;}
.step-footer-alt { height: 80px; background: var(--white); border-top: 1px solid var(--gray-200); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem;}
.back-btn-alt { background: transparent; border: 1px solid var(--gray-300); font-weight: 800; color: var(--gray-600); border-radius: 8px; padding: 0.8rem 1.5rem; cursor: pointer;}
.back-btn-alt:hover { background: var(--gray-100); }

/* DASHBOARD (NEW) */
.run-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;}
.run-header h3 { font-size: 2rem; font-weight: 900;}
.launch-btn { display: flex; align-items: center; gap: 0.5rem; background: #10b981; color: var(--white); border: none; padding: 1rem 2rem; border-radius: 8px; font-weight: 900; font-size: 1rem; cursor: pointer; }
.stop-btn { display: flex; align-items: center; gap: 0.5rem; background: #ef4444; color: var(--white); border: none; padding: 1rem 2rem; border-radius: 8px; font-weight: 900; font-size: 1rem; cursor: pointer; }

.dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: auto auto; gap: 2rem; }
.dash-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.02);}
.dash-card-header { padding: 1rem 1.5rem; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); font-size: 0.9rem; color: var(--gray-600); }

.dash-chart { grid-column: 1 / 2; grid-row: 1 / 2; height: 350px;}
.chart-wrapper { padding: 1rem; flex-grow: 1; }

.dash-info { grid-column: 2 / 3; grid-row: 1 / 3; }
.info-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;}
.info-content p { font-size: 0.95rem; font-weight: 800;}
.info-content span { color: var(--gray-400); display: block; font-size: 0.8rem; font-weight: normal; margin-bottom: 0.2rem;}
.dash-info hr { border: none; border-top: 1px solid var(--gray-200); margin: 0;}
.live-values { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;}
.live-val-box { background: var(--gray-50); padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;}
.l-key { font-weight: 700; color: var(--gray-500); font-size: 0.85rem;}
.l-val { font-weight: 900; font-size: 1.2rem; color: var(--black); font-family: monospace;}

.dash-terminal { grid-column: 1 / 2; grid-row: 2 / 3; height: 300px; background: #0f172a;}
.terminal-header { height: 40px; background: #1e293b; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; color: #94a3b8; font-size: 0.8rem; font-family: monospace;}
.window-actions { display: flex; gap: 0.5rem; }
.window-dot { width: 10px; height: 10px; border-radius: 50%; }
.window-dot.red { background: #ef4444; }
.window-dot.yellow { background: #f59e0b; }
.window-dot.green { background: #10b981; }
.terminal-body { flex-grow: 1; padding: 1rem; overflow-y: auto; font-family: 'Consolas', monospace; font-size: 0.9rem; color: #f8fafc; }
.log-line { margin-bottom: 0.4rem; }
.log-time { color: #64748b; margin-right: 0.8rem; }
.log-payload.sys { color: #e2e8f0; font-weight: bold; }
.log-payload.data { color: #facc15; }

.bottom-padding { height: 100px; }

@media (max-width: 1024px) {
  .header-steps { display: none; }
  .config-layout { grid-template-columns: 1fr; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .dash-chart, .dash-info, .dash-terminal { grid-column: 1 / 2; }
  .dash-info { grid-row: auto; }
}
</style>
