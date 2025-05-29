import express, { Application, Request, Response, NextFunction } from 'express';
import router from './routes';
import morgan from 'morgan';
import cors from 'cors';
import { expressjwt, Request as ExpressJwtRequest } from 'express-jwt';
import { jwtSecret } from './config/config.default';
import errorHandle from './middleware/error/handler';
import { createServer as createHttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { initSocket } from './socket';

const app: Application = express();
const PORT = process.env.PORTs || 3012;

// 中间件
app.use(express.urlencoded({ extended: true })); // 用来解析 x-www-form-urlencoded 类型请求体
app.use(express.json()); // 用来解析 json 类型请求体

// 静态资源
app.use('/images', express.static('uploads/images')); // 用户上传图片
app.use('/default-image.jpg', express.static('public/default-image.jpg')); // 默认图片
app.use('/default-Cover.png', express.static('public/default-Cover.png')); // 默认图片

// 第三方日志中间件
app.use(morgan('dev'));

// 第三方跨域中间件
app.use(cors());

// 解析 token 的中间件
app.use(
  expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256']
  }).unless({
    path: [
      '/api/users/login',
      '/api/email',
      '/api/users/register',
      '/images/*',
      '/default-image.jpg'
    ]
  })
);

// 错误处理中间件
app.use(errorHandle());

app.use('/api', router);

// 创建 HTTP 服务器
const httpServer = createHttpServer(app);


// 创建 Socket.IO 实例时配置 CORS
const io: SocketIOServer = new SocketIOServer(httpServer, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:8080",
      "http://localhost:5173" 
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["authorization"],
    credentials: true
  },
  
});
// Socket.IO 认证中间件
io.use((socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("未提供 Token"));
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    next(); // 验证通过
  } catch (err) {
    next(new Error("无效的 Token")); // 验证失败
  }
});

// 连接 socket
initSocket(io);

// 启动服务器
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});