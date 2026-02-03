export interface ChartWordCloudDataItem {
  /** 词云项名称 */
  name: string
  /** 词云项值（决定字体大小） */
  value: number
  /** 自定义颜色（可选） */
  color?: string
}

export type ChartWordCloudShape = 'circle' | 'cardioid' | 'diamond' | 'square' | 'triangle-forward' | 'triangle' | 'pentagon' | 'star' | 'rect'

export interface ChartWordCloudProps {
  /** 数据数组 */
  data?: ChartWordCloudDataItem[]
  /** 默认颜色数组 */
  colors?: string[]
  /** 图表高度 */
  height?: number | string
  /** 图表宽度 */
  width?: number | string
  /** 词云形状 */
  shape?: ChartWordCloudShape
  /** 字体大小范围 [最小, 最大] */
  sizeRange?: [number, number]
  /** 旋转角度范围 [最小角度, 最大角度] */
  rotationRange?: [number, number]
  /** 旋转步长 */
  rotationStep?: number
  /** 网格大小（用于碰撞检测，值越小越精确但性能越差） */
  gridSize?: number
  /** 是否启用动画 */
  animation?: boolean
  /** 动画持续时间（毫秒） */
  animationDuration?: number
  /** 是否启用悬停效果 */
  hoverable?: boolean
  /** 背景色 */
  backgroundColor?: string
  /** 完全自定义的配置项，传入后将以 options 为准，忽略其他属性 */
  options?: any
}

