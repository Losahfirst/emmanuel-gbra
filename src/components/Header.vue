<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <a href="#" class="logo">Emmanuel<span>.</span></a>
    
    <nav class="nav" :class="{ active: menuOpen }">
      <a href="#home" @click="closeMenu">Home</a>
      <a href="#about" @click="closeMenu">About</a>
      <a href="#experience" @click="closeMenu">Parcours</a>
      <a href="#skills" @click="closeMenu">Skills</a>
      <a href="#awards" @click="closeMenu">Awards</a>
      <a href="#work" @click="closeMenu">Work</a>
      <a href="#articles" @click="closeMenu">Articles</a>
      <a href="#contact" @click="closeMenu">Contact</a>
    </nav>
    
    <div class="menu-toggle" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
