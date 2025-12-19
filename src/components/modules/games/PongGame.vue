<template>
  <div class="pong-game">
    <div class="game-info">
      <div class="score">Vous: {{ playerScore }} | IA: {{ aiScore }}</div>
    </div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" class="game-canvas"></canvas>
    <div class="game-controls">
      <button class="btn btn-primary" @click="startGame" v-if="!gameRunning">Commencer</button>
      <button class="btn btn-secondary" @click="resetGame" v-if="gameRunning">Réinitialiser</button>
      <div class="instructions">
        <p>Utilisez les flèches ↑ ↓ pour déplacer votre raquette</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const canvasWidth = ref(600)
const canvasHeight = ref(400)
const playerScore = ref(0)
const aiScore = ref(0)
const gameRunning = ref(false)

let ctx = null
let gameLoop = null
const paddleHeight = 80
const paddleWidth = 10
const ballSize = 10

let playerY = canvasHeight.value / 2 - paddleHeight / 2
let aiY = canvasHeight.value / 2 - paddleHeight / 2
let ballX = canvasWidth.value / 2
let ballY = canvasHeight.value / 2
let ballSpeedX = 5
let ballSpeedY = 3
let keys = { up: false, down: false }

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
  }
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  draw()
})

onUnmounted(() => {
  if (gameLoop) clearInterval(gameLoop)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})

const handleKeyDown = (e) => {
  if (e.key === 'ArrowUp') keys.up = true
  if (e.key === 'ArrowDown') keys.down = true
}

const handleKeyUp = (e) => {
  if (e.key === 'ArrowUp') keys.up = false
  if (e.key === 'ArrowDown') keys.down = false
}

const startGame = () => {
  gameRunning.value = true
  resetBall()
  gameLoop = setInterval(update, 16)
}

const resetGame = () => {
  gameRunning.value = false
  if (gameLoop) clearInterval(gameLoop)
  playerScore.value = 0
  aiScore.value = 0
  playerY = canvasHeight.value / 2 - paddleHeight / 2
  aiY = canvasHeight.value / 2 - paddleHeight / 2
  resetBall()
  draw()
}

const resetBall = () => {
  ballX = canvasWidth.value / 2
  ballY = canvasHeight.value / 2
  ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 5
  ballSpeedY = (Math.random() * 2 - 1) * 3
}

const update = () => {
  // Déplacer le joueur
  if (keys.up && playerY > 0) {
    playerY -= 7
  }
  if (keys.down && playerY < canvasHeight.value - paddleHeight) {
    playerY += 7
  }
  
  // IA simple
  const aiCenter = aiY + paddleHeight / 2
  if (aiCenter < ballY - 10) {
    aiY += 5
  } else if (aiCenter > ballY + 10) {
    aiY -= 5
  }
  aiY = Math.max(0, Math.min(canvasHeight.value - paddleHeight, aiY))
  
  // Déplacer la balle
  ballX += ballSpeedX
  ballY += ballSpeedY
  
  // Collisions avec les murs
  if (ballY <= 0 || ballY >= canvasHeight.value - ballSize) {
    ballSpeedY = -ballSpeedY
  }
  
  // Collision avec la raquette du joueur
  if (ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
    ballSpeedX = -ballSpeedX
    ballX = paddleWidth
  }
  
  // Collision avec la raquette de l'IA
  if (ballX >= canvasWidth.value - paddleWidth - ballSize && 
      ballY >= aiY && ballY <= aiY + paddleHeight) {
    ballSpeedX = -ballSpeedX
    ballX = canvasWidth.value - paddleWidth - ballSize
  }
  
  // Score
  if (ballX < 0) {
    aiScore.value++
    resetBall()
  }
  if (ballX > canvasWidth.value) {
    playerScore.value++
    resetBall()
  }
  
  draw()
}

const draw = () => {
  if (!ctx) return
  
  // Fond
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  // Ligne centrale
  ctx.setLineDash([5, 5])
  ctx.strokeStyle = '#4ECDC4'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(canvasWidth.value / 2, 0)
  ctx.lineTo(canvasWidth.value / 2, canvasHeight.value)
  ctx.stroke()
  ctx.setLineDash([])
  
  // Raquette du joueur
  ctx.fillStyle = '#FF6B35'
  ctx.fillRect(0, playerY, paddleWidth, paddleHeight)
  
  // Raquette de l'IA
  ctx.fillStyle = '#4ECDC4'
  ctx.fillRect(canvasWidth.value - paddleWidth, aiY, paddleWidth, paddleHeight)
  
  // Balle
  ctx.fillStyle = '#FFD23F'
  ctx.fillRect(ballX, ballY, ballSize, ballSize)
}
</script>

<style scoped>
.pong-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.game-info {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.score {
  color: var(--accent-orange);
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
    max-width: 100%;
    height: auto;
  }
}
</style>
