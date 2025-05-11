// 用户基本信息类型（用于嵌套）
export interface User {
  _id: string;
  username: string;
  image: string;
}

// 文档主体类型
export interface Document {
  _id: string;
  title: string;
  content: Uint8Array;          // 注意：实际传输使用 Base64 字符串
  collaborators: string[];  // 协作者 ID 数组（ObjectId 字符串）
  creator: User[];          // 包含完整用户对象的数组
  createdAt: string;        // ISO 8601 时间字符串
  updatedAt: string;
  history?: Uint8Array[];   // 可选的历史记录（根据你的接口示例未出现）
}

// 如果 content 需要在前端转换
export interface DecodedGroup extends Omit<Document, 'content'> {
  content: Uint8Array;  // 解码后的二进制内容
}