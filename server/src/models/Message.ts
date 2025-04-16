import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  //发送者id
  sender: {
    required:true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // 关联文档id
  docId: { type: String, required: true },
  //内容
  content: { type: String, required: true },
},
{
  //时间戳自动添加 createdAt 和 updatedAt 时间戳
  timestamps: true,
})
const MessageModel = mongoose.model('Message', MessageSchema)

export default MessageModel