export interface ChartKLineDataItem {
  /** 日期/时间（X轴标签） */
  date: string
  /** K线数据 [开盘价, 收盘价, 最低价, 最高价] */
  value: [number, number, number, number]
  /** 成交量（可选，用于显示成交量柱状图） */
  volume?: number
}

export interface ChartKLineProps {
  /** K线数据数组 */
  data?: ChartKLineDataItem[]
  /** X轴类别数据（可选，如果不提供则使用 data 中的 date） */
  categories?: string[]
  /** 是否显示成交量 */
  showVolume?: boolean
  /** 是否显示图例 */
  showLegend?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 图表高度 */
  height?: number | string
  /** 图表宽度 */
  width?: number | string
  /** 背景颜色 */
  backgroundColor?: string
  /** 是否显示网格 */
  showGrid?: boolean
  /** 网格线样式 */
  gridLineStyle?: {
    color?: string
    width?: number
    type?: 'solid' | 'dashed' | 'dotted'
  }
  /** 是否显示工具提示 */
  showTooltip?: boolean
  /** 工具提示格式化函数 */
  tooltipFormatter?: (params: any) => string
  /** Y轴最小值 */
  yAxisMin?: number
  /** Y轴最大值 */
  yAxisMax?: number
  /** Y轴分割段数 */
  yAxisSplitNumber?: number
  /** 网格配置 */
  grid?: {
    left?: string | number
    right?: string | number
    top?: string | number
    bottom?: string | number
  }
  /** X轴配置 */
  xAxis?: {
    show?: boolean
    axisLabel?: {
      rotate?: number
      interval?: number | 'auto'
    }
  }
  /** Y轴配置 */
  yAxis?: {
    show?: boolean
    name?: string
    nameLocation?: 'start' | 'middle' | 'end'
    nameTextStyle?: {
      color?: string
      fontSize?: number
    }
  }
  /** K线颜色配置 */
  kLineColors?: {
    /** 上涨颜色（收盘价 > 开盘价） */
    upColor?: string
    /** 下跌颜色（收盘价 < 开盘价） */
    downColor?: string
    /** 边框颜色 */
    borderColor?: string
  }
  /** 成交量颜色配置 */
  volumeColors?: {
    /** 上涨颜色 */
    upColor?: string
    /** 下跌颜色 */
    downColor?: string
  }
  /** 是否启用数据缩放 */
  dataZoom?: boolean | {
    type?: 'slider' | 'inside'
    show?: boolean
    start?: number
    end?: number
  }
  /** 是否启用动画 */
  animation?: boolean
  /** 动画持续时间（毫秒） */
  animationDuration?: number
  /** 完全自定义的 ECharts 配置项，传入后将以 options 为准，忽略其他属性。参考：https://echarts.apache.org/zh/option.html#series-candlestick.type */
  options?: any
}

