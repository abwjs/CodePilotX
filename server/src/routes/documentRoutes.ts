import express from "express";
import {
  createDocument,
  removeDocument,
  getFullDocumentList,
  updateTitle,uploadCover
} from "../controller/documentController";
import { upload } from "../middleware/upload";

const router = express.Router();
// 创建文档
router.post("/document/create", createDocument);
//删除文档接口
router.delete("/document/remove", removeDocument);

//获取文档列表
router.get("/document/get", getFullDocumentList);

//修改文档标题
router.post('/document/updateTitle',updateTitle)

//修改封面
//upLoad.single要和前端的formdate添加的名字相同
router.post('/document/cover/:docId',upload.single('image'),uploadCover)
export default router;
