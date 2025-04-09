import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from './stores'
import './permisson'
import '@/styles/reset.scss'
import '@/assets/iconfont/iconfont.js'
import SvgIcon from '@/components/SvgIcon.vue'
import Navigation from '@/components/Navigation.vue'
const app = createApp(App)
app.component('SvgIcon', SvgIcon);
app.component('NavIgation',Navigation)
app.use(router)
app.use(pinia)
app.mount('#app')
