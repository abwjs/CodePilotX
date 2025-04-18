import router from './router'
import NProgress from './config/nprogress'

router.beforeEach((to, from, next) => {
  // 用户权限和登录判断
  const isLogin = to.meta.isLogin
  if (isLogin) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/user/login')
    } else {
      next()
    }
  } else {
    next()
  }
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
