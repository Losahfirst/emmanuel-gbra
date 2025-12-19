<template>
  <div class="tech-logo" :style="sizeClass">
    <img 
      v-if="logoUrl" 
      :src="logoUrl" 
      :alt="name"
      class="tech-logo-image"
      @error="handleError"
    />
    <div v-else class="tech-logo-fallback">
      <span class="tech-logo-text">{{ name }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

const imageError = ref(false)

const sizeClass = computed(() => {
  const sizes = {
    'sm': { width: '2rem', height: '2rem' },
    'md': { width: '3rem', height: '3rem' },
    'lg': { width: '4rem', height: '4rem' }
  }
  return sizes[props.size] || sizes.md
})

// Mapping des technologies vers leurs logos (utilisant simpleicons.org CDN)
const logoMap = {
  'Python': 'https://cdn.simpleicons.org/python/3776AB',
  'Django': 'https://cdn.simpleicons.org/django/092E20',
  'Flask': 'https://cdn.simpleicons.org/flask/000000',
  'Vue.js': 'https://cdn.simpleicons.org/vuedotjs/4FC08D',
  'React.js': 'https://cdn.simpleicons.org/react/61DAFB',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
  'PostgreSQL': 'https://cdn.simpleicons.org/postgresql/4169E1',
  'Scikit-learn': 'https://cdn.simpleicons.org/scikitlearn/F7931E',
  'PyTorch': 'https://cdn.simpleicons.org/pytorch/EE4C2C',
  'Docker': 'https://cdn.simpleicons.org/docker/2496ED',
  'Git': 'https://cdn.simpleicons.org/git/F05032',
  'Firebase': 'https://cdn.simpleicons.org/firebase/FFCA28',
  'Flutter': 'https://cdn.simpleicons.org/flutter/02569B',
  'Postman': 'https://cdn.simpleicons.org/postman/FF6C37',
  'Hugging Face': 'https://cdn.simpleicons.org/huggingface/FFD21E',
  'SQL': 'https://cdn.simpleicons.org/postgresql/4169E1',
  'ESP32': 'https://cdn.simpleicons.org/espressif/E7352C',
  'Random Forest': 'https://cdn.simpleicons.org/scikitlearn/F7931E',
  'XGBoost': 'https://cdn.simpleicons.org/scikitlearn/F7931E',
  'Transformers': 'https://cdn.simpleicons.org/huggingface/FFD21E',
  'MLOps': 'https://cdn.simpleicons.org/kubernetes/326CE5',
  'Deep Learning': 'https://cdn.simpleicons.org/pytorch/EE4C2C',
  'Big Data': 'https://cdn.simpleicons.org/apachespark/E25A1C',
  'ETL Pipelines': 'https://cdn.simpleicons.org/apacheairflow/017CEE',
  'Data Analysis': 'https://cdn.simpleicons.org/pandas/150458',
  'Internet des Objets': 'https://cdn.simpleicons.org/raspberrypi/A22846',
  'REST API': 'https://cdn.simpleicons.org/json/000000',
  'CI/CD': 'https://cdn.simpleicons.org/githubactions/2088FF',
  'Pytest': 'https://cdn.simpleicons.org/pytest/0A9EDC',
  'Agile': 'https://cdn.simpleicons.org/jira/0052CC',
  'GMAO': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkQB9MWSB7rPxqWhRTaAoqCmoGHBr0sORx9Q&s',
  'GTB': 'https://naxia.fr/wp-content/uploads/2022/10/GTB-GTC-NAXIA.png',
  'Computer vision': 'https://cdn-icons-png.freepik.com/512/15189/15189344.png'
}

const logoUrl = computed(() => {
  return logoMap[props.name] || null
})

const handleError = () => {
  imageError.value = true
}
</script>

<style scoped>
.tech-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tech-logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tech-logo-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}

.tech-logo-text {
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  text-align: center;
  line-height: 1;
}
</style>
