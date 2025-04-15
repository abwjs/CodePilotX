<template>
  <UserFormAuth>
    <template #form>
      <!-- 表单 -->
      <div class="auth-form">
        <div class="auth-form__group">
          <input type="email" class="auth-form__input" placeholder="邮箱账号" v-model="email">
        </div>
        <div class="auth-form__group">
          <input type="password" class="auth-form__input" placeholder="密码" v-model="password">
        </div>
        <button type="submit" class="auth-form__button" @click="Login">立即登录</button>
      </div>
    </template>
    <template #footer>
      <p class="auth-footer">
        新用户？ <RouterLink to="/user/register">立即注册</RouterLink>
      </p>
    </template>
  </UserFormAuth>
</template>

<script setup lang="ts">
import UserFormAuth from '../components/UserFormAuth.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/modules/user';
const UserStore = useUserStore()
const router = useRouter()
let email = ref<string>('')
let password = ref<string>('')
const Login = async () => {
  if (!email.value || !password.value) {
    alert('请正确输入')
    return
  }
  try {
    let data = { email: email.value, password: password.value }
    await UserStore.login(data)
    router.push('/')
  } catch (err) {
    console.log(err);
    // console.log(err?.response.data.msg);
  }
}
</script>
<style scoped lang="scss">
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

.auth-form {
  &__group {
    margin-bottom: 1.5rem;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 1px solid variable.$border-color;
    border-radius: variable.$sm;
    background: variable.$white-color;
    color: variable.$text-color;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: variable.$primary-color;
      box-shadow: 0 0 0 3px variable.$primary-color;
    }

    &::placeholder {
      color: variable.$text-color;
    }

    &-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: variable.$text-color;
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__button {
    @include flex-center;
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, variable.$white-color, variable.$secondary-color);
    color: variable.$text-color;
    border: none;
    border-radius: variable.$sm;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
      box-shadow: 0 4px 12px variable.$primary-color;
    }
  }
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;

  a {
    color: variable.$primary-text-color;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>