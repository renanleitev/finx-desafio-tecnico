import { Request, Response } from 'express'
import { ScheduleService } from '../services/ScheduleService'
import { IFilters, ICreateSchedule } from '../types/database'
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

  async getScheduleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const scheduleId = Number.parseInt(id)

      if (isNaN(scheduleId)) {
        res.status(400).json({
          success: false,
          message: 'ID do agendamento deve ser um número válido',
        })
        return
      }

      const schedule = await this.scheduleService.getScheduleById(scheduleId)

      const response: ApiResponse = {
        success: true,
        data: schedule,
      }

      res.json(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes('não encontrado')) {
        res.status(404).json({
          success: false,
          message: error.message,
        })
      } else {
        this.handleError(res, error, 'Erro ao buscar agendamento')
      }
    }
  }

  async createSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { medico, paciente, dataAgendamento, observacoes } = req.body

      // Validações básicas
      if (!medico || !medico.nome) {
        res.status(400).json({
          success: false,
          message: 'Dados do médico são obrigatórios',
        })
        return
      }

      if (!paciente || !paciente.nome) {
        res.status(400).json({
          success: false,
          message: 'Dados do paciente são obrigatórios',
        })
        return
      }

      if (!dataAgendamento) {
        res.status(400).json({
          success: false,
          message: 'Data de agendamento é obrigatória',
        })
        return
      }

      const scheduleData: ICreateSchedule = {
        medico,
        paciente,
        dataAgendamento,
        observacoes,
      }

      const newSchedule = await this.scheduleService.createSchedule(scheduleData)

      const response: ApiResponse = {
        success: true,
        data: newSchedule,
        message: 'Agendamento criado com sucesso',
      }

      res.status(201).json(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes('Dados inválidos')) {
        res.status(400).json({
          success: false,
          message: error.message,
        })
      } else {
        this.handleError(res, error, 'Erro ao criar agendamento')
      }
    }
  }

  async updateSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const scheduleId = parseInt(id)

      if (isNaN(scheduleId)) {
        res.status(400).json({
          success: false,
          message: 'ID do agendamento deve ser um número válido',
        })
        return
      }

      const updatedSchedule = await this.scheduleService.updateSchedule(scheduleId, req.body)

      const response: ApiResponse = {
        success: true,
        data: updatedSchedule,
        message: 'Agendamento atualizado com sucesso',
      }

      res.json(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes('não encontrado')) {
        res.status(404).json({
          success: false,
          message: error.message,
        })
      } else if (error instanceof Error && error.message.includes('Dados inválidos')) {
        res.status(400).json({
          success: false,
          message: error.message,
        })
      } else {
        this.handleError(res, error, 'Erro ao atualizar agendamento')
      }
    }
  }

  async deleteSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const scheduleId = parseInt(id)

      if (isNaN(scheduleId)) {
        res.status(400).json({
          success: false,
          message: 'ID do agendamento deve ser um número válido',
        })
        return
      }

      const deletedSchedule = await this.scheduleService.deleteSchedule(scheduleId)

      const response: ApiResponse = {
        success: true,
        data: deletedSchedule,
        message: 'Agendamento deletado com sucesso',
      }

      res.json(response)
    } catch (error) {
      if (error instanceof Error && error.message.includes('não encontrado')) {
        res.status(404).json({
          success: false,
          message: error.message,
        })
      } else {
        this.handleError(res, error, 'Erro ao deletar agendamento')
      }
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
