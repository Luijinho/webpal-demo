import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaygroundView from '../views/PlaygroundView.vue'
import ExercisesView from '../views/ExercisesView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/playground/:exerciseData+',
    name: 'Playground',
    component: PlaygroundView,
    props: true
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: ExercisesView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router