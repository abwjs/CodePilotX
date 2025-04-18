// www.javascriptcn.com code example
import express, { NextFunction,Request } from 'express';
import router from './routes'
import morgan from 'morgan'
import cors from 'cors'
import {jwtSecret} from './config/config.default'
import {expressjwt} from 'express-jwt'
import errorHandle from './middleware/error/handler'
const app = express();
const PORT = process.env.PORT || 3010

app.use(express.urlencoded({ extended: true }));//用来解析 x-www-form-urlencoded类型请求体
app.use(express.json());//用来解析 json类型请求体
//静态资源中间件
app.use('/default-avatar', express.static('public/images/default-avater.jpg'));
app.use('/avatars', express.static('uploads/avatars')); // 用户上传头像
//第三方日志中间件
app.use(morgan('dev'))
//第三方跨域中间件
app.use(cors())

//解析token
app.use(expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256']
}).unless({
  path: ['/api/users/login','/api/email','/api/users/register']//除了这些地址，其他的URL都需要验证
}));

// 错误处理中间件
app.use(errorHandle())

app.use('/api',router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

