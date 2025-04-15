import { Response, Request } from "express";
import ModelObj from "../models/index";
import { getSocketIdByUserId, io } from "../utils/socket";
let { MessageModel, GroupsModel, User } = ModelObj;
export const sendMessageInGroup = async (req: Request, res: Response) => {
  let { content, sender, docId } = req.body;
  const document = await GroupsModel.findOne({
    _id: docId,
    "collaborators.user": sender, // 检查用户是否是协作者
  });
  if (!document) {
    res.status(400).json({ code: 1, msg: "错误" });
  }
  const newMessage = await MessageModel.create({
    content,
    sender,
    docId,
  });
  const user = {
    ...(await User.findOne({
      sender,
    }).select("username images")),
    docId:newMessage.docId,
    content: newMessage.content,
    createAt: newMessage.createdAt,
  };
  io.in(docId.toString()).emit("new-message-group", user);
  res.status(200).json({ code: 0, msg: user });
};

export const getMessages = async (req: Request, res: Response) => {
  let { docId } = req.params;
};

export const withdrawMessage = () => {};
