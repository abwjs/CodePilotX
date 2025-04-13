import router from "./router";
import NProgress from "./config/nprogress";
router.beforeEach((to, from, next) => {
  // 用户权限和登录判断
  // if(to.name != 'Login') {
  //   console.log(1);
    
  //   const token = localStorage.getItem('token')
  //   if(!token) {
  //     router.push('/login')
  //   }else {
  //     next()
  //   }
  // }
  // else {
  //   next()
  // }
  next()
  NProgress.start();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to, from, next) => {
  NProgress.done();
});
