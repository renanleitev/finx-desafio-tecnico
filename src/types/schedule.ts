import type { SortOrder } from './api'
import type { Patient } from './patient'
import type { Doctor } from './doctor'

export interface Schedule {
  id: number
  medico: Doctor
  paciente: Patient
  dataAgendamento: string
  dataCriacao: string
  status: string
  observacoes?: string
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

// Para criação e atualização continuam iguais
export interface ICreateSchedule {
  medico: Doctor
  paciente: Patient
  dataAgendamento: string
  observacoes?: string
}

export interface IUpdateSchedule extends Partial<ICreateSchedule> {
  status?: string
}

// Novo tipo para paginação conforme resposta do backend
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

// Interface para filtros aplicados e disponíveis da resposta
export interface FiltersInfo {
  applied: string[]
  available: string[]
}

// Interface para sorting da resposta
export interface SortingInfo {
  sortBy: keyof Schedule | string
  sortOrder: SortOrder
  available: string[]
}

// Interface completa da resposta da API de schedules, com base no JSON
export interface ScheduleApiResponse {
  success: boolean
  data: Schedule[]
  pagination: PaginationInfo
  filters: FiltersInfo
  sorting: SortingInfo
}
