<template>
  <div class="tech-quiz-module">
    <div class="module-header" v-if="!quizStarted && !showResults">
      <div class="header-icon">
        <IconWrapper name="academic" size="xl" />
      </div>
      <h2 class="module-title">Quiz Technique</h2>
      <p class="module-subtitle">Testez vos connaissances avec des questions d'entretien tech (Amazon, Google, Facebook)</p>
    </div>

    <!-- Sélection de catégorie -->
    <div v-if="!quizStarted && !showResults" class="category-selection">
      <h3 class="category-title">Choisissez une catégorie :</h3>
      <div class="categories-grid">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card"
          @click="startQuiz(category.id)"
        >
          <div class="category-icon">
            <IconWrapper :name="category.icon" size="lg" />
          </div>
          <h4 class="category-name">{{ category.name }}</h4>
          <p class="category-description">{{ category.description }}</p>
          <div class="category-stats">
            <span>{{ category.questions.length }} questions</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz en cours -->
    <div v-if="quizStarted && !showResults" class="quiz-container">
      <div class="quiz-header">
        <div class="quiz-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${(currentQuestionIndex + 1) / currentCategory.questions.length * 100}%` }"></div>
          </div>
          <span class="progress-text">Question {{ currentQuestionIndex + 1 }} / {{ currentCategory.questions.length }}</span>
        </div>
        <div class="quiz-score">
          <IconWrapper name="sparkles" size="sm" />
          <span>Score: {{ score }}</span>
        </div>
      </div>

      <div class="question-card">
        <div class="question-header">
          <span class="question-difficulty" :class="getDifficultyClass(currentQuestion.difficulty)">
            {{ currentQuestion.difficulty }}
          </span>
          <span class="question-company" v-if="currentQuestion.company">
            <IconWrapper name="globe" size="xs" />
            {{ currentQuestion.company }}
          </span>
        </div>
        <h3 class="question-text">{{ currentQuestion.question }}</h3>
        <div class="question-options">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-button"
            :class="{ 
              'selected': selectedAnswer === index,
              'correct': showAnswer && index === currentQuestion.correct,
              'incorrect': showAnswer && selectedAnswer === index && index !== currentQuestion.correct
            }"
            @click="selectAnswer(index)"
            :disabled="showAnswer"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
            <span class="option-text">{{ option }}</span>
            <IconWrapper v-if="showAnswer && index === currentQuestion.correct" name="sparkles" size="sm" class="correct-icon" />
          </button>
        </div>
        <div v-if="showAnswer" class="answer-explanation">
          <h4>Explication :</h4>
          <p>{{ currentQuestion.explanation }}</p>
        </div>
        <div class="quiz-actions">
          <button 
            v-if="!showAnswer" 
            class="btn btn-primary" 
            @click="submitAnswer"
            :disabled="selectedAnswer === null"
          >
            Valider
          </button>
          <button 
            v-else 
            class="btn btn-primary" 
            @click="nextQuestion"
          >
            {{ currentQuestionIndex + 1 < currentCategory.questions.length ? 'Question suivante' : 'Voir les résultats' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Résultats -->
    <div v-if="showResults" class="results-container">
      <div class="results-header">
        <div class="results-icon">
          <IconWrapper name="sparkles" size="xl" />
        </div>
        <h2 class="results-title">Quiz terminé !</h2>
        <div class="final-score">
          <span class="score-value">{{ score }}</span>
          <span class="score-total">/ {{ currentCategory.questions.length }}</span>
        </div>
        <div class="score-percentage">
          {{ Math.round((score / currentCategory.questions.length) * 100) }}%
        </div>
        <div class="score-message">
          <p v-if="scorePercentage >= 80">Excellent ! Vous maîtrisez parfaitement ce sujet 🎉</p>
          <p v-else-if="scorePercentage >= 60">Bien joué ! Continuez à vous améliorer 💪</p>
          <p v-else>Bon début ! N'hésitez pas à réviser et réessayer 📚</p>
        </div>
        <div v-if="scorePercentage >= 60" class="achievement-badge">
          <div class="badge-icon">🏆</div>
          <p class="badge-text">Badge débloqué !</p>
        </div>
      </div>
      <div class="results-actions">
        <button v-if="scorePercentage >= 60" class="btn btn-primary" @click="downloadBadge">
          <IconWrapper name="sparkles" size="sm" />
          <span>Télécharger le Badge</span>
        </button>
        <button v-if="scorePercentage >= 60" class="btn btn-primary" @click="shareOnLinkedIn">
          <IconWrapper name="globe" size="sm" />
          <span>Partager sur LinkedIn</span>
        </button>
        <button class="btn btn-secondary" @click="restartQuiz">
          <IconWrapper name="sparkles" size="sm" />
          <span>Recommencer</span>
        </button>
        <button class="btn btn-secondary" @click="backToCategories">
          <IconWrapper name="code" size="sm" />
          <span>Autre catégorie</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import IconWrapper from '../icons/IconWrapper.vue'

const quizStarted = ref(false)
const showResults = ref(false)
const currentCategoryId = ref(null)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const showAnswer = ref(false)
const score = ref(0)

const categories = ref([
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'code',
    description: 'Questions sur JavaScript ES6+, closures, promises, etc.',
    questions: [
      {
        question: 'Quelle est la différence entre let, const et var en JavaScript ?',
        options: [
          'let et const sont block-scoped, var est function-scoped',
          'Ils sont tous identiques',
          'const permet la réassignation, let et var non',
          'var est plus moderne que let et const'
        ],
        correct: 0,
        difficulty: 'Moyen',
        company: 'Google',
        explanation: 'let et const sont block-scoped (portée limitée au bloc), tandis que var est function-scoped. const ne permet pas la réassignation, contrairement à let et var.'
      },
      {
        question: 'Qu\'est-ce qu\'une closure en JavaScript ?',
        options: [
          'Une fonction qui a accès aux variables de son scope parent',
          'Une méthode pour fermer une fonction',
          'Un type de boucle',
          'Une erreur JavaScript'
        ],
        correct: 0,
        difficulty: 'Difficile',
        company: 'Facebook',
        explanation: 'Une closure est une fonction qui a accès aux variables de son scope parent même après que le scope parent ait été exécuté. C\'est un concept fondamental en JavaScript.'
      },
      {
        question: 'Quelle méthode permet de transformer un array en un autre array ?',
        options: ['forEach', 'map', 'filter', 'reduce'],
        correct: 1,
        difficulty: 'Facile',
        company: 'Amazon',
        explanation: 'map() crée un nouveau array avec les résultats de l\'appel d\'une fonction sur chaque élément. forEach exécute une fonction mais ne retourne rien, filter filtre les éléments, reduce réduit à une valeur.'
      },
      {
        question: 'Qu\'est-ce que le hoisting en JavaScript ?',
        options: [
          'Le déplacement des déclarations en haut du scope',
          'Une erreur de syntaxe',
          'Une méthode de tri',
          'Un type de variable'
        ],
        correct: 0,
        difficulty: 'Moyen',
        company: 'Google',
        explanation: 'Le hoisting est le comportement de JavaScript qui déplace les déclarations de variables et fonctions en haut de leur scope avant l\'exécution du code.'
      },
      {
        question: 'Quelle est la différence entre == et === en JavaScript ?',
        options: [
          '== compare les valeurs, === compare les valeurs et les types',
          'Ils sont identiques',
          '=== est plus rapide',
          '== est plus strict'
        ],
        correct: 0,
        difficulty: 'Facile',
        company: 'Amazon',
        explanation: '== effectue une conversion de type avant la comparaison (coercion), tandis que === compare à la fois la valeur et le type sans conversion.'
      },
      {
        question: 'Qu\'est-ce que le Temporal Dead Zone (TDZ) en JavaScript ?',
        options: [
          'La période entre le début du scope et la déclaration où une variable let/const ne peut pas être accédée',
          'Une erreur de syntaxe',
          'Une méthode de débogage',
          'Un type de closure'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Google',
        explanation: 'Le TDZ est la période entre l\'entrée dans le scope et la déclaration où les variables let/const existent mais ne peuvent pas être accédées. Contrairement à var qui est hoisted et initialisé à undefined.'
      },
      {
        question: 'Comment fonctionne le mécanisme de prototypage en JavaScript ?',
        options: [
          'Les objets héritent des propriétés via la chaîne de prototypes',
          'C\'est identique à l\'héritage de classe',
          'Cela n\'existe plus en ES6+',
          'C\'est une méthode de tri'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Facebook',
        explanation: 'JavaScript utilise le prototypage : chaque objet a un lien vers un prototype, créant une chaîne. Quand une propriété n\'est pas trouvée, JavaScript remonte la chaîne jusqu\'à Object.prototype.'
      },
      {
        question: 'Qu\'est-ce que le currying en JavaScript et pourquoi l\'utiliser ?',
        options: [
          'Transformer une fonction à plusieurs arguments en séquence de fonctions à un argument',
          'Une méthode de tri',
          'Un type d\'erreur',
          'Une bibliothèque externe'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Amazon',
        explanation: 'Le currying transforme f(a, b, c) en f(a)(b)(c), permettant la réutilisation de fonctions partielles et la composition fonctionnelle.'
      }
    ]
  },
  {
    id: 'algorithms',
    name: 'Algorithmes',
    icon: 'cpu',
    description: 'Structures de données, complexité, algorithmes classiques',
    questions: [
      {
        question: 'Quelle est la complexité temporelle de la recherche dans un tableau trié avec binary search ?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correct: 1,
        difficulty: 'Moyen',
        company: 'Google',
        explanation: 'La recherche binaire a une complexité O(log n) car elle divise l\'espace de recherche par deux à chaque itération.'
      },
      {
        question: 'Quelle structure de données utilise le principe LIFO (Last In First Out) ?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correct: 1,
        difficulty: 'Facile',
        company: 'Facebook',
        explanation: 'Une Stack (pile) utilise le principe LIFO : le dernier élément ajouté est le premier à être retiré.'
      },
      {
        question: 'Quelle est la complexité temporelle du tri rapide (Quick Sort) dans le pire des cas ?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correct: 1,
        difficulty: 'Difficile',
        company: 'Amazon',
        explanation: 'Dans le pire des cas (pivot toujours le plus petit ou le plus grand), Quick Sort a une complexité O(n²). En moyenne, c\'est O(n log n).'
      },
      {
        question: 'Qu\'est-ce qu\'un hash table (table de hachage) ?',
        options: [
          'Une structure qui mappe des clés à des valeurs avec accès O(1) en moyenne',
          'Un type de tri',
          'Une liste chaînée',
          'Un arbre binaire'
        ],
        correct: 0,
        difficulty: 'Moyen',
        company: 'Google',
        explanation: 'Une hash table est une structure de données qui utilise une fonction de hachage pour mapper des clés à des valeurs, permettant un accès en temps constant O(1) en moyenne.'
      },
      {
        question: 'Quelle est la différence entre BFS et DFS ?',
        options: [
          'BFS utilise une queue, DFS utilise une stack',
          'Ils sont identiques',
          'DFS est plus rapide',
          'BFS ne fonctionne que sur les arbres'
        ],
        correct: 0,
        difficulty: 'Moyen',
        company: 'Facebook',
        explanation: 'BFS (Breadth-First Search) explore niveau par niveau avec une queue, tandis que DFS (Depth-First Search) explore en profondeur avec une stack.'
      },
      {
        question: 'Quelle est la complexité temporelle de l\'algorithme de Floyd-Warshall pour trouver les plus courts chemins ?',
        options: ['O(V³)', 'O(V²)', 'O(V log V)', 'O(E log V)'],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Google',
        explanation: 'Floyd-Warshall a une complexité O(V³) car il utilise trois boucles imbriquées sur tous les sommets pour trouver les plus courts chemins entre toutes les paires de sommets.'
      },
      {
        question: 'Qu\'est-ce qu\'un arbre rouge-noir et quelle est sa hauteur maximale ?',
        options: [
          'Un arbre binaire de recherche auto-équilibré avec hauteur max O(log n)',
          'Un type de graphe',
          'Un algorithme de tri',
          'Une structure linéaire'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Amazon',
        explanation: 'Un arbre rouge-noir est un BST auto-équilibré qui garantit une hauteur maximale de 2*log(n+1), assurant des opérations O(log n) même dans le pire cas.'
      },
      {
        question: 'Comment fonctionne l\'algorithme de Dijkstra et quelle est sa limitation ?',
        options: [
          'Trouve le plus court chemin avec graphes à poids positifs uniquement',
          'Fonctionne avec tous les types de graphes',
          'Est toujours O(V²)',
          'Ne fonctionne que sur les arbres'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Facebook',
        explanation: 'Dijkstra trouve le plus court chemin depuis un sommet source, mais ne fonctionne pas avec des poids négatifs. Pour les poids négatifs, on utilise Bellman-Ford.'
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: 'code',
    description: 'Python, listes, dictionnaires, générateurs, etc.',
    questions: [
      {
        question: 'Quelle est la différence entre une liste et un tuple en Python ?',
        options: [
          'Les listes sont mutables, les tuples sont immutables',
          'Ils sont identiques',
          'Les tuples sont plus rapides pour tout',
          'Les listes ne peuvent contenir que des nombres'
        ],
        correct: 0,
        difficulty: 'Facile',
        company: 'Amazon',
        explanation: 'Les listes sont mutables (modifiables), tandis que les tuples sont immutables (non modifiables). Les tuples sont généralement plus rapides et utilisent moins de mémoire.'
      },
      {
        question: 'Qu\'est-ce qu\'un générateur en Python ?',
        options: [
          'Une fonction qui utilise yield pour produire des valeurs à la demande',
          'Un type de boucle',
          'Une erreur Python',
          'Une méthode de tri'
        ],
        correct: 0,
        difficulty: 'Moyen',
        company: 'Google',
        explanation: 'Un générateur est une fonction qui utilise le mot-clé yield pour produire une séquence de valeurs de manière paresseuse (lazy), économisant la mémoire.'
      },
      {
        question: 'Quelle est la complexité de l\'opération append() sur une liste Python ?',
        options: ['O(n)', 'O(1) amorti', 'O(log n)', 'O(n²)'],
        correct: 1,
        difficulty: 'Moyen',
        company: 'Facebook',
        explanation: 'append() a une complexité O(1) amorti. Parfois, la liste doit être redimensionnée (O(n)), mais cela arrive rarement, donc en moyenne c\'est O(1).'
      },
      {
        question: 'Qu\'est-ce qu\'une list comprehension en Python ?',
        options: [
          'Une syntaxe concise pour créer des listes',
          'Une méthode de tri',
          'Un type de boucle',
          'Une erreur de syntaxe'
        ],
        correct: 0,
        difficulty: 'Facile',
        company: 'Amazon',
        explanation: 'Une list comprehension est une syntaxe Python concise pour créer des listes de manière élégante, souvent plus rapide qu\'une boucle for traditionnelle.'
      },
      {
        question: 'Quelle est la différence entre __str__ et __repr__ en Python ?',
        options: [
          '__str__ est pour l\'utilisateur, __repr__ est pour le développeur',
          'Ils sont identiques',
          '__repr__ est obsolète',
          '__str__ est plus rapide'
        ],
        correct: 0,
        difficulty: 'Difficile',
        company: 'Google',
        explanation: '__str__ retourne une représentation lisible pour l\'utilisateur final, tandis que __repr__ retourne une représentation non ambiguë pour le développeur (idéalement, du code Python valide).'
      },
      {
        question: 'Qu\'est-ce que le GIL (Global Interpreter Lock) en Python et son impact ?',
        options: [
          'Un mécanisme qui permet à un seul thread d\'exécuter du bytecode Python à la fois',
          'Un type de variable',
          'Une méthode de tri',
          'Un protocole réseau'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Google',
        explanation: 'Le GIL est un mutex qui protège l\'accès aux objets Python, empêchant le vrai parallélisme des threads CPU-bound. Il n\'affecte pas les opérations I/O-bound.'
      },
      {
        question: 'Quelle est la différence entre @staticmethod et @classmethod en Python ?',
        options: [
          '@classmethod reçoit la classe comme premier argument, @staticmethod non',
          'Ils sont identiques',
          '@staticmethod est obsolète',
          '@classmethod est plus rapide'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Amazon',
        explanation: '@classmethod reçoit la classe (cls) comme premier argument et peut accéder aux attributs de classe. @staticmethod ne reçoit ni self ni cls et est indépendant de la classe.'
      },
      {
        question: 'Comment fonctionne le MRO (Method Resolution Order) en Python avec l\'héritage multiple ?',
        options: [
          'Utilise l\'algorithme C3 pour déterminer l\'ordre de recherche des méthodes',
          'Cherche toujours de gauche à droite',
          'N\'existe pas en Python',
          'Est aléatoire'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Facebook',
        explanation: 'Le MRO utilise l\'algorithme C3 qui garantit un ordre de résolution cohérent et prévisible pour l\'héritage multiple, évitant les problèmes de diamant.'
      }
    ]
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: 'server',
    description: 'Architecture, scalabilité, bases de données, APIs',
    questions: [
      {
        question: 'Qu\'est-ce que la cohérence éventuelle (Eventual Consistency) ?',
        options: [
          'Un système où tous les nœuds finissent par avoir les mêmes données',
          'Une erreur de base de données',
          'Un type de cache',
          'Une méthode de tri'
        ],
        correct: 0,
        difficulty: 'Difficile',
        company: 'Amazon',
        explanation: 'L\'eventual consistency garantit que si aucune mise à jour n\'est faite, tous les nœuds finiront par converger vers le même état. C\'est utilisé dans les systèmes distribués pour améliorer les performances.'
      },
      {
        question: 'Qu\'est-ce qu\'un load balancer ?',
        options: [
          'Un composant qui distribue le trafic entre plusieurs serveurs',
          'Un type de base de données',
          'Une méthode de chiffrement',
          'Un protocole réseau'
        ],
        correct: 0,
        difficulty: 'Moyen',
        company: 'Google',
        explanation: 'Un load balancer distribue les requêtes entrantes entre plusieurs serveurs pour améliorer les performances, la disponibilité et la scalabilité.'
      },
      {
        question: 'Quelle est la différence entre SQL et NoSQL ?',
        options: [
          'SQL est relationnel et structuré, NoSQL est non-relationnel et flexible',
          'Ils sont identiques',
          'NoSQL est plus ancien',
          'SQL ne fonctionne que sur Linux'
        ],
        correct: 0,
        difficulty: 'Facile',
        company: 'Facebook',
        explanation: 'SQL (relationnel) utilise des schémas fixes et des relations, tandis que NoSQL est plus flexible, peut être document-based, key-value, etc.'
      },
      {
        question: 'Qu\'est-ce qu\'un cache et pourquoi l\'utiliser ?',
        options: [
          'Un stockage temporaire rapide pour réduire les accès à la base de données',
          'Une méthode de chiffrement',
          'Un type de serveur',
          'Une erreur système'
        ],
        correct: 0,
        difficulty: 'Facile',
        company: 'Amazon',
        explanation: 'Un cache stocke temporairement des données fréquemment accédées pour réduire la latence et la charge sur la base de données principale.'
      },
      {
        question: 'Qu\'est-ce que le sharding en base de données ?',
        options: [
          'La division horizontale d\'une base de données en plusieurs fragments',
          'Une méthode de backup',
          'Un type d\'index',
          'Une erreur de connexion'
        ],
        correct: 0,
        difficulty: 'Difficile',
        company: 'Google',
        explanation: 'Le sharding divise une base de données en plusieurs fragments (shards) distribués sur différents serveurs pour améliorer les performances et la scalabilité horizontale.'
      },
      {
        question: 'Qu\'est-ce que le CAP Theorem et quelles sont les trois propriétés ?',
        options: [
          'Consistency, Availability, Partition tolerance - on ne peut garantir que 2 sur 3',
          'Cache, API, Protocol',
          'Code, Algorithm, Performance',
          'Toutes peuvent être garanties simultanément'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Amazon',
        explanation: 'Le CAP Theorem énonce qu\'un système distribué ne peut garantir simultanément que 2 des 3 propriétés : Consistency (cohérence), Availability (disponibilité), Partition tolerance (tolérance aux partitions).'
      },
      {
        question: 'Qu\'est-ce qu\'un circuit breaker pattern et pourquoi l\'utiliser ?',
        options: [
          'Un pattern qui empêche les appels à un service défaillant pour éviter la cascade d\'erreurs',
          'Un type de cache',
          'Une méthode de chiffrement',
          'Un protocole réseau'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Google',
        explanation: 'Le circuit breaker détecte les défaillances et "ouvre" le circuit pour éviter les appels répétés à un service défaillant, permettant au système de se récupérer et évitant la surcharge.'
      },
      {
        question: 'Quelle est la différence entre ACID et BASE dans les bases de données ?',
        options: [
          'ACID garantit la cohérence forte, BASE privilégie la disponibilité et la scalabilité',
          'Ils sont identiques',
          'BASE est plus strict',
          'ACID est obsolète'
        ],
        correct: 0,
        difficulty: 'Très Difficile',
        company: 'Facebook',
        explanation: 'ACID (Atomicity, Consistency, Isolation, Durability) garantit la cohérence forte. BASE (Basically Available, Soft state, Eventual consistency) privilégie la disponibilité et accepte la cohérence éventuelle pour la scalabilité.'
      }
    ]
  }
])

const currentCategory = computed(() => {
  return categories.value.find(cat => cat.id === currentCategoryId.value) || categories.value[0]
})

const currentQuestion = computed(() => {
  return currentCategory.value.questions[currentQuestionIndex.value]
})

const scorePercentage = computed(() => {
  return (score.value / currentCategory.value.questions.length) * 100
})

const getDifficultyClass = (difficulty) => {
  const difficultyMap = {
    'Facile': 'facile',
    'Moyen': 'moyen',
    'Difficile': 'difficile',
    'Très Difficile': 'tres-difficile'
  }
  return difficultyMap[difficulty] || difficulty.toLowerCase().replace(/\s+/g, '-')
}

const startQuiz = (categoryId) => {
  currentCategoryId.value = categoryId
  quizStarted.value = true
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showAnswer.value = false
  score.value = 0
  showResults.value = false
}

const selectAnswer = (index) => {
  if (!showAnswer.value) {
    selectedAnswer.value = index
  }
}

const submitAnswer = () => {
  if (selectedAnswer.value === null) return
  showAnswer.value = true
  if (selectedAnswer.value === currentQuestion.value.correct) {
    score.value++
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value + 1 < currentCategory.value.questions.length) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    showAnswer.value = false
  } else {
    showResults.value = true
    quizStarted.value = false
  }
}

const restartQuiz = () => {
  startQuiz(currentCategoryId.value)
}

const backToCategories = () => {
  quizStarted.value = false
  showResults.value = false
  currentCategoryId.value = null
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showAnswer.value = false
  score.value = 0
}

const downloadBadge = () => {
  const badge = generateBadgeSVG()
  const blob = new Blob([badge], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `badge-${currentCategory.value.name.toLowerCase().replace(/\s+/g, '-')}-${score.value}-${currentCategory.value.questions.length}.svg`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const generateBadgeSVG = () => {
  const category = currentCategory.value
  const percentage = Math.round(scorePercentage.value)
  const date = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B7EC8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFD23F;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="600" height="400" rx="20" fill="url(#grad1)"/>
  
  <!-- Border -->
  <rect x="10" y="10" width="580" height="380" rx="15" fill="none" stroke="#1A1A1A" stroke-width="4"/>
  
  <!-- Trophy Icon -->
  <text x="300" y="120" font-size="80" text-anchor="middle" fill="#FFD23F">🏆</text>
  
  <!-- Title -->
  <text x="300" y="180" font-size="32" font-weight="bold" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif">
    Quiz Technique Réussi
  </text>
  
  <!-- Category -->
  <text x="300" y="220" font-size="24" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif">
    ${category.name}
  </text>
  
  <!-- Score -->
  <rect x="150" y="250" width="300" height="60" rx="10" fill="url(#grad2)" stroke="#1A1A1A" stroke-width="3"/>
  <text x="300" y="285" font-size="36" font-weight="bold" text-anchor="middle" fill="#1A1A1A" font-family="Arial, sans-serif">
    ${score} / ${category.questions.length} (${percentage}%)
  </text>
  
  <!-- Date -->
  <text x="300" y="340" font-size="16" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" opacity="0.9">
    ${date}
  </text>
  
  <!-- Signature -->
  <text x="300" y="375" font-size="14" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" opacity="0.8">
    Emmanuel GBRA - Portfolio Tech
  </text>
</svg>`
}

const shareOnLinkedIn = () => {
  const category = currentCategory.value
  const percentage = Math.round(scorePercentage.value)
  const scoreText = `${score.value}/${category.questions.length}`
  
  const text = encodeURIComponent(
    `🎯 J'ai réussi le Quiz Technique "${category.name}" avec un score de ${scoreText} (${percentage}%) !\n\n` +
    `💪 Testez vos connaissances techniques avec des questions d'entretien inspirées d'Amazon, Google et Facebook.\n\n` +
    `🔗 Découvrez le quiz sur mon portfolio : https://emmanuelgbra.com/team-connect\n\n` +
    `#TechQuiz #CodingChallenge #TechInterview #SoftwareEngineering #MachineLearning #WebDevelopment`
  )
  
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://emmanuelgbra.com/team-connect')}`
  
  window.open(url, '_blank', 'width=600,height=400')
  
  // Alternative: ouvrir avec texte pré-rempli (nécessite l'API LinkedIn)
  // window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`, '_blank')
}
</script>

<style scoped>
.tech-quiz-module {
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

.category-selection {
  margin-top: 2rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Space Grotesk', sans-serif;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--card-border);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;
  backdrop-filter: blur(var(--glass-blur));
}

.category-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-light);
  border-color: var(--card-border-hover);
}

.category-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: var(--border-thick) solid var(--card-border);
  color: white;
}

.category-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.category-description {
  font-size: 0.9rem;
  color: var(--light-gray);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.category-stats {
  font-size: 0.85rem;
  color: var(--accent-primary);
  font-weight: 600;
}

.quiz-container {
  margin-top: 2rem;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.quiz-progress {
  flex: 1;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: var(--surface-bg);
  border-radius: 0.5rem;
  border: 2px solid var(--card-border);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: var(--light-gray);
  font-weight: 600;
}

.quiz-score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent-primary);
  font-family: 'Space Grotesk', sans-serif;
}

.question-card {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--card-border);
  box-shadow: var(--shadow-game);
  backdrop-filter: blur(var(--glass-blur));
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.question-difficulty {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  border: 2px solid var(--card-border);
  font-family: 'Space Grotesk', sans-serif;
}

.question-difficulty.Facile {
  background: var(--primary-teal);
  color: var(--white);
}

.question-difficulty.Moyen {
  background: var(--accent-yellow);
  color: var(--dark-gray);
}

.question-difficulty.Difficile {
  background: var(--accent-secondary);
  color: var(--white);
}

.question-difficulty.tres-difficile {
  background: #8B0000;
  color: var(--white);
}

.question-company {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--light-gray);
}

.question-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 2rem;
  line-height: 1.4;
  font-family: 'Space Grotesk', sans-serif;
}

.question-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--surface-bg);
  border: var(--border-thick) solid var(--card-border);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  color: var(--dark-gray);
}

.option-button:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
  background: var(--card-bg);
  border-color: var(--card-border-hover);
}

.option-button.selected {
  background: var(--accent-light);
  border-color: var(--accent-primary);
}

.option-button.correct {
  background: var(--primary-teal);
  color: var(--white);
  border-color: var(--primary-teal);
}

.option-button.incorrect {
  background: #ff6b6b;
  color: var(--white);
  border-color: #ff6b6b;
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-letter {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 0.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.option-button.selected .option-letter,
.option-button.correct .option-letter,
.option-button.incorrect .option-letter {
  background: var(--dark-gray);
  color: var(--white);
  border-color: var(--dark-gray);
}

.option-text {
  flex: 1;
}

.correct-icon {
  color: var(--white);
  flex-shrink: 0;
}

.answer-explanation {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  margin-bottom: 2rem;
  backdrop-filter: blur(var(--glass-blur));
}

.answer-explanation h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 0.75rem;
  font-family: 'Space Grotesk', sans-serif;
}

.answer-explanation p {
  color: var(--light-gray);
  line-height: 1.6;
  margin: 0;
}

.quiz-actions {
  display: flex;
  justify-content: center;
}

.results-container {
  text-align: center;
  margin-top: 2rem;
}

.results-header {
  background: var(--card-bg);
  padding: 3rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--card-border);
  box-shadow: var(--shadow-game);
  margin-bottom: 2rem;
  backdrop-filter: blur(var(--glass-blur));
}

.results-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-teal) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border: var(--border-thick) solid var(--card-border);
  color: white;
}

.results-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--dark-gray);
  margin-bottom: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.final-score {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.score-value {
  font-size: 4rem;
  font-weight: 800;
  color: var(--accent-primary);
  font-family: 'Space Grotesk', sans-serif;
}

.score-total {
  font-size: 2rem;
  font-weight: 600;
  color: var(--light-gray);
}

.score-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-purple);
  margin-bottom: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
}

.score-message {
  font-size: 1.125rem;
  color: var(--light-gray);
  line-height: 1.6;
}

.achievement-badge {
  margin-top: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  border-radius: 1rem;
  border: var(--border-thick) solid var(--card-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.badge-icon {
  font-size: 3rem;
}

.badge-text {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .quiz-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .question-card {
    padding: 1.5rem;
  }
  
  .question-text {
    font-size: 1.25rem;
  }
  
  .results-header {
    padding: 2rem;
  }
  
  .score-value {
    font-size: 3rem;
  }
  
  .results-actions {
    flex-direction: column;
  }
  
  .results-actions .btn {
    width: 100%;
  }
}
</style>
