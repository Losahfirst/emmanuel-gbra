// Scroll animations inspired by Karim Bouzgarne's website
class ScrollAnimations {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    this.revealElements.forEach(element => {
      element.classList.add('reveal')
    })
    
    this.init()
    window.addEventListener('scroll', this.throttle(this.checkScroll.bind(this), 50))
    window.addEventListener('resize', this.throttle(this.checkScroll.bind(this), 50))
  }

  init() {
    this.checkScroll()
  }

  checkScroll() {
    const windowHeight = window.innerHeight
    const revealPoint = 150 // Distance from bottom to trigger reveal

    this.revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top
      const elementBottom = element.getBoundingClientRect().bottom

      // Reveal when element is in viewport
      if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
        element.classList.add('reveal-in')
      }
    })
  }

  // Throttle scroll events for better performance
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations()
})

// Re-check animations on page load
window.addEventListener('load', () => {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    if (elementTop < windowHeight - 150) {
      element.classList.add('reveal-in')
    }
  })
})
