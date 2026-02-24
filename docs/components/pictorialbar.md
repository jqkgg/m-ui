# ChartPictorialBar 锥形柱状图

用于展示数据的锥形柱状图组件，使用平滑的钟形曲线形状，支持自定义颜色、形状等配置。

<script setup>
import { ref } from 'vue'

// 基础数据
const basicData = ref([
  { name: '系列1', data: [20, 30, 10, 10, 30] }
])

const basicCategories = ref(['运行', '空闲', '停机', '待机', '空运行'])

// 自定义颜色数据
const customColorData = ref([
  { 
    name: '系列1', 
    data: [20, 30, 10, 10, 30],
    color: 'rgba(76, 175, 80, 0.8)'
  }
])

// 多个系列数据
const multiSeriesData = ref([
  { name: '系列1', data: [20, 30, 10, 10, 30] },
  { name: '系列2', data: [15, 25, 15, 15, 25] }
])

// 不同颜色配置
const colors1 = ref([
  'rgba(76, 175, 80, 0.8)',   // 绿色
  'rgba(33, 150, 243, 0.8)',  // 蓝色
  'rgba(158, 158, 158, 0.8)', // 灰色
  'rgba(255, 193, 7, 0.8)',   // 黄色
  'rgba(255, 152, 0, 0.8)'    // 橙色
])

// 自定义形状数据
const customShapeData = ref([
  { 
    name: '系列1', 
    data: [20, 30, 10, 10, 30],
    symbol: 'roundRect',
    symbolSize: [60, 100]
  }
])
</script>

## 基础用法

基础的锥形柱状图用法，使用平滑的钟形曲线形状。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="basicData"
      :categories="basicCategories"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="[
      { name: '系列1', data: [20, 30, 10, 10, 30] }
    ]"
    :categories="['运行', '空闲', '停机', '待机', '空运行']"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 自定义颜色

可以自定义每个系列的颜色。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="customColorData"
      :categories="basicCategories"
      :colors="colors1"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="[
      { 
        name: '系列1', 
        data: [20, 30, 10, 10, 30],
        color: 'rgba(76, 175, 80, 0.8)'
      }
    ]"
    :categories="['运行', '空闲', '停机', '待机', '空运行']"
    :colors="[
      'rgba(76, 175, 80, 0.8)',
      'rgba(33, 150, 243, 0.8)',
      'rgba(158, 158, 158, 0.8)',
      'rgba(255, 193, 7, 0.8)',
      'rgba(255, 152, 0, 0.8)'
    ]"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 多个系列

支持显示多个系列的数据。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="multiSeriesData"
      :categories="basicCategories"
      :show-legend="true"
      legend-position="top"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="[
      { name: '系列1', data: [20, 30, 10, 10, 30] },
      { name: '系列2', data: [15, 25, 15, 15, 25] }
    ]"
    :categories="['运行', '空闲', '停机', '待机', '空运行']"
    :show-legend="true"
    legend-position="top"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 自定义形状

可以自定义柱子的形状，支持多种内置形状或自定义 SVG 路径。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="customShapeData"
      :categories="basicCategories"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="[
      { 
        name: '系列1', 
        data: [20, 30, 10, 10, 30],
        symbol: 'roundRect',
        symbolSize: [60, 100]
      }
    ]"
    :categories="['运行', '空闲', '停机', '待机', '空运行']"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 自定义背景

可以自定义图表的背景颜色。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="basicData"
      :categories="basicCategories"
      background-color="rgba(173, 216, 230, 0.3)"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="series"
    :categories="categories"
    background-color="rgba(173, 216, 230, 0.3)"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 隐藏标签

可以隐藏数据标签。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="basicData"
      :categories="basicCategories"
      :show-label="false"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="series"
    :categories="categories"
    :show-label="false"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 自定义网格和坐标轴

可以自定义网格位置、坐标轴标签等配置。

<Demo>
  <div style="width: 100%; height: 400px;">
    <MChartPictorialBar
      :series="basicData"
      :categories="basicCategories"
      :grid="{
        left: '15%',
        right: '15%',
        top: '20%',
        bottom: '20%'
      }"
      :x-axis="{
        show: true,
        axisLabel: {
          rotate: 0,
          interval: 0
        }
      }"
      :y-axis="{
        show: true,
        name: '百分比',
        nameLocation: 'middle'
      }"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar
    :series="series"
    :categories="categories"
    :grid="{
      left: '15%',
      right: '15%',
      top: '20%',
      bottom: '20%'
    }"
    :x-axis="{
      show: true,
      axisLabel: {
        rotate: 0,
        interval: 0
      }
    }"
    :y-axis="{
      show: true,
      name: '百分比',
      nameLocation: 'middle'
    }"
  />
</template>

<script setup>
import { MChartPictorialBar } from '@jqkgg/m-ui'
</script>
```

</CodeBlock>

## 电池进度条

通过 `options` 属性实现电池进度条效果。

<Demo>
  <div style="width: 100%; height: 500px; background-color: #0f375f;">
    <MChartPictorialBar
      :options="{
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: '{b}: {c}%'
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: ['指标1', '指标2', '指标3', '指标4']
        }],
        series: [
          {
            name: '进度',
            type: 'pictorialBar',
            symbol: 'rect',
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: [10, 20],
            symbolBoundingData: 100,
            data: [27.6, 65.9, 23, 85.8],
            markLine: {
              symbol: 'none',
              label: {
                formatter: '{c}%',
                position: 'start'
              },
              lineStyle: {
                color: 'pink',
                type: 'dotted',
                opacity: 0.2,
                width: 2
              },
              data: [
                {
                  type: 'max'
                }
              ]
            },
            z: 10,
            itemStyle: {
              normal: {
                color: '#00b5f6'
              }
            },
            label: {
              show: true,
              position: 'right',
              offset: [10, 0],
              formatter: '{c}%',
              color: '#fff',
              fontSize: 14
            }
          },
          {
            name: '背景',
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: '#1a4b77',
                opacity: 0.2
              }
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbol: 'rect',
            symbolSize: [10, 20],
            symbolBoundingData: 100,
            data: [100, 100, 100, 100],
            z: 5
          }
        ]
      }"
      height="500px"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar :options="options" height="500px" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartPictorialBar } from '@jqkgg/m-ui'

const options = ref({
  backgroundColor: '#0f375f',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'none' },
    formatter: '{b}: {c}%'
  },
  grid: {
    left: '5%',
    right: '5%',
    top: '5%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: { show: false, type: 'value' },
  yAxis: [{
    type: 'category',
    inverse: true,
    axisLabel: { show: true, textStyle: { color: '#fff' } },
    splitLine: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
    data: ['指标1', '指标2', '指标3', '指标4']
  }],
  series: [
    {
      name: '进度',
      type: 'pictorialBar',
      symbol: 'rect',
      symbolRepeat: 'fixed',
      symbolMargin: '5%',
      symbolClip: true,
      symbolSize: [10, 20],
      symbolBoundingData: 100,
      data: [27.6, 65.9, 23, 85.8],
      z: 10,
      itemStyle: { normal: { color: '#00b5f6' } },
      label: {
        show: true,
        position: 'right',
        offset: [10, 0],
        formatter: '{c}%',
        color: '#fff',
        fontSize: 14
      }
    },
    {
      name: '背景',
      type: 'pictorialBar',
      itemStyle: { normal: { color: '#1a4b77', opacity: 0.2 } },
      animationDuration: 0,
      symbolRepeat: 'fixed',
      symbolMargin: '5%',
      symbol: 'rect',
      symbolSize: [10, 20],
      symbolBoundingData: 100,
      data: [100, 100, 100, 100],
      z: 5
    }
  ]
})
</script>
```

</CodeBlock>

## 3D立体柱状图

通过 `pictorialBar` 实现 3D 立体效果。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartPictorialBar
      :options="{
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'none' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: '#e54035' }
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: '柱底部',
            type: 'pictorialBar',
            symbolSize: [26, 10],
            symbolOffset: [0, 5],
            z: 12,
            itemStyle: {
              normal: {
                color: '#14b1eb'
              }
            },
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          },
          {
            name: '柱下半部',
            type: 'bar',
            barWidth: 26,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#14b1eb',
                opacity: 0.7
              }
            },
            data: [60, 70, 80, 90, 60, 70, 80, 90, 10, 20, 30, 40]
          },
          {
            name: '柱顶部',
            type: 'pictorialBar',
            symbolSize: [26, 10],
            symbolOffset: [0, -5],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: '#14b1eb'
              }
            },
            data: [60, 70, 80, 90, 60, 70, 80, 90, 10, 20, 30, 40]
          },
          {
            name: '顶部数值',
            type: 'pictorialBar',
            symbolSize: [26, 10],
            symbolOffset: [0, -5],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#fff',
              formatter: '{c}%'
            },
            data: [60, 70, 80, 90, 60, 70, 80, 90, 10, 20, 30, 40]
          },
          {
            name: '目标值',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#ff3b3b',
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            markLine: {
              symbol: ['none', 'arrow'],
              label: {
                formatter: '目标值\n{c}%',
                position: 'end'
              },
              data: [
                {
                  yAxis: 80
                }
              ]
            }
          }
        ]
      }"
      height="500px"
      background-color="#0e2147"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar :options="options" height="500px" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartPictorialBar } from '@jqkgg/m-ui'

const options = ref({
  backgroundColor: '#0e2147',
  tooltip: { trigger: 'axis', axisPointer: { type: 'none' } },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: '#e54035' }
  },
  yAxis: { show: false },
  series: [
    {
      name: '柱底部',
      type: 'pictorialBar',
      symbolSize: [26, 10],
      symbolOffset: [0, 5],
      z: 12,
      itemStyle: { normal: { color: '#14b1eb' } },
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: '柱下半部',
      type: 'bar',
      barWidth: 26,
      barGap: '-100%',
      itemStyle: { normal: { color: '#14b1eb', opacity: 0.7 } },
      data: [60, 70, 80, 90, 60, 70, 80, 90, 10, 20, 30, 40]
    },
    {
      name: '柱顶部',
      type: 'pictorialBar',
      symbolSize: [26, 10],
      symbolOffset: [0, -5],
      z: 12,
      symbolPosition: 'end',
      itemStyle: { normal: { color: '#14b1eb' } },
      data: [60, 70, 80, 90, 60, 70, 80, 90, 10, 20, 30, 40]
    },
    {
      name: '顶部数值',
      type: 'pictorialBar',
      symbolSize: [26, 10],
      symbolOffset: [0, -5],
      z: 12,
      symbolPosition: 'end',
      itemStyle: { normal: { color: 'transparent' } },
      label: { show: true, position: 'top', fontSize: 14, color: '#fff', formatter: '{c}%' },
      data: [60, 70, 80, 90, 60, 70, 80, 90, 10, 20, 30, 40]
    },
    {
      name: '目标值',
      type: 'line',
      symbol: 'none',
      itemStyle: { normal: { color: '#ff3b3b', lineStyle: { type: 'dashed' } } },
      markLine: {
        symbol: ['none', 'arrow'],
        label: { formatter: '目标值\n{c}%', position: 'end' },
        data: [{ yAxis: 80 }]
      }
    }
  ]
})
</script>
```

</CodeBlock>

## 立体堆叠柱状图

实现立体堆叠柱状图效果。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartPictorialBar
      :options="{
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['新增用户数量', '邀请新用户数量'],
          textStyle: { color: '#666' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: { lineStyle: { color: '#ccc' } },
          axisLabel: { color: '#666' }
        },
        yAxis: {
          splitLine: { lineStyle: { color: '#eee' } },
          axisLine: { show: false },
          axisLabel: { color: '#666' }
        },
        series: [
          // 底部
          {
            z: 1,
            name: '新增用户数量',
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: [320, 302, 120, 100, 540, 123, 350, 666, 333, 123, 213, 100],
            symbol: 'diamond',
            symbolOffset: ['-50%', '-50%'],
            symbolSize: [26, 15],
            itemStyle: {
              color: '#00d0ff'
            }
          },
          {
            z: 1,
            type: 'bar',
            name: '新增用户数量',
            barWidth: 26,
            data: [320, 302, 120, 100, 540, 123, 350, 666, 333, 123, 213, 100],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#00d0ff' },
                  { offset: 1, color: '#00acff' }
                ]
              }
            }
          },
          {
            z: 1,
            name: '新增用户数量',
            type: 'pictorialBar',
            symbolPosition: 'start',
            data: [320, 302, 120, 100, 540, 123, 350, 666, 333, 123, 213, 100],
            symbol: 'diamond',
            symbolOffset: ['-50%', '50%'],
            symbolSize: [26, 15],
            itemStyle: {
              color: '#00acff'
            }
          },
          // 顶部
          {
            z: 2,
            name: '邀请新用户数量',
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: [120, 102, 90, 150, 120, 123, 140, 166, 133, 177, 113, 200],
            symbol: 'diamond',
            symbolOffset: ['50%', '-50%'],
            symbolSize: [26, 15],
            itemStyle: {
              color: '#ffaa80'
            }
          },
          {
            z: 2,
            type: 'bar',
            name: '邀请新用户数量',
            barWidth: 26,
            data: [120, 102, 90, 150, 120, 123, 140, 166, 133, 177, 113, 200],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#ff8880' },
                  { offset: 1, color: '#ffaa80' }
                ]
              }
            },
            barGap: 0
          },
          {
            z: 2,
            name: '邀请新用户数量',
            type: 'pictorialBar',
            symbolPosition: 'start',
            data: [120, 102, 90, 150, 120, 123, 140, 166, 133, 177, 113, 200],
            symbol: 'diamond',
            symbolOffset: ['50%', '50%'],
            symbolSize: [26, 15],
            itemStyle: {
              color: '#ff8880'
            }
          }
        ]
      }"
      height="500px"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartPictorialBar :options="options" height="500px" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartPictorialBar } from '@jqkgg/m-ui'

const options = ref({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['新增用户数量', '邀请新用户数量'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {},
  series: [
    // ... 省略具体配置，参考上方 Demo
  ]
})
</script>
```

</CodeBlock>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| series | 系列数据数组 | `ChartPictorialBarSeries[]` | `[]` |
| categories | X轴类别数据 | `string[]` | `[]` |
| colors | 颜色数组 | `string[]` | `[]` |
| showLegend | 是否显示图例 | `boolean` | `false` |
| legendPosition | 图例位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| height | 图表高度 | `number \| string` | `400` |
| width | 图表宽度 | `number \| string` | `'100%'` |
| backgroundColor | 背景颜色 | `string` | `'rgba(173, 216, 230, 0.3)'` |
| showGrid | 是否显示网格 | `boolean` | `true` |
| gridLineStyle | 网格线样式 | `object` | `{ color: 'rgba(0, 0, 0, 0.1)', width: 1, type: 'dashed' }` |
| showTooltip | 是否显示工具提示 | `boolean` | `true` |
| tooltipFormatter | 工具提示格式化函数 | `(params: any) => string` | `undefined` |
| showLabel | 是否显示数据标签 | `boolean` | `true` |
| yAxisMin | Y轴最小值 | `number` | `0` |
| yAxisMax | Y轴最大值 | `number` | `undefined` |
| yAxisSplitNumber | Y轴分割段数 | `number` | `6` |
| grid | 网格配置 | `object` | `{ left: '10%', right: '10%', top: '15%', bottom: '15%' }` |
| xAxis | X轴配置 | `object` | `{ show: true, axisLabel: { rotate: 0, interval: 'auto' } }` |
| yAxis | Y轴配置 | `object` | `{ show: true, name: '', nameLocation: 'end' }` |
| barGap | 柱子间距 | `number` | `0` |
| barCategoryGap | 同一类别柱子间距 | `number \| string` | `'20%'` |
| animation | 是否启用动画 | `boolean` | `true` |
| animationDuration | 动画持续时间（毫秒） | `number` | `1000` |
| options | 完全自定义的 ECharts 配置项 | `any` | `undefined` |

### ChartPictorialBarSeries

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| name | 系列名称 | `string` | 是 |
| data | 数据数组 | `number[]` | 是 |
| color | 自定义颜色 | `string` | 否 |
| symbol | 形状类型 | `string` | 否 |
| symbolSize | 形状大小 | `number \| [number, number]` | 否 |
| symbolPosition | 形状位置 | `'start' \| 'end' \| 'center'` | 否 |
| symbolRotate | 形状旋转角度 | `number` | 否 |
| symbolOffset | 形状偏移 | `[number, number]` | 否 |
| symbolPath | 自定义 SVG 路径 | `string` | 否 |

### 形状类型

支持的形状类型包括：
- `'rect'` - 矩形
- `'roundRect'` - 圆角矩形
- `'triangle'` - 三角形
- `'diamond'` - 菱形
- `'pin'` - 大头针
- `'arrow'` - 箭头
- `'circle'` - 圆形
- `'path://'` - 自定义 SVG 路径（默认，用于锥形）

### 注意事项

1. 锥形柱状图使用 ECharts 的 `pictorialBar` 类型实现
2. 默认使用平滑的钟形曲线路径（通过 SVG 路径实现）
3. 可以通过 `symbolPath` 自定义 SVG 路径来创建不同的形状
4. 数据标签默认显示在柱子顶部，格式为 `值%`
5. 可以通过 `options` 属性传入完整的 ECharts 配置项进行深度自定义

