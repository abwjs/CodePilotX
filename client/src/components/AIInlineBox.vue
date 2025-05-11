<template>
  <div class="AIInlineBox">
    <h1>CodePilotX</h1>
    <div class="content">
      <li :class="['item', true ? 'ai' : 'me']">
        <img class="item__avatar" src="../assets/images/github.png" alt="">
        <div class="item__dragdrop">
          <p>111111111111111</p>
        </div>
      </li>
      <li :class="['item', false ? 'ai' : 'me']">
        <img class="item__avatar" src="../assets/images/github.png" alt="">
        <div class="item__dragdrop">
          <p>2222222222222222222</p>
        </div>
      </li>

    </div>
    <div class="search-container">
      <input type="text" placeholder="搜索..." class="search-container__input">
      <button class="search-container__button">
      </button>
    </div>
    <span @click="close" class="Close">X</span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ closeAI: [void] }>()
const props = defineProps<{
  Inputvalue?: string
}>()
const close = () => {
  emit('closeAI')
}
console.log(props.Inputvalue);
</script>

<style scoped lang="scss">
// Mixins 定义
@mixin flex-center($direction: row, $justify: center) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: $justify;
}



.AIInlineBox {
  @include flex-center(column, space-between);
  position: relative;
  background-color: variable.$background-color;
  width: 100%;
  height: 100%;
  border-radius: variable.$sm;
  z-index: 999;
  padding: 0.5rem 3%;
  border: 0.1rem solid variable.$border-color;

  h1 {
    font-size: 1.8rem;
  }

  // 消息内容
  .content {
    margin-top: 1rem;
    padding: 0 3%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    gap: 2rem;
    width: 100%;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;

    // 每个消息项  
    .item {
      @include flex-center(row, space-between);
      width: 100%;
      min-height: 1.5rem;
      column-gap: 1%;

      &__avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 0.1rem solid variable.$border-color;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      }

      &__dragdrop {
        display: flex;
        align-items: center;
        padding: 1%;
        flex: 1;
        height: 100%;
        border-radius: variable.$sm;
        background-color: variable.$primary-color;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    // ai
    .ai {}

    //用户
    .me {
      &__dragdrop {
        flex: none;
      }
    }
  }

  .search-container {
    justify-items: flex-end;
    min-width: 80%;
    width: 100%;
    position: relative;

    &__input {
      width: 100%;
      padding: 10px 50px 10px 20px;
      border: none;
      border-radius: 30px;
      background: rgb(249, 248, 246);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }

    &__button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
    }
  }

  .Close {
    position: absolute;
    right: 2%;
    top: 0.5rem;
  }

}
</style>