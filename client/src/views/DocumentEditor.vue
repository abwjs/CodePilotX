<template>
  <div class="documentEditor">
    <div class="AddressBook">
      <!-- 聊天框组件 -->
      <DragdropChat></DragdropChat>
    </div>
    <div class="document">
      <!-- 编辑器组件 -->
      <TipTap width="100%"></TipTap>
    </div>
    <div class="AIBox">
      <!-- ai对话框组件 -->
      <AIInlineBox></AIInlineBox>
    </div>
    <div class="nav">
      <div class="nav__AI">AI助手</div>
      <div class="nav__Chat">...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TipTap from '../components/TipTap.vue'
import AIInlineBox from '../components/AIInlineBox.vue'
import DragdropChat from '../components/DragdropChat.vue';
</script>
<style lang="scss">
@mixin flex-center($direction: row, $justify: center) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: center;
}

.documentEditor {
  @include flex-center(row, space-between);
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  padding: 0 0.3rem;
  padding-top: 4rem;
  background-color: variable.$background-color;
}

.AddressBook {
  height: 98%;
  width: 22rem;
}

.AIBox {
  height: 98%;
  width: 22rem;
}

.document {
  flex: 1;
  height: 98%;
  background-color: variable.$white-color;
  margin: 0 0.3rem;
  box-shadow: variable.$shadow;
}

.nav {
  @include flex-center(column, space-between);
  position: absolute;
  right: 1.5rem;
  bottom: 3rem;

  div {
    @include flex-center(row, center);
    background-color: variable.$white-color;
    box-shadow: variable.$shadow;
  }

  &__AI {
    padding: 1.2rem;
    border-radius: variable.$lg;
    box-shadow:0 5px 20px rgb(213, 212, 212) !important;
    width: 2.4rem;
  }
  &__Chat {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
  }
}
</style>
