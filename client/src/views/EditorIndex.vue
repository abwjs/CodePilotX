<template>
  <div class="Home">
    <NavIgation></NavIgation>
    <main>
      <h1>CodePilotX
      </h1>
    </main>
    <div class="select">
      <div class="select__user">
        <img src="../assets/images/csdn.png" class="select__user" alt="">
        <h2>UserForm</h2>
      </div>
      <div class="select__AIIput">

      </div>
      <div class="select__DocumindList">
        <h3>我的文档</h3>
        <div class="Documind" v-for="item in 10" :key="item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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


}

main {
  flex: 1;
  height: 100%;
  padding: 0.5rem 3rem;

  h1 {
    font-weight: 700;
    font-size: 3rem;
  }
}

.select {
  @include flex-center(column);
  height: 100%;
  max-width: 25rem;
  width: 100%;
  padding: 2rem 0;
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
}
</style>