import request from '../utils/request'
enum API {
  CREATE_URL = '/api/document/create',
  GET_URL = '/api/document/get',
  UPDATETITLE = '/api/document/updateTitle',
  UPLOADCOVER_URL='/api/document/cover'
}
//创建文档
export const reqCreate = (creator: string) =>
  request.post(API.CREATE_URL, { creator })

//获取文档列表
export const reqGet = (currentUserId: string, type: string) =>
  request.get(API.GET_URL, {params:{ currentUserId, type }})

// 修改文档标题
export const updateTitle = (title:string,docId:string,userId:string)=>
  request.post(API.UPDATETITLE,{title,docId,userId})
//修改封面
export const uploadCover = (docId:string,formDate:FormData)=>{
    return request.post(`${API.UPLOADCOVER_URL}/${docId}`,formDate,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}