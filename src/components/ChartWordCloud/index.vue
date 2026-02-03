<template>
  <div
    ref="chartContainer"
    class="m-chart-wordcloud"
    :style="{ width: computedWidth, height: computedHeight, backgroundColor: backgroundColor }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { useResizeObserver } from "@vueuse/core";
import type { ChartWordCloudProps, ChartWordCloudDataItem } from "./types";

defineOptions({
  name: "MChartWordCloud",
});

const props = withDefaults(defineProps<ChartWordCloudProps>(), {
  data: () => [
    { name: "词云", value: 100 },
    { name: "数据", value: 80 },
    { name: "可视化", value: 60 },
    { name: "图表", value: 50 },
    { name: "展示", value: 40 },
  ],
  colors: () => [
    "#5470C6",
    "#91CC75",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3BA272",
    "#FC8452",
    "#9A60B4",
    "#EA7CCC",
  ],
  height: "400px",
  width: "100%",
  shape: "circle",
  sizeRange: () => [12, 60],
  rotationRange: () => [-90, 90],
  rotationStep: 15,
  gridSize: 4,
  animation: true,
  animationDuration: 1000,
  hoverable: true,
  backgroundColor: "transparent",
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

// 构建 ECharts 配置
const buildOption = (): echarts.EChartsOption => {
  // 如果传入了 options，直接使用 options
  if (props.options) {
    return props.options;
  }

  const data = props.data || [];
  
  // 转换数据格式，应用自定义颜色
  const seriesData = data.map((item: ChartWordCloudDataItem) => ({
    name: item.name,
    value: item.value,
    textStyle: item.color
      ? {
          color: item.color,
        }
      : undefined,
  }));

  // 颜色函数
  const colorFunction = (params: any) => {
    if (params.data?.textStyle?.color) {
      return params.data.textStyle.color;
    }
    const index = params.dataIndex || 0;
    return props.colors[index % props.colors.length];
  };

  const option: echarts.EChartsOption = {
    backgroundColor: props.backgroundColor,
    tooltip: {
      show: props.hoverable,
      trigger: "item",
      formatter: (params: any) => {
        return `${params.name}<br/>值: ${params.value}`;
      },
    },
    series: [
      {
        type: "wordCloud",
        shape: props.shape,
        sizeRange: props.sizeRange,
        rotationRange: props.rotationRange,
        rotationStep: props.rotationStep,
        gridSize: props.gridSize,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: "Arial",
          fontWeight: "bold",
          color: colorFunction,
        },
        emphasis: {
          focus: "self",
          textStyle: {
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: seriesData,
        animation: props.animation,
        animationDuration: props.animationDuration,
        animationEasing: "cubicOut",
      } as any,
    ],
  };

  return option;
};

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) {
    console.warn("ChartWordCloud: chartContainer is not available");
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
    console.error("ChartWordCloud initialization error:", error);
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
    console.error("ChartWordCloud update error:", error);
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
    props.colors,
    props.shape,
    props.sizeRange,
    props.rotationRange,
    props.rotationStep,
    props.gridSize,
    props.backgroundColor,
    props.animation,
    props.animationDuration,
    props.hoverable,
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
.m-chart-wordcloud {
  @apply w-full h-full;
}
</style>
