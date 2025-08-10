<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <ScheduleHeader
      :totalItems="pagination.totalItems"
      :loading="loading"
      :sortOrder="sortOrder"
      :itemsPerPage="pagination.itemsPerPage"
      @toggle-sort="toggleSort"
      @change-items-per-page="changeItemsPerPage"
    />

    <div v-if="loading" class="p-8 text-center">
      <div class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Carregando agendamentos...
      </div>
    </div>

    <div v-else-if="error" class="p-8 text-center">
      <div class="text-red-600 mb-4">{{ error }}</div>
      <BaseButton @click="retryFetch">Tentar Novamente</BaseButton>
    </div>

    <div v-else-if="isEmpty" class="p-8 text-center text-gray-500">
      <svg
        class="mx-auto h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
      <p class="text-gray-600">
        {{
          hasFilters
            ? 'Tente ajustar os filtros para encontrar mais resultados.'
            : 'Não há agendamentos cadastrados ainda.'
        }}
      </p>
    </div>

    <div v-else>
      <div class="divide-y divide-gray-200">
        <ScheduleItem v-for="schedule in schedules" :key="schedule.id" :schedule="schedule" />
      </div>

      <div class="px-6 py-4 border-t border-gray-200">
        <PaginationComponent
          :current-page="pagination.currentPage"
          :total-pages="pagination.totalPages"
          :can-go-prev="canGoPrev"
          :can-go-next="canGoNext"
          @go-to-page="goToPage"
          @prev-page="prevPage"
          @next-page="nextPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../common/BaseButton.vue'
import ScheduleItem from './ScheduleItem.vue'
import ScheduleHeader from './ScheduleHeader.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'
import type { Schedule } from '@/types/schedule'
import type { PaginationInfo } from '@/types/pagination'
import type { SortOrder } from '@/types/api'

interface Props {
  schedules: Schedule[]
  loading: boolean
  error: string | null
  isEmpty: boolean
  hasFilters: boolean
  pagination: PaginationInfo
  sortOrder: SortOrder
  canGoPrev: boolean
  canGoNext: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'toggle-sort': []
  'change-items-per-page': [items: number]
  'go-to-page': [page: number]
  'prev-page': []
  'next-page': []
  'retry-fetch': []
}>()

function changeItemsPerPage(items: number) {
  emit('change-items-per-page', items)
}

function toggleSort() {
  emit('toggle-sort')
}

function goToPage(page: number) {
  emit('go-to-page', page)
}

function prevPage() {
  emit('prev-page')
}

function nextPage() {
  emit('next-page')
}

function retryFetch() {
  emit('retry-fetch')
}
</script>
