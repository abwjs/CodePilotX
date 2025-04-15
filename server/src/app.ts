// www.javascriptcn.com code example
import express, { NextFunction,Request } from 'express';
import router from './routes'
import morgan from 'morgan'
import cors from 'cors'
import { vertoken } from './middleware/jwt';
import {expressjwt} from 'express-jwt'
import errorHandle from './middleware/error/handler'
const app = express();
const PORT = process.env.PORT || 3006

app.use(express.urlencoded({ extended: true }));//用来解析 x-www-form-urlencoded类型请求体
app.use(express.json());//用来解析 json类型请求体
app.use(express.static('public'));
//第三方日志中间件
app.use(morgan('dev'))
//第三方跨域中间件
app.use(cors())
// 错误处理中间件
app.use(errorHandle())
//解析token
app.use(vertoken)
app.use(expressjwt({
  secret: 'mes_qdhd_mobile_xhykjyxgs',
  algorithms: []
}).unless({
  path: ['/api/users/login','/users/register']//除了这些地址，其他的URL都需要验证
}));
app.use(function(err:any,req:Request, res:any, next:NextFunction) {
  if (err.status == 401) {
    return res.status(401).send('token失效');
  }
});
app.use('/api',router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

