import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import GroupsModel from "../models/Groups";
import MessageModel from "../models/Message";
import User from "../models/User";
//创建文档
export const createDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //拿到创建者id
  let { creator } = req.body;
  const creatorUser = await User.findById(creator);
  if (!creatorUser) {
    res.status(400).json({
      code: 0,
      msg: "创建者不存在",
    });
  }
  try {
    const newDa = await GroupsModel.create({
      collaborators: [creator],
      creator,
    });
    res.status(200).json({
      code: 1,
      msg: "创建成功",
      docId: newDa._id,
    });
  } catch (err) {
    res.status(404).json({
      code: 0,
      msg: "创建失败",
    });
  }
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

//改标题
export const updateTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { title, docId, userId } = req.body;
  const doc = await GroupsModel.findOne({
    _id: docId,
    collaborators: userId,
  });
  if (!doc) {
    res.status(400).json({
      code: 0,
      msg: "无权修改",
    });
  }
  try {
    const updated = await GroupsModel.findByIdAndUpdate(
      docId,
      {
        title,
      },
      { new: true }
    ).select("title");
    res.status(200).json({
      code: 1,
      msg: "修改成功",
      title: updated!.title,
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: "修改失败",
    });
  }
};

//更新文档内容
export const updateContent = async (
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
export const addCollaborator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { docId, userId } = req.body;
  //判断用户存在吗
  let user = await User.findById(userId);
  if (!user) {
    res.status(400).json({
      code: 0,
      msg: "没有这个用户",
    });
  }
  try {
    //增加协同者
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

//用户退出协同
export const removeCollaborator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { docId, userId } = req.body;
  if (!docId || !userId) {
    res.status(400).json({
      code: 0,
      msg: "参数错误",
    });
  }
  //判断用户是协作者吗
  const doc = await GroupsModel.findOne({
    _id: docId,
    collaborators: userId
  });
  if(!doc) {
    res.status(400).json({
      code: 0,
      msg: "该用户不是文档协作者",
    });
  }
  try {
    // 删除操作
    await GroupsModel.findByIdAndUpdate(
      docId,
      {
        $pull: { collaborators: userId }, // 从数组中移除指定用户
      },
      { new: true } 
    );
    res.status(200).json({
      code:1,
      msg:'退出成功'
    })
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
    await GroupsModel.deleteOne({ _id: docId });
    //删除该文档的消息
    await MessageModel.deleteMany({ docId }); // 修正删除逻辑
    res.status(200).json({
      code: 1,
      msg: "删除成功",
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: err,
    });
  }
};
