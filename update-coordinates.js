const fs = require('fs');
const path = require('path');

// 读取 test.js 文件
const testJsPath = path.join(__dirname, 'src/assets/geo/test.js');
const jsonPath = path.join(__dirname, 'src/assets/geo/chongqing-district.json');

console.log('正在读取 test.js 文件...');
const testJsContent = fs.readFileSync(testJsPath, 'utf-8');

// 解析 test.js 文件，提取 coordinates 映射
console.log('正在解析 test.js 文件...');
const coordinatesMap = {};

// 使用正则表达式提取 unique_id 和对应的 coordinates
// 匹配模式: 'unique_id': 'xxxxx' ... 'coordinates': [ '...' ]
// 注意：coordinates 字符串可能包含转义字符，需要匹配到下一个单引号之前的所有内容
const featureRegex = /'unique_id':\s*'([^']+)'[\s\S]*?'coordinates':\s*\[\s*'((?:[^'\\]|\\.)*)'\s*\]/g;
let match;

while ((match = featureRegex.exec(testJsContent)) !== null) {
  const uniqueId = match[1];
  // 保持原始字符串，包括转义字符
  let coordinates = match[2];
  // 在 JavaScript 字符串中，\\ 表示单个反斜杠，需要转换为 JSON 格式的 \\
  // 但这里我们直接使用原始值，因为 JSON.stringify 会自动处理
  coordinatesMap[uniqueId] = coordinates;
}

console.log(`从 test.js 中提取了 ${Object.keys(coordinatesMap).length} 个街镇的 coordinates`);

// 读取 JSON 文件
console.log('正在读取 chongqing-district.json 文件...');
const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
const jsonData = JSON.parse(jsonContent);

// 统计更新数量
let updateCount = 0;
let notFoundCount = 0;

// 遍历所有区县
for (const districtName in jsonData) {
  const district = jsonData[districtName];
  if (district.type === 'FeatureCollection' && district.features) {
    // 遍历该区县下的所有 features
    for (const feature of district.features) {
      if (feature.properties && feature.properties.unique_id) {
        const uniqueId = feature.properties.unique_id;
        
        if (coordinatesMap[uniqueId]) {
          // 更新 coordinates
          if (feature.geometry && feature.geometry.coordinates) {
            // 确保 coordinates 是数组格式
            if (Array.isArray(feature.geometry.coordinates) && feature.geometry.coordinates.length > 0) {
              // 替换第一个元素（字符串）的内容
              feature.geometry.coordinates[0] = coordinatesMap[uniqueId];
              updateCount++;
            }
          }
        } else {
          notFoundCount++;
          console.log(`警告: 未找到 unique_id ${uniqueId} (${feature.properties.name || '未知'}) 对应的 coordinates`);
        }
      }
    }
  }
}

console.log(`\n更新完成:`);
console.log(`- 成功更新: ${updateCount} 个街镇`);
console.log(`- 未找到匹配: ${notFoundCount} 个街镇`);

// 写回文件
console.log('正在保存更新后的文件...');
fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4), 'utf-8');
console.log('文件保存完成！');

