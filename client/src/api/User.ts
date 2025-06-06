import request from '../utils/request'
enum API {
  LOGIN_URL = '/api/users/login',
  LOGOUT_URL = '/api/users/logout',
  REGISTER_URL = '/api/users/register',
  GETCODE_URL = '/api/email',
  UPLOADIMAGE_URL = '/api/users/avatar'
}
// 发送验证码
export const reqCode = (email: string) =>
  request.post(API.GETCODE_URL, { email })

// 注册
export const reqRegister = (email: string, password: string, code: string) => {
  return request.post(API.REGISTER_URL, { email, password, code })
}

//登录
export const reqLogin = (email: string, password: string) => request.post(API.LOGIN_URL, { email, password })

//退出登录
export const reqLogout = (userId: string) => request.post(API.LOGOUT_URL, { userId })

//获取用户信息
export const reqUserInfo = ()=>
{
  console.log(1);
  return Promise.resolve(1)
}

//上传头像
export const uploadImage = (userId:string,formDate:FormData)=>
  request.post(`${API.UPLOADIMAGE_URL}/${userId}`,formDate,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })