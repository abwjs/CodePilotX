//原生加密
import crypto from 'crypto'
export default (str:string)=>{
  return crypto.createHash('md5').update('hello'+str).digest('hex')
}