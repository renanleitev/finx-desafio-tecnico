<template>
  <PageContainer
    :title="`${isEdit ? 'Editar' : 'Cadastrar'} Consulta`"
    backRouteName="SchedulesView"
  >
    <form
      @submit.prevent="handleSubmit"
      class="mx-auto p-6 bg-white rounded shadow space-y-6 mb-12"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="medicoNome">Médico</label>
        <input
          id="medicoNome"
          v-model="form.medico.nome"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nome do médico"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="medicoEspecialidade"
            >Especialidade</label
          >
          <input
            id="medicoEspecialidade"
            v-model="form.medico.especialidade"
            type="text"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Especialidade"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="medicoCrm">CRM</label>
          <input
            id="medicoCrm"
            v-model="form.medico.crm"
            type="text"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="CRM"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="pacienteNome"
          >Paciente</label
        >
        <input
          id="pacienteNome"
          v-model="form.paciente.nome"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nome do paciente"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="pacienteDataNascimento"
            >Data de Nascimento</label
          >
          <input
            id="pacienteDataNascimento"
            v-model="form.paciente.dataNascimento"
            type="date"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="pacienteTelefone"
            >Telefone</label
          >
          <input
            id="pacienteTelefone"
            v-model="form.paciente.telefone"
            type="tel"
            required
            placeholder="(xx) xxxx-xxxx"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1" for="pacienteEmail"
            >Email</label
          >
          <input
            id="pacienteEmail"
            v-model="form.paciente.email"
            type="email"
            required
            placeholder="email@exemplo.com"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="dataAgendamento"
          >Data e Hora do Agendamento</label
        >
        <input
          id="dataAgendamento"
          v-model="form.dataAgendamento"
          type="datetime-local"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="observacoes"
          >Observações</label
        >
        <textarea
          id="observacoes"
          v-model="form.observacoes"
          rows="3"
          placeholder="Observações adicionais"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>

      <div v-if="isEdit">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="status">Status</label>
        <select
          id="status"
          v-model="form.status"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="agendado">Agendado</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
          <option value="concluido">Concluído</option>
        </select>
      </div>

      <div class="flex justify-end space-x-3">
        <BaseButton variant="secondary" size="md" type="button" @click="handleCancel">
          Cancelar
        </BaseButton>
        <BaseButton variant="primary" size="md" type="submit">
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </BaseButton>
      </div>
    </form>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, toRaw, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ScheduleService } from '@/services/scheduleService'
import type { ICreateSchedule, IUpdateSchedule } from '@/types/schedule'
import PageContainer from '@/components/common/PageContainer.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useToast } from 'vue-toast-notification'
import type { ErrorMessage } from '@/types/error'

const route = useRoute()
const router = useRouter()
const $toast = useToast()
console.log(route.params)
const scheduleId = route.params.id ? Number(route.params.id) : null
const isEdit = scheduleId !== null

const form = reactive<ICreateSchedule & Partial<{ status: string }>>({
  medico: {
    id: 0,
    nome: '',
    especialidade: '',
    crm: '',
  },
  paciente: {
    id: 0,
    nome: '',
    dataNascimento: '',
    telefone: '',
    email: '',
  },
  dataAgendamento: '',
  observacoes: '',
  status: undefined,
})

onMounted(async () => {
  if (isEdit && scheduleId) {
    try {
      const schedule = await ScheduleService.getScheduleById(scheduleId)
      form.medico = { ...schedule.medico }
      form.paciente = { ...schedule.paciente }
      form.dataAgendamento = schedule.dataAgendamento.slice(0, 16) // datetime-local
      form.observacoes = schedule.observacoes ?? ''
      form.status = schedule.status
    } catch (error) {
      $toast.error(
        (error as ErrorMessage).response?.data?.message || 'Erro ao obter dados da consulta.',
        {
          position: 'top-right',
        },
      )
      console.error(error)
    }
  }
})

function isValidPhone(phone: string): boolean {
  // Aceita formatos com ou sem parênteses, com 8 ou 9 dígitos no final
  const regex = /^(\(?\d{2}\)?\s?)?(9?\d{4})-?\d{4}$/
  return regex.test(phone)
}

async function handleSubmit() {
  if (!form.medico.nome || !form.paciente.nome || !form.dataAgendamento) {
    $toast.error('Preencha os campos obrigatórios.', { position: 'top-right' })
    return
  }

  if (!isValidPhone(form.paciente.telefone)) {
    $toast.error('Telefone inválido. Use o formato (xx) xxxxx-xxxx.', { position: 'top-right' })
    return
  }

  try {
    const submitData = {
      ...toRaw(form),
    }

    if (!isEdit) {
      delete submitData.status
      await ScheduleService.createSchedule(submitData as ICreateSchedule)
      $toast.success('Consulta cadastrada com sucesso!', { position: 'top-right' })
    } else {
      await ScheduleService.updateSchedule(scheduleId!, submitData as IUpdateSchedule)
      $toast.success('Consulta atualizada com sucesso!', { position: 'top-right' })
    }

    router.push({ name: 'SchedulesView' })
  } catch (error) {
    $toast.error((error as ErrorMessage).response?.data?.message || 'Erro ao salvar a consulta.', {
      position: 'top-right',
    })
    console.error(error)
  }
}

function handleCancel() {
  router.push({ name: 'SchedulesView' })
}
</script>
