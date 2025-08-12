<template>
  <div>
    <label v-if="label" :for="buttonId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1" aria-hidden="true">*</span>
    </label>

    <button
      :id="buttonId"
      :class="[...baseClasses, variantClasses[variant], sizeClasses[size]]"
      :disabled="disabled || loading"
      :aria-disabled="disabled || loading ? 'true' : undefined"
      :aria-busy="loading ? 'true' : undefined"
      :type="type"
      @click="$emit('click')"
    >
      <div v-if="loading" class="flex items-center">
        <svg
          class="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          role="status"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0
            5.373 0 12h4zm2 5.291A7.962 7.962
            0 014 12H0c0 3.042 1.135 5.824 3
            7.938l3-2.647z"
          />
        </svg>
        Carregando...
      </div>
      <slot v-else />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  label?: string
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

defineEmits<{
  click: []
}>()

const buttonId = useId()

const layoutClasses = 'inline-flex items-center justify-center py-2 rounded-md shadow-sm'
const typographyClasses = 'font-medium transition-colors'
const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2'
const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed'
const cursorClasses = 'enabled:cursor-pointer'

const baseClasses = [layoutClasses, typographyClasses, focusClasses, disabledClasses, cursorClasses]

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
}
</script>
