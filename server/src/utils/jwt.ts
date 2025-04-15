import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

//设置token
export const setToken = (email:string,uid:Types.ObjectId)=>{
  return new Promise((resolve,reject)=>{
    const token = jwt.sign({
      email,
      uid
    },signkey,{ expiresIn:'1h' });
    resolve(token);
  })
}

//验证token
export const verToken = function(token:string){
  return new Promise((resolve,reject)=>{
    var info = jwt.verify(token.split(' ')[1],signkey);
    resolve(info);
  })}
