import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
import { reqLogin, reqLogout, reqUserInfo, uploadImage } from '@/api/User'
import type { dataType } from '../types/user'
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      token: GET_TOKEN() as string | null,
      username: localStorage.getItem('username') || null,
      id: localStorage.getItem('id') || null,
      bio: localStorage.getItem('bio') || null,
      image: localStorage.getItem('image') || null,
    }
  },
  actions: {
    // 登录
    // async会返回proimse
    async login({ email, password }: dataType) {
      try {
        const res = await reqLogin(email, password)
        const data = res.data
        console.log(data)

        // 更新状态
        this.$patch({
          token: data.token,
          username: data.username,
          id: data.id,
          bio: data.bio,
          image: data.image,
        })

        // 持久化存储
        SET_TOKEN(data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('id', data.id)
        localStorage.setItem('bio', data.bio || '')
        localStorage.setItem('image', data.image || '')

        return 'ok'
      } catch (err) {
        console.error('Login failed:', err)
        throw err
      }
    },
    //获取用户信息
    async fetchUserInfo() {
      if (this.token) {
        try {
          const res = await reqUserInfo()
          this.$patch(res.data)
        } catch (err) {
          console.error('Fetch user info failed:', err)
        }
      }
    },
    //上传头像
    async uploadImage(userId: string, formDate: FormData) {
      try {
        const { data } = await uploadImage(userId, formDate)
        this.image = data.image
        localStorage.setItem('image', data.image)
      } catch (err) {
        console.log(err)
      }
    },

    // 退出登录
    async userLogout() {
      try {
        await reqLogout()
      }catch(err) {
        console.log(err);
      }
      this.token = null
      this.username = null
      this.id = null
      this.bio = null
      this.image = null
      REMOVE_TOKEN()
    },
  },
})
