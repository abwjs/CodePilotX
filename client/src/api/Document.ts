import request from '../utils/request'
enum API {
  CREATE_URL = '/api/document/create',
  GET_URL = '/api/document/get',
}
//创建文档
export const reqCreate = (creator: string) =>
  request.post(API.CREATE_URL, { creator })

//获取文档列表
export const reqGet = (currentUserId: string, type: string) =>
  request.get(API.GET_URL, {params:{ currentUserId, type }})