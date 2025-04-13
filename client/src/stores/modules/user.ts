import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
import { reqLogin, reqLogout } from '@/api/User'
import type { dataType, resType } from '../types/user'
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      token: GET_TOKEN() as string | null,
      username: null as string | null,
      uid: null as string | null,
      bio: null as string | null,
      image: null as string | null,
    }
  },
  actions: {
    // 登录
    // async会返回proimse
    async get(Data: dataType) {
      const res = await reqLogin(Data)

      if (res.status === 200) {
        const data = res.data as resType
        // 存储在pinia
        this.token = data.token
        this.username = data.username
        this.uid = data.uid
        this.bio = data.bio
        this.image = data.image
        // 持久化存储在浏览器
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息
    // async userInfo() {
    //   const res = await reqUserInfo()
    //   console.log(res)

    //   if (res.code === 200) {
    //     this.username = res.data.checkUser.username
    //     this.avater = res.data
    //     return 'ok'
    //   } else {
    //     return Promise.reject(new Error(res.message))
    //   }
    // },
    // 退出登录
    async userLogout() {
      await reqLogout()

      this.token = null
      this.username = null
      this.uid = null
      this.bio = null
      this.image = null
      REMOVE_TOKEN()
    },
  },
})
