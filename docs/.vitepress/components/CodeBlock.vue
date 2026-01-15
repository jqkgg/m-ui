<template>
  <div class="code-block-wrapper">
    <div class="code-block-header" @click="toggle">
      <span class="code-block-title">查看代码</span>
      <svg
        class="code-block-icon"
        :class="{ 'is-expanded': isExpanded }"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path
          d="M482.133333 725.333333L170.666667 413.866667c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0L512 648.533333l281.6-293.866666c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733333L541.866667 725.333333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z"
          fill="currentColor"
        />
      </svg>
    </div>
    <transition name="slide-fade">
      <div v-show="isExpanded" class="code-block-content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)

const toggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.code-block-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
  /* margin: 16px 0; */
  overflow: hidden;
  border-top: none;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.code-block-header:hover {
  background-color: var(--vp-c-bg-alt);
}

.code-block-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.code-block-icon {
  transition: transform 0.3s;
  color: var(--vp-c-text-2);
}

.code-block-icon.is-expanded {
  transform: rotate(180deg);
}

.code-block-content {
  border-top: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* 代码块样式覆盖 */
.code-block-content :deep(pre) {
  margin: 0;
  border-radius: 0;
  background-color: var(--vp-code-block-bg);
}

.code-block-content :deep(.vp-code-group) {
  margin: 0;
}
</style>

