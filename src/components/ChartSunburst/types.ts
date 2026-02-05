export interface ChartSunburstNode {
  /** 节点名称 */
  name: string
  /** 节点值（可选，用于控制扇形大小） */
  value?: number
  /** 子节点数组 */
  children?: ChartSunburstNode[]
  /** 节点颜色（可选） */
  itemStyle?: {
    color?: string
    borderColor?: string
    borderWidth?: number
  }
  /** 节点标签配置（可选） */
  label?: {
    show?: boolean
    fontSize?: number
    color?: string
    position?: 'inside' | 'outside'
    formatter?: string | ((params: any) => string)
  }
  /** 节点是否折叠（可选） */
  collapsed?: boolean
  /** 自定义数据（可选） */
  [key: string]: any
}

export interface ChartSunburstProps {
  /** 旭日图数据（根节点） */
  data?: ChartSunburstNode[]
  /** 是否显示标签 */
  showLabel?: boolean
  /** 标签字体大小 */
  labelFontSize?: number
  /** 标签颜色 */
  labelColor?: string
  /** 标签位置 */
  labelPosition?: 'inside' | 'outside'
  /** 节点默认颜色 */
  nodeColor?: string
  /** 是否启用动画 */
  animation?: boolean
  /** 动画持续时间（毫秒） */
  animationDuration?: number
  /** 是否启用缩放和平移 */
  roam?: boolean | 'scale' | 'move'
  /** 是否启用节点展开/折叠 */
  nodeClick?: boolean | 'rootToNode' | 'link'
  /** 初始展开层级（-1 表示全部展开） */
  initialTreeDepth?: number
  /** 中心位置 [x, y] */
  center?: [string | number, string | number]
  /** 半径 [内半径, 外半径] */
  radius?: [string | number, string | number]
  /** 图表高度 */
  height?: number | string
  /** 图表宽度 */
  width?: number | string
  /** 背景色 */
  backgroundColor?: string
  /** 是否显示工具提示 */
  showTooltip?: boolean
  /** 工具提示格式化函数 */
  tooltipFormatter?: (params: any) => string
  /** 是否显示图例 */
  showLegend?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 是否启用高亮 */
  emphasis?: {
    focus?: 'ancestor' | 'descendant' | 'self' | 'none'
  }
  /** 完全自定义的 ECharts 配置项，传入后将以 options 为准，忽略其他属性 */
  options?: any
}

