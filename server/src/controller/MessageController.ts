import { Response, Request } from "express";
import ModelObj from "../models/index";
const { MessageModel} = ModelObj;

//获取消息
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { docId } = req.query;
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
      data:r2,
    });
  } catch (err: any) {
    res.status(500).json({
      code:0,
      msg:'失败'
    });
  }
};