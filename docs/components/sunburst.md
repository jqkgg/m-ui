# ChartSunburst 旭日图

用于展示层级数据的旭日图组件，通过多层级的环形图展示数据的层级关系，适合展示组织结构、目录结构、数据分类等场景。

<script setup>
import { ref } from 'vue'

// 基础旭日图数据
const basicData = ref([
  {
    name: '根节点',
    value: 1000,
    children: [
      { name: '子节点1', value: 400 },
      { name: '子节点2', value: 300, children: [{ name: '子节点2-1', value: 150 }, { name: '子节点2-2', value: 150 }] },
      { name: '子节点3', value: 300 }
    ]
  }
])

// 组织结构数据
const orgData = ref([
  {
    name: '公司',
    value: 1000,
    children: [
      {
        name: '技术部',
        value: 400,
        children: [
          { name: '前端组', value: 150 },
          { name: '后端组', value: 150 },
          { name: '测试组', value: 100 }
        ]
      },
      {
        name: '产品部',
        value: 300,
        children: [
          { name: '产品组', value: 150 },
          { name: '设计组', value: 150 }
        ]
      },
      {
        name: '运营部',
        value: 300,
        children: [
          { name: '市场组', value: 150 },
          { name: '运营组', value: 150 }
        ]
      }
    ]
  }
])

// 销售数据
const salesData = ref([
  {
    name: '总销售额',
    value: 10000,
    children: [
      {
        name: '华东区',
        value: 4000,
        children: [
          { name: '上海', value: 2000 },
          { name: '杭州', value: 1500 },
          { name: '南京', value: 500 }
        ]
      },
      {
        name: '华南区',
        value: 3500,
        children: [
          { name: '广州', value: 2000 },
          { name: '深圳', value: 1500 }
        ]
      },
      {
        name: '华北区',
        value: 2500,
        children: [
          { name: '北京', value: 1500 },
          { name: '天津', value: 1000 }
        ]
      }
    ]
  }
])

// 产品分类数据
const categoryData = ref([
  {
    name: '产品分类',
    value: 5000,
    children: [
      {
        name: '电子产品',
        value: 2000,
        children: [
          { name: '手机', value: 1000 },
          { name: '电脑', value: 800 },
          { name: '平板', value: 200 }
        ]
      },
      {
        name: '服装',
        value: 1500,
        children: [
          { name: '男装', value: 800 },
          { name: '女装', value: 700 }
        ]
      },
      {
        name: '食品',
        value: 1500,
        children: [
          { name: '零食', value: 800 },
          { name: '饮料', value: 700 }
        ]
      }
    ]
  }
])

const showLabel = ref(true)
const labelPosition = ref('inside')
const showLegend = ref(false)
</script>

## 基础用法

基础的旭日图用法，展示简单的层级数据。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="basicData"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="[
      {
        name: '根节点',
        value: 1000,
        children: [
          { name: '子节点1', value: 400 },
          { name: '子节点2', value: 300, children: [{ name: '子节点2-1', value: 150 }] },
          { name: '子节点3', value: 300 }
        ]
      }
    ]"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 组织结构

旭日图非常适合展示组织结构，可以清晰地展示层级关系和人员分布。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="orgData"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="[
      {
        name: '公司',
        value: 1000,
        children: [
          {
            name: '技术部',
            value: 400,
            children: [
              { name: '前端组', value: 150 },
              { name: '后端组', value: 150 },
              { name: '测试组', value: 100 }
            ]
          },
          {
            name: '产品部',
            value: 300,
            children: [
              { name: '产品组', value: 150 },
              { name: '设计组', value: 150 }
            ]
          }
        ]
      }
    ]"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 销售数据

旭日图可以用于展示销售数据的层级分布。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="salesData"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="[
      {
        name: '总销售额',
        value: 10000,
        children: [
          {
            name: '华东区',
            value: 4000,
            children: [
              { name: '上海', value: 2000 },
              { name: '杭州', value: 1500 },
              { name: '南京', value: 500 }
            ]
          },
          {
            name: '华南区',
            value: 3500,
            children: [
              { name: '广州', value: 2000 },
              { name: '深圳', value: 1500 }
            ]
          }
        ]
      }
    ]"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 产品分类

旭日图可以用于展示产品分类的层级结构。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="categoryData"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="[
      {
        name: '产品分类',
        value: 5000,
        children: [
          {
            name: '电子产品',
            value: 2000,
            children: [
              { name: '手机', value: 1000 },
              { name: '电脑', value: 800 },
              { name: '平板', value: 200 }
            ]
          },
          {
            name: '服装',
            value: 1500,
            children: [
              { name: '男装', value: 800 },
              { name: '女装', value: 700 }
            ]
          }
        ]
      }
    ]"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 标签位置

通过 `label-position` 属性可以设置标签的位置，支持 `inside`（内部）和 `outside`（外部）。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="basicData"
      :label-position="labelPosition"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-radio-group v-model="labelPosition">
      <el-radio label="inside">内部</el-radio>
      <el-radio label="outside">外部</el-radio>
    </el-radio-group>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 500px;">
      <MChartSunburst
        :data="data"
        :label-position="labelPosition"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-radio-group v-model="labelPosition">
        <el-radio label="inside">内部</el-radio>
        <el-radio label="outside">外部</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartSunburst } from '@jqkgg/m-ui'

const labelPosition = ref('inside')
</script>
```
</CodeBlock>

## 隐藏标签

通过 `show-label` 属性可以隐藏节点标签。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="basicData"
      :show-label="showLabel"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-checkbox v-model="showLabel">显示标签</el-checkbox>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 500px;">
      <MChartSunburst
        :data="data"
        :show-label="true"
      />
    </div>
  </div>
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义节点颜色

每个节点可以单独设置颜色。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="[
        {
          name: '根节点',
          value: 1000,
          itemStyle: { color: '#FF6B6B' },
          children: [
            { name: '子节点1', value: 400, itemStyle: { color: '#4ECDC4' } },
            { name: '子节点2', value: 300, itemStyle: { color: '#95E1D3' } },
            { name: '子节点3', value: 300, itemStyle: { color: '#F38181' } }
          ]
        }
      ]"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="[
      {
        name: '根节点',
        value: 1000,
        itemStyle: { color: '#FF6B6B' },
        children: [
          { name: '子节点1', value: 400, itemStyle: { color: '#4ECDC4' } },
          { name: '子节点2', value: 300, itemStyle: { color: '#95E1D3' } },
          { name: '子节点3', value: 300, itemStyle: { color: '#F38181' } }
        ]
      }
    ]"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义中心位置和半径

通过 `center` 和 `radius` 属性可以自定义旭日图的中心位置和半径范围。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="basicData"
      center="['50%', '50%']"
      :radius="[0, '60%']"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="data"
    center="['50%', '50%']"
    :radius="[0, '60%']"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 初始展开层级

通过 `initial-tree-depth` 属性可以设置初始展开的层级，-1 表示全部展开。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="orgData"
      :initial-tree-depth="2"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="data"
    :initial-tree-depth="2"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 节点点击行为

通过 `node-click` 属性可以设置节点点击的行为，支持 `rootToNode`（点击后以该节点为根）、`link`（跳转到该节点）等。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="orgData"
      node-click="rootToNode"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="data"
    node-click="rootToNode"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 高亮模式

通过 `emphasis` 属性可以设置高亮模式，支持 `ancestor`（高亮祖先节点）、`descendant`（高亮后代节点）、`self`（高亮自身）等。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="orgData"
      :emphasis="{ focus: 'ancestor' }"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="data"
    :emphasis="{ focus: 'ancestor' }"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 显示图例

通过 `show-legend` 属性可以显示图例。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="orgData"
      :show-legend="showLegend"
      legend-position="top"
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
    <div style="width: 100%; height: 500px;">
      <MChartSunburst
        :data="data"
        :show-legend="true"
        legend-position="top"
      />
    </div>
  </div>
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 多层级数据

旭日图可以展示多层级的数据结构。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartSunburst
      :data="[
        {
          name: 'Level 1',
          value: 1000,
          children: [
            {
              name: 'Level 2-1',
              value: 500,
              children: [
                {
                  name: 'Level 3-1',
                  value: 300,
                  children: [
                    { name: 'Level 4-1', value: 150 },
                    { name: 'Level 4-2', value: 150 }
                  ]
                },
                { name: 'Level 3-2', value: 200 }
              ]
            },
            {
              name: 'Level 2-2',
              value: 500,
              children: [
                { name: 'Level 3-3', value: 300 },
                { name: 'Level 3-4', value: 200 }
              ]
            }
          ]
        }
      ]"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartSunburst
    :data="[
      {
        name: 'Level 1',
        value: 1000,
        children: [
          {
            name: 'Level 2-1',
            value: 500,
            children: [
              {
                name: 'Level 3-1',
                value: 300,
                children: [
                  { name: 'Level 4-1', value: 150 },
                  { name: 'Level 4-2', value: 150 }
                ]
              }
            ]
          }
        ]
      }
    ]"
  />
</template>

<script setup>
import { MChartSunburst } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 旭日图数据（根节点数组） | ChartSunburstNode[] | — | `[{ name: '根节点', value: 1000, children: [...] }]` |
| showLabel | 是否显示标签 | boolean | — | true |
| labelFontSize | 标签字体大小 | number | — | 12 |
| labelColor | 标签颜色 | string | — | '#333' |
| labelPosition | 标签位置 | string | inside / outside | inside |
| nodeColor | 节点默认颜色 | string | — | '#5470C6' |
| animation | 是否启用动画 | boolean | — | true |
| animationDuration | 动画持续时间（毫秒） | number | — | 1000 |
| roam | 是否启用缩放和平移 | boolean \| string | true / false / 'scale' / 'move' | false |
| nodeClick | 节点点击行为 | boolean \| string | true / false / 'rootToNode' / 'link' | rootToNode |
| initialTreeDepth | 初始展开层级（-1 表示全部展开） | number | — | -1 |
| center | 中心位置 [x, y] | [string \| number, string \| number] | — | ['50%', '50%'] |
| radius | 半径 [内半径, 外半径] | [string \| number, string \| number] | — | [0, '75%'] |
| height | 图表高度 | number \| string | — | '400px' |
| width | 图表宽度 | number \| string | — | '100%' |
| backgroundColor | 背景色 | string | — | transparent |
| showTooltip | 是否显示工具提示 | boolean | — | true |
| tooltipFormatter | 工具提示格式化函数 | function | — | undefined |
| showLegend | 是否显示图例 | boolean | — | false |
| legendPosition | 图例位置 | string | top / bottom / left / right | top |
| emphasis | 高亮配置 | object | — | `{ focus: 'ancestor' }` |
| options | 完全自定义的 ECharts 配置项，传入后将以 options 为准，忽略其他属性 | object | — | undefined |

### ChartSunburstNode

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 节点名称 | string | — | — |
| value | 节点值（可选，用于控制扇形大小） | number | — | — |
| children | 子节点数组 | ChartSunburstNode[] | — | — |
| itemStyle | 节点样式（可选） | object | — | — |
| label | 节点标签配置（可选） | object | — | — |
| collapsed | 节点是否折叠（可选） | boolean | — | — |

