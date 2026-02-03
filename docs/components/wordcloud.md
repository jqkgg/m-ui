# ChartWordCloud 词云图

用于展示文本数据的词云图组件，支持自定义形状、颜色、字体大小等配置。

<script setup>
import { ref } from 'vue'

const data1 = ref([
  { name: 'Vue', value: 100 },
  { name: 'React', value: 90 },
  { name: 'Angular', value: 80 },
  { name: 'TypeScript', value: 70 },
  { name: 'JavaScript', value: 60 },
  { name: 'Node.js', value: 50 },
  { name: 'Webpack', value: 40 },
  { name: 'Vite', value: 35 },
  { name: 'ES6', value: 30 },
  { name: 'CSS3', value: 25 }
])

const data2 = ref([
  { name: '数据可视化', value: 100 },
  { name: '图表', value: 80 },
  { name: '分析', value: 70 },
  { name: '展示', value: 60 },
  { name: '统计', value: 50 },
  { name: '报告', value: 40 },
  { name: '趋势', value: 35 },
  { name: '洞察', value: 30 }
])

const colors1 = ref([
  '#5470C6',
  '#91CC75',
  '#FAC858',
  '#EE6666',
  '#73C0DE',
  '#3BA272',
  '#FC8452',
  '#9A60B4',
  '#EA7CCC'
])

const shape = ref('circle')
const sizeRange = ref([12, 60])
const rotationRange = ref([-90, 90])
</script>

## 基础用法

基础的词云图用法，使用默认的圆形形状。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      :colors="colors1"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 },
      { name: 'TypeScript', value: 70 },
      { name: 'JavaScript', value: 60 }
    ]"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义形状

通过 `shape` 属性可以设置词云图的形状，支持 `circle`、`cardioid`、`diamond`、`square`、`triangle-forward`、`triangle`、`pentagon`、`star`。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data2"
      :shape="shape"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-select v-model="shape" style="width: 200px;">
      <el-option label="圆形" value="circle" />
      <el-option label="心形" value="cardioid" />
      <el-option label="菱形" value="diamond" />
      <el-option label="方形" value="square" />
      <el-option label="前向三角形" value="triangle-forward" />
      <el-option label="三角形" value="triangle" />
      <el-option label="五边形" value="pentagon" />
      <el-option label="星形" value="star" />
    </el-select>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartWordCloud
        :data="data"
        :shape="shape"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-select v-model="shape" style="width: 200px;">
        <el-option label="圆形" value="circle" />
        <el-option label="心形" value="cardioid" />
        <el-option label="菱形" value="diamond" />
        <el-option label="方形" value="square" />
        <el-option label="前向三角形" value="triangle-forward" />
        <el-option label="三角形" value="triangle" />
        <el-option label="五边形" value="pentagon" />
        <el-option label="星形" value="star" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartWordCloud } from '@jqkgg/m-ui'

const data = ref([
  { name: '数据可视化', value: 100 },
  { name: '图表', value: 80 },
  { name: '分析', value: 70 }
])
const shape = ref('circle')
</script>
```
</CodeBlock>

## 自定义颜色

通过 `colors` 属性可以自定义词云图的颜色数组。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      :colors="colors1"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 }
    ]"
    :colors="[
      '#5470C6',
      '#91CC75',
      '#FAC858',
      '#EE6666',
      '#73C0DE'
    ]"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 数据项自定义颜色

每个数据项可以单独设置颜色，通过 `data` 中的 `color` 属性。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="[
        { name: 'Vue', value: 100, color: '#42B983' },
        { name: 'React', value: 90, color: '#61DAFB' },
        { name: 'Angular', value: 80, color: '#DD0031' },
        { name: 'TypeScript', value: 70, color: '#3178C6' }
      ]"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100, color: '#42B983' },
      { name: 'React', value: 90, color: '#61DAFB' },
      { name: 'Angular', value: 80, color: '#DD0031' },
      { name: 'TypeScript', value: 70, color: '#3178C6' }
    ]"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义字体大小范围

通过 `size-range` 属性可以设置字体大小的范围，格式为 `[最小字体, 最大字体]`。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      :size-range="sizeRange"
    />
  </div>
  <div style="margin-top: 16px;">
    <label style="display: flex; align-items: center; gap: 12px;">
      <span>字体大小范围: [{{ sizeRange[0] }}, {{ sizeRange[1] }}]</span>
      <el-slider
        v-model="sizeRange"
        :min="8"
        :max="80"
        range
        style="flex: 1; max-width: 300px;"
      />
    </label>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartWordCloud
        :data="data"
        :size-range="[12, 60]"
      />
    </div>
  </div>
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'

const data = [
  { name: 'Vue', value: 100 },
  { name: 'React', value: 90 },
  { name: 'Angular', value: 80 }
]
</script>
```
</CodeBlock>

## 自定义旋转角度

通过 `rotation-range` 属性可以设置文字的旋转角度范围，格式为 `[最小角度, 最大角度]`。通过 `rotation-step` 可以设置旋转步长。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      :rotation-range="rotationRange"
      rotation-step="15"
    />
  </div>
  <div style="margin-top: 16px;">
    <label style="display: flex; align-items: center; gap: 12px;">
      <span>旋转角度范围: [{{ rotationRange[0] }}°, {{ rotationRange[1] }}°]</span>
      <el-slider
        v-model="rotationRange"
        :min="-180"
        :max="180"
        range
        style="flex: 1; max-width: 300px;"
      />
    </label>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 }
    ]"
    :rotation-range="[-90, 90]"
    rotation-step="15"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 禁用旋转

通过设置 `rotation-range` 为 `[0, 0]` 可以禁用文字旋转。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      :rotation-range="[0, 0]"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 }
    ]"
    :rotation-range="[0, 0]"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义尺寸

通过 `height` 和 `width` 属性可以自定义词云图的尺寸。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartWordCloud
      :data="data1"
      height="500px"
      width="100%"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 }
    ]"
    height="500px"
    width="100%"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义背景色

通过 `background-color` 属性可以设置词云图的背景色。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      background-color="#f5f5f5"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 }
    ]"
    background-color="#f5f5f5"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 禁用悬停效果

通过设置 `hoverable` 为 `false` 可以禁用悬停效果。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      :hoverable="false"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartWordCloud
    :data="[
      { name: 'Vue', value: 100 },
      { name: 'React', value: 90 },
      { name: 'Angular', value: 80 }
    ]"
    :hoverable="false"
  />
</template>

<script setup>
import { MChartWordCloud } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 不同形状示例

### 心形

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      shape="cardioid"
    />
  </div>
</Demo>

### 菱形

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      shape="diamond"
    />
  </div>
</Demo>

### 方形

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      shape="square"
    />
  </div>
</Demo>

### 星形

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartWordCloud
      :data="data1"
      shape="star"
    />
  </div>
</Demo>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 数据数组 | ChartWordCloudDataItem[] | — | `[{ name: '词云', value: 100 }, { name: '数据', value: 80 }, ...]` |
| colors | 默认颜色数组 | string[] | — | `['#5470C6', '#91CC75', '#FAC858', ...]` |
| height | 图表高度 | number \| string | — | '400px' |
| width | 图表宽度 | number \| string | — | '100%' |
| shape | 词云形状 | string | circle / cardioid / diamond / square / triangle-forward / triangle / pentagon / star | circle |
| sizeRange | 字体大小范围 [最小, 最大] | [number, number] | — | [12, 60] |
| rotationRange | 旋转角度范围 [最小角度, 最大角度] | [number, number] | — | [-90, 90] |
| rotationStep | 旋转步长 | number | — | 15 |
| gridSize | 网格大小（用于碰撞检测，值越小越精确但性能越差） | number | — | 4 |
| animation | 是否启用动画 | boolean | — | true |
| animationDuration | 动画持续时间（毫秒） | number | — | 1000 |
| hoverable | 是否启用悬停效果 | boolean | — | true |
| backgroundColor | 背景色 | string | — | transparent |
| options | 完全自定义的配置项，传入后将以 options 为准，忽略其他属性 | object | — | undefined |

### ChartWordCloudDataItem

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 词云项名称 | string | — | — |
| value | 词云项值（决定字体大小） | number | — | — |
| color | 数据项颜色（可选，会覆盖 colors 中的对应颜色） | string | — | — |

