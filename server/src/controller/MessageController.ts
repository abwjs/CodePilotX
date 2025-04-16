import { Response, Request } from "express";
import ModelObj from "../models/index";
import { getSocketIdByUserId, io } from "../utils/socket";
let { MessageModel, GroupsModel, User } = ModelObj;
//发送消息
export const sendMessageInGroup = async (req: Request, res: Response) => {
  let { content, sender, docId } = req.body;
  if (!content || !sender || !docId) {
    res.status(400).json({
      code: 0,
      msg: "失败",
    });
  }
  //根据文档id查找文档数据
  const document = await GroupsModel.findOne({
    _id: docId,
    collaborators: sender, // 检查用户是否是协作者
  });
  if (!document) {
    res.status(400).json({ code: 0, msg: "错误" });
  }
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
  io.in(docId.toString()).emit("new-message-group", user);
  res.status(200).json({ code: 0, msg: '成功',...user });
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    let { docId } = req.params;
    //根据文档id查询消息和消息发送者信息
    let r = await MessageModel.find({ docId }).populate({
      path: "sender",
      select: "username image",
      model: "User",
    });
    if (r == null) {
      res.status(400).json({
        code: 0,
        msg: "没有该文档",
      });
    }
    let r2 = r.map((msg) => ({
      id: msg._id,
      content: msg.content,
      createdAt: msg.createdAt,
      sender: {
        id: msg.sender._id,
        username: (msg.sender as any).username,
        avatar: (msg.sender as any).image,
      },
    }));
    res.status(200).json({
      code: 1,
      msg: "发送成功",
      ...r2,
    });
  } catch (err: any) {
    res.status(500).json({
      code:0,
      msg:'失败'
    });
  }
};