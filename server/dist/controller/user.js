"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../models/index"));
let { User } = index_1.default;
// 用户注册
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        // 1. 拿到请求体数据
        console.log(req.body);
        // 2. 验证数据
        // 2.1 基本数据验证
        // 2.2 业务数据验证
        // 3. 验证通过保存数据库
        const user = new User(req.body.user);
        yield user.save();
        // 4. 发送响应
        res.status(201).json({
            user
        });
    }
    catch (error) {
        next(error);
    }
});
// 用户登录
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // 实际登录逻辑...
    }
    catch (error) {
        next(error);
    }
});
// 获取当前用户
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
// 更新当前用户
const updateCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.default = { register, login, getCurrentUser, updateCurrentUser };
