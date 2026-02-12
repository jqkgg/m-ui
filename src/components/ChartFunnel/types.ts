export interface ChartFunnelDataItem {
  name: string
  value: number
  itemStyle?: any
}

export type ChartFunnelSort = 'descending' | 'ascending' | 'none'
export type ChartFunnelLabelPosition = 'inside' | 'outside' | 'left' | 'right'

export interface ChartFunnelProps {
  /** 数据数组 */
  data?: ChartFunnelDataItem[]
  /** 颜色数组 */
  colors?: string[]
  /** 是否显示图例 */
  showLegend?: boolean
  /** 排序方式 */
  sort?: ChartFunnelSort
  /** 图形间距 */
  gap?: number
  /** 图表高度 */
  height?: number | string
  /** 图表宽度 */
  width?: number | string
  /** 是否显示标签 */
  showLabel?: boolean
  /** 标签位置 */
  labelPosition?: ChartFunnelLabelPosition
  /** 完全自定义的 ECharts 配置项 */
  options?: any
}
