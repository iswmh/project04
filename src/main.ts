import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores/index'
import router from '@/router/index'
import userinfoStore from './stores/userStore'

const app = createApp(App)
app.use(pinia)
const userStore = userinfoStore()
userStore.localSubmeun()
app.use(router)
app.mount('#app')

