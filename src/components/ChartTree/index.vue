<template>
  <div
    ref="chartContainer"
    class="m-chart-tree"
    :style="{ width: computedWidth, height: computedHeight, backgroundColor: backgroundColor }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import type { TreeSeriesOption } from "echarts";
import { useResizeObserver } from "@vueuse/core";
import type { ChartTreeProps, ChartTreeNode } from "./types";

defineOptions({
  name: "MChartTree",
});

const props = withDefaults(defineProps<ChartTreeProps>(), {
  data: () => ({
    name: "根节点",
    children: [
      { name: "子节点1" },
      { name: "子节点2", children: [{ name: "子节点2-1" }, { name: "子节点2-2" }] },
      { name: "子节点3" },
    ],
  }),
  layout: "orthogonal",
  orient: "LR",
  showLabel: true,
  labelFontSize: 12,
  labelColor: "#333",
  labelPosition: "right",
  nodeSize: 7,
  nodeColor: "#5470C6",
  edgeColor: "#91CC75",
  edgeWidth: 1.5,
  edgeType: "curve",
  showEdgeLabel: false,
  animation: true,
  animationDuration: 1000,
  roam: false,
  expandAndCollapse: true,
  initialTreeDepth: -1,
  height: "400px",
  width: "100%",
  backgroundColor: "transparent",
  showTooltip: true,
  tooltipFormatter: undefined,
});

const chartContainer = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 计算图表实际宽度
const computedWidth = computed(() => {
  if (typeof props.width === "number") {
    return `${props.width}px`;
  }
  return props.width;
});

// 计算图表实际高度
const computedHeight = computed(() => {
  if (typeof props.height === "number") {
    return `${props.height}px`;
  }
  return props.height;
});

// 递归处理树形数据
const processTreeData = (node: ChartTreeNode): any => {
  const result: any = {
    name: node.name,
    value: node.value,
    itemStyle: node.itemStyle || {
      color: props.nodeColor,
    },
    label: node.label !== undefined
      ? node.label
      : {
          show: props.showLabel,
          fontSize: props.labelFontSize,
          color: props.labelColor,
          position: props.labelPosition,
        },
    symbolSize: node.symbolSize || props.nodeSize,
    symbol: node.symbol,
    collapsed: node.collapsed,
  };

  // 复制其他自定义属性
  Object.keys(node).forEach((key) => {
    if (!["name", "value", "children", "itemStyle", "label", "symbolSize", "symbol", "collapsed"].includes(key)) {
      result[key] = node[key];
    }
  });

  // 处理子节点
  if (node.children && node.children.length > 0) {
    result.children = node.children.map((child) => processTreeData(child));
  }

  return result;
};

// 构建 ECharts 配置
const buildOption = (): echarts.EChartsOption => {
  // 如果传入了 options，直接使用 options
  if (props.options) {
    return props.options;
  }

  const treeData = props.data ? processTreeData(props.data) : null;

  if (!treeData) {
    return {};
  }

  const option: echarts.EChartsOption = {
    backgroundColor: props.backgroundColor,
    tooltip: props.showTooltip
      ? {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: props.tooltipFormatter || ((params: any) => {
            return params.name;
          }),
        }
      : {
          show: false,
        },
    series: [
      {
        type: "tree",
        data: [treeData],
        layout: props.layout,
        orient: props.orient,
        symbol: "emptyCircle",
        symbolSize: props.nodeSize,
        roam: props.roam,
        expandAndCollapse: props.expandAndCollapse,
        initialTreeDepth: props.initialTreeDepth,
        label: {
          show: props.showLabel,
          fontSize: props.labelFontSize,
          color: props.labelColor,
          position: props.labelPosition,
        },
        leaves: props.leaves || {
          label: {
            show: props.showLabel,
            position: props.labelPosition,
          },
        },
        lineStyle: {
          color: props.edgeColor,
          width: props.edgeWidth,
          curveness: props.edgeType === "curve" ? 0.5 : 0,
        },
        emphasis: {
          focus: "descendant",
        },
        animation: props.animation,
        animationDuration: props.animationDuration,
        animationEasing: "cubicOut",
      } as TreeSeriesOption,
    ],
  };

  return option;
};

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) {
    console.warn("ChartTree: chartContainer is not available");
    return;
  }

  try {
    // 如果已经存在实例，先销毁
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }

    chartInstance = echarts.init(chartContainer.value);
    const option = buildOption();
    chartInstance.setOption(option);
  } catch (error) {
    console.error("ChartTree initialization error:", error);
  }
};

// 更新图表
const updateChart = () => {
  if (!chartInstance) {
    // 如果实例不存在，尝试重新初始化
    initChart();
    return;
  }
  try {
    const option = buildOption();
    chartInstance.setOption(option, true);
  } catch (error) {
    console.error("ChartTree update error:", error);
  }
};

// 响应式调整
useResizeObserver(chartContainer, () => {
  if (chartInstance) {
    chartInstance.resize();
  }
});

// 监听尺寸变化
watch(
  () => [props.width, props.height],
  () => {
    if (chartInstance) {
      setTimeout(() => {
        chartInstance?.resize();
      }, 100);
    }
  }
);

onMounted(() => {
  // 使用 nextTick 确保 DOM 已经渲染完成
  nextTick(() => {
    initChart();
  });
});

// 监听数据变化
watch(
  () => [
    props.data,
    props.layout,
    props.orient,
    props.showLabel,
    props.labelFontSize,
    props.labelColor,
    props.labelPosition,
    props.nodeSize,
    props.nodeColor,
    props.edgeColor,
    props.edgeWidth,
    props.edgeType,
    props.showEdgeLabel,
    props.animation,
    props.animationDuration,
    props.roam,
    props.expandAndCollapse,
    props.initialTreeDepth,
    props.backgroundColor,
    props.showTooltip,
    props.tooltipFormatter,
    props.leaves,
    props.options,
  ],
  () => {
    updateChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  // 清理图表实例
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style lang="scss" scoped>
.m-chart-tree {
  @apply w-full h-full;
}
</style>

