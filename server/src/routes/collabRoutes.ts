import express from "express";
const router = express.Router();
router.get("/", (req, res, next) => {
  res.send("你好");
});

export default router;
