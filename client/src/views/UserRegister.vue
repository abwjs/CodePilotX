<template>
  <UserFormAuth>
    <template #form>
      <!-- 表单 -->
      <div class="auth-form">
        <div class="auth-form__group">
          <input type="email" class="auth-form__input" placeholder="邮箱账号" v-model="email">
        </div>
        <div class="auth-form__group">
          <input type="text" class="auth-form__input Input_Id" placeholder="验证码" v-model="code">
          <button class="auth-form__id" :disabled="isDisabled" @click="sendCode()">{{ isDisabled ? `等待${num}秒` : '发送验证码'
            }}</button>
        </div>
        <div class="auth-form__group">
          <input type="password" class="auth-form__input" placeholder="密码" v-model="password">
        </div>
        <button type="submit" class="auth-form__button" @click="Register">
          <p>立即注册</p>

        </button>
      </div>
    </template>

    <template #footer>
      <p class="auth-footer">
        已有账号？ <RouterLink to="/user/login">立即登录</RouterLink>
      </p>
    </template>
  </UserFormAuth>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserFormAuth from '../components/UserFormAuth.vue'
import { reqCode ,reqRegister} from '../api/User'
import { useRouter } from 'vue-router'
const router = useRouter()
// 控制验证码发送
let isDisabled = ref<boolean>(false)
let num = ref<number>(60)
let email = ref<string>()
let password = ref<string>()
let code = ref<string>()
// 发送验证码函数
const sendCode =async () => {
  if(!email.value) {
    alert('没有邮箱')
    return
  }
  try{
  await reqCode(email.value)}catch(err){
    console.log(err);
    alert(err)
  }
  
  isDisabled.value = true
  let time = setInterval(() => {
    if (num.value === 1) {
      isDisabled.value = false
      clearInterval(time)
      num.value = 60
    }
    num.value -= 1
  }, 1000)
}

// 注册函数
const Register = async ()=>{
  
  if(!email.value||!password.value||!code.value) {
    alert('请检查是否有输入')
    return
  }
  try{
  await reqRegister(email.value,password.value,code.value)
  router.push('/user/login')
}
  catch(err){
    console.log(err);
    alert(err)
  }
}
</script>
<style lang="scss" scoped>
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

  &__id {
    @include flex-center;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    height: 80%;
    transform: translateY(-50%);
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, variable.$primary-color, variable.$secondary-color);
    color: variable.$white-color;
    border: none;
    border-radius: variable.$sm;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  &__input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 1px solid variable.$border-color;
    border-radius: variable.$sm;
    background: variable.$primary-light-color;
    color: variable.$text-color;
    transition: all 0.3s ease;


    &:nth-child(2) {
      position: relative;
    }

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
    background: linear-gradient(135deg, variable.$primary-color, variable.$secondary-color);
    color: variable.$white-color;
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
  color: variable.$text-color;

  a {
    color: variable.$primary-color;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>