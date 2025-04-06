// www.javascriptcn.com code example
import express from 'express';
import router from './routes'
import morgan from 'morgan'
import cors from 'cors'
import errorHandle from './middleware/error/handler'
const app = express();
const PORT = process.env.PORT || 3002

app.use(express.urlencoded({ extended: true }));//用来解析 x-www-form-urlencoded类型请求体
app.use(express.json());//用来解析 json类型请求体
app.use(express.static('public'));
//第三方日志中间件
app.use(morgan('dev'))
//第三方跨域中间件
app.use(cors())
// 错误处理中间件
app.use(errorHandle())

app.use('/api',router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

