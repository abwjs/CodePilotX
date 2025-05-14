<template>
  <div class="editor" :style="{ width }">
    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client';
import { onUnmounted, nextTick } from 'vue';
import mitts from '../utils/bus'
import { useEditor, EditorContent } from '@tiptap/vue-3'
// import { useDocumentStore } from '../stores/modules/document';
// import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Collaboration from '@tiptap/extension-collaboration'
import { useUserStore } from '../stores/modules/user';
import * as Y from 'yjs'
const UserStore = useUserStore()
// const DocumentStore = useDocumentStore()
const props = defineProps<{
  width: string,
  docId: string
}>()
const ydoc = new Y.Doc()
const editor = useEditor({
  content: '<p>开始编辑！🎉</p>',
  extensions: [
    //禁止本地历史存储
    // StarterKit.configure({ history: false }),
    Document,
    Paragraph,
    Text,
    Highlight,
    Highlight.configure({ multicolor: true }),
    Heading.configure({
      levels: [1, 2, 3],
    }),
    //绑定ydoc
    Collaboration.configure({
      document: ydoc,
    }),
  ],
})
nextTick(() => {
  mitts.emit('event', editor.value)
})
const socket = io(import.meta.env.VITE_APP_BASE_API
  , {
    auth: {
      token: UserStore.token
    },
    withCredentials: true,
  })
// 发送进入房间
socket.emit('join-doc', props.docId)
// 监听初始化文档
socket.on('doc-init', (update:Uint8Array) => {
  //应用初始化文档内容
  if (!(update instanceof Uint8Array)) {
    console.error('收到非二进制数据:', update)
    return
  }
  Y.applyUpdate(ydoc, update)
})
//改变
editor.value?.on('transaction', () => {
  const update = Y.encodeStateAsUpdate(ydoc);
  socket.emit('yjs-update', props.docId, update);
});
// 清理资源
onUnmounted(() => {
  socket.disconnect();
});
</script>

<style lang="scss" scoped>
.editor-content {
  height: 100%;
}

.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #0d0d0d;
  background-color: #fff;
  border-radius: .75rem;

  &-header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: .25rem;
  }

  &-content {
    padding: .7rem .5rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}


.ProseMirror {
  height: 100%;

  &:focus {
    outline: none;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, .1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: .75rem 1rem;
    border-radius: .5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: .8rem;
    }
  }


  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, .1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, .1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      >label {
        flex: 0 0 auto;
        margin-right: .5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>