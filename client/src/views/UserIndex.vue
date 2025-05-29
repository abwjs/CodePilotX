<template>
  <div class="UserIndex">
    <div class="container">
      <div class="container__header">
        <p>用户中心</p>
        <span @click="router.push('/')">X</span>
      </div>
      <div class="container__body">
        <!-- 头像 -->
        <div class="avater">
          <img :src="user.avatar" alt="">
          <p>仅支持jpeg、png、webp文件</p>
          <div class="profile">
            <input type="file" ref="fileInput" style="display: none;" @change="handleFileSelect">
            <button @click="triggerFileInput">上</button>
          </div>
        </div>
        <div class="uname">
          <h2>{{ user.name }}</h2>
        </div>
        <div class="bio">
          <h2>个人简介</h2>
          <p>{{ user.bio }}</p>
        </div>
        <div class="logoutBt">
          <button @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/modules/user';
import router from '../router';
const UserStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)

const user = computed(() => ({
  name: UserStore.username || '未登录用户',
  bio: UserStore.bio || '暂无简介',
  id: UserStore.id || '',
  avatar: UserStore.image || '/default-avatar.png'
}))



// 触发文件选择对话框
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('image', file)
    await UserStore.uploadImage(user.value.id, formData)
    // 上传成功后可以添加反馈提示
    console.log('头像上传成功')
  } catch (error) {
    console.error('上传失败:', error)
    // 添加错误提示
  } finally {
    // 清空已选文件，允许重复选择相同文件
    if (fileInput.value) fileInput.value.value = ''
  }
}
const logout = async ()=>{
  await UserStore.userLogout()
}
</script>

<style scoped lang="scss">
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: center;
}

.UserIndex {
  @include flex-center(row);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
}

.container {
  padding: 0 1rem;
  width: 48rem;
  height: 38rem;
  background-color: variable.$background-color;
  border-radius: variable.$sm;
  &__header {
    @include flex-center(row);
    padding: 0 0.5rem;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    font-size: 0.8rem;
    font-weight: 900;
    border-bottom: 1.5px solid rgb(238, 238, 240);

    span {}

  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 35rem;
    padding: 1.5rem;
    padding-bottom: 3rem;
    >div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.8rem;
    }

    .avater {
      position: relative;
      width: 100%;


      p {
        margin-top: 0.3rem;
        font-size: 0.6rem;
      }

      img {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        border: 1px solid rgb(238, 238, 240);

        &:hover~.profile {
          opacity: 1;
        }
      }


      .profile {
        position: absolute;
        left: 51%;
        bottom: 20%;
        opacity: 0;
        transition: all 0.1s;

        &:hover {
          opacity: 1;
        }

        button {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: variable.$background-color;
          color: variable.$text-color;
          border: none;
          border: 1.5px solid rgb(238, 238, 240);
          cursor: pointer;

          &:hover {
            background-color: variable.$primary-color ;
          }
        }

      }
    }

    .uname {
      margin-top: 0.2rem;

      h2 {
        font-size: 1.7rem;
        font-weight: 900;
        color: variable.$text-color;
      }
    }

    .bio {
      align-items: baseline;
      font-size: 1.2rem;
      h2 {
        font-weight: 900;
        color: variable.$text-color;
      }

      p {
        margin-top: 0.5rem;
        background-color: rgb(238, 238, 240);
        padding: 0.5rem;
        border-radius: variable.$sm;
        width: 100%;
        word-wrap: break-word;
      }

    }

    .logoutBt {
      @include flex-center(row);
      width: 100%;
      height: 2rem;
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
    button {
      cursor: pointer;
      background-color: rgb(246, 111, 111);
      border: 0;
      border-radius: variable.$sm;
      padding: 0.4rem 1rem;
      color: variable.$text-color;
    }
    }
  }
}
</style>