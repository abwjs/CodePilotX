import request from '../utils/request'
enum API {
  GET_URL = '/api/message/getMessage',
}
// 获取文档中的聊天消息
export const reqGetMessage = (docId: string) =>
  request.get(API.GET_URL, { params: { docId } })
