import config from '@/assets/config'
const { apiKey, Url } = config

interface Obj {
  method: string
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  data?: object
}

const controller = new AbortController()
//file判断是不是上传文件
async function http(obj: Obj, file = false) {
  const { method, path, params, data } = obj
  let headers
  // 非文件上传
  if (!file) {
    headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-type': 'application/json',
    }
  }
  //文件上传
  else {
    headers = {
      Authorization: `Bearer ${apiKey}`,
    }
  }
  // 拼接路径
  let url: string = `${Url + path}`
  if (params) {
    //将params参数拼接为key=value&key=value
    const str = new URLSearchParams(params).toString()
    url += `?${str}`
  }
  let res
  //有data是post请求
  if (data) {
    try {
      res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data),
        signal: controller.signal,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted', '拦截请求')
      } else console.error('Error:', error)
    }
    //get请求
  } else {
    res = await fetch(url, {
      method,
      headers,
      signal: controller.signal,
    })
  }
  //流式对话
  if (path === 'v3/chat') {
    return res
  }
  return res?.json()
}

export default http
