//登录参数
export interface dataType {
  email: string
  password: string
}
//返回参数
export interface resType {
  uid: string | null
  bio: string | null
  token:string
  username:string
  msg:string
  image:string | null
  code: number
}

