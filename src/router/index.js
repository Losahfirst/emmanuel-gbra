import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TeamConnect from '../views/TeamConnect.vue'

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
  }
  ,
  {
    path: '/representative-works',
    name: 'RepresentativeWorks',
    component: () => import('../views/RepresentativeWorks.vue')
  },
  {
    path: '/representative-works/:id',
    name: 'ProjectDetail',
    component: () => import('../components/ProjectDetail.vue'),
    props: true
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
