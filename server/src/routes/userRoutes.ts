import express from "express";
// 引入user控制器
import user from '../controller/user'

const router = express.Router();
const {login,register,getCurrentUser,updateCurrentUser} = user


// 用户注册(register:用户验证，验证通过执行下一个中间件函数)
router.post('/users',register)
// 用户登录
router.post('/users/login',login)
// 获取当前登录用户
router.get('/user',getCurrentUser)
// 更新当前登录用户
router.put('/user',updateCurrentUser)
export default router;
