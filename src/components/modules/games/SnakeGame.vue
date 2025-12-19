<template>
  <div class="snake-game">
    <div class="game-info">
      <div class="score">Score: {{ score }}</div>
      <div class="high-score">Meilleur: {{ highScore }}</div>
    </div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" class="game-canvas"></canvas>
    <div class="game-controls">
      <button class="btn btn-primary" @click="startGame" v-if="!gameRunning">Commencer</button>
      <button class="btn btn-secondary" @click="resetGame" v-if="gameRunning">Réinitialiser</button>
      <div class="instructions">
        <p>Utilisez les flèches du clavier pour diriger le serpent</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const canvasWidth = ref(400)
const canvasHeight = ref(400)
const score = ref(0)
const highScore = ref(0)
const gameRunning = ref(false)

let ctx = null
let snake = [{ x: 200, y: 200 }]
let direction = { x: 0, y: 0 }
let food = { x: 0, y: 0 }
let gameLoop = null
const gridSize = 20
const tileCount = canvasWidth.value / gridSize

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    generateFood()
    const saved = localStorage.getItem('snakeHighScore')
    if (saved) highScore.value = parseInt(saved)
  }
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  if (gameLoop) clearInterval(gameLoop)
  window.removeEventListener('keydown', handleKeyPress)
})

const generateFood = () => {
  food.x = Math.floor(Math.random() * tileCount) * gridSize
  food.y = Math.floor(Math.random() * tileCount) * gridSize
}

const startGame = () => {
  gameRunning.value = true
  direction = { x: 0, y: 0 }
  snake = [{ x: 200, y: 200 }]
  score.value = 0
  generateFood()
  gameLoop = setInterval(update, 100)
}

const resetGame = () => {
  gameRunning.value = false
  if (gameLoop) clearInterval(gameLoop)
  snake = [{ x: 200, y: 200 }]
  direction = { x: 0, y: 0 }
  score.value = 0
  generateFood()
  draw()
}

const handleKeyPress = (e) => {
  if (!gameRunning.value) return
  
  switch(e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -gridSize }
      break
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: gridSize }
      break
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -gridSize, y: 0 }
      break
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: gridSize, y: 0 }
      break
  }
}

const update = () => {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
  
  // Vérifier les collisions avec les murs
  if (head.x < 0 || head.x >= canvasWidth.value || head.y < 0 || head.y >= canvasHeight.value) {
    gameOver()
    return
  }
  
  // Vérifier collision avec soi-même
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      gameOver()
      return
    }
  }
  
  snake.unshift(head)
  
  // Manger la nourriture
  if (head.x === food.x && head.y === food.y) {
    score.value++
    generateFood()
  } else {
    snake.pop()
  }
  
  draw()
}

const draw = () => {
  if (!ctx) return
  
  // Fond
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  // Serpent
  ctx.fillStyle = '#4ECDC4'
  snake.forEach((segment, index) => {
    if (index === 0) {
      ctx.fillStyle = '#FF6B35'
    } else {
      ctx.fillStyle = '#4ECDC4'
    }
    ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2)
  })
  
  // Nourriture
  ctx.fillStyle = '#FFD23F'
  ctx.fillRect(food.x, food.y, gridSize - 2, gridSize - 2)
}

const gameOver = () => {
  gameRunning.value = false
  if (gameLoop) clearInterval(gameLoop)
  
  if (score.value > highScore.value) {
    highScore.value = score.value
    localStorage.setItem('snakeHighScore', score.value.toString())
  }
  
  alert(`Game Over! Score: ${score.value}`)
}
</script>

<style scoped>
.snake-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.game-info {
  display: flex;
  gap: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.score {
  color: var(--accent-orange);
}

.high-score {
  color: var(--primary-teal);
}

.game-canvas {
  border: var(--border-thick) solid var(--border-color);
  border-radius: 1rem;
  background: #1a1a1a;
  box-shadow: var(--shadow-game);
}

.game-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.instructions {
  font-size: 0.9rem;
  color: var(--light-gray);
  text-align: center;
}

@media (max-width: 480px) {
  .game-canvas {
    width: 100%;
    max-width: 350px;
    height: auto;
  }
}
</style>
