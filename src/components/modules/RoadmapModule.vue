<template>
  <div class="roadmap-module">
    <div class="module-header">
      <h2 class="module-title">🎯 Générateur de Roadmap Tech</h2>
      <p class="module-subtitle">Créez votre parcours personnalisé vers votre carrière tech idéale</p>
    </div>
    
    <div class="roadmap-wizard">
      <!-- Étape 1: Choix de carrière -->
      <div v-if="currentStep === 1" class="wizard-step">
        <h3 class="step-title">Quelle carrière tech vous intéresse ?</h3>
        <div class="career-grid">
          <div 
            v-for="career in careers" 
            :key="career.id"
            :class="['career-card', { selected: selectedCareer === career.id }]"
            @click="selectCareer(career.id)"
          >
            <div class="career-icon">{{ career.icon }}</div>
            <h4 class="career-name">{{ career.name }}</h4>
            <p class="career-desc">{{ career.description }}</p>
          </div>
        </div>
        <button class="btn btn-primary" @click="nextStep" :disabled="!selectedCareer">
          Continuer →
        </button>
      </div>
      
      <!-- Étape 2: Questions -->
      <div v-if="currentStep === 2" class="wizard-step">
        <h3 class="step-title">{{ currentQuestion.question }}</h3>
        <div class="question-options">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            :class="['option-button', { selected: selectedAnswer === index }]"
            @click="selectAnswer(index)"
          >
            {{ option }}
          </button>
        </div>
        <div class="wizard-actions">
          <button class="btn btn-secondary" @click="prevStep">← Retour</button>
          <button class="btn btn-primary" @click="nextQuestion" :disabled="selectedAnswer === null">
            {{ currentQuestionIndex < questions.length - 1 ? 'Suivant →' : 'Générer la roadmap' }}
          </button>
        </div>
      </div>
      
      <!-- Étape 3: Roadmap générée -->
      <div v-if="currentStep === 3" class="wizard-step">
        <div class="roadmap-result">
          <h3 class="result-title">🎉 Votre Roadmap Personnalisée</h3>
          <p class="result-subtitle">Voici votre parcours recommandé pour devenir {{ getCareerName() }}</p>
          
          <div class="roadmap-timeline">
            <div 
              v-for="(phase, index) in generatedRoadmap" 
              :key="index"
              class="roadmap-phase"
            >
              <div class="phase-number">{{ index + 1 }}</div>
              <div class="phase-content">
                <h4 class="phase-title">{{ phase.title }}</h4>
                <p class="phase-duration">⏱️ {{ phase.duration }}</p>
                <ul class="phase-items">
                  <li v-for="(item, i) in phase.items" :key="i">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="roadmap-actions">
            <button class="btn btn-primary" @click="downloadRoadmap">📥 Télécharger la roadmap</button>
            <button class="btn btn-secondary" @click="resetWizard">🔄 Recommencer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(1)
const selectedCareer = ref(null)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const answers = ref([])

const careers = [
  {
    id: 'ml-engineer',
    name: 'Machine Learning Engineer',
    icon: '🤖',
    description: 'IA, Deep Learning, Modèles prédictifs'
  },
  {
    id: 'frontend',
    name: 'Frontend Developer',
    icon: '💻',
    description: 'React, Vue.js, Interfaces utilisateur'
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    icon: '⚙️',
    description: 'APIs, Bases de données, Architecture'
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    icon: '🚀',
    description: 'Frontend + Backend, Solutions complètes'
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: '🔧',
    description: 'CI/CD, Cloud, Infrastructure'
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    icon: '📊',
    description: 'Analyse de données, Statistiques, ML'
  }
]

const questions = [
  {
    question: 'Quel est votre niveau actuel ?',
    options: ['Débutant complet', 'Quelques bases', 'Intermédiaire', 'Avancé']
  },
  {
    question: 'Combien de temps pouvez-vous consacrer par semaine ?',
    options: ['Moins de 5h', '5-10h', '10-20h', 'Plus de 20h']
  },
  {
    question: 'Préférez-vous apprendre ?',
    options: ['En autodidacte', 'Avec des cours structurés', 'Par la pratique', 'Mix des trois']
  },
  {
    question: 'Quel est votre objectif principal ?',
    options: ['Changer de carrière', 'Améliorer mes compétences', 'Créer des projets', 'Obtenir une certification']
  }
]

const currentQuestion = computed(() => questions[currentQuestionIndex.value])

const selectCareer = (careerId) => {
  selectedCareer.value = careerId
}

const selectAnswer = (index) => {
  selectedAnswer.value = index
}

const nextStep = () => {
  if (currentStep.value === 1 && selectedCareer.value) {
    currentStep.value = 2
  }
}

const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    answers.value.push(selectedAnswer.value)
    selectedAnswer.value = null
    
    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value++
    } else {
      generateRoadmap()
      currentStep.value = 3
    }
  }
}

const prevStep = () => {
  if (currentStep.value === 2) {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
      answers.value.pop()
      selectedAnswer.value = answers.value[answers.value.length - 1] ?? null
    } else {
      currentStep.value = 1
    }
  }
}

const generatedRoadmap = ref([])

const generateRoadmap = () => {
  const career = careers.find(c => c.id === selectedCareer.value)
  const level = answers.value[0]
  const time = answers.value[1]
  
  // Génération de roadmap basée sur les réponses
  const roadmaps = {
    'ml-engineer': [
      {
        title: 'Fondations Python & Mathématiques',
        duration: '2-3 mois',
        items: [
          'Apprendre Python (syntaxe, structures de données)',
          'Bases des mathématiques (algèbre linéaire, statistiques)',
          'Manipulation de données avec Pandas et NumPy',
          'Visualisation avec Matplotlib et Seaborn'
        ]
      },
      {
        title: 'Machine Learning de Base',
        duration: '3-4 mois',
        items: [
          'Scikit-learn (régression, classification, clustering)',
          'Évaluation et validation de modèles',
          'Feature engineering et preprocessing',
          'Premiers projets pratiques'
        ]
      },
      {
        title: 'Deep Learning',
        duration: '4-6 mois',
        items: [
          'Neural Networks avec TensorFlow/Keras',
          'CNN pour la vision par ordinateur',
          'RNN/LSTM pour les séquences',
          'Projets avancés (reconnaissance d\'images, NLP)'
        ]
      },
      {
        title: 'MLOps & Production',
        duration: '2-3 mois',
        items: [
          'Déploiement de modèles (Docker, Cloud)',
          'Monitoring et maintenance',
          'Pipelines ML automatisés',
          'Portfolio de projets'
        ]
      }
    ],
    'frontend': [
      {
        title: 'HTML, CSS & JavaScript',
        duration: '2-3 mois',
        items: [
          'Maîtriser HTML5 et CSS3',
          'JavaScript ES6+ (async, promises, modules)',
          'Responsive design et accessibilité',
          'Build tools (Webpack, Vite)'
        ]
      },
      {
        title: 'Framework Frontend',
        duration: '3-4 mois',
        items: [
          'Choisir React ou Vue.js',
          'State management (Redux/Vuex)',
          'Routing et navigation',
          'Tests unitaires et intégration'
        ]
      },
      {
        title: 'Outils & Bonnes Pratiques',
        duration: '2-3 mois',
        items: [
          'TypeScript',
          'Styling (Tailwind, Styled Components)',
          'Performance optimization',
          'Projets portfolio'
        ]
      }
    ]
  }
  
  // Roadmap par défaut si non trouvée
  const defaultRoadmap = [
    {
      title: 'Fondations',
      duration: '2-3 mois',
      items: ['Apprendre les bases', 'Premiers projets', 'Comprendre les concepts fondamentaux']
    },
    {
      title: 'Approfondissement',
      duration: '3-4 mois',
      items: ['Technologies avancées', 'Projets complexes', 'Bonnes pratiques']
    },
    {
      title: 'Spécialisation',
      duration: '2-3 mois',
      items: ['Expertise dans un domaine', 'Portfolio professionnel', 'Préparation carrière']
    }
  ]
  
  generatedRoadmap.value = roadmaps[selectedCareer.value] || defaultRoadmap
}

const getCareerName = () => {
  const career = careers.find(c => c.id === selectedCareer.value)
  return career ? career.name : 'votre carrière tech'
}

const downloadRoadmap = () => {
  const roadmapText = generatedRoadmap.value.map((phase, index) => {
    return `${index + 1}. ${phase.title} (${phase.duration})\n${phase.items.map(item => `   - ${item}`).join('\n')}`
  }).join('\n\n')
  
  const content = `ROADMAP TECH - ${getCareerName()}\n\n${roadmapText}`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `roadmap-${selectedCareer.value}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const resetWizard = () => {
  currentStep.value = 1
  selectedCareer.value = null
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  answers.value = []
  generatedRoadmap.value = []
}
</script>

<style scoped>
.roadmap-module {
  width: 100%;
}

.module-header {
  margin-bottom: 2rem;
  text-align: center;
}

.module-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.module-subtitle {
  font-size: 1.125rem;
  color: var(--light-gray);
}

.roadmap-wizard {
  max-width: 800px;
  margin: 0 auto;
}

.wizard-step {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
}

.career-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.career-card {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.career-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.15);
}

.career-card.selected {
  background: var(--accent-yellow);
  border-color: var(--accent-orange);
}

.career-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.career-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.career-desc {
  font-size: 0.9rem;
  color: var(--light-gray);
}

.question-options {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-button {
  padding: 1.25rem;
  background: var(--bg-light);
  border: var(--border-thick) solid var(--border-color);
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-gray);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  text-align: left;
}

.option-button:hover {
  background: var(--accent-yellow);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
}

.option-button.selected {
  background: var(--accent-orange);
  color: var(--white);
  border-color: var(--dark-gray);
}

.wizard-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.wizard-actions .btn {
  flex: 1;
}

.roadmap-result {
  animation: fadeIn 0.5s ease;
}

.result-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
}

.result-subtitle {
  font-size: 1.125rem;
  color: var(--light-gray);
  text-align: center;
  margin-bottom: 2rem;
}

.roadmap-timeline {
  margin-bottom: 2rem;
}

.roadmap-phase {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-light);
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--border-color);
}

.phase-number {
  width: 50px;
  height: 50px;
  background: var(--accent-orange);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  flex-shrink: 0;
  border: var(--border-thick) solid var(--border-color);
}

.phase-content {
  flex: 1;
}

.phase-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.phase-duration {
  font-size: 0.9rem;
  color: var(--accent-orange);
  font-weight: 600;
  margin-bottom: 1rem;
}

.phase-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.phase-items li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--light-gray);
}

.phase-items li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-orange);
  font-weight: bold;
}

.roadmap-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.roadmap-actions .btn {
  padding: 1rem 2rem;
}

@media (max-width: 768px) {
  .career-grid {
    grid-template-columns: 1fr;
  }
  
  .roadmap-phase {
    flex-direction: column;
    text-align: center;
  }
  
  .phase-number {
    margin: 0 auto;
  }
  
  .roadmap-actions {
    flex-direction: column;
  }
}
</style>
