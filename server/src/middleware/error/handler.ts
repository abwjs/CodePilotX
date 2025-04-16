import { Request,Response, NextFunction } from 'express'
const errorHandle = () => {
  return (  err: any,
    req: Request,
    res: Response,
    next: NextFunction) => {
      if (err.status == 401) {
         res.status(401).send('token失效');
      }
  }
}
export default errorHandle
