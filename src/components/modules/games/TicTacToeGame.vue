<template>
  <div class="tic-tac-toe-game">
    <div class="game-header">
      <div class="game-status">{{ gameStatus }}</div>
      <button class="btn btn-secondary" @click="resetGame">Nouvelle partie</button>
    </div>
    <div class="board">
      <div 
        v-for="(cell, index) in board" 
        :key="index"
        :class="['cell', { disabled: cell !== '' || winner }]"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>
    <div class="game-info">
      <div class="score-board">
        <div class="score-item">
          <span class="score-label">Vous (X):</span>
          <span class="score-value">{{ playerScore }}</span>
        </div>
        <div class="score-item">
          <span class="score-label">IA (O):</span>
          <span class="score-value">{{ aiScore }}</span>
        </div>
        <div class="score-item">
          <span class="score-label">Égalités:</span>
          <span class="score-value">{{ ties }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const board = ref(Array(9).fill(''))
const currentPlayer = ref('X')
const winner = ref(null)
const playerScore = ref(0)
const aiScore = ref(0)
const ties = ref(0)

const gameStatus = computed(() => {
  if (winner.value) {
    return winner.value === 'X' ? '🎉 Vous avez gagné !' : '🤖 L\'IA a gagné !'
  }
  if (board.value.every(cell => cell !== '')) {
    return '🤝 Match nul !'
  }
  return currentPlayer.value === 'X' ? 'Votre tour' : 'Tour de l\'IA...'
})

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const checkWinner = () => {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo
    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
      winner.value = board.value[a]
      if (board.value[a] === 'X') {
        playerScore.value++
      } else {
        aiScore.value++
      }
      return true
  }
  }
  if (board.value.every(cell => cell !== '')) {
    ties.value++
    return true
  }
  return false
}

const makeMove = (index) => {
  if (board.value[index] !== '' || winner.value || currentPlayer.value !== 'X') return
  
  board.value[index] = 'X'
  
  if (!checkWinner()) {
    currentPlayer.value = 'O'
    setTimeout(() => aiMove(), 500)
  }
}

const aiMove = () => {
  if (winner.value) return
  
  // Stratégie minimax simplifiée
  let bestMove = findBestMove()
  if (bestMove !== -1) {
    board.value[bestMove] = 'O'
    checkWinner()
    currentPlayer.value = 'X'
  }
}

const findBestMove = () => {
  // Essayer de gagner
  for (let i = 0; i < 9; i++) {
    if (board.value[i] === '') {
      board.value[i] = 'O'
      if (checkWinner()) {
        board.value[i] = ''
        return i
      }
      board.value[i] = ''
    }
  }
  
  // Bloquer le joueur
  for (let i = 0; i < 9; i++) {
    if (board.value[i] === '') {
      board.value[i] = 'X'
      if (checkWinner()) {
        board.value[i] = ''
        return i
      }
      board.value[i] = ''
    }
  }
  
  // Prendre le centre
  if (board.value[4] === '') return 4
  
  // Prendre un coin
  const corners = [0, 2, 6, 8]
  for (let corner of corners) {
    if (board.value[corner] === '') return corner
  }
  
  // Prendre n'importe quelle case libre
  for (let i = 0; i < 9; i++) {
    if (board.value[i] === '') return i
  }
  
  return -1
}

const resetGame = () => {
  board.value = Array(9).fill('')
  currentPlayer.value = 'X'
  winner.value = null
}
</script>

<style scoped>
.tic-tac-toe-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.game-status {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 300px;
  height: 300px;
}

.cell {
  background: var(--bg-light);
  border: var(--border-thick) solid var(--border-color);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  color: var(--dark-gray);
}

.cell:hover:not(.disabled) {
  background: var(--accent-yellow);
  transform: scale(1.05);
}

.cell.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.score-board {
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: var(--bg-light);
  border-radius: 1rem;
  border: var(--border-thick) solid var(--border-color);
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.score-label {
  font-size: 0.9rem;
  color: var(--light-gray);
  font-weight: 600;
}

.score-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-orange);
  font-family: 'Space Grotesk', sans-serif;
}

@media (max-width: 480px) {
  .board {
    width: 250px;
    height: 250px;
  }
  
  .cell {
    font-size: 2.5rem;
  }
  
  .score-board {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
