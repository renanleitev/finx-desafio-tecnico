import { ref, reactive, computed, watch } from 'vue'
import { ScheduleService } from '@/services/scheduleService'
import { debounce } from '@/utils/debounce'
import type { Schedule, ScheduleFilters } from '@/types/schedule'
import type { SortOrder } from '@/types/api'

export function useSchedules() {
  const schedules = ref<Schedule[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // filtros para enviar e mostrar (valores atuais)
  const filters = reactive<ScheduleFilters>({
    medico: '',
    paciente: '',
    dataCriacao: '',
    status: '',
    especialidade: '',
  })

  // paginação conforme API
  const pagination = reactive({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null,
  })

  // filtros aplicados e disponíveis vindos da API
  const filtersInfo = reactive({
    applied: [] as string[],
    available: [] as string[],
  })

  // ordenação conforme API
  const sorting = reactive({
    sortBy: 'dataCriacao',
    sortOrder: 'desc' as SortOrder,
    available: [] as string[],
  })

  const hasFilters = computed(() =>
    Object.values(filters).some((value) => value && value.trim() !== ''),
  )

  const isEmpty = computed(() => schedules.value.length === 0 && !loading.value)
  const canGoNext = computed(() => pagination.hasNextPage)
  const canGoPrev = computed(() => pagination.hasPrevPage)

  async function fetchSchedules() {
    try {
      loading.value = true
      error.value = null

      const params = {
        paginaAtual: pagination.currentPage,
        itensPorPagina: pagination.itemsPerPage,
        ordenacao: sorting.sortOrder,
        ...filters,
      }

      const response = await ScheduleService.getSchedules(params)

      if (!response.success) {
        throw new Error('Falha ao carregar agendamentos')
      }

      schedules.value = response.data

      // Atualiza paginação conforme resposta
      pagination.currentPage = response.pagination.currentPage
      pagination.itemsPerPage = response.pagination.itemsPerPage
      pagination.totalPages = response.pagination.totalPages
      pagination.totalItems = response.pagination.totalItems
      pagination.hasNextPage = response.pagination.hasNextPage
      pagination.hasPrevPage = response.pagination.hasPrevPage
      pagination.nextPageUrl = response.pagination.nextPageUrl
      pagination.prevPageUrl = response.pagination.prevPageUrl

      // Atualiza filtros aplicados e disponíveis
      filtersInfo.applied = response.filters.applied
      filtersInfo.available = response.filters.available

      // Atualiza info de ordenação
      sorting.sortBy = response.sorting.sortBy as string
      sorting.sortOrder = response.sorting.sortOrder as SortOrder
      sorting.available = response.sorting.available
    } catch (err) {
      error.value = 'Erro ao carregar agendamentos. Tente novamente.'
      console.error('Erro ao buscar agendamentos:', err)
    } finally {
      loading.value = false
    }
  }

  const debouncedSearch = debounce(fetchSchedules, 500)

  function applyFilters(newFilters: Partial<ScheduleFilters>) {
    Object.assign(filters, newFilters)
    pagination.currentPage = 1
    debouncedSearch()
  }

  function clearFilters() {
    ;(Object.keys(filters) as Array<keyof ScheduleFilters>).forEach((key) => {
      filters[key] = ''
    })
    pagination.currentPage = 1
    fetchSchedules()
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= pagination.totalPages) {
      pagination.currentPage = page
      fetchSchedules()
    }
  }

  function nextPage() {
    if (canGoNext.value) {
      goToPage(pagination.currentPage + 1)
    }
  }

  function prevPage() {
    if (canGoPrev.value) {
      goToPage(pagination.currentPage - 1)
    }
  }

  function toggleSort() {
    sorting.sortOrder = sorting.sortOrder === 'desc' ? 'asc' : 'desc'
    fetchSchedules()
  }

  function changeItemsPerPage(items: number) {
    pagination.itemsPerPage = items
    pagination.currentPage = 1
    fetchSchedules()
  }

  watch(
    () => [
      filters.medico,
      filters.paciente,
      filters.dataCriacao,
      filters.status,
      filters.especialidade,
    ],
    () => {
      pagination.currentPage = 1
      debouncedSearch()
    },
    { deep: true },
  )

  return {
    schedules,
    loading,
    error,
    filters,
    filtersInfo,
    pagination,
    sorting,
    hasFilters,
    isEmpty,
    canGoNext,
    canGoPrev,
    fetchSchedules,
    applyFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
    toggleSort,
    changeItemsPerPage,
  }
}
