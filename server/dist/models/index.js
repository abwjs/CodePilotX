"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_default_1 = __importDefault(require("../config/config.default"));
const User_1 = __importDefault(require("./User"));
let { dbUrl } = config_default_1.default;
// 连接 mongoDB 数据库 connect() 返回一个状态待定（pending）的连接
mongoose_1.default.connect(dbUrl);
const db = mongoose_1.default.connection;
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
exports.default = {
    User: mongoose_1.default.model('User', User_1.default),
};
