<template>
  <div ref="chartContainer" class="m-chart-funnel" :style="{ width: width, height: computedHeight }"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useResizeObserver } from '@vueuse/core'
import type { ChartFunnelProps } from './types'

defineOptions({
  name: 'MChartFunnel'
})

const props = withDefaults(defineProps<ChartFunnelProps>(), {
  data: () => [],
  colors: () => [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
    '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
  ],
  showLegend: false,
  sort: 'descending',
  gap: 2,
  height: '400px',
  width: '100%',
  showLabel: true,
  labelPosition: 'inside'
})

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const computedHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const initChart = () => {
  if (!chartContainer.value) return
  
  chartInstance = echarts.init(chartContainer.value)
  setOption()
}

const setOption = () => {
  if (!chartInstance) return

  if (props.options) {
    chartInstance.setOption(props.options)
    return
  }

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
    },
    legend: {
      show: props.showLegend,
      data: props.data.map(item => item.name)
    },
    color: props.colors,
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: props.sort,
        gap: props.gap,
        label: {
          show: props.showLabel,
          position: props.labelPosition
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: props.data
      }
    ]
  }

  chartInstance.setOption(option)
}

watch(() => props.data, () => {
  setOption()
}, { deep: true })

watch(() => [props.sort, props.gap, props.showLabel, props.labelPosition, props.colors, props.showLegend], () => {
  setOption()
})

watch(() => props.options, () => {
  setOption()
}, { deep: true })

useResizeObserver(chartContainer, () => {
  chartInstance?.resize()
})

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>
