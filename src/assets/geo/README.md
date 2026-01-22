# 地图GeoJSON数据

## 重庆地图数据获取

### 方式1：从阿里云DataV获取（推荐）

访问以下链接下载重庆地图GeoJSON数据：
- 重庆完整地图：https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json
- 或者访问：https://datav.aliyun.com/portal/school/atlas/area_selector 选择重庆市下载

### 方式2：从GitHub获取

ECharts官方测试数据：
- https://github.com/apache/echarts/tree/master/test/data/geo

### 使用说明

1. 下载重庆地图的GeoJSON文件
2. 将文件保存为 `chongqing.json` 放在此目录下
3. 组件会自动加载此文件作为默认地图数据

### 文件结构

```
src/assets/geo/
├── README.md              # 本说明文件
├── chongqing.json         # 重庆完整地图GeoJSON数据（需要手动下载）
└── chongqing-main.json    # 重庆主城区地图GeoJSON数据（可选，需要手动下载）
```

### 主城区说明

主城区包括九区：
- 渝北区
- 江北区
- 北碚区
- 沙坪坝区
- 渝中区
- 南岸区
- 九龙坡区
- 大渡口区
- 巴南区

**注意**：两江新区在阿里云地图数据中可能不存在，因此使用渝北区和江北区替代。

如果提供了 `chongqing-main.json`，组件会优先使用该文件作为主城区地图数据。
如果未提供，组件会从完整地图中筛选出主城区数据，或从阿里云API加载。

### 注意事项

- GeoJSON文件通常较大（几MB），建议使用压缩版本
- 确保GeoJSON数据的features中包含区县名称，名称需要与data中的name字段匹配
- 如果使用自定义GeoJSON，请确保数据结构符合ECharts地图要求

