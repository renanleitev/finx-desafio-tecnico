<template>
  <div class="w-full">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :class="selectClasses"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>

      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>

    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number
  options: Option[]
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectId = useId()

const baseClasses =
  'block w-full px-3 py-2 rounded-md shadow-sm sm:text-sm transition-colors enabled:cursor-pointer'

const borderClasses = props.error
  ? 'border border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
  : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500'

const bgClasses = props.disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'

const selectClasses = [baseClasses, borderClasses, bgClasses].join(' ')

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
