import mongoose from "mongoose";
const GroupsSchema = new mongoose.Schema({
  // 文档标题
  title:{
    type:String,
    default:'新建文档',
  },
  //内容
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
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
  //websocket会话id
  wsSessionId:{
    type:String,
  }
})
const GroupsModel = mongoose.model('GroupsSchema',GroupsSchema)
export default GroupsModel