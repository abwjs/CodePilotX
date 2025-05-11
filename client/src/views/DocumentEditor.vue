<template>
  <div class="documentEditor">
    <nav>
      <div class="header">
      </div>
      <!-- 编辑器菜单 -->
      <MenuBar class="editor-header" />
    </nav>
    <main>
      <div class="AddressBook">
        <!-- 聊天框组件 -->
        <div class="Chat" v-if="Chatfouncs">
          <span class="Close" @click="closeChat">X</span>
          <div class="Chat__Content">
            <li :class="['item', true ? 'others' : 'admin']">
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
            <input v-model="content" type="text" placeholder="搜索..." class="Chat__input">
            <button class="search-button" @click="search">
            </button>
          </div>
        </div>
      </div>
      <div class="document">
        <!-- 编辑器组件 -->
        <TipTap :docId="docId" width="100%"></TipTap>
      </div>
      <div class="AIBox">
        <!-- ai对话框组件 -->
        <AIInlineBox @closeAI="closeAI" v-if="AIfouncs"></AIInlineBox>
      </div>
    </main>
    <!-- 悬浮功能框 -->
    <div class="FloatingOptions" :class="{ 'founcs': AIfouncs }">
      <!-- ai对话 -->
      <div class="FloatingOptions__AI" @click="AIfouncs = !AIfouncs">
        <img src="../assets/images/ai.png" alt="">
      </div>
      <!-- 聊天 -->
      <div class="iconfont FloatingOptions__Chat" @click="Chatfouncs = !Chatfouncs">&#xfb63;</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { io } from 'socket.io-client';
import { onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../stores/modules/user';
import { useMessageStore } from '../stores/modules/message';
import MenuBar from '../components/MenuBar.vue';
import TipTap from '../components/TipTap.vue'
import AIInlineBox from '../components/AIInlineBox.vue'
const route = useRoute()
const docId = route.params.docId as string
let AIfouncs = ref(false)
let Chatfouncs = ref(false)
let content = ref('')
const MessageStore = useMessageStore()
const UserStore = useUserStore()
const socket = io(import.meta.env.VITE_APP_BASE_API
  , {
    auth: {
      token: UserStore.token
    },
    withCredentials: true,
  })
// 发送进入房间
socket.emit('join-doc', docId)
const closeAI = () => {
  AIfouncs.value = false
}
const closeChat = () => {
  Chatfouncs.value = false
}
const search = () => {
  socket.emit('sendMessage', { content, sender: UserStore.id, docId })
  content.value = ''
}

socket.on('newMessage', (user) => {
  console.log(user);
})

// 清理资源
onUnmounted(() => {
  socket.disconnect();
});
onMounted(async () => {
  //获取聊天信息
  await MessageStore.getMessage(docId)
})
</script>

<style lang="scss" scoped>
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
  background-color: variable.$primary-color;
}

nav {
  display: sticky;
  top: 0;
  width: 100%;
  height: 7.5rem;
  z-index: 100;
  /* 确保在顶部 */
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

  .Chat {
    @include flex-center(column, space-between);
    position: relative;
    background-color: variable.$background-color;
    width: 100%;
    height: 100%;
    border-radius: variable.$sm;
    z-index: 999;
    padding: 0.3rem 2%;
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

    //关闭按钮
    .Close {
      position: absolute;
      right: 2%;
      top: 0.5rem;
    }

    //对话内容
    &__Content {
      display: flex;
      flex-direction: column;
      padding: 1rem 0.5rem;
      flex: 1;
      width: 100%;
      overflow: auto;



      .item {
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
          background-color: variable.$primary-color;
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
  @include flex-center(row, space-between);
  position: absolute;
  right: 1.5rem;
  bottom: 0.5rem;
  column-gap: 0.5rem;
  z-index: 999;
  transition: all 0.2s;

  div {
    @include flex-center(row, center);
    background-color: variable.$white-color;
    box-shadow: variable.$shadow;
    cursor: pointer;
    border-radius: variable.$sm;
    width: 3rem;
    height: 3rem;

    &:hover {
      background-color: rgb(242, 241, 241);
    }
  }

  &__AI {
    img {
      width: 100%;
    }

  }

  &__Chat {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
  }
}

.founcs {
  transform: translateX(-20rem);
}
</style>
