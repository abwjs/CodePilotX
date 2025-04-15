<template>
    <nav class="navigation">
      <div class="navigation__logo">
        <img src="../assets/images/csdn.png" alt="">
      </div>
      <div class="navigation__main">
        <RouterLink class="li-home"  v-slot="{ isActive }" to="/" activeClass="active">
          <svg-icon iconName="icon-shouye-zhihui" :color="isActive ? 'pink' : '#666'"></svg-icon>
        </RouterLink>
        <RouterLink class="li-ai" to="">
          <svg-icon iconName="icon-shouye-zhihui"></svg-icon>
        </RouterLink>
        <RouterLink class="li-PersonalCenter" to="">
          <svg-icon iconName="icon-shouye-zhihui"></svg-icon>
        </RouterLink>
        <RouterLink class="settings" to="">
          <svg-icon iconName="icon-shouye-zhihui"></svg-icon>
        </RouterLink>
      </div>
      <div class="navigation__social">
        <img src="../assets/images/github.png" alt="">
        <img src="../assets/images/csdn.png" alt="">

      </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
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
  min-width: 5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;

  background-color: variable.$primary-color;
  border-radius: variable.$md;
  box-shadow: variable.$shadow;

  img {
    width: 2.8rem;
    height: 2.8rem;
  }

  &__main {

    a {
      @include flex-center();
      cursor: pointer;
      width: 2.8rem;
      height: 2.8rem;
      background-color: variable.$background-color;
      border-radius: 50%;
      justify-content: center;
      margin-bottom: 1.8rem;
    }
    .active {
      background-color:variable.$text-color; 
    }
  }

  &__social {
    @include flex-center(column);

    img {
      margin-bottom: 1.8rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>