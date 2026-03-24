<template>
  <section class="section skills" id="skills">
    <div class="section-header">
      <span class="section-label">Compétences</span>
      <h2 class="section-title">Expertise Technique</h2>
      <p class="section-subtitle">Spécialiste en audit énergétique, pilotage de bâtiments et CVC</p>
    </div>
    
    <div class="skills-container">
      <!-- Pilotage & Supervision (GTB/GTC) -->
      <div class="skill-category">
        <h3>
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5zm0-4h4v2H5zm6 0h8v2h-8zm0-4h8v2h-8zM5 7h4v4H5z"/></svg>
          Pilotage & Supervision (GTB/GTC)
        </h3>
        <div class="skill-items">
          <div class="skill-item">
            <div class="skill-icon-text">GTB</div>
            <span>GTB / GTC (Siemens, Schneider)</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">PID</div>
            <span>Régulation PID / TOR</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">TIA</div>
            <span>Programmation PLC (TIA Portal)</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">MB</div>
            <span>BACnet / Modbus / OPC UA</span>
          </div>
        </div>
      </div>

      <!-- Audit & Efficacité Énergétique -->
      <div class="skill-category">
        <h3>
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          Efficacité Énergétique
        </h3>
        <div class="skill-items">
          <div class="skill-item">
            <div class="skill-icon-text">AU</div>
            <span>Audit Énergétique</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">TH</div>
            <span>Thermique du bâtiment</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">ET</div>
            <span>ETAP / Calcul de charges</span>
          </div>
          <div class="skill-item">
            <img src="https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg" alt="Power BI" />
            <span>Reporting (Power BI)</span>
          </div>
        </div>
      </div>

      <!-- CVC & Maintenance -->
      <div class="skill-category">
        <h3>
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
          Génie Thermique & CVC
        </h3>
        <div class="skill-items">
          <div class="skill-item">
            <div class="skill-icon-text">CVC</div>
            <span>Dimensionnement CVC</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">MT</div>
            <span>Maintenance prédictive</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">AC</div>
            <span>AutoCAD Electrical</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">GE</div>
            <span>Groupes Électrogènes</span>
          </div>
        </div>
      </div>

      <!-- IoT & Mesure -->
      <div class="skill-category">
        <h3>
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"/></svg>
          IoT & Mesure
        </h3>
        <div class="skill-items">
          <div class="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" alt="Raspberry Pi" />
            <span>Raspberry Pi</span>
          </div>
          <div class="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" alt="ESP32/Arduino" />
            <span>Capteurs & ESP32</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">MQTT</div>
            <span>Protocole MQTT</span>
          </div>
          <div class="skill-item">
            <div class="skill-icon-text">NR</div>
            <span>Flux Node-RED</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.skill-icon-text {
  width: 28px;
  height: 28px;
  background: var(--black);
  color: var(--white);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}
</style>
