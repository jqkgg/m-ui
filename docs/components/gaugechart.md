# ChartGauge 仪表盘

仪表盘组件，用于展示单项指标数据的进度或状态。

<script setup>
import { ref } from 'vue'
import { MChartGauge } from '@jqkgg/m-ui'

const value1 = ref(60)

const value2 = ref(85)
const colors2 = ref([[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']])

const value3 = ref(45)

const customOptions = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '75%'],
      radius: '90%',
      min: 0,
      max: 1,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.25, '#FF6E76'],
            [0.5, '#FDDD60'],
            [0.75, '#58D9F9'],
            [1, '#7CFFB2']
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'auto',
          width: 5
        }
      },
      axisLabel: {
        color: '#464646',
        fontSize: 20,
        distance: -60,
        rotate: 'tangential',
        formatter: function (value) {
          if (value === 0.875) {
            return 'Grade A';
          } else if (value === 0.625) {
            return 'Grade B';
          } else if (value === 0.375) {
            return 'Grade C';
          } else if (value === 0.125) {
            return 'Grade D';
          }
          return '';
        }
      },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 20
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '-35%'],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value * 100) + '';
        },
        color: 'inherit'
      },
      data: [
        {
          value: 0.7,
          name: 'Grade Rating'
        }
      ]
    }
  ]
})
</script>

## 基础用法

基础的仪表盘用法。

<Demo>
  <div style="width: 100%;">
    <MChartGauge :value="value1" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartGauge :value="60" />
</template>

<script setup>
import { MChartGauge } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义颜色和范围

支持自定义颜色段和数值范围。

<Demo>
  <div style="width: 100%;">
    <MChartGauge
      :value="value2"
      :min="0"
      :max="200"
      name="速度"
      unit="km/h"
      :colors="colors2"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartGauge
    :value="85"
    :min="0"
    :max="200"
    name="速度"
    unit="km/h"
    :colors="[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]"
  />
</template>

<script setup>
import { MChartGauge } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 调整尺寸

通过 `width` 和 `height` 属性调整图表尺寸。

<Demo>
  <div style="width: 100%;">
    <MChartGauge :value="value3" width="300px" height="300px" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartGauge :value="45" width="300px" height="300px" />
</template>

<script setup>
import { MChartGauge } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 完全自定义配置

通过 `options` 属性可以完全自定义 ECharts 配置项，实现更复杂的效果。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartGauge :options="customOptions" height="500px" />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartGauge :options="customOptions" height="500px" />
</template>

<script setup>
import { ref } from 'vue'
import { MChartGauge } from '@jqkgg/m-ui'

const customOptions = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '75%'],
      radius: '90%',
      min: 0,
      max: 1,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.25, '#FF6E76'],
            [0.5, '#FDDD60'],
            [0.75, '#58D9F9'],
            [1, '#7CFFB2']
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'auto',
          width: 5
        }
      },
      axisLabel: {
        color: '#464646',
        fontSize: 20,
        distance: -60,
        rotate: 'tangential',
        formatter: function (value) {
          if (value === 0.875) {
            return 'Grade A';
          } else if (value === 0.625) {
            return 'Grade B';
          } else if (value === 0.375) {
            return 'Grade C';
          } else if (value === 0.125) {
            return 'Grade D';
          }
          return '';
        }
      },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 20
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '-35%'],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value * 100) + '';
        },
        color: 'inherit'
      },
      data: [
        {
          value: 0.7,
          name: 'Grade Rating'
        }
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
| value | 当前值 | `number` | — | `0` |
| min | 最小值 | `number` | — | `0` |
| max | 最大值 | `number` | — | `100` |
| name | 仪表盘名称 | `string` | — | `'仪表盘'` |
| unit | 单位 | `string` | — | `'%'` |
| colors | 颜色配置 | `Array<[number, string]>` | — | `[[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']]` |
| height | 图表高度 | `number` \| `string` | — | `400px` |
| width | 图表宽度 | `number` \| `string` | — | `100%` |
| options | 自定义配置 | `any` | — | `undefined` |

### Types

#### ChartGaugeProps

```ts
interface ChartGaugeProps {
  value?: number
  min?: number
  max?: number
  name?: string
  unit?: string
  colors?: Array<[number, string]>
  height?: number | string
  width?: number | string
  options?: any
}
```
