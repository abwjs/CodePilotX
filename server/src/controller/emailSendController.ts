import nodemailer from "nodemailer";
import { Response, Request } from "express";
import ModelObj from "../models/index";
let { emailModel } = ModelObj;
const EmailSend = async (req: Request, res: Response) => {
  let email = req.body.email;
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',  // QQ 邮箱的 SMTP 服务器地址
    secure: true, //  安全的发送模式
    port: 465,
    auth: {
      user: "ab643669@foxmail.com", //  发件人邮箱
      pass: "zsmpsxcyzuhhdadf", //  授权码
    },
  });
  // 六位数随机验证码生成
  let code = Math.random().toString(16).slice(2, 8).toUpperCase();
  try {
    // 存储验证码
    await emailModel.findOneAndUpdate(
      { email },
      { code, createdAt: new Date() },
      { upsert: true, new: true }
    )
  // 发送邮件
   await transporter.sendMail({
    // 发件人邮箱
    from: "ab643669@foxmail.com",
    // 邮件标题
    subject: "验证码",
    // 目标邮箱
    to: email,
    // 邮件内容
    text: `您的验证码是：${code}，如非本人操作，请忽略`,
  });
  res.json({
    code: 0, msg: '验证码已发送' 
  })
  } catch (err) {
    res.json({
        code:1,msg:'验证码发送失败'
    })
  }
};
export default EmailSend;
