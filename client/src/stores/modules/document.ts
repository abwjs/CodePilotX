import { defineStore } from 'pinia'
import { reqCreate ,reqGet} from '../../api/Document'
export const useDocumentStore = defineStore('useDocumentStore', {
  state: () => {
    return {
      //文档标题
      title: '新建文档',
      //当前文档id
      docId: null as string | null,
      // 文档列表
      documentList:[]
    }
  },
  actions: {
    //创建文档
    async createDocument(creato: string) {
      try {
        const res = await reqCreate(creato)
        this.docId = res.data.docId
        return this.docId
      } catch (err) {
        console.log(err)
      }
    },
    //获取文档列表
    async getDocumentList( currentUserId:string,type:string) {
      try {
        const  {data} = await reqGet(currentUserId,type)
        this.documentList = data.data
        return data
      }catch(err) {
        console.log(err);
      }
    } 
  },
})
