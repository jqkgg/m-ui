# ChartPie3D 3D饼图

用于展示数据的3D饼图/环形图组件，支持自定义颜色、图例位置、标签显示等配置，具有立体视觉效果。

<script setup>
import { ref } from 'vue'

const data1 = ref([
  { name: '社评组织', value: 193 },
  { name: '用人单位(院校)', value: 22 },
  { name: '用人单位(企业)', value: 108 }
])

const data2 = ref([
  { name: '数据1', value: 100 },
  { name: '数据2', value: 200 },
  { name: '数据3', value: 300 },
  { name: '数据4', value: 150 }
])

const data3 = ref([
  { name: '系列1', value: 100 },
  { name: '系列2', value: 200 },
  { name: '系列3', value: 300 }
])

const colors1 = ref([
  'rgba(76, 175, 80, 1)',   // 绿色
  'rgba(33, 150, 243, 1)',  // 蓝色
  'rgba(255, 152, 0, 1)'    // 橙色
])

const colors2 = ref([
  'rgba(66, 133, 244, 0.8)',
  'rgba(255, 193, 7, 0.8)',
  'rgba(76, 175, 80, 0.8)',
  'rgba(156, 39, 176, 0.8)'
])

const showLegend = ref(true)
const legendPosition = ref('right')
const innerRadius = ref('60%')
const showLabel = ref(true)
const showPercent = ref(true)
const showValue = ref(false)
const depth = ref(20)
const darkMode = ref(false)
</script>

## 基础用法

基础的3D环形图用法，图例显示在右侧。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data1"
      :colors="colors1"
      legend-position="right"
      :legend-show-value="true"
      :legend-show-percent="true"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPie3D
    :data="[
      { name: '社评组织', value: 193 },
      { name: '用人单位(院校)', value: 22 },
      { name: '用人单位(企业)', value: 108 }
    ]"
    :colors="[
      'rgba(76, 175, 80, 1)',
      'rgba(33, 150, 243, 1)',
      'rgba(255, 152, 0, 1)'
    ]"
    legend-position="right"
    :legend-show-value="true"
    :legend-show-percent="true"
  />
</template>

<script setup>
import { MChartPie3D } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 3D饼图（非环形）

通过设置 `inner-radius` 为 `0` 来显示实心3D饼图。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data2"
      :colors="colors2"
      inner-radius="0"
      legend-position="right"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPie3D
    :data="[
      { name: '数据1', value: 100 },
      { name: '数据2', value: 200 },
      { name: '数据3', value: 300 },
      { name: '数据4', value: 150 }
    ]"
    inner-radius="0"
    legend-position="right"
  />
</template>

<script setup>
import { MChartPie3D } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 图例位置

通过 `legend-position` 属性可以设置图例的位置，支持 `left`、`right`、`top`、`bottom`。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data3"
      :legend-position="legendPosition"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-radio-group v-model="legendPosition">
      <el-radio label="left">左侧</el-radio>
      <el-radio label="right">右侧</el-radio>
      <el-radio label="top">顶部</el-radio>
      <el-radio label="bottom">底部</el-radio>
    </el-radio-group>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartPie3D
        :data="data"
        :legend-position="legendPosition"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-radio-group v-model="legendPosition">
        <el-radio label="left">左侧</el-radio>
        <el-radio label="right">右侧</el-radio>
        <el-radio label="top">顶部</el-radio>
        <el-radio label="bottom">底部</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartPie3D } from '@jqkgg/m-ui'

const data = ref([
  { name: '系列1', value: 100 },
  { name: '系列2', value: 200 },
  { name: '系列3', value: 300 }
])
const legendPosition = ref('right')
</script>
```
</CodeBlock>

## 自定义颜色

通过 `colors` 属性可以自定义饼图的颜色，支持透明度设置。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data2"
      :colors="colors2"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPie3D
    :data="[
      { name: '数据1', value: 100 },
      { name: '数据2', value: 200 },
      { name: '数据3', value: 300 },
      { name: '数据4', value: 150 }
    ]"
    :colors="[
      'rgba(66, 133, 244, 0.8)',
      'rgba(255, 193, 7, 0.8)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(156, 39, 176, 0.8)'
    ]"
  />
</template>

<script setup>
import { MChartPie3D } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 数据项自定义颜色

每个数据项可以单独设置颜色，通过 `data` 中的 `color` 属性。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="[
        { name: '数据1', value: 100, color: 'rgba(255, 99, 132, 0.8)' },
        { name: '数据2', value: 200, color: 'rgba(54, 162, 235, 0.8)' },
        { name: '数据3', value: 300, color: 'rgba(255, 206, 86, 0.8)' }
      ]"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPie3D
    :data="[
      { name: '数据1', value: 100, color: 'rgba(255, 99, 132, 0.8)' },
      { name: '数据2', value: 200, color: 'rgba(54, 162, 235, 0.8)' },
      { name: '数据3', value: 300, color: 'rgba(255, 206, 86, 0.8)' }
    ]"
  />
</template>

<script setup>
import { MChartPie3D } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 隐藏图例

通过 `show-legend` 属性可以隐藏图例。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data3"
      :show-legend="showLegend"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-checkbox v-model="showLegend">显示图例</el-checkbox>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartPie3D
        :data="data"
        :show-legend="showLegend"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-checkbox v-model="showLegend">显示图例</el-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartPie3D } from '@jqkgg/m-ui'

const data = ref([
  { name: '系列1', value: 100 },
  { name: '系列2', value: 200 },
  { name: '系列3', value: 300 }
])
const showLegend = ref(true)
</script>
```
</CodeBlock>

## 自定义标签

通过 `show-label`、`label-position`、`show-percent`、`show-value` 等属性可以自定义标签显示。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data3"
      :show-label="showLabel"
      label-position="outside"
      :show-percent="showPercent"
      :show-value="showValue"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-checkbox v-model="showLabel">显示标签</el-checkbox>
    <el-checkbox v-model="showPercent" style="margin-left: 16px;">显示百分比</el-checkbox>
    <el-checkbox v-model="showValue" style="margin-left: 16px;">显示数值</el-checkbox>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartPie3D
        :data="data"
        :show-label="showLabel"
        label-position="outside"
        :show-percent="showPercent"
        :show-value="showValue"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-checkbox v-model="showLabel">显示标签</el-checkbox>
      <el-checkbox v-model="showPercent" style="margin-left: 16px;">显示百分比</el-checkbox>
      <el-checkbox v-model="showValue" style="margin-left: 16px;">显示数值</el-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartPie3D } from '@jqkgg/m-ui'

const data = ref([
  { name: '系列1', value: 100 },
  { name: '系列2', value: 200 },
  { name: '系列3', value: 300 }
])
const showLabel = ref(true)
const showPercent = ref(true)
const showValue = ref(false)
</script>
```
</CodeBlock>

## 自定义尺寸和半径

通过 `height`、`width`、`inner-radius`、`radius` 属性可以自定义图表尺寸和环形图的内外半径。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data3"
      :inner-radius="innerRadius"
      radius="85%"
      height="400px"
    />
  </div>
  <div style="margin-top: 16px;">
    <label>
      内半径: <el-input v-model="innerRadius" style="width: 80px;" />
    </label>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartPie3D
        :data="data"
        :inner-radius="innerRadius"
        radius="85%"
        height="400px"
      />
    </div>
    <div style="margin-top: 16px;">
      <label>
        内半径: <el-input v-model="innerRadius" style="width: 80px;" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartPie3D } from '@jqkgg/m-ui'

const data = ref([
  { name: '系列1', value: 100 },
  { name: '系列2', value: 200 },
  { name: '系列3', value: 300 }
])
const innerRadius = ref('60%')
</script>
```
</CodeBlock>

## 3D深度

通过 `depth` 属性可以调整3D效果的深度，数值越大，3D效果越明显。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data3"
      :depth="depth"
    />
  </div>
  <div style="margin-top: 16px;">
    <label>
      3D深度: <el-input-number v-model="depth" :min="10" :max="30" style="width: 120px;" />
    </label>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <MChartPie3D
        :data="data"
        :depth="depth"
      />
    </div>
    <div style="margin-top: 16px;">
      <label>
        3D深度: <el-input-number v-model="depth" :min="10" :max="30" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartPie3D } from '@jqkgg/m-ui'

const data = ref([
  { name: '系列1', value: 100 },
  { name: '系列2', value: 200 },
  { name: '系列3', value: 300 }
])
const depth = ref(20)
</script>
```
</CodeBlock>

## 深色模式

通过 `dark-mode` 属性可以启用深色模式，适合深色背景的场景。

<Demo>
  <div style="width: 100%; height: 400px; background: #1a1a1a; padding: 20px;">
    <MChartPie3D
      :data="data1"
      :colors="colors1"
      :dark-mode="darkMode"
      legend-position="right"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-checkbox v-model="darkMode">深色模式</el-checkbox>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 400px; background: #1a1a1a; padding: 20px;">
      <MChartPie3D
        :data="data"
        :dark-mode="darkMode"
        legend-position="right"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-checkbox v-model="darkMode">深色模式</el-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartPie3D } from '@jqkgg/m-ui'

const data = ref([
  { name: '社评组织', value: 193 },
  { name: '用人单位(院校)', value: 22 },
  { name: '用人单位(企业)', value: 108 }
])
const darkMode = ref(true)
</script>
```
</CodeBlock>

## 图例显示配置

通过 `legend-show-value` 和 `legend-show-percent` 属性可以控制图例中是否显示数值和百分比。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPie3D
      :data="data1"
      :colors="colors1"
      legend-position="right"
      :legend-show-value="true"
      :legend-show-percent="true"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPie3D
    :data="[
      { name: '社评组织', value: 193 },
      { name: '用人单位(院校)', value: 22 },
      { name: '用人单位(企业)', value: 108 }
    ]"
    legend-position="right"
    :legend-show-value="true"
    :legend-show-percent="true"
  />
</template>

<script setup>
import { MChartPie3D } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 数据数组 | ChartPie3DDataItem[] | — | `[{ name: '数据1', value: 100 }, { name: '数据2', value: 200 }, { name: '数据3', value: 300 }]` |
| colors | 默认颜色数组 | string[] | — | `['rgba(76, 175, 80, 1)', 'rgba(33, 150, 243, 1)', 'rgba(255, 152, 0, 1)']` |
| showLegend | 是否显示图例 | boolean | — | true |
| legendPosition | 图例位置 | string | left / right / top / bottom | right |
| height | 图表高度 | number \| string | — | '400px' |
| width | 图表宽度 | number \| string | — | '100%' |
| innerRadius | 内半径（0-1之间或百分比字符串，用于控制环形图的内圆大小，0为饼图） | number \| string | — | '60%' |
| radius | 外半径（0-1之间或百分比字符串，用于控制环形图的外圆大小） | number \| string | — | '80%' |
| showLabel | 是否显示标签 | boolean | — | true |
| labelPosition | 标签位置 | string | inside / outside / center | outside |
| showPercent | 是否显示百分比 | boolean | — | true |
| showValue | 是否显示数值 | boolean | — | false |
| legendShowValue | 图例是否显示数值 | boolean | — | true |
| legendShowPercent | 图例是否显示百分比 | boolean | — | true |
| depth | 3D高度（影响3D视觉效果） | number | — | 20 |
| darkMode | 是否启用深色模式 | boolean | — | false |
| backgroundColor | 背景颜色 | string | — | undefined |

### ChartPie3DDataItem

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 数据项名称 | string | — | — |
| value | 数据项值 | number | — | — |
| color | 数据项颜色（可选，会覆盖 colors 中的对应颜色） | string | — | — |

