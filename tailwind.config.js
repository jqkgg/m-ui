/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#409eff',
          light: '#66b1ff',
          dark: '#3a8ee6',
          darker: '#2b85e4'
        },
        success: {
          DEFAULT: '#67c23a',
          light: '#85ce61'
        },
        warning: {
          DEFAULT: '#e6a23c',
          light: '#ebb563'
        },
        danger: {
          DEFAULT: '#f56c6c',
          light: '#f78989'
        },
        info: {
          DEFAULT: '#909399',
          light: '#a6a9ad'
        },
        // 使用 mui 前缀避免冲突
        'mui-text': {
          DEFAULT: '#303133',
          secondary: '#606266',
          placeholder: '#c0c4cc',
          disabled: '#c0c4cc'
        },
        'mui-border': {
          DEFAULT: '#dcdfe6',
          light: '#e4e7ed',
          lighter: '#ebeef5',
          extra: '#f2f6fc'
        }
      },
      borderRadius: {
        DEFAULT: '4px'
      },
      fontSize: {
        base: '14px'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false // 禁用 Tailwind 的默认样式重置，避免影响组件库
  }
}
