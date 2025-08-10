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
            <StatusChip :status="schedule.status" />
          </div>

          <div class="flex-shrink-0 flex gap-2">
            <BaseButton variant="primary" size="md" @click="goToEdit"> Editar </BaseButton>
            <BaseButton variant="danger" size="md" @click="openDeleteModal"> Apagar </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <DeleteModal :show="showDeleteModal" @cancel="closeDeleteModal" @confirm="confirmDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { formatDate, calculateAge } from '@/utils/dateUtils'
import { formatDoctorName } from '@/utils/formatters'
import type { Schedule } from '@/types/schedule'
import StatusChip from '../common/StatusChip.vue'
import BaseButton from '../common/BaseButton.vue'
import DeleteModal from '../common/DeleteModal.vue'
import { useRouter } from 'vue-router'
import { ScheduleService } from '@/services/scheduleService'
import type { ErrorMessage } from '@/types/error'
import { useToast } from 'vue-toast-notification'

interface Props {
  schedule: Schedule
}
const props = defineProps<Props>()

const emit = defineEmits<{
  deleted: [scheduleId: number]
}>()

const router = useRouter()

const $toast = useToast()

const showDeleteModal = ref(false)

function goToEdit() {
  router.push({ name: 'ScheduleEdit', params: { id: props.schedule.id } })
}

function openDeleteModal() {
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
}

async function confirmDelete() {
  try {
    await ScheduleService.deleteSchedule(props.schedule.id)
    closeDeleteModal()
    emit('deleted', props.schedule.id)
    $toast.success('Consulta apagada com sucesso!', { position: 'top-right' })
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    $toast.error((error as ErrorMessage).response?.data?.message || 'Erro ao apagar a consulta.', {
      position: 'top-right',
    })
    closeDeleteModal()
  }
}
</script>
