<template>
  <form @submit.prevent="handleSubmit" class="producer-form">
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
      <label class="form-label">Nom du producteur *</label>
      <input
        v-model="formData.name"
        type="text"
        required
        class="form-input"
        placeholder="Ex: Compagnie Ivoirienne d'Électricité (CIE)"
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Type *</label>
        <select v-model="formData.type" required class="form-input">
          <option value="">Sélectionner un type</option>
          <option value="Mixte">Mixte</option>
          <option value="Thermique">Thermique</option>
          <option value="Hydraulique">Hydraulique</option>
          <option value="Solaire">Solaire</option>
          <option value="Éolien">Éolien</option>
          <option value="Biomasse">Biomasse</option>
          <option value="Nucléaire">Nucléaire</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Capacité *</label>
        <input
          v-model="formData.capacity"
          type="text"
          required
          class="form-input"
          placeholder="Ex: 2200 MW"
        />
      </div>
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="btn-cancel">
        Annuler
      </button>
      <button type="submit" class="btn-save">
        <Save :size="18" />
        <span>{{ props.producer ? 'Enregistrer les modifications' : 'Créer le producteur' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Save } from 'lucide-vue-next'
import { westAfricaCountries } from '../../../../data/westAfricaCountries.js'

const props = defineProps({
  producer: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const countries = westAfricaCountries

const formData = ref({
  countryCode: '',
  name: '',
  type: '',
  capacity: ''
})

onMounted(() => {
  if (props.producer) {
    formData.value = { ...props.producer }
  }
})

function handleSubmit() {
  emit('save', formData.value)
}
</script>

<style scoped>
.producer-form {
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
}
</style>
