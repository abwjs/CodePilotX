"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//Import common data model
const baseModel_1 = __importDefault(require("./baseModel"));
//Mongoose 里，一切都始于Schema
const userSchema = new mongoose_1.default.Schema(Object.assign(Object.assign({}, baseModel_1.default), { ername: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true,
    }, bio: {
        type: String,
        default: null
    }, image: {
        type: String,
        default: null
    } }));
exports.default = userSchema;
