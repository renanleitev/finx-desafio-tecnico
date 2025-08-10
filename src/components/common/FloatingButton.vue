<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    <transition name="fade-scale">
      <div
        v-if="menuOpen"
        class="mt-2 mb-4 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 flex flex-col origin-top-right"
        style="transform-origin: top right"
      >
        <button
          @click="goTo('ScheduleCreate')"
          class="text-left px-4 py-2 hover:bg-blue-50 text-gray-800 text-sm font-medium enabled:cursor-pointer"
          type="button"
        >
          Cadastrar uma Consulta
        </button>
        <button
          @click="goTo('SchedulesView')"
          class="text-left px-4 py-2 hover:bg-blue-50 text-gray-800 text-sm font-medium enabled:cursor-pointer"
          type="button"
        >
          Ver Agendamentos
        </button>
      </div>
    </transition>

    <button
      @click="toggleMenu"
      type="button"
      class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 enabled:cursor-pointer"
      aria-label="Ações"
    >
      <svg
        v-if="!menuOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const menuOpen = ref(false)
const router = useRouter()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function goTo(routeName: string) {
  menuOpen.value = false
  router.push({ name: routeName })
}
</script>

<style>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
