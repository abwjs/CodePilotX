import express from 'express'
const router = express.Router()
import {
  getMessages,
} from "../controller/MessageController"
//获取消息接口
router.get("/message/getMessage",  getMessages)

export default router