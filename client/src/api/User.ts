import request from '../utils/request'
enum API {
  LOGIN_URL = '/api/users/login',
  REGISTER_URL = '/api/users/register',
  GETCODE_URL = '/api/email',
}
// 发送验证码
export const reqCode = (email: string) =>
  request.post(API.GETCODE_URL, { email })

// 注册
export const reqRegister = (email:string, password:string, code:string)=>{
  return request.post(API.REGISTER_URL,{email,password,code})}

//登录
export const reqLogin = (email:string,password:string) => 
  request.post(API.LOGIN_URL,{email,password})