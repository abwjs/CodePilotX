import mongoose from "mongoose";
const GroupsSchema = new mongoose.Schema({
  // 文档标题
  title:{
    type:String,
    default:'新建文档',
  },
   // Yjs 二进制快照 (Y.encodeStateAsUpdate(ydoc)) 即内容
  content: {
    type: Buffer, required: true
  },
  //协同用户 
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,  // 使用ObjectId类型
    ref: 'User',  // 关联用户模型
    default:[]
  }],
  //创建者id
  creator: {
    type: [mongoose.Schema.Types.ObjectId], // 明确字段是 ObjectId 数组
    ref: 'User',                           // 引用 User 模型
    default: []                            // 字段默认值为空数组
  },
  // 历史版本快照
  history: [{ type: Buffer }],
  // // 封面
  // cover:{
    
  // },
}, {
  timestamps: true,
})
const GroupsModel = mongoose.model('GroupsSchema',GroupsSchema)
export default GroupsModel