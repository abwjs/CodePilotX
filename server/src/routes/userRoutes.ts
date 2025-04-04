import express from "express";
import jwt from "jsonwebtoken";
// 引入user控制器
import user from '../controller/user'

const router = express.Router();
const {login,register,getCurrentUser,updateCurrentUser} = user

// 用户登录
router.post('/users/login',login)

// 用户注册(userValidator.register:用户验证，验证通过执行下一个中间件函数)
router.post('/users',register)
// 获取当前登录用户
router.get('/user',getCurrentUser)
// 更新当前登录用户
router.put('/user',updateCurrentUser)

router.get("/", function (req, res, next) {
  let token = jwt.sign({ username: "zhangsan" }, "test123456", {
    expiresIn: "360s",
    algorithm: "HS256",
  });
  console.log(req.query);
  res.json({
    code: 1,
    msg: "注册成功",
    token,
  });
});
export default router;
