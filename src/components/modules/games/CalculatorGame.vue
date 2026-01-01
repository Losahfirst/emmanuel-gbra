<template>
  <div class="calculator-game">
    <div class="game-header">
      <div class="game-info">
        <div class="score">Score: {{ score }}</div>
        <div class="time">Temps: {{ timeLeft }}s</div>
      </div>
      <button class="btn btn-primary" @click="startGame" v-if="!gameRunning">Commencer</button>
      <button class="btn btn-secondary" @click="stopGame" v-if="gameRunning">Arrêter</button>
    </div>
    
    <div v-if="gameRunning" class="game-area">
      <div class="question">
        <h2>{{ currentQuestion }}</h2>
      </div>
      <div class="answer-input">
        <input 
          type="number" 
          v-model="userAnswer" 
          @keyup.enter="checkAnswer"
          placeholder="Votre réponse"
          class="answer-field"
        />
        <button class="btn btn-primary" @click="checkAnswer">Valider</button>
      </div>
      <div class="feedback" v-if="showFeedback">
        <p :class="feedbackClass">{{ feedback }}</p>
      </div>
    </div>
    
    <div v-else class="welcome-message">
      <h3>🧮 Calculator Challenge</h3>
      <p>Résolvez le plus de calculs possible en 60 secondes !</p>
      <p>Appuyez sur "Commencer" pour démarrer</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const gameRunning = ref(false)
const score = ref(0)
const timeLeft = ref(60)
const currentQuestion = ref('')
const correctAnswer = ref(0)
const userAnswer = ref(null)
const showFeedback = ref(false)
const feedback = ref('')
const feedbackClass = ref('')

let timer = null
let questionTimer = null

const generateQuestion = () => {
  const operations = ['+', '-', '*']
  const op = operations[Math.floor(Math.random() * operations.length)]
  let a, b
  
  if (op === '*') {
    a = Math.floor(Math.random() * 10) + 1
    b = Math.floor(Math.random() * 10) + 1
  } else {
    a = Math.floor(Math.random() * 50) + 1
    b = Math.floor(Math.random() * 50) + 1
  }
  
  let answer
  switch(op) {
    case '+':
      answer = a + b
      break
    case '-':
      if (a < b) [a, b] = [b, a]
      answer = a - b
      break
    case '*':
      answer = a * b
      break
  }
  
  currentQuestion.value = `${a} ${op} ${b} = ?`
  correctAnswer.value = answer
  userAnswer.value = null
  showFeedback.value = false
}

const checkAnswer = () => {
  if (userAnswer.value === null || userAnswer.value === '') return
  
  if (parseInt(userAnswer.value) === correctAnswer.value) {
    score.value++
    feedback.value = '✅ Correct !'
    feedbackClass.value = 'correct'
  } else {
    feedback.value = `❌ Incorrect ! La réponse était ${correctAnswer.value}`
    feedbackClass.value = 'incorrect'
  }
  
  showFeedback.value = true
  setTimeout(() => {
    generateQuestion()
  }, 1500)
}

const startGame = () => {
  gameRunning.value = true
  score.value = 0
  timeLeft.value = 60
  generateQuestion()
  
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      stopGame()
    }
  }, 1000)
}

const stopGame = () => {
  gameRunning.value = false
  if (timer) clearInterval(timer)
  if (questionTimer) clearInterval(questionTimer)
  
  alert(`Temps écoulé ! Votre score: ${score.value} points`)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (questionTimer) clearInterval(questionTimer)
})
</script>

<style scoped>
.calculator-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 400px;
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
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.score {
  color: var(--accent-primary);
}

.time {
  color: var(--primary-teal);
}

.game-area {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.question {
  text-align: center;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  width: 100%;
  backdrop-filter: blur(var(--glass-blur));
}

.question h2 {
  font-size: 3rem;
  font-weight: 800;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
  margin: 0;
}

.answer-input {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.answer-field {
  flex: 1;
  padding: 1rem;
  border: var(--border-thick) solid var(--card-border);
  border-radius: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
  background: var(--surface-bg);
}

.answer-field:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px var(--glow-primary);
}

.feedback {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback p {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
}

.feedback .correct {
  color: var(--primary-teal);
}

.feedback .incorrect {
  color: var(--accent-danger);
}

.welcome-message {
  text-align: center;
  padding: 2rem;
}

.welcome-message h3 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
}

.welcome-message p {
  font-size: 1.125rem;
  color: var(--light-gray);
  margin-bottom: 0.5rem;
}

@media (max-width: 480px) {
  .question h2 {
    font-size: 2rem;
  }
  
  .answer-input {
    flex-direction: column;
  }
  
  .game-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
