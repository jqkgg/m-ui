# M-UI 使用指南

## 项目结构

```
m-ui/
├── src/                    # 源代码目录
│   ├── components/         # 组件目录
│   │   ├── Button/        # Button 组件
│   │   └── Input/         # Input 组件
│   ├── demo/              # 开发演示
│   ├── index.ts           # 入口文件
│   └── style.css          # 全局样式
├── docs/                  # 文档目录
│   ├── .vitepress/        # VitePress 配置
│   ├── components/        # 组件文档
│   └── index.md           # 首页
├── dist/                  # 构建输出（构建后生成）
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发组件

启动开发服务器查看组件演示：

```bash
npm run dev
```

访问 http://localhost:5173 查看组件演示页面。

### 3. 开发文档

启动文档开发服务器：

```bash
npm run dev:docs
```

访问 http://localhost:5173 查看文档。

### 4. 构建组件库

构建生产版本：

```bash
npm run build
```

构建完成后，会在 `dist` 目录生成：
- `m-ui.js` - ES 模块格式
- `m-ui.umd.cjs` - UMD 格式
- `style.css` - 样式文件
- `index.d.ts` - TypeScript 类型声明

### 5. 构建文档

```bash
npm run build:docs
```

## 发布到 npm

### 1. 登录 npm

```bash
npm login
```

### 2. 更新版本号

```bash
npm version patch  # 补丁版本 1.0.0 -> 1.0.1
npm version minor  # 次要版本 1.0.0 -> 1.1.0
npm version major  # 主要版本 1.0.0 -> 2.0.0
```

### 3. 发布

```bash
npm publish
```

发布前会自动执行 `prepublishOnly` 脚本，构建项目。

## 在其他项目中使用

### 安装

```bash
npm install m-ui
```

### 完整引入

```javascript
import { createApp } from 'vue'
import MUI from 'm-ui'
import 'm-ui/dist/style.css'

const app = createApp(App)
app.use(MUI)
app.mount('#app')
```

### 按需引入

```javascript
import { MButton, MInput } from 'm-ui'
import 'm-ui/dist/style.css'
```

### TypeScript 支持

项目已配置 TypeScript 类型声明，在 TypeScript 项目中可以直接使用，无需额外配置。

## 添加新组件

1. 在 `src/components/` 下创建组件目录
2. 创建 `index.vue` 组件文件
3. 创建 `types.ts` 类型定义文件
4. 在 `src/index.ts` 中导入并导出组件
5. 在文档中添加组件说明

## 注意事项

- 确保 Vue 3 作为 peerDependency，不会被打包进组件库
- 样式文件需要单独引入
- 构建前确保所有 TypeScript 类型检查通过
- 发布前测试组件在不同环境下的兼容性

