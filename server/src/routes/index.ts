import express from 'express'
import userRouter from './userRoutes'
import collabRoutes from './collabRoutes'
import messageRoutes from './messageRoutes'
import documentRoutes from './documentRoutes'
//创建路由实例
const router = express.Router()
router.use(userRouter)
router.use(collabRoutes)
router.use(messageRoutes)
router.use(documentRoutes)
//导出路由实例
export default router