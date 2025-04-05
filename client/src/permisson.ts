import router from "./router";
import NProgress from "./config/nprogress";
router.beforeEach((to, from, next) => {
  // 用户权限和登录判断
  next();
  NProgress.start();
});

router.afterEach((to, from, next) => {
  console.log(to,from,next);
  
  NProgress.done();
  
});
