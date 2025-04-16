import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';
import { jwtSecret } from '../config/config.default';

//设置token
export const setToken = (email:string,uid:Types.ObjectId)=>{
  return new Promise((resolve,reject)=>{
    const token = jwt.sign({
      email,
      uid
    },jwtSecret,{ expiresIn:'1h' });
    resolve(token);
  })
}

