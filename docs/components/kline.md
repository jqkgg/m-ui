# ChartKLine K线图

用于展示股票、期货等金融数据的 K 线图组件，支持显示成交量、数据缩放、自定义颜色等功能。

<script setup>
import { ref } from 'vue'

// 基础 K 线数据
const basicData = ref([
  { date: '2024-01-01', value: [100, 120, 95, 125], volume: 1000 },
  { date: '2024-01-02', value: [120, 110, 105, 125], volume: 1200 },
  { date: '2024-01-03', value: [110, 130, 108, 135], volume: 1500 },
  { date: '2024-01-04', value: [130, 125, 120, 135], volume: 1100 },
  { date: '2024-01-05', value: [125, 140, 122, 145], volume: 1800 },
  { date: '2024-01-06', value: [140, 135, 130, 145], volume: 1600 },
  { date: '2024-01-07', value: [135, 150, 132, 155], volume: 2000 },
  { date: '2024-01-08', value: [150, 145, 140, 155], volume: 1700 },
  { date: '2024-01-09', value: [145, 160, 142, 165], volume: 1900 },
  { date: '2024-01-10', value: [160, 155, 150, 165], volume: 1800 },
])

// 股票数据示例
const stockData = ref([
  { date: '2024-01-01', value: [50.2, 52.5, 49.8, 53.0], volume: 1250000 },
  { date: '2024-01-02', value: [52.5, 51.0, 50.5, 53.2], volume: 1380000 },
  { date: '2024-01-03', value: [51.0, 54.2, 50.8, 54.5], volume: 1520000 },
  { date: '2024-01-04', value: [54.2, 53.5, 53.0, 54.8], volume: 1180000 },
  { date: '2024-01-05', value: [53.5, 56.0, 53.2, 56.5], volume: 1850000 },
  { date: '2024-01-06', value: [56.0, 55.5, 55.0, 56.8], volume: 1650000 },
  { date: '2024-01-07', value: [55.5, 58.2, 55.2, 58.5], volume: 2100000 },
  { date: '2024-01-08', value: [58.2, 57.5, 57.0, 58.8], volume: 1750000 },
  { date: '2024-01-09', value: [57.5, 60.0, 57.2, 60.5], volume: 1950000 },
  { date: '2024-01-10', value: [60.0, 59.5, 59.0, 60.8], volume: 1880000 },
  { date: '2024-01-11', value: [59.5, 62.2, 59.2, 62.5], volume: 2200000 },
  { date: '2024-01-12', value: [62.2, 61.5, 61.0, 62.8], volume: 1980000 },
  { date: '2024-01-13', value: [61.5, 64.0, 61.2, 64.5], volume: 2350000 },
  { date: '2024-01-14', value: [64.0, 63.5, 63.0, 64.8], volume: 2050000 },
  { date: '2024-01-15', value: [63.5, 66.2, 63.2, 66.5], volume: 2500000 },
])

// 自定义颜色数据
const customColorData = ref([
  { date: '2024-01-01', value: [100, 120, 95, 125], volume: 1000 },
  { date: '2024-01-02', value: [120, 110, 105, 125], volume: 1200 },
  { date: '2024-01-03', value: [110, 130, 108, 135], volume: 1500 },
  { date: '2024-01-04', value: [130, 125, 120, 135], volume: 1100 },
  { date: '2024-01-05', value: [125, 140, 122, 145], volume: 1800 },
])

// 无成交量数据
const noVolumeData = ref([
  { date: '2024-01-01', value: [100, 120, 95, 125] },
  { date: '2024-01-02', value: [120, 110, 105, 125] },
  { date: '2024-01-03', value: [110, 130, 108, 135] },
  { date: '2024-01-04', value: [130, 125, 120, 135] },
  { date: '2024-01-05', value: [125, 140, 122, 145] },
  { date: '2024-01-06', value: [140, 135, 130, 145] },
  { date: '2024-01-07', value: [135, 150, 132, 155] },
])
</script>

## 基础用法

基础的 K 线图用法，显示开盘价、收盘价、最低价、最高价。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartKLine
      :data="basicData"
      :show-volume="false"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="[
      { date: '2024-01-01', value: [100, 120, 95, 125] },
      { date: '2024-01-02', value: [120, 110, 105, 125] },
      { date: '2024-01-03', value: [110, 130, 108, 135] }
    ]"
    :show-volume="false"
  />
</template>

<script setup>
import { MChartKLine } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 带成交量

显示 K 线图和成交量柱状图，成交量颜色会根据涨跌自动匹配。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartKLine
      :data="basicData"
      :show-volume="true"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="[
      { date: '2024-01-01', value: [100, 120, 95, 125], volume: 1000 },
      { date: '2024-01-02', value: [120, 110, 105, 125], volume: 1200 },
      { date: '2024-01-03', value: [110, 130, 108, 135], volume: 1500 }
    ]"
    :show-volume="true"
  />
</template>

<script setup>
import { MChartKLine } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 股票数据示例

展示真实的股票数据，包含多天的 K 线图和成交量。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartKLine
      :data="stockData"
      :show-volume="true"
      :data-zoom="true"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="stockData"
    :show-volume="true"
    :data-zoom="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MChartKLine } from '@jqkgg/m-ui'

const stockData = ref([
  { date: '2024-01-01', value: [50.2, 52.5, 49.8, 53.0], volume: 1250000 },
  { date: '2024-01-02', value: [52.5, 51.0, 50.5, 53.2], volume: 1380000 },
  // ... 更多数据
])
</script>
```

</CodeBlock>

## 自定义颜色

可以自定义 K 线和成交量的颜色。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartKLine
      :data="customColorData"
      :show-volume="true"
      :k-line-colors="{
        upColor: '#FF6B6B',
        downColor: '#4ECDC4',
        borderColor: '#FF4757'
      }"
      :volume-colors="{
        upColor: '#FF6B6B',
        downColor: '#4ECDC4'
      }"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="data"
    :show-volume="true"
    :k-line-colors="{
      upColor: '#FF6B6B',
      downColor: '#4ECDC4',
      borderColor: '#FF4757'
    }"
    :volume-colors="{
      upColor: '#FF6B6B',
      downColor: '#4ECDC4'
    }"
  />
</template>

<script setup>
import { MChartKLine } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 数据缩放

启用数据缩放功能，可以通过滑块或鼠标滚轮缩放查看不同时间段的数据。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartKLine
      :data="stockData"
      :show-volume="true"
      :data-zoom="{
        type: 'slider',
        show: true,
        start: 0,
        end: 100
      }"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="data"
    :show-volume="true"
    :data-zoom="{
      type: 'slider',
      show: true,
      start: 0,
      end: 100
    }"
  />
</template>

<script setup>
import { MChartKLine } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 无成交量

不显示成交量，只显示 K 线图。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartKLine
      :data="noVolumeData"
      :show-volume="false"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="data"
    :show-volume="false"
  />
</template>

<script setup>
import { MChartKLine } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 自定义网格和坐标轴

可以自定义网格位置、坐标轴标签等配置。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartKLine
      :data="basicData"
      :show-volume="true"
      :grid="{
        left: '15%',
        right: '15%',
        top: '20%',
        bottom: '25%'
      }"
      :x-axis="{
        show: true,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      }"
      :y-axis="{
        show: true,
        name: '价格',
        nameLocation: 'middle'
      }"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartKLine
    :data="data"
    :show-volume="true"
    :grid="{
      left: '15%',
      right: '15%',
      top: '20%',
      bottom: '25%'
    }"
    :x-axis="{
      show: true,
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    }"
    :y-axis="{
      show: true,
      name: '价格',
      nameLocation: 'middle'
    }"
  />
</template>

<script setup>
import { MChartKLine } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | K线数据数组 | `ChartKLineDataItem[]` | `[]` |
| categories | X轴类别数据（可选，如果不提供则使用 data 中的 date） | `string[]` | `[]` |
| showVolume | 是否显示成交量 | `boolean` | `true` |
| showLegend | 是否显示图例 | `boolean` | `false` |
| legendPosition | 图例位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| height | 图表高度 | `number \| string` | `400` |
| width | 图表宽度 | `number \| string` | `'100%'` |
| backgroundColor | 背景颜色 | `string` | `'transparent'` |
| showGrid | 是否显示网格 | `boolean` | `true` |
| gridLineStyle | 网格线样式 | `object` | `{ color: 'rgba(0, 0, 0, 0.1)', width: 1, type: 'dashed' }` |
| showTooltip | 是否显示工具提示 | `boolean` | `true` |
| tooltipFormatter | 工具提示格式化函数 | `(params: any) => string` | `undefined` |
| yAxisMin | Y轴最小值 | `number` | `undefined` |
| yAxisMax | Y轴最大值 | `number` | `undefined` |
| yAxisSplitNumber | Y轴分割段数 | `number` | `5` |
| grid | 网格配置 | `object` | `{ left: '10%', right: '10%', top: '15%', bottom: '15%' }` |
| xAxis | X轴配置 | `object` | `{ show: true, axisLabel: { rotate: 0, interval: 'auto' } }` |
| yAxis | Y轴配置 | `object` | `{ show: true, name: '', nameLocation: 'end' }` |
| kLineColors | K线颜色配置 | `object` | `{ upColor: '#EC0000', downColor: '#00DA3C', borderColor: '#8A0000' }` |
| volumeColors | 成交量颜色配置 | `object` | `{ upColor: '#EC0000', downColor: '#00DA3C' }` |
| dataZoom | 是否启用数据缩放 | `boolean \| object` | `false` |
| animation | 是否启用动画 | `boolean` | `true` |
| animationDuration | 动画持续时间（毫秒） | `number` | `1000` |
| options | 完全自定义的 ECharts 配置项 | `any` | `undefined` |

### ChartKLineDataItem

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| date | 日期/时间（X轴标签） | `string` | 是 |
| value | K线数据 [开盘价, 收盘价, 最低价, 最高价] | `[number, number, number, number]` | 是 |
| volume | 成交量（可选，用于显示成交量柱状图） | `number` | 否 |

### 数据格式说明

K 线数据格式为 `[开盘价, 收盘价, 最低价, 最高价]`：

- **开盘价**：当天的开盘价格
- **收盘价**：当天的收盘价格
- **最低价**：当天的最低价格
- **最高价**：当天的最高价格

颜色规则：
- 当收盘价 >= 开盘价时，显示上涨颜色（默认红色）
- 当收盘价 < 开盘价时，显示下跌颜色（默认绿色）

### 注意事项

1. K 线图主要用于展示金融数据，如股票、期货等
2. 数据格式必须严格按照 `[开盘, 收盘, 最低, 最高]` 的顺序
3. 如果显示成交量，建议提供 `volume` 字段
4. 数据缩放功能适用于数据量较大的场景
5. 可以通过 `options` 属性传入完整的 ECharts 配置项进行深度自定义

