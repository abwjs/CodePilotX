import jwt from 'jsonwebtoken'
import {promisify} from 'util'
//生成jwt:jwt.sign   验证jwt:jwt.verify
// 1.同步生成jwt
const token = jwt.sign({foo:"bar"}, '这里填秘钥字符')

// 1.异步生产jwt 增加一个回调函数
jwt.sign({ foo:"bar"}, 'yunxijun', (err, token:string) => {
    if (err) {
        return console.log('生产token失败')
    }
    console.log(token);
})


// 2.同步验证
const ret = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MjkwMjU4NjV9.jqbCrW7trDH4jw_XCXfYAsMOTcg7Rm6Yd-33wPyyCeo',
    'yunxijun')
console.log(ret);

// 2.异步验证
jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MjkwMjU4NjV9.jqbCrW7trDH4jw_XCXfYAsMOTcg7Rm6Yd-33wPyyCeo', 
'yunxijun', (err, ret) => {
    if (err) {
        return console.log('验证token失败')
    }
    console.log(ret);
})


// 使用类型断言进行转换

export const sign = promisify(jwt.sign) 
export const verify = promisify(jwt.verify) 
export const decode =promisify(jwt.decode) 