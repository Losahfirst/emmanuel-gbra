/**
 * Export Service
 * Service pour exporter les données et graphiques
 */

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Exporte un graphique en PNG
 */
export async function exportToPNG(chartRef, filename = 'kanari-energy-chart.png') {
  if (!chartRef || !chartRef.$el) {
    throw new Error('Référence du graphique invalide')
  }

  try {
    const canvas = await html2canvas(chartRef.$el, {
      backgroundColor: '#FFFFFF',
      scale: 2,
      logging: false
    })

    const link = document.createElement('a')
    link.download = filename
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('Erreur lors de l\'export PNG:', error)
    throw error
  }
}

/**
 * Exporte un graphique en PDF
 */
export async function exportToPDF(chartRef, title = 'KANARI Energy - Rapport', filename = 'kanari-energy-report.pdf') {
  if (!chartRef || !chartRef.$el) {
    throw new Error('Référence du graphique invalide')
  }

  try {
    const canvas = await html2canvas(chartRef.$el, {
      backgroundColor: '#FFFFFF',
      scale: 2,
      logging: false
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('landscape', 'mm', 'a4')

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 20

    pdf.setFontSize(16)
    pdf.text(title, pdfWidth / 2, 15, { align: 'center' })
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

    pdf.save(filename)
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error)
    throw error
  }
}

/**
 * Exporte des données en CSV
 */
export function exportToCSV(data, filename = 'kanari-energy-data.csv') {
  if (!data || data.length === 0) {
    throw new Error('Aucune donnée à exporter')
  }

  // Créer les en-têtes
  const headers = ['Timestamp', 'Category', 'Value (MW)', 'Unit']
  const rows = [headers.join(',')]

  // Ajouter les données
  data.forEach(point => {
    const row = [
      point.timestamp,
      point.category,
      point.value,
      point.unit
    ]
    rows.push(row.join(','))
  })

  // Créer le blob et télécharger
  const csvContent = rows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

/**
 * Exporte des données en Excel (format CSV compatible)
 */
export function exportToExcel(data, filename = 'kanari-energy-data.xlsx') {
  // Pour un vrai export Excel, on utiliserait une librairie comme xlsx
  // Pour l'instant, on exporte en CSV avec extension .xlsx (compatible Excel)
  exportToCSV(data, filename.replace('.xlsx', '.csv'))
}

/**
 * Exporte toutes les données du mix énergétique
 */
export function exportEnergyMixData(energyData, filename = 'kanari-energy-mix.csv') {
  const allData = []

  Object.keys(energyData).forEach(category => {
    energyData[category].forEach(point => {
      allData.push({
        timestamp: point.timestamp,
        category,
        value: point.value,
        unit: point.unit
      })
    })
  })

  // Trier par timestamp
  allData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  exportToCSV(allData, filename)
}
