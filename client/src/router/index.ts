import { createRouter, createWebHistory } from 'vue-router'
 
const router = createRouter({
  routes: [
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
      path:'/',
      name:'Home',
      component:()=>import('@/views/EditorIndex.vue')
    }
  ],
  history: createWebHistory()
})
 
export default router