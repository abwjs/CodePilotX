import mongoose from "mongoose";
const VerificationCodeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "5m" }, // 5分钟后自动删除
});
const emailModel = mongoose.model('emailModel',VerificationCodeSchema)
export default emailModel
