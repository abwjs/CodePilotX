"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// www.javascriptcn.com code example
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const handler_1 = __importDefault(require("./middleware/error/handler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.urlencoded()); //用来解析 x-www-form-urlencoded类型请求体
app.use(express_1.default.json()); //用来解析 json类型请求体
app.use(express_1.default.static('public'));
//第三方日志中间件
app.use((0, morgan_1.default)('dev'));
//第三方跨域中间件
app.use((0, cors_1.default)());
// 错误处理中间件
app.use((0, handler_1.default)());
app.use('/api', routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
