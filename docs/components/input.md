# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

```vue
<template>
  <MInput v-model="input" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'm-ui'

const input = ref('')
</script>
```

## 禁用状态

```vue
<template>
  <MInput v-model="input" placeholder="请输入内容" disabled />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'm-ui'

const input = ref('')
</script>
```

## 只读状态

```vue
<template>
  <MInput v-model="input" placeholder="请输入内容" readonly />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'm-ui'

const input = ref('只读输入框')
</script>
```

## 错误状态

```vue
<template>
  <MInput v-model="input" placeholder="请输入内容" error />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'm-ui'

const input = ref('')
</script>
```

## 不同输入类型

```vue
<template>
  <MInput v-model="text" type="text" placeholder="文本" />
  <MInput v-model="password" type="password" placeholder="密码" />
  <MInput v-model="number" type="number" placeholder="数字" />
  <MInput v-model="email" type="email" placeholder="邮箱" />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'm-ui'

const text = ref('')
const password = ref('')
const number = ref('')
const email = ref('')
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | string | text / password / number / email / tel / url / search | text |
| modelValue / v-model | 绑定值 | string | — | — |
| placeholder | 输入框占位文本 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| maxlength | 最大输入长度 | number | — | — |
| error | 是否错误状态 | boolean | — | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入时触发 | value: string |
| focus | 获得焦点时触发 | event: FocusEvent |
| blur | 失去焦点时触发 | event: FocusEvent |
| change | 值改变时触发 | value: string |

