import type { App } from 'vue'
import './style.scss'

// 导入组件
import MButton from './components/Button/index.vue'
import MInput from './components/Input/index.vue'

// 导出组件
export { MButton, MInput }

// 导出类型
export type { ButtonProps } from './components/Button/types'
export type { InputProps } from './components/Input/types'

// 组件列表
const components = [MButton, MInput]

// 安装函数
const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name || component.__name, component)
  })
}

// 支持按需引入
export default {
  install,
  MButton,
  MInput
}

