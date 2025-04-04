import { Request, Response, NextFunction } from 'express'
import ModelObj from '../models/index'
let {User} = ModelObj
// 用户注册
const register = async (
  req: Request<{}, {}, {
    user: any; username:  string; password: string; email: string 
}>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
    try {
        // 1. 拿到请求体数据
        console.log(req.body)
        // 2. 验证数据
            // 2.1 基本数据验证
            // 2.2 业务数据验证
        // 3. 验证通过保存数据库
        const user = new User(req.body.user)
        await user.save()
        // 4. 发送响应
        res.status(201).json({
            user
        })
        
    } catch (error) {
        next(error)
    }
}

// 用户登录
const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body
    // 实际登录逻辑...
  } catch (error) {
    next(error)
  }
}

// 获取当前用户
const getCurrentUser = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    
  } catch (error) {
    next(error)
  }
}

// 更新当前用户
const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error)
  }
}

export default {register,login,getCurrentUser,updateCurrentUser}