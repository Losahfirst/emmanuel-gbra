<template>
  <div class="project-detail" v-if="project">
    <h1>{{ project.name }}</h1>
    <p>{{ project.description }}</p>

    <p>
      <strong>Dépôt :</strong>
      <a :href="project.repo" target="_blank" rel="noopener">Ouvrir le dépôt GitHub</a>
    </p>

    <div class="docs">
      <h3>Documents</h3>
      <div v-if="resolvedDocs && resolvedDocs.length">
        <div v-for="doc in resolvedDocs" :key="doc.name" class="doc-item">
          <p>
            <a :href="doc.url" target="_blank" rel="noopener">{{ doc.name }}</a>
            <span v-if="doc.unavailable"> — indisponible</span>
          </p>

          <div v-if="doc.isPdf && !doc.unavailable" class="pdf-viewer">
            <iframe :src="doc.url" width="100%" height="600" frameborder="0"></iframe>
          </div>

          <div v-else-if="!doc.isPdf && !doc.unavailable" class="file-viewer">
            <p>Fichier non-PDF — cliquez pour télécharger/ouvrir.</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucun document disponible. Ouvrez le dépôt pour plus d'informations.</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Projet non trouvé.</p>
  </div>
</template>

<script>
import projects from '../ecobin/ecobinData'

export default {
  name: 'ProjectDetail',
  props: ['id'],
  data() {
    return {
      resolvedDocs: null
    }
  },
  computed: {
    project() {
      return projects.find(p => p.id === this.id)
    }
  },
  mounted() {
    this.resolveDocs()
  },
  methods: {
    isPdfUrl(url) {
      return url && url.toLowerCase().endsWith('.pdf')
    },
    async testUrl(url) {
      try {
        const res = await fetch(url, { method: 'HEAD' })
        return res.ok
      } catch (e) {
        return false
      }
    },
    async resolveDocs() {
      if (!this.project || !this.project.docs) {
        this.resolvedDocs = []
        return
      }

      const results = []
      for (const doc of this.project.docs) {
        let chosen = { name: doc.name, url: null, isPdf: false, unavailable: true }

        if (doc.local) {
          const okLocal = await this.testUrl(doc.local)
          if (okLocal) {
            chosen.url = doc.local
            chosen.isPdf = this.isPdfUrl(doc.local)
            chosen.unavailable = false
            results.push(chosen)
            continue
          }
        }

        if (doc.raw) {
          const okRaw = await this.testUrl(doc.raw)
          if (okRaw) {
            chosen.url = doc.raw
            chosen.isPdf = this.isPdfUrl(doc.raw)
            chosen.unavailable = false
            results.push(chosen)
            continue
          }
        }

        // nothing available
        results.push(chosen)
      }

      this.resolvedDocs = results
    }
  }
}
</script>

<style scoped>
.pdf-viewer { margin-top: 0.5rem; border: 1px solid #ddd }
.doc-item { margin-bottom: 1rem }
</style>
