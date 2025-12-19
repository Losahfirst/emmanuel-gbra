<template>
  <div class="export-buttons">
    <h3 class="panel-title">Exporter</h3>
    <div class="export-options">
      <button
        @click="exportChartPNG"
        class="export-btn"
        :disabled="isExporting"
      >
        <Download :size="18" />
        <span>PNG</span>
      </button>
      <button
        @click="exportChartPDF"
        class="export-btn"
        :disabled="isExporting"
      >
        <FileText :size="18" />
        <span>PDF</span>
      </button>
      <button
        @click="exportDataCSV"
        class="export-btn"
        :disabled="isExporting"
      >
        <FileSpreadsheet :size="18" />
        <span>CSV</span>
      </button>
      <button
        @click="exportDataExcel"
        class="export-btn"
        :disabled="isExporting"
      >
        <FileSpreadsheet :size="18" />
        <span>Excel</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEnergyStore } from '../../../../stores/energyStore.js'
import { exportToPNG, exportToPDF, exportToCSV, exportToExcel, exportEnergyMixData } from '../../../../services/exportService.js'
import { Download, FileText, FileSpreadsheet } from 'lucide-vue-next'

const store = useEnergyStore()
const isExporting = ref(false)
const chartRef = ref(null)

async function exportChartPNG() {
  isExporting.value = true
  try {
    // Trouver la référence du graphique
    const chartElement = document.querySelector('.energy-mix-chart')
    if (chartElement) {
      await exportToPNG({ $el: chartElement }, 'kanari-energy-chart.png')
    }
  } catch (error) {
    console.error('Erreur lors de l\'export PNG:', error)
    alert('Erreur lors de l\'export PNG')
  } finally {
    isExporting.value = false
  }
}

async function exportChartPDF() {
  isExporting.value = true
  try {
    const chartElement = document.querySelector('.energy-mix-chart')
    if (chartElement) {
      await exportToPDF({ $el: chartElement }, 'KANARI Energy - Rapport', 'kanari-energy-report.pdf')
    }
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error)
    alert('Erreur lors de l\'export PDF')
  } finally {
    isExporting.value = false
  }
}

function exportDataCSV() {
  isExporting.value = true
  try {
    exportEnergyMixData(store.energyData, 'kanari-energy-data.csv')
  } catch (error) {
    console.error('Erreur lors de l\'export CSV:', error)
    alert('Erreur lors de l\'export CSV')
  } finally {
    isExporting.value = false
  }
}

function exportDataExcel() {
  isExporting.value = true
  try {
    exportEnergyMixData(store.energyData, 'kanari-energy-data.xlsx')
  } catch (error) {
    console.error('Erreur lors de l\'export Excel:', error)
    alert('Erreur lors de l\'export Excel')
  } finally {
    isExporting.value = false
  }
}
</script>

<style scoped>
.export-buttons {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.panel-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
}

.export-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.export-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  border-radius: 0.5rem;
  color: #1A1A1A;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover:not(:disabled) {
  background: #EEEEEE;
  border-color: #3B82F6;
  color: #3B82F6;
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
