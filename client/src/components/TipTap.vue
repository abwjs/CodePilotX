<template>
  <div class="editor" v-if="editor" :style="{ width }">
    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted,nextTick } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import mitts from '../utils/bus'
import { TiptapCollabProvider } from '@hocuspocus/provider'
const doc = new Y.Doc() // Initialize Y.Doc for shared editing
defineProps<{
  width: string
}>()
const editor = useEditor({
  content: '<p>I’m running Tiptap with vue-next. 🎉</p>',
  extensions: [
    StarterKit
    , Highlight,
    Document,
    Paragraph,
    Text,
    Highlight.configure({ multicolor: true }),
    Heading.configure({
          levels: [1, 2, 3],
        }),
        Collaboration.configure({
        document: doc, // Configure Y.Doc for collaboration
      }),
  ]
})
nextTick(() => {
  mitts.emit('event', editor)
})
// Connect to your Collaboration server
  onMounted(() => {
    const provider = new TiptapCollabProvider({
      name: 'document.name', 
      appId: 'JKVV01DK', 
      token: 'notoken', 
      document: doc,
    })
    console.log(provider);
    
  })
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