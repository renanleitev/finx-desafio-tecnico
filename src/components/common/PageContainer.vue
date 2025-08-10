<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex flex-wrap items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
            <p v-if="subtitle" class="mt-4 text-gray-600">{{ subtitle }}</p>
            <BaseButton
              v-if="backRouteName"
              variant="outline"
              size="sm"
              @click="goBack"
              class="flex items-center mt-4"
            >
              <svg
                class="mr-2 h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </BaseButton>
          </div>

          <div class="mt-4 flex items-center space-x-2">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">F</span>
            </div>
            <span class="text-xl font-bold text-gray-900">Fin-X</span>
          </div>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  title: string
  subtitle?: string
  backRouteName?: string
}>()


const router = useRouter()

function goBack() {
  if (props.backRouteName) {
    router.push({ name: props.backRouteName })
  }
}
</script>
