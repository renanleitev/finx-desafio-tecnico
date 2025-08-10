import type { ApiResponse } from '@/types/api'
import type { ICreateSchedule, IUpdateSchedule, Schedule, ScheduleParams } from '@/types/schedule'
import { api } from './axios'

export class ScheduleService {
  static async getSchedules(params: ScheduleParams): Promise<ApiResponse<Schedule>> {
    try {
      const queryParams = new URLSearchParams()

      if (params.medico) queryParams.append('medico', params.medico)
      if (params.paciente) queryParams.append('paciente', params.paciente)
      if (params.dataCriacao) queryParams.append('dataCriacao', params.dataCriacao)
      if (params.status) queryParams.append('status', params.status)
      if (params.especialidade) queryParams.append('especialidade', params.especialidade)

      queryParams.append('page', params.paginaAtual.toString())
      queryParams.append('limit', params.itensPorPagina.toString())
      queryParams.append('sortBy', 'dataCriacao')
      queryParams.append('sortOrder', params.ordenacao || 'desc')

      const response = await api.get(`/schedules?${queryParams.toString()}`)

      return response.data
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
      throw error
    }
  }

  static async getScheduleById(id: number): Promise<Schedule> {
    const response = await api.get(`/schedules/${id}`)
    return response.data.data
  }

  // Criar agendamento
  static async createSchedule(data: ICreateSchedule): Promise<ApiResponse<Schedule>> {
    try {
      const response = await api.post('/schedules', data)
      return response.data
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      throw error
    }
  }

  // Atualizar agendamento
  static async updateSchedule(id: number, data: IUpdateSchedule): Promise<ApiResponse<Schedule>> {
    try {
      const response = await api.put(`/schedules/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
      throw error
    }
  }

  // Deletar agendamento
  static async deleteSchedule(id: number): Promise<ApiResponse<Schedule>> {
    try {
      const response = await api.delete(`/schedules/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error)
      throw error
    }
  }
}
