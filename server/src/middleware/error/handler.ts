import { Request,Response, NextFunction } from 'express'
import util from 'util'
const errorHandle = () => {
  return (  err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
      res.status(500).json({
          //error对象的错误信息在其原型上,但是json()方法只能打印对象本身的错误信息
          // 如果直接打印,会为空
          //为了解决这个问题，我们可以使用node内置的util方法,
          error:util.format(err)
      })
  }
}
export default errorHandle
