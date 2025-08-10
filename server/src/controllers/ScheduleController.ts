import { Request, Response } from 'express'
import { ScheduleService } from '../services/ScheduleService'
import { IFilters } from '../types/database'
import { IPaginationParams, ISortParams } from '../types/api'
import { ApiResponse } from '../types/api'
import { PaginationUtils } from '../utils/pagination'
import { SortUtils } from '../utils/sorting'

export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  async getAllSchedules(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = '1',
        limit = '10',
        sortBy = 'dataCriacao',
        sortOrder = 'desc',
        medico = '',
        paciente = '',
        dataCriacao = '',
        status = '',
        especialidade = '',
      } = req.query

      // Validar e converter parâmetros de paginação
      const paginationParams: IPaginationParams = PaginationUtils.validatePaginationParams(
        page as string,
        limit as string,
      )

      // Validar parâmetros de ordenação
      const sortByStr = sortBy as string
      const sortOrderStr = sortOrder as string

      const sortParams: ISortParams = {
        sortBy: SortUtils.isValidSortField(sortByStr) ? sortByStr : 'dataCriacao',
        sortOrder: SortUtils.isValidSortOrder(sortOrderStr) ? sortOrderStr : 'desc',
      }

      // Preparar filtros
      const filters: IFilters = {
        medico: (medico as string)?.trim(),
        paciente: (paciente as string)?.trim(),
        dataCriacao: (dataCriacao as string)?.trim(),
        status: (status as string)?.trim(),
        especialidade: (especialidade as string)?.trim(),
      }

      const result = await this.scheduleService.getAllSchedules(
        filters,
        paginationParams,
        sortParams,
      )

      const response: ApiResponse = {
        success: true,
        data: result.data,
        pagination: result.paginationInfo,
        filters: result.filterInfo,
        sorting: result.sortingInfo,
      }

      res.json(response)
    } catch (error) {
      this.handleError(res, error, 'Erro ao buscar agendamentos')
    }
  }

  private handleError(res: Response, error: unknown, defaultMessage: string): void {
    res.status(500).json({
      success: false,
      message: defaultMessage,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    })
  }
}
