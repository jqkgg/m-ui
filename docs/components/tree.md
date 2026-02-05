# ChartTree 树形图

用于展示树形结构数据的组件，支持组织结构、目录结构、决策树等场景，支持展开/折叠、缩放、平移等交互。

<script setup>
import { ref } from 'vue'

// 基础树形图数据
const basicData = ref({
  name: '根节点',
  children: [
    { name: '子节点1' },
    { name: '子节点2', children: [{ name: '子节点2-1' }, { name: '子节点2-2' }] },
    { name: '子节点3' }
  ]
})

// 组织结构数据
const orgData = ref({
  name: 'CEO',
  children: [
    {
      name: '技术部',
      children: [
        { name: '前端组' },
        { name: '后端组' },
        { name: '测试组' }
      ]
    },
    {
      name: '产品部',
      children: [
        { name: '产品组' },
        { name: '设计组' }
      ]
    },
    {
      name: '运营部',
      children: [
        { name: '市场组' },
        { name: '运营组' }
      ]
    }
  ]
})

// 目录结构数据
const dirData = ref({
  name: '项目根目录',
  children: [
    {
      name: 'src',
      children: [
        { name: 'components', children: [{ name: 'Button.vue' }, { name: 'Input.vue' }] },
        { name: 'utils', children: [{ name: 'helper.js' }] },
        { name: 'App.vue' }
      ]
    },
    {
      name: 'public',
      children: [
        { name: 'index.html' }
      ]
    },
    { name: 'package.json' },
    { name: 'README.md' }
  ]
})

// 决策树数据
const decisionData = ref({
  name: '开始',
  children: [
    {
      name: '条件A',
      children: [
        { name: '结果A1' },
        { name: '结果A2' }
      ]
    },
    {
      name: '条件B',
      children: [
        { name: '结果B1' },
        { name: '结果B2', children: [{ name: '结果B2-1' }] }
      ]
    },
    {
      name: '条件C',
      children: [
        { name: '结果C1' }
      ]
    }
  ]
})

// 多层级数据
const deepData = ref({
  name: 'Level 1',
  children: [
    {
      name: 'Level 2-1',
      children: [
        {
          name: 'Level 3-1',
          children: [
            { name: 'Level 4-1' },
            { name: 'Level 4-2' }
          ]
        },
        { name: 'Level 3-2' }
      ]
    },
    {
      name: 'Level 2-2',
      children: [
        { name: 'Level 3-3' },
        { name: 'Level 3-4' }
      ]
    }
  ]
})

const layout = ref('orthogonal')
const orient = ref('LR')
const showLabel = ref(true)
const roam = ref(false)
</script>

## 基础用法

基础的树形图用法，展示简单的树形结构。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="basicData"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="{
      name: '根节点',
      children: [
        { name: '子节点1' },
        { name: '子节点2', children: [{ name: '子节点2-1' }, { name: '子节点2-2' }] },
        { name: '子节点3' }
      ]
    }"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 组织结构图

树形图非常适合展示组织结构，可以清晰地展示层级关系。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="orgData"
      layout="orthogonal"
      orient="TB"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="{
      name: 'CEO',
      children: [
        {
          name: '技术部',
          children: [
            { name: '前端组' },
            { name: '后端组' },
            { name: '测试组' }
          ]
        },
        {
          name: '产品部',
          children: [
            { name: '产品组' },
            { name: '设计组' }
          ]
        }
      ]
    }"
    layout="orthogonal"
    orient="TB"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 目录结构

树形图可以很好地展示文件目录结构。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="dirData"
      layout="orthogonal"
      orient="LR"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="{
      name: '项目根目录',
      children: [
        {
          name: 'src',
          children: [
            { name: 'components', children: [{ name: 'Button.vue' }, { name: 'Input.vue' }] },
            { name: 'utils', children: [{ name: 'helper.js' }] },
            { name: 'App.vue' }
          ]
        },
        { name: 'package.json' },
        { name: 'README.md' }
      ]
    }"
    layout="orthogonal"
    orient="LR"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 决策树

树形图可以用于展示决策流程和决策树。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="decisionData"
      layout="orthogonal"
      orient="TB"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="{
      name: '开始',
      children: [
        {
          name: '条件A',
          children: [
            { name: '结果A1' },
            { name: '结果A2' }
          ]
        },
        {
          name: '条件B',
          children: [
            { name: '结果B1' },
            { name: '结果B2' }
          ]
        }
      ]
    }"
    layout="orthogonal"
    orient="TB"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 布局方式

通过 `layout` 属性可以设置不同的布局方式，支持 `orthogonal`（正交布局）和 `radial`（径向布局）。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="basicData"
      :layout="layout"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-radio-group v-model="layout">
      <el-radio label="orthogonal">正交布局</el-radio>
      <el-radio label="radial">径向布局</el-radio>
    </el-radio-group>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 500px;">
      <MChartTree
        :data="data"
        :layout="layout"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-radio-group v-model="layout">
        <el-radio label="orthogonal">正交布局</el-radio>
        <el-radio label="radial">径向布局</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartTree } from '@jqkgg/m-ui'

const layout = ref('orthogonal')
</script>
```
</CodeBlock>

## 方向设置

通过 `orient` 属性可以设置树的方向（仅用于 orthogonal 布局），支持 `LR`（从左到右）、`RL`（从右到左）、`TB`（从上到下）、`BT`（从下到上）。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="basicData"
      layout="orthogonal"
      :orient="orient"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-radio-group v-model="orient">
      <el-radio label="LR">从左到右</el-radio>
      <el-radio label="RL">从右到左</el-radio>
      <el-radio label="TB">从上到下</el-radio>
      <el-radio label="BT">从下到上</el-radio>
    </el-radio-group>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 500px;">
      <MChartTree
        :data="data"
        layout="orthogonal"
        :orient="orient"
      />
    </div>
    <div style="margin-top: 16px;">
      <el-radio-group v-model="orient">
        <el-radio label="LR">从左到右</el-radio>
        <el-radio label="RL">从右到左</el-radio>
        <el-radio label="TB">从上到下</el-radio>
        <el-radio label="BT">从下到上</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChartTree } from '@jqkgg/m-ui'

const orient = ref('LR')
</script>
```
</CodeBlock>

## 缩放和平移

通过 `roam` 属性可以启用缩放和平移功能。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="deepData"
      :roam="roam"
    />
  </div>
  <div style="margin-top: 16px;">
    <el-checkbox v-model="roam">启用缩放和平移</el-checkbox>
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <div>
    <div style="width: 100%; height: 500px;">
      <MChartTree
        :data="data"
        :roam="true"
      />
    </div>
  </div>
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 展开和折叠

通过 `expand-and-collapse` 属性可以启用节点的展开/折叠功能，点击节点可以展开或折叠其子节点。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="deepData"
      :expand-and-collapse="true"
      :initial-tree-depth="2"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="data"
    :expand-and-collapse="true"
    :initial-tree-depth="2"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 初始展开层级

通过 `initial-tree-depth` 属性可以设置初始展开的层级，-1 表示全部展开。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="deepData"
      :initial-tree-depth="2"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="data"
    :initial-tree-depth="2"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义节点样式

每个节点可以单独设置样式，包括颜色、大小、符号类型等。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="{
        name: '根节点',
        itemStyle: { color: '#FF6B6B' },
        symbolSize: 10,
        children: [
          { name: '子节点1', itemStyle: { color: '#4ECDC4' }, symbolSize: 8 },
          { name: '子节点2', itemStyle: { color: '#95E1D3' }, symbolSize: 8 }
        ]
      }"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="{
      name: '根节点',
      itemStyle: { color: '#FF6B6B' },
      symbolSize: 10,
      children: [
        { name: '子节点1', itemStyle: { color: '#4ECDC4' }, symbolSize: 8 },
        { name: '子节点2', itemStyle: { color: '#95E1D3' }, symbolSize: 8 }
      ]
    }"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义边样式

通过 `edge-color`、`edge-width`、`edge-type` 属性可以自定义边的样式。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="basicData"
      edge-color="#FF6B6B"
      :edge-width="2"
      edge-type="curve"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="data"
    edge-color="#FF6B6B"
    :edge-width="2"
    edge-type="curve"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 径向布局

使用径向布局可以创建以根节点为中心的圆形树形图。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="orgData"
      layout="radial"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="{
      name: '根节点',
      children: [
        { name: '子节点1' },
        { name: '子节点2', children: [{ name: '子节点2-1' }] },
        { name: '子节点3' }
      ]
    }"
    layout="radial"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 隐藏标签

通过 `show-label` 属性可以隐藏节点标签。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
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
      <MChartTree
        :data="data"
        :show-label="true"
      />
    </div>
  </div>
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## 自定义标签位置

通过 `label-position` 属性可以设置标签的位置。

<Demo>
  <div style="width: 100%; height: 500px;">
    <MChartTree
      :data="basicData"
      label-position="left"
    />
  </div>
</Demo>

<CodeBlock>

```vue
<template>
  <MChartTree
    :data="data"
    label-position="left"
  />
</template>

<script setup>
import { MChartTree } from '@jqkgg/m-ui'
</script>
```
</CodeBlock>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 树形数据（根节点） | ChartTreeNode | — | `{ name: '根节点', children: [...] }` |
| layout | 布局方式 | string | orthogonal / radial | orthogonal |
| orient | 树的方向（仅用于 orthogonal 布局） | string | LR / RL / TB / BT | LR |
| showLabel | 是否显示标签 | boolean | — | true |
| labelFontSize | 标签字体大小 | number | — | 12 |
| labelColor | 标签颜色 | string | — | '#333' |
| labelPosition | 标签位置 | string | left / right / top / bottom | right |
| nodeSize | 节点大小 | number \| [number, number] | — | 7 |
| nodeColor | 节点默认颜色 | string | — | '#5470C6' |
| edgeColor | 边默认颜色 | string | — | '#91CC75' |
| edgeWidth | 边默认宽度 | number | — | 1.5 |
| edgeType | 边类型 | string | polyline / curve | curve |
| showEdgeLabel | 是否显示边的标签 | boolean | — | false |
| animation | 是否启用动画 | boolean | — | true |
| animationDuration | 动画持续时间（毫秒） | number | — | 1000 |
| roam | 是否启用缩放和平移 | boolean \| string | true / false / 'scale' / 'move' | false |
| expandAndCollapse | 是否启用节点展开/折叠 | boolean | — | true |
| initialTreeDepth | 初始展开层级（-1 表示全部展开） | number | — | -1 |
| height | 图表高度 | number \| string | — | '400px' |
| width | 图表宽度 | number \| string | — | '100%' |
| backgroundColor | 背景色 | string | — | transparent |
| showTooltip | 是否显示工具提示 | boolean | — | true |
| tooltipFormatter | 工具提示格式化函数 | function | — | undefined |
| leaves | 叶子节点配置 | object | — | undefined |
| options | 完全自定义的 ECharts 配置项，传入后将以 options 为准，忽略其他属性 | object | — | undefined |

### ChartTreeNode

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 节点名称 | string | — | — |
| value | 节点值（可选，用于控制节点大小） | number | — | — |
| children | 子节点数组 | ChartTreeNode[] | — | — |
| itemStyle | 节点样式（可选） | object | — | — |
| label | 节点标签配置（可选） | object | — | — |
| symbolSize | 节点符号大小（可选） | number \| [number, number] | — | — |
| symbol | 节点符号类型（可选） | string | circle / rect / roundRect / triangle / diamond / pin / arrow / none | — |
| collapsed | 节点是否折叠（可选） | boolean | — | — |

