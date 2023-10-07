import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'board',
      path: '/board',
      component: () => import('./pages/Boards.vue')
    },
    {
      name: 'board-detail',
      path: '/board/:id',
      component: () => import('./pages/Board.vue')
    }
  ]
})

export default routes

