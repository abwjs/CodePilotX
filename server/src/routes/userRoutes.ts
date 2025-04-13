import express from "express";
// 引入user控制器
import user from '../controller/user'
import EmailSend from "../controller/emailSendController";

const router = express.Router();
const {login,logout,register,getCurrentUser,updateCurrentUser} = user


// 用户注册
router.post('/users/register',register)
// 用户登录
router.post('/users/login',login)
router.post('/user/logout',logout)
// 发送邮箱验证码
router.post('/email',EmailSend)

// 获取当前登录用户
router.get('/user',getCurrentUser)
// 更新当前登录用户
router.put('/user',updateCurrentUser)
export default router;
