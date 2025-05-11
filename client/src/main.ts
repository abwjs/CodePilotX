import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from './stores'
import './permisson'
import '@/styles/reset.scss'
import './styles/iconfont.css'
import SvgIcon from '@/components/SvgIcon.vue'
import Navigation from '@/components/Navigation.vue'
import TopTIP from './components/TopTIP.vue'
const app = createApp(App)
app.component('SvgIcon', SvgIcon);
app.component('NavIgation',Navigation)
app.component('TopTIP',TopTIP)
app.use(router)
app.use(pinia)
app.mount('#app')
