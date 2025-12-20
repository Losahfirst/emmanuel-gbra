import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TeamConnect from '../views/TeamConnect.vue'
import KanariDashboard from '../views/KanariDashboard.vue'
import KanariAnalytics from '../views/KanariAnalytics.vue'
import KanariCalendar from '../views/KanariCalendar.vue'
import KanariConsumption from '../views/KanariConsumption.vue'
import KanariInfrastructure from '../views/KanariInfrastructure.vue'
import KanariProduction from '../views/KanariProduction.vue'
import KanariAPI from '../views/KanariAPI.vue'
import KanariCentrales from '../views/KanariCentrales.vue'
import KanariMapping from '../views/KanariMapping.vue'
import KanariPrediction from '../views/KanariPrediction.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/team-connect',
    name: 'TeamConnect',
    component: TeamConnect
  },
  {
    path: '/kanari-energy',
    redirect: '/kanari-energy/dashboard'
  },
  {
    path: '/kanari-energy/dashboard',
    name: 'KanariDashboard',
    component: KanariDashboard
  },
  {
    path: '/kanari-energy/production',
    name: 'KanariProduction',
    component: KanariProduction
  },
  {
    path: '/kanari-energy/consumption',
    name: 'KanariConsumption',
    component: KanariConsumption
  },
  {
    path: '/kanari-energy/infrastructure',
    name: 'KanariInfrastructure',
    component: KanariInfrastructure
  },
  {
    path: '/kanari-energy/analytics',
    name: 'KanariAnalytics',
    component: KanariAnalytics
  },
  {
    path: '/kanari-energy/calendar',
    name: 'KanariCalendar',
    component: KanariCalendar
  },
  {
    path: '/kanari-energy/api',
    name: 'KanariAPI',
    component: KanariAPI
  },
  {
    path: '/kanari-energy/centrales',
    name: 'KanariCentrales',
    component: KanariCentrales
  },
  {
    path: '/kanari-energy/mapping',
    name: 'KanariMapping',
    component: KanariMapping
  },
  {
    path: '/kanari-energy/prediction',
    name: 'KanariPrediction',
    component: KanariPrediction
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
