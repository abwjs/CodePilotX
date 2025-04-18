<template>
  <div class="Home">
    <NavIgation></NavIgation>
    <main>
      <div class="title">
        <h1>AI-driven collaboration for seamless teamwork.
        </h1>
      </div>
      <div class="introduce">
        <div class="introduce__personal" v-for="item in 4" :key="item"></div>
      </div>
    </main>
    <div class="select">
      <div class="select__user">
        <img :src="user.avatar" class="select__user" alt="">
        <h2>{{ user.name }}</h2>
      </div>
      <div class="select__Input">
        <input type="text" placeholder="搜索..." class="search-input">
        <button class="search-button">

        </button>
      </div>
      <div class="select__DocumindList">
        <h3>我的文档</h3>
        <div class="Documind" v-for="item in 10" :key="item">
          <svg-icon></svg-icon>
          <span></span>
          <svg-icon></svg-icon>
        </div>
      </div>
    </div>
    <div :class="['AIDialogue', { 'none': !founcs }]">
      <AIInlineBox @none="none"></AIInlineBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../stores/modules/user';
import AIInlineBox from '../components/AIInlineBox.vue';
const UserStore = useUserStore()
let founcs = ref<boolean>(false)
let user = computed(() => {
  return {
    name: UserStore.username || '未登录用户',
    bio: UserStore.bio || '暂无简介',
    uid: UserStore.uid || '',
    avatar: UserStore.image || '/default-avatar.png'
  }
})
const none = () => {
  founcs.value = false
}
onMounted(async () => {
  if (UserStore.token) {
    //获取用户信息
    // await UserStore.fetchUserInfo()
  }
})
</script>

<style scoped lang="scss">
// Mixins 定义
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: space-between;
}


.Home {
  @include flex-center();
  height: 100vh;
  width: 100%;
  background-color: variable.$background-color;
  padding: 1.5rem;
  overflow: hidden;
}

main {
  flex: 1;
  height: 100%;
  padding: 1rem 3rem;

  .title {
    max-width: 50rem;

    h1 {
      white-space: inherit;
      font-weight: 700;
      font-size: 3.5rem;
    }
  }

  .introduce {
    @include flex-center();
    flex-wrap: wrap;
    margin-top: 4rem;
    width: 100%;
    flex: 1;
    gap: 2rem;

    div {
      background-color: variable.$primary-color;
      box-shadow: variable.$shadow;
      width: 22rem;
      height: 12rem;
      border-radius: variable.$lg;
      transition: transform 0.3s ease;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(179, 213, 255, 0.3);

      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg,
            rgba(179, 213, 255, 0) 40%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(179, 213, 255, 0) 60%);
        background-size: 200% 200%;
        opacity: 0;
        transition: opacity 0.3s;
        animation: borderFlow 2.5s linear infinite;
      }

      @keyframes borderFlow {
        0% {
          background-position: 100% 100%;
        }
        50% {
          background-position: 0% 0%;
        }
        100% {
          background-position: 100% 100%;

        }
      }

      &:hover::before {
        opacity: 1;
      }

      &:hover {
        transform: translateY(-4px);
      }

    }
  }
}

.select {
  @include flex-center(column);
  height: 100%;
  max-width: 25rem;
  width: 100%;
  padding: 2rem 1.5rem;
  background-color: variable.$primary-color;
  border-radius: variable.$md;
  box-shadow: variable.$shadow;

  &__user {
    @include flex-center(column);

    img {
      width: 3rem;
      height: 3rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  &__DocumindList {
    @include flex-center(column);
    width: 100%;
    flex: 1;
  }

  &__Input {
    position: relative;
    width: 100%;
    margin: 20px auto;

    .search-input {
      width: 100%;
      padding: 12px 50px 12px 20px;
      border: none;
      border-radius: 30px;
      background: rgb(249, 248, 246);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .search-button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
    }

    .search-icon {
      width: 24px;
      height: 24px;
      fill: #666;
      transition: fill 0.3s ease;
    }

    .search-button:hover .search-icon {
      fill: #333;
    }
  }
}


.AIDialogue {
  @include flex-center(row);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 2rem 8rem;
}

.none {
  display: none;
}
</style>