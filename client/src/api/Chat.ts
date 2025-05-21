import http from "./utils/http"
import config from "../assets/config"
import type { additional } from "../types/Chatmessages"
import { useChatStore } from "../stores/modules/chat"
type additionalStr = additional[]
const { user_id, bot_id } = config
export const Talk = async (additional_messages: additionalStr) => {
const chatStore = useChatStore()
 
  const Obj = {
    method: 'post',
    path: 'v3/chat',
    data: {
      bot_id,
      user_id,
      stream: true,
      auto_save_history: true,
      // 发送的内容
      additional_messages,
    },
    // 注意判断是不是内联对话框要不要传id
    params: {
      conversation_id: chatStore.ConversationsId,
    },
  }
  // 返回给组件处理
  return http(Obj)
}

//创建会话
export const CreateConversations = async () => {
  const Obj = {
    method: 'post',
    path: 'v1/conversation/create',
  }
  return await http(Obj)
}
