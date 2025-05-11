import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomeIndex.vue'),
      meta: {
        title: '首页',
        isLogin: true,
      },
      children:[
        {
          path: '/home/userIndex',
          name: 'User',
          component: () => import('@/views/UserIndex.vue'),
          meta: {
            title: '用户中心',
            isLogin: true,
          },
        },
      ]
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
      path: '/document/:docId',
      name: 'Document',
      component: () => import('@/views/DocumentEditor.vue'),
      children: [],
      meta: {
        title: '文档',
        isLogin: true,
      },
    },
     {
      path:'/mydocument',
      name: 'MyDocument',
      component: () => import('@/views/MyDocument.vue'),
      meta: {
        title: '我的文档',
        isLogin: true,
      },
     }
  ],
  history: createWebHistory(),
})

export default router
