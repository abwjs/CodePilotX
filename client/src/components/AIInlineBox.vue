<template>
  <div class="AIInlineBox">
    <h1>CodePilotX</h1>
    <div class="content"></div>
    <div class="search-container">
      <input type="text" placeholder="搜索..." class="search-container__input">
      <button class="search-container__button">
      </button>
    </div>
    <span @click="none">X</span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{none:[void]}>()
const none = ()=>{
  emit('none')
}
</script>

<style scoped lang="scss">
// Mixins 定义
@mixin flex-center($direction: row, $justify: center) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: $justify;
}



.AIInlineBox  {
  @include flex-center(column, space-between);
  position: relative;
  background-color: variable.$primary-color;
  width: 100%;
  height: 100%;
  border-radius: variable.$sm;
  z-index: 999;
  padding: 0.5rem 3%;
  box-shadow: variable.$shadow;
  border: 0.1rem solid variable.$border-color;
  h1 {
    font-size: 1.8rem;
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
  span {
    position: absolute;
    right: 2%;
    top:0.5rem;
  }

}

</style>