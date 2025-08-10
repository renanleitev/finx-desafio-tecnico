import { createRouter, createWebHistory } from 'vue-router'
import SchedulesView from './views/SchedulesView.vue'

const routes = [
  {
    path: '/',
    name: 'SchedulesView',
    component: SchedulesView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
