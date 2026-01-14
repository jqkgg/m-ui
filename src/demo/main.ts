import { createApp } from 'vue'
import App from './App.vue'
import MUI from '../index'
import '../style.scss'

const app = createApp(App)
app.use(MUI)
app.mount('#app')

