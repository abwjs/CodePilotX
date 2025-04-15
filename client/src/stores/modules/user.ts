import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
import { reqLogin, reqLogout,reqUserInfo} from '@/api/User'
import type { dataType} from '../types/user'
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      token: GET_TOKEN() as string | null,
      username: localStorage.getItem('username') || null,
      uid: localStorage.getItem('uid') || null,
      bio: localStorage.getItem('bio') || null,
      image: localStorage.getItem('image') || null
    }
  },
  actions: {
    // 登录
    // async会返回proimse
    async login({email, password}: dataType) {
      try {
        const res = await reqLogin(email, password);
        const data = res.data;
        
        // 更新状态
        this.$patch({
          token: data.token,
          username: data.username,
          uid: data.uid,
          bio: data.bio,
          image: data.image
        });

        // 持久化存储
        SET_TOKEN(data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('uid', data.uid);
        localStorage.setItem('bio', data.bio || '');
        localStorage.setItem('image', data.image || '');

        return 'ok';
      } catch (err) {
        console.error('Login failed:', err);
        throw err;
      }
    },
    //获取用户信息
    async fetchUserInfo() {
      if (this.token) {
        try {
          const res = await reqUserInfo();
          this.$patch(res.data);
        } catch (err) {
          console.error('Fetch user info failed:', err);
        }
      }
    },

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
