import mongoose from "mongoose";
const GroupsSchema = new mongoose.Schema({
  // 文档标题
  title:{
    type:String,
    required:true,
    default:'新建文档',
  },
  //内容
  content: {
    type:String,
    required:true
  },
  //协同用户
  collaborators: [{
    user: {
      type:String,
      required:true
    }}
  ],
  //websocket会话id
  wsSessionId:{
    type:String,
    required:true
  }
})
const GroupsModel = mongoose.model('GroupsSchema',GroupsSchema)
export default GroupsModel