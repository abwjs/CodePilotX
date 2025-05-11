import { Server, Socket } from "socket.io";
import ModelObj from "../models/index";
let { MessageModel, GroupsModel, User } = ModelObj;
export const handleChatEvents = (io: Server, socket: Socket) => {
  //用户发送消息
  socket.on("sendMessage", async (msg) => {
    //存储消息
    let { content, sender, docId } = msg;
    const document = await GroupsModel.findOne({
      _id: docId,
      collaborators: sender, // 检查用户是否是协作者
    });
    if(!document) {
      console.error('');
    }
    //保持消息
    const newMessage = await MessageModel.create({
      content,
      sender,
      docId,
    });
    //查找发送消息的用户的头像和名字
    let r3 = await User.findOne({
      _id: sender,
    }).select("username image");
    const user = {
      username: r3?.username,
      image: r3?.image,
      docId: newMessage.docId,
      content: newMessage.content,
      createAt: newMessage.createdAt,
    };
    // 广播聊天消息
    io.to(docId).emit("newMessage", user);
  });
};
