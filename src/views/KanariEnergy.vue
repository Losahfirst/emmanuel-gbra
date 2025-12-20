<template>
  <div class="kanari-energy-page">
    <KanariHeader />
    <main class="kanari-main">
      <section id="dashboard" class="page-section">
        <Dashboard />
      </section>
      <section id="analytics" class="page-section">
        <AnalyticsPage />
      </section>
      <section id="calendar" class="page-section">
        <CalendarPage />
      </section>
    </main>
    <KanariFooter />
  </div>
</template>

<script setup>
import KanariHeader from '../components/modules/energy/KanariHeader.vue'
import KanariFooter from '../components/modules/energy/KanariFooter.vue'
import Dashboard from '../components/modules/energy/Dashboard/Dashboard.vue'
import AnalyticsPage from '../components/modules/energy/Analytics/AnalyticsPage.vue'
import CalendarPage from '../components/modules/energy/Calendar/CalendarPage.vue'
</script>

<style scoped>
.kanari-energy-page {
  min-height: 100vh;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
}

.kanari-main {
  flex: 1;
  padding-top: 80px;
}

.page-section {
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .kanari-main {
    padding-top: 70px;
  }
  
  .page-section {
    min-height: calc(100vh - 70px);
    padding: 1rem 0;
  }
}

@media (max-width: 480px) {
  .kanari-main {
    padding-top: 60px;
  }
  
  .page-section {
    min-height: calc(100vh - 60px);
    padding: 0.75rem 0;
  }
}
</style>
