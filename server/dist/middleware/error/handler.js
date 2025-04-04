"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const errorHandle = () => {
    return (err, req, res, next) => {
        res.status(500).json({
            //error对象的错误信息在其原型上,但是json()方法只能打印对象本身的错误信息
            // 如果直接打印,会为空
            //为了解决这个问题，我们可以使用node内置的util方法,
            error: util_1.default.format(err)
        });
    };
};
exports.default = errorHandle;
