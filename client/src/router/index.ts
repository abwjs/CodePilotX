import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  routes: [
  {
    path:'/',
    name:'Home',
    component:()=>import('@/views/HomeIndex.vue')
  },
    {
      path: '/user/register',
      name: 'Register',
      component: () => import('@/views/UserRegister.vue'),
      children: []
    },
    {
      path: '/user/login',
      name: 'Login',
      component: () => import('@/views/UserLogin.vue'),
      children: []
    },
     {
      path: '/document',
      name: 'Document',
      component: () => import('@/views/DocumentEditor.vue'),
      children: []
     }
  ],
  history: createWebHistory()
})
 
export default router