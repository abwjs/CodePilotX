import express from 'express'
import userRouter from './userRoutes'
import collabRoutes from './collabRoutes'
//创建路由实例
const router = express.Router()
router.use(userRouter)
router.use(collabRoutes)

//导出路由实例
export default router