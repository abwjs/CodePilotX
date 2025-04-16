import { Response, Request, NextFunction } from "express";
import GroupsModel from "../models/Groups";
import MessageModel from "../models/Message";
import User from "../models/User";
//创建文档
export const createDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { title = "", content = "", collaborators, creator } = req.body;
  let r = await GroupsModel.create({
    title,
    content,
    collaborators,
    creator,
  });
  res.status(200).json({
    code: 1,
    msg: "创建成功",
  });
};

//获取文档的信息
export const getDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { docId } = req.params;
  try {
    let ret = await GroupsModel.findById(docId);
    res.status(200).json({
      code: 1,
      msg: "获取成功",
      ...ret,
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: "失败",
    });
  }
};

//更新文档内容
export const updateDocumentContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //获取文档的内容和id
  let { content, docId } = req.body;
  if (!content || !docId) {
    res.status(404).json({
      code: 0,
      msg: "参数错误",
    });
  }
  try {
    //根据id更新文档内容
    await GroupsModel.findByIdAndUpdate(docId, { content });
    res.status(200).json({
      code: 0,
      msg: "更新成功",
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: "失败",
    });
  }
};

//增加协同者
export const updateDocumentCollaborator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { docId, userId } = req.body;
  try {
    //判断用户存在吗
    let user = User.findById(userId);
    if (!user) {
      res.status(400).json({
        code: 0,
        msg: "没有这个用户",
      });
    }
    //改协同者
    await GroupsModel.findByIdAndUpdate(
      docId, // 查询条件
      { $addToSet: { collaborators: userId } } // 使用$addToSet防止重复
    );
    res.status(200).json({
      code: 1,
      msg: "增加成功",
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: err,
    });
  }
};

//删除文档
export const removeDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { docId } = req.body;
  try {
    //删除文档
    let ret = await GroupsModel.deleteOne({ _id: docId });
    //删除该文档的消息
    await MessageModel.deleteMany({ docId });
    res.status(200).json({
      code: 1,
      msg: "删除成功",
      ...ret,
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: err,
    });
  }
};
