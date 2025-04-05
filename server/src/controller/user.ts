import { Request, Response, NextFunction } from "express";
import ModelObj from "../models/index";
import jwt from "jsonwebtoken";
import confing from "../config/config.default";
let {jwtSecret} = confing
let { User } = ModelObj;
// 用户注册
const register = async (
  req: Request<
    {},
    {},
    {
      username: string;
      password: string;
      email: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  // 拿到请求体数据
  console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  // 验证数据保存到数据库
  if (username && password && email) {
    User.create(req.body)
      .then((r) => {
        console.log(req.body);
        res.json({
          code: 1,
          msg: "注册成功",
        });
      })
      .catch((err) => {
        console.log(req.body);
        res.json({
          code: 0,
          msg: "注册失败",
          err: "用户名已经存在",
        });
      });
  } else {
    res.json({
      code: 0,
      msg: "注册失败-缺少参数",
    });
  }
};

// 用户登录
const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.query);
  let { username, password } = req.query;
  // 通过username和password查找用户信息
  User.findOne({ username, password }).then((r) => {
    //没有查找到
    if (r == null) {
      res.json({
        code: 0,
        msg: "登录失败",
      });
    } else {
      // 如果登录成功 返回jwt  ，并且在token 中存入用户名
      // 生成的token 的时候需要作者id 存入，下次请求的时候我们知道作者是谁
      let token = jwt.sign({ username: username, uid: r._id }, jwtSecret, {
        expiresIn: "365d",
        algorithm: "HS256",
      });
      res.json({
        code: 1,
        msg: "登录成功",
        token,
        uid: r._id,
        username,
        image: r.image,
        bio: r.bio,
      });
    }
  });
};

// 获取当前用户
const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

export default { register, login, getCurrentUser, updateCurrentUser };
