<template>
  <PageContainer
    :title="`${isEdit ? 'Editar' : 'Cadastrar'} Consulta`"
    backRouteName="SchedulesView"
  >
    <form
      @submit.prevent="handleSubmit"
      class="mx-auto p-6 bg-white rounded shadow space-y-6 mb-12"
    >
      <BaseInput v-model="form.medico.nome" label="Médico" placeholder="Nome do médico" required />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.medico.especialidade"
          label="Especialidade"
          placeholder="Especialidade"
          required
        />
        <BaseInput v-model="form.medico.crm" label="CRM" placeholder="CRM" required />
      </div>

      <BaseInput
        v-model="form.paciente.nome"
        label="Paciente"
        placeholder="Nome do paciente"
        required
      />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.paciente.dataNascimento"
          type="date"
          label="Data de Nascimento"
          required
        />
        <BaseInput
          v-model="form.paciente.telefone"
          type="tel"
          label="Telefone"
          placeholder="(xx) xxxx-xxxx"
          required
        />
        <div class="col-span-2">
          <BaseInput
            v-model="form.paciente.email"
            type="email"
            label="Email"
            placeholder="email@exemplo.com"
            required
          />
        </div>
      </div>

      <BaseInput
        v-model="form.dataAgendamento"
        type="datetime-local"
        label="Data e Hora do Agendamento"
        required
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1" for="observacoes">
          Observações
        </label>
        <textarea
          id="observacoes"
          v-model="form.observacoes"
          rows="3"
          placeholder="Observações adicionais"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>

      <div v-if="isEdit && form.status">
        <BaseSelect v-model="form.status" label="Status" :options="statusOptions" required />
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
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import { useToast } from 'vue-toast-notification'
import type { ErrorMessage } from '@/types/error'
import { statusOptions } from '@/constants/status'

const route = useRoute()
const router = useRouter()
const $toast = useToast()
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
