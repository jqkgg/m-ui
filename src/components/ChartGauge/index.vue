<template>
  <div ref="chartContainer" class="m-chart-gauge" :style="{ width: width, height: computedHeight }"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useResizeObserver } from '@vueuse/core'
import type { ChartGaugeProps } from './types'

defineOptions({
  name: 'MChartGauge'
})

const props = withDefaults(defineProps<ChartGaugeProps>(), {
  value: 0,
  min: 0,
  max: 100,
  name: '仪表盘',
  unit: '%',
  colors: () => [[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']],
  height: '400px',
  width: '100%'
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
      formatter: '{a} <br/>{b} : {c}' + props.unit
    },
    series: [
      {
        name: props.name,
        type: 'gauge',
        min: props.min,
        max: props.max,
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}' + props.unit
        },
        data: [
          {
            value: props.value,
            name: props.name
          }
        ],
        axisLine: {
          lineStyle: {
            color: props.colors
          }
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

watch(() => [props.value, props.min, props.max, props.name, props.unit, props.colors], () => {
  setOption()
}, { deep: true })

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
