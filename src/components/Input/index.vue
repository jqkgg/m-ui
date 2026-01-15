<template>
  <div class="m-input" :class="{ 'is-disabled': disabled }">
    <input
      :class="[
        'm-input__inner',
        {
          'is-disabled': disabled,
          'is-error': error
        }
      ]"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'change': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}
</script>

<style lang="scss" scoped>
.m-input {
  @apply relative text-sm inline-block w-full;

  &__inner {
    @apply appearance-none bg-white border border-mui-border rounded;
    @apply box-border text-mui-text inline-block text-sm;
    @apply h-10 leading-10 outline-none px-4 w-full;
    @apply transition-colors duration-200 ease-in-out;

    &:hover {
      @apply border-mui-text-placeholder;
    }

    &:focus {
      @apply outline-none border-primary;
    }

    &::placeholder {
      @apply text-mui-text-placeholder;
    }

    &.is-disabled {
      @apply bg-gray-50 border-mui-border-light text-mui-text-disabled cursor-not-allowed;

      &::placeholder {
        @apply text-mui-text-disabled;
      }
    }

    &.is-error {
      @apply border-danger;

      &:focus {
        @apply border-danger;
      }
    }
  }

  &.is-disabled .m-input__inner {
    @apply bg-gray-50 border-mui-border-light text-mui-text-disabled cursor-not-allowed;
  }
}
</style>
