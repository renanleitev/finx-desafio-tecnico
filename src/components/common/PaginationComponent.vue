<template>
  <div class="flex items-center justify-between">
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        :disabled="!canGoPrev"
        @click="$emit('prev-page')"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
      >
        Anterior
      </button>
      <button
        :disabled="!canGoNext"
        @click="$emit('next-page')"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
      >
        Próxima
      </button>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Página <span class="font-medium">{{ currentPage }}</span> de
          <span class="font-medium">{{ totalPages }}</span>
        </p>
      </div>

      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button
            :disabled="!canGoPrev"
            @click="$emit('prev-page')"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page === '...'"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              disabled
            >
              ...
            </button>
            <button
              v-else-if="typeof page === 'number'"
              @click="$emit('go-to-page', page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium enabled:cursor-pointer',
                page === currentPage
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            :disabled="!canGoNext"
            @click="$emit('next-page')"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  canGoPrev: boolean
  canGoNext: boolean
}

const props = defineProps<Props>()

defineEmits<{
  'go-to-page': [page: number]
  'prev-page': []
  'next-page': []
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.currentPage
  const total = props.totalPages

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (current <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})
</script>
