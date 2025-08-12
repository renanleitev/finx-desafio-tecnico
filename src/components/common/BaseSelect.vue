<template>
  <div class="w-full">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1" aria-hidden="true">*</span>
    </label>

    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-required="required || undefined"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="describedById"
      :class="[selectClasses, modelValue === '' ? 'text-gray-400' : 'text-gray-900']"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled hidden>
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="text-gray-900"
      >
        {{ option.label }}
      </option>
    </select>

    <p v-if="error" :id="errorId" class="mt-1 text-sm text-red-600" role="alert">
      {{ error }}
    </p>

    <p v-else-if="hint" :id="hintId" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useId, computed } from 'vue'

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

const baseId = useId()
const selectId = `${baseId}-select`
const errorId = `${baseId}-error`
const hintId = `${baseId}-hint`

const describedById = computed(() => {
  if (props.error) return errorId
  if (props.hint) return hintId
  return undefined
})

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
