import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
