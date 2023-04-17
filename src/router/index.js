import { createRouter, createWebHashHistory } from 'vue-router'
import PlaygroundView from '../views/PlaygroundView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'Playground',
    component: PlaygroundView,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router