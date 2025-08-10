import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../types/api'

export class ValidationMiddleware {
  static validateScheduleCreation(req: Request, res: Response, next: NextFunction): void {
    const { medico, paciente, dataAgendamento } = req.body

    const errors: string[] = []

    // Validar médico
    if (!medico) {
      errors.push('Dados do médico são obrigatórios')
    } else {
      if (!medico.nome || medico.nome.trim().length < 2) {
        errors.push('Nome do médico deve ter pelo menos 2 caracteres')
      }
      if (medico.especialidade && medico.especialidade.trim().length < 2) {
        errors.push('Especialidade deve ter pelo menos 2 caracteres')
      }
      if (medico.crm && medico.crm.trim().length < 4) {
        errors.push('CRM deve ter pelo menos 4 caracteres')
      }
    }

    // Validar paciente
    if (!paciente) {
      errors.push('Dados do paciente são obrigatórios')
    } else {
      if (!paciente.nome || paciente.nome.trim().length < 2) {
        errors.push('Nome do paciente deve ter pelo menos 2 caracteres')
      }
      if (paciente.email && !ValidationMiddleware.isValidEmail(paciente.email)) {
        errors.push('Email do paciente é inválido')
      }
      if (paciente.dataNascimento && !ValidationMiddleware.isValidDate(paciente.dataNascimento)) {
        errors.push('Data de nascimento do paciente é inválida')
      }
    }

    // Validar data de agendamento
    if (!dataAgendamento) {
      errors.push('Data de agendamento é obrigatória')
    } else if (!ValidationMiddleware.isValidDate(dataAgendamento)) {
      errors.push('Data de agendamento é inválida')
    } else if (new Date(dataAgendamento) < new Date()) {
      errors.push('Data de agendamento não pode ser no passado')
    }

    if (errors.length > 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Dados de entrada inválidos',
        error: errors.join('; '),
      }

      res.status(400).json(response)
      return
    }

    next()
  }

  static validateScheduleUpdate(req: Request, res: Response, next: NextFunction): void {
    const { medico, paciente, dataAgendamento, status } = req.body

    const errors: string[] = []

    // Validar médico se fornecido
    if (medico) {
      if (medico.nome && medico.nome.trim().length < 2) {
        errors.push('Nome do médico deve ter pelo menos 2 caracteres')
      }
      if (medico.especialidade && medico.especialidade.trim().length < 2) {
        errors.push('Especialidade deve ter pelo menos 2 caracteres')
      }
      if (medico.crm && medico.crm.trim().length < 4) {
        errors.push('CRM deve ter pelo menos 4 caracteres')
      }
    }

    // Validar paciente se fornecido
    if (paciente) {
      if (paciente.nome && paciente.nome.trim().length < 2) {
        errors.push('Nome do paciente deve ter pelo menos 2 caracteres')
      }
      if (paciente.email && !ValidationMiddleware.isValidEmail(paciente.email)) {
        errors.push('Email do paciente é inválido')
      }
      if (paciente.dataNascimento && !ValidationMiddleware.isValidDate(paciente.dataNascimento)) {
        errors.push('Data de nascimento do paciente é inválida')
      }
    }

    // Validar data de agendamento se fornecida
    if (dataAgendamento) {
      if (!ValidationMiddleware.isValidDate(dataAgendamento)) {
        errors.push('Data de agendamento é inválida')
      } else if (new Date(dataAgendamento) < new Date()) {
        errors.push('Data de agendamento não pode ser no passado')
      }
    }

    // Validar status se fornecido
    if (status) {
      const validStatuses = ['agendado', 'confirmado', 'cancelado']
      if (!validStatuses.includes(status)) {
        errors.push('Status deve ser: agendado, confirmado ou cancelado')
      }
    }

    if (errors.length > 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Dados de entrada inválidos',
        error: errors.join('; '),
      }

      res.status(400).json(response)
      return
    }

    next()
  }

  static validateIdParam(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params
    const numericId = parseInt(id)

    if (isNaN(numericId) || numericId <= 0) {
      const response: ApiResponse = {
        success: false,
        message: 'ID deve ser um número válido maior que zero',
      }

      res.status(400).json(response)
      return
    }

    next()
  }

  static validatePaginationParams(req: Request, res: Response, next: NextFunction): void {
    const { page, limit } = req.query
    const errors: string[] = []

    if (page) {
      const pageNum = parseInt(page as string)
      if (isNaN(pageNum) || pageNum < 1) {
        errors.push('Página deve ser um número válido maior que zero')
      }
    }

    if (limit) {
      const limitNum = parseInt(limit as string)
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        errors.push('Limite deve ser um número entre 1 e 100')
      }
    }

    if (errors.length > 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Parâmetros de paginação inválidos',
        error: errors.join('; '),
      }

      res.status(400).json(response)
      return
    }

    next()
  }

  static validateSortParams(req: Request, res: Response, next: NextFunction): void {
    const { sortBy, sortOrder } = req.query
    const errors: string[] = []

    if (sortBy) {
      const validSortFields = ['dataCriacao', 'dataAgendamento', 'medico', 'paciente', 'status']
      if (!validSortFields.includes(sortBy as string)) {
        errors.push(`Campo de ordenação deve ser um dos: ${validSortFields.join(', ')}`)
      }
    }

    if (sortOrder) {
      const validSortOrders = ['asc', 'desc']
      if (!validSortOrders.includes(sortOrder as string)) {
        errors.push('Ordem de classificação deve ser "asc" ou "desc"')
      }
    }

    if (errors.length > 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Parâmetros de ordenação inválidos',
        error: errors.join('; '),
      }

      res.status(400).json(response)
      return
    }

    next()
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
  }

  private static isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.getTime())
  }
}
