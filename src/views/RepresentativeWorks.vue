<template>
  <div class="representative-works">
    <h1>Travaux représentatifs</h1>
    <p>Liste des projets représentatifs. Cliquez sur un projet pour voir les détails.</p>

    <div class="projects">
      <div v-for="project in projects" :key="project.id" class="card">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <div class="actions">
          <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }">Voir</router-link>
          <a :href="project.repo" target="_blank" rel="noopener">Voir le dépôt</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from '../ecobin/ecobinData'

export default {
  name: 'RepresentativeWorks',
  data() {
    return {
      projects
    }
  }
}
</script>

<style scoped>
.projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.card { padding: 1rem; border: 1px solid #e6e6e6; border-radius: 6px; }
.actions { margin-top: 0.5rem; display:flex; gap:0.75rem }
</style>
