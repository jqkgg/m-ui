<template>
  <div
    ref="chartContainer"
    :class="['m-chart-map-cq']"
    :style="{ width: computedWidth, height: computedHeight, backgroundColor: backgroundColor }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import { useResizeObserver } from "@vueuse/core";
import type { ChartMapCqProps, ChartMapCqDataItem, ChartMapCqRange } from "./types";

defineOptions({
  name: "MChartMapCq",
});

// 默认颜色范围（序时进度）
const defaultRangesConfig: ChartMapCqRange[] = [
  { min: -Infinity, max: -10, color: "#FF4D4F", label: "<-10%" },
  { min: -10, max: 0, color: "#FF7A45", label: "-10% ~ 0" },
  { min: 0, max: 10, color: "#FFD666", label: "0 ~ 10%" },
  { min: 10, max: 50, color: "#1890FF", label: "10% ~ 50%" },
  { min: 50, max: Infinity, color: "#52C41A", label: ">=50%" },
];

const props = withDefaults(defineProps<ChartMapCqProps>(), {
  data: () => [],
  geoJson: undefined,
  mapName: "chongqing",
  showMainCityInCorner: true,
  mainCityNames: () => [
    "渝北区",
    "江北区",
    "北碚区",
    "沙坪坝区",
    "渝中区",
    "南岸区",
    "九龙坡区",
    "大渡口区",
    "巴南区",
  ],
  ranges: undefined,
  defaultRanges: true,
  showLabel: true,
  labelStyle: () => ({
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "normal",
  }),
  showLegend: true,
  legendPosition: "right",
  legendTitle: "序时进度",
  height: 600,
  width: "100%",
  backgroundColor: "transparent",
  areaStyle: () => ({
    areaColor: "#5b9bd5",
    borderColor: "#fff",
    borderWidth: 1,
  }),
  emphasis: () => ({
    areaColor: "#ffff00",
    borderColor: "#fff",
    borderWidth: 2,
  }),
  showTooltip: true,
  tooltipFormatter: undefined,
  specialLabels: () => [],
});

const chartContainer = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
let mapRegistered = false;
const defaultGeoJson = ref<any>(null);
const defaultMainCityGeoJson = ref<any>(null);
const isLoadingGeoJson = ref(false);
const isLoadingMainCityGeoJson = ref(false);

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

// 获取颜色范围配置
const ranges = computed(() => {
  if (props.ranges && props.ranges.length > 0) {
    return props.ranges;
  }
  if (props.defaultRanges) {
    return defaultRangesConfig;
  }
  return [];
});

// 根据值获取颜色
const getColorByValue = (value: number): string => {
  const rangeList = ranges.value;
  for (let i = 0; i < rangeList.length; i++) {
    const range = rangeList[i];
    const isLast = i === rangeList.length - 1;
    if (value >= range.min && (isLast ? value <= range.max : value < range.max)) {
      return range.color;
    }
  }
  // 默认颜色
  return "#CCCCCC";
};

// 处理区域名称（移除主城区后缀）
const processAreaName = (name: string): string => {
  return name.replace("_main", "");
};

// 加载默认GeoJSON数据
const loadDefaultGeoJson = async (): Promise<any> => {
  if (defaultGeoJson.value) {
    return defaultGeoJson.value;
  }

  if (isLoadingGeoJson.value) {
    // 如果正在加载，等待加载完成
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (defaultGeoJson.value) {
          clearInterval(checkInterval);
          resolve(defaultGeoJson.value);
        }
      }, 100);
    });
  }

  isLoadingGeoJson.value = true;

  try {
    // 方式1：尝试从本地文件加载（如果文件存在）
    // 使用fetch方式，避免TypeScript编译时检查文件是否存在
    try {
      const localResponse = await fetch("/src/assets/geo/chongqing.json");
      if (localResponse.ok) {
        const localGeoJson = await localResponse.json();
        defaultGeoJson.value = localGeoJson;
        isLoadingGeoJson.value = false;
        return localGeoJson;
      }
    } catch (localError) {
      // 本地文件不存在，继续尝试从API加载
      console.log("本地GeoJSON文件不存在，尝试从阿里云API加载...");
    }

    // 方式2：从阿里云DataV API加载
    const response = await fetch("https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json");
    if (response.ok) {
      const geoData = await response.json();
      defaultGeoJson.value = geoData;
      isLoadingGeoJson.value = false;
      return geoData;
    } else {
      throw new Error("无法从阿里云API加载地图数据");
    }
  } catch (error) {
    isLoadingGeoJson.value = false;
    console.error("ChartMapCq: 加载默认GeoJSON数据失败", error);
    console.warn("ChartMapCq: 请提供geoJson属性或确保网络连接正常");
    return null;
  }
};

// 加载主城区GeoJSON数据
const loadMainCityGeoJson = async (): Promise<any> => {
  if (defaultMainCityGeoJson.value) {
    return defaultMainCityGeoJson.value;
  }

  if (isLoadingMainCityGeoJson.value) {
    // 如果正在加载，等待加载完成
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (defaultMainCityGeoJson.value) {
          clearInterval(checkInterval);
          resolve(defaultMainCityGeoJson.value);
        }
      }, 100);
    });
  }

  isLoadingMainCityGeoJson.value = true;

  try {
    // 方式1：尝试从本地文件加载主城区数据（如果文件存在）
    try {
      const localResponse = await fetch("/src/assets/geo/chongqing-main.json");
      if (localResponse.ok) {
        const localGeoJson = await localResponse.json();
        defaultMainCityGeoJson.value = localGeoJson;
        isLoadingMainCityGeoJson.value = false;
        return localGeoJson;
      }
    } catch (localError) {
      // 本地文件不存在，继续尝试从API加载或从主地图筛选
      console.log("本地主城区GeoJSON文件不存在，尝试从阿里云API加载...");
    }

    // 方式2：从阿里云DataV API加载主城区数据
    // 主城区通常使用区级数据，可以尝试加载各区数据并合并
    try {
      // 尝试加载主城区各区数据（如果API支持）
      // 这里先尝试加载完整地图，然后筛选主城区
      const mainGeoJson = await loadDefaultGeoJson();
      if (mainGeoJson && mainGeoJson.features) {
        // 从完整地图中筛选出主城区数据
        const mainCityFeatures = mainGeoJson.features.filter((feature: any) => {
          const name = feature.properties?.name || feature.properties?.NAME || "";
          return props.mainCityNames?.includes(name);
        });

        if (mainCityFeatures.length > 0) {
          const mainCityGeoData = {
            ...mainGeoJson,
            features: mainCityFeatures,
          };
          defaultMainCityGeoJson.value = mainCityGeoData;
          isLoadingMainCityGeoJson.value = false;
          return mainCityGeoData;
        }
      }
    } catch (apiError) {
      console.warn("从主地图筛选主城区数据失败", apiError);
    }

    // 如果都失败了，返回null
    isLoadingMainCityGeoJson.value = false;
    return null;
  } catch (error) {
    isLoadingMainCityGeoJson.value = false;
    console.error("ChartMapCq: 加载主城区GeoJSON数据失败", error);
    return null;
  }
};

// 注册地图
const registerMap = async () => {
  if (mapRegistered) {
    return;
  }

  try {
    // 如果提供了geoJson，直接注册
    if (props.geoJson) {
      echarts.registerMap(props.mapName, props.geoJson);
      mapRegistered = true;
      
      // 如果显示主城区，也需要注册主城区地图
      if (props.showMainCityInCorner) {
        const mainCityGeoData = await loadMainCityGeoJson();
        if (mainCityGeoData) {
          try {
            echarts.registerMap(`${props.mapName}-main`, mainCityGeoData);
          } catch (e) {
            console.warn("主城区地图注册失败，将使用主地图", e);
          }
        }
      }
      return;
    }

    // 否则尝试加载默认GeoJSON数据
    const geoData = await loadDefaultGeoJson();
    if (geoData) {
      echarts.registerMap(props.mapName, geoData);
      mapRegistered = true;
      
      // 如果显示主城区，也需要注册主城区地图
      if (props.showMainCityInCorner) {
        const mainCityGeoData = await loadMainCityGeoJson();
        if (mainCityGeoData) {
          try {
            echarts.registerMap(`${props.mapName}-main`, mainCityGeoData);
          } catch (e) {
            console.warn("主城区地图注册失败，将使用主地图", e);
          }
        }
      }
      return;
    }

    // 如果都失败了，尝试检查是否已经注册过
    // 注意：这里假设地图已经在外部注册
    mapRegistered = true;
  } catch (error) {
    console.warn("ChartMapCq: 地图注册失败，请确保已提供geoJson或已注册地图", error);
  }
};

// 处理主城区位置
const processMapData = (data: ChartMapCqDataItem[]): ChartMapCqDataItem[] => {
  if (!props.showMainCityInCorner) {
    return data;
  }

  // 创建数据映射
  const dataMap = new Map<string, ChartMapCqDataItem>();
  data.forEach((item) => {
    dataMap.set(item.name, item);
  });

  // 为主城区创建副本数据，用于左上角显示
  const mainCityData: ChartMapCqDataItem[] = [];
  props.mainCityNames?.forEach((name: string) => {
    const item = dataMap.get(name);
    if (item) {
      mainCityData.push({
        ...item,
        name: `${name}_main`, // 添加后缀以区分
      });
    }
  });

  return [...data, ...mainCityData];
};

// 构建 ECharts 配置
const buildOption = (): echarts.EChartsOption => {
  const processedData = processMapData(props.data || []);
  
  // 转换数据格式，应用颜色
  const seriesData = processedData.map((item: ChartMapCqDataItem) => {
    // 如果有自定义颜色或数据值，使用计算的颜色；否则使用默认颜色
    const color = item.color || (item.value !== undefined ? getColorByValue(item.value) : "#5b9bd5");
    return {
      name: item.name,
      value: item.value,
      itemStyle: {
        areaColor: color,
        borderColor: props.areaStyle?.borderColor || "#fff",
        borderWidth: props.areaStyle?.borderWidth || 1,
      },
      emphasis: {
        itemStyle: {
          areaColor: props.emphasis?.areaColor || "#ffff00",
          borderColor: props.emphasis?.borderColor || "#fff",
          borderWidth: props.emphasis?.borderWidth || 2,
        },
      },
      label: {
        show: props.showLabel && !item.name.endsWith("_main"), // 主城区副本不显示标签
        color: props.labelStyle?.color || "#ffffff",
        fontSize: props.labelStyle?.fontSize || 12,
        fontWeight: props.labelStyle?.fontWeight || "normal",
      },
    };
  });

  // 图例配置
  const legendConfig = props.showLegend
    ? {
        show: true,
        orient: (props.legendPosition === "left" || props.legendPosition === "right" ? "vertical" : "horizontal") as "vertical" | "horizontal",
        left: props.legendPosition === "left" ? "left" : props.legendPosition === "right" ? "right" : "center",
        top: props.legendPosition === "top" ? "top" : props.legendPosition === "bottom" ? "bottom" : "middle",
        textStyle: {
          color: "#333",
          fontSize: 12,
        },
        data: ranges.value.map((range: ChartMapCqRange) => ({
          name: range.label,
          icon: "circle",
          itemStyle: {
            color: range.color,
          },
        })),
        formatter: (name: string) => {
          const range = ranges.value.find((r: ChartMapCqRange) => r.label === name);
          return range ? `${range.label}` : name;
        },
      }
    : {
        show: false,
      };

  // 特殊标注
  const graphic = props.specialLabels?.map((label: any) => ({
    type: "group",
    left: label.position[0],
    top: label.position[1],
    children: [
      {
        type: "rect",
        shape: {
          width: 80,
          height: 30,
          r: 4,
        },
        style: {
          fill: "rgba(24, 144, 255, 0.8)",
          stroke: "#1890FF",
          lineWidth: 1,
        },
      },
      {
        type: "text",
        style: {
          text: label.label || label.name,
          fill: "#ffffff",
          fontSize: 12,
          fontWeight: "normal",
        },
        left: 40,
        top: 15,
      },
    ],
  })) || [];

  const option: echarts.EChartsOption = {
    backgroundColor: props.backgroundColor,
    tooltip: props.showTooltip
      ? {
          trigger: "item",
          formatter: props.tooltipFormatter || ((params: any) => {
            const name = processAreaName(params.name || "");
            return `${name}<br/>${params.value || ""}`;
          }),
        }
      : {
          show: false,
        },
    legend: legendConfig,
    geo: [
      {
        map: props.mapName,
        roam: false,
        zoom: 1,
        layoutCenter: props.showMainCityInCorner ? ["50%", "50%"] : undefined,
        layoutSize: props.showMainCityInCorner ? "80%" : "100%",
        itemStyle: {
          areaColor: props.areaStyle?.areaColor || "#5b9bd5",
          borderColor: props.areaStyle?.borderColor || "#fff",
          borderWidth: props.areaStyle?.borderWidth || 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: props.emphasis?.areaColor || "#ffff00",
            borderColor: props.emphasis?.borderColor || "#fff",
            borderWidth: props.emphasis?.borderWidth || 2,
          },
        },
        label: {
          show: props.showLabel,
          color: props.labelStyle?.color || "#ffffff",
          fontSize: props.labelStyle?.fontSize || 12,
          fontWeight: (props.labelStyle?.fontWeight as any) || "normal",
        },
      },
      // 主城区地图（左上角）
      ...(props.showMainCityInCorner && defaultMainCityGeoJson.value
        ? [
            {
              map: `${props.mapName}-main`,
              roam: false,
              zoom: 1,
              layoutCenter: ["15%", "15%"],
              layoutSize: "30%",
              itemStyle: {
                areaColor: props.areaStyle?.areaColor || "#5b9bd5",
                borderColor: props.areaStyle?.borderColor || "#fff",
                borderWidth: props.areaStyle?.borderWidth || 1,
              },
              emphasis: {
                itemStyle: {
                  areaColor: props.emphasis?.areaColor || "#ffff00",
                  borderColor: props.emphasis?.borderColor || "#fff",
                  borderWidth: props.emphasis?.borderWidth || 2,
                },
              },
              label: {
                show: props.showLabel,
                color: props.labelStyle?.color || "#ffffff",
                fontSize: (props.labelStyle?.fontSize || 12) * 0.7,
                fontWeight: (props.labelStyle?.fontWeight as any) || "normal",
              },
            },
          ]
        : []),
    ],
    series: [
      {
        type: "map" as const,
        map: props.mapName,
        geoIndex: 0,
        data: seriesData.filter((item: any) => !item.name.endsWith("_main")),
        itemStyle: {
          areaColor: props.areaStyle?.areaColor || "#5b9bd5",
          borderColor: props.areaStyle?.borderColor || "#fff",
          borderWidth: props.areaStyle?.borderWidth || 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: props.emphasis?.areaColor || "#ffff00",
            borderColor: props.emphasis?.borderColor || "#fff",
            borderWidth: props.emphasis?.borderWidth || 2,
          },
        },
        label: {
          show: props.showLabel,
          color: props.labelStyle?.color || "#ffffff",
          fontSize: props.labelStyle?.fontSize || 12,
          fontWeight: (props.labelStyle?.fontWeight as any) || "normal",
        },
      },
      // 主城区系列
      ...(props.showMainCityInCorner
        ? [
            {
              type: "map" as const,
              map: props.mapName,
              geoIndex: 1,
              data: seriesData.filter((item: any) => item.name.endsWith("_main")).map((item: any) => ({
                ...item,
                name: item.name.replace("_main", ""),
              })),
              itemStyle: {
                areaColor: props.areaStyle?.areaColor || "#5b9bd5",
                borderColor: props.areaStyle?.borderColor || "#fff",
                borderWidth: props.areaStyle?.borderWidth || 1,
              },
              emphasis: {
                itemStyle: {
                  areaColor: props.emphasis?.areaColor || "#ffff00",
                  borderColor: props.emphasis?.borderColor || "#fff",
                  borderWidth: props.emphasis?.borderWidth || 2,
                },
              },
              label: {
                show: props.showLabel,
                color: props.labelStyle?.color || "#ffffff",
                fontSize: (props.labelStyle?.fontSize || 12) * 0.7,
                fontWeight: (props.labelStyle?.fontWeight as any) || "normal",
              },
            },
          ]
        : []),
    ] as any,
    graphic,
  };

  return option;
};

// 初始化图表
const initChart = async () => {
  if (!chartContainer.value) {
    console.warn("ChartMapCq: chartContainer is not available");
    return;
  }

  try {
    // 注册地图（异步）
    await registerMap();

    // 如果显示主城区，确保主城区数据已加载
    if (props.showMainCityInCorner && !defaultMainCityGeoJson.value) {
      await loadMainCityGeoJson();
      // 如果加载成功，重新注册主城区地图
      if (defaultMainCityGeoJson.value) {
        try {
          echarts.registerMap(`${props.mapName}-main`, defaultMainCityGeoJson.value);
        } catch (e) {
          console.warn("主城区地图注册失败", e);
        }
      }
    }

    // 如果已经存在实例，先销毁
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }

    chartInstance = echarts.init(chartContainer.value);
    const option = buildOption();
    chartInstance.setOption(option);
  } catch (error) {
    console.error("ChartMapCq initialization error:", error);
  }
};

// 更新图表
const updateChart = () => {
  if (!chartInstance) {
    initChart();
    return;
  }
  try {
    const option = buildOption();
    chartInstance.setOption(option, true);
  } catch (error) {
    console.error("ChartMapCq update error:", error);
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
  nextTick(() => {
    initChart();
  });
});

// 监听数据变化
watch(
  () => [
    props.data,
    props.geoJson,
    props.showMainCityInCorner,
    props.ranges,
    props.showLabel,
    props.showLegend,
    props.legendPosition,
    props.backgroundColor,
    props.areaStyle,
    props.emphasis,
    props.specialLabels,
  ],
  async () => {
    // 如果geoJson或showMainCityInCorner变化，需要重新注册地图
    if (props.geoJson !== undefined || props.showMainCityInCorner !== undefined) {
      mapRegistered = false;
      defaultMainCityGeoJson.value = null; // 重置主城区数据
      await registerMap();
    }
    updateChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style lang="scss" scoped>
.m-chart-map-cq {
  width: 100%;
  height: 100%;
}
</style>

