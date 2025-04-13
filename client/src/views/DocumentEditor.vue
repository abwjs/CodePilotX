<template>
  <div class="documentEditor">
    <nav>
      <div class="header">

      </div>
      <MenuBar class="editor-header" />
    </nav>
    <main>
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
    </main>
    <div class="FloatingOptions">
      <div class="FloatingOptions__AI">AI助手</div>
      <div class="FloatingOptions__Chat">...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuBar from '../components/MenuBar.vue';
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
  @include flex-center(column, space-between);
  min-height: 100vh;
  overflow: visible;
  width: 100%;
  padding: 0 0.3rem;
  background-color: variable.$background-color;
}

nav {
  display: sticky;
  top: 0;
  width: 100%;
  height: 7.5rem;
  z-index: 100;      /* 确保在顶部 */
  background-color: variable.$white-color;
  border-bottom: 2px solid variable.$bold-color;
  .header {
    width: 100%;
    height: 3rem;
    border-bottom: 2px solid variable.$bold-color;
  }
}

main {
  margin-top: 1rem;
  display: flex;
  width: 100%;
  flex: 1;
}

.AddressBook {
  width: 18rem;
}

.AIBox {
  width: 18rem;
}

.document {
  width: calc(100% - 36.6rem);
  background-color: variable.$white-color;
  margin: 0 0.3rem;
  border: 2px solid variable.$bold-color;
}

.FloatingOptions {
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
