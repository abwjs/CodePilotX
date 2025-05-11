<template>
    <nav class="navigation">
      <!-- logo -->
      <div class="navigation__logo">
        <h2>CodePilotX</h2>
      </div>
      <!-- 用户 -->
      <div class="navigation__user">
        <img src="../assets/images/github.png" alt="">
        <img @click="router.push('/home/userIndex')" :src="user.avatar" class="select__user" alt="">
      </div>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/modules/user';
import { useRouter } from 'vue-router';
const UserStore = useUserStore()
const router = useRouter()
let user = computed(() => {
  return {
    name: UserStore.username || '未登录用户',
    bio: UserStore.bio || '暂无简介',
    id: UserStore.id || '',
    avatar: UserStore.image || '/default-avatar.png'
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

.navigation {
  @include flex-center(row);
  width: 100%;
  height: 4rem;
  padding: 0.8rem 2rem;
  border-radius: variable.$md;
  img {
    cursor: pointer;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 1px solid rgb(238, 238, 240);
  }
  &__logo {
    h2 {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  &__user {
    @include flex-center(row);
    column-gap: 1rem;
  }
}
</style>