import { createRouter, createWebHistory } from 'vue-router'
import SchedulesView from '@/views/SchedulesView.vue'
import ScheduleForm from '@/views/ScheduleForm.vue'

const routes = [
  {
    path: '/',
    name: 'SchedulesView',
    component: SchedulesView,
  },
  {
    path: '/schedule/new',
    name: 'ScheduleCreate',
    component: ScheduleForm,
  },
  {
    path: '/schedule/:id/edit',
    name: 'ScheduleEdit',
    component: ScheduleForm,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
