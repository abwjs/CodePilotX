import express from "express";
// 引入user控制器
import user from '../controller/user'
import EmailSend from "../controller/emailSendController";
import { upload } from "../middleware/upload";
const router = express.Router();
const {login,logout,register,getCurrentUser,uploadAvatar} = user


// 用户注册
router.post('/users/register',register)
// 用户登录
router.post('/users/login',login)
//退出登录
router.post('/users/logout',logout)
// 发送邮箱验证码
router.post('/email',EmailSend)
// 获取当前登录用户
router.get('/users/:userId',getCurrentUser)
//上传头像
//upLoad.single要和前端的formdate添加的名字相同
router.post('/users/avatar/:userId',upload.single('image'),uploadAvatar)
export default router;
