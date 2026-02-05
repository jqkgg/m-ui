<template>
  <div
    ref="chartContainer"
    class="m-chart-sunburst"
    :style="{ width: computedWidth, height: computedHeight, backgroundColor: backgroundColor }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import type { SunburstSeriesOption } from "echarts";
import { useResizeObserver } from "@vueuse/core";
import type { ChartSunburstProps, ChartSunburstNode } from "./types";

defineOptions({
  name: "MChartSunburst",
});

const props = withDefaults(defineProps<ChartSunburstProps>(), {
  data: () => [
    {
      name: "根节点",
      value: 1000,
      children: [
        { name: "子节点1", value: 400 },
        { name: "子节点2", value: 300, children: [{ name: "子节点2-1", value: 150 }, { name: "子节点2-2", value: 150 }] },
        { name: "子节点3", value: 300 },
      ],
    },
  ],
  showLabel: true,
  labelFontSize: 12,
  labelColor: "#333",
  labelPosition: "inside",
  nodeColor: "#5470C6",
  animation: true,
  animationDuration: 1000,
  roam: false,
  nodeClick: "rootToNode",
  initialTreeDepth: -1,
  center: () => ["50%", "50%"],
  radius: () => [0, "75%"],
  height: "400px",
  width: "100%",
  backgroundColor: "transparent",
  showTooltip: true,
  tooltipFormatter: undefined,
  showLegend: false,
  legendPosition: "top",
  emphasis: () => ({
    focus: "ancestor",
  }),
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

// 递归处理旭日图数据
const processSunburstData = (nodes: ChartSunburstNode[]): any[] => {
  return nodes.map((node) => {
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
      collapsed: node.collapsed,
    };

    // 复制其他自定义属性
    Object.keys(node).forEach((key) => {
      if (!["name", "value", "children", "itemStyle", "label", "collapsed"].includes(key)) {
        result[key] = node[key];
      }
    });

    // 处理子节点
    if (node.children && node.children.length > 0) {
      result.children = processSunburstData(node.children);
    }

    return result;
  });
};

// 构建 ECharts 配置
const buildOption = (): echarts.EChartsOption => {
  // 如果传入了 options，直接使用 options
  if (props.options) {
    return props.options;
  }

  const sunburstData = props.data ? processSunburstData(props.data) : [];

  if (!sunburstData || sunburstData.length === 0) {
    return {};
  }

  // 构建图例配置
  const legendConfig = props.showLegend
    ? {
        show: true,
        orient: (props.legendPosition === "left" || props.legendPosition === "right" ? "vertical" : "horizontal") as "vertical" | "horizontal",
        left: props.legendPosition === "left" ? "left" : props.legendPosition === "right" ? "right" : "center",
        top: props.legendPosition === "top" ? "top" : props.legendPosition === "bottom" ? "bottom" : "middle",
        textStyle: {
          color: "#666",
          fontSize: 14,
        },
      }
    : {
        show: false,
      };

  const option: echarts.EChartsOption = {
    backgroundColor: props.backgroundColor,
    legend: legendConfig,
    tooltip: props.showTooltip
      ? {
          trigger: "item",
          formatter: props.tooltipFormatter || ((params: any) => {
            const path = params.treePathInfo?.map((item: any) => item.name).join(" / ") || params.name;
            return `${path}<br/>值: ${params.value || ""}`;
          }),
        }
      : {
          show: false,
        },
    series: [
      {
        type: "sunburst",
        data: sunburstData,
        center: props.center,
        radius: props.radius,
        nodeClick: props.nodeClick,
        initialTreeDepth: props.initialTreeDepth,
        label: {
          show: props.showLabel,
          fontSize: props.labelFontSize,
          color: props.labelColor,
          position: props.labelPosition,
        },
        emphasis: props.emphasis || {
          focus: "ancestor",
        },
        animation: props.animation,
        animationDuration: props.animationDuration,
        animationEasing: "cubicOut",
      } as SunburstSeriesOption,
    ],
  };

  return option;
};

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) {
    console.warn("ChartSunburst: chartContainer is not available");
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
    console.error("ChartSunburst initialization error:", error);
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
    console.error("ChartSunburst update error:", error);
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
    props.showLabel,
    props.labelFontSize,
    props.labelColor,
    props.labelPosition,
    props.nodeColor,
    props.animation,
    props.animationDuration,
    props.roam,
    props.nodeClick,
    props.initialTreeDepth,
    props.center,
    props.radius,
    props.backgroundColor,
    props.showTooltip,
    props.tooltipFormatter,
    props.showLegend,
    props.legendPosition,
    props.emphasis,
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
.m-chart-sunburst {
  @apply w-full h-full;
}
</style>

