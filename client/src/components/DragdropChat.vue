<template>
  <div class="Chat">
    <div class="Chat__Content">
      <li :class="['m', true ? 'qt' : 'admin']">
        <div class="user">
          <p>user</p>
          <img src="../assets/images/github.png" alt="">
        </div>
        <div class="Dragdrop">
          <p></p>
          <span class="Dragdrop__time">16:02:34</span>
        </div>
      </li>
    </div>
    <div class="Chat__search">
      <input type="text" placeholder="搜索..." class="Chat__input">
      <button class="search-button">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@mixin flex-center($direction: row, $justify: center) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: $justify;
}

.Chat {
  @include flex-center(column, space-between);
  position: relative;
  background-color: variable.$primary-color;
  width: 100%;
  height: 100%;
  border-radius: variable.$sm;
  z-index: 999;
  padding: 0.3rem 2%;
  box-shadow: variable.$shadow;
  border: 0.1rem solid variable.$border-color;

  &::after {
    content: '';
    position: absolute;
    bottom: 2.7rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2rem;
    background: linear-gradient(to bottom,
        rgba(249, 251, 255, 0) 0%,
        variable.$primary-color 70%);
  }

  //对话内容
  &__Content {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
    flex: 1;
    width: 100%;
    overflow: auto;

    

    .m {
      @include flex-center(row, space-between);
      column-gap: 0.5rem;
      min-height: 3rem;
      margin-bottom: 1rem;

      .user {
        @include flex-center(column, space-between);
        width: 2rem;

        img {
          width: 2rem;
          height: 2rem;
        }

        p {
          font-size: 0.8rem;
        }
      }

      .Dragdrop {
        position: relative;
        flex: 1;
        background-color: variable.$white-color;
        min-height: 3rem;
        border-radius: variable.$sm;
        padding: 0.1rem 0.3rem;

        &__time {
          position: absolute;
          right: 0.3rem;
          bottom: 0.1rem;
          font-size: 0.8rem;
        }
      }

    }

    .admin {
      .user {
        order: 2;
      }
    }
  }

  // 输入框
  &__search {
    justify-items: flex-end;
    min-width: 80%;
    width: 100%;
    position: relative;

    .search-button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;

      &:hover {}
    }
  }

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
}
</style>