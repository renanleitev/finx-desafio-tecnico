<template>
  <PageContainer
    title="Agendamentos Cirúrgicos"
    subtitle="Gerencie e visualize agendamentos de cirurgias"
  >
    <ScheduleFilters
      :filters="filters"
      :has-filters="hasFilters"
      @apply-filters="applyFilters"
      @clear-filters="clearFilters"
    />

    <ScheduleList
      :schedules="schedules"
      :loading="loading"
      :error="error"
      :is-empty="isEmpty"
      :has-filters="hasFilters"
      :pagination="pagination"
      :sort-order="sorting.sortOrder"
      :can-go-prev="canGoPrev"
      :can-go-next="canGoNext"
      @toggle-sort="toggleSort"
      @change-items-per-page="changeItemsPerPage"
      @go-to-page="goToPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @retry-fetch="fetchSchedules"
      @schedule-deleted="fetchSchedules"
    />
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ScheduleFilters from '../components/surgical-schedules/ScheduleFilters.vue'
import ScheduleList from '../components/surgical-schedules/ScheduleList.vue'
import { useSchedules } from '../composables/useSchedules'
import PageContainer from '@/components/common/PageContainer.vue'

const {
  schedules,
  loading,
  error,
  filters,
  pagination,
  sorting,
  hasFilters,
  isEmpty,
  canGoNext,
  canGoPrev,
  fetchSchedules,
  applyFilters,
  clearFilters,
  goToPage,
  nextPage,
  prevPage,
  toggleSort,
  changeItemsPerPage,
} = useSchedules()

onMounted(() => {
  fetchSchedules()
})
</script>
