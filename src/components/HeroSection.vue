<template>
  <section class="hero" id="home">
    <!-- Floating Tech Icons -->
    <div class="floating-icons">
      <div class="floating-icon icon-1">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
      </div>
      <div class="floating-icon icon-2">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
      </div>
      <div class="floating-icon icon-3">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>
      </div>
      <div class="floating-icon icon-4">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5zm0-4h4v2H5zm6 0h8v2h-8zm0-4h8v2h-8zM5 7h4v4H5z"/></svg>
      </div>
      <div class="floating-icon icon-5">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      </div>
      <div class="floating-icon icon-6">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"/></svg>
      </div>
      <div class="floating-icon icon-7">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"/></svg>
      </div>
      <div class="floating-icon icon-8">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
      </div>
    </div>

    <!-- Code snippets floating -->
    <div class="floating-code code-1">
      <span class="code-keyword">def</span> <span class="code-func">predict</span>(data):
    </div>
    <div class="floating-code code-2">
      <span class="code-keyword">import</span> tensorflow
    </div>
    <div class="floating-code code-3">
      model.<span class="code-func">fit</span>(X, y)
    </div>

    <div class="hero-container">
      <div class="hero-text">
        <p class="hero-greeting">Bonjour, je suis</p>
        <h1>Emmanuel <span>Gbra</span></h1>
        <p class="subtitle">J'aime la Data et l'IA</p>
        <p class="hero-description">
          Passionné par l'IA et l'Énergie, je crée des solutions intelligentes 
          pour optimiser la performance et prédire l'avenir.
        </p>
        
        <div class="hero-buttons">
          <a href="/cv-emmanuel-gbra.pdf" class="btn btn-primary" download>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
          <a href="#work" class="btn btn-outline">View Work</a>
        </div>
        
        <div class="social-links">
          <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/Losahfirst" target="_blank" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:emmanuelgbra88@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="hero-image">
        <img src="/hero-photo.png" alt="Emmanuel Gbra" />
      </div>
    </div>

    <!-- Cursor followers -->
    <div class="cursor-follower follower-1" ref="follower1"></div>
    <div class="cursor-follower follower-2" ref="follower2"></div>
    <div class="cursor-follower follower-3" ref="follower3"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const follower1 = ref(null)
const follower2 = ref(null)
const follower3 = ref(null)

let mouseX = 0
let mouseY = 0
let follower1X = 0, follower1Y = 0
let follower2X = 0, follower2Y = 0
let follower3X = 0, follower3Y = 0
let animationId = null

const handleMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const animate = () => {
  // Follower 1 - Fast
  follower1X += (mouseX - follower1X) * 0.15
  follower1Y += (mouseY - follower1Y) * 0.15
  if (follower1.value) {
    follower1.value.style.transform = `translate(${follower1X - 10}px, ${follower1Y - 10}px)`
  }

  // Follower 2 - Medium
  follower2X += (mouseX - follower2X) * 0.08
  follower2Y += (mouseY - follower2Y) * 0.08
  if (follower2.value) {
    follower2.value.style.transform = `translate(${follower2X - 20}px, ${follower2Y - 20}px)`
  }

  // Follower 3 - Slow
  follower3X += (mouseX - follower3X) * 0.04
  follower3Y += (mouseY - follower3Y) * 0.04
  if (follower3.value) {
    follower3.value.style.transform = `translate(${follower3X - 30}px, ${follower3Y - 30}px)`
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
/* Cursor Followers */
.cursor-follower {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

.follower-1 {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #10B981, #34D399);
  opacity: 0.9;
}

.follower-2 {
  width: 40px;
  height: 40px;
  border: 2px solid #10B981;
  background: transparent;
  opacity: 0.6;
}

.follower-3 {
  width: 60px;
  height: 60px;
  border: 1px solid rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.05);
  opacity: 0.4;
}

@media (max-width: 768px) {
  .cursor-follower {
    display: none;
  }
}

/* Floating Icons */
.floating-icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);
  color: var(--primary);
  backdrop-filter: blur(10px);
}

.floating-icon svg {
  width: 28px;
  height: 28px;
}

.icon-1 {
  top: 15%;
  left: 5%;
  animation: floatIcon1 8s ease-in-out infinite;
}

.icon-2 {
  top: 25%;
  right: 8%;
  animation: floatIcon2 7s ease-in-out infinite;
}

.icon-3 {
  top: 60%;
  left: 3%;
  animation: floatIcon3 9s ease-in-out infinite;
}

.icon-4 {
  bottom: 20%;
  right: 5%;
  animation: floatIcon4 6s ease-in-out infinite;
}

.icon-5 {
  top: 10%;
  left: 45%;
  animation: floatIcon5 10s ease-in-out infinite;
}

.icon-6 {
  bottom: 30%;
  left: 12%;
  animation: floatIcon6 8s ease-in-out infinite;
}

.icon-7 {
  top: 40%;
  right: 3%;
  animation: floatIcon7 7s ease-in-out infinite;
}

.icon-8 {
  bottom: 15%;
  left: 35%;
  animation: floatIcon8 9s ease-in-out infinite;
}

/* Floating Code Snippets */
.floating-code {
  position: absolute;
  background: rgba(17, 24, 39, 0.95);
  color: #E5E7EB;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  white-space: nowrap;
}

.code-keyword {
  color: #C084FC;
}

.code-func {
  color: #34D399;
}

.code-1 {
  top: 20%;
  right: 15%;
  animation: floatCode1 12s ease-in-out infinite;
}

.code-2 {
  bottom: 25%;
  left: 8%;
  animation: floatCode2 10s ease-in-out infinite;
}

.code-3 {
  top: 70%;
  right: 10%;
  animation: floatCode3 11s ease-in-out infinite;
}

/* Animations */
@keyframes floatIcon1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -15px) rotate(5deg); }
  50% { transform: translate(-5px, -25px) rotate(-3deg); }
  75% { transform: translate(15px, -10px) rotate(3deg); }
}

@keyframes floatIcon2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-15px, 20px) rotate(-5deg); }
  66% { transform: translate(10px, 10px) rotate(5deg); }
}

@keyframes floatIcon3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.1); }
}

@keyframes floatIcon4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-10px, -20px) rotate(-8deg); }
  75% { transform: translate(10px, -10px) rotate(8deg); }
}

@keyframes floatIcon5 {
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(-30px); opacity: 1; }
}

@keyframes floatIcon6 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(15px, -25px) rotate(10deg); }
}

@keyframes floatIcon7 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-20px, 15px); }
  66% { transform: translate(-10px, -15px); }
}

@keyframes floatIcon8 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-15px, -20px) scale(0.95); }
}

@keyframes floatCode1 {
  0%, 100% { transform: translate(0, 0) rotate(-2deg); opacity: 0.9; }
  50% { transform: translate(-20px, 15px) rotate(2deg); opacity: 1; }
}

@keyframes floatCode2 {
  0%, 100% { transform: translate(0, 0) rotate(1deg); opacity: 0.85; }
  50% { transform: translate(25px, -20px) rotate(-1deg); opacity: 1; }
}

@keyframes floatCode3 {
  0%, 100% { transform: translate(0, 0); opacity: 0.9; }
  50% { transform: translate(-15px, -25px); opacity: 1; }
}

@media (max-width: 768px) {
  .floating-icon {
    width: 40px;
    height: 40px;
  }
  
  .floating-icon svg {
    width: 22px;
    height: 22px;
  }
  
  .floating-code {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.95);
    color: #1f2937;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .floating-code .code-keyword {
    color: #7C3AED;
  }
  
  .floating-code .code-func {
    color: #059669;
  }
  
  .icon-5, .icon-6, .icon-7, .icon-8 {
    display: none;
  }
  
  .code-3 {
    display: none;
  }
}
</style>
