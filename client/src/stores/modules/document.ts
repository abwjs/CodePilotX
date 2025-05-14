import { defineStore } from 'pinia'
import { reqCreate, updateTitle, reqGet,uploadCover } from '../../api/Document'
export const useDocumentStore = defineStore('useDocumentStore', {
  state: () => {
    return {
      //文档标题
      title: '新建文档',
      //当前文档id
      docId: null as string | null,
      // 文档列表
      documentList: [],
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
    async getDocumentList(currentUserId: string, type: string) {
      try {
        const { data } = await reqGet(currentUserId, type)
        this.documentList = data.data
        console.log(data.data)

        if (this.documentList.length) {
          this.documentList.forEach((item: any) => {
            item.creator.image = `${import.meta.env.VITE_APP_BASE_API}${item.creator.image}`
          })
        }
        return data
      } catch (err) {
        console.log(err)
      }
    },
    // 修改文档标题
    async updateDocumentTitle(title: string, docId: string, userId: string) {
      try {
        const ret = await updateTitle(title, docId, userId)
        console.log(ret)
        this.documentList.forEach((item: any) => {
          if (item._id == docId) {
            item.title = title
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    //修改封面
    async uploadCover(docId: string, formDate: FormData) {
      try {
        const { data } = await uploadCover(docId, formDate)
        this.documentList.forEach((item: any) => {
          if (item._id == docId) {
            item.cover = data.cover
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
})
