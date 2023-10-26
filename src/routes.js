import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/',
      component: () => import('./pages/Login.vue')
    },
    {
      path: '/app',
      component: () => import('./pages/Base.vue'),
      children: [
        {
          name: 'board',
          path: 'board',
          component: () => import('./pages/Boards.vue')
        },
        {
          name: 'board-detail',
          path: 'board/:id',
          component: () => import('./pages/Board.vue')
        },
        {
          name: 'chart',
          path: 'chart',
          component: () => import('./pages/Charts.vue')
        },
        {
          name: 'chart-detail',
          path: 'chart/:id',
          component: () => import('./pages/Chart.vue')
        },
        {
          name: 'employee',
          path: 'employee',
          component: () => import('./pages/Employee.vue')
        },
        {
          name: 'profile',
          path: 'profile',
          component: () => import('./pages/Profile.vue')
        }
      ]
    }
  ]
})

export default routes

