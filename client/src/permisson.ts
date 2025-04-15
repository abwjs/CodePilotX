import router from "./router";
import NProgress from "./config/nprogress";

router.beforeEach((to, from, next) => {
  // 用户权限和登录判断
  if (to.path !== '/user/login' && to.path !== '/user/register') {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/user/login'); 
    } else {
      next();
    }
  } else {
    next(); // 允许访问登录页面
  }
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});