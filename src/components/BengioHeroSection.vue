<template>
  <section class="bengio-hero-wrapper" id="accueil">
    <div class="bengio-hero-stage">
      <!-- The exact Bengio Hero structure -->
      <div class="group-hero">
        <!-- Exact large circular portrait with #70afbe flat backdrop -->
        <div class="field--name-field-image1">
          <div class="circle-inner">
            <img 
              :src="portraitImage" 
              alt="Emmanuel GBRA" 
              class="portrait-img"
              @error="handleImgError"
            />
          </div>
        </div>

        <!-- Exact overlapping headline in FlechaBronzeaM font & deep teal -->
        <div class="field--name-field-longtext1">
          <h2 class="hero-bengio-h2">
            {{ t.hero.headline }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '../stores/languageStore'

const { t } = useLanguage()
const portraitImage = ref('/images/site/emmanuel-hero-bengio.jpg')

const handleImgError = (e) => {
  e.target.src = '/profile-photo.png'
}
</script>

<style scoped>
.bengio-hero-wrapper {
  position: relative;
  padding-top: 140px;
  padding-bottom: 0;
}

.bengio-hero-stage {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3.5rem;
  position: relative;
}

/* Exact replication of Yoshua Bengio's .group-hero */
.group-hero {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  min-height: 520px;
}

/* The real original gradient image from yoshuabengio.org */
.group-hero:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 55%;
  width: 2150px;
  height: 1500px;
  background-image: url(/images/decorations/bengio-hero-gradient.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

/* Imposing Circular Portrait Image (width 520px) */
.field--name-field-image1 {
  line-height: 0;
  border-radius: 100%;
  overflow: hidden;
  width: 520px;
  min-width: 520px;
  height: 520px;
  background-color: #70afbe; /* Exact sampled Bengio circle color */
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-shrink: 0;
}

.circle-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* Overlapping Text (-60px left margin, exact Bengio CSS) */
.field--name-field-longtext1 {
  flex: 1;
  margin-left: -55px;
  position: relative;
  z-index: 2;
}

/* H2 in FlechaBronzeaM font: massive, condensed, high-contrast, Terre Chaude / Expresso #1f1612 */
.hero-bengio-h2 {
  font-family: "FlechaBronzeaM", 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3.6rem, 5.8vw, 6rem);
  line-height: 1.04;
  color: #1f1612; /* Terre Chaude / Expresso : contraste thermique sombre chaleureux sur fond vert/menthe */
  font-weight: 400;
  letter-spacing: -0.025em;
  margin: 0;
  padding: 0;
}

/* Responsive breakdowns matching Bengio's media queries */
@media (max-width: 1200px) {
  .field--name-field-image1 {
    width: 440px;
    min-width: 440px;
    height: 440px;
  }
  .field--name-field-longtext1 {
    margin-left: -40px;
  }
  .hero-bengio-h2 {
    font-size: 4.2rem;
  }
}

@media (max-width: 992px) {
  .bengio-hero-wrapper {
    padding-top: 110px;
  }
  .group-hero {
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    min-height: auto;
  }
  .field--name-field-image1 {
    width: 360px;
    min-width: 360px;
    height: 360px;
    margin-bottom: 25px;
  }
  .field--name-field-longtext1 {
    margin-left: 0;
    text-align: center;
  }
  .hero-bengio-h2 {
    font-size: 3.2rem;
  }
  .group-hero:after {
    left: 50%;
    width: 1500px;
    height: 1100px;
  }
}

@media (max-width: 600px) {
  .field--name-field-image1 {
    width: 270px;
    min-width: 270px;
    height: 270px;
  }
  .hero-bengio-h2 {
    font-size: 2.5rem;
  }
}
</style>
