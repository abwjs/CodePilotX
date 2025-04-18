import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeIndex.vue'),
      meta: {
        title: '首页',
        isLogin: true,
      },
    },
    {
      path: '/user/register',
      name: 'Register',
      component: () => import('@/views/UserRegister.vue'),
      children: [],
      meta: {
        title: '注册',
      },
    },
    {
      path: '/user/login',
      name: 'Login',
      component: () => import('@/views/UserLogin.vue'),
      children: [],
      meta: {
        title: '登录',
      },
    },
    {
      path: '/document',
      name: 'Document',
      component: () => import('@/views/DocumentEditor.vue'),
      children: [],
      meta: {
        title: '注册',
        isLogin:true
      },
    },
  ],
  history: createWebHistory(),
})

export default router
