<script setup name="ChartPie3D">
    import { useECharts } from '@/hooks/useEcharts'
    import { onMounted, ref, watch } from 'vue'
    
    const props = defineProps({
        data: {
            type: Array,
            default: () => [],
        },
        color: {
            type: Array,
            default: () => ['#1ec6df', '#2e61f6', '#8adfef', '#f7b500', '#ff7d4c'],
        },
        legendShow: {
            type: Boolean,
            default: true,
        },
        nameWidth: {
            type: Number,
            default: 100,
        },
        left: {
            type: String,
            default: '-20%',
        },
        top: {
            type: String,
            default: 'center',
        },
        ringRadius: {
            type: Number,
            default: 0.8, // 内环半径比例，0-1之间，值越大环越细
        },
        fontSize: {
            type: Number,
            default: 16,
        },
    })
    const chartRef = ref()
    const { setOptions } = useECharts(chartRef)
    
    // 生成3D饼图的series配置
    function getPie3D(pieData, internalDiameterRatio = null) {
        let series = []
        let sumValue = 0
        let startValue = 0
        let endValue = 0
        // 使用props中的ringRadius参数，如果没有传入则使用默认值
        let k = 1 - (internalDiameterRatio !== null ? internalDiameterRatio : props.ringRadius)
        
        // 计算总和和最大值，用于计算厚度比例
        let maxValue = 0
        pieData.forEach(item => {
            sumValue += item.value
            maxValue = Math.max(maxValue, item.value)
        })
        
        for (let i = 0; i < pieData.length; i++) {
            let item = pieData[i]
            let seriesItem = {
                name: item.name,
                type: 'surface',
                parametric: true,
                wireframe: { show: false },
                pieData: item,
                pieStatus: { selected: false, hovered: false, k: k },
                itemStyle: {
                    color: item.itemStyle?.color || props.color[i % props.color.length],
                    opacity: 1,
                },
            }
            series.push(seriesItem)
        }
        
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value
            series[i].pieData.startRatio = startValue / sumValue
            series[i].pieData.endRatio = endValue / sumValue
            
            // 根据数据值计算厚度，数据越大厚度越厚
            const thicknessRatio = maxValue > 0 ? series[i].pieData.value / maxValue : 1
            const baseThickness = 1 // 基础厚度
            const maxThickness = 50 // 最大厚度
            const dynamicThickness = baseThickness + (maxThickness - baseThickness) * thicknessRatio
            
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                false,
                false,
                k,
                dynamicThickness // 使用动态计算的厚度
            )
            startValue = endValue
        }
        return series
    }
    
    function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        let midRatio = (startRatio + endRatio) / 2
        let startRadian = startRatio * Math.PI * 2
        let endRadian = endRatio * Math.PI * 2
        let midRadian = midRatio * Math.PI * 2
        k = typeof k !== 'undefined' ? k : 1 / 3
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
        let hoverRate = isHovered ? 1.05 : 1
        return {
            u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
            v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
            x: function (u, v) {
                if (u < startRadian) {
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                if (u > endRadian) {
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
            },
            y: function (u, v) {
                if (u < startRadian) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                if (u > endRadian) {
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
            },
            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u)
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u)
                }
                return Math.sin(v) > 0 ? h : -h
            },
        }
    }
    
    const init = () => {
        // 计算总和
        const total = props.data.reduce((sum, item) => sum + Number(item.value), 0)
        setOptions({
            legend: props.legendShow
                ? {
                      show: true,
                      orient: 'vertical',
                      right: '0%',
                      top: 'center',
                      icon: 'circle',
                      itemWidth: props.fontSize * 0.75,
                      itemHeight: props.fontSize * 0.75,
                      textStyle: {
                          color: '#fff',
                          fontSize: props.fontSize,
                          rich: {
                              name: {
                                  width: props.nameWidth,
                                  align: 'left',
                                  color: '#fff',
                                  fontSize: props.fontSize,
                                  fontFamily: 'monospace',
                              },
                              percent: {
                                  width: 50,
                                  align: 'right',
                                  color: '#9DDBFF',
                                  fontSize: props.fontSize,
                                  fontFamily: 'monospace',
                                  fontWeight: 'bold',
                              },
                          },
                      },
                      formatter: name => {
                          const item = props.data.find(d => d.name === name)
                          if (!item) return name
                          const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0
                          return `{name|${name}}{percent|${percent}%}`
                      },
                  }
                : undefined,
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: params => {
                    if (params.seriesName) {
                        const _target = props.data.find(d => d.name === params.seriesName)
                        return `${params.seriesName}<br/>${_target.value || ''}`
                    }
                    return ''
                },
            },
            xAxis3D: { min: -1, max: 1 },
            yAxis3D: { min: -1, max: 1 },
            zAxis3D: { min: -1, max: 1 },
            grid3D: {
                show: false,
                boxHeight: 0.6, // 增加boxHeight以适应最大厚度的扇区
                top: props.top,
                left: props.left,
                viewControl: {
                    alpha: 30,
                    distance: 180,
                    rotateSensitivity: 0,
                    zoomSensitivity: 0,
                    panSensitivity: 0,
                    autoRotate: false,
                },
            },
            series: getPie3D(props.data, props.ringRadius),
        })
    }
    
    onMounted(() => {
        init()
    })
    watch(
        () => props.data,
        () => {
            init()
        },
        { deep: true, immediate: true }
    )
    </script>
    
    <template>
        <div class="w-full h-full" ref="chartRef"></div>
    </template>
    
    <style lang="less" scoped></style>
    