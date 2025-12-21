<template>
  <form @submit.prevent="handleSubmit" class="flash-info-form">
    <div class="form-group">
      <label class="form-label">Pays <span class="required">*</span></label>
      <select v-model="formData.countryCode" required class="form-input">
        <option value="">Sélectionner un pays</option>
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Date <span class="required">*</span></label>
      <input
        v-model="formData.date"
        type="date"
        required
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Texte <span class="required">*</span></label>
      <textarea
        v-model="formData.text"
        required
        rows="4"
        class="form-input"
        placeholder="Entrez le texte de la flash info..."
      ></textarea>
      <p class="form-hint">Ce texte sera affiché en défilement sur le dashboard</p>
    </div>

    <div class="form-group">
      <label class="form-label">
        <input
          v-model="formData.isActive"
          type="checkbox"
          class="form-checkbox"
        />
        <span>Activer cette flash info</span>
      </label>
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="btn-cancel">
        Annuler
      </button>
      <button type="submit" class="btn-save">
        <Save :size="18" />
        <span>{{ props.flashInfo ? 'Enregistrer' : 'Créer' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Save } from 'lucide-vue-next'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'

const props = defineProps({
  flashInfo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const countries = westAfricaCountries

const formData = ref({
  countryCode: '',
  date: '',
  text: '',
  isActive: true
})

function handleSubmit() {
  const data = {
    ...formData.value,
    id: props.flashInfo?.id
  }
  emit('save', data)
}

onMounted(() => {
  if (props.flashInfo) {
    formData.value = {
      countryCode: props.flashInfo.countryCode || '',
      date: props.flashInfo.date || '',
      text: props.flashInfo.text || '',
      isActive: props.flashInfo.isActive !== undefined ? props.flashInfo.isActive : true
    }
  } else {
    // Date par défaut = aujourd'hui
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    formData.value.date = `${year}-${month}-${day}`
  }
})
</script>

<style scoped>
.flash-info-form {
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required {
  color: #EF4444;
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

textarea.form-input {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-hint {
  font-size: 0.8125rem;
  color: #6B7280;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}

.btn-cancel,
.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: #F3F4F6;
  color: #374151;
}

.btn-cancel:hover {
  background: #E5E7EB;
}

.btn-save {
  background: #3B82F6;
  color: white;
}

.btn-save:hover {
  background: #2563EB;
}
</style>
