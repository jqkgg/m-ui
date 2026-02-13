# ChartFunnel 漏斗图

漏斗图组件，用于展示数据的层级关系。

<script setup>
import { ref } from 'vue'
import { MChartFunnel } from '@jqkgg/m-ui'

const data1 = ref([
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
  { value: 80, name: '点击' },
  { value: 100, name: '展现' }
])

const data2 = ref([
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
  { value: 80, name: '点击' },
  { value: 100, name: '展现' }
])

const data3 = ref([
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
  { value: 80, name: '点击' },
  { value: 100, name: '展现' }
])

const customOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '5%',
      top: '50%',
      sort: 'ascending',
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '55%',
      top: '50%',
      sort: 'ascending',
      label: {
        position: 'left'
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '5%',
      top: '5%',
      sort: 'descending',
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '55%',
      top: '5%',
      sort: 'descending',
      label: {
        position: 'left'
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    }
  ]
})

const pyramidData = ref([
  { value: 2057, name: 'F类' },
  { value: 1331, name: 'E类' },
  { value: 150, name: 'D类' },
  { value: 237, name: 'C类' },
  { value: 79, name: 'B类' },
  { value: 8, name: 'A类' }
])

const pyramidOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}人'
  },
  color: ['#FFD700', '#90EE90', '#3CB371', '#00BFFF', '#1E90FF', '#00008B'],
  series: [
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '80%',
      left: '30%',
      sort: 'ascending',
      gap: 0,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}   {c}人',
        fontSize: 16,
        color: '#fff'
      },
      labelLine: {
        show: true,
        length: 30,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: '#fff'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0,
        shadowBlur: 30,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      data: [
        { value: 60, name: 'A类' },
        { value: 80, name: 'B类' },
        { value: 100, name: 'C类' },
        { value: 120, name: 'D类' },
        { value: 140, name: 'E类' },
        { value: 160, name: 'F类' }
      ]
    }
  ]
})
</script>

## 基础用法

基础的漏斗图用法，默认按数值大小降序排列。

<Demo>
  <div style="width: 100%;">
    <MChartFunnel :data="data1" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartFunnel :data="data" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartFunnel } from '@jqkgg/m-ui'

const data = ref([
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
  { value: 80, name: '点击' },
  { value: 100, name: '展现' }
])
</script>
```
</CodeBlock>

## 升序排列

通过 `sort` 属性设置为 `ascending` 可以实现升序排列（金字塔状）。

<Demo>
  <div style="width: 100%;">
    <MChartFunnel :data="data2" sort="ascending" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartFunnel :data="data" sort="ascending" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartFunnel } from '@jqkgg/m-ui'

const data = ref([
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
  { value: 80, name: '点击' },
  { value: 100, name: '展现' }
])
</script>
```
</CodeBlock>

## 自定义样式

支持自定义标签位置、图形间距、颜色等。

<Demo>
  <div style="width: 100%;">
    <MChartFunnel
      :data="data3"
      label-position="right"
      :gap="10"
      :colors="['#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452']"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartFunnel
    :data="data"
    label-position="right"
    :gap="10"
    :colors="['#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452']"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MChartFunnel } from '@jqkgg/m-ui'

const data = ref([
  { value: 60, name: '访问' },
  { value: 40, name: '咨询' },
  { value: 20, name: '订单' },
  { value: 80, name: '点击' },
  { value: 100, name: '展现' }
])
</script>
```
</CodeBlock>

## 样式定制：金字塔分层

模拟3D效果的金字塔分层展示，使用右侧标签显示详细数据。

<Demo>
  <div style="width: 100%; height: 500px; background: #001f3f; display: flex; align-items: center; justify-content: center;">
    <MChartFunnel :options="pyramidOptions" height="400px" width="100%" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div style="background: #001f3f; padding: 20px;">
    <MChartFunnel :options="pyramidOptions" height="400px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartFunnel } from '@jqkgg/m-ui'

const pyramidOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}人'
  },
  color: ['#FFD700', '#90EE90', '#3CB371', '#00BFFF', '#1E90FF', '#00008B'],
  series: [
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '80%',
      left: '30%',
      sort: 'ascending',
      gap: 0,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}   {c}人',
        fontSize: 16,
        color: '#fff'
      },
      labelLine: {
        show: true,
        length: 30,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: '#fff'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0,
        shadowBlur: 30,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      data: [
        { value: 60, name: 'A类' },
        { value: 80, name: 'B类' },
        { value: 100, name: 'C类' },
        { value: 120, name: 'D类' },
        { value: 140, name: 'E类' },
        { value: 160, name: 'F类' }
      ]
    }
  ]
})
</script>
```
</CodeBlock>

## 完全自定义配置

通过 `options` 属性可以完全自定义 ECharts 配置项，实现更复杂的效果。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartFunnel :options="customOptions" height="500px" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartFunnel :options="customOptions" height="500px" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartFunnel } from '@jqkgg/m-ui'

const customOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '5%',
      top: '50%',
      sort: 'ascending',
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '55%',
      top: '50%',
      sort: 'ascending',
      label: {
        position: 'left'
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '5%',
      top: '5%',
      sort: 'descending',
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '55%',
      top: '5%',
      sort: 'descending',
      label: {
        position: 'left'
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    }
  ]
})
</script>
```
</CodeBlock>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 数据数组 | `ChartFunnelDataItem[]` | — | `[]` |
| colors | 颜色数组 | `string[]` | — | `[...]` |
| showLegend | 是否显示图例 | `boolean` | — | `false` |
| sort | 排序方式 | `ChartFunnelSort` | `descending` / `ascending` / `none` | `descending` |
| gap | 图形间距 | `number` | — | `2` |
| height | 图表高度 | `number` \| `string` | — | `400px` |
| width | 图表宽度 | `number` \| `string` | — | `100%` |
| showLabel | 是否显示标签 | `boolean` | — | `true` |
| labelPosition | 标签位置 | `ChartFunnelLabelPosition` | `inside` / `outside` / `left` / `right` | `inside` |
| options | 自定义配置 | `any` | — | `undefined` |

### Types

#### ChartFunnelDataItem

```ts
interface ChartFunnelDataItem {
  name: string
  value: number
  itemStyle?: any
}
```
