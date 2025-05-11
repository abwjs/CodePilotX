<template>
  <div class="Documend" @click="GoDocumentation">
    <div class="Documend__Identification">
      <div class="detail" >...</div>
    </div>
    <div class="Documend__Information">
      <h2>{{ documentContent.title }}
      </h2>
      <p>{{ documentContent.createdAt.slice(0, 10) }}</p>
      <!-- 协同者取前三个头像 -->
      <div class="avater">
        <img src="../assets/images/github.png" v-for="(item, index) in 3" :key="index" alt="">
      </div>
    </div>
    <div class="box">
        <li class="">修改标题</li>
        <li class="">修改封面</li>
        <li class="">删除文档</li>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Document } from '../types/document';
import { useRouter } from 'vue-router';
const props = defineProps<{ documentContent: Document }>()
const avaterList = computed(() => {
  if (props.documentContent.collaborators.length <= 3) return props.documentContent.collaborators
  return props.documentContent.collaborators.slice(3)
})
const router = useRouter()
console.log(avaterList);
// 跳转到文档页面带文档id
const GoDocumentation = () => {
  router.push({
    name: 'Document',
    params: {
      docId: props.documentContent._id
    }
  })
}
</script>

<style scoped lang="scss">
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: space-between;
}

.Documend {
  @include flex-center(column);
  position: relative;
  height: 15rem;
  border-radius: variable.$lg;
  overflow: hidden;
  border: 1px solid rgb(222, 223, 224);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: variable.$shadow;
  }

  &__Identification {
    position: relative;
    width: 100%;
    height: 70%;

    .detail {
      @include flex-center(row);
      justify-content: center;
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      width: 2rem;
      height: 2rem;
      border-radius: 0.7rem;

      &:hover {
        background-color: variable.$primary-color;
        border: 1px solid rgb(222, 223, 224);
      }
    }


  }

  &__Information {
    position: relative;
    background-color: variable.$primary-color;
    flex: 1;
    width: 100%;
    padding: 0.8rem;

    h2 {
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }

    p {
      font-size: 0.8rem;
      color: rgb(170, 170, 173)
    }

    .avater {
      position: absolute;
      right: .5rem;
      top: 50%;
      transform: translateY(-50%);

      img {
        width: 1.35rem;
        height: 1.35rem;
        border: 50%;
      }
    }
  }
}
// 弹出框
.box {
      position: absolute;
      right: -4rem;
      top:0;
      width: 4rem;
      height: 5rem;
      background-color: powderblue;
    }
</style>