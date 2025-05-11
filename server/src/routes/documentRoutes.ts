import express from "express";
import {
  createDocument,
  removeDocument,
  getFullDocumentList,
} from "../controller/documentController";
const router = express.Router();
router.post("/document/create", createDocument);
//删除文档接口
router.delete("/document/remove", removeDocument);

//获取文档列表
router.get("/document/get", getFullDocumentList);

export default router;
