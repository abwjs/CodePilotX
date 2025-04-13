<template>
  <div class="h1">
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`"></div>
      <MenuItem v-else :key="index" v-bind = "item">
      </MenuItem>
    </template>
  </div>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { reactive,ref,onMounted } from 'vue'
import mitts from '../utils/bus';
let  editor =ref();
onMounted(()=>{
  mitts.on('event',(e)=>{
      editor.value=e
  })
})

const items = reactive([
  {
    icon: 'bold',
    title: 'Bold',
    action: () => 
      editor.value?.chain().focus().toggleBold().run(),
    isActive: () => editor.value?.isActive('bold')
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor.value?.isActive('italic')
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor.value?.isActive('strike')
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => editor.value?.chain().focus().toggleCode().run(),
    isActive: () => editor.value?.isActive('code')
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () =>editor.value?.chain().focus().toggleHighlight().run(),
    isActive: () => editor.value?.isActive('highlight')
  },
  {
    type: 'divider'
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 1 })
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.value?.isActive('heading', { level: 2 })
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () =>editor.value?.chain().focus().setParagraph().run(),
    isActive: () => editor.value?.isActive('paragraph')
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () =>editor.value?.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value?.isActive('bulletList')
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => editor.value?.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.value?.isActive('orderedList')
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => editor.value?.chain().focus().toggleTaskList().run(),
    isActive: () => editor.value?.isActive('taskList')
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.value?.isActive('codeBlock')
  },
  {
    type: 'divider'
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => editor.value?.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.value?.isActive('blockquote')
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => editor.value?.chain().focus().setHorizontalRule().run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => editor.value?.chain().focus().setHardBreak().run()
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => editor.value?.chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => editor.value?.chain().focus().undo().run()
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () =>editor.value?.chain().focus().redo().run()
  }
])

</script>

<style scoped>
.editor-header {
  width: 100%;
  display: flex;
  justify-content: center;
}
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, .1);
  margin-left: .5rem;
  margin-right: .75rem;
}
</style>