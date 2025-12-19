<template>
  <div class="memory-game">
    <div class="game-header">
      <div class="game-info">
        <div class="moves">Mouvements: {{ moves }}</div>
        <div class="pairs">Paires trouvées: {{ pairsFound }}/{{ totalPairs }}</div>
      </div>
      <button class="btn btn-secondary" @click="resetGame">Nouvelle partie</button>
    </div>
    <div class="cards-grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="['card', { flipped: card.flipped, matched: card.matched }]"
        @click="flipCard(index)"
      >
        <div class="card-front">?</div>
        <div class="card-back">{{ card.value }}</div>
      </div>
    </div>
    <div v-if="gameWon" class="win-message">
      <h3>🎉 Félicitations !</h3>
      <p>Vous avez trouvé toutes les paires en {{ moves }} mouvements !</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const gridSize = ref(4)
const cards = ref([])
const flippedCards = ref([])
const moves = ref(0)
const pairsFound = ref(0)
const gameWon = ref(false)

const totalPairs = computed(() => (gridSize.value * gridSize.value) / 2)

const emojis = ['🎮', '🚀', '💻', '🎯', '⚡', '🔥', '🌟', '💡']

const initializeGame = () => {
  const values = []
  for (let i = 0; i < totalPairs.value; i++) {
    values.push(emojis[i % emojis.length])
    values.push(emojis[i % emojis.length])
  }
  
  // Mélanger
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]]
  }
  
  cards.value = values.map(value => ({
    value,
    flipped: false,
    matched: false
  }))
  
  moves.value = 0
  pairsFound.value = 0
  gameWon.value = false
  flippedCards.value = []
}

const flipCard = (index) => {
  const card = cards.value[index]
  
  if (card.flipped || card.matched || flippedCards.value.length >= 2) return
  
  card.flipped = true
  flippedCards.value.push(index)
  
  if (flippedCards.value.length === 2) {
    moves.value++
    setTimeout(checkMatch, 500)
  }
}

const checkMatch = () => {
  const [first, second] = flippedCards.value
  const card1 = cards.value[first]
  const card2 = cards.value[second]
  
  if (card1.value === card2.value) {
    card1.matched = true
    card2.matched = true
    pairsFound.value++
    
    if (pairsFound.value === totalPairs.value) {
      gameWon.value = true
    }
  } else {
    card1.flipped = false
    card2.flipped = false
  }
  
  flippedCards.value = []
}

const resetGame = () => {
  initializeGame()
}

onMounted(() => {
  initializeGame()
})
</script>

<style scoped>
.memory-game {
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
  width: 100%;
}

.game-info {
  display: flex;
  gap: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.moves {
  color: var(--accent-orange);
}

.pairs {
  color: var(--primary-teal);
}

.cards-grid {
  display: grid;
  gap: 0.75rem;
  max-width: 500px;
  width: 100%;
}

.card {
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  perspective: 1000px;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: var(--border-thick) solid var(--border-color);
  transition: transform 0.3s ease;
}

.card-front {
  background: var(--accent-orange);
  color: var(--white);
  transform: rotateY(0deg);
}

.card-back {
  background: var(--white);
  color: var(--dark-gray);
  transform: rotateY(180deg);
}

.card.flipped .card-front {
  transform: rotateY(180deg);
}

.card.flipped .card-back {
  transform: rotateY(0deg);
}

.card.matched {
  opacity: 0.5;
  cursor: not-allowed;
}

.card.matched .card-back {
  background: var(--primary-teal);
  color: var(--white);
}

.win-message {
  text-align: center;
  padding: 2rem;
  background: var(--accent-yellow);
  border-radius: 1rem;
  border: var(--border-thick) solid var(--border-color);
}

.win-message h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.win-message p {
  font-size: 1.125rem;
  color: var(--dark-gray);
  font-weight: 600;
}

@media (max-width: 480px) {
  .cards-grid {
    max-width: 350px;
  }
  
  .card-front,
  .card-back {
    font-size: 1.5rem;
  }
  
  .game-info {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
