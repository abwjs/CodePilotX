import axios from 'axios'
import router from '../router'
//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  if (localStorage.getItem('token') != null){
    config.headers['Authorization'] =`Bearer ${localStorage.getItem('token')}`
  } return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if(error.status==401) {
      router.replace({
        name: 'Login'
      })
      // 提示框
      localStorage.clear()
    }    
    return Promise.reject(error)
  },
)
export default request