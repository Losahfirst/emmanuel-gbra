<template>
  <form @submit.prevent="handleSubmit" class="article-form">
    <div class="form-group">
      <label class="form-label">Pays *</label>
      <select v-model="formData.countryCode" required class="form-input">
        <option value="">Sélectionner un pays</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Titre *</label>
      <input
        v-model="formData.title"
        type="text"
        required
        class="form-input"
        placeholder="Titre de l'actualité"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Extrait *</label>
      <textarea
        v-model="formData.excerpt"
        required
        rows="3"
        class="form-input"
        placeholder="Résumé court de l'actualité"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Catégorie *</label>
        <select v-model="formData.category" required class="form-input">
          <option value="">Sélectionner une catégorie</option>
          <option value="Énergies Renouvelables">Énergies Renouvelables</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Développement">Développement</option>
          <option value="Régulation">Régulation</option>
          <option value="Production">Production</option>
          <option value="Innovation">Innovation</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Date *</label>
        <input
          v-model="formData.date"
          type="date"
          required
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">URL de l'image</label>
      <input
        v-model="formData.image"
        type="url"
        class="form-input"
        placeholder="https://example.com/image.jpg"
      />
      <p class="form-help">Collez l'URL complète de l'image</p>
      <div v-if="formData.image" class="image-preview">
        <img :src="formData.image" :alt="formData.title" @error="imageError = true" />
        <div v-if="imageError" class="image-error">Impossible de charger l'image</div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">URL de la source</label>
      <input
        v-model="formData.sourceUrl"
        type="url"
        class="form-input"
        placeholder="https://example.com/article"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Temps de lecture (minutes)</label>
      <input
        v-model.number="formData.readTime"
        type="number"
        min="1"
        class="form-input"
        placeholder="5"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Contenu de l'article *</label>
      <div class="content-editor">
        <div
          v-for="(paragraph, index) in formData.content"
          :key="index"
          class="content-item"
        >
          <select v-model="paragraph.type" class="content-type-select">
            <option value="text">Paragraphe</option>
            <option value="heading">Titre</option>
          </select>
          <textarea
            v-model="paragraph.text"
            :rows="paragraph.type === 'heading' ? 1 : 3"
            class="content-text"
            :placeholder="paragraph.type === 'heading' ? 'Titre...' : 'Texte...'"
          ></textarea>
          <button
            type="button"
            @click="removeParagraph(index)"
            class="btn-remove"
            v-if="formData.content.length > 1"
          >
            <X :size="16" />
          </button>
        </div>
        <button type="button" @click="addParagraph" class="btn-add-paragraph">
          <Plus :size="18" />
          <span>Ajouter un paragraphe</span>
        </button>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="btn-cancel">
        Annuler
      </button>
      <button type="submit" class="btn-save">
        <Save :size="18" />
        <span>{{ props.article ? 'Enregistrer les modifications' : 'Créer l\'actualité' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, X, Save } from 'lucide-vue-next'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'

const props = defineProps({
  article: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const countries = westAfricaCountries
const imageError = ref(false)

const formData = ref({
  countryCode: '',
  title: '',
  excerpt: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  image: '',
  sourceUrl: '',
  readTime: 5,
  content: [
    { type: 'text', text: '' }
  ]
})

onMounted(() => {
  if (props.article) {
    formData.value = {
      ...props.article,
      date: props.article.date ? new Date(props.article.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      content: props.article.content && props.article.content.length > 0 
        ? props.article.content 
        : [{ type: 'text', text: '' }]
    }
  }
})

function addParagraph() {
  formData.value.content.push({ type: 'text', text: '' })
}

function removeParagraph(index) {
  if (formData.value.content.length > 1) {
    formData.value.content.splice(index, 1)
  }
}

function handleSubmit() {
  const articleData = {
    ...formData.value,
    // Ne pas générer d'ID pour les nouveaux articles - Supabase le fera automatiquement
    id: props.article?.id || null,
    date: new Date(formData.value.date).toISOString(),
    readTime: formData.value.readTime || 5,
    content: formData.value.content.filter(p => p.text.trim() !== '')
  }
  
  emit('save', articleData)
}
</script>

<style scoped>
.article-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #1A1A1A;
  font-size: 0.9375rem;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-help {
  font-size: 0.8125rem;
  color: #6B7280;
  margin: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.image-preview {
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid #E5E7EB;
}

.image-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  display: block;
}

.image-error {
  padding: 2rem;
  text-align: center;
  color: #EF4444;
  background: #FEF2F2;
}

.content-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.content-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.content-type-select {
  padding: 0.5rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  flex-shrink: 0;
  width: 120px;
}

.content-text {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-family: inherit;
  resize: vertical;
}

.content-text:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-remove {
  background: #EF4444;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background: #DC2626;
}

.btn-add-paragraph {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #F3F4F6;
  border: 2px dashed #D1D5DB;
  border-radius: 0.5rem;
  color: #6B7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-paragraph:hover {
  background: #E5E7EB;
  border-color: #9CA3AF;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  background: #F3F4F6;
  color: #1A1A1A;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #E5E7EB;
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:hover {
  background: #2563EB;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .content-item {
    flex-direction: column;
  }
  
  .content-type-select {
    width: 100%;
  }
}
</style>
