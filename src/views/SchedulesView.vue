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
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ScheduleFilters from '../components/surgical-schedules/ScheduleFilters.vue'
import { useSchedules } from '../composables/useSchedules'
import PageContainer from '@/components/common/PageContainer.vue'

const {
  filters,
  hasFilters,
  fetchSchedules,
  applyFilters,
  clearFilters,
} = useSchedules()

onMounted(() => {
  fetchSchedules()
})
</script>
