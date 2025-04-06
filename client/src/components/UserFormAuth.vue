<template>
  <!-- 登录页面 -->
  <div class="auth-container">
    <!-- 登录框 -->
    <div class="auth-container__card">
      <!-- 头部 -->
      <header class="auth-header">
        <h1 class="auth-header__logo">CollabPilotX</h1>
        <p class="auth-header__subtitle">AI智能在线协作平台</p>
      </header>
      <slot name="form"></slot>
      <slot name="footer"></slot>
      <div class="social-media-account">
        <div class="social-media-account__h">社交账号</div>
        <div class="social-media-account__buttons">
          <img src="../assets/images/github.png" alt="" @click="router.push('https://github.com/abwjs/CodePilotX')">
          <img src="../assets/images/csdn.png" alt="" @click="router.push('https://blog.csdn.net/2401_82604907?spm=1000.2115.3001.5343')">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<style scoped lang="scss">
// Mixins 定义
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: center;
}

@mixin text-gradient($from, $to) {
  background: linear-gradient(135deg, $from, $to);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

// 样式规则
.auth-container {
  @include flex-center(column);
  min-height: 100vh;

  &__card {
    width: 100%;
    max-width: 32rem;
    background: variable.$white-color;
    border-radius: variable.$lg;
    box-shadow: variable.$shadow;
    padding: 2.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-0.5rem);
    }
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;

  &__logo {
    @include text-gradient(variable.$primary-color, variable.$secondary-color);
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  &__subtitle {
    color: variable.$text-color;
    font-size: 0.875rem;
  }
}



.auth-options {
  @include flex-center(row);
  justify-content: space-between;
  margin: 1.5rem 0;
  font-size: 0.875rem;

  &__remember {
    @include flex-center(row);
    gap: 0.5rem;
    color: variable.$text-color;

    input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
      border: 1px solid variable.$border-color;
      border-radius: variable.$sm;
      accent-color: variable.$primary-color;
    }
  }

  &__link {
    color: variable.$primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.social-media-account {
  @include flex-center(column);
  gap: 1rem;
  margin-top: 2rem;

  &__h {
    width: 100%;
    text-align: center;
    color: variable.$text-color;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 30%;
      height: 1px;
      background: variable.$border-color;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }

  &__buttons {
    @include flex-center(row);
    gap: 1rem;
    width: 100%;

    img {
      cursor: pointer;
      width: 1.8rem;
      height: 1.8rem;

      &:first-child {
        margin-right: 30px;
      }
    }
  }
}


</style>
