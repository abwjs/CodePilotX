import { defineStore } from 'pinia'
import { CreateConversations } from '../../api/Chat'
import type { Content } from '../../types/Chatmessages'
export const useChatStore = defineStore('useChatStore', {
  state: () => {
    return {
      ConversationsId:null as string | null,
      ContentList: [] as Content[],
    }
  },
  actions: {
    setAIStream(chunk: string) {
      const content = this.ContentList[this.ContentList.length - 1] as Content
      content.content += chunk
    },
    // 初始化ai消息占位
    setAIMessage() {
      this.ContentList.push({
        role: 'assistant',
        content: '',
        id: '1',
      })
    },
    setUserMessage(content: string) {
      this.ContentList.push({
        role: 'user',
        content,
        id: '1',
      })
    },
    //新建会话
    async addConversation() {
      const { data } = await CreateConversations()
      this.ConversationsId = data.id
    },
    //删除会话
    removeConversation(){
      this.ContentList = []
      this.ConversationsId = null
    }
  },
})
