<template>
  <Transition name="modal-fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-btn" @click="close">&times;</button>
        
        <div class="modal-body">
          <Transition name="slide-fade" mode="out-in">
            <!-- Slide 1: Welcome -->
            <div v-if="currentSlide === 1" key="slide1" class="slide">
              <div class="flame-icon-container">
                 <svg fill="none" height="60" viewBox="0 0 20 20" width="60" xmlns="http://www.w3.org/2000/svg" class="brand-svg">
                  <path
                    d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2>Bienvenue sur mon Portfolio</h2>
              <p>Découvrez mon univers entre Data Science, IoT et Ingénierie Énergétique.</p>
              <button class="next-btn" @click="nextSlide">
                Suivant <span class="arrow">›</span>
              </button>
            </div>

            <!-- Slide 2: Losah Python Library -->
            <div v-else key="slide2" class="slide">
              <div class="tag">Nouveauté</div>
              <h2>Bibliothèque <span class="accent">Losah</span></h2>
              <p>Je développe actuellement une bibliothèque Python pour simplifier l'analyse énergétique et industrielle.</p>
              <div class="code-block">
                <code>pip install losah</code>
                <button class="copy-btn" @click="copyCode">Copier</button>
              </div>
              <p class="small-text">Version bêta bientôt disponible.</p>
              <button class="finish-btn" @click="close">
                Découvrir le portfolio
              </button>
            </div>
          </Transition>
        </div>

        <div class="modal-footer">
          <div class="dots">
            <span :class="{ active: currentSlide === 1 }"></span>
            <span :class="{ active: currentSlide === 2 }"></span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const currentSlide = ref(1)

const nextSlide = () => {
  currentSlide.value = 2
}

const close = () => {
  isVisible.value = false
  localStorage.setItem('welcome_modal_seen', 'true')
}

const copyCode = () => {
  navigator.clipboard.writeText('pip install losah')
  alert('Commande copiée !')
}

onMounted(() => {
  const seen = localStorage.getItem('welcome_modal_seen')
  if (!seen) {
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}

.modal-content {
  background: var(--cream);
  width: 100%;
  max-width: 500px;
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--gray-400);
  cursor: pointer;
  line-height: 1;
  transition: color 0.3s;
}

.close-btn:hover {
  color: var(--black);
}

.flame-icon-container {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  color: var(--accent);
}

h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

p {
  color: var(--gray-600);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.accent {
  color: var(--accent);
}

.tag {
  display: inline-block;
  background: var(--accent-light);
  color: var(--accent);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.code-block {
  background: var(--black);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.code-block code {
  color: #fff;
  font-family: monospace;
  font-size: 1.1rem;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.small-text {
  font-size: 0.8rem;
  color: var(--gray-400);
  font-style: italic;
}

.next-btn, .finish-btn {
  width: 100%;
  padding: 1.2rem;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.next-btn {
  background: var(--black);
  color: #fff;
}

.finish-btn {
  background: var(--accent);
  color: #fff;
}

.next-btn:hover, .finish-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.modal-footer {
  margin-top: 2rem;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gray-200);
  transition: all 0.3s;
}

.dots span.active {
  background: var(--accent);
  width: 20px;
  border-radius: 4px;
}

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.5s;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
