import  { verToken } from '../utils/jwt'
import { Response,NextFunction } from 'express';
// 解析token获取用户信息
export const vertoken = (req:any, res:Response, next:NextFunction)=> {
  const token = req.headers['authorization'];
  if(token == undefined){
    return next();
  }else{
    verToken(token).then((data)=> {
      req.user = data
      return next();
    }).catch((error)=>{
      return next();
    })
  }
}