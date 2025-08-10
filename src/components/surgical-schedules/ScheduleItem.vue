<template>
  <div class="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex-1 min-w-0">
        <div
          class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:space-x-4 gap-3 sm:gap-0"
        >
          <div class="flex-shrink-0">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              #{{ schedule.id }}
            </span>
          </div>

          <div class="min-w-0 flex-1 space-y-2">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ formatDoctorName(schedule.medico.nome) }}
            </p>
            <p class="text-sm text-gray-500">CRM nº {{ schedule.medico.crm }}</p>
            <p class="text-sm text-gray-500">{{ schedule.medico.especialidade }}</p>
          </div>

          <div class="min-w-0 flex-1 space-y-2">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ schedule.paciente.nome }}
            </p>
            <p class="text-sm text-gray-500">
              {{ calculateAge(schedule.paciente.dataNascimento) }} ano(s)
            </p>
            <p class="text-sm text-gray-500">
              {{ schedule.paciente.telefone }} / {{ schedule.paciente.email }}
            </p>
          </div>

          <div class="min-w-0 flex-1 space-y-2">
            <p class="text-sm font-medium text-gray-900">
              {{ formatDate(schedule.dataCriacao) }}
            </p>
            <p class="text-sm text-gray-500">Data de Criação</p>
            <p class="text-sm text-gray-500">{{ schedule.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { formatDate, calculateAge } from '@/utils/dateUtils'
import { formatDoctorName } from '@/utils/formatters'
import type { Schedule } from '@/types/schedule'

interface Props {
  schedule: Schedule
}

defineProps<Props>()

defineEmits<{
  'view-details': [schedule: Schedule]
}>()
</script>
