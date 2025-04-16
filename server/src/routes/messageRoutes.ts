import express from 'express'
const router = express.Router()
import {
  getMessages,
  sendMessageInGroup,
} from "../controller/MessageController"
//发送消息接口
router.post("/message/sendMessage", sendMessageInGroup)
//获取消息接口
router.get("/message/getMessage/:docId",  getMessages)

export default router