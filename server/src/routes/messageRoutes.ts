import express from 'express'
const router = express.Router()
router.get('/')
import {
  getMessages,
  sendMessageInGroup,
  withdrawMessage,
} from "../controllers/MessageController.js"
//发送消息接口
router.post("/sendInGroup",  sendMessageInGroup)
//获取消息接口
router.get("/:id",  getMessages)
//删除文档接口
router.delete("/withdraw/:id", withdrawMessage)
export default router