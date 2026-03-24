<template>
  <section class="hero" id="home">
    <div class="hero-card">
      <!-- Main content -->
      <div class="hero-body">
        <div class="hero-text">
          <h1>Ingénieur IoT<br/>& Efficacité Énergétique</h1>
        <p class="hero-desc">
          L'alliance de l'IoT et du génie thermique pour l'optimisation énergétique. 
          Expertise en GTB/GTC et digitalisation industrielle.
        </p>
          <a href="#work" class="hero-btn">
            Voir mes projets
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div class="hero-image">
          <img src="/hero-photo.png" alt="Emmanuel Gbra" />
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="hero-footer">
        <div class="hero-scroll">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M10 11l2 2 2-2"/>
          </svg>
          <span>Scroll Down</span>
        </div>

        <div class="hero-social-row">
          <a href="https://www.linkedin.com/in/korekou-emmanuel-gbra/" target="_blank" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://github.com/Losahfirst" target="_blank" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="mailto:emmanuelgbra88@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background: #e8e4e0;
  display: flex;
  align-items: center; /* Centering vertically within the remaining space */
  justify-content: center;
  padding: 100px 1.5rem 3rem; /* Extra top padding for header space */
}

.hero-card {
  background: #f5f2ef;
  border-radius: 40px; /* More rounded as in reference */
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden; /* For inner elements */
}

.hero-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex: 1;
}

.hero-text {
  max-width: 460px;
}

.hero-text h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--black);
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 1.25rem;
}

.hero-text p {
  font-size: 0.95rem;
  color: var(--gray-500);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 380px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--white);
  color: var(--black);
  padding: 0.9rem 2rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.hero-btn:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Image */
.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.hero-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 4/5;
  object-fit: cover;
  object-position: top center;
  border-radius: 30px;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.12));
}

/* Bottom bar */
.hero-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
}

.hero-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--gray-400);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.hero-scroll span {
  font-size: 0.7rem;
  letter-spacing: 1px;
  text-transform: capitalize;
}

.hero-social-row {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.hero-social-row a {
  color: var(--gray-400);
  transition: all 0.3s ease;
}

.hero-social-row a:hover {
  color: var(--black);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-card {
    padding: 3rem;
  }
  .hero-image img {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 100px 1rem 2rem;
  }

  .hero-card {
    padding: 3rem 1.5rem;
    min-height: auto;
    border-radius: 30px;
  }

  .hero-body {
    flex-direction: column-reverse;
    text-align: center;
    gap: 3rem;
  }

  .hero-text {
    max-width: 100%;
    margin-top: 1rem;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-text p {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.9rem;
  }

  .hero-btn {
    margin: 0 auto;
    width: fit-content;
  }

  .hero-image {
    justify-content: center;
  }

  .hero-image img {
    max-width: 260px;
    height: auto;
  }

  .hero-scroll {
    position: static;
    transform: none;
    margin-top: 2rem;
  }

  .hero-footer {
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 3rem;
  }

  .hero-social-row {
    margin: 0 auto;
    gap: 1.5rem;
  }
}

@media (max-height: 700px) {
  .hero {
    padding-top: 100px;
    height: auto;
    min-height: 100vh;
  }
}
</style>
