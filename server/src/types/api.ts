export interface ApiResponse {
  success: boolean
  data?: unknown
  message?: string
  error?: string
  pagination?: PaginationInfo
  filters?: FilterInfo
  sorting?: SortingInfo
}

export interface PaginationInfo {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPageUrl?: string | null
  prevPageUrl?: string | null
}

export interface FilterInfo {
  applied: string[]
  available: string[]
}

export interface SortingInfo {
  sortBy?: string
  sortOrder?: string
  available: string[]
}

export interface QueryParams {
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: string
  medico?: string
  paciente?: string
  dataCriacao?: string
  status?: string
  especialidade?: string
}

export interface IPaginationParams {
  page: number
  limit: number
}

export interface ISortParams {
  sortBy?: string
  sortOrder?: string
}
