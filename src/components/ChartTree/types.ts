export interface ChartTreeNode {
  /** 节点名称 */
  name: string
  /** 节点值（可选，用于控制节点大小） */
  value?: number
  /** 子节点数组 */
  children?: ChartTreeNode[]
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
    position?: 'left' | 'right' | 'top' | 'bottom' | 'inside'
    formatter?: string | ((params: any) => string)
  }
  /** 节点符号大小（可选） */
  symbolSize?: number | [number, number]
  /** 节点符号类型（可选） */
  symbol?: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
  /** 节点是否折叠（可选） */
  collapsed?: boolean
  /** 自定义数据（可选） */
  [key: string]: any
}

export type ChartTreeLayout = 'orthogonal' | 'radial'

export type ChartTreeOrient = 'LR' | 'RL' | 'TB' | 'BT'

export interface ChartTreeProps {
  /** 树形数据（根节点） */
  data?: ChartTreeNode
  /** 布局方式 */
  layout?: ChartTreeLayout
  /** 树的方向（仅用于 orthogonal 布局） */
  orient?: ChartTreeOrient
  /** 是否显示标签 */
  showLabel?: boolean
  /** 标签字体大小 */
  labelFontSize?: number
  /** 标签颜色 */
  labelColor?: string
  /** 标签位置 */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom'
  /** 节点大小 */
  nodeSize?: number | [number, number]
  /** 节点默认颜色 */
  nodeColor?: string
  /** 边默认颜色 */
  edgeColor?: string
  /** 边默认宽度 */
  edgeWidth?: number
  /** 边类型 */
  edgeType?: 'polyline' | 'curve'
  /** 是否显示边的标签 */
  showEdgeLabel?: boolean
  /** 是否启用动画 */
  animation?: boolean
  /** 动画持续时间（毫秒） */
  animationDuration?: number
  /** 是否启用缩放和平移 */
  roam?: boolean | 'scale' | 'move'
  /** 是否启用节点展开/折叠 */
  expandAndCollapse?: boolean
  /** 初始展开层级（-1 表示全部展开） */
  initialTreeDepth?: number
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
  /** 叶子节点配置 */
  leaves?: {
    label?: {
      show?: boolean
      position?: 'left' | 'right' | 'top' | 'bottom'
    }
  }
  /** 完全自定义的 ECharts 配置项，传入后将以 options 为准，忽略其他属性 */
  options?: any
}

