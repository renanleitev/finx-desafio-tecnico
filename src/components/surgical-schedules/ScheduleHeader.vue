<template>
  <div
    class="bg-white border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between"
  >
    <div class="flex flex-col space-x-4">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">Agendamentos Cirúrgicos</h2>

      <div class="flex items-center space-x-2 mb-2 text-sm text-gray-500">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ totalItems }} resultado(s)</span>
      </div>
    </div>

    <div class="flex items-end space-x-3">
      <BaseButton
        variant="outline"
        size="sm"
        @click="$emit('toggle-sort')"
        class="whitespace-nowrap"
        :label="'Ordenação'"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="sortOrder === 'desc' ? 'M19 14l-7 7m0 0l-7-7m7 7V3' : 'M5 10l7-7m0 0l7 7m-7-7v18'"
          />
        </svg>
        {{ sortOrder === 'desc' ? 'Mais Recente' : 'Mais Antigo' }}
      </BaseButton>

      <BaseSelect
        :model-value="itemsPerPage"
        @update:model-value="onItemsPerPageChange"
        :options="[
          { value: 5, label: '5 itens' },
          { value: 10, label: '10 itens' },
          { value: 20, label: '20 itens' },
        ]"
        label="Itens por página"
        placeholder="Selecione..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSelect from '../common/BaseSelect.vue'
import type { SortOrder } from '@/types/api'

interface Props {
  totalItems: number
  loading: boolean
  sortOrder: SortOrder
  itemsPerPage: number
}

defineProps<Props>()
const emit = defineEmits<{
  refresh: []
  'toggle-sort': []
  'change-items-per-page': [items: number]
}>()

function onItemsPerPageChange(value: string | number) {
  emit('change-items-per-page', Number(value))
}
</script>
