<template>
  <form @submit.prevent="handleSubmit" class="regulator-form">
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
      <label class="form-label">Nom du régulateur *</label>
      <input
        v-model="formData.name"
        type="text"
        required
        class="form-input"
        placeholder="Ex: Autorité Nationale de Régulation..."
      />
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea
        v-model="formData.description"
        rows="3"
        class="form-input"
        placeholder="Description du régulateur..."
      ></textarea>
    </div>

    <div class="form-group">
      <label class="form-label">URL du logo</label>
      <input
        v-model="formData.logo"
        type="url"
        class="form-input"
        placeholder="https://example.com/logo.png ou /logos/regulators/logo.png"
      />
      <p class="form-help">Collez l'URL complète de l'image ou le chemin relatif</p>
      <div v-if="formData.logo" class="image-preview">
        <img :src="formData.logo" :alt="formData.name" @error="imageError = true" />
        <div v-if="imageError" class="image-error">Impossible de charger l'image</div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Site web</label>
      <input
        v-model="formData.website"
        type="url"
        class="form-input"
        placeholder="https://example.com"
      />
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="btn-cancel">
        Annuler
      </button>
      <button type="submit" class="btn-save">
        <Save :size="18" />
        <span>{{ props.regulator ? 'Enregistrer les modifications' : 'Créer le régulateur' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Save } from 'lucide-vue-next'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'

const props = defineProps({
  regulator: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const countries = westAfricaCountries
const imageError = ref(false)

const formData = ref({
  countryCode: '',
  name: '',
  description: '',
  logo: '',
  website: ''
})

onMounted(() => {
  if (props.regulator) {
    formData.value = { ...props.regulator }
  }
})

function handleSubmit() {
  const regulatorData = {
    ...formData.value,
    website: formData.value.website || '#'
  }
  
  emit('save', regulatorData)
}
</script>

<style scoped>
.regulator-form {
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

.image-preview {
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid #E5E7EB;
  max-width: 200px;
}

.image-preview img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  padding: 0.5rem;
  background: white;
}

.image-error {
  padding: 2rem;
  text-align: center;
  color: #EF4444;
  background: #FEF2F2;
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
</style>
