"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 引入user控制器
const user_1 = __importDefault(require("../controller/user"));
const router = express_1.default.Router();
const { login, register, getCurrentUser, updateCurrentUser } = user_1.default;
// 用户登录
router.post('/users/login', login);
// 用户注册(userValidator.register:用户验证，验证通过执行下一个中间件函数)
router.post('/users', register);
// 获取当前登录用户
router.get('/user', getCurrentUser);
// 更新当前登录用户
router.put('/user', updateCurrentUser);
router.get("/", function (req, res, next) {
    let token = jsonwebtoken_1.default.sign({ username: "zhangsan" }, "test123456", {
        expiresIn: "360s",
        algorithm: "HS256",
    });
    console.log(req.query);
    res.json({
        code: 1,
        msg: "注册成功",
        token,
    });
});
exports.default = router;
