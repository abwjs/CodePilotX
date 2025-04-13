<template>
  <div class="Home">
    <NavIgation></NavIgation>
    <main>
      <h1>CodePilotX
      </h1>
      <div class="function">
        <div class="function__personal"></div>
        <div class="function__team"></div>
        <div class="function__ai"></div>
        <div class="function__ai"></div>
        <div class="function__ai"></div>
      </div>
      <div class="introduce">
        <div class="introduce__personal" v-for="item in 4" :key="item"></div>
      </div>
    </main>
    <div class="select">
      <div class="select__user">
        <img src="../assets/images/csdn.png" class="select__user" alt="">
        <h2>UserForm</h2>
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
import { ref } from 'vue';
import AIInlineBox from '../components/AIInlineBox.vue';
let founcs = ref<boolean>(true)

const none = () => {
  founcs.value = false
}
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

  h1 {
    font-weight: 700;
    font-size: 3rem;
  }

  .function {
    @include flex-center();
    margin-top: 3rem;
    width: 100%;
    height: 1.8rem;

    div {
      width: 8rem;
      background-color: variable.$primary-color;
      height: 2.8rem;
      border-radius: 1.4rem;
      box-shadow: variable.$shadow;

    }
  }

  .introduce {
    @include flex-center();
    flex-wrap: wrap;
    margin-top: 6rem;
    width: 100%;
    flex: 1;
    gap: 2rem;

    div {
      background-color: variable.$primary-color;
      box-shadow: variable.$shadow;
      width: 22rem;
      height: 12rem;
      border-radius: variable.$lg;
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