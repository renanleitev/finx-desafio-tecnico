<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Filtros</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BaseInput
        v-model="localFilters.medico"
        type="text"
        label="Médico"
        placeholder="Nome do médico"
      />

      <BaseInput
        v-model="localFilters.paciente"
        type="text"
        label="Paciente"
        placeholder="Nome do paciente"
      />

      <BaseInput v-model="localFilters.dataCriacao" type="date" label="Data de Criação" />

      <BaseInput
        v-model="localFilters.especialidade"
        type="text"
        label="Especialidade"
        placeholder="Nome da especialidade"
      />

      <BaseSelect
        v-model="localFilters.status!"
        label="Status"
        :options="statusOptions"
        placeholder="Escolha um status..."
      />

    </div>

    <div class="mt-4 flex justify-end space-x-6">
      <BaseButton v-if="hasFilters" variant="outline" size="sm" @click="clearAllFilters">
        Limpar Filtros
      </BaseButton>
      <BaseButton @click="applyFilters">Pesquisar</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '../common/BaseSelect.vue'
import type { ScheduleFilters } from '@/types/schedule'
import { statusOptions } from '@/constants/status'

interface Props {
  filters: ScheduleFilters
  hasFilters: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'apply-filters': [filters: ScheduleFilters]
  'clear-filters': []
}>()

const localFilters = reactive<ScheduleFilters>({
  medico: props.filters.medico || '',
  paciente: props.filters.paciente || '',
  dataCriacao: props.filters.dataCriacao || '',
  dataAgendamento: props.filters.dataAgendamento || '',
  especialidade: props.filters.especialidade || '',
  status: props.filters.status || '',
})

function applyFilters() {
  emit('apply-filters', { ...localFilters })
}

function clearAllFilters() {
  Object.keys(localFilters).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(localFilters as any)[key] = ''
  })
  emit('clear-filters')
}

watch(
  () => props.filters,
  (newFilters) => {
    Object.assign(localFilters, newFilters)
  },
  { deep: true },
)
</script>
