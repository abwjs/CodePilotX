import axios from 'axios'
//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  if (sessionStorage.getItem('token') != null)
    config.headers.token = sessionStorage.getItem('token')
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default request