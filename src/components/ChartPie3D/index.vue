<template>
  <div
    ref="chartContainer"
    :class="['m-chart-pie-3d', `m-chart-pie-3d--${legendPosition}`, { 'm-chart-pie-3d--dark': props.darkMode }]"
    :style="{ width: computedWidth, height: computedHeight, backgroundColor: props.backgroundColor }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
import type { ChartPie3DProps } from "./types";

defineOptions({
  name: "MChartPie3D",
});

const props = withDefaults(defineProps<ChartPie3DProps>(), {
  data: () => [
    { name: "数据1", value: 100 },
    { name: "数据2", value: 200 },
    { name: "数据3", value: 300 },
  ],
  colors: () => [
    "rgba(76, 175, 80, 1)", // 绿色
    "rgba(33, 150, 243, 1)", // 蓝色
    "rgba(255, 152, 0, 1)", // 橙色
  ],
  showLegend: true,
  legendPosition: "right",
  height: "400px",
  width: "100%",
  innerRadius: "60%", // 默认环形图
  radius: "80%",
  showLabel: true,
  labelPosition: "outside",
  showPercent: true,
  showValue: false,
  legendShowValue: true,
  legendShowPercent: true,
  depth: 20,
  darkMode: false,
  backgroundColor: undefined,
});

const chartContainer = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 计算总数值
const totalValue = computed(() => {
  return props.data?.reduce((sum: number, item: any) => sum + item.value, 0) || 0;
});

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

// 将百分比字符串转换为数值
const parseRadius = (radius: number | string): number => {
  if (typeof radius === "number") {
    return radius;
  }
  if (typeof radius === "string" && radius.endsWith("%")) {
    return parseFloat(radius) / 100;
  }
  return parseFloat(radius);
};

// 计算内环半径比例（k值，用于3D参数方程）
const innerRadiusRatio = computed(() => {
  const innerR = parseRadius(props.innerRadius);
  return 1 - innerR; // k值，值越大环越细
});

// 计算3D厚度（基于depth属性）
const baseThickness = computed(() => {
  return props.depth ? Math.max(10, Math.min(50, props.depth)) : 20;
});

// 生成参数方程
const getParametricEquation = (
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number
) => {
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  const hoverRate = isHovered ? 1.05 : 1;

  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? h : -h;
    },
  };
};

// 生成3D饼图的series配置
const getPie3DSeries = () => {
  const data = props.data || [];
  const series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const k = innerRadiusRatio.value;
  
  // 计算总和和最大值，用于计算厚度比例
  let maxValue = 0;
  data.forEach((item: any) => {
    sumValue += item.value;
    maxValue = Math.max(maxValue, item.value);
  });

  // 为每个数据项创建surface系列
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const color = item.color || props.colors[i % props.colors.length];
    
    const seriesItem: any = {
      name: item.name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: item,
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
      itemStyle: {
        color: color,
        opacity: 1,
      },
    };
    series.push(seriesItem);
  }

  // 计算每个扇形的起始和结束比例，并设置参数方程
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    
    // 计算动态厚度
    const thicknessRatio = maxValue > 0 ? series[i].pieData.value / maxValue : 1;
    const dynamicThickness = baseThickness.value * (0.5 + 0.5 * thicknessRatio);
    
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      dynamicThickness
    );
    startValue = endValue;
  }

  return series;
};

// 计算饼图位置（根据图例位置调整grid3D的left和top）
const getGrid3DConfig = () => {
  let left = "center";
  let top = "center";
  
  if (props.legendPosition === "left") {
    left = "20%";
  } else if (props.legendPosition === "right") {
    left = "-20%";
  } else if (props.legendPosition === "top") {
    top = "20%";
  } else if (props.legendPosition === "bottom") {
    top = "-20%";
  }
  
  return { left, top };
};

// 构建 ECharts 配置
const buildOption = (): echarts.EChartsOption => {
  const data = props.data || [];
  
  // 计算图例配置
  const legendConfig = props.showLegend
    ? {
        show: true,
        orient: (props.legendPosition === "left" || props.legendPosition === "right" ? "vertical" : "horizontal") as "vertical" | "horizontal",
        left: props.legendPosition === "left" ? "left" : props.legendPosition === "right" ? "right" : "center",
        top: props.legendPosition === "top" ? "top" : props.legendPosition === "bottom" ? "bottom" : "middle",
        icon: "circle",
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 16,
        formatter: (name: string) => {
          const item = data.find((d: any) => d.name === name);
          if (!item) return name;
          
          const percent = totalValue.value > 0 ? ((item.value / totalValue.value) * 100).toFixed(0) : "0";
          let formatterText = name;
          
          if (props.legendShowValue && props.legendShowPercent) {
            formatterText = `${name}\n${item.value}个 ${percent}%`;
          } else if (props.legendShowValue) {
            formatterText = `${name}\n${item.value}个`;
          } else if (props.legendShowPercent) {
            formatterText = `${name}\n${percent}%`;
          }
          
          return formatterText;
        },
        textStyle: {
          color: props.darkMode ? "#E6F7FF" : "#333",
          fontSize: 14,
          lineHeight: 20,
        },
      }
    : {
        show: false,
      };

  // 背景色
  const backgroundColor = props.backgroundColor || (props.darkMode ? "transparent" : "#ffffff");

  // grid3D配置
  const grid3DConfig = getGrid3DConfig();
  const maxThickness = baseThickness.value * 1.5; // 最大厚度，用于设置boxHeight

  const option: echarts.EChartsOption = {
    backgroundColor,
    color: props.colors,
    legend: legendConfig,
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        if (params.seriesName) {
          const item = data.find((d: any) => d.name === params.seriesName);
          if (item) {
            const percent = totalValue.value > 0 ? ((item.value / totalValue.value) * 100).toFixed(2) : "0";
            return `${params.seriesName}<br/>${item.value}个 (${percent}%)`;
          }
        }
        return "";
      },
      backgroundColor: props.darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.95)",
      borderColor: props.darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
      textStyle: {
        color: props.darkMode ? "#ffffff" : "#333333",
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: maxThickness / 50, // 根据最大厚度调整boxHeight
      top: grid3DConfig.top,
      left: grid3DConfig.left,
      viewControl: {
        alpha: 30, // 俯仰角
        distance: 180, // 距离
        rotateSensitivity: 0, // 禁用旋转
        zoomSensitivity: 0, // 禁用缩放
        panSensitivity: 0, // 禁用平移
        autoRotate: false, // 禁用自动旋转
      },
    },
    series: getPie3DSeries(),
  };

  return option;
};

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) {
    console.warn("ChartPie3D: chartContainer is not available");
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
    console.error("ChartPie3D initialization error:", error);
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
    console.error("ChartPie3D update error:", error);
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
    props.showLegend,
    props.legendPosition,
    props.innerRadius,
    props.radius,
    props.showLabel,
    props.labelPosition,
    props.showPercent,
    props.showValue,
    props.legendShowValue,
    props.legendShowPercent,
    props.depth,
    props.darkMode,
    props.backgroundColor,
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
.m-chart-pie-3d {
  @apply w-full h-full;
}
</style>
