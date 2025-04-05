import express from "express";
const router = express.Router();
router.get("/main", (req, res, next) => {
  res.send("你好");
});

export default router;
