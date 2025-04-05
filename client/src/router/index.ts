import { createRouter, createWebHistory } from 'vue-router'
 
const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeIndex.vue'),
      children: []
    },
  ],
  history: createWebHistory()
})
 
export default router