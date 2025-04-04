"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//公共的数据
const base = {
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
};
exports.default = base;
