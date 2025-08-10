<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold select-none',
      statusColors[status]?.bg,
      statusColors[status]?.text,
      statusColors[status]?.border,
    ]"
  >
    {{ statusLabels[status] || status }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: string
}
defineProps<Props>()

const statusLabels: Record<string, string> = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
  concluido: 'Concluído',
  // outros status que precisar
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  agendado: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border border-yellow-300',
  },
  confirmado: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border border-green-300',
  },
  cancelado: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border border-red-300',
  },
  concluido: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border border-blue-300',
  },
}
</script>
