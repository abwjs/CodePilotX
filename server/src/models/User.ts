import mongoose from "mongoose";
import md5 from "../utils/md5";
const userSchema = new mongoose.Schema(
  {
    // 用户名
    username: {
      type: String,
      required: true,
      unique: true,
    },
    //邮箱
    email: {
      type: String,
      required: true,
    },
    //密码
    password: {
      type: String,
      require: true,
      set: (value: string) => md5(value),
      select: false,
    },
    //简介
    bio: {
      type: String,
      default: null,
    },
    //头像
    image: {
      type: String,
      default: null,
    },
  },
  {
    //时间戳
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
