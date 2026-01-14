<template>
  <div class="demo-container">
    <h1>M-UI 组件库演示</h1>
    
    <section class="demo-section">
      <h2>Button 按钮</h2>
      <div class="demo-row">
        <MButton>默认按钮</MButton>
        <MButton type="primary">主要按钮</MButton>
        <MButton type="success">成功按钮</MButton>
        <MButton type="warning">警告按钮</MButton>
        <MButton type="danger">危险按钮</MButton>
        <MButton type="info">信息按钮</MButton>
      </div>
      
      <div class="demo-row">
        <MButton disabled>禁用按钮</MButton>
        <MButton type="primary" loading>加载中</MButton>
        <MButton type="primary" plain>朴素按钮</MButton>
        <MButton type="primary" round>圆角按钮</MButton>
        <MButton type="primary" circle>圆</MButton>
      </div>
      
      <div class="demo-row">
        <MButton size="large">大型按钮</MButton>
        <MButton size="medium">中等按钮</MButton>
        <MButton size="small">小型按钮</MButton>
        <MButton size="mini">超小按钮</MButton>
      </div>
    </section>
    
    <section class="demo-section">
      <h2>Input 输入框</h2>
      <div class="demo-row">
        <MInput v-model="inputValue" placeholder="请输入内容" />
        <MInput v-model="inputValue2" placeholder="禁用状态" disabled />
        <MInput v-model="inputValue3" placeholder="只读状态" readonly />
        <MInput v-model="inputValue4" placeholder="错误状态" error />
      </div>
      <div class="demo-row">
        <MInput v-model="password" type="password" placeholder="密码输入" />
        <MInput v-model="email" type="email" placeholder="邮箱输入" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MButton, MInput } from '../index'

const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('只读内容')
const inputValue4 = ref('')
const password = ref('')
const email = ref('')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background: #f5f5f5;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.demo-container h1 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #303133;
}

.demo-section {
  background: #fff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #303133;
}

.demo-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.demo-row .m-input {
  width: 200px;
}
</style>

