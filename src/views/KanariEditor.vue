<template>
  <div class="kanari-editor-wrapper">
    <KanariHeader />
    <EditorPage />
    <KanariFooter />
  </div>
</template>

<script setup>
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import EditorPage from '../components/modules/energy/Editor/EditorPage.vue'
</script>

<style scoped>
.kanari-editor-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
