<template>
  <div class="AIInlineBox">
    <h1>CodePilotX</h1>
    <div class="content">
      <li :class="['item', item.role==='assistant' ? 'assistant' : 'user']" v-for="item in ContentList" :key="item.id">
        <img class="item__avatar" v-if="item.role==='assistant'" src='../assets/images/github.png' alt="">
        <img class="item__avatar" v-else :src="(UserStore.image as string)" alt="">
        <div class="item__dragdrop">
          <MdRenderer v-if="item.role === 'assistant'" :source="item.content"></MdRenderer>
          <p v-else>{{ item.content }}</p>
        </div>
      </li>

    </div>
    <div class="search-container">
      <input type="text" placeholder="搜索..." v-model="text" class="search-container__input">
      <button class="search-container__button" @click="sending">
      </button>
    </div>
    <span @click="close" class="Close">X</span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import MdRenderer from './MdRenderer.vue';
import { useChatStore } from '../stores/modules/chat';
import type { additional } from '../types/Chatmessages';
import { Talk } from '../api/Chat';
import { useUserStore } from '../stores/modules/user';
const emit = defineEmits<{ closeAI: [void] }>()
const props = defineProps<{
  Inputvalue?: string
}>()
const UserStore = useUserStore()
const text = ref<string>('')
const close = () => {
  chatStore.removeConversation()
  emit('closeAI')
}

const chatStore = useChatStore()
const { ContentList ,ConversationsId} = storeToRefs(chatStore)
// 接收内容
const fullContent = ref<string>('')

//buffer
const buffer = ref<string>('')
//对话id
const chat_id = ref<string>('')
// 处理流式输出提取内容函数（使用buffer处理不完整行）

const processChunk = (chunk: string) => {
  buffer.value += chunk
  const lines = buffer.value.split('\n')
  // 保留未处理完的部分
  buffer.value = lines.pop() || ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('event:conversation.chat.created')) {
      //找data的那一行
      const dataLine = lines[i + 1].trim()
      //去data
      const dataStr = dataLine.slice(5).trim()
      try {
        const data = JSON.parse(dataStr)
        chat_id.value = data.id
      } catch (error) {
        console.error('拿取chatid失败', error)
      }
    }
    if (line.startsWith('event:conversation.message.delta') && i + 1 < lines.length) {
      const dataLine = lines[i + 1].trim()
      if (dataLine.startsWith('data:')) {
        const dataStr = dataLine.slice(5).trim()
        try {
          const data = JSON.parse(dataStr)

          if (data.type === 'answer') {
            fullContent.value += data.content

            chatStore.setAIStream(data.content)
            // 流式增加ai消息

          }
        } catch (error) {
          console.error('解析 JSON 失败:', error)
        }
        i++ // 跳过已处理的 data 行
      }
    }
  }
}

//对话框发送对话
const sending = async () => {
  if (text.value == '') {
    console.log('模拟无消息提示框')
  }
  const t = text.value
  text.value = ''
  fullContent.value = ''
  if (!ConversationsId.value) {
    //创建会话
    await chatStore.addConversation()
  }

  //发起对话消息
  const additional_messages: additional[] = [
    {
      role: 'user',
      content: t,
      content_type: 'text',
    },
  ]
  const HTTP = Talk(additional_messages)
  HTTP.then(async (res) => {
    // 创建一个可读流
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    //增加用户消息
    chatStore.setUserMessage(t)
    // 增加ai消息占位
    chatStore.setAIMessage()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        console.log('结束读取')
        break
      }
      processChunk(decoder.decode(value, { stream: true }))
      // 处理累积的消息内容
    }
  }).catch((err: Error) => {
    console.log(err)
  })
}



onMounted(async () => {
  if (props.Inputvalue) {
    text.value = props.Inputvalue
    sending()
  }
})

</script>

<style scoped lang="scss">
// Mixins 定义
@mixin flex-center($direction: row, $justify: center) {
  display: flex;
  flex-direction: $direction;
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
  overflow: auto;
  h1 {
    font-size: 1.8rem;
    text-align: center;
  }

  // 消息内容
  .content {
    margin-top: 1rem;
    padding: 0 3%;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 2rem;
    width: 100%;

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
        height: 100%;
        border-radius: variable.$sm;
        flex: 1;
      }
    }

    //用户
    .user {
      flex-direction: row-reverse;
      .item__dragdrop {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        justify-content: flex-end;
        
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