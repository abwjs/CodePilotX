import { defineStore } from 'pinia'
import { reqGetMessage } from '../../api/Message'
import type {  ChatState } from '../types/message'
export const useMessageStore = defineStore('useMessageStore', {
  state: (): ChatState => {
    return {
      //全部文档的信息按id分组消息缓存
      messageCache: new Map(),
      activeMessages: [],
      pagination: new Map(),
    }
  },
  actions: {
    //初始化文档聊天消息
    async getMessage(docId: string) {
      //如果当前文档不存在消息
      if (!this.messageCache.has(docId)) {
        this.messageCache.set(docId, [])
        this.pagination.set(docId, {
          currentPage: 1,
          totalPages: 1,
        })
      }
      const ret = await reqGetMessage(docId)
      console.log(ret); 
    },
  },
})
