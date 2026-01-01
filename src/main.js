import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

let revealObserver

const ensureRevealObserver = () => {
  if (revealObserver) return

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (prefersReducedMotion) return

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        
        // Add reveal-in with a small delay for smoother animations
        setTimeout(() => {
          entry.target.classList.add('reveal-in')
        }, 100)
        
        revealObserver.unobserve(entry.target)
      })
    },
    { 
      threshold: [0.1, 0.3, 0.6], // Multiple thresholds for smoother reveal
      rootMargin: '0px 0px -50px 0px' // Earlier trigger point
    }
  )
}

const applyReveal = () => {
  ensureRevealObserver()
  if (!revealObserver) return

  const autoSelectors = [
    '.section-header',
    '.project-item',
    '.article-card',
    '.skill-category',
    '.module-card',
    '.testimonial-card',
    '.app-card',
    '.timeline-content',
    '.info-card',
    '.contact-form-container'
  ]

  // Add different reveal classes for variety
  const selectorsWithClasses = [
    { selector: '.section-header', class: 'reveal' },
    { selector: '.project-item', class: 'reveal-left' },
    { selector: '.article-card', class: 'reveal-right' },
    { selector: '.skill-category', class: 'reveal-scale' },
    { selector: '.module-card', class: 'reveal-left' },
    { selector: '.timeline-content', class: 'reveal' },
    { selector: '.info-card', class: 'reveal-right' },
    { selector: '.contact-form-container', class: 'reveal' }
  ]

  selectorsWithClasses.forEach(({ selector, class: revealClass }) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add(revealClass)
    })
  })

  document.querySelectorAll('.reveal:not(.reveal-in), .reveal-left:not(.reveal-in), .reveal-right:not(.reveal-in), .reveal-scale:not(.reveal-in)').forEach((el) => {
    revealObserver.observe(el)
  })
}

app.use(pinia)
app.use(router)
app.use(VueApexCharts)

router.isReady().then(() => {
  nextTick(() => {
    applyReveal()
    // Initial check for elements already in view
    setTimeout(() => applyReveal(), 100)
  })
})

router.afterEach(() => {
  nextTick(() => {
    applyReveal()
    // Re-check after navigation
    setTimeout(() => applyReveal(), 100)
  })
})

app.mount('#app')
