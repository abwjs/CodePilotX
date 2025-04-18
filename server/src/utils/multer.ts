import multer from "multer";
import path from "path";

// 文件过滤
const fileFilter = (req:any, file:any, cb:any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('仅支持 JPG, PNG 或 GIF 格式'), false)
  }
}

// 配置 DiskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 设置文件存储位置
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    // 设置文件名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2097152 }, // 限制2M
  fileFilter
});
