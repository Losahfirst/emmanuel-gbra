<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo" @click="closeMenu">
          <img src="/profile-photo.png" alt="Emmanuel Gbra" class="profile-photo-header" />
          <span class="logo-text">EMMANUEL GBRA</span>
        </router-link>
        <ul class="nav-links" :class="{ 'nav-open': isMenuOpen }">
          <li class="nav-item-dropdown">
            <button 
              class="nav-link dropdown-trigger" 
              @click="toggleDropdown"
              :class="{ active: isDropdownOpen }"
            >
              <IconWrapper name="briefcase" size="sm" />
              <span>Mon Parcours</span>
              <IconWrapper name="chevron-down" size="xs" class="dropdown-arrow" :class="{ rotated: isDropdownOpen }" />
            </button>
            <ul v-if="isDropdownOpen" class="dropdown-menu">
              <li>
                <a href="#about" @click.prevent="closeMenuAndScroll('about')" class="dropdown-link">
                  <IconWrapper name="briefcase" size="sm" />
                  <span>À Propos</span>
                </a>
              </li>
              <li>
                <a href="#experience" @click.prevent="closeMenuAndScroll('experience')" class="dropdown-link">
                  <IconWrapper name="document" size="sm" />
                  <span>Expérience</span>
                </a>
              </li>
              <li>
                <a href="#projects" @click.prevent="closeMenuAndScroll('projects')" class="dropdown-link">
                  <IconWrapper name="sparkles" size="sm" />
                  <span>Projets</span>
                </a>
              </li>
              <li>
                <a href="#articles" @click.prevent="closeMenuAndScroll('articles')" class="dropdown-link">
                  <IconWrapper name="book" size="sm" />
                  <span>Mes Articles</span>
                </a>
              </li>
              <li>
                <a href="#skills" @click.prevent="closeMenuAndScroll('skills')" class="dropdown-link">
                  <IconWrapper name="cpu" size="sm" />
                  <span>Compétences</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/kanari-energy" class="nav-link" @click="closeMenu">
              <IconWrapper name="bolt" size="sm" />
              <span>KANARI</span>
            </router-link>
          </li>
          <li>
            <router-link to="/team-connect" class="nav-link" @click="closeMenu">
              <IconWrapper name="users" size="sm" />
              <span>Team Connect</span>
            </router-link>
          </li>
          <li>
            <a href="#contact" @click.prevent="closeMenuAndScroll('contact')" class="nav-link">
              <IconWrapper name="envelope" size="sm" />
              <span>Contact</span>
            </a>
          </li>
        </ul>
        <a href="#contact" class="btn btn-primary desktop-btn" @click.prevent="scrollTo('contact')">
          <IconWrapper name="envelope" size="sm" />
          <span>Contact Me</span>
        </a>
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import IconWrapper from './icons/IconWrapper.vue'

const router = useRouter()
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const scrollTo = (section) => {
  // Si on est sur la page d'accueil, scroll vers la section
  if (router.currentRoute.value.path === '/') {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    // Sinon, naviguer vers la page d'accueil avec le hash
    router.push({ path: '/', hash: `#${section}` }).then(() => {
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    })
  }
}

const closeMenuAndScroll = (section) => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
  scrollTo(section)
}

const closeMenu = () => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    isDropdownOpen.value = false
  }
}

const toggleDropdown = (e) => {
  e.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdownOnClickOutside = (e) => {
  if (!e.target.closest('.nav-item-dropdown')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--white);
  border-bottom: var(--border-thick) solid var(--border-color);
  z-index: 1000;
  padding: 1.25rem 0;
  box-shadow: 0 4px 0px rgba(0, 0, 0, 0.05);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  color: var(--accent-orange);
}

.profile-photo-header {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-orange);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dark-gray);
  letter-spacing: -0.03em;
  font-family: 'Space Grotesk', sans-serif;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--dark-gray);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  position: relative;
  font-family: 'Space Grotesk', sans-serif;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.nav-link :deep(svg) {
  width: 1.125rem;
  height: 1.125rem;
}

.nav-link:hover {
  background: var(--accent-yellow);
  color: var(--dark-gray);
}

.nav-item-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-arrow {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--white);
  border: var(--border-thick) solid var(--border-color);
  border-radius: 1rem;
  box-shadow: var(--shadow-game);
  list-style: none;
  padding: 0.5rem;
  margin-top: 0.5rem;
  min-width: 220px;
  z-index: 1001;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--dark-gray);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
}

.dropdown-link:hover {
  background: var(--accent-yellow);
  color: var(--dark-gray);
}

.dropdown-link :deep(svg) {
  width: 1.125rem;
  height: 1.125rem;
}

.header .btn {
  padding: 0.75rem 1.75rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header .btn :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: var(--dark-gray);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 968px) {
  .desktop-btn {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--white);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 5rem 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    border-right: var(--border-thick) solid var(--border-color);
    box-shadow: var(--shadow-game);
  }
  
  .nav-links.nav-open {
    transform: translateX(0);
  }
  
  .nav-links a,
  .nav-links .nav-link {
    font-size: 1.25rem;
    padding: 1rem 2rem;
    width: 100%;
    text-align: center;
    border: var(--border-thick) solid var(--border-color);
    border-radius: 1rem;
    justify-content: center;
  }
  
  .nav-links a :deep(svg),
  .nav-links .nav-link :deep(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .dropdown-menu {
    position: static;
    margin-top: 0.5rem;
    width: 100%;
  }
  
  .dropdown-link {
    justify-content: center;
  }
  
  .logo-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 0.85rem;
  }
  
  .header {
    padding: 1rem 0;
  }
}
</style>
