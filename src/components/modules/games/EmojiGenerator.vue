<template>
  <div class="emoji-generator">
    <div class="generator-header">
      <h3 class="generator-title">Générateur d'Emojis</h3>
      <p class="generator-subtitle">Tapez un mot ou une phrase et obtenez l'emoji correspondant en français et en anglais</p>
    </div>
    
    <div class="generator-input-section">
      <div class="input-group">
        <IconWrapper name="lightbulb" size="md" class="input-icon" />
        <input 
          type="text" 
          v-model="inputText" 
          @input="generateEmojis"
          placeholder="Tapez un mot (ex: bonjour, hello, happy, joyeux...)"
          class="emoji-input"
        />
      </div>
      <button class="btn btn-primary" @click="clearInput">
        <IconWrapper name="code" size="sm" />
        <span>Effacer</span>
      </button>
    </div>
    
    <div v-if="emojis.length > 0" class="results-section">
      <div class="result-card">
        <div class="result-header">
          <IconWrapper name="sparkles" size="md" />
          <h4>Résultats</h4>
        </div>
        <div class="emojis-grid">
          <div 
            v-for="(emoji, index) in emojis" 
            :key="index"
            class="emoji-item"
            @click="copyEmoji(emoji.emoji)"
          >
            <div class="emoji-display">{{ emoji.emoji }}</div>
            <div class="emoji-info">
              <div class="emoji-name">{{ emoji.name }}</div>
              <div class="emoji-lang">{{ emoji.language }}</div>
            </div>
            <div class="copy-hint">Cliquez pour copier</div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="inputText && !isGenerating" class="no-results">
      <p>Aucun emoji trouvé pour "{{ inputText }}"</p>
      <p class="hint">Essayez avec d'autres mots comme : bonjour, hello, happy, sad, love, cœur, etc.</p>
    </div>
    
    <div class="suggestions">
      <h4>Suggestions rapides :</h4>
      <div class="suggestion-tags">
        <button 
          v-for="suggestion in suggestions" 
          :key="suggestion"
          class="suggestion-tag"
          @click="useSuggestion(suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import IconWrapper from '../../icons/IconWrapper.vue'

const inputText = ref('')
const emojis = ref([])
const isGenerating = ref(false)

const suggestions = [
  'Bonjour', 'Hello', 'Happy', 'Joyeux', 'Love', 'Amour', 
  'Sad', 'Triste', 'Angry', 'En colère', 'Fire', 'Feu',
  'Star', 'Étoile', 'Heart', 'Cœur', 'Smile', 'Sourire'
]

// Base de données d'emojis avec traductions
const emojiDatabase = {
  // Salutations
  'bonjour': { emoji: '👋', name: 'Salut', language: 'FR' },
  'hello': { emoji: '👋', name: 'Hello', language: 'EN' },
  'salut': { emoji: '👋', name: 'Salut', language: 'FR' },
  'hi': { emoji: '👋', name: 'Hi', language: 'EN' },
  
  // Émotions positives
  'happy': { emoji: '😊', name: 'Happy', language: 'EN' },
  'joyeux': { emoji: '😊', name: 'Joyeux', language: 'FR' },
  'heureux': { emoji: '😊', name: 'Heureux', language: 'FR' },
  'joy': { emoji: '😊', name: 'Joy', language: 'EN' },
  'smile': { emoji: '😄', name: 'Smile', language: 'EN' },
  'sourire': { emoji: '😄', name: 'Sourire', language: 'FR' },
  'laugh': { emoji: '😂', name: 'Laugh', language: 'EN' },
  'rire': { emoji: '😂', name: 'Rire', language: 'FR' },
  
  // Amour
  'love': { emoji: '❤️', name: 'Love', language: 'EN' },
  'amour': { emoji: '❤️', name: 'Amour', language: 'FR' },
  'heart': { emoji: '❤️', name: 'Heart', language: 'EN' },
  'cœur': { emoji: '❤️', name: 'Cœur', language: 'FR' },
  'coeur': { emoji: '❤️', name: 'Cœur', language: 'FR' },
  
  // Émotions négatives
  'sad': { emoji: '😢', name: 'Sad', language: 'EN' },
  'triste': { emoji: '😢', name: 'Triste', language: 'FR' },
  'angry': { emoji: '😠', name: 'Angry', language: 'EN' },
  'en colère': { emoji: '😠', name: 'En colère', language: 'FR' },
  'colère': { emoji: '😠', name: 'Colère', language: 'FR' },
  
  // Éléments
  'fire': { emoji: '🔥', name: 'Fire', language: 'EN' },
  'feu': { emoji: '🔥', name: 'Feu', language: 'FR' },
  'star': { emoji: '⭐', name: 'Star', language: 'EN' },
  'étoile': { emoji: '⭐', name: 'Étoile', language: 'FR' },
  'etoile': { emoji: '⭐', name: 'Étoile', language: 'FR' },
  'sun': { emoji: '☀️', name: 'Sun', language: 'EN' },
  'soleil': { emoji: '☀️', name: 'Soleil', language: 'FR' },
  'moon': { emoji: '🌙', name: 'Moon', language: 'EN' },
  'lune': { emoji: '🌙', name: 'Lune', language: 'FR' },
  
  // Actions
  'thumbs up': { emoji: '👍', name: 'Thumbs Up', language: 'EN' },
  'pouce': { emoji: '👍', name: 'Pouce', language: 'FR' },
  'ok': { emoji: '👌', name: 'OK', language: 'EN/FR' },
  'check': { emoji: '✅', name: 'Check', language: 'EN' },
  'coche': { emoji: '✅', name: 'Coche', language: 'FR' },
  
  // Tech
  'computer': { emoji: '💻', name: 'Computer', language: 'EN' },
  'ordinateur': { emoji: '💻', name: 'Ordinateur', language: 'FR' },
  'code': { emoji: '💻', name: 'Code', language: 'EN/FR' },
  'rocket': { emoji: '🚀', name: 'Rocket', language: 'EN' },
  'fusée': { emoji: '🚀', name: 'Fusée', language: 'FR' },
  'fusee': { emoji: '🚀', name: 'Fusée', language: 'FR' },
  
  // Animaux
  'cat': { emoji: '🐱', name: 'Cat', language: 'EN' },
  'chat': { emoji: '🐱', name: 'Chat', language: 'FR' },
  'dog': { emoji: '🐶', name: 'Dog', language: 'EN' },
  'chien': { emoji: '🐶', name: 'Chien', language: 'FR' },
  
  // Nourriture
  'pizza': { emoji: '🍕', name: 'Pizza', language: 'EN/FR' },
  'cake': { emoji: '🎂', name: 'Cake', language: 'EN' },
  'gâteau': { emoji: '🎂', name: 'Gâteau', language: 'FR' },
  'gateau': { emoji: '🎂', name: 'Gâteau', language: 'FR' },
  'coffee': { emoji: '☕', name: 'Coffee', language: 'EN' },
  'café': { emoji: '☕', name: 'Café', language: 'FR' },
  'cafe': { emoji: '☕', name: 'Café', language: 'FR' }
}

const generateEmojis = () => {
  if (!inputText.value.trim()) {
    emojis.value = []
    return
  }
  
  isGenerating.value = true
  const searchTerm = inputText.value.toLowerCase().trim()
  const results = []
  
  // Chercher dans la base de données
  for (const [key, value] of Object.entries(emojiDatabase)) {
    if (key.includes(searchTerm) || searchTerm.includes(key)) {
      results.push({
        emoji: value.emoji,
        name: value.name,
        language: value.language,
        keyword: key
      })
    }
  }
  
  // Si pas de résultat exact, chercher des correspondances partielles
  if (results.length === 0) {
    for (const [key, value] of Object.entries(emojiDatabase)) {
      if (key.startsWith(searchTerm) || searchTerm.startsWith(key)) {
        results.push({
          emoji: value.emoji,
          name: value.name,
          language: value.language,
          keyword: key
        })
      }
    }
  }
  
  // Éliminer les doublons
  const uniqueResults = []
  const seen = new Set()
  for (const result of results) {
    const key = `${result.emoji}-${result.name}`
    if (!seen.has(key)) {
      seen.add(key)
      uniqueResults.push(result)
    }
  }
  
  emojis.value = uniqueResults.slice(0, 12) // Limiter à 12 résultats
  isGenerating.value = false
}

const useSuggestion = (suggestion) => {
  inputText.value = suggestion
  generateEmojis()
}

const clearInput = () => {
  inputText.value = ''
  emojis.value = []
}

const copyEmoji = async (emoji) => {
  try {
    await navigator.clipboard.writeText(emoji)
    // Feedback visuel pourrait être ajouté ici
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
  }
}

watch(inputText, () => {
  if (inputText.value) {
    generateEmojis()
  } else {
    emojis.value = []
  }
})
</script>

<style scoped>
.emoji-generator {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.generator-header {
  text-align: center;
  margin-bottom: 2rem;
}

.generator-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.generator-subtitle {
  font-size: 1rem;
  color: var(--light-gray);
}

.generator-input-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--surface-bg);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  backdrop-filter: blur(var(--glass-blur));
}

.input-icon {
  color: var(--accent-primary);
  flex-shrink: 0;
}

.emoji-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  color: var(--dark-gray);
  outline: none;
}

.emoji-input::placeholder {
  color: var(--light-gray);
}

.results-section {
  margin-bottom: 2rem;
}

.result-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 1.25rem;
  border: var(--border-thick) solid var(--card-border);
  box-shadow: var(--shadow-game);
  backdrop-filter: blur(var(--glass-blur));
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.result-header h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
}

.result-header :deep(svg) {
  color: var(--accent-primary);
}

.emojis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.emoji-item {
  background: var(--card-bg);
  padding: 1.25rem;
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  backdrop-filter: blur(var(--glass-blur));
}

.emoji-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
  background: var(--accent-light);
  border-color: var(--card-border-hover);
}

.emoji-display {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.emoji-info {
  margin-bottom: 0.5rem;
}

.emoji-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dark-gray);
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 0.25rem;
}

.emoji-lang {
  font-size: 0.75rem;
  color: var(--light-gray);
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  background: var(--accent-light);
  border-radius: 0.5rem;
  display: inline-block;
}

.copy-hint {
  font-size: 0.75rem;
  color: var(--light-gray);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.emoji-item:hover .copy-hint {
  opacity: 1;
}

.no-results {
  text-align: center;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  margin-bottom: 2rem;
  backdrop-filter: blur(var(--glass-blur));
}

.no-results p {
  color: var(--light-gray);
  margin-bottom: 0.5rem;
}

.hint {
  font-size: 0.9rem;
  color: var(--light-gray);
}

.suggestions {
  margin-top: 2rem;
}

.suggestions h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
}

.suggestion-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.suggestion-tag {
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: var(--border-thick) solid var(--card-border);
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark-gray);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  backdrop-filter: blur(var(--glass-blur));
}

.suggestion-tag:hover {
  background: var(--accent-primary);
  color: var(--white);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .generator-input-section {
    flex-direction: column;
  }
  
  .emojis-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .emoji-display {
    font-size: 2.5rem;
  }
}
</style>
