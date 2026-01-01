<template>
  <div class="games-module">
    <div class="module-header" v-if="!currentGame">
      <div class="header-icon">
        <IconWrapper name="sparkles" size="xl" />
      </div>
      <h2 class="module-title">Jeux Vidéo & Geeks Connection</h2>
      <p class="module-subtitle">Collection de jeux JavaScript pour se détendre et s'amuser</p>
    </div>
    
    <div class="games-tabs" v-if="!currentGame">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <IconWrapper :name="tab.icon" size="sm" />
        <span>{{ tab.label }}</span>
      </button>
    </div>
    
    <div class="games-content">
      <!-- Zone de jeu (prioritaire) -->
      <div v-if="currentGame" class="game-container">
        <div class="game-header-bar">
          <button class="btn btn-secondary" @click="resetToGames">
            <IconWrapper name="code" size="sm" />
            <span>Retour</span>
          </button>
          <h3>{{ getGameName(currentGame) }}</h3>
        </div>
        <div class="game-area">
          <SnakeGame v-if="currentGame === 'snake'" />
          <TicTacToeGame v-if="currentGame === 'tictactoe'" />
          <MemoryGame v-if="currentGame === 'memory'" />
          <PongGame v-if="currentGame === 'pong'" />
          <CalculatorGame v-if="currentGame === 'calculator'" />
        </div>
      </div>
      
      <!-- Jeux JavaScript -->
      <div v-else-if="activeTab === 'js-games'" class="games-grid">
        <div v-for="game in jsGames" :key="game.id" class="game-card">
          <div class="game-header">
            <h3 class="game-title">{{ game.name }}</h3>
            <span class="game-type">{{ game.type }}</span>
          </div>
          <p class="game-description">{{ game.description }}</p>
          <div class="game-actions">
            <button class="btn btn-primary" @click="playGame(game.id)">
              <IconWrapper name="sparkles" size="sm" />
              <span>Jouer</span>
            </button>
            <button class="btn btn-secondary" @click="downloadGame(game.id)">
              <IconWrapper name="document" size="sm" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Générateur d'Emojis -->
      <div v-else-if="activeTab === 'emoji-generator'" class="emoji-generator-tab">
        <EmojiGenerator />
      </div>
      
      <!-- Jeux Google Hors Ligne -->
      <div v-else-if="activeTab === 'offline-games'" class="offline-games">
        <div class="offline-info">
          <IconWrapper name="globe" size="md" />
          <p>Jeux Google disponibles hors ligne (nécessite une connexion initiale pour le chargement)</p>
        </div>
        <div class="games-grid">
          <div v-for="game in offlineGames" :key="game.id" class="game-card">
            <div class="game-header">
              <h3 class="game-title">{{ game.name }}</h3>
              <span class="game-type">
                <IconWrapper name="globe" size="xs" />
                <span>Google</span>
              </span>
            </div>
            <p class="game-description">{{ game.description }}</p>
            <div class="game-actions">
              <a :href="game.url" target="_blank" class="btn btn-primary">
                <IconWrapper name="sparkles" size="sm" />
                <span>Jouer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconWrapper from '../icons/IconWrapper.vue'
import SnakeGame from './games/SnakeGame.vue'
import TicTacToeGame from './games/TicTacToeGame.vue'
import MemoryGame from './games/MemoryGame.vue'
import PongGame from './games/PongGame.vue'
import CalculatorGame from './games/CalculatorGame.vue'
import EmojiGenerator from './games/EmojiGenerator.vue'

const activeTab = ref('js-games')
const currentGame = ref(null)

// Réinitialiser le tab quand on ferme le jeu
const resetToGames = () => {
  currentGame.value = null
  activeTab.value = 'js-games'
}

const tabs = [
  { id: 'js-games', label: 'Jeux JavaScript', icon: 'sparkles' },
  { id: 'offline-games', label: 'Jeux Google Hors Ligne', icon: 'globe' },
  { id: 'emoji-generator', label: 'Générateur d\'Emojis', icon: 'lightbulb' }
]

const jsGames = [
  {
    id: 'snake',
    name: 'Snake Game',
    type: 'Classique',
    description: 'Le célèbre jeu du serpent. Mangez les pommes et grandissez !'
  },
  {
    id: 'tictactoe',
    name: 'Morpion',
    type: 'Stratégie',
    description: 'Jouez au morpion contre l\'IA. Qui gagnera ?'
  },
  {
    id: 'memory',
    name: 'Memory Game',
    type: 'Mémoire',
    description: 'Testez votre mémoire en retrouvant les paires de cartes.'
  },
  {
    id: 'pong',
    name: 'Pong',
    type: 'Arcade',
    description: 'Le jeu de raquette classique. Défendez votre but !'
  },
  {
    id: 'calculator',
    name: 'Calculator Challenge',
    type: 'Rapidité',
    description: 'Résolvez des calculs le plus vite possible !'
  }
]

const offlineGames = [
  {
    id: 'dino',
    name: 'Dino Run',
    description: 'Le jeu du dinosaure de Chrome. Parfait hors ligne !',
    url: 'chrome://dino'
  },
  {
    id: 'pacman',
    name: 'Pac-Man',
    description: 'Jouez au célèbre Pac-Man directement dans votre navigateur.',
    url: 'https://www.google.com/logos/2010/pacman10-i.html'
  }
]

const playGame = (gameId) => {
  currentGame.value = gameId
  activeTab.value = null // Masquer les tabs pour afficher directement le jeu
  // Scroll vers le haut de la modale pour afficher le jeu directement
  setTimeout(() => {
    const modalContent = document.querySelector('.module-modal-content')
    if (modalContent) {
      modalContent.scrollTop = 0
    }
  }, 50)
}

const getGameName = (gameId) => {
  const game = jsGames.find(g => g.id === gameId)
  return game ? game.name : ''
}

const downloadGame = async (gameId) => {
  const gameName = getGameName(gameId)
  
  // Créer le README
  const readmeContent = generateReadme(gameId, gameName)
  
  // Créer un fichier d'instructions pour obtenir le code source
  const instructionsContent = `# Instructions pour obtenir le code source de ${gameName}

Le code source complet de ce jeu est disponible dans le repository GitHub du portfolio.

## 📦 Comment obtenir le code

1. Visitez le repository GitHub du portfolio
2. Naviguez vers: src/components/modules/games/
3. Téléchargez le fichier ${gameName.replace(/\s+/g, '')}.vue

## 🔗 Repository

Le code source complet est disponible sur GitHub avec tous les autres jeux de la collection.

## 💡 Note

Ce jeu fait partie de la collection "Jeux Vidéo & Geeks Connection" créée avec Vue.js 3.
`
  
  // Télécharger les fichiers
  downloadFile('README.md', readmeContent)
  setTimeout(() => {
    downloadFile('INSTRUCTIONS.md', instructionsContent)
  }, 500)
}

const generateReadme = (gameId, gameName) => {
  const descriptions = {
    snake: {
      description: 'Un jeu classique du serpent où vous devez manger des pommes et grandir sans vous mordre la queue.',
      controls: 'Utilisez les flèches directionnelles (↑ ↓ ← →) pour diriger le serpent.',
      features: [
        'Score en temps réel',
        'Meilleur score sauvegardé',
        'Collision avec les murs et soi-même',
        'Génération aléatoire de nourriture'
      ]
    },
    tictactoe: {
      description: 'Jouez au morpion contre une IA intelligente. Le premier à aligner 3 symboles gagne !',
      controls: 'Cliquez sur une case pour placer votre symbole (X).',
      features: [
        'IA avec stratégie minimax',
        'Compteur de scores',
        'Détection automatique des victoires',
        'Interface intuitive'
      ]
    },
    memory: {
      description: 'Testez votre mémoire en retrouvant les paires de cartes. Moins de mouvements = meilleur score !',
      controls: 'Cliquez sur deux cartes pour les retourner et trouver les paires.',
      features: [
        'Grille 4x4 (8 paires)',
        'Compteur de mouvements',
        'Animation de retournement',
        'Feedback visuel'
      ]
    },
    pong: {
      description: 'Le jeu de raquette classique. Défendez votre but contre l\'IA !',
      controls: 'Utilisez les flèches ↑ ↓ pour déplacer votre raquette.',
      features: [
        'Physique de balle réaliste',
        'IA adaptative',
        'Système de score',
        'Contrôles fluides'
      ]
    },
    calculator: {
      description: 'Résolvez le plus de calculs possible en 60 secondes. Testez votre rapidité mentale !',
      controls: 'Tapez la réponse et appuyez sur Entrée ou cliquez sur Valider.',
      features: [
        'Questions aléatoires (+, -, ×)',
        'Timer de 60 secondes',
        'Score en temps réel',
        'Feedback immédiat'
      ]
    }
  }
  
  const gameInfo = descriptions[gameId] || {
    description: 'Un jeu amusant créé avec Vue.js',
    controls: 'Suivez les instructions à l\'écran',
    features: ['Interface moderne', 'Responsive', 'Facile à jouer']
  }
  
  return `# ${gameName}

${gameInfo.description}

## 🎮 Comment jouer

${gameInfo.controls}

## ✨ Fonctionnalités

${gameInfo.features.map(f => `- ${f}`).join('\n')}

## 🛠️ Technologies

- Vue.js 3
- JavaScript ES6+
- CSS3

## 📦 Installation

1. Copiez le fichier \`${gameName.replace(/\s+/g, '')}.vue\` dans votre projet Vue.js
2. Importez le composant dans votre application
3. Utilisez-le dans votre template

## 🚀 Utilisation

\`\`\`vue
<template>
  <${gameName.replace(/\s+/g, '')} />
</template>

<script setup>
import ${gameName.replace(/\s+/g, '')} from './components/${gameName.replace(/\s+/g, '')}.vue'
<\/script>
\`\`\`

## 📝 Notes

Ce jeu fait partie de la collection "Jeux Vidéo & Geeks Connection" du portfolio d'Emmanuel Korekou.

Profitez bien ! 🎮
`
}

const downloadFile = (filename, content) => {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.games-module {
  width: 100%;
}

.module-header {
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-thick) solid var(--card-border);
  color: white;
  box-shadow: var(--shadow-game);
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

.games-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: var(--border-thick) solid var(--card-border);
}

.tab-button {
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 1rem;
  font-weight: 600;
  color: var(--light-gray);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-button :deep(svg) {
  width: 1.125rem;
  height: 1.125rem;
}

.tab-button:hover {
  color: var(--dark-gray);
}

.tab-button.active {
  color: var(--accent-primary);
  border-bottom-color: var(--accent-primary);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.game-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--card-border);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
  backdrop-filter: blur(var(--glass-blur));
}

.game-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.15);
  border-color: var(--card-border-hover);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.game-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.game-type {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--accent-light);
  color: var(--dark-gray);
  border: 2px solid var(--card-border);
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(var(--glass-blur));
}

.game-type :deep(svg) {
  width: 0.75rem;
  height: 0.75rem;
}

.game-description {
  font-size: 0.95rem;
  color: var(--light-gray);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.game-actions {
  display: flex;
  gap: 0.75rem;
}

.game-actions .btn {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
}

.game-actions .btn :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.game-container {
  margin-top: 0;
  width: 100%;
}

.game-header-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: var(--border-thick) solid var(--card-border);
}

.game-header-bar .btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.game-header-bar h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.game-area {
  background: var(--card-bg);
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--card-border);
  padding: 2rem;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(var(--glass-blur));
}

.offline-info {
  background: var(--accent-light);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  backdrop-filter: blur(var(--glass-blur));
}

.offline-info :deep(svg) {
  color: var(--dark-gray);
  flex-shrink: 0;
}

.offline-info p {
  margin: 0;
  font-weight: 600;
  color: var(--dark-gray);
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .games-tabs {
    flex-direction: column;
  }
  
  .tab-button {
    width: 100%;
    text-align: left;
  }
  
  .game-actions {
    flex-direction: column;
  }
}
</style>
