<template>
  <div class="Documend" @click="GoDocumentation">
    <div class="Documend__Identification">
      <img :src="documentContent.cover" alt="">
      <div class="detail" ref="detailRef" @click="BoxOpaction">G</div>
    </div>
    <div class="Documend__Information">
      <h2 v-if="!isEditingTitle">{{ documentContent.title }}</h2>
      <input v-else ref="titleInput" v-model="editingTitle" class="title-input" @keyup.enter="confirmEdit"
        @click.stop @blur="confirmEdit" />
      <p>{{ documentContent.createdAt.slice(0, 10) }}</p>
      <!-- 协同者取前三个头像 -->
      <div class="avater">
        <img :src="documentContent.creator.image" alt="">
        <img :src="item.image" v-for="(item, index) in avaterList" :key="index" alt="">
      </div>
    </div>
    <div class="box" v-show="showBox" ref="boxRef">
      <li class="box__li" @click.stop="modifyTitle">修改标题</li>
      <li class="box__li" @click.stop="uploadCover">修改封面</li>
      <input
    type="file"
    accept="image/*"
    ref="fileInput"
    @change="handleFileSelect"
    class="hidden-input"
    hidden
    @click.stop
  />
      <li class="box__li">删除文档</li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import type { Document } from '../types/document';
import { useRouter } from 'vue-router';
import Compressor from 'compressorjs'
import { useDocumentStore } from '../stores/modules/document';
import { useUserStore } from '../stores/modules/user';
const showBox = ref(false);
const UserStore = useUserStore()
const DocumentStore = useDocumentStore()
const detailRef = ref<HTMLElement | null>(null);
const boxRef = ref<HTMLElement | null>(null)
const props = defineProps<{ documentContent: Document }>()
const avaterList = computed(() => {
  console.log(props.documentContent);
  if (props.documentContent.collaborators.length <= 2) return props.documentContent.collaborators
  return props.documentContent.collaborators.slice(2)
})
const router = useRouter()

// 新增的响应式状态
const isEditingTitle = ref(false)
const editingTitle = ref('')
const titleInput = ref<HTMLInputElement | null>(null)

// 修改标题点击处理
const modifyTitle = () => {
  showBox.value = false // 关闭操作菜单
  isEditingTitle.value = true
  editingTitle.value = props.documentContent.title
  nextTick(() => {
    titleInput.value?.focus()
    titleInput.value?.select()
  })
}

// 确认修改
const confirmEdit = () => {
  isEditingTitle.value = false
  if (editingTitle.value !== props.documentContent.title) {
    DocumentStore.updateDocumentTitle(editingTitle.value,props.documentContent._id,UserStore.id as string)
  }
}

const fileInput = ref<HTMLInputElement | null>(null)

// 修改封面点击处理
const uploadCover = () => {
  showBox.value = false // 关闭操作菜单
  fileInput.value?.click() // 直接触发文件选择
}



// 处理文件选择
const handleFileSelect = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    const compressedFile = await recursiveCompress(file)
    await uploadFile(compressedFile)
  } catch (err) {
    console.error('上传失败:', err)
  } finally {
    if (fileInput.value) fileInput.value.value = '' // 清空选择
  }
}

// 递归压缩逻辑
const recursiveCompress = async (
  file: File,
  quality = 0.9,
  maxSizeKB = 500
): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (file.size / 1024 <= maxSizeKB) return resolve(file)

    new Compressor(file, {
      quality,
      maxWidth: 1200,
      success(result) {
        const newFile = new File([result], file.name.replace(/\.png$/i, '.jpg'), {
          type: 'image/jpeg'
        })

        if (newFile.size / 1024 > maxSizeKB) {
          const nextQuality = quality * 0.9
          if (nextQuality < 0.2) return resolve(newFile)
          resolve(recursiveCompress(newFile, nextQuality, maxSizeKB))
        } else {
          resolve(newFile)
        }
      },
      error(err:Error) {
        console.log(err);
        
        reject(new Error('图片压缩失败'))
      }
    })
  })
}

// 上传文件方法
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    DocumentStore.uploadCover(props.documentContent._id,formData)
    console.log('上传成功')
  } catch (err) {
    console.log(err);
    throw new Error('上传请求失败')
  }
}



// 跳转到文档页面带文档id
const GoDocumentation = () => {
  router.push({
    name: 'Document',
    params: {
      docId: props.documentContent._id
    }
  })
}
const BoxOpaction = (event: MouseEvent) => {
  event.stopPropagation();
  showBox.value = !showBox.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!boxRef.value || !showBox.value) return;

  const target = event.target as HTMLElement;
  const clickedInsideBox = boxRef.value.contains(target);
  const clickedOnDetail = detailRef.value?.contains(target);

  if (!clickedInsideBox && !clickedOnDetail) {
    showBox.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
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
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
      height: 100%;
    }
    
    .detail {
      @include flex-center(row);
      justify-content: center;
      position: absolute;
      right: .5rem;
      top: 0.3rem;
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
    border-bottom-right-radius: variable.$lg;
    border-bottom-left-radius: variable.$lg;

    h2 {
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }
.title-input {
      width: 70%;
      font-size: 1rem;
      border-radius: variable.$sm;
      padding: 0.2rem 0.5rem;
      margin-bottom: 0.2rem;
      background: variable.$background-color;


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
        border-radius: 50%;
      }
    }
  }
}

// 弹出框
.box {
  position: absolute;
  right: -1.8rem;
  top: 2.8rem;
  border-radius: variable.$sm;
  border: 1px solid variable.$border-color;

  &__li {
    padding: .1rem .3rem;
    border-bottom: 1px solid variable.$border-color;
    background-color: variable.$background-color;

    &:last-child {
      border: 0;
    }

    &:hover {
      background-color: variable.$primary-color;
    }
  }
}
.hidden-input {
  display: none;
}
</style>