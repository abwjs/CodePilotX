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
  collaborators: {
    type:Array<String>
  },
  //创建者
  creator: {
    type:String,
    required:true
  },
  //websocket会话id
  wsSessionId:{
    type:String,
  }
})
const GroupsModel = mongoose.model('GroupsSchema',GroupsSchema)
export default GroupsModel