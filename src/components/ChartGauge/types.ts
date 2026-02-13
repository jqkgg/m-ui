export interface ChartGaugeProps {
  /** 当前值 */
  value?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 仪表盘名称 */
  name?: string
  /** 单位 */
  unit?: string
  /** 颜色配置，支持分段颜色 [[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']] */
  colors?: Array<[number, string]>
  /** 图表高度 */
  height?: number | string
  /** 图表宽度 */
  width?: number | string
  /** 完全自定义的 ECharts 配置项 */
  options?: any
}
