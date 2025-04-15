import mongoose from "mongoose";
import configObj from '../config/config.default'
import User from './User'
import emailModel from './VerificationCodeSchema'
import MessageModel from "./Message";
import GroupsModel from './Groups'
let {dbUrl} = configObj
// 连接 mongoDB 数据库 connect() 返回一个状态待定（pending）的连接
mongoose.connect(dbUrl);

const db = mongoose.connection;
// 当连接失败
db.on('error', (err) => {
    console.log('MongoDB 数据库连接失败', err);
});

// 连接成功
db.once('open', function () {
    // we're connected!
    console.log('MongoDB 数据库连接成功');
});

// 组织导出模型类 这个 schema 编译成一个 Model：
export default{
  User,
  emailModel,
  MessageModel,
  GroupsModel
}

