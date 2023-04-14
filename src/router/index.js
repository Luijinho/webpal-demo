import { createRouter, createWebHashHistory } from 'vue-router'
import PlaygroundView from '../views/PlaygroundView.vue'
import ExercisesView from '../views/ExercisesView.vue'

const routes = [
  {
    path: '/playground/:exerciseData+',
    name: 'Playground',
    component: PlaygroundView,
    props: true
  },
  {
    path: '/',
    name: 'Exercises',
    component: ExercisesView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router