import { ISchedule, IFilters } from '../types/database'
import { IPaginationParams, ISortParams, PaginationInfo } from '../types/api'
import { ScheduleRepository } from '../repositories/ScheduleRepository'
import { FilterUtils } from '../utils/filters'
import { SortUtils } from '../utils/sorting'
import { PaginationUtils } from '../utils/pagination'

export class ScheduleService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async getAllSchedules(
    filters: IFilters,
    pagination: IPaginationParams,
    sorting: ISortParams,
  ): Promise<{
    data: ISchedule[]
    paginationInfo: PaginationInfo
    filterInfo: { applied: string[]; available: string[] }
    sortingInfo: { sortBy?: string; sortOrder?: string; available: string[] }
  }> {
    try {
      // Buscar todos os agendamentos
      const allSchedules = await this.scheduleRepository.findAll()

      // Aplicar filtros
      const filteredData = FilterUtils.applyFilters(allSchedules, filters)

      // Aplicar ordenação
      const sortedData = SortUtils.applySort(filteredData, sorting)

      // Calcular informações de paginação
      const totalItems = sortedData.length
      const baseUrl = '/api/schedules'
      const queryParams = new URLSearchParams({
        limit: pagination.limit.toString(),
        ...(sorting.sortBy && { sortBy: sorting.sortBy }),
        ...(sorting.sortOrder && { sortOrder: sorting.sortOrder }),
        ...(filters.medico && { medico: filters.medico }),
        ...(filters.paciente && { paciente: filters.paciente }),
        ...(filters.dataCriacao && { dataCriacao: filters.dataCriacao }),
        ...(filters.status && { status: filters.status }),
        ...(filters.especialidade && { especialidade: filters.especialidade }),
      })

      const paginationInfo = PaginationUtils.createPaginationInfo(
        totalItems,
        pagination.page,
        pagination.limit,
        baseUrl,
        queryParams,
      )

      // Aplicar paginação
      const paginatedData = PaginationUtils.applyPagination(sortedData, pagination)

      return {
        data: paginatedData,
        paginationInfo,
        filterInfo: {
          applied: FilterUtils.getAppliedFilters(filters),
          available: FilterUtils.getAvailableFilters(),
        },
        sortingInfo: {
          sortBy: sorting.sortBy,
          sortOrder: sorting.sortOrder,
          available: SortUtils.getAvailableSortFields(),
        },
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      throw new Error(`Erro ao buscar agendamentos: ${errorMessage}`)
    }
  }

  async getScheduleById(id: number): Promise<ISchedule> {
    try {
      const schedule = await this.scheduleRepository.findById(id)

      if (!schedule) {
        throw new Error('Agendamento não encontrado')
      }

      return schedule
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      throw new Error(`Erro ao buscar agendamento: ${errorMessage}`)
    }
  }
}
