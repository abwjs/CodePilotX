<template>
  <div class="Home">
    <!-- 头部 -->
    <NavIgation></NavIgation>
    <main>
      <div class="select">
        <!-- 图标 -->
        <div class="select__icon">
          <p class="iconfont icon">&#xfb8e;</p>
          <span>Search</span>
          <h2>|</h2>
          <p class="iconfont icon">&#xfaef;</p>
          <span>Ask AI</span>
        </div>
        <!-- 搜索框 -->
        <div class="select__Input">
          <input type="text" v-model="InputValue" placeholder="Search | Ask AI" class="search-input">
          <div class="select__button">
            <!-- ai搜索 -->
            <button class="search-button search-button-ai">
              <p @click="AISearch">AI</p>
            </button>
            <!-- 文档搜索 -->
            <button class="search-button search-button-search">
              <p>搜索</p>
            </button>
          </div>
        </div>
      </div>
      <!-- 功能选择 -->
      <h3>快速开始</h3>
      <div class="introduce">
        <div @click="createDocument" class="introduce__personal1"></div>
        <div class="introduce__personal2"></div>
        <div @click="router.push('/mydocument')" class="introduce__personal3"></div>
        <div class="introduce__personal4"></div>
      </div>
      <div class="DocumendList">
        <div class="DocumendList__Title">
          <h3>最近文档</h3>
          <select name="" id="dl-select" @change="switchList" v-model="dlisttype">
            <option value="all">全部文件</option>
            <option value="created">我的文件</option>
            <option value="collaborated">协同文件</option>
          </select>
        </div>
        <p>文件({{ documentList.length }})</p>
        <div :class="[{ 'documendBox': documentList.length != 0 }, { 'documendNoneBox': documentList.length == 0 }]">
          <template v-if="documentList.length">
            <CoverFrame v-for="(item, index) in documentList" :key="index" :documentContent="item"></CoverFrame>
          </template>
          <div v-else class="noneDocument">
            <img src="../assets/images/documentNone.png" alt="">
            <p>您当前没有文档</p>
          </div>
        </div>
      </div>
    </main>
    <div class='AIDialogue' v-if="founcs">
      <AIInlineBox @closeAI="close" :Inputvalue="InputValue"></AIInlineBox>
    </div>
    <!-- 路由出口 -->
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/modules/user';
import { useDocumentStore } from '../stores/modules/document';
import AIInlineBox from '../components/AIInlineBox.vue';
import CoverFrame from '../components/CoverFrame.vue';
const UserStore = useUserStore()
const DocumentStore = useDocumentStore()
let founcs = ref<boolean>(false)
const router = useRouter()
// 文档列表
const documentList = computed(() => {
  return DocumentStore.documentList
})

const dlisttype = ref('all')

//搜索框内容
const InputValue = ref<string>('')

//ai搜索处理
const AISearch = () => {
  if (!InputValue.value) {
    alert('提示')
    return
  }
  founcs.value = true
}

const close = () => {
  InputValue.value = ''
  // 隐藏ai对话框
  founcs.value = false
}

//创建文档
const createDocument = async () => {
  if (!UserStore.id) return
  let docId = await DocumentStore.createDocument(UserStore.id)
  console.log(docId);
  router.push({
    name: 'Document',
    params: {
      docId
    }
  })
}

//切换文档列表显示范围
const switchList = async () => {
  if (UserStore.id) {
    await DocumentStore.getDocumentList(UserStore.id, dlisttype.value)
  }
}

onMounted(async () => {
  if (UserStore.token) {
    //获取用户信息
    // await UserStore.fetchUserInfo()
    if (UserStore.id) {
      await DocumentStore.getDocumentList(UserStore.id, dlisttype.value)
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: space-between;
}

.Home {
  @include flex-center(column);
  scrollbar-width: none;
  height: 100vh;
  width: 100%;
  background-color: variable.$background-color;
  overflow: hidden;
}

main {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 0 2rem;
  padding-bottom: 2rem;

  h3 {
    margin: 1.5rem 0;
    font-size: 1.2rem;
  }

  .introduce {
    @include flex-center(row);
    flex-wrap: wrap;
    width: 100%;
    margin-top: 0.5rem;
    flex: 1;
    gap: 2rem;

    div {
      background-color: variable.$primary-color;
      background-position: center;
      background-size: 60%;
      background-repeat: no-repeat;
      width: 18rem;
      height: 10rem;
      border-radius: variable.$lg;
      transition: all 0.3s;
      overflow: hidden;
      position: relative;
      cursor: pointer;

      &::after {
        @include flex-center(row);
        background-color: rgba(199, 200, 200, 0.5);
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all 0.1s;
        opacity: 0;
        color: #fff;
      }

      &::before {
        content: '';
        position: absolute;
        width: 5rem;
        height: 2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        border-radius: variable.$sm;
        transition: opacity 0.1s;
        background-color: rgba(56, 56, 61, 0.5);
      }

      &:hover::before {
        opacity: 1;
      }

      &:hover::after {
        opacity: 1;
      }

      &:hover {
        transform: translateY(-4px);
      }
    }

    &__personal1 {
      background-image: url('../assets/images/cr.png');

      &::after {
        content: '新建文档';
      }
    }

    &__personal2 {
      background-image: url('../assets/images/ai.png');
      background-size: 50%;

      &::after {
        content: 'AI对话';
      }
    }

    &__personal3 {
      background-image: url('../assets/images/wd.png');

      &::after {
        content: '我的文档';
      }
    }
  }
}

.select {
  @include flex-center(column);
  height: 10.5rem;
  width: 100%;
  padding: 1rem 22rem;
  border-radius: variable.$md;
  background-image: url('../assets/images/SelectBg.png');
  background-size: cover;

  &__icon {
    @include flex-center(row);
    column-gap: 0.5rem;

    h2 {
      font-weight: 700;
    }

    .icon {
      color: rgb(241, 139, 75);
    }
  }

  &__Input {
    @include flex-center(row);
    position: relative;
    width: 100%;
    margin: auto;
    background: rgb(249, 248, 246);
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    padding: 8px 10px;
    column-gap: .5rem;

    .search-input {
      width: 88%;
      border: none;
      background: rgb(249, 248, 246);
      font-size: 16px;
    }
  }

  &__button {
    @include flex-center(row);
    flex: 1;
    column-gap: .2rem;

    .search-button {
      background-color: rgb(163, 199, 253);
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 1.2rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s;

      p {
        font-weight: 700;
      }

      &:hover {
        width: 4rem;
      }
    }

    .search-button-search {
      color: aliceblue;
      width: 4rem;
      background-color: rgb(183, 221, 252);
    }
  }
}


.DocumendList {
  width: 100%;
  flex: 1;

  &__Title {
    margin: 1.5rem 0;
    display: flex;
    align-items: center;
    column-gap: 1.5rem;

    h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    select {
      text-align: center;
      width: 5rem;
      height: 1.8rem;
      outline: none;
      border: 0;
      font-size: .9rem;
      border: 1px solid rgb(238, 238, 240);
      border-radius: variable.$sm;
      background-color: variable.$background-color;

      &::after {
        content: '|';

      }

      option {}
    }
  }

  .documendBox {
    display: grid;
    grid-template-columns: repeat(auto-fill, 18rem);
    gap: 2rem;
    justify-content: space-between;
    margin-top: 1.5rem;
    width: 100%;
  }

  .documendNoneBox {
    display: flex;
    width: 100%;
    margin-top: 1.5rem;
    align-items: center;
    justify-content: center;

    .noneDocument {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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


@media (max-width: 768px) {
  .select {
    padding: 1rem 0.2rem;
  }

  .DocumendList {
    .documendBox {
      justify-content: center !important;

    }
  }

  main {
    .introduce {
      justify-content: center;
    }
  }
}
</style>