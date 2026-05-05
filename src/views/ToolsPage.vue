<template>
  <div class="tools-page">
    <section class="page-hero" :style="{ backgroundImage: `url('${heroBg}')` }">
      <div class="overlay"></div>
      <div class="hero-container">
        <div class="hero-content reveal">
          <h1 class="hero-title">
            Mes Outils & Analyseurs.
          </h1>
          <p class="hero-subtitle">
            Une collection d'outils spécialisés conçus pour l'efficacité énergétique, l'analyse de données SCADA et la durabilité industrielle.
          </p>
        </div>
      </div>
    </section>

    <section class="tools-grid-section">
      <div class="container-unified">
        <!-- Tab Switcher -->
        <div class="category-tabs">
          <button 
            :class="{ active: activeCategory === 'analysis' }" 
            @click="activeCategory = 'analysis'"
          >
            Outils d'Analyse
          </button>
          <button 
            :class="{ active: activeCategory === 'python' }" 
            @click="activeCategory = 'python'"
          >
            Bibliothèques Python
          </button>
          <button 
            :class="{ active: activeCategory === 'studies' }" 
            @click="activeCategory = 'studies'"
          >
            Modèles & Rapports
          </button>
        </div>

        <!-- Analysis Tools Grid -->
        <div v-if="activeCategory === 'analysis'" class="tools-grid">
          <!-- Tool 1: Localisation satellite -->
          <div class="tool-card clickable-card reveal" @click="goToSatellite">
            <div class="tool-icon-wrapper">
              <MapPin class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Localisation Satellite</h3>
              <p>Outil de géolocalisation et visualisation cartographique pour l'analyse précise des actifs industriels sur le terrain.</p>
              <div class="tool-footer">
                <span class="tool-tag">Géospatial</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 2: Jeux de données efficacité énergétique -->
          <div class="tool-card clickable-card reveal" @click="goToDatasets">
            <div class="tool-icon-wrapper">
              <Database class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Données Énergétiques</h3>
              <p>Analyse approfondie et traitement de données massives pour l'optimisation énergétique industrielle.</p>
              <div class="tool-footer">
                <span class="tool-tag">Big Data</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 3: Outils de Calcul CVC -->
          <div class="tool-card clickable-card reveal" @click="goToCvc">
            <div class="tool-icon-wrapper">
              <Activity class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Calculs CVC</h3>
              <p>Outils de dimensionnement et de calcul pour les systèmes de Chauffage, Ventilation et Climatisation industriels.</p>
              <div class="tool-footer">
                <span class="tool-tag">CVC</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Tool 4: Simulateur IoT & GTB -->
          <div class="tool-card clickable-card reveal" @click="goToIot">
            <div class="tool-icon-wrapper">
              <Cpu class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Simulateur IoT & GTB</h3>
              <p>Laboratoire virtuel : configuration de capteurs intelligents, automatisation et streaming Kafka.</p>
              <div class="tool-footer">
                <span class="tool-tag">Industrie 4.0</span>
                <button class="tool-btn">Ouvrir l'outil <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Python Libraries Grid -->
        <div v-if="activeCategory === 'python'" class="tools-grid">
          <!-- Library 1: Losah -->
          <div class="tool-card clickable-card reveal" @click="goToLosah">
            <div class="tool-icon-wrapper">
              <svg fill="none" height="24" viewBox="0 0 20 20" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z" fill="white" />
              </svg>
            </div>
            <div class="tool-content">
              <h3>Bibliothèque Losah</h3>
              <p>Solution Python pour la maintenance prédictive, incluant des calculs de MTTR, RUL et processus Gamma.</p>
              <div class="tool-footer">
                <span class="tool-tag">Python Library</span>
                <button class="tool-btn">Voir la Doc <ArrowUpRight size="16" /></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Fiches de Maintenance Grid -->
        <div v-if="activeCategory === 'studies'" class="tools-grid">
          <!-- Form 1: Fiche de Sécurité -->
          <div class="tool-card clickable-card reveal" @click="downloadForm('securite')">
            <div class="tool-icon-wrapper">
              <ShieldCheck class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Réunion de Sécurité (VAT)</h3>
              <p>Modèle de fiche pour les causeries sécurité et l'analyse des risques avant travaux (EPI, Dangers, Points de contrôle).</p>
              <div class="tool-footer">
                <span class="tool-tag">Sécurité</span>
                <button class="tool-btn">Exporter Excel <Download size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Form 2: Rapport d'Intervention -->
          <div class="tool-card clickable-card reveal" @click="downloadForm('intervention')">
            <div class="tool-icon-wrapper">
              <ClipboardList class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Fiche d'Intervention</h3>
              <p>Rapport d'intervention standard incluant identification client, descriptif technique et pièces changées.</p>
              <div class="tool-footer">
                <span class="tool-tag">Technique</span>
                <button class="tool-btn">Exporter Excel <Download size="16" /></button>
              </div>
            </div>
          </div>

          <!-- Form 3: Checklist Groupe Électrogène -->
          <div class="tool-card clickable-card reveal" @click="downloadForm('groupe-electrogene')">
            <div class="tool-icon-wrapper">
              <Zap class="tool-icon" />
            </div>
            <div class="tool-content">
              <h3>Maintenance Groupe Électrogène</h3>
              <p>Checklist spécialisée pour les visites régulières (Niveaux huile/fuel, Alternateur, Batterie, Filtres).</p>
              <div class="tool-footer">
                <span class="tool-tag">Checklist</span>
                <button class="tool-btn">Exporter Excel <Download size="16" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { MapPin, Database, Cpu, ArrowUpRight, Activity, Zap, ShieldCheck, ClipboardList, Download } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const heroBg = 'https://mistral.ai/_next/static/media/mistral-frontier-26.15-1ez5hhac6r.webp'

const activeCategory = ref('analysis')

const goToSatellite = () => router.push('/outils/satellite')
const goToCvc = () => router.push('/outils/cvc')
const goToDatasets = () => router.push('/outils/datasets')
const goToIot = () => router.push('/outils/iot')
const goToLosah = () => router.push('/outils/losah')

const downloadForm = (type) => {
  let csvContent = ""
  let fileName = ""

  if (type === 'securite') {
    csvContent = "DATE,PROJET,CLIENT,LIEU,PARTICIPANTS\n" +
                 "2026-05-05,MAINTENANCE CVC,ONOMO HOTEL,ABIDJAN,\"GBRA KOREKOU, KASSI KOFFI\"\n\n" +
                 "CHECKLIST,STATUT,COMMENTAIRES\n" +
                 "Analyse de risque,OK,\n" +
                 "EPI,OK,Port du casque et gants\n" +
                 "Dangers potentiels,ÉLECTROCUTION,Vérifier consignation\n" +
                 "Méthodologie,OK,\n"
    fileName = "Fiche_Securite_VAT.csv"
  } else if (type === 'intervention') {
    csvContent = "N_DOSSIER,DATE,CLIENT,TECHNICIEN,DURÉE\n" +
                 "0003390,2026-05-05,ONOMO HOTEL,KASSI KOFFI JULIEN,4.5h\n\n" +
                 "DESIGNATION,PIECE_CHANGEE,QUANTITÉ,S_N\n" +
                 "Compresseur 12k BTU,OUI,1,SN-88293\n" +
                 "Gaz R410A,OUI,0.8kg,\n"
    fileName = "Fiche_Intervention.csv"
  } else if (type === 'groupe-electrogene') {
    csvContent = "DATE,VISITE,CLIENT,MARQUE,PUISSANCE,COMPTEUR\n" +
                 "2026-05-05,MENSUELLE,ALPHA PLANT,SDMO,165kVA,296.9h\n\n" +
                 "CONTROLE,STATUT,COMMENTAIRE\n" +
                 "Niveau Huile,OK,\n" +
                 "Niveau Carburant,85%,\n" +
                 "Batterie,13.1V,\n" +
                 "Tension Alternateur,400V,Équilibré\n" +
                 "Fréquence,50.1Hz,\n"
    fileName = "Maintenance_Groupe_Electrogene.csv"
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in')
      }
    })
  }, { threshold: 0.1 })
  
  reveals.forEach(r => observer.observe(r))
})
</script>

<style scoped>
.tools-page {
  background-color: var(--white);
}

.page-hero {
  position: relative;
  min-height: 70vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  padding-top: 80px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.6));
}

.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 850;
  color: var(--white);
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 2rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 650px;
  line-height: 1.5;
  font-weight: 400;
}

.tools-grid-section {
  padding: 10rem 0;
  background-color: var(--cream);
}

.container-unified {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6%;
}

.category-tabs {
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--gray-200);
  padding-bottom: 1rem;
}

.category-tabs button {
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--gray-400);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.category-tabs button:hover {
  color: var(--black);
}

.category-tabs button.active {
  color: var(--black);
}

.category-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.tool-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  padding: 3rem;
  transition: all 0.5s cubic-bezier(0.2, 0, 0, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.clickable-card {
  cursor: pointer;
}

.tool-card:hover {
  transform: translateY(-10px);
  border-color: var(--black);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
}

.tool-icon-wrapper {
  width: 50px;
  height: 50px;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  color: var(--white);
  transition: transform 0.5s ease;
}

.tool-card:hover .tool-icon-wrapper {
  background: var(--accent);
  transform: rotate(5deg);
}

.tool-icon {
  width: 24px;
  height: 24px;
}

.tool-content h3 {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--black);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.tool-content p {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.tool-tag {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-400);
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 900;
  color: var(--black);
  cursor: pointer;
}

@media (max-width: 768px) {
  .hero-title { font-size: 3.5rem; }
  .tools-grid { grid-template-columns: 1fr; }
  .tool-card { padding: 2rem; }
}
</style>
