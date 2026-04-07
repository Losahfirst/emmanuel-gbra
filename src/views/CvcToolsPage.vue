<template>
  <div class="cvc-page">
    <div class="sidebar">
      <div class="sidebar-header">
        <router-link to="/outils" class="back-btn"><ArrowLeft size="18" /> Retour</router-link>
        <h2>Outils <span class="accent">CVC</span></h2>
      </div>

      <div class="tabs-control">
        <button :class="{ active: activeTab === 'psycho' }" @click="activeTab = 'psycho'">
          <Cloud size="16" /> Qualité d'Air
        </button>
        <button :class="{ active: activeTab === 'conv' }" @click="activeTab = 'conv'">
          <RefreshCw size="16" /> Conversion
        </button>
        <button :class="{ active: activeTab === 'charge' }" @click="activeTab = 'charge'">
          <Droplet size="16" /> Charge Fluide
        </button>
      </div>

      <!-- Psycho Tab form -->
      <div v-show="activeTab === 'psycho'" class="form-section">
        <h3>Analyse Psychrométrique</h3>
        <p class="desc">Entrez les paramètres globaux pour tracer le point sur le diagramme de l'air humide.</p>
        
        <div class="input-group">
          <label>Altitude (m)</label>
          <input type="number" v-model="altitude" step="10" />
        </div>
        <div class="input-group">
          <label>Température Sèche (°C)</label>
          <input type="number" v-model="dryBulb" step="0.1" />
        </div>
        <div class="input-group">
          <select v-model="inputType2" class="custom-select">
            <option value="rh">Humidité Relative (%)</option>
            <option value="tdp">Temp. de Rosée (°C)</option>
            <option value="twb">Temp. Humide (°C)</option>
          </select>
          <input type="number" v-model="inputValue2" step="0.1" />
        </div>
      </div>

      <!-- Conversion Tab form -->
      <div v-show="activeTab === 'conv'" class="form-section">
        <h3>Conversion de Puissance</h3>
        <p class="desc">Conversion rapide entre BTU/h et kW.</p>
        
        <div class="input-group">
          <label>Puissance en BTU/h</label>
          <input type="number" v-model="btuVal" @input="convertFromBtu" />
        </div>
        <div class="swap-icon">
          <ArrowDownUp size="20" />
        </div>
        <div class="input-group">
          <label>Puissance en kW</label>
          <input type="number" v-model="kwVal" @input="convertFromKw" step="0.1" />
        </div>
      </div>

      <!-- Refrigerant Charge form -->
      <div v-show="activeTab === 'charge'" class="form-section">
        <h3>Estimateur de Charge (Split)</h3>
        <p class="desc">Estimez la quantité de fluide frigorigène à ajouter ou retirer.</p>
        
        <div class="input-group">
          <label>Capacité (BTU/h)</label>
          <select v-model="splitCapacity">
            <option value="9000">9 000 BTU/h (1 CV)</option>
            <option value="12000">12 000 BTU/h (1.5 CV)</option>
            <option value="18000">18 000 BTU/h (2 CV)</option>
            <option value="24000">24 000 BTU/h (3 CV)</option>
          </select>
        </div>
        <div class="input-group">
          <label>Courant Nominal (A)</label>
          <input type="number" v-model="nomCurrent" step="0.1" />
        </div>
        <div class="input-group">
          <label>Courant Mesuré (A)</label>
          <input type="number" v-model="measCurrent" step="0.1" />
        </div>
      </div>
    </div>

    <div class="main-content">
      <!-- Dashboard views depending on tab -->
      <div v-if="activeTab === 'psycho'" class="dashboard">
        <div class="dash-header">
          <h3>Résultats Psychrométriques</h3>
        </div>

        <div class="chart-container" style="margin-bottom: 2rem; position: relative;">
          <div class="enthalpy-oval-label">Enthalpie kJ/kg</div>
          <apexchart type="line" height="400" :options="psychoChartOptions" :series="psychoChartSeries"></apexchart>
        </div>

        <div class="results-grid">
          <div class="result-card">
            <span class="label">Humidité Relative</span>
            <strong class="value">{{ rhValue.toFixed(1) }} %</strong>
          </div>
          <div class="result-card">
            <span class="label">Température de Rosée</span>
            <strong class="value">{{ dpValue.toFixed(1) }} °C</strong>
          </div>
          <div class="result-card">
            <span class="label">Température Humide</span>
            <strong class="value">{{ wbValue.toFixed(1) }} °C</strong>
          </div>
          <div class="result-card">
            <span class="label">Pression Vapeur (Pa)</span>
            <strong class="value">{{ (actualPw * 1000).toFixed(0) }} Pa</strong>
          </div>
          <div class="result-card">
            <span class="label">Humidité Absolue</span>
            <strong class="value">{{ currentW.toFixed(2) }} g/kg</strong>
          </div>
          <div class="result-card">
            <span class="label">Enthalpie</span>
            <strong class="value">{{ enthalpy.toFixed(2) }} kJ/kg</strong>
          </div>
          <div class="result-card">
            <span class="label">Vol. Massique</span>
            <strong class="value">{{ specVol.toFixed(3) }} m³/kg</strong>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'conv'" class="dashboard conv-dash">
        <div class="conv-result">
          <Activity size="48" class="conv-icon" />
          <h2>{{ btuVal || 0 }} BTU/h</h2>
          <span class="equals">=</span>
          <h2>{{ kwVal || 0 }} kW</h2>
          <p class="conv-details">Facteur de conversion : 1 kW ≈ 3412.14 BTU/h</p>
        </div>
      </div>

      <div v-if="activeTab === 'charge'" class="dashboard charge-dash">
        <div class="charge-result">
          <h3>Diagnostic de Charge</h3>
          <div class="charge-status" :class="chargeDecision.status">
            {{ chargeDecision.text }}
          </div>
          <p class="charge-amount" v-if="chargeDecision.amount > 0">
            Recommandation : <strong>{{ chargeDecision.action }} {{ chargeDecision.amount }} kg</strong> de fluide frigorigène.
          </p>
          <p class="charge-info">
            <em>Base de calcul estimative. Base nominale du sytème: {{ baseCharge.toFixed(2) }} kg. L'ajustement réel doit se faire à l'aide d'un manomètre et d'une balance.</em>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Cloud, RefreshCw, Droplet, ArrowDownUp, Activity } from 'lucide-vue-next'

const activeTab = ref('psycho')

// --- Psychrometric State ---
const altitude = ref(0)
const dryBulb = ref(25)
const inputType2 = ref('rh')
const inputValue2 = ref(50)

// Atmospheric pressure in kPa based on altitude
const patm = computed(() => {
  return 101.325 * Math.pow(1 - 2.25577e-5 * altitude.value, 5.25588)
})

// Saturation vapor pressure (Tetens equation)
const Pws = (t) => {
  return 0.61078 * Math.exp((17.27 * t) / (t + 237.3))
}

const actualPw = computed(() => {
  const param = parseFloat(inputValue2.value) || 0
  if (inputType2.value === 'rh') {
    return Pws(dryBulb.value) * (param / 100)
  } else if (inputType2.value === 'tdp') {
    return Pws(param)
  } else if (inputType2.value === 'twb') {
    // Carrier equation for Pw from Twb
    return Pws(param) - 0.00066 * patm.value * (dryBulb.value - param)
  }
  return 0
})

const rhValue = computed(() => {
  const rh = (actualPw.value / Pws(dryBulb.value)) * 100
  return Math.max(0, Math.min(100, rh))
})

const dpValue = computed(() => {
  if (actualPw.value <= 0) return 0
  const alpha = Math.log(actualPw.value / 0.61078)
  return (237.3 * alpha) / (17.27 - alpha)
})

const wbValue = computed(() => {
  if (inputType2.value === 'twb') return parseFloat(inputValue2.value)
  // Approximate Twb using Stull's equation
  const t = dryBulb.value
  const h = rhValue.value
  return t * Math.atan(0.151977 * Math.pow(h + 8.313659, 0.5)) 
         + Math.atan(t + h) - Math.atan(h - 1.676331) 
         + 0.00391838 * Math.pow(h, 1.5) * Math.atan(0.023101 * h) - 4.686035
})

const currentW = computed(() => {
  const w = (0.62198 * actualPw.value) / (Math.max(0.001, patm.value - actualPw.value))
  return w * 1000
})

const specVol = computed(() => {
  return 0.287042 * (dryBulb.value + 273.15) / (patm.value - actualPw.value)
})

const enthalpy = computed(() => {
  const w = currentW.value / 1000
  return 1.006 * dryBulb.value + w * (2501 + 1.84 * dryBulb.value)
})

const comfortStatus = computed(() => {
  const rh = rhValue.value
  if (dryBulb.value >= 20 && dryBulb.value <= 26 && rh >= 30 && rh <= 60) {
    return 'Optimal 🟢'
  } else if (rh > 60) {
    return 'Lourd / Humide 🟡'
  } else if(rh < 30) {
    return 'Trop Sec 🟡'
  } else {
    return 'Inconfortable 🔴'
  }
})

// Humidity ratio W (kg/kg) for chart drawing
const calcW = (t, r, p) => {
  const pw = Pws(t) * (r / 100)
  return (0.62198 * pw) / (Math.max(0.001, p - pw))
}

// Psychrometric Chart Series
const psychoChartSeries = computed(() => {
  const p = patm.value || 101.325
  const seriesArray = []
  
  // 1. RH Curves: 20, 40, 60, 80, 100
  for (let rh of [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
    const data = []
    for(let t=-10; t<=50; t+=1) { 
      const w = calcW(t, rh, p) * 1000
      if(w <= 40) data.push({ x: t, y: parseFloat(w.toFixed(2)) })
    }
    seriesArray.push({
      name: rh === 100 ? 'Saturation' : `RH ${rh}%`,
      type: 'line',
      data: data,
      color: rh === 100 ? '#10b981' : '#d1d5db', // Green for saturation
      isSaturation: rh === 100
    })
  }

  // 2. Enthalpy lines: (kJ/kg)
  for (let h of [10, 20, 30, 40, 50, 60, 70, 80, 100]) {
    const data = []
    for(let t = -10; t <= 50; t += 2) {
      const maxW = calcW(t, 100, p) * 1000
      let w = ((h - 1.006 * t) / (2501 + 1.84 * t)) * 1000
      if (w >= 0 && w <= maxW * 1.05 && w <= 40) {
        data.push({ x: t, y: parseFloat(w.toFixed(2)) })
      }
    }
    if (data.length > 0) {
      seriesArray.push({
        name: `h = ${h} kJ/kg`,
        type: 'line',
        data: data,
        color: '#1f2937', // Black diagonal lines
        isEnthalpy: true
      })
    }
  }

  // 3. Specific Volume lines (m3/kg)
  for (let v of [0.75, 0.80, 0.85, 0.90, 0.95]) {
    const data = []
    for(let t = -10; t <= 50; t += 2) {
      const pw = p - (0.287042 * (t + 273.15) / v)
      if (pw > 0) {
        const w = (0.62198 * pw) / (p - pw) * 1000
        const maxW = calcW(t, 100, p) * 1000
        if (w >= 0 && w <= maxW * 1.05 && w <= 40) {
          data.push({ x: t, y: parseFloat(w.toFixed(2)) })
        }
      }
    }
    if (data.length > 0) {
      seriesArray.push({
        name: `v = ${v} m³/kg`,
        type: 'line',
        data: data,
        color: '#ef4444', // Red lines
        isVolume: true
      })
    }
  }

  // 4. Current Point
  seriesArray.push({ 
    name: 'Air Actuel', 
    type: 'scatter', 
    data: [{ x: dryBulb.value, y: parseFloat(currentW.value.toFixed(2)) }],
    color: '#e31b23' // Red dot
  })

  return seriesArray
})

// Psychrometric Chart Options
const psychoChartOptions = computed(() => {
  const series = psychoChartSeries.value

  return {
    chart: { 
      type: 'line', 
      animations: { enabled: false },
      toolbar: { show: true },
      zoom: { enabled: true }
    },
    colors: series.map(s => s.color),
    stroke: {
      width: series.map(s => s.type === 'scatter' ? 0 : (s.isSaturation ? 3 : 1)),
      curve: 'straight',
      dashArray: series.map(s => s.isEnthalpy ? 3 : (s.isVolume ? 5 : 0))
    },
    markers: {
      size: series.map(s => s.type === 'scatter' ? 8 : 0),
      colors: ['#e31b23'],
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    xaxis: { 
      title: { text: "Température Sèche (°C)", style: { fontWeight: 800 } },
      min: -10, max: 50, tickAmount: 12,
      labels: { formatter: (val) => val.toFixed(0) }
    },
    yaxis: {
      opposite: true,
      title: { text: "Humidité Absolue (g/kg d'air sec)", style: { fontWeight: 800 } },
      min: 0, max: 35, tickAmount: 7,
      forceNiceScale: false
    },
    legend: { show: false }, 
    tooltip: {
      shared: false,
      intersect: true,
      y: { formatter: (val) => val.toFixed(2) + " g/kg" }
    }
  }
})

// --- Conversion State ---
const btuVal = ref(12000)
const kwVal = ref(3.51)

const convertFromBtu = () => {
  kwVal.value = parseFloat((btuVal.value / 3412.14).toFixed(2))
}
const convertFromKw = () => {
  btuVal.value = Math.round(kwVal.value * 3412.14)
}

// --- Charge Estimator State ---
const splitCapacity = ref("12000")
const nomCurrent = ref(5.5)
const measCurrent = ref(4.2)

const baseCharge = computed(() => {
  return parseFloat(splitCapacity.value) / 15000 // Heuristic: 12k BTU ~ 0.8 kg
})

const chargeDecision = computed(() => {
  const diff = nomCurrent.value - measCurrent.value
  const ratio = measCurrent.value / nomCurrent.value
  
  if (measCurrent.value <= 0 || nomCurrent.value <= 0) {
    return { text: "Valeurs Invalides", status: "error", amount: 0, action: "" }
  }

  if (ratio > 1.05) {
    return { 
      text: "Surcharge Détectée", 
      status: "warning", 
      amount: parseFloat(((ratio - 1) * baseCharge.value).toFixed(2)), 
      action: "Retirer" 
    }
  } else if (ratio < 0.95) {
    return { 
      text: "Charge Insuffisante", 
      status: "under", 
      amount: parseFloat(((1 - ratio) * baseCharge.value).toFixed(2)), 
      action: "Ajouter" 
    }
  } else {
    return { text: "Charge Optimale", status: "ok", amount: 0, action: "" }
  }
})

</script>

<style scoped>
.cvc-page {
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

.tabs-control {
  display: flex;
  background: var(--gray-50);
  padding: 0.25rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid var(--gray-200);
}

.tabs-control button {
  flex: 1;
  border: none;
  background: none;
  padding: 0.75rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray-500);
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tabs-control button.active {
  background: var(--white);
  color: var(--black);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 { font-size: 1.1rem; font-weight: 800; color: var(--black); }
.desc { font-size: 0.85rem; color: var(--gray-500); line-height: 1.5; margin-bottom: 1rem; }

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--black);
}

.input-group input, .input-group select {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  padding: 0.9rem;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
  transition: all 0.3s;
}

.custom-select {
  font-weight: 700;
  color: var(--black);
  margin-bottom: 0.25rem;
}

.input-group input:focus, .input-group select:focus {
  border-color: var(--black);
  background: var(--white);
}

.swap-icon {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
  color: var(--gray-400);
}

.main-content {
  flex-grow: 1;
  padding: 3rem;
  overflow-y: auto;
}

.dashboard {
  max-width: 900px;
  margin: 0 auto;
}

.dash-header {
  margin-bottom: 2rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.result-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}

.result-card.accent {
  border-color: var(--black);
  background: var(--black);
  color: var(--white);
}

.result-card.accent .label { color: var(--gray-400); }
.result-card.accent .value { color: var(--white); }

.label { font-size: 0.8rem; font-weight: 700; color: var(--gray-500); text-transform: uppercase; }
.value { font-size: 1.5rem; font-weight: 900; color: var(--black); }

.chart-container {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  position: relative;
}

.enthalpy-oval-label {
  position: absolute;
  left: 26%;
  top: 25%;
  transform: rotate(-45deg);
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--black);
  background: rgba(255, 255, 255, 0.85);
  border: 1.5px solid var(--gray-400);
  border-radius: 50%;
  padding: 0.5rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.conv-dash {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.conv-result {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 32px;
  padding: 4rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.conv-icon { color: var(--accent); margin-bottom: 1rem; }
.conv-result h2 { font-size: 3rem; font-weight: 900; letter-spacing: -2px; margin: 0; }
.equals { font-size: 2rem; color: var(--gray-400); font-weight: 800; }
.conv-details { color: var(--gray-500); font-size: 0.9rem; margin-top: 1rem; }

.charge-dash {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.charge-result {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 24px;
  padding: 3rem;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.charge-status {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 100px;
  font-weight: 800;
  font-size: 1.25rem;
  margin: 1.5rem 0;
}

.charge-status.ok { background: #Edfaf1; color: #10B981; }
.charge-status.under { background: #FEF2F2; color: #EF4444; }
.charge-status.warning { background: #FFFBEB; color: #F59E0B; }
.charge-status.error { background: #F3F4F6; color: #6B7280; }

.charge-amount { font-size: 1.1rem; color: var(--black); line-height: 1.6; margin-bottom: 2rem;}
.charge-amount strong { font-size: 1.5rem; color: var(--accent); }

.charge-info { font-size: 0.8rem; color: var(--gray-400); line-height: 1.5; }

@media (max-width: 768px) {
  .cvc-page { flex-direction: column; overflow-y: auto; height: auto; display: block; }
  .sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--gray-200); }
  .main-content { padding: 1.5rem; overflow-y: visible; }
  .conv-result h2 { font-size: 2rem; }
}
</style>
