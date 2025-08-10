<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
    <div class="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirmar exclusão</h3>
      <p class="text-sm text-gray-600 mb-6">Tem certeza que deseja apagar este agendamento?</p>
      <div class="flex justify-end gap-3">
        <BaseButton variant="outline" size="sm" @click="$emit('cancel')"> Cancelar </BaseButton>
        <BaseButton variant="danger" size="sm" @click="$emit('confirm')"> Sim, apagar </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../common/BaseButton.vue'

interface Props {
  show: boolean
}

defineProps<Props>()

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>
