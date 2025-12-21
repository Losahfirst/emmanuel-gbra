<template>
  <section class="contact-section section" id="contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">RESTONS EN CONTACT</h2>
        <p class="section-subtitle">Discutons de vos projets d'innovation énergétique et d'IA</p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">
              <IconWrapper name="envelope" size="xl" />
            </div>
            <h3>Email</h3>
            <a href="mailto:emmanuelgbra88@gmail.com" class="info-link">emmanuelgbra88@gmail.com</a>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <IconWrapper name="phone" size="xl" />
            </div>
            <h3>Téléphone</h3>
            <a href="tel:+2250554787015" class="info-link">+225 0554787015</a>
            <a href="tel:+2250101533994" class="info-link">+225 0101533994</a>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <IconWrapper name="briefcase" size="xl" />
            </div>
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" class="info-link">korekou-emmanuel-gbra</a>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <IconWrapper name="document" size="xl" />
            </div>
            <h3>Articles Tech</h3>
            <a href="https://medium.com/@emmanuelgbra88" target="_blank" class="info-link">Medium Profile</a>
          </div>
        </div>
        <div class="contact-form-container">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Nom</label>
              <input type="text" id="name" v-model="form.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" required>
            </div>
            <div class="form-group">
              <label for="subject">Sujet</label>
              <input type="text" id="subject" v-model="form.subject" required>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Envoyer le Message</button>
          </form>
        </div>
      </div>
      <div class="community-section">
        <h3 class="community-title">Communautés & Réseaux</h3>
        <div class="community-links">
         
          <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" class="community-link">
            <IconWrapper name="briefcase" size="md" />
            <span>LinkedIn</span>
          </a>
          <a href="https://medium.com/@emmanuelgbra88" target="_blank" class="community-link">
            <IconWrapper name="document" size="md" />
            <span>Medium</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import IconWrapper from './icons/IconWrapper.vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  // In a real application, this would send the form data to a backend
  const mailtoLink = `mailto:emmanuelgbra88@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`
  window.location.href = mailtoLink
  
  // Reset form
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  
  alert('Redirection vers votre client email...')
}
</script>

<style scoped>
.contact-section {
  background: var(--white);
  margin: 2rem;
  border-radius: 2rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  padding: 4rem 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: var(--white);
  padding: 2rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
  transition: all 0.2s ease;
}

.info-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-yellow);
}

.info-icon {
  margin-bottom: 1rem;
  color: var(--primary-purple);
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-icon :deep(svg) {
  width: 2.5rem;
  height: 2.5rem;
  stroke-width: 2;
}

.info-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--dark-gray);
  margin-bottom: 0.75rem;
}

.info-link {
  display: block;
  color: var(--primary-purple);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.info-link:hover {
  color: var(--primary-teal);
}

.contact-form-container {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: var(--border-thick) solid var(--border-color);
  box-shadow: var(--shadow-game);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--dark-gray);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.2s ease;
  background: var(--white);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-orange);
  box-shadow: 4px 4px 0px rgba(255, 107, 53, 0.2);
  transform: translate(-2px, -2px);
}

.contact-form .btn {
  align-self: flex-start;
  margin-top: 0.5rem;
}

.community-section {
  padding-top: 3rem;
  border-top: 2px solid #E2E8F0;
}

.community-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-gray);
  margin-bottom: 1.5rem;
  text-align: center;
}

.community-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.community-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--accent-orange);
  color: var(--white);
  text-decoration: none;
  border-radius: 1rem;
  border: var(--border-thick) solid var(--border-color);
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-game);
}

.community-link:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  background: var(--accent-yellow);
  color: var(--dark-gray);
}

.community-link :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 2;
}

@media (max-width: 968px) {
  .contact-section {
    margin: 1rem;
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .info-card {
    padding: 1.5rem;
  }
  
  .contact-form-container {
    padding: 1.5rem;
  }
  
  .community-links {
    flex-direction: column;
    align-items: stretch;
  }
  
  .community-link {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .contact-section {
    margin: 0.5rem;
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .info-card {
    padding: 1.25rem;
  }
  
  .contact-form-container {
    padding: 1.25rem;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
}
</style>
