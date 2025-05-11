import multer from "multer";
import path from "path";
// 存储配置
const storage = multer.diskStorage({
  //图片保存的目录
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/')  // 硬编码存储目录
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = `user-image-${Date.now()}${ext}`; // 文件名前缀
    cb(null, filename)
  }
})


// 文件过滤
const fileFilter = (req:any, file:any, cb:any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('仅支持 JPEG/PNG/WEBP 格式'));
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2097152 }, // 限制2M
  fileFilter
});
