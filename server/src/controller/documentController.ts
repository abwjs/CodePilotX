import { Response, Request, NextFunction } from "express";
import GroupsModel from "../models/Groups";
import MessageModel from "../models/Message";
import User from "../models/User";
import * as Y from "yjs";
const PORT = process.env.PORTs || 3012;
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
  // 初始化 Yjs 文档
  const ydoc = new Y.Doc();
  const initialType = ydoc.getXmlFragment('content');
initialType.insert(0, [new Y.XmlText('开始编辑！🎉')]); 
  const initialUpdate = Y.encodeStateAsUpdate(ydoc);
  try {
    const newDa = await GroupsModel.create({
      collaborators: [],
      creator,
      content: Buffer.from(initialUpdate),
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
    let ret = await GroupsModel.findById(docId).select("-content");
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
    creator: userId,
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
    collaborators: userId,
  });
  if (!doc) {
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
      code: 1,
      msg: "退出成功",
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      msg: err,
    });
  }
};

// 自定义封面
export const uploadCover =  async(  req: Request,
  res: Response,
  next: NextFunction)=>{
      try {
    if (!req.file) {
      res.status(400).json({ message: "请选择要上传的文件" });
      return;    }

    const updatedGroup = await GroupsModel.findByIdAndUpdate(
      req.params.docId,
      { cover: `/images/${req.file.filename}` },
      { new: true }
    );

    res.status(200).json({
      code: 1,
      msg: "上传成功",
      ...formatGroupsResponse(updatedGroup),
    });
  } catch (err) {
    res.status(500).json({ error: "图片上传失败" });
  }
  }


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

//获取文档列表
export const getFullDocumentList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentUserId, type } = req.query;
    // 构建查询条件
    const query: any = {
      $or: [],
    };
    switch (type) {
      case "all":
        query.$or.push(
          { creator: currentUserId },
          { collaborators: currentUserId }
        );
        break;
      case "created":
        query.$or.push({ creator: currentUserId });
        break;
      case "collaborated":
        query.$or.push({ collaborators: currentUserId });
        break;
      default:
        res.status(404).json({
          code: 0,
          msg: "参数错误",
        });
    }
    const docs = await GroupsModel.find(query)
      .select("_id title cover updatedAt createdAt creator collaborators content") // 精确控制返回字段
      .populate("creator", "username image") // 只取必要用户信息
      .populate("collaborators", "username image")
      .sort({ updatedAt: -1 })
      .lean();
    // 格式化协同者的头像路径
    docs.forEach((item) => {
      item.cover =  `http://localhost:${PORT}${item.cover}`;
      item.collaborators.map((i: any) => {
        i.image = `http://localhost:${PORT}${i.image}`;
        return i;
      });
    });
    res.status(200).json({
      code: 1,
      msg: "获取成功",
      data: 
        docs
      ,
    });
  } catch (err) {
    next(err);
  }
};





// 格式化响应
function formatGroupsResponse(groups: any) {
  return {
    id: groups._id,
    title: groups.title,
    cover: `http://localhost:${PORT}${groups.cover}`, // 拼接完整URL
    createdAt:groups.createdAt,
    collaborators:groups.collaborators,
    creator:groups.creator
  };
}
