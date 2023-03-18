import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/timeline',
    name: 'timeline'
  },
  {
    path: '/shuffle',
    name: 'shuffle'
  },
  {
    path: '/events',
    name: 'events'
  },
  {
    path: '/collections',
    name: 'collections'
  },
  {
    path: '/contact',
    name: 'contact'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
