"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const collabRoutes_1 = __importDefault(require("./collabRoutes"));
//创建路由实例
const router = express_1.default.Router();
router.use(userRoutes_1.default);
router.use(collabRoutes_1.default);
//导出路由实例
exports.default = router;
