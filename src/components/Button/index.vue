<template>
  <button
    :class="[
      'm-button',
      `m-button--${type}`,
      `m-button--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="m-button__loading">
      <svg class="m-button__loading-icon" viewBox="0 0 1024 1024">
        <path d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zM64 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm640 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H736a32 32 0 0 1-32-32zM195.2 195.2a32 32 0 0 1 45.248 0l135.744 135.744a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l135.744 135.68a32 32 0 0 1-45.248 45.312L783.552 783.616a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm640 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H736a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l135.744-135.744a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l135.68-135.744a32 32 0 0 1 45.312 45.248L783.616 330.752a32 32 0 0 1-45.248 0z" fill="currentColor"></path>
      </svg>
    </span>
    <span v-if="$slots.default" class="m-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { ButtonProps } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  circle: false,
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.m-button {
  @apply inline-flex items-center justify-center leading-none whitespace-nowrap cursor-pointer;
  @apply bg-white border border-mui-border text-mui-text text-center;
  @apply outline-none m-0 font-medium transition-all duration-300;
  @apply select-none align-middle;
  @apply px-5 py-3 text-sm rounded;

  &:hover {
    @apply text-primary border-primary bg-blue-50;
  }

  &:active {
    @apply text-primary-dark border-primary-dark outline-none;
  }

  &.is-disabled,
  &.is-disabled:hover,
  &.is-disabled:active {
    @apply text-mui-text-disabled cursor-not-allowed bg-white border-mui-border-light;
  }

  // 类型样式
  &--primary {
    @apply text-white bg-primary border-primary;

    &:hover {
      @apply bg-primary-light border-primary-light text-white;
    }

    &:active {
      @apply bg-primary-dark border-primary-dark text-white;
    }
  }

  &--success {
    @apply text-white bg-success border-success;

    &:hover {
      @apply bg-success-light border-success-light text-white;
    }
  }

  &--warning {
    @apply text-white bg-warning border-warning;

    &:hover {
      @apply bg-warning-light border-warning-light text-white;
    }
  }

  &--danger {
    @apply text-white bg-danger border-danger;

    &:hover {
      @apply bg-danger-light border-danger-light text-white;
    }
  }

  &--info {
    @apply text-white bg-info border-info;

    &:hover {
      @apply bg-info-light border-info-light text-white;
    }
  }

  // 朴素按钮
  &.is-plain {
    @apply bg-white;
  }

  &--primary.is-plain {
    @apply text-primary bg-blue-50 border-blue-300;

    &:hover {
      @apply bg-primary border-primary text-white;
    }
  }

  &--success.is-plain {
    @apply text-success bg-green-50 border-green-300;

    &:hover {
      @apply bg-success border-success text-white;
    }
  }

  &--warning.is-plain {
    @apply text-warning bg-yellow-50 border-yellow-300;

    &:hover {
      @apply bg-warning border-warning text-white;
    }
  }

  &--danger.is-plain {
    @apply text-danger bg-red-50 border-red-300;

    &:hover {
      @apply bg-danger border-danger text-white;
    }
  }

  &--info.is-plain {
    @apply text-info bg-gray-100 border-gray-300;

    &:hover {
      @apply bg-info border-info text-white;
    }
  }

  // 尺寸
  &--large {
    @apply px-6 py-3.5 text-base rounded;
  }

  &--medium {
    @apply px-5 py-3 text-sm rounded;
  }

  &--small {
    @apply px-4 py-2 text-xs rounded-sm;
  }

  &--mini {
    @apply px-3 py-1.5 text-xs rounded-sm;
  }

  // 圆角
  &.is-round {
    @apply rounded-full px-6 py-3;
  }

  &.is-circle {
    @apply rounded-full p-3;

    &.m-button--large {
      @apply p-3.5;
    }

    &.m-button--small {
      @apply p-2;
    }

    &.m-button--mini {
      @apply p-1.5;
    }
  }

  // 加载状态
  &__loading {
    @apply inline-flex items-center mr-1;
  }

  &__loading-icon {
    @apply w-3.5 h-3.5;
    animation: rotating 2s linear infinite;
  }

  &__content {
    @apply inline-flex items-center justify-center;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
