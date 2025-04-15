import { Request, Response, NextFunction } from "express";
import ModelObj from "../models/index";
import { setToken } from "../utils/jwt";
let { User, emailModel } = ModelObj;
// 用户注册
const register = async (
  req: Request<
    {},
    {},
    {
      password: string;
      email: string;
      code: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  // 拿到请求体数据
  let email = req.body.email;
  let code = req.body.code;
  let password = req.body.password;
  if (!email || !code || !password) {
    res.status(400).json({ code: 400, msg: "参数不完整" });
    return
  }
  try {
    // 验证验证码
    const savedCode = await emailModel.findOne({ email });
    if (!savedCode || savedCode.code !== code) {
      res.status(400).json({ code: 400, msg: "验证码错误" });
    }
    //判断用户是否存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ code: 400, msg: '用户已存在' });
    }

    await User.create({ email, password,username:'新用户'});

    // 删除已使用的验证码
    await emailModel.deleteOne({ email });

    res.json({ code: 200, msg: '注册成功' });

  } catch (err) {
    console.error('注册失败:', err);
    res.status(500).json({ code: 500, msg: '注册失败' });
  }
};

// 用户登录
const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  let { email, password } = req.body;
  // 通过username和password查找用户信息
  User.findOne({ email,password }).then(async (r) => {
    //没有查找到
    if (r == null) {
      console.log(r);
      res.status(400).json({
        code: 0,
        msg: "登录失败",
      });
    } else {
      // 如果登录成功 返回jwt
      let token = await setToken(email, r._id)
    
      res.json({
        code: 1,
        msg: "登录成功",
        token,
        uid: r._id,
        username:r.username,
        image: r.image,
        bio: r.bio,
      });
    }
  });
};

//用户退出登录
const logout = ()=>{

}

// 获取当前用户信息
const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {} = req.body
  } catch (error) {
    next(error);
  }
};

// 更新当前用户
const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default { register,logout, login, getCurrentUser, updateCurrentUser };
