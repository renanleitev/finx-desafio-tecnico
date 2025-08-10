export interface PaginationInfo {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPageUrl: string | null
  prevPageUrl: string | null
}

export interface FiltersInfo {
  applied: string[]
  available: string[]
}

export interface SortingInfo {
  sortBy?: string
  sortOrder?: SortOrder
  available: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T[]
  pagination: PaginationInfo
  filters: FiltersInfo
  sorting: SortingInfo
}

export interface ScheduleFilters {
  medico?: string
  paciente?: string
  dataCriacao?: string
  status?: string
  especialidade?: string
}

export interface ScheduleParams extends ScheduleFilters {
  paginaAtual: number
  itensPorPagina: number
  ordenacao?: SortOrder
}

export type SortOrder = 'asc' | 'desc'
